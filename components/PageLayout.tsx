"use client";

import { motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import Background from "./Background";
import NavigationBar from "./NavigationBar";

const mainVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const stackVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 },
  },
};

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = useMemo(() => pathname === "/", [pathname]);
  const isRewardPoolsPage = useMemo(() => pathname === "/reward-pools", [pathname]);

  return (
    <motion.main
      initial="hidden"
      animate="visible"
      variants={mainVariants}
      className={`relative w-full ${isRewardPoolsPage ? 'h-auto min-h-screen overflow-y-auto overflow-x-clip reward-pools-scroll' : 'h-screen overflow-x-clip min-h-screen'}`}
    >
      <Background />

      {/* Backdrop overlay for non-home pages - rendered early with low z-index */}
      {!isHomePage && (
        <div
          className="fixed inset-0 bg-black/50 pointer-events-none"
          aria-hidden="true"
          style={{ zIndex: 35 }}
        />
      )}

      <motion.div
        variants={stackVariants}
        className="h-full flex flex-col justify-between w-[95%] mx-auto relative"
        style={{ zIndex: 40 }}
      >
        <motion.div
          variants={stackVariants}
          className="flex flex-col items-center mx-auto w-full mt-3 relative"
          style={{ zIndex: 100 }}
        >
          <NavigationBar />
        </motion.div>
        <motion.div
          variants={stackVariants}
          className={`flex-1 flex flex-col ${isRewardPoolsPage ? 'items-center justify-start' : 'items-center justify-between'} w-full mx-auto relative`}
          initial="hidden"
          animate="visible"
          style={{ zIndex: 50 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.main>
  );
}

