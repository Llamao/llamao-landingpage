"use client";

import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import Lore from "@/components/Lore";

export default function LorePage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed left-1/2 -translate-x-1/2 top-[15%] lg:top-[50%] 2xl:top-[50%] w-[90%] lg:w-auto lg:-translate-y-[41%] z-50 flex flex-col gap-5"
      >
        <Lore />
      </motion.div>
    </PageLayout>
  );
}

