"use client";

import Image from "next/image";
import { Alert } from "./ui/8bit/alert";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const loreItems = [
  {
    name: "🧘‍♂️ Sail steady, let true value flow",
    content: `The lake doesn’t rush, and neither does Llamao.
He drifts with the current, unbothered by the noise of waves.
The market will rise and fall — peace stays level.
True value flows when you stop chasing it`,
    image: "/lore/LWC_Bean_title.gif",
  },
  {
    name: "🌱  Plant trees and no FOMO",
    content: `Every great thing starts as something tiny and unseen.
While others sprint after the next shiny thing,
Llamao kneels to the soil and plants one more seed.
Growth comes quietly, block by block.`,
    image: "/lore/LWC_Chewy_title.gif",
  },
  {
    name: "♨️ Let the warmth of the hot springs embrace you",
    content: `When the world freezes, the wise find warmth inside.
Llamao soaks under golden leaves, steam rising, eyes half-closed.
No charts, no alerts, just still water and quiet mind.
Sometimes, peace is the highest yield.`,
    image: "/lore/LWC_Chog_title.gif",
  },
  {
    name: "🍄 Stay weird, dream big",
    content: `Shall us rest among giant mushrooms,
laughing at how strange it all is to markets, memes, and meaning.
In a world of copy-paste traders, the dreamers shape the new chains.
Weirdness is the seed of wonder.`,
    image: "/lore/LWC_HahaWallet_title.gif",
  },
  {
    name: "💧Take some time, and water little seeds",
    content: `Llamao stands in the meadow, watering what others forgot.
Each drop a reminder that patience is power.
Not every idea moons overnight...some bloom in silence.
He smiles, knowing time is the real fertilizer.`,
    image: "/lore/LWC_LaMouch_title.gif",
  },
  {
    name: "🎢 Sometimes doing nothing is doing something",
    content: `The Monad train rushes through the night, lights flashing fast.
Llamao just watches, sipping from his mug, unbothered.
Movement doesn’t always mean progress.
Even stillness can carry you somewhere new.`,
    image: "/lore/LWC_Monadverse_title.gif",
  },
  {
    name: "🔥  Stay calm and conquer",
    content: `The volcano burns, red as a candle chart gone mad.
But Llamao stands strong, twin swords glowing green.
Calm doesn’t mean weak. It means control.
Every eruption ends where patience begins.`,
    image: "/lore/LWC_NadDomains_title.gif",
  },
  {
    name: "🌌 Space isn’t just blackness, it’s full of llamao and chill",
    content: `Drifting above the earth, the two explorers float weightless.
No charts, no pressure, only infinite silence.
Even in the vast unknown, Llamao hums softly:
“Peace exists wherever you choose to breathe.”`,
    image: "/lore/LWC_Nadsa_title.gif",
  },
  {
    name: "🍂  Touch grass and llamao",
    content: `In a world built from code, Llamao returns to the ground.
He lies under autumn leaves, the scent of soil reminding him...
nothing real moves too fast.
Sometimes touching grass is the purest alpha.`,
    image: "/lore/LWC_Overnads_title.gif",
  },
  {
    name: "🔮 Don’t let them fool you",
    content: `Fires burn in the distance, voices sell fear and hype.
Llamao sits by the flame, sharing tea with an old friend.
Truth is never the loudest sound in the forest.
He smiles quietly, because peace can’t be rugged.`,
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
    <div className="flex items-center gap-6 sm:gap-12 justify-center -mt-2 sm:-mt-6 scale-90 sm:scale-95 xl:scale-90 xl:origin-top 2xl:scale-100">
      <motion.div
        className="hover:scale-110 transition-transform duration-300 cursor-pointer hidden md:block"
        onClick={handlePrevious}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Image src={"/arrow.svg"} alt="leftarrow" width={90} height={135} />
      </motion.div>
      <div className="relative max-h-[90%] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[400px] 2xl:max-w-[430px]">
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
              className="w-full flex flex-col justify-between p-0 gap-0 relative"
            >
              <Image
                src={currentItem.image}
                alt={currentItem.name}
                width={420}
                height={420}
                className="w-full h-auto"
              />
              <div className="bg-[#E8DEFF] w-full px-3 py-3 sm:py-4">
                <motion.p
                  key={`name-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="silkscreen-regular text-xl sm:text-2xl text-[#2245C5]"
                >
                  {currentItem.name}
                </motion.p>
                <motion.p
                  key={`content-${currentIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="pixelify-sans-400 text-[#1E3445] text-sm md:text-base"
                >
                  {currentItem.content}
                </motion.p>
              </div>
            </Alert>
          </motion.div>
        </AnimatePresence>
        <div className="flex md:hidden items-center justify-center gap-6 mt-3">
          <motion.div
            className="hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={handlePrevious}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image src={"/arrow.svg"} alt="leftarrow" width={45} height={68} />
          </motion.div>
          <motion.div
            className="hover:scale-110 transition-transform duration-300 cursor-pointer"
            onClick={handleNext}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={"/arrow.svg"}
              alt="rightarrow"
              width={45}
              height={68}
              className="scale-x-[-1]"
            />
          </motion.div>
        </div>
      </div>
      <motion.div
        className="hover:scale-110 transition-transform duration-300 cursor-pointer hidden md:block"
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
