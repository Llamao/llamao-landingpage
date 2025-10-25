"use client";

import Logo from "@/components/Logo";
import NavigationBar from "@/components/NavigationBar";
import Nobg from "@/components/Nobg";
import SocialMedias from "@/components/SocialMedias";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 flex items-end justify-center -z-10">
        <Image
          src="/background.svg"
          alt="Background"
          width={1440}
          height={961}
          quality={100}
          className="w-full h-auto object-contain scale-[170%] -translate-y-40"
          priority
        />
      </div>

      {/* Bottom Grass Border - Behind trees */}
      <div className="absolute h-[200px] bottom-0 left-0 right-0 -z-10 pointer-events-none">
        <Image
          src="/footertree.svg"
          alt="Bottom grass"
          width={2133}
          height={202}
          className="w-auto h-full object-cover translate-y-1"
        />
      </div>

      {/* Tree container */}
      {/* <div> */}
      {/* Left Tree Border - Above grass */}
      <div className="absolute z-10 w-[210%] pointer-events-none -bottom-10 -left-[155%]">
        <Image
          src="/tree.svg"
          alt="Left tree"
          width={1444}
          height={1444}
          priority
          className="h-auto w-full object-cover"
        />
      </div>
      {/* </div> */}

      {/* Right Tree Border - Above grass */}
      <div className="absolute z-10 w-[210%] pointer-events-none -bottom-10 -right-[155%] scale-x-[-1]">
        <Image
          src="/tree.svg"
          alt="Right tree"
          width={1444}
          height={1444}
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="h-full flex flex-col justify-between w-[95%] mx-auto z-30">
        <div className="flex flex-col items-center mx-auto w-full mt-3 z-30">
          <NavigationBar />
          <Logo />
          <SocialMedias />
        </div>
        <div className="flex flex-col items-center w-full">
          <Nobg />
        </div>
      </div>
    </main>
  );
}
