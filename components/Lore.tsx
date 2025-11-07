"use client";

import Image from "next/image";
import { Alert } from "./ui/8bit/alert";
import { Button } from "./ui/8bit/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loreItems = [
  {
    name: "Llamaoism PT1",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_Bean_title.gif",
  },
  {
    name: "Llamaoism PT2",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_Chewy_title.gif",
  },
  {
    name: "Llamaoism PT3",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_Chog_title.gif",
  },
  {
    name: "Llamaoism PT4",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_HahaWallet_title.gif",
  },
  {
    name: "Llamaoism PT5",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_LaMouch_title.gif",
  },
  {
    name: "Llamaoism PT6",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_Monadverse_title.gif",
  },
  {
    name: "Llamaoism PT7",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_NadDomains_title.gif",
  },
  {
    name: "Llamaoism PT8",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_Nadsa_title.gif",
  },
  {
    name: "Llamaoism PT9",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_Overnads_title.gif",
  },
  {
    name: "Llamaoism PT10",
    content:
      "Blue steak pi crown queen sandwich taxi flash diamond red darkest grey purple lint hoodie strings sunset shirt wool weave",
    image: "/lore/LWC_SLMND_title.gif",
  },
];

const Lore = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? loreItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === loreItems.length - 1 ? 0 : prev + 1));
  };

  const currentItem = loreItems[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const slideTransition = {
    x: { type: "spring" as const, stiffness: 400, damping: 35 },
    opacity: { duration: 0.15 },
  };

  return (
    <div className="flex items-center gap-20 justify-center">
      <motion.div
        className="hover:scale-110 transition-transform duration-300 cursor-pointer hidden lg:block"
        onClick={handlePrevious}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image src={"/arrow.svg"} alt="leftarrow" width={90} height={135} />
      </motion.div>
      <div className="relative max-w-[430px] max-h-[80%]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={slideTransition}
          >
            <Alert
              borderColor="#1E3445"
              className="max-w-[430px] max-h-[80%] flex flex-col justify-between p-0 gap-0"
            >
              <Image
                src={currentItem.image}
                alt={currentItem.name}
                width={432.46}
                height={432.46}
              />
              <div className="bg-[#E8DEFF] w-full px-3 py-4">
                <motion.p
                  key={`name-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="silkscreen-regular text-2xl text-[#2245C5]"
                >
                  {currentItem.name}
                </motion.p>
                <motion.p
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="pixelify-sans-400 text-[#1E3445] text-lg"
                >
                  {currentItem.content}
                </motion.p>
              </div>
            </Alert>
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        className="hover:scale-110 transition-transform duration-300 cursor-pointer hidden lg:block"
        onClick={handleNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image
          src={"/arrow.svg"}
          alt="rightarrow"
          width={90}
          height={135}
          className="scale-x-[-1] "
        />
      </motion.div>
    </div>
  );
};

export default Lore;
