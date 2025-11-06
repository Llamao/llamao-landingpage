"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const socialLinks = [
  {
    href: "https://x.com/llamao_",
    src: "/x.png",
    alt: "X",
  },
  {
    href: "discord.com/invite/llamao",
    src: "/discord.png",
    alt: "Discord",
  },
  {
    href: "https://t.me/llamaomeme",
    src: "/telegram.png",
    alt: "Telegram",
  },
];

const SocialMedias = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.45, ease: "easeOut" }}
      className="flex gap-5 mt-5"
    >
      {socialLinks.map(({ href, src, alt }) => (
        <motion.a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
          whileHover={{ scale: 1.1, rotate: -2 }}
          whileTap={{ scale: 0.94 }}
        >
          <div className="relative w-16 h-16 md:w-20 md:h-20 lg:w-16 lg:h-16">
            <Image
              src={src}
              alt={alt}
              width={80}
              height={80}
              className="w-full h-full"
            />
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialMedias;
