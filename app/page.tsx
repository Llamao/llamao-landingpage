"use client";

import Logo from "@/components/Logo";
import NavigationBar from "@/components/NavigationBar";
import Nobg from "@/components/Nobg";
import SocialMedias from "@/components/SocialMedias";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const mainVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stackVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};

export default function Home() {
  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={mainVariants}
      className="relative w-full h-screen overflow-x-clip"
    >
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 flex items-end justify-center -z-10 w-full h-full"
      >
        <Image
          src="/BGmockup.gif"
          alt="Background"
          width={1440}
          height={961}
          quality={100}
          className="blur-xs w-full h-auto scale-[100%] -translate-y-25 md:scale-120 md:-translate-y-20 lg:-translate-y-10 xl:translate-y-8 xl:scale-[100%] 2xl:translate-y-50"
          priority
        />
      </motion.div>

      {/* Bottom Grass Border - Behind trees */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed h-[300px] md:h-[400px] 2xl:h-[500px] bottom-0 left-0 right-0 -z-10 pointer-events-none"
      >
        <Image
          src="/Ground1.gif"
          alt="Bottom grass"
          width={2133}
          height={202}
          className="w-full h-full object-cover translate-y-1"
        />
      </motion.div>

      <div className="scale-x-[-1] fixed z-0 pointer-events-none w-[150%] -bottom-10 -left-[95%] md:w-[100%] md:-bottom-12 md:-left-[52%] lg:w-[80%] lg:-bottom-20 lg:-left-[40%] 2xl:w-[50%] 2xl:-bottom-16 2xl:-left-[22%]">
        <Image
          src="/Trees1.gif"
          alt="Left tree"
          width={1444}
          height={1444}
          priority
          className="h-auto w-full object-cover"
        />
      </div>

      <div className="fixed z-0 pointer-events-none w-[150%] -bottom-10 -right-[95%] md:w-[100%] md:-bottom-12 md:-right-[52%] lg:w-[80%] lg:-bottom-20 lg:-right-[40%] 2xl:w-[50%] 2xl:-bottom-16 2xl:-right-[22%]">
        <Image
          src="/Trees1.gif"
          alt="Right tree"
          width={1444}
          height={1444}
          className="h-auto w-full object-cover"
        />
      </div>

      <motion.div
        variants={stackVariants}
        className="h-full flex flex-col justify-between w-[95%] mx-auto"
      >
        <motion.div
          variants={stackVariants}
          className="flex flex-col items-center mx-auto w-full mt-3 z-40"
        >
          <NavigationBar />
          <Logo />
          <SocialMedias />
        </motion.div>
        <motion.div
          variants={stackVariants}
          className="flex flex-col items-center z-30 w-full mx-auto pb-10 md:pb-12 md:w-[80%] lg:w-[60%] xl:w-[50%] xl:pb-8"
        >
          <Nobg />
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
