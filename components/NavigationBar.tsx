import useWindowSize from "@/hooks/useWindowSize";
import Image from "next/image";
import { useState } from "react";

type NavVariant = "primary" | "default" | "cta";
type NavLink = {
  href: string;
  label: string;
  variant: NavVariant;
};

const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const windowSize = useWindowSize();

  const navLinks: NavLink[] = [
    { href: "#home", label: "Llome", variant: "primary" },
    { href: "#about", label: "Llabout", variant: "default" },
    { href: "#lore", label: "Llore", variant: "default" },
    { href: "#traits", label: "Lltraits", variant: "default" },
    { href: "#rewards", label: "Reward Pools", variant: "cta" },
  ];

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  const getDesktopLinkClasses = (variant: NavVariant) => {
    switch (variant) {
      case "primary":
        return "text-white bg-[#B091FF] px-3 md:px-4 py-2 md:py-3 text-sm md:text-base lg:text-lg hover:bg-purple-700 transition-colors";
      case "cta":
        return "relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 text-white text-sm md:text-base lg:text-lg uppercase transition-transform hover:scale-[1.03] active:scale-95 bg-[url('/reward-pool-bg.svg')] bg-contain bg-center bg-no-repeat";
      default:
        return "text-gray-800 text-sm md:text-base lg:text-lg hover:text-purple-600 transition-colors";
    }
  };

  const getMobileLinkClasses = (variant: NavVariant) => {
    switch (variant) {
      case "primary":
        return "bg-[#B091FF] px-4 py-3 text-xs text-white";
      case "cta":
        return "inline-flex w-full items-center justify-center px-4 py-3 text-xs text-white uppercase bg-[url('/reward-pool-bg.svg')] bg-contain bg-center bg-no-repeat";
      default:
        return "text-xs text-gray-800";
    }
  };
  return (
    <nav className="relative z-40 flex justify-center w-full px-4">
      <div className="relative w-full 2xl:max-w-[1040px] min-h-[92px] grid mx-auto">
        {windowSize.width && windowSize.width >= 768 ? (
          <Image
            src="/nav-background.svg"
            alt=""
            fill
            objectFit="contain"
            priority
            aria-hidden
            className="pointer-events-none select-none object-contain"
          />
        ) : (
          <Image
            src="/nav-background-mobile.svg"
            alt=""
            fill
            objectFit="contain"
            priority
            aria-hidden
            className="pointer-events-none select-none object-contain"
          />
        )}

        <div className="press-start-2p-regular relative z-10 flex items-center justify-between px-4 py-3 lg:hidden">
          <a
            href={navLinks[0].href}
            className="bg-[#B091FF] px-4 py-2 text-xs tracking-tight text-white"
            onClick={handleCloseMenu}
          >
            {navLinks[0].label}
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

        <ul className="press-start-2p-regular relative z-10 hidden w-full flex-wrap items-center justify-center gap-4 px-6 py-3 lg:flex md:gap-6 md:px-8 md:py-4 lg:gap-8 lg:px-12">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={getDesktopLinkClasses(link.variant)}
              >
                {link.variant === "cta" ? link.label.toUpperCase() : link.label}
              </a>
            </li>
          ))}
        </ul>

        {isMenuOpen && (
          <div className="absolute left-1/2 top-full mt-3 w-[calc(100vw-2.5rem)] max-w-[320px] -translate-x-1/2 md:hidden">
            <div className="press-start-2p-regular flex flex-col gap-4 rounded-lg border-4 border-[#C1D8FF] bg-white/95 px-6 py-6 text-center shadow-[6px_6px_0_0_#C8B5F7]">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleCloseMenu}
                  className={getMobileLinkClasses(link.variant)}
                >
                  {link.variant === "cta"
                    ? link.label.toUpperCase()
                    : link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
