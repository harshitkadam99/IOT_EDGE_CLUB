"use client";

import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = ["about", "events", "team"];
      const scrollPosition = window.scrollY + 200; // Offset for trigger

      // Check if we are at the top
      if (window.scrollY < 100) {
         window.history.replaceState(null, "", window.location.pathname);
         return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
             // Only update if hash is different to avoid excessive writes
             if (window.location.hash !== `#${section}`) {
                window.history.replaceState(null, "", `#${section}`);
             }
             break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy);
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    window.history.pushState({}, '', href);
    if (elem) {
        const headerOffset = 80;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
  };

  return (
    <div className="absolute top-6 z-50 flex justify-center px-4 w-full">
      {/* Floating Navbar Container */}
      <nav className="w-full max-w-7xl border border-white/50 dark:border-white/10 rounded-2xl bg-white/60 dark:bg-black/60 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] ring-1 ring-white/60 dark:ring-white/5">
        <div className="px-6 py-2">
          <div className="flex justify-between items-center h-12">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link
                href="/"
                className="hover:scale-105 transition-transform duration-300"
              >
                <Logo edgeColor="text-iot-green-deep dark:text-iot-green" />
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {["About", "Events", "Team"].map((item) => (
                <Link
                  href={`#${item.toLowerCase()}`}
                  key={item}
                  onClick={(e) => handleScroll(e, `#${item.toLowerCase()}`)}
                  className="px-5 py-2 rounded-full text-gray-800 dark:text-gray-200 text-sm font-bold tracking-wide transition-all duration-300 hover:bg-white dark:hover:bg-white/10 hover:shadow-sm dark:hover:shadow-[0_0_15px_rgba(84,144,233,0.4)] hover:text-iot-green-deep dark:hover:text-iot-green border border-transparent hover:border-white/50 dark:hover:border-white/10"
                >
                  {item}
                </Link>
              ))}

              
            </div>
            <div className="ml-2 pl-2">
                <ThemeToggle />
              </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
