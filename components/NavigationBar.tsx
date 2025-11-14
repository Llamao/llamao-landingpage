"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type NavVariant = "primary" | "default" | "cta";
type NavLink = {
  href: string;
  label: string;
  variant: NavVariant;
};

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks: NavLink[] = [
    { href: "/", label: "Llome", variant: "default" },
    { href: "/about", label: "Llabout", variant: "default" },
    { href: "/lore", label: "Llore", variant: "default" },
    { href: "/traits", label: "Lltraits", variant: "default" },
    { href: "/reward-pools", label: "Reward Pools", variant: "cta" },
  ];

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const getActiveVariant = (link: NavLink): NavVariant => {
    if (link.variant === "cta") return "cta";
    return pathname === link.href ? "primary" : "default";
  };

  const getDesktopLinkClasses = (variant: NavVariant) => {
    switch (variant) {
      case "primary":
        return "text-white bg-[#B091FF] py-2 px-2 lg:text-lg hover:bg-purple-700 transition-colors";
      case "cta":
        return "relative inline-flex items-center justify-center px-6 py-3 text-white text-sm lg:text-lg uppercase transition-transform hover:scale-[1.03] active:scale-95 bg-[url('/reward-pool-bg.svg')] bg-contain bg-center bg-no-repeat";
      default:
        return "text-[#21201E] text-sm md:text-base lg:text-lg hover:text-purple-600 transition-colors";
    }
  };

  const getMobileLinkClasses = (variant: NavVariant) => {
    switch (variant) {
      case "primary":
        return "bg-[#B091FF] px-4 py-3 text-white text-xl";
      case "cta":
        return "inline-flex w-full items-center justify-center px-6 py-5 text-xl text-white uppercase bg-[url('/reward-pool-bg.svg')] bg-contain bg-center bg-no-repeat";
      default:
        return "text-xl text-[#21201E]";
    }
  };
  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative z-[100] flex justify-center w-full px-4 lg:px-0"
    >
      <div className="relative w-full 2xl:max-w-[1040px] min-h-[92px] z-[100] grid mx-auto">
        <Image
          src={"/nav-background.svg"}
          alt=""
          fill
          objectFit="contain"
          loading="lazy"
          aria-hidden
          className="pointer-events-none select-none object-contain z-40 hidden md:block"
        />
        <Image
          src={"/nav-background-mobile.svg"}
          alt=""
          fill
          objectFit="contain"
          loading="lazy"
          aria-hidden
          className="pointer-events-none select-none object-contain z-40 md:hidden"
        />

        <div className="press-start-2p-regular relative z-50 flex items-center justify-between px-4 py-3 lg:hidden">
          <Link
            href={pathname}
            className="bg-[#B091FF] mx-2 my-2 px-4 py-2 text-xs tracking-tight text-white"
          >
            {navLinks.find((link) => link.href === pathname)?.label ||
              navLinks[0].label}
          </Link>
          <motion.button
            type="button"
            onClick={handleToggleMenu}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            className="flex h-9 w-10 flex-col items-center justify-center gap-1.5"
            whileTap={{ scale: 0.94 }}
          >
            <span
              className={`block h-[3px] w-6 rounded-sm bg-[#1F2358] transition-transform duration-200 ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-6 rounded-sm bg-[#1F2358] transition-opacity duration-200 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-[3px] w-6 rounded-sm bg-[#1F2358] transition-transform duration-200 ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </motion.button>
        </div>

        <ul className="press-start-2p-regular relative z-50 hidden w-full flex-wrap items-center justify-center gap-4 lg:flex lg:gap-10">
          {navLinks.map((link, index) => {
            const variant = getActiveVariant(link);
            return (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className={getDesktopLinkClasses(variant)}
                  onClick={handleCloseMenu}
                >
                  {link.variant === "cta"
                    ? link.label.toUpperCase()
                    : link.label}
                </Link>
              </motion.li>
            );
          })}
        </ul>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                onClick={handleCloseMenu}
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />

              <motion.div
                className="fixed bottom-0 left-0 right-0 z-40 w-full h-auto lg:hidden sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-screen"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Image
                  src="/nav-expand-mobile.svg"
                  alt=""
                  fill
                  priority
                  aria-hidden
                  className="pointer-events-none w-full h-auto select-none object-cover"
                />

                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0, scale: 0.98 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: {
                        delayChildren: 0.1,
                        staggerChildren: 0.08,
                      },
                    },
                  }}
                  className="relative press-start-2p-regular z-20 mx-auto flex w-full flex-col gap-16 px-5 py-12 text-center max-w-full sm:max-w-[380px]"
                >
                  {navLinks.map((link) => {
                    const variant = getActiveVariant(link);
                    return (
                      <motion.div
                        key={link.href}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: { duration: 0.3 },
                          },
                        }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <Link
                          href={link.href}
                          onClick={handleCloseMenu}
                          className={getMobileLinkClasses(variant)}
                        >
                          {link.variant === "cta"
                            ? link.label.toUpperCase()
                            : link.label}
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavigationBar;
