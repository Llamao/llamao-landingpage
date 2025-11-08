"use client";

import { Alert, AlertDescription } from "@/components/ui/8bit/alert";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import useWindowSize from "@/hooks/useWindowSize";

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

const featuredPrizes = [
  { title: "Prize 1", description: "NFT of Llamao" },
  { title: "Prize 2", description: "NFT of Llamao" },
  { title: "Prize 3", description: "NFT of Llamao" },
  { title: "Prize 4", description: "NFT of Llamao" },
  { title: "Prize 5", description: "NFT of Llamao" },
];

const rewardSummaries = [
  { id: "estimated-value", label: "Total Estimated Value", value: "5000 MON" },
  { id: "last-updated", label: "Last Updated", value: "5 days ago" },
];

const rewardCardsData = [
  {
    id: "highlight",
    className: "bg-[#C9B9F7]",
    value: 5000,
    quantity: 1,
    dateAdded: "5 days ago",
    daysAgo: 5,
  },
  {
    id: "default",
    className: "",
    value: 5000,
    quantity: 1,
    dateAdded: "5 days ago",
    daysAgo: 5,
  },
];

type ParticipantRow = {
  id: string;
  address: string;
  totalOwned: string;
  totalPurchase: string;
  dateAdded: string;
};

const participantFields = [
  { key: "address", label: "Participant" },
  { key: "totalOwned", label: "Total NFT Owned" },
  { key: "totalPurchase", label: "Total NFT Purchase" },
  { key: "dateAdded", label: "Date Added" },
] as const;

const participantStatFields = [
  { key: "totalOwned", label: "Total NFT Owned" },
  { key: "totalPurchase", label: "Total NFT Purchase" },
  { key: "dateAdded", label: "Date Added" },
] as const;

const participantRows: ParticipantRow[] = Array.from(
  { length: 6 },
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
  totalPurchase: "5000 NFTs",
  dateAdded: "01/01/2026",
};

type TabKey = "rewards" | "participants";

const tabs: { key: TabKey; label: string }[] = [
  { key: "rewards", label: "REWARDS and VAULTS" },
  { key: "participants", label: "Participants" },
];

