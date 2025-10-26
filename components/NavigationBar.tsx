import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "./ui/8bit/alert";
import About from "./About";
import { Button } from "./ui/8bit/button";

type NavVariant = "primary" | "default" | "cta";
type NavLink = {
  href: string;
  label: string;
  variant: NavVariant;
};

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const windowSize = useWindowSize();

  // Initialize activeHash from URL
  const [activeHash, setActiveHash] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.hash || "#home";
    }
    return "#home";
  });

  const navLinks: NavLink[] = [
    { href: "#home", label: "Llome", variant: "default" },
    { href: "#about", label: "Llabout", variant: "default" },
    { href: "#lore", label: "Llore", variant: "default" },
    { href: "#traits", label: "Lltraits", variant: "default" },
    { href: "#rewards", label: "Reward Pools", variant: "cta" },
  ];

  useEffect(() => {
    // Listen for hash changes
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLinkClick = (href: string) => {
    setActiveHash(href);
    handleCloseMenu();
  };

  const getActiveVariant = (link: NavLink): NavVariant => {
    if (link.variant === "cta") return "cta";
    return activeHash === link.href ? "primary" : "default";
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
    <>
      {/* Backdrop overlay for non-home sections */}
      {activeHash !== "#home" && (
        <div className="fixed inset-0 bg-black/50 z-40" aria-hidden="true" />
      )}

      <nav className="relative z-50 flex justify-center w-full px-4 lg:px-0">
        <div className="relative w-full 2xl:max-w-[1040px] min-h-[92px] z-50 grid mx-auto">
          <Image
            src={
              windowSize.width && windowSize.width < 768
                ? "/nav-background-mobile.svg"
                : "/nav-background.svg"
            }
            alt=""
            fill
            objectFit="contain"
            loading="lazy"
            aria-hidden
            className="pointer-events-none select-none object-contain z-40"
          />

          <div className="press-start-2p-regular relative z-50 flex items-center justify-between px-4 py-3 lg:hidden">
            <a
              href={activeHash}
              className="bg-[#B091FF] mx-2 my-2 px-4 py-2 text-xs tracking-tight text-white"
              onClick={() => handleLinkClick(activeHash)}
            >
              {navLinks.find((link) => link.href === activeHash)?.label ||
                navLinks[0].label}
            </a>
            <button
              type="button"
              onClick={handleToggleMenu}
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="flex h-9 w-10 flex-col items-center justify-center gap-1.5"
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
            </button>
          </div>

          <ul className="press-start-2p-regular relative z-50 hidden w-full flex-wrap items-center justify-center gap-4 lg:flex lg:gap-10">
            {navLinks.map((link) => {
              const variant = getActiveVariant(link);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={getDesktopLinkClasses(variant)}
                    onClick={() => handleLinkClick(link.href)}
                  >
                    {link.variant === "cta"
                      ? link.label.toUpperCase()
                      : link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {isMenuOpen && (
            <>
              {/* Backdrop overlay */}
              <div
                className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                onClick={handleCloseMenu}
                aria-hidden="true"
              />

              {/* Mobile menu */}
              <div className="fixed -translate-x-1/2 left-1/2 w-screen  h-auto bottom-0 z-40 lg:hidden">
                <Image
                  src="/nav-expand-mobile.svg"
                  alt=""
                  fill
                  priority
                  aria-hidden
                  className="pointer-events-none w-full h-auto select-none object-cover"
                />

                <div className="relative press-start-2p-regular flex flex-col gap-16 max-w-[380px] px-5 mx-auto py-12 text-center z-20">
                  {navLinks.map((link) => {
                    const variant = getActiveVariant(link);
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => handleLinkClick(link.href)}
                        className={getMobileLinkClasses(variant)}
                      >
                        {link.variant === "cta"
                          ? link.label.toUpperCase()
                          : link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </nav>
      {activeHash !== "#home" && (
        <>
          <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-[50%] z-50 flex flex-col gap-5">
            {activeHash === "#about" && <About />}

            <div className="mx-auto">
              <Button
                onClick={() => handleLinkClick("#home")}
                className="text-xl px-6 py-6 bg-[#6043AF] hover:bg-[#4a2f8f] hover:scale-105 transition-all duration-200"
              >
                Back
              </Button>
            </div>
          </div>
          <div className="fixed z-50 -right-16 -bottom-[10%]">
            <Image
              src={"/llamao_walk.gif"}
              alt="llamaowalk"
              width={481}
              height={510}
            />
          </div>
        </>
      )}
    </>
  );
};

export default NavigationBar;
