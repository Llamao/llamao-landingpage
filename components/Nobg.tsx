"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const Nobg = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{
          duration: 4.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src="/llamao_chillpose2.gif"
          alt="Llama Character"
          unoptimized
          width={860}
          height={850}
          className="w-[350px] md:w-[500px] xl:w-[500px] 2xl:w-[600px] h-auto"
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default Nobg;
