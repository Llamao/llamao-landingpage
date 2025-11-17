"use client";

import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import RewardPools from "@/components/RewardPools";

export default function RewardPoolsPage() {
  return (
    <PageLayout>
      <div className="w-full flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative w-[90%] sm:w-[80%] lg:w-[80%] max-w-[1200px] xl:max-w-[1400px] z-50 flex flex-col gap-5 overflow-visible mt-8 sm:mt-10 lg:mt-4 mb-10 sm:mb-12 lg:mb-16"
        >
          <RewardPools />
        </motion.div>
      </div>
    </PageLayout>
  );
}
