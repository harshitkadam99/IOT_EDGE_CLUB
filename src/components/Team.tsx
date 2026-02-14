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
function computeCardWidth(availableWidth: number): { count: number; width: number } {
  if (availableWidth <= 0) return { count: 1, width: 280 };
  
  // Mobile check: if width is small (e.g. < 640px aka 'sm'), force 1 card
  // Or just rely on the fact that fitting 2 cards of 260px requires 520px+GAP
  // width < 544 shows 1 card automatically with current logic.
  
  // Determine how many cards fit: try from 4 down to 1
  for (let n = 4; n >= 1; n--) {
    // Equation: n * w + (n - 1) * GAP <= availableWidth
    // w = (availableWidth - (n - 1) * GAP) / n
    const w = (availableWidth - GAP * (n - 1)) / n;
    
    // Min card width threshold
    if (w >= 280) return { count: n, width: Math.floor(w) };
  }
  
  // Fallback (mostly for mobile): 1 card takes full width
  return { count: 1, width: Math.floor(availableWidth) };
}

export default function Team() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animatingRef = useRef(false);
  const rafIdRef = useRef<number>(0);
  const [cardWidth, setCardWidth] = useState(320);
  const cardWidthRef = useRef(320);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileIndex, setMobileIndex] = useState(0);

  // Triple the team members to ensure smooth buffer for infinite scroll
  const extendedMembers = [...teamMembers, ...teamMembers, ...teamMembers];

  // Measure container and compute card width & detect mobile
  const measureCards = useCallback(() => {
    if (!scrollRef.current) return;
    const containerW = scrollRef.current.clientWidth;
    const contentWidth = containerW - 32; 
    
    // Check if mobile (basic width check matching Tailwind 'md')
    setIsMobile(window.innerWidth < 768);

    const { width } = computeCardWidth(contentWidth);
    setCardWidth(width);
    cardWidthRef.current = width;
  }, []);

  useEffect(() => {
    measureCards();
    window.addEventListener("resize", measureCards);
    return () => window.removeEventListener("resize", measureCards);
  }, [measureCards]);

  // Handle Infinite Scroll Wrap (Desktop Ticker)
  // Animation loop driven entirely by refs (no React state transitions mid-frame)
  const isPausedRef = useRef(false);

  // Update ref when state changes so animation loop sees latest value
  useEffect(() => {
     isPausedRef.current = isPaused;
  }, [isPaused]);

  // Handle Infinite Scroll Wrap (Desktop Ticker)
  const startAnimation = useCallback(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const speed = 0.5; 
    const scrollContainer = scrollRef.current;
    
    const animate = () => {
      if (!animatingRef.current) return;

      // Use ref for pause check to avoid stale closures and re-binding
      if (!isPausedRef.current && window.innerWidth >= 768 && scrollContainer) {
          scrollContainer.scrollLeft += speed;
          
          const singleSetWidth = teamMembers.length * (cardWidthRef.current + GAP);
          
          if (scrollContainer.scrollLeft >= 2 * singleSetWidth) {
              scrollContainer.scrollLeft -= singleSetWidth;
          } 
      }
      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
  }, []);


  // Initialize Scroll Position
  useEffect(() => {
     if (scrollRef.current && !isMobile) {
        const singleSetWidth = teamMembers.length * (cardWidthRef.current + GAP);
        if (scrollRef.current.scrollLeft < singleSetWidth) {
             scrollRef.current.scrollLeft = singleSetWidth;
        }
        startAnimation();
     }
     return () => {
         animatingRef.current = false;
         cancelAnimationFrame(rafIdRef.current);
     }
  }, [cardWidth, isMobile, startAnimation]);

  // Mobile Navigation
  const handleMobileNav = (direction: "left" | "right") => {
      if (direction === "left") {
          setMobileIndex(prev => (prev - 1 + teamMembers.length) % teamMembers.length);
      } else {
          setMobileIndex(prev => (prev + 1) % teamMembers.length);
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

        {/* Desktop View: Infinite Scroll Ticker */}
        {!isMobile && (
        <div 
            className="relative group/container px-0 md:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
          {/* Scroll Area */}
          <div
            ref={scrollRef}
            className="flex overflow-x-hidden pb-8 px-4" // Hidden overflow for auto-scroll
            style={{
              gap: `${GAP}px`,
              maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
            }}
          >
            {extendedMembers.map((member, index) => (
              <TeamCard key={`${index}-${member.name}-desktop`} member={member} width={cardWidth} />
            ))}
          </div>
        </div>
        )}

        {/* Mobile View: Single Slide Carousel */}
        {isMobile && (
            <div className="relative w-full px-4">
                 <div className="overflow-hidden rounded-2xl">
                     <div className="flex relative min-h-[400px]">
                         {/* We display only ONE member, but we can animate transition or just swap */}
                         {/* To animate properly, we should map them all and translate? */}
                         {/* Or just simple swap for "slide-by-slide" as requested "showing one slide at a time" */}
                         <div className="w-full flex justify-center">
                             <TeamCard member={teamMembers[mobileIndex]} width={cardWidth} />
                         </div>
                     </div>
                 </div>
                 
                 {/* Mobile Navigation Controls */}
                 <button
                    onClick={() => handleMobileNav("left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-iot-green hover:text-black dark:hover:bg-iot-green dark:hover:text-black transition-all shadow-lg"
                 >
                    <ChevronLeft size={24} />
                 </button>
                 <button
                    onClick={() => handleMobileNav("right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 text-gray-800 dark:text-white hover:bg-iot-green hover:text-black dark:hover:bg-iot-green dark:hover:text-black transition-all shadow-lg"
                 >
                    <ChevronRight size={24} />
                 </button>
            </div>
        )}
      </div>
    </section>
  );
}

function TeamCard({ member, width }: { member: any, width: number }) {
    return (
        <div
        className="group relative flex flex-col items-center justify-between text-center p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-iot-green/40 hover:shadow-lg dark:hover:bg-white/10 transition-all duration-300 shrink-0"
        style={{ width: `${width}px` }}
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
    );
}
