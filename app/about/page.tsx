"use client";

import { motion } from "framer-motion";
import PageLayout from "@/components/PageLayout";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full mx-auto flex flex-col items-center gap-5 px-4 md:px-8 xl:px-6 pt-6 md:pt-16 lg:pt-20 pb-16 max-w-3xl lg:max-w-4xl xl:max-w-3xl"
      >
        <About />
      </motion.div>
    </PageLayout>
  );
}
