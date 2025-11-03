"use client";

import { Alert, AlertDescription } from "@/components/ui/8bit/alert";
import { Button } from "@/components/ui/8bit/button";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const MotionButton = motion.create(Button);

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

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

const rewardCards = [
  { id: "highlight", className: "bg-[#C9B9F7]" },
  { id: "default", className: "" },
];

const participantRows = Array.from({ length: 6 }, (_, index) => ({
  id: `participant-${index}`,
  address: "0x...aaaa",
  totalOwned: "5000 NFTs",
  totalPurchase: "5000 NFTs",
  dateAdded: "01/01/2026",
}));

const hasParticipants = participantRows.length > 0;

const highlightedParticipant = {
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
      className="relative h-[50px] w-full cursor-pointer overflow-hidden text-center text-white transition-transform hover:scale-[1.03] active:scale-95 focus:outline-none press-start-2p-regular"
    >
      <Image
        src={
          isActive ? "/rewards-pinkcard-bg.png" : "/rewards-blackcard-bg.png"
        }
        alt={`${label.toLowerCase()} background`}
        width={365}
        height={70}
        className={`absolute inset-0 z-10 h-full w-full select-none object-contain ${
          isActive ? "" : "opacity-60"
        }`}
      />
      <span className="relative z-20 flex h-full items-center justify-center">
        {label}
      </span>
    </button>
  );
}

