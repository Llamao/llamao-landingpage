import { Alert } from "./ui/8bit/alert";
import { Button } from "./ui/8bit/button";
import { useEffect, useRef, useState } from "react";
import { Canvas, Rect, FabricImage } from "fabric";
import * as fabric from "fabric";
import Image from "next/image";

const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const Traits = () => {
  const canvasRef = useRef<Canvas | undefined>(undefined);
  const rectRef = useRef<Rect | undefined>(undefined);
  const imageRef = useRef<FabricImage | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hasImage, setHasImage] = useState(false);

  const deleteImgRef = useRef<HTMLImageElement | null>(null);

  function deleteObject(
    _eventData: fabric.TPointerEvent,
    transform: fabric.Transform
  ) {
    const canvas = transform.target.canvas;
    if (canvas) {
      canvas.remove(transform.target);
      canvas.requestRenderAll();
    }

    if (rectRef.current === transform.target) {
      rectRef.current = undefined;
    }
  }

  function renderIcon(
    ctx: CanvasRenderingContext2D,
    left: number,
    top: number,
    _styleOverride: Record<string, unknown>,
    fabricObject: fabric.Object
  ) {
    const size = 24; // cornerSize
    const deleteImg = deleteImgRef.current;
    if (!deleteImg) return;

    ctx.save();
    ctx.translate(left, top);
    ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
    ctx.drawImage(deleteImg, -size / 2, -size / 2, size, size);
    ctx.restore();
  }

  const createRectangle = () => {
    const canvas = canvasRef.current;
    if (!canvas || !deleteImgRef.current) return;

    const rect = new Rect({
      height: 280,
      width: 200,
      stroke: "red",
    });

    rect.controls.deleteControl = new fabric.Control({
      x: 0.5,
      y: -0.5,
      offsetY: 16,
      cursorStyle: "pointer",
      mouseUpHandler: deleteObject,
      render: renderIcon,
    });

    canvas.add(rect);
    canvas.requestRenderAll();
    rectRef.current = rect;
    return rect;
  };

  useEffect(() => {
    const c = new Canvas("canvas", {
      height: 400,
      width: 400,
      backgroundColor: "#f3c684",
    });

    // settings for all canvas in the app
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;

    canvasRef.current = c;

    // Load delete icon and create initial rectangle
    const deleteImg = document.createElement("img");
    deleteImg.src = deleteIcon;
    deleteImg.onload = () => {
      deleteImgRef.current = deleteImg;

      // Render rectangle immediately on page load
      const rect = new Rect({
        height: 280,
        width: 200,
        stroke: "red",
      });

      rect.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderIcon,
      });

      rectRef.current = rect;
      c.add(rect);
      c.requestRenderAll();
    };

    return () => {
      c.dispose();
    };
  }, []);

  const handleAddRectangle = () => {
    createRectangle();
  };

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const canvas = canvasRef.current;
    const rect = rectRef.current;
    if (!canvas) return;

    const file = e.target.files?.[0];
    if (!file) return;

    // Remove old images (keep only the rectangle)
    const objects = canvas.getObjects();
    objects.forEach((obj) => {
      if (obj !== rect && obj instanceof FabricImage) {
        canvas.remove(obj);
      }
    });
    imageRef.current = undefined;
    setHasImage(false);

    // Remove clipPath from rectangle before uploading new image
    if (rect) {
      rect.clipPath = undefined;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imgUrl = event.target?.result as string;
      if (!imgUrl) return;

      try {
        // Create HTMLImageElement first
        const imgElement = document.createElement("img");

        await new Promise<void>((resolve, reject) => {
          imgElement.onload = () => resolve();
          imgElement.onerror = () => reject(new Error("Failed to load image"));
          imgElement.src = imgUrl;
        });

        // Create FabricImage from the loaded image
        const fabricImg = new FabricImage(imgElement, {
          left: 0,
          top: 0,
          selectable: false,
          evented: false,
          lockMovementX: true,
          lockMovementY: true,
          lockScalingX: true,
          lockScalingY: true,
          lockRotation: true,
        });

        // Scale image to width = 100% (400px), height auto (maintain aspect ratio)
        const targetWidth = 400; // Canvas width
        const originalWidth = fabricImg.width!;
        const originalHeight = fabricImg.height!;
        const scale = targetWidth / originalWidth;
        const scaledHeight = originalHeight * scale;

        fabricImg.scale(scale);

        // Add image first (so it's below the rectangle)
        canvas.add(fabricImg);
        imageRef.current = fabricImg;
        setHasImage(true);

        // Set clipPath for rectangle to hide parts outside the image
        // Rectangle can move and resize freely, but parts outside image will be hidden
        if (rect) {
          const rectClipRect = new Rect({
            left: 0,
            top: 0,
            width: targetWidth,
            height: scaledHeight,
            absolutePositioned: true,
          });
          rect.clipPath = rectClipRect;

          // Move rectangle to top (bring to front)
          canvas.bringObjectToFront(rect);
        }
        canvas.requestRenderAll();
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleFlip = () => {
    const rect = rectRef.current;
    const canvas = canvasRef.current;
    if (!rect || !canvas) return;

    // Flip rectangle horizontally
    rect.flipX = !rect.flipX;
    canvas.requestRenderAll();
  };

  const handleDeleteImage = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const rect = rectRef.current;
    if (!canvas || !image) return;

    canvas.remove(image);
    imageRef.current = undefined;
    setHasImage(false);

    // Remove clipPath from rectangle
    if (rect) {
      rect.clipPath = undefined;
    }

    canvas.requestRenderAll();
  };

  const handleSaveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to data URL
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1.0,
      multiplier: 1,
    });

    // Create download link
    const link = document.createElement("a");
    link.download = "llamao-image.png";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleButtonClick = () => {
    if (hasImage) {
      handleSaveImage();
    } else {
      handleAddImage();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-8">
      <Alert
        borderColor="#1E3445"
        className="max-w-[430px] max-h-[80%] mx-auto flex flex-col justify-between p-0 gap-0 self-stretch"
      >
        <div className="relative">
          <canvas id="canvas" />
          {hasImage && (
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-4 md:gap-0 md:justify-between px-4">
              <Button
                onClick={handleFlip}
                size={"sm"}
                className="bg-[#2BEBC8] hover:bg-[#25D4B3] text-black px-4 py-2 text-sm font-semibold"
              >
                Flip
              </Button>
              <Button
                onClick={handleDeleteImage}
                size={"sm"}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-semibold"
              >
                ✕
              </Button>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="bg-[#E8DEFF] w-full px-3 py-1 pb-4">
          <p className="silkscreen-regular text-center tracking-tight text-3xl text-[#2245C5]">
            Llamao generator
          </p>
          <div className="mt-5 w-full flex justify-center">
            <Button
              onClick={handleButtonClick}
              size={"sm"}
              className="w-[95%] bg-[#DD1A21] hover:bg-[#FF2A31] py-5 hover:scale-105 hover:brightness-110 transition-all mt-2 duration-200"
            >
              <p className="pixelify-sans-500 text-2xl">
                {hasImage ? "SAVE IMAGE" : "ADD IMAGE"}
              </p>
            </Button>
          </div>
        </div>
      </Alert>
      <div className="flex flex-row flex-wrap justify-center gap-4 w-full md:flex-col md:justify-around md:ml-8 md:w-auto">
        <button
          type="button"
          onClick={handleAddRectangle}
          className="cursor-pointer hover:opacity-80 transition-opacity flex justify-center"
        >
          <Image
            src="/traits-btn.png"
            alt="traits button"
            width={100}
            height={300}
            className="object-contain"
          />
        </button>
        <button
          type="button"
          onClick={handleAddRectangle}
          className="cursor-pointer hover:opacity-80 transition-opacity flex justify-center"
        >
          <Image
            src="/traits-btn.png"
            alt="traits button"
            width={100}
            height={300}
            className="object-contain"
          />
        </button>
        <button
          type="button"
          onClick={handleAddRectangle}
          className="cursor-pointer hover:opacity-80 transition-opacity flex justify-center"
        >
          <Image
            src="/traits-btn.png"
            alt="traits button"
            width={100}
            height={300}
            className="object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default Traits;
