"use client";

import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { eventsData, Event } from "@/lib/eventsData";
import Link from "next/link";

// Define a palette of gradients that align with the site theme
const GRADIENTS = [
  "bg-gradient-to-br from-iot-green via-iot-green-dark to-indigo-900",
  "bg-gradient-to-br from-slate-900 via-iot-green-dark to-iot-green",
  "bg-gradient-to-br from-indigo-800 via-blue-700 to-sky-500",
  "bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500",
  "bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900",
];

export default function Events() {
  const upcomingEvents = eventsData.filter((e) => e.category === "Upcoming");
  const previousEvents = eventsData.filter((e) => e.category === "Previous");

  return (
    <section id="events" className="py-20 bg-iot-light dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-iot-text dark:text-gray-100">
          Our Events
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-iot-green to-iot-green-dark mx-auto rounded-full mb-6"></div>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          Join us for workshops, hackathons, and tech talks. Connect with the
          community and level up your skills.
        </p>
      </div>

      <div className="space-y-20">
        {/* Upcoming Events */}
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            icon={<Calendar className="w-6 h-6 text-iot-green" />}
            title="Upcoming Events"
          />
          <SlidingCarousel events={upcomingEvents} labelPrefix="Event" />
        </div>

        {/* Previous Events */}
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SectionHeader removed here as it is now integrated into PreviousEventsCarousel */}
          <PreviousEventsCarousel events={previousEvents} />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-iot-green/10 dark:bg-iot-green/20 rounded-lg">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-iot-text dark:text-white">
        {title}
      </h3>
    </div>
  );
}