export default function RewardPools() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("rewards");

  return (
    <motion.div
      className="mx-auto my-10 flex max-w-[80%] flex-col items-center justify-center"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeInUp}>
        <MotionButton
          onClick={() => router.push("/")}
          className="bg-[#6043AF] px-6 py-6 text-xl transition-colors hover:bg-[#4a2f8f]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Back
        </MotionButton>
      </motion.div>

      <motion.div
        className="mt-25 flex h-auto w-[1400px] items-center justify-center border-10 border-[#B091FF] bg-white py-2"
        variants={fadeInUp}
      >
        <motion.div
          className="relative h-auto w-[1360px] border-10 border-[#E7E7E7] bg-white"
          variants={fadeInUp}
        >
          <Image
            src="/llamao-rewards-logo.png"
            alt="rewards-logo"
            width={514}
            height={100}
            className="absolute left-[50%] -top-22 -translate-x-1/2"
          />

          <motion.div
            className="grid h-full w-full grid-cols-3 gap-10 p-8"
            variants={staggerContainer}
          >
            <motion.div
              className="col-span-2 space-y-5"
              variants={staggerContainer}
            >
              <motion.div
                className="grid w-full grid-cols-2 gap-5"
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
                  className="space-y-5"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div
                    className="flex h-[300px] w-full flex-col border-7 border-[#D7B594] bg-[#11151F] px-6 py-5"
                    variants={fadeInUp}
                  >
                    <p className="press-start-2p-regular text-lg text-white">
                      Featured Prizes
                    </p>
                    <motion.div
                      className="mt-6 grid h-full grid-cols-5 gap-5"
                      variants={staggerList}
                    >
                      {featuredPrizes.map((prize, index) => (
                        <motion.div
                          key={prize.title}
                          className={`press-start-2p-regular flex h-full flex-col items-center justify-end gap-3 bg-[#090B12] pb-3 text-center text-sm leading-6 text-white transition-transform duration-150 ease-out hover:scale-[1.03] ${
                            index === 0
                              ? "border-4 border-[#F4B63D] shadow-[0_0_0_3px_#1A1D26]"
                              : ""
                          }`}
                          variants={fadeInUp}
                        >
                          <span>{prize.title}</span>
                          <span>{prize.description}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <motion.div
                    className="grid w-full grid-cols-2 gap-3"
                    variants={staggerList}
                  >
                    {rewardSummaries.map((summary) => (
                      <motion.div key={summary.id} variants={fadeInUp}>
                        <Alert borderColor="black">
                          <AlertDescription className="pixelify-sans-500 text-black">
                            <p>{summary.label}</p>
                            <p className="press-start-2p-regular">
                              {summary.value}
                            </p>
                          </AlertDescription>
                        </Alert>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    className="flex w-full items-center justify-between text-xl text-black pixelify-sans-500"
                    variants={fadeInUp}
                  >
                    <p>All Items</p>
                    <div className="flex items-center gap-6">
                      <p>Sort by: Recently Added Items</p>
                      <Image
                        src="/arrow-black.svg"
                        alt="arrow"
                        width={20}
                        height={12}
                      />
                    </div>
                  </motion.div>

                  <motion.div className="space-y-5" variants={staggerList}>
                    {rewardCards.map((card) => (
                      <motion.div key={card.id} variants={fadeInUp}>
                        <Alert borderColor="black" className={card.className}>
                          <AlertDescription className="pixelify-sans-500 flex w-full justify-between text-black">
                            <div className="flex items-center gap-3">
                              <div className="h-auto w-12">
                                <Image
                                  src="/llamao-gen.png"
                                  alt="llamao"
                                  width={424}
                                  height={424}
                                />
                              </div>
                              <div>
                                <p>NFT</p>
                                <p className="press-start-2p-regular">
                                  LLAMAO #1
                                </p>
                              </div>
                            </div>
                            <div>
                              <p>Total Estimated Value</p>
                              <p className="press-start-2p-regular">5000 MON</p>
                            </div>
                            <div>
                              <p>Quantity</p>
                              <p className="press-start-2p-regular">1</p>
                            </div>
                            <div>
                              <p>Day Added</p>
                              <p className="press-start-2p-regular">
                                5 DAYS AGO
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
                  className="space-y-6"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainer}
                >
                  <motion.div className="w-full" variants={fadeInUp}>
                    <Alert borderColor="black">
                      <AlertDescription className="pixelify-sans-500 flex w-full justify-between text-black">
                        <div className="flex items-center">
                          <div className="h-auto w-12">
                            <Image
                              src="/search.svg"
                              alt="search"
                              width={20}
                              height={20}
                            />
                          </div>
                          <p>Search participant address</p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </motion.div>

                  {hasParticipants ? (
                    <motion.div
                      className="w-full space-y-4 pixelify-sans-500"
                      initial="hidden"
                      animate="visible"
                      variants={staggerContainer}
                    >
                      <motion.div
                        className="grid w-full grid-cols-4 px-2 text-[#1E3445]"
                        variants={fadeInUp}
                      >
                        <p>Participant</p>
                        <p className="pl-6">Total NFT Owned</p>
                        <p className="pl-6">Total NFT Purchase</p>
                        <p className="pl-12">Date Added</p>
                      </motion.div>

                      <motion.div className="space-y-4" variants={staggerList}>
                        {participantRows.map((row) => (
                          <motion.div key={row.id} variants={fadeInUp}>
                            <Alert borderColor="black">
                              <AlertDescription className="pixelify-sans-500 flex w-full justify-between text-black">
                                <div className="press-start-2p-regular flex w-full justify-between">
                                  <p>{row.address}</p>
                                  <p>{row.totalOwned}</p>
                                  <p>{row.totalPurchase}</p>
                                  <p>{row.dateAdded}</p>
                                </div>
                              </AlertDescription>
                            </Alert>
                          </motion.div>
                        ))}

                        <motion.div variants={fadeInUp}>
                          <Alert borderColor="black" className="bg-[#C9B9F7]">
                            <AlertDescription className="pixelify-sans-500 flex w-full justify-between text-black">
                              <div className="press-start-2p-regular flex w-full justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="h-auto w-12">
                                    <Image
                                      src="/llamao-gen.png"
                                      alt="llamao"
                                      width={100}
                                      height={100}
                                    />
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="pixelify-sans-500">YOU</p>
                                    <p>{highlightedParticipant.address}</p>
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <p className="pixelify-sans-500">
                                    Total NFT Owned
                                  </p>
                                  <p>{highlightedParticipant.totalOwned}</p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="pixelify-sans-500">
                                    Total NFT Purchase
                                  </p>
                                  <p>{highlightedParticipant.totalPurchase}</p>
                                </div>
                                <div className="flex flex-col">
                                  <p className="pixelify-sans-500">Day Added</p>
                                  <p>{highlightedParticipant.dateAdded}</p>
                                </div>
                              </div>
                            </AlertDescription>
                          </Alert>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="press-start-2p-regular flex w-full flex-col items-center justify-center gap-4 rounded-md border-4 border-dashed border-[#B091FF] bg-[#F7F2FF] py-12 text-center text-[#6043AF]"
                      variants={fadeInUp}
                    >
                      <Image
                        src="/reward-pool-bg.svg"
                        alt="participants coming soon"
                        width={220}
                        height={48}
                        className="h-auto w-full max-w-[220px] select-none"
                      />
                      <p>Participants list is coming soon.</p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className="col-span-1 flex flex-col gap-2"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <Alert borderColor="#6043AF">
                  <AlertDescription className="pixelify-sans-500 w-full space-y-6 text-black">
                    <div className="flex w-full items-center justify-between">
                      <p className="silkscreen-regular text-2xl text-[#2245C5]">
                        YOUR NFT
                      </p>
                      <Alert
                        borderColor="black"
                        className="w-auto bg-[#80EED3] py-1 opacity-31"
                      >
                        <AlertDescription className="pixelify-sans-500 text-black">
                          <div className="flex items-center justify-between">
                            <p className="text-lg">Coming Soon</p>
                          </div>
                        </AlertDescription>
                      </Alert>
                    </div>

                    <div className="relative h-[80px] w-full">
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="press-start-2p-regular relative w-[70%] text-center text-white transition-transform hover:scale-[1.03] active:scale-95">
                          <Image
                            src="/reward-pool-bg.svg"
                            alt="coming soon"
                            width={268}
                            height={50}
                            className="h-auto w-full select-none"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            COMING SOON
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex w-full gap-3 blur">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div className="w-full" key={`blurred-nft-${index}`}>
                            <Image
                              src="/llamao-gen.png"
                              alt="llamao"
                              width={424}
                              height={424}
                              className="h-auto w-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full text-lg">
                      The Llamao Blessing Pool is a campaign that runs from now
                      until one month after mainnet launch, designed to reward
                      the believers who mint, buy, and hold Llamao NFTs.
                    </div>
                  </AlertDescription>
                </Alert>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Alert borderColor="#6043AF">
                  <AlertDescription className="pixelify-sans-500 w-full space-y-6 text-black">
                    <div className="flex w-full items-center justify-between">
                      <p className="silkscreen-regular text-2xl text-[#2245C5]">
                        COUNTDOWN TIMER
                      </p>
                    </div>

                    <div className="relative h-[80px] w-full">
                      <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="press-start-2p-regular relative w-[70%] text-center text-white transition-transform hover:scale-[1.03] active:scale-95">
                          <Image
                            src="/reward-pool-bg.svg"
                            alt="coming soon"
                            width={268}
                            height={50}
                            className="h-auto w-full select-none"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            STAY TUNED
                          </div>
                        </div>
                      </div>

                      <div className="absolute inset-0 flex w-full gap-3 blur">
                        {Array.from({ length: 4 }).map((_, index) => (
                          <div
                            className="w-full"
                            key={`blurred-countdown-${index}`}
                          >
                            <Image
                              src="/llamao-gen.png"
                              alt="llamao"
                              width={424}
                              height={424}
                              className="h-auto w-full object-contain"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="w-full text-lg">
                      {`You'll be able to enter our Blesing Pools and discover what's inside at the end of the time.`}
                    </div>
                  </AlertDescription>
                </Alert>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