function BlurredBackgroundButton({ text, id }: { text: string; id: string }) {
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

  return (
    <div className="relative w-full overflow-visible flex items-center justify-center my-2 sm:my-3 px-2 sm:px-3">
      <div className="relative w-full h-[70px] sm:h-[80px] md:h-[90px] lg:h-[100px] flex items-center justify-center">
        <div className="absolute inset-0 flex w-full gap-0.5 blur-[2px] sm:gap-1 sm:blur-[3px] md:gap-1.5 md:blur-[4px] z-0 opacity-60">
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
          className="press-start-2p-regular relative z-10 w-full max-w-[280px] h-[40px] text-center text-white transition-transform hover:scale-[1.03] active:scale-95 sm:h-[45px] md:h-[50px] lg:h-[55px] bg-[#B091FF] flex items-center justify-center"
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

type SortOption =
  | "recently-added"
  | "value-asc"
  | "value-desc"
  | "quantity-asc"
  | "quantity-desc";

export default function RewardPools() {
  const [activeTab, setActiveTab] = useState<TabKey>("rewards");
  const [sortOption, setSortOption] = useState<SortOption>("recently-added");

  return (
    <motion.div
      className="relative w-full max-w-[100%] overflow-x-hidden overflow-y-visible"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <motion.div
        className="flex w-full flex-col mt-10 mb-6 items-center justify-center px-2 sm:px-4 relative z-30 overflow-visible"
      >
        <motion.div
          className="flex h-auto w-full items-center justify-center border-2 border-[#B091FF] bg-white py-2 sm:border-4 md:border-6 lg:border-8 overflow-visible"
          variants={fadeInUp}
        >
          <motion.div
            className="relative h-auto w-full border-2 border-[#E7E7E7] bg-white sm:border-4 md:border-6 lg:border-8 pt-10 sm:pt-12 md:pt-14 lg:pt-16 xl:pt-18 overflow-visible"
            variants={fadeInUp}
          >
            <Image
              src="/llamao-rewards-logo.png"
              alt="rewards-logo"
              width={514}
              height={100}
              className="absolute left-[50%] -top-12 -translate-x-1/2 w-[250px] sm:-top-14 sm:w-[300px] md:-top-16 md:w-[350px] lg:-top-15 lg:w-[400px] xl:w-[514px]"
            />

            <motion.div
              className="flex h-full w-full flex-col gap-2 px-2 py-1 sm:gap-3 sm:px-3 sm:py-1 md:gap-4 md:px-4 md:py-2 xl:grid xl:grid-cols-3 xl:gap-6 xl:px-6 xl:py-2 xl:pt-0"
              variants={staggerContainer}
            >
              <motion.div
                className="flex flex-col space-y-1 sm:space-y-2 xl:col-span-2 xl:space-y-3"
                variants={staggerContainer}
              >
                <motion.div
                  className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 md:gap-4"
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
                    className="space-y-2 min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px]"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    <motion.div
                      className="flex min-h-[200px] w-full flex-col border-2 border-[#D7B594] bg-[#11151F] px-2 py-1 sm:border-4 sm:px-3 sm:py-1.5 md:border-[6px] md:px-4 md:py-2"
                      variants={fadeInUp}
                    >
                      <p className="press-start-2p-regular text-[10px] text-white sm:text-xs md:text-sm lg:text-base">
                        Featured Prizes
                      </p>
                      <motion.div
                        className="mt-2 grid h-full grid-cols-2 gap-2 sm:mt-3 sm:grid-cols-3 sm:gap-2 md:mt-3 md:grid-cols-4 md:gap-3 lg:mt-4 lg:grid-cols-5 lg:gap-3"
                        variants={staggerList}
                      >
                        {featuredPrizes.map((prize, index) => (
                          <motion.div
                            key={prize.title}
                            className={`press-start-2p-regular flex h-full flex-col items-center justify-start gap-0.5 bg-[#090B12] px-1.5 py-1 text-center text-[8px] leading-tight text-white transition-transform duration-150 ease-out hover:scale-[1.03] sm:gap-1 sm:px-2 sm:py-1 sm:text-[10px] sm:leading-5 md:gap-1 md:px-3 md:py-1.5 md:text-xs md:leading-6 ${
                              index === 0
                                ? "border border-[#F4B63D] shadow-[0_0_0_1px_#1A1D26] sm:border-2 sm:shadow-[0_0_0_2px_#1A1D26] md:border-[3px] md:shadow-[0_0_0_3px_#1A1D26]"
                                : ""
                            }`}
                            variants={fadeInUp}
                          >
                            <div className="relative w-full flex items-center justify-center min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px]">
                              <Image
                                src="/prizelogo.jpg"
                                alt={`${prize.title} logo`}
                                width={110}
                                height={110}
                                className="h-auto w-auto max-w-full object-contain scale-105 sm:scale-108 md:scale-110"
                              />
                            </div>
                            <div className="flex flex-col gap-0.5 shrink-0 w-full text-center px-1 max-w-[60px] sm:max-w-[70px] md:max-w-[80px] mx-auto">
                              <span className="wrap-break-word whitespace-normal min-h-[1.2em] flex items-center justify-center leading-tight">
                                {prize.title}
                              </span>
                              <span className="text-[7px] sm:text-[8px] md:text-[10px] whitespace-normal wrap-break-word min-h-[1.2em] flex items-center justify-center leading-tight">
                                {prize.description}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2"
                      variants={staggerList}
                    >
                      {rewardSummaries.map((summary) => (
                        <motion.div key={summary.id} variants={fadeInUp}>
                          <Alert borderColor="black">
                            <AlertDescription className="pixelify-sans-500 px-0 py-0 text-black sm:px-0.5 sm:py-0">
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
                      className="flex w-full flex-col gap-1 text-black pixelify-sans-500 sm:flex-row sm:items-center sm:justify-between sm:gap-2 md:gap-3"
                      variants={fadeInUp}
                    >
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg">
                        All Items
                      </p>
                      <div className="relative flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                        <select
                          value={sortOption}
                          onChange={(e) =>
                            setSortOption(e.target.value as SortOption)
                          }
                          className="pixelify-sans-500 text-[8px] sm:text-[10px] md:text-xs lg:text-sm appearance-none bg-transparent border-none outline-none cursor-pointer pr-6"
                        >
                          <option value="recently-added">
                            Sort by: Recently Added
                          </option>
                          <option value="value-asc">
                            Sort by: Value (Ascending)
                          </option>
                          <option value="value-desc">
                            Sort by: Value (Descending)
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
                          className="h-auto w-3 sm:w-4 md:w-5 lg:w-6 absolute right-0 pointer-events-none"
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      className="space-y-2 sm:space-y-3 md:space-y-4"
                      variants={staggerList}
                    >
                      {(() => {
                        const sortedCards = [...rewardCardsData].sort((a, b) => {
                          switch (sortOption) {
                            case "value-asc":
                              return a.value - b.value;
                            case "value-desc":
                              return b.value - a.value;
                            case "quantity-asc":
                              return a.quantity - b.quantity;
                            case "quantity-desc":
                              return b.quantity - a.quantity;
                            case "recently-added":
                            default:
                              return a.daysAgo - b.daysAgo;
                          }
                        });
                        return sortedCards;
                      })().map((card) => (
                        <motion.div key={card.id} variants={fadeInUp}>
                          <Alert borderColor="black" className={card.className}>
                            <AlertDescription className="pixelify-sans-500 flex w-full flex-col gap-0.5 px-0.5 py-0 text-black sm:flex-row sm:flex-wrap sm:justify-between sm:gap-1 sm:px-1 sm:py-0 md:flex-nowrap md:gap-2">
                              <div className="flex items-center gap-1 sm:gap-2">
                                <div className="h-auto w-8 shrink-0 sm:w-10 md:w-12">
                                  <Image
                                    src="/llamao-gen.png"
                                    alt="llamao"
                                    width={424}
                                    height={424}
                                    className="h-auto w-full"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-[8px] sm:text-[10px] md:text-xs">
                                    NFT
                                  </p>
                                  <p className="press-start-2p-regular wrap-break-word text-[8px] sm:text-[10px] md:text-xs">
                                    LLAMAO #1
                                  </p>
                                </div>
                              </div>
                              <div className="text-[8px] sm:text-[10px] md:text-xs">
                                <p>Total Estimated Value</p>
                                <p className="press-start-2p-regular">
                                  {card.value} MON
                                </p>
                              </div>
                              <div className="text-[8px] sm:text-[10px] md:text-xs">
                                <p>Quantity</p>
                                <p className="press-start-2p-regular">
                                  {card.quantity}
                                </p>
                              </div>
                              <div className="text-[8px] sm:text-[10px] md:text-xs">
                                <p>Day Added</p>
                                <p className="press-start-2p-regular wrap-break-word">
                                  {card.daysAgo} DAYS AGO
                                </p>
                              </div>
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="participants"
                    className="space-y-2 sm:space-y-3 md:space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}
                  >
                    <motion.div className="w-full" variants={fadeInUp}>
                      <Alert borderColor="black">
                        <AlertDescription className="pixelify-sans-500 flex w-full flex-col gap-1 px-0.5 py-0 text-black sm:flex-row sm:items-center sm:justify-between sm:gap-1.5 sm:px-1 sm:py-0">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <div className="h-auto w-5 shrink-0 sm:w-6 md:w-8 lg:w-10">
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
                          className="hidden grid-cols-2 gap-2 px-2 text-[8px] text-[#1E3445] sm:grid sm:grid-cols-4 sm:gap-3 sm:text-[10px] md:text-xs"
                          variants={fadeInUp}
                        >
                          <p>Participant</p>
                          <p className="sm:pl-4">Total NFT Owned</p>
                          <p className="sm:pl-4">Total NFT Purchase</p>
                          <p className="sm:pl-6 md:pl-8">Date Added</p>
                        </motion.div>

                        <motion.div
                          className="space-y-2 sm:space-y-3"
                          variants={staggerList}
                        >
                          {participantRows.map((row) => (
                            <motion.div key={row.id} variants={fadeInUp}>
                              <Alert borderColor="black">
                                <AlertDescription className="pixelify-sans-500 flex w-full flex-col gap-1.5 px-2 py-1 text-black sm:gap-2 sm:px-3 sm:py-1">
                                  <div className="grid gap-2 sm:grid-cols-4 sm:gap-3 md:gap-4">
                                    {participantFields.map(({ key, label }) => (
                                      <div
                                        key={`${row.id}-${key}`}
                                        className="flex flex-col gap-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
                                      >
                                        <span className="text-[8px] uppercase text-[#475160] sm:hidden">
                                          {label}
                                        </span>
                                        <p className="press-start-2p-regular break-all text-[8px] sm:break-normal sm:text-[10px] md:text-xs lg:text-sm">
                                          {row[key]}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </AlertDescription>
                              </Alert>
                            </motion.div>
                          ))}

                          <motion.div variants={fadeInUp}>
                            <Alert borderColor="black" className="bg-[#C9B9F7]">
                              <AlertDescription className="pixelify-sans-500 flex w-full flex-col gap-2 px-2 py-1 text-black sm:gap-3 sm:px-3 sm:py-1.5">
                                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 md:gap-6">
                                  <div className="flex items-start gap-2 sm:items-center sm:gap-3">
                                    <div className="h-auto w-8 shrink-0 sm:w-10 md:w-12">
                                      <Image
                                        src="/llamao-gen.png"
                                        alt="llamao"
                                        width={100}
                                        height={100}
                                        className="h-auto w-full"
                                      />
                                    </div>
                                    <div className="flex flex-col gap-1 min-w-0 flex-1">
                                      <span className="text-[9px] uppercase text-[#475160] sm:hidden">
                                        Participant
                                      </span>
                                      <p className="pixelify-sans-500 text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                        YOU
                                      </p>
                                      <p className="press-start-2p-regular break-all text-[8px] sm:break-normal sm:text-[10px] md:text-xs lg:text-sm">
                                        {highlightedParticipant.address}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="grid w-full gap-2 sm:grid-cols-3 sm:gap-3 md:gap-4">
                                    {participantStatFields.map(
                                      ({ key, label }) => (
                                        <div
                                          key={`highlight-${key}`}
                                          className="flex flex-col gap-1 text-[8px] sm:text-[10px] md:text-xs lg:text-sm"
                                        >
                                          <span className="text-[8px] uppercase text-[#475160] sm:hidden">
                                            {label}
                                          </span>
                                          <p className="press-start-2p-regular text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                                            {highlightedParticipant[key]}
                                          </p>
                                        </div>
                                      )
                                    )}
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
                  </motion.div>
                )}
              </motion.div>

              <motion.div
                className="flex flex-col gap-2 sm:gap-3 md:grid md:grid-cols-2 md:gap-3 xl:flex xl:flex-col xl:col-span-1 xl:gap-3"
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="md:col-span-1">
                  <Alert borderColor="#6043AF">
                    <AlertDescription className="pixelify-sans-500 w-full space-y-1 px-1 py-0.5 text-black sm:space-y-1.5 sm:px-1.5 sm:py-1 md:space-y-2 md:px-2 md:py-1 lg:space-y-3">
                      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <p className="silkscreen-regular text-sm text-[#2245C5] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                          YOUR NFT
                        </p>
                      </div>

                      <BlurredBackgroundButton text="COMING SOON" id="nft" />

                      <div className="w-full text-[8px] sm:text-[10px] md:text-xs lg:text-sm">
                      The Llamao Blessing Pool is a reward campaign designed to appreciate and celebrate our community members who support Llamao by minting and holding NFTs on mainnet

                      </div>
                    </AlertDescription>
                  </Alert>
                </motion.div>

                <motion.div variants={fadeInUp} className="md:col-span-1">
                  <Alert borderColor="#6043AF">
                    <AlertDescription className="pixelify-sans-500 w-full space-y-1 px-1 py-0.5 text-black sm:space-y-1.5 sm:px-1.5 sm:py-1 md:space-y-2 md:px-2 md:py-1 lg:space-y-3">
                      <div className="flex w-full items-center justify-between">
                        <p className="silkscreen-regular text-sm text-[#2245C5] sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                          COUNTDOWN TIMER
                        </p>
                      </div>

                      <BlurredBackgroundButton text="STAY TUNED" id="countdown" />

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

