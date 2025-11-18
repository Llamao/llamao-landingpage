"use client";

import { Alert, AlertDescription } from "@/components/ui/8bit/alert";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import useWindowSize from "@/hooks/useWindowSize";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const staggerList: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

type RewardCategory = "NFT" | "Token";

type RewardItem = {
  id: string;
  category: RewardCategory;
  name: string;
  featuredName?: string;
  displayQuantity: string;
  quantityValue: number | null;
  order: number;
};

const numberFormatter = new Intl.NumberFormat("en-US");

const rewardItems: RewardItem[] = [
  {
    id: "nft-llamao-rare",
    category: "NFT",
    name: "Llamao (Rare NFT)",
    featuredName: "Llamao",
    displayQuantity: numberFormatter.format(10),
    quantityValue: 10,
    order: 1,
  },
  {
    id: "token-mon",
    category: "Token",
    name: "$MON",
    displayQuantity: numberFormatter.format(10000),
    quantityValue: 10000,
    order: 2,
  },
  {
    id: "token-pengu",
    category: "Token",
    name: "$PENGU",
    displayQuantity: numberFormatter.format(12500),
    quantityValue: 12500,
    order: 3,
  },
  {
    id: "nft-steady-teddy",
    category: "NFT",
    name: "Steady teddy",
    displayQuantity: numberFormatter.format(1),
    quantityValue: 1,
    order: 4,
  },
  {
    id: "nft-nakamigos",
    category: "NFT",
    name: "Nakamigos",
    displayQuantity: numberFormatter.format(1),
    quantityValue: 1,
    order: 5,
  },
  {
    id: "token-dood",
    category: "Token",
    name: "$DOOD",
    displayQuantity: numberFormatter.format(30000),
    quantityValue: 30000,
    order: 6,
  },
  {
    id: "token-ape",
    category: "Token",
    name: "$APE",
    displayQuantity: numberFormatter.format(500),
    quantityValue: 500,
    order: 7,
  },
  {
    id: "nft-beanz",
    category: "NFT",
    name: "Beanz",
    displayQuantity: numberFormatter.format(1),
    quantityValue: 1,
    order: 8,
  },
  {
    id: "nft-gobs-on-ape",
    category: "NFT",
    name: "Gobs On Ape",
    displayQuantity: numberFormatter.format(1),
    quantityValue: 1,
    order: 9,
  },
  {
    id: "nft-giga-rom",
    category: "NFT",
    name: "Giga Rom",
    displayQuantity: numberFormatter.format(1),
    quantityValue: 1,
    order: 10,
  },
  {
    id: "nft-fugz",
    category: "NFT",
    name: "Fugz",
    displayQuantity: numberFormatter.format(1),
    quantityValue: 1,
    order: 11,
  },
  {
    id: "nft-memeland-potatoz",
    category: "NFT",
    name: "Memeland Potatoz",
    displayQuantity: numberFormatter.format(1),
    quantityValue: 1,
    order: 12,
  },
  {
    id: "nft-moonbirds-mythics",
    category: "NFT",
    name: "Moonbirds Mythics",
    displayQuantity: numberFormatter.format(1),
    quantityValue: 1,
    order: 13,
  },
  {
    id: "token-bera",
    category: "Token",
    name: "$BERA",
    displayQuantity: numberFormatter.format(120),
    quantityValue: 120,
    order: 14,
  },
  {
    id: "token-bonk",
    category: "Token",
    name: "$BONK",
    displayQuantity: numberFormatter.format(150000000),
    quantityValue: 150000000,
    order: 15,
  },
  {
    id: "token-aster",
    category: "Token",
    name: "$ASTER",
    displayQuantity: numberFormatter.format(170),
    quantityValue: 170,
    order: 16,
  },
  {
    id: "token-pepe",
    category: "Token",
    name: "$PEPE",
    displayQuantity: numberFormatter.format(32000000),
    quantityValue: 32000000,
    order: 17,
  },
  {
    id: "token-daks",
    category: "Token",
    name: "$DAKS",
    displayQuantity: "xxx",
    quantityValue: null,
    order: 18,
  },
  {
    id: "token-chog",
    category: "Token",
    name: "$CHOG",
    displayQuantity: "xxx",
    quantityValue: null,
    order: 19,
  },
];

