"use client";

import Logo from "@/components/Logo";
import Nobg from "@/components/Nobg";
import SocialMedias from "@/components/SocialMedias";
import PageLayout from "@/components/PageLayout";
import { motion, type Variants } from "framer-motion";

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
    <PageLayout>
      <>
        <motion.div
          variants={stackVariants}
          className="flex flex-col items-center mx-auto w-full z-30"
          initial="hidden"
          animate="visible"
        >
          <Logo />
          <SocialMedias />
        </motion.div>
        <motion.div
          variants={stackVariants}
          className="flex flex-col items-center z-30 w-full mx-auto pb-10 md:pb-12 md:w-[80%] lg:w-[60%] xl:w-[50%] xl:pb-8"
          initial="hidden"
          animate="visible"
        >
          <Nobg />
        </motion.div>
      </>
    </PageLayout>
  );
}
