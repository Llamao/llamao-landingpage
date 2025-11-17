"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="w-[93%] mt-3 lg:max-w-[550px] xl:max-w-[600px]"
    >
      <Image
        src="/logo.png"
        alt="LLAMA Logo"
        width={882}
        height={369}
        className="w-full h-auto"
        priority
      />
    </motion.div>
  );
};

export default Logo;
