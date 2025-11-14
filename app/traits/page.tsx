"use client";

import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import Traits from "@/components/Traits";

export default function TraitsPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-5xl mx-auto flex flex-col items-center gap-5 px-4 md:px-8 pt-6 md:pt-14 lg:pt-16 pb-16"
      >
        <Traits />
      </motion.div>
    </PageLayout>
  );
}
