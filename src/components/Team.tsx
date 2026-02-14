"use client";

import { Linkedin, Github, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

const GAP = 24; // gap-6 = 24px

const teamMembers = [
  {
    name: "Core Member Name",
    role: "President / Lead",
    image: "/team/placeholder.jpg",
    github: "#",
    linkedin: "#",
    bio: "IoT enthusiast focused on smart automation and embedded systems.",
  },
  {
    name: "Love Mishra",
    role: "Technical",
    image: "/team/love.jpg",
    github: "lovemishra28",
    linkedin: "#",
    bio: "Full-stack developer passionate about bridging hardware with scalable software.",
  },
  {
    name: "Love Mishra",
    role: "Technical",
    image: "/team/love.jpg",
    github: "lovemishra28",
    linkedin: "#",
    bio: "Full-stack developer passionate about bridging hardware with scalable software.",
  },
  {
    name: "Love Mishra",
    role: "Technical",
    image: "/team/love.jpg",
    github: "lovemishra28",
    linkedin: "#",
    bio: "Full-stack developer passionate about bridging hardware with scalable software.",
  },
  {
    name: "Love Mishra",
    role: "Technical",
    image: "/team/love.jpg",
    github: "lovemishra28",
    linkedin: "#",
    bio: "Full-stack developer passionate about bridging hardware with scalable software.",
  },
  {
    name: "Love Mishra",
    role: "Technical",
    image: "/team/love.jpg",
    github: "lovemishra28",
    linkedin: "#",
    bio: "Full-stack developer passionate about bridging hardware with scalable software.",
  },
  {
    name: "Love Mishra",
    role: "Technical",
    image: "/team/love.jpg",
    github: "lovemishra28",
    linkedin: "#",
    bio: "Full-stack developer passionate about bridging hardware with scalable software.",
  },
  // Add more members as needed
];

/** Compute how many whole cards fit and each card's width */
function computeCardWidth(containerWidth: number): { count: number; width: number } {
  if (containerWidth <= 0) return { count: 1, width: 280 };
  // Determine how many cards fit: try from 4 down to 1
  for (let n = 4; n >= 1; n--) {
    const w = (containerWidth - GAP * (n - 1)) / n;
    if (w >= 260) return { count: n, width: Math.floor(w) };
  }
  return { count: 1, width: Math.floor(containerWidth) };
}

export default function Team() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const hasInteractedRef = useRef(false);
  const animatingRef = useRef(false);
  const rafIdRef = useRef<number>(0);
  const [cardWidth, setCardWidth] = useState(320);
  const cardWidthRef = useRef(320);

  // Triple the team members to ensure smooth buffer for infinite scroll
  const extendedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  // Measure container and compute card width
  const measureCards = useCallback(() => {
    if (!scrollRef.current) return;
    const containerW = scrollRef.current.clientWidth;
    const { width } = computeCardWidth(containerW);
    setCardWidth(width);
    cardWidthRef.current = width;
  }, []);

  useEffect(() => {
    measureCards();
    window.addEventListener("resize", measureCards);
    return () => window.removeEventListener("resize", measureCards);
  }, [measureCards]);

  // Handle Infinite Scroll Wrap (Both Auto and Manual)
  const handleScrollCheck = useCallback(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const singleSetWidth = teamMembers.length * (cardWidthRef.current + GAP);
    
    // Forward Wrap
    if (scrollContainer.scrollLeft >= singleSetWidth) {
      scrollContainer.scrollLeft -= singleSetWidth;
    }
  }, []);

  // Animation loop driven entirely by refs (no React state transitions mid-frame)
  const startAnimation = useCallback(() => {
    if (animatingRef.current || hasInteractedRef.current) return;
    animatingRef.current = true;

    const speed = 0.5; // Smooth slow scroll
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) { animatingRef.current = false; return; }

    const animate = () => {
      if (!animatingRef.current) return;

      scrollContainer.scrollLeft += speed;
      
      // Also check wrap in animation loop for smoothest effect
      const singleSetWidth = teamMembers.length * (cardWidthRef.current + GAP);
      if (scrollContainer.scrollLeft >= singleSetWidth) {
          scrollContainer.scrollLeft -= singleSetWidth;
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
  }, []);

  // Stop animation helper
  const stopAnimation = useCallback(() => {
    animatingRef.current = false;
    cancelAnimationFrame(rafIdRef.current);
  }, []);

  // Intersection Observer — triggers animation once when section scrolls into view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasInteractedRef.current && !animatingRef.current) {
          startAnimation();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => { observer.disconnect(); stopAnimation(); };
  }, [startAnimation, stopAnimation]);

  // Stop auto-scroll on any user interaction with the scroll area
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const onUserInteraction = () => {
      if (!hasInteractedRef.current) {
        hasInteractedRef.current = true;
        stopAnimation();
      }
    };

    container.addEventListener("pointerdown", onUserInteraction);
    container.addEventListener("wheel", onUserInteraction, { passive: true });
    return () => {
      container.removeEventListener("pointerdown", onUserInteraction);
      container.removeEventListener("wheel", onUserInteraction);
    };
  }, [stopAnimation]);

  const handleManualScroll = (direction: "left" | "right") => {
    hasInteractedRef.current = true;
    stopAnimation();
    if (scrollRef.current) {
      const scrollAmount = cardWidth + GAP;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-20 bg-gray-50 dark:bg-iot-dark/30 transition-colors duration-300 relative"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header Section */}
        <div className="text-center mb-16 px-4">
          <div className="w-fit mx-auto group cursor-default">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Team
            </h2>
            <div className="w-20 group-hover:w-full transition-all duration-500 h-1 bg-iot-green mx-auto rounded-full"></div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The team driving innovation and connectivity at MITS.
          </p>
        </div>

        {/* Scroll Container Wrapper */}
        <div className="relative group/container">
          {/* Left Button */}
          <button
            onClick={() => handleManualScroll("left")}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-iot-green hover:text-black dark:hover:bg-iot-green dark:hover:text-black transition-all shadow-lg opacity-100 md:opacity-0 md:group-hover/container:opacity-100 focus:opacity-100 duration-300"
            aria-label="Scroll Left"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scroll Area — no snap during auto-animation */}
          <div
            ref={scrollRef}
            onScroll={handleScrollCheck}
            className="flex overflow-x-auto pb-8 px-4 scrollbar-hide"
            style={{
              gap: `${GAP}px`,
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              maskImage:
                "linear-gradient(to right, transparent, black 1%, black 99%, transparent)",
            }}
          >
            {extendedMembers.map((member, index) => (
              <div
                key={`${index}-${member.name}`}
                className="group relative flex flex-col items-center justify-between text-center p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-iot-green/40 hover:shadow-lg dark:hover:bg-white/10 transition-all duration-300 shrink-0"
                style={{ width: `${cardWidth}px` }}
              >
                {/* Card Hover Gradient */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-iot-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

                <div className="relative z-10 flex flex-col items-center w-full">
                  <div className="relative w-40 h-40 mb-6">
                    {/* Profile Image Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-iot-green/20 group-hover:border-iot-green transition-all scale-105 duration-300"></div>
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 dark:bg-iot-surface border-4 border-white dark:border-iot-dark shadow-xl">
                      {member.image && !member.image.includes("placeholder") ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-iot-surface text-iot-green font-bold text-2xl">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-iot-green transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-iot-green text-sm font-medium mb-4 uppercase tracking-widest">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>

                  <div className="flex gap-4 mt-auto">
                    <a
                      href={`https://github.com/${member.github}`}
                      className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-iot-green hover:text-black dark:hover:text-black border border-gray-200 dark:border-white/10 transition-all duration-300"
                    >
                      <Github size={18} />
                    </a>
                    <a
                      href={member.linkedin}
                      className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-iot-green hover:text-black dark:hover:text-black border border-gray-200 dark:border-white/10 transition-all duration-300"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a
                      href="mailto:contact@example.com"
                      className="p-2 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-iot-green hover:text-black dark:hover:text-black border border-gray-200 dark:border-white/10 transition-all duration-300"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Button */}
          <button
            onClick={() => handleManualScroll("right")}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-iot-green hover:text-black dark:hover:bg-iot-green dark:hover:text-black transition-all shadow-lg opacity-100 md:opacity-0 md:group-hover/container:opacity-100 focus:opacity-100 duration-300"
            aria-label="Scroll Right"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