function SlidingCarousel({ events, labelPrefix }: { events: Event[]; labelPrefix: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % events.length);
  }, [events.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length);
  }, [events.length]);

  // Auto-slide effect
  useEffect(() => {
    if (events.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext, events.length]);

  if (events.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center rounded-2xl bg-white dark:bg-iot-surface/30 border border-gray-200 dark:border-iot-surface border-dashed">
        <p className="text-gray-500 italic">No events found.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] md:h-[600px] group overflow-hidden shadow-2xl rounded-3xl bg-iot-surface">
      {/* Sliding Track */}
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {events.map((event, index) => {
          // Cycle through gradients based on index
          const gradientClass = GRADIENTS[index % GRADIENTS.length];
          const genericTitle = `${labelPrefix} ${index + 1}`;
          
          return (
            <div 
              key={event.id} 
              className={`min-w-full h-full relative ${gradientClass}`}
            >
              {/* Content Overlay */}
              <Link 
                href={`/events/${event.id}`} 
                className="absolute inset-0 z-20 flex flex-col justify-end pb-16 md:pb-24 px-8 md:px-16"
              >
                <div className="w-full max-w-5xl mx-auto">
                   <div className="max-w-4xl cursor-pointer">
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full shadow-lg bg-white/20 text-white border border-white/10 backdrop-blur-md">
                          {event.category}
                        </span>
                        <span className="flex items-center gap-2 text-gray-100 text-sm font-medium bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5">
                          <Calendar size={14} className="text-iot-green-dark" /> {event.date}
                        </span>
                      </div>

                      <h3 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg tracking-tight">
                        {genericTitle}
                      </h3>
                      
                      <p className="text-gray-200 text-lg md:text-xl line-clamp-2 max-w-2xl mb-8 opacity-90 font-light leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                      </p>

                      <div className="inline-flex items-center gap-3 text-white font-bold text-lg hover:gap-4 transition-all bg-white/10 hover:bg-white/20 border border-white/20 px-8 py-3 rounded-full backdrop-blur-md">
                        View Details <ArrowRight size={20} />
                      </div>
                   </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      {events.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-iot-green hover:border-iot-green transition-all z-30 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 duration-300"
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-black/20 text-white backdrop-blur-md border border-white/10 hover:bg-iot-green hover:border-iot-green transition-all z-30 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 duration-300"
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-8 right-8 md:right-16 flex gap-3 z-30">
            {events.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                    e.preventDefault();
                    setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-12 bg-white" : "w-6 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PreviousEventsCarousel({ events }: { events: Event[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Extend events for infinite loop illusion
  // We append the first 3 events to the end so we can slide past the last real event seamlessly
  const extendedEvents = [...events, ...events.slice(0, 3)];
  const totalEvents = events.length;

  const handleNext = useCallback(() => {
    if (currentIndex >= totalEvents) {
        // If we overlap boundary, reset first (should be handled by transitionEnd, but safe guard)
        setIsTransitioning(false);
        setCurrentIndex(0);
        // Force reflow/next tick to re-enable transition
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsTransitioning(true);
                setCurrentIndex(1);
            });
        });
    } else {
        setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalEvents]);

  const handlePrev = useCallback(() => {
    if (currentIndex === 0) {
        // Jump to end
        setIsTransitioning(false);
        setCurrentIndex(totalEvents);
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setIsTransitioning(true);
                setCurrentIndex(totalEvents - 1);
            });
        });
    } else {
        setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, totalEvents]);

  // Handle seamless loop reset when transition ends
  const handleTransitionEnd = () => {
    if (currentIndex >= totalEvents) {
      setIsTransitioning(false);
      setCurrentIndex(currentIndex % totalEvents);
      // Re-enable transition for next move
      requestAnimationFrame(() => {
           setIsTransitioning(true);
      });
    }
  };

  // Auto-slide effect
  useEffect(() => {
    if (totalEvents === 0) return;
    const timer = setInterval(() => {
        // Simple next logic for auto slide
        setCurrentIndex(prev => {
             if (prev >= totalEvents) {
                 // If we are technically at the 'reset' point, we need to handle it.
                 // But typically handleTransitionEnd handles the reset.
                 // If we are at totalEvents, we should be at 0 visually.
                 // Let's just increment. 
                 return prev + 1;
             }
             return prev + 1;
        });
    }, 5000);
    return () => clearInterval(timer);
  }, [totalEvents]);

  // Adjust index reset in effect if we drifted too far (safeguard)
  useEffect(() => {
      if (currentIndex === totalEvents + 1) {
          // We went past the buffer? 
          // Actually, if we hit totalEvents, visual is same as 0. 
          // We wait for transitionEnd to snap back. 
          // But if auto-slide triggered again fast?
          // Let standard transitionEnd logic handle it.
      }
  }, [currentIndex, totalEvents]);


  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 italic">No previous events found.</p>
      </div>
    );
  }

  // Always show navigation if we have events, allowing cycling even if few
  const showNavigation = events.length > 0;

  return (
    <div className="flex flex-col gap-6 w-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-iot-green/10 dark:bg-iot-green/20 rounded-lg text-iot-green dark:text-iot-green">
            <Clock size={24} />
          </div>
          <h3 className="text-2xl font-bold text-iot-text dark:text-white">Previous Events</h3>
        </div>

        {showNavigation && (
          <div className="flex gap-2 z-10">
            <button 
              onClick={handlePrev} 
              className="p-2 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-gray-700 dark:text-white transition-all shadow-sm"
              aria-label="Previous events"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext} 
              className="p-2 rounded-full bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/20 text-gray-700 dark:text-white transition-all shadow-sm"
               aria-label="Next events"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="w-full overflow-hidden">
         <div 
           className="flex gap-6"
           style={{
             transform: `translateX(calc(-${currentIndex * (100 / 3 + 0)}% - ${currentIndex * 1.5}rem))`, 
             // Note: 1.5rem is approx gap-6 (24px). 
             // Exact calc for gap in flex translation is tricky.
             // Easier approach: Use width 33.33% and NO gap, but padding inside item.
           }}
         >
             {/* 
                Correction: gap-6 in flex container with translate % is hard to align perfectly without calc.
                Better: Use a grid-like flex basis.
                3 visible items. 100% width.
                Item width = (100% - 2 * gap) / 3 ?
                Let's stick to: Flex container width 100%. Item width 1/3 (33.333%).
                Padding for gap.
             */}
         </div>
         {/* Re-implementing container properly for sliding */}
         <div 
            className={`flex transition-transform ease-in-out ${isTransitioning ? 'duration-500' : 'duration-0'}`}
            onTransitionEnd={handleTransitionEnd}
            style={{ 
                // We show 3 items. So shift by 1/3 per index.
                transform: `translateX(-${currentIndex * (100 / 3)}%)` 
            }}
         >
            {extendedEvents.map((event, idx) => {
                // Stable index for gradient selection
                const originalIndex = events.findIndex(e => e.id === event.id);
                const gradientClass = GRADIENTS[originalIndex % GRADIENTS.length];
                const genericTitle = `Event ${originalIndex + 1}`; 

                return (
                    <div 
                        key={`${event.id}-dup-${idx}`} 
                        className="min-w-[33.333333%] px-3" // Using padding instead of gap for easier calc
                    >
                         <Link href={`/events/${event.id}`} className="block h-full"> 
                            <div 
                                className="relative h-80 w-full rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
                            >
                                {/* Event Gradient Background */}
                                <div className={`absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110 ${gradientClass}`} />
                                
                                {/* Overlay Textures */}
                                <div className="absolute inset-0 opacity-20 bg-[url('/assets/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                                {/* Text Content Overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                                <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider uppercase bg-purple-600 rounded-full">
                                    Previous
                                </span>
                                <h4 className="text-2xl font-bold mb-2 leading-tight">{genericTitle}</h4>
                                <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                                </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
         </div>
      </div>
    </div>
  );
}
