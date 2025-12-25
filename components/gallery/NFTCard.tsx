"use client";

import Image from "next/image";
import { Card, CardFooter } from "@heroui/react";

interface NFTCardProps {
  name: string;
  image: string;
  onClick?: () => void;
}

export const NFTCard = ({ name, image, onClick }: NFTCardProps) => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className={`border-none bg-transparent shadow-none hover:scale-105 transition-transform duration-200 ${
        onClick ? "cursor-pointer" : ""
      }`}
      isPressable={!!onClick}
      onPress={onClick}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#e0c8ff]">
        {/* Snow overlay effect */}
        <div className="absolute top-0 left-0 w-full h-8 bg-white/40 blur-xl z-10 rounded-b-full transform -translate-y-4"></div>

        {/* Main Image */}
        <div className="relative w-full h-full p-4 flex items-center justify-center">
          <Image
            alt={name}
            className="object-contain"
            src={image}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 bg-white/80">
        <p className="text-tiny text-black/80 font-bold">{name}</p>
      </CardFooter>
    </Card>
  );
};
