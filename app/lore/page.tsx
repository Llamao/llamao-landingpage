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
        className="relative w-full max-w-4xl mx-auto flex flex-col items-center gap-5 px-4 md:px-8 pt-0 -mt-6 md:mt-0 md:pt-14 lg:pt-18 pb-16"
      >
        <Lore />
      </motion.div>
    </PageLayout>
  );
}