const rewardCounts = rewardItems.reduce(
  (acc, item) => {
    if (item.category === "NFT") {
      acc.nfts += 1;
    } else {
      acc.tokens += 1;
    }
    return acc;
  },
  { nfts: 0, tokens: 0 }
);

const rewardSummaries = [
  {
    id: "estimated-value",
    label: "Total Prizes",
    value: `${rewardCounts.nfts} NFTs + ${rewardCounts.tokens} Tokens`,
  },
];

/*
const rewardCardsData = Array.from({ length: 10 }, (_, index) => ({
  id: `reward-${index}`,
  title: `LLAMAO #${index + 1}`,
  value: 5000 + index * 250,
  quantity: (index % 3) + 1,
  daysAgo: index + 1,
  thumbnail: "/llamao-gen.png",
}));
*/

type ParticipantRow = {
  id: string;
  address: string;
  totalOwned: string;
  dateAdded: string;
};

const participantFields = [
  { key: "address", label: "Participant" },
  { key: "totalOwned", label: "Total NFT Owned" },
  { key: "dateAdded", label: "Date Added" },
] as const;

const participantRows: ParticipantRow[] = Array.from(
  { length: 4 },
  (_, index) => ({
    id: `participant-${index}`,
    address: "0x...aaaa",
    totalOwned: "5000 NFTs",
    totalPurchase: "5000 NFTs",
    dateAdded: "01/01/2026",
  })
);

const hasParticipants = participantRows.length > 0;

const highlightedParticipant: ParticipantRow = {
  id: "highlighted",
  address: "0x...aaaa",
  totalOwned: "5000 NFTs",
  dateAdded: "01/01/2026",
};

type TabKey = "rewards" | "participants";

const tabs: { key: TabKey; label: string }[] = [
  { key: "rewards", label: "REWARDS and VAULTS" },
  { key: "participants", label: "Participants" },
];

type ButtonVariant = "default" | "xl-compact";

