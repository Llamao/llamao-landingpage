"use client";

import Image from "next/image";

export default function Background() {
  return (
    <>
      <div className="fixed inset-0 flex items-end justify-center -z-10 w-full h-full">
        <Image
          src="/BGmockup.gif"
          alt="Background"
          width={1440}
          height={961}
          sizes="100vw"
          quality={100}
          className="blur-xs w-full h-auto scale-[100%] -translate-y-25 md:scale-120 md:-translate-y-20 lg:-translate-y-10 xl:translate-y-8 xl:scale-[100%] 2xl:translate-y-50"
          priority
        />
      </div>

      {/* Bottom Grass Border - Behind trees */}
      <div className="fixed h-[300px] md:h-[400px] 2xl:h-[500px] bottom-0 left-0 right-0 -z-10 pointer-events-none">
        <Image
          src="/Ground1.gif"
          alt="Bottom grass"
          width={2133}
          height={202}
          sizes="100vw"
          className="w-full h-full object-cover translate-y-1"
        />
      </div>

      <div className="scale-x-[-1] fixed z-0 pointer-events-none w-[150%] -bottom-10 -left-[95%] md:w-full md:-bottom-12 md:-left-[52%] lg:w-[80%] lg:-bottom-20 lg:-left-[40%] 2xl:w-[50%] 2xl:-bottom-16 2xl:-left-[22%]">
        <Image
          src="/Trees1.gif"
          alt="Left tree"
          width={1444}
          height={1444}
          sizes="(max-width: 1280px) 150vw, 50vw"
          priority
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="fixed z-0 pointer-events-none w-[150%] -bottom-10 -right-[95%] md:w-full md:-bottom-12 md:-right-[52%] lg:w-[80%] lg:-bottom-20 lg:-right-[40%] 2xl:w-[50%] 2xl:-bottom-16 2xl:-right-[22%]">
        <Image
          src="/Trees1.gif"
          alt="Right tree"
          width={1444}
          height={1444}
          sizes="(max-width: 1280px) 150vw, 50vw"
          className="h-auto w-full object-cover"
        />
      </div>
    </>
  );
}
