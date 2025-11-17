import { Button } from "./ui/8bit/button";
import { useEffect, useRef, useState } from "react";
import { Canvas, Rect, FabricImage } from "fabric";
import * as fabric from "fabric";
import Image from "next/image";
import useWindowSize from "@/hooks/useWindowSize";

const deleteIcon =
  "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

const Traits = () => {
  const canvasRef = useRef<Canvas | undefined>(undefined);
  const rectRef = useRef<Rect | undefined>(undefined);
  const clipRectRef = useRef<Rect | undefined>(undefined);
  const imageRef = useRef<FabricImage | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const [hasImage, setHasImage] = useState(false);
  const { width: viewportWidth } = useWindowSize();
  const desiredCardWidth = viewportWidth
    ? viewportWidth < 500
      ? Math.floor(viewportWidth * 0.7)
      : viewportWidth < 630
      ? 400
      : 430
    : 430;

  const deleteImgRef = useRef<HTMLImageElement | null>(null);
  const loadHtmlImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const element = document.createElement("img");
      element.crossOrigin = "anonymous";
      element.onload = () => resolve(element);
      element.onerror = () => reject(new Error("Failed to load image"));
      element.src = src;
    });

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

  const synchronizeCanvasLayout = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasWidth = canvas.getWidth() ?? 400;
    const canvasHeight = canvas.getHeight() ?? 400;

    if (clipRectRef.current) {
      clipRectRef.current.set({
        width: canvasWidth,
        height: canvasHeight,
        left: 0,
        top: 0,
      });
      clipRectRef.current.setCoords();
    }

    if (imageRef.current) {
      imageRef.current.scaleToWidth(canvasWidth);
      imageRef.current.set({ left: 0, top: 0 });
      imageRef.current.setCoords();
    }

    canvas.requestRenderAll();
  };

  const clearExistingImages = () => {
    const canvas = canvasRef.current;
    const rect = rectRef.current;
    if (!canvas) return;

    const objects = canvas.getObjects();
    objects.forEach((obj) => {
      if (obj !== rect && obj instanceof FabricImage) {
        canvas.remove(obj);
      }
    });

    imageRef.current = undefined;
    setHasImage(false);

    if (rect) {
      rect.clipPath = undefined;
    }

    canvas.requestRenderAll();
  };

  const insertImageFromUrl = async (imgSrc: string) => {
    const canvas = canvasRef.current;
    const rect = rectRef.current;
    if (!canvas) return;

    try {
      const imgElement = await loadHtmlImage(imgSrc);

      clearExistingImages();

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

      const targetWidth = canvas.getWidth() ?? 400;
      const originalWidth = fabricImg.width ?? targetWidth;
      const scale = targetWidth / originalWidth;

      fabricImg.scale(scale);

      const scaledHeight =
        fabricImg.getScaledHeight() ?? fabricImg.height ?? targetWidth;
      canvas.setHeight(scaledHeight);

      canvas.add(fabricImg);
      imageRef.current = fabricImg;
      setHasImage(true);

      if (rect) {
        const rectClipRect = new Rect({
          left: 0,
          top: 0,
          width: 100,
          height: 100,
          absolutePositioned: true,
        });
        rect.clipPath = rectClipRect;
        clipRectRef.current = rectClipRect;
        canvas.bringObjectToFront(rect);
      }

      synchronizeCanvasLayout();
      canvas.requestRenderAll();
    } catch (error) {
      console.error("Error inserting image:", error);
    }
  };

  useEffect(() => {
    const initialSize = desiredCardWidth;

    const c = new Canvas("canvas", {
      height: initialSize,
      width: initialSize,
      backgroundColor: "#f3c684",
    });

    // settings for all canvas in the app
    fabric.Object.prototype.transparentCorners = false;
    fabric.Object.prototype.cornerColor = "#2BEBC8";
    fabric.Object.prototype.cornerStyle = "rect";
    fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
    fabric.Object.prototype.cornerSize = 6;

    canvasRef.current = c;

    // Load delete icon for future controls
    const deleteImg = document.createElement("img");
    deleteImg.src = deleteIcon;
    deleteImg.onload = () => {
      deleteImgRef.current = deleteImg;
    };

    return () => {
      c.dispose();
    };
  }, [desiredCardWidth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setWidth(desiredCardWidth);
    canvas.setHeight(desiredCardWidth);
    synchronizeCanvasLayout();
  }, [desiredCardWidth]);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const imgUrl = event.target?.result as string;
      if (!imgUrl) return;
      await insertImageFromUrl(imgUrl);
    };
    reader.readAsDataURL(file);

    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const addEditableAvatarImage = async (src: string) => {
    const canvas = canvasRef.current;
    if (!canvas || !deleteImgRef.current) return;

    try {
      const imgElement = await loadHtmlImage(src);
      const avatarImage = new FabricImage(imgElement, {
        left: (canvas.getWidth() ?? 400) * 0.15,
        top: (canvas.getHeight() ?? 400) * 0.15,
      });

      avatarImage.scaleToWidth((canvas.getWidth() ?? 400) * 0.6);

      avatarImage.controls.deleteControl = new fabric.Control({
        x: 0.5,
        y: -0.5,
        offsetY: 16,
        cursorStyle: "pointer",
        mouseUpHandler: deleteObject,
        render: renderIcon,
      });

      canvas.add(avatarImage);
      canvas.setActiveObject(avatarImage);
      canvas.requestRenderAll();
    } catch (error) {
      console.error("Error adding avatar image:", error);
    }
  };

  const handleAddAvatarImage1 = () => {
    void addEditableAvatarImage("/llamao_avatar1.png");
  };

  const handleAddAvatarImage2 = () => {
    void addEditableAvatarImage("/llamao_avatar2.png");
  };

  const handleAddAvatarImage3 = () => {
    void addEditableAvatarImage("/llamao_avatar3.png");
  };

  const handleFlipSelectedObject = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const activeObject = canvas.getActiveObject();
    if (!activeObject || activeObject === imageRef.current) return;

    activeObject.set("flipX", !activeObject.flipX);
    activeObject.setCoords?.();
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
    canvas.setHeight(canvas.getWidth() ?? desiredCardWidth);
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

  const traitButtonClass =
    "cursor-pointer hover:opacity-80 transition-opacity flex justify-center items-center flex-none shrink-0 w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[120px]";

  return (
    <div className="flex flex-col md:flex-row items-center md:items-stretch gap-5 md:gap-8 md:justify-center lg:justify-start xl:scale-90 xl:origin-top 2xl:scale-100">
      <div className="w-full flex justify-center md:w-full md:flex md:justify-center lg:w-auto lg:block">
        <div
          className="relative mx-auto m-1.5 flex flex-col justify-between"
          style={{ width: desiredCardWidth }}
        >
          <div className="relative z-10 flex flex-col bg-[#FBE9C6]">
            <div className="relative" ref={canvasWrapperRef}>
              <canvas id="canvas" className="w-full h-auto block" />
              {hasImage && (
                <div className="absolute top-4 left-0 right-0 flex justify-between px-4 gap-2">
                  <Button
                    onClick={handleFlipSelectedObject}
                    size="sm"
                    className="bg-[#5B4B8A] hover:bg-[#6C5AA5] text-white px-4 py-2 text-sm font-semibold"
                  >
                    Flip
                  </Button>
                  <Button
                    onClick={handleDeleteImage}
                    size="sm"
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
            <div className="bg-[#E8DEFF] w-full px-4 py-4">
              <p className="silkscreen-regular text-center tracking-tight text-xl md:text-3xl text-[#2245C5]">
                Llamao generator
              </p>
              <div className="mt-2 w-full flex items-center justify-center">
                <Button
                  onClick={handleButtonClick}
                  size="sm"
                  className="w-full bg-[#DD1A21] hover:bg-[#FF2A31] py-2 md:py-5 hover:scale-105 hover:brightness-110 transition-all duration-200"
                >
                  <p className="pixelify-sans-500 text-lg md:text-2xl">
                    {hasImage ? "SAVE IMAGE" : "ADD IMAGE"}
                  </p>
                </Button>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute -top-1.5 left-1.5 w-1/2 h-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute -top-1.5 right-1.5 w-1/2 h-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute -bottom-1.5 left-1.5 w-1/2 h-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute -bottom-1.5 right-1.5 w-1/2 h-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute top-0 left-0 size-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute top-0 right-0 size-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute bottom-0 left-0 size-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute bottom-0 right-0 size-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute top-1.5 -left-1.5 h-1/2 w-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute bottom-1.5 -left-1.5 h-1/2 w-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute top-1.5 -right-1.5 h-1/2 w-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
            <div
              className="absolute bottom-1.5 -right-1.5 h-1/2 w-1.5"
              style={{ backgroundColor: "#1E3445" }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row flex-wrap gap-3 w-full justify-center md:flex-col md:justify-around lg:ml-8 md:w-auto -mt-2 md:mt-0">
        <button
          type="button"
          onClick={handleAddAvatarImage1}
          className={traitButtonClass}
        >
          <Image
            src="/traits-btn1.png"
            alt="traits button"
            width={100}
            height={300}
            className="object-contain w-full h-full"
          />
        </button>
        <button
          type="button"
          onClick={handleAddAvatarImage2}
          className={traitButtonClass}
        >
          <Image
            src="/traits-btn2.png"
            alt="traits button"
            width={100}
            height={300}
            className="object-contain w-full h-full"
          />
        </button>
        <button
          type="button"
          onClick={handleAddAvatarImage3}
          className={traitButtonClass}
        >
          <Image
            src="/traits-btn3.png"
            alt="traits button"
            width={100}
            height={300}
            className="object-contain w-full h-full"
          />
        </button>
      </div>
    </div>
  );
};

export default Traits;