function BlurredBackgroundButton({
  text,
  id,
  variant = "default",
}: {
  text: string;
  id: string;
  variant?: ButtonVariant;
}) {
  const { width } = useWindowSize();

  const getImageCount = () => {
    if (!width) return 3;
    if (width < 640) return 2;
    if (width < 768) return 3;
    if (width < 1024) return 4;
    if (width < 1280) return 5;
    return 6;
  };

  const imageCount = getImageCount();

  const outerHeightClasses =
    variant === "xl-compact"
      ? "relative w-full h-[70px] sm:h-20 md:h-[90px] lg:h-[100px] xl:h-10 2xl:h-[70px] flex items-center justify-center"
      : "relative w-full h-[70px] sm:h-20 md:h-[90px] lg:h-[100px] xl:h-12 2xl:h-[75px] flex items-center justify-center";

  const buttonHeightClasses =
    variant === "xl-compact"
      ? "press-start-2p-regular relative z-10 w-full max-w-[280px] xl:max-w-[340px] 2xl:max-w-[400px] h-10 text-center text-white transition-transform hover:scale-[1.03] active:scale-95 sm:h-[45px] md:h-[50px] lg:h-[55px] xl:h-8"
      : "press-start-2p-regular relative z-10 w-full max-w-[280px] xl:max-w-[360px] 2xl:max-w-[400px] h-10 text-center text-white transition-transform hover:scale-[1.03] active:scale-95 sm:h-[45px] md:h-[50px] lg:h-[55px] xl:h-9";

  return (
    <div className="relative w-full overflow-visible flex items-center justify-center my-2 sm:my-3 px-2 sm:px-3">
      <div className={outerHeightClasses}>
        <div className="absolute inset-0 flex w-full gap-0.5 blur-[2px] sm:gap-1 sm:blur-sm md:gap-1.5 md:blur-sm z-0 opacity-60">
          {Array.from({ length: imageCount }).map((_, index) => (
            <div className="w-full h-full" key={`blurred-${id}-${index}`}>
              <Image
                src="/llamao-gen.png"
                alt="llamao"
                width={424}
                height={424}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div
          className={`${buttonHeightClasses} bg-[#B091FF] flex items-center justify-center`}
          style={{
            boxShadow: "6px 6px 0 0 #4A2C1A",
          }}
        >
          <span className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm relative z-20">
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative h-[45px] w-full cursor-pointer overflow-visible text-center text-white transition-transform hover:scale-[1.03] active:scale-95 focus:outline-none press-start-2p-regular text-[10px] sm:h-[50px] sm:text-xs md:text-sm"
    >
      <div
        className={`absolute inset-0 z-10 h-full w-full ${
          isActive ? "bg-[#B091FF]" : "bg-black opacity-40"
        }`}
        style={{
          boxShadow: "6px 6px 0 0 #4A2C1A",
        }}
      />
      <span className="relative z-20 flex h-full items-center justify-center px-2">
        {label}
      </span>
    </button>
  );
}

type SortOption = "recently-added" | "quantity-asc" | "quantity-desc";

export default function RewardPools() {
  const [activeTab, setActiveTab] = useState<TabKey>("rewards");
  const [sortOption, setSortOption] = useState<SortOption>("recently-added");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isCarouselPaused, setCarouselPaused] = useState(false);
  const autoScrollRef = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  // Update current index when carousel changes
  useEffect(() => {
    if (!api) {
      return undefined;
    }

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const rafId = window.requestAnimationFrame(handleSelect);
    api.on("select", handleSelect);

    return () => {
      window.cancelAnimationFrame(rafId);
      api.off("select", handleSelect);
    };
  }, [api]);

  // Auto-scroll prizes
  useEffect(() => {
    if (!api) return;

    if (isCarouselPaused) {
      if (autoScrollRef.current !== null) {
        window.clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
      return;
    }

    autoScrollRef.current = window.setInterval(() => {
      api.scrollNext();
    }, 1500); // Change prize every 1.5 seconds

    return () => {
      if (autoScrollRef.current !== null) {
        window.clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, [api, isCarouselPaused]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const style = document.createElement("style");
    style.dataset.rewardScrollStyle = "true";
    style.textContent = `
      .reward-pools-scroll {
        scrollbar-width: thin;
        scrollbar-color: #b091ff rgba(176, 145, 255, 0.25);
      }

      .reward-pools-scroll::-webkit-scrollbar {
        width: 12px;
      }

      .reward-pools-scroll::-webkit-scrollbar-track {
        background: rgba(176, 145, 255, 0.22);
        border-left: 2px solid #4a2c1a;
        border-radius: 999px;
      }

      .reward-pools-scroll::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, #b091ff 0%, #8d6de8 100%);
        border-radius: 999px;
        box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
      }

      .reward-pools-scroll::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(180deg, #c3aaff 0%, #9a7ff0 100%);
      }
    `;

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const sortedRewards = [...rewardItems].sort((a, b) => {
    switch (sortOption) {
      case "quantity-asc": {
        const aValue = a.quantityValue ?? Number.MAX_SAFE_INTEGER;
        const bValue = b.quantityValue ?? Number.MAX_SAFE_INTEGER;
        return aValue - bValue;
      }
      case "quantity-desc": {
        const aValue = a.quantityValue ?? Number.MIN_SAFE_INTEGER;
        const bValue = b.quantityValue ?? Number.MIN_SAFE_INTEGER;
        return bValue - aValue;
      }
      case "recently-added":
      default:
        return a.order - b.order;
    }
  });

  return (
    <motion.div
      className="relative w-full max-w-full overflow-x-hidden overflow-y-visible 2xl:max-w-[1400px] 2xl:mx-auto 2xl:px-4"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div className="flex w-full flex-col mt-10 mb-6 items-center justify-center px-2 sm:px-4 relative z-30 overflow-visible 2xl:mt-8 2xl:mb-5 2xl:px-6">
        <motion.div
          className="flex h-auto w-full items-center justify-center border-2 border-[#B091FF] bg-white py-2 sm:border-4 md:border-6 lg:border-8 overflow-visible 2xl:border-[6px] 2xl:py-1.5"
          variants={fadeInUp}
        >
          <motion.div
            className="relative h-auto w-full border-2 border-[#E7E7E7] bg-white sm:border-4 md:border-6 lg:border-8 pt-10 sm:pt-12 md:pt-14 lg:pt-16 xl:pt-18 overflow-visible 2xl:border-[6px] 2xl:pt-14"
            variants={fadeInUp}
          >
            <Image
              src="/llamao-rewards-logo.png"
              alt="rewards-logo"
              width={514}
              height={100}
              className="absolute left-[50%] -top-12 -translate-x-1/2 w-[250px] sm:-top-14 sm:w-[300px] md:-top-16 md:w-[350px] lg:-top-15 lg:w-[400px] xl:w-[514px] 2xl:-top-10 2xl:w-[460px]"
            />

            <motion.div
              className="flex h-full w-full flex-col gap-2 px-2 py-1 sm:gap-3 sm:px-3 sm:py-1 sm:pb-6 md:gap-4 md:px-4 md:py-2 md:pb-8 xl:grid xl:grid-cols-3 xl:gap-6 xl:px-6 xl:py-2 pb-0 xl:pt-0 2xl:gap-4 2xl:px-5 2xl:py-1"
              variants={staggerContainer}
            >
              <motion.div
                className="flex flex-col space-y-1 sm:space-y-2 xl:col-span-2 xl:space-y-3 2xl:space-y-2"
                variants={staggerContainer}
              >
                <motion.div
                  className="grid w-full grid-cols-1 gap-4 -mt-6 mb-4 sm:-mt-6 sm:mb-3 md:-mt-7 md:mb-4 lg:-mt-8 lg:mb-5 xl:mt-0 xl:mb-5 sm:grid-cols-2 sm:gap-4 md:gap-5 2xl:mb-4 2xl:gap-3"
                  variants={staggerList}
                >
                  {tabs.map((tab) => (
                    <motion.div key={tab.key} variants={fadeInUp}>
                      <TabButton
                        label={tab.label}
                        isActive={activeTab === tab.key}
                        onClick={() => setActiveTab(tab.key)}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {activeTab === "rewards" ? (
                  <motion.div
                    key="rewards"
                    className="space-y-2 min-h-[300px] sm:min-h-[340px] md:min-h-[380px] lg:min-h-[430px] xl:min-h-0 2xl:min-h-0"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    <motion.div
                      className="flex min-h-[220px] w-full flex-col border-2 border-[#D7B594] bg-[#11151F] px-2 py-2 sm:border-4 sm:px-3 sm:py-3 md:border-[6px] md:px-4 md:py-4 2xl:min-h-[200px] 2xl:px-3 2xl:py-3"
                      variants={fadeInUp}
                    >
                      <Carousel
                        setApi={setApi}
                        opts={{
                          align: "start",
                          loop: true,
                          slidesToScroll: 1,
                        }}
                        className="w-full"
                        onMouseEnter={() => setCarouselPaused(true)}
                        onMouseLeave={() => setCarouselPaused(false)}
                      >
                        <CarouselContent className="-ml-3 sm:-ml-4">
                          {rewardItems.map((item, index) => {
                            const isSelected = index === current;
                            const badgeClasses =
                              item.category === "NFT"
                                ? "bg-[#FFE1BD] text-[#6A3200]"
                                : "bg-[#D8EEFF] text-[#0B3F66]";
                            const featuredLabel =
                              item.featuredName ?? item.name;

                            return (
                              <CarouselItem
                                key={item.id}
                                className="pl-3 sm:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4"
                              >
                                <motion.div
                                  className={`press-start-2p-regular flex h-full flex-col items-center justify-start gap-2.5 rounded bg-[#090B12] px-2.5 py-2.5 text-center text-[10px] leading-tight text-white transition-colors duration-200 ease-out hover:bg-[#2B1B5A] hover:text-[#F8F4FF] sm:text-xs md:text-sm ${
                                    isSelected
                                      ? "border border-[#F4B63D] shadow-[0_0_0_2px_#1A1D26]"
                                      : "border border-[#F4B63D]/30 shadow-[0_0_0_2px_#1A1D26/30]"
                                  }`}
                                  variants={fadeInUp}
                                >
                                  <div className="relative w-full flex items-center justify-center">
                                    <Image
                                      src="/prizelogo.jpg"
                                      alt={item.name}
                                      width={200}
                                      height={200}
                                      className="h-full w-auto max-h-full object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col gap-1 shrink-0 w-full text-center px-1">
                                    <span
                                      className={`text-[9px] uppercase tracking-wide px-2 py-1 rounded ${badgeClasses}`}
                                    >
                                      {item.category}
                                    </span>
                                    <div className="w-full min-h-[2.2em] flex items-center justify-center px-1">
                                      <p className="text-white text-[11px] sm:text-xs md:text-sm leading-tight text-center wrap-break-word whitespace-normal">
                                        {featuredLabel}
                                      </p>
                                    </div>
                                  </div>
                                </motion.div>
                              </CarouselItem>
                            );
                          })}
                        </CarouselContent>
                      </Carousel>
                    </motion.div>

                    <motion.div
                      className="grid w-full grid-cols-1 gap-2"
                      variants={staggerList}
                    >
                      {rewardSummaries.map((summary) => (
                        <motion.div key={summary.id} variants={fadeInUp}>
                          <Alert
                            borderColor="black"
                            className="py-1 sm:py-1 md:py-1 lg:py-1"
                          >
                            <AlertDescription className="pixelify-sans-500 flex flex-row items-center justify-between gap-2 px-0 py-0 text-black sm:px-0.5 sm:py-0">
                              <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                {summary.label}
                              </p>
                              <p className="press-start-2p-regular text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                {summary.value}
                              </p>
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.div
                      className="flex w-full flex-col gap-3 text-black pixelify-sans-500 sm:flex-row sm:items-center sm:justify-between sm:gap-2 md:gap-3"
                      variants={fadeInUp}
                    >
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg 2xl:text-base">
                        All Items
                      </p>
                      <div className="flex items-center gap-0 sm:gap-3 md:gap-4 lg:gap-6">
                        <div className="relative inline-flex items-center">
                          <select
                            value={sortOption}
                            onChange={(e) =>
                              setSortOption(e.target.value as SortOption)
                            }
                            className="pixelify-sans-500 text-[8px] sm:text-[10px] md:text-xs lg:text-sm appearance-none bg-transparent border-none outline-none cursor-pointer pr-10 sm:pr-8"
                          >
                            <option value="recently-added">
                              Sort by: Recently Added
                            </option>
                            <option value="quantity-asc">
                              Sort by: Quantity (Ascending)
                            </option>
                            <option value="quantity-desc">
                              Sort by: Quantity (Descending)
                            </option>
                          </select>
                          <Image
                            src="/arrow-black.svg"
                            alt="arrow"
                            width={20}
                            height={12}
                            className="pointer-events-none absolute right-2 top-1/2 h-auto w-3 -translate-y-1/2 sm:w-4 md:w-5 lg:w-6"
                          />
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-4 sm:space-y-5 md:space-y-6 w-full max-w-full mx-auto max-h-24 sm:max-h-28 lg:max-h-32 overflow-y-auto pr-1 reward-pools-scroll"
                      variants={staggerList}
                    >
                      {sortedRewards.map((item) => {
                        const badgeClasses =
                          item.category === "NFT"
                            ? "bg-[#FFE1BD] text-[#6A3200]"
                            : "bg-[#D8EEFF] text-[#0B3F66]";
                        const cardBackground =
                          item.category === "NFT"
                            ? "bg-[#FFF8ED]"
                            : "bg-[#EAF4FF]";

                        return (
                          <motion.div key={item.id} variants={fadeInUp}>
                            <Alert
                              borderColor="black"
                              className={`${cardBackground} px-1 py-0.5 sm:px-1.5 sm:py-1`}
                            >
                              <AlertDescription className="pixelify-sans-500 flex w-full flex-row items-center gap-2 px-0 py-0 text-black sm:gap-3">
                                <span
                                  className={`press-start-2p-regular text-[7px] uppercase tracking-wide px-2 py-1 rounded ${badgeClasses} shrink-0 w-[75px] text-center`}
                                >
                                  {item.category}
                                </span>
                                <p className="flex-1 min-w-0 text-[10px] sm:text-xs md:text-sm lg:text-base truncate">
                                  {item.name}
                                </p>
                                <div className="flex items-center gap-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm shrink-0">
                                  <span className="uppercase text-[#475160] tracking-wide">
                                    Qty
                                  </span>
                                  <span className="press-start-2p-regular text-[10px] sm:text-xs md:text-sm">
                                    {item.displayQuantity}
                                  </span>
                                </div>
                              </AlertDescription>
                            </Alert>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="participants"
                    className="relative space-y-3 sm:space-y-4 md:space-y-5"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                      <motion.div
                        className="press-start-2p-regular bg-[#9977DD] text-white px-6 py-3 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded shadow-[4px_4px_0_0_#663300]"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        COMING SOON
                      </motion.div>
                    </div>
                    <div className="blur-sm">
                      <motion.div
                        className="w-full my-3 mb-4 sm:my-4 sm:mb-5"
                        variants={fadeInUp}
                      >
                        <Alert borderColor="black">
                          <AlertDescription className="pixelify-sans-500 flex w-full flex-col gap-0.5 px-0.5 py-0 text-black sm:flex-row sm:items-center sm:justify-between sm:gap-1 sm:px-0.5 sm:py-0">
                            <div className="flex items-center gap-1 sm:gap-1.5">
                              <div className="h-auto w-4 shrink-0 sm:w-4 md:w-5 lg:w-6">
                                <Image
                                  src="/search.svg"
                                  alt="search"
                                  width={20}
                                  height={20}
                                  className="h-auto w-full"
                                />
                              </div>
                              <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                Search participant address
                              </p>
                            </div>
                          </AlertDescription>
                        </Alert>
                      </motion.div>

                      {hasParticipants ? (
                        <motion.div
                          className="w-full space-y-2 pixelify-sans-500 sm:space-y-3"
                          initial="hidden"
                          animate="visible"
                          variants={staggerContainer}
                        >
                          <motion.div
                            className="hidden w-full grid-cols-3 gap-2 px-1 text-[8px] text-[#1E3445] sm:grid sm:gap-3 sm:text-[10px] md:text-xs"
                            variants={fadeInUp}
                          >
                            <p className="sm:pl-3">Participant</p>
                            <p className="sm:pl-2">Total NFT Owned</p>
                            <p className="sm:pl-3 md:pl-4">Date Added</p>
                          </motion.div>

                          <motion.div
                            className="space-y-4 sm:space-y-4"
                            variants={staggerList}
                          >
                            {participantRows.map((row) => (
                              <motion.div key={row.id} variants={fadeInUp}>
                                <Alert borderColor="black">
                                  <AlertDescription className="pixelify-sans-500 flex w-full flex-col gap-2 px-0.5 py-0 text-black sm:gap-3 sm:px-1 sm:py-0">
                                    <div className="grid w-full items-center grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5">
                                      {participantFields.map(
                                        ({ key, label }) => (
                                          <div
                                            key={`${row.id}-${key}`}
                                            className="flex flex-col gap-1.5 text-[8px] sm:text-[10px] md:text-xs lg:text-sm min-w-0 overflow-hidden"
                                          >
                                            <span className="text-[8px] uppercase text-[#475160] sm:hidden">
                                              {label}
                                            </span>
                                            <p className="press-start-2p-regular wrap-break-word break-all text-[8px] sm:wrap-break-word sm:text-[10px] md:text-xs lg:text-sm overflow-wrap-anywhere">
                                              {row[key]}
                                            </p>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </AlertDescription>
                                </Alert>
                              </motion.div>
                            ))}

                            <motion.div variants={fadeInUp}>
                              <Alert
                                borderColor="black"
                                className="bg-[#C9B9F7]"
                              >
                                <AlertDescription className="pixelify-sans-500 flex w-full flex-col gap-3 px-0 py-0 text-black sm:gap-4 sm:px-0.5 sm:py-0">
                                  <div className="grid w-full items-center grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-4 md:gap-5">
                                    <div className="flex items-start gap-3 sm:items-center sm:gap-4">
                                      <div className="h-auto w-8 shrink-0 sm:w-10 md:w-12">
                                        <Image
                                          src="/llamao-gen.png"
                                          alt="llamao"
                                          width={100}
                                          height={100}
                                          className="h-auto w-full"
                                        />
                                      </div>
                                      <div className="flex flex-col gap-1.5 min-w-0 flex-1 overflow-hidden">
                                        <span className="text-[9px] uppercase text-[#475160] sm:hidden">
                                          Participant
                                        </span>
                                        <p className="pixelify-sans-500 text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                          YOU
                                        </p>
                                        <p className="press-start-2p-regular wrap-break-word break-all text-[8px] sm:wrap-break-word sm:text-[10px] md:text-xs lg:text-sm overflow-wrap-anywhere">
                                          {highlightedParticipant.address}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 text-[8px] sm:text-[10px] md:text-xs lg:text-sm min-w-0 overflow-hidden">
                                      <span className="text-[8px] uppercase text-[#475160] sm:hidden">
                                        Total NFT Owned
                                      </span>
                                      <p className="press-start-2p-regular wrap-break-word break-all text-[8px] sm:wrap-break-word sm:text-[10px] md:text-xs lg:text-sm overflow-wrap-anywhere">
                                        {highlightedParticipant.totalOwned}
                                      </p>
                                    </div>

                                    <div className="flex flex-col gap-1.5 text-[8px] sm:text-[10px] md:text-xs lg:text-sm min-w-0 overflow-hidden">
                                      <span className="text-[8px] uppercase text-[#475160] sm:hidden">
                                        Date Added
                                      </span>
                                      <p className="press-start-2p-regular wrap-break-word break-all text-[8px] sm:wrap-break-word sm:text-[10px] md:text-xs lg:text-sm overflow-wrap-anywhere">
                                        {highlightedParticipant.dateAdded}
                                      </p>
                                    </div>
                                  </div>
                                </AlertDescription>
                              </Alert>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.div
                          className="press-start-2p-regular flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#B091FF] bg-[#F7F2FF] py-6 text-center text-[#6043AF] sm:gap-3 sm:border-2 sm:py-8 md:gap-4 md:border-4 md:py-10 lg:py-12"
                          variants={fadeInUp}
                        >
                          <Image
                            src="/reward-pool-bg.svg"
                            alt="participants coming soon"
                            width={220}
                            height={48}
                            className="h-auto w-full max-w-[140px] select-none sm:max-w-[180px] md:max-w-[200px] lg:max-w-[220px]"
                          />
                          <p className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm px-2">
                            Participants list is coming soon.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                className="flex flex-col gap-4 sm:gap-5 md:grid md:grid-cols-2 md:gap-6 md:auto-rows-[1fr] lg:gap-8 xl:flex xl:flex-col xl:col-span-1 xl:gap-6 2xl:gap-4"
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeInUp}
                  className="md:col-span-1 h-full"
                >
                  <Alert borderColor="#6043AF" className="md:h-full xl:h-auto">
                    <AlertDescription className="pixelify-sans-500 flex md:h-full xl:h-auto flex-col gap-2 px-0.5 py-0.5 text-black sm:gap-3 sm:px-1 sm:py-0.5 md:gap-3 md:px-1.5 md:py-0.5 lg:gap-4">
                      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="silkscreen-regular text-sm text-[#2245C5] sm:text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl">
                          YOUR NFT
                        </p>
                      </div>

                      <BlurredBackgroundButton text="COMING SOON" id="nft" />

                      <div className="w-full text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                        The Llamao Blessing Pool is a reward campaign designed
                        to appreciate and celebrate our community members who
                        support Llamao by minting and holding NFTs on mainnet
                      </div>
                    </AlertDescription>
                  </Alert>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="md:col-span-1 h-full"
                >
                  <Alert borderColor="#6043AF" className="md:h-full xl:h-auto">
                    <AlertDescription className="pixelify-sans-500 flex md:h-full xl:h-auto flex-col gap-2 px-0.5 py-0.5 text-black sm:gap-3 sm:px-1 sm:py-0.5 md:gap-3 md:px-1 md:py-0.5 lg:gap-4">
                      <div className="flex w-full items-center justify-between">
                        <p className="silkscreen-regular text-sm text-[#2245C5] sm:text-base md:text-lg lg:text-xl xl:tracking-tight xl:text-xl 2xl:text-xl">
                          COUNTDOWN TIMER
                        </p>
                      </div>

                      <BlurredBackgroundButton
                        text="STAY TUNED"
                        id="countdown"
                        variant="xl-compact"
                      />

                      <div className="w-full text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                        {`Once the raffle date is set, the countdown is on. Don’t miss it`}
                      </div>
                    </AlertDescription>
                  </Alert>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
