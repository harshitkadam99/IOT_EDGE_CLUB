"use client";

import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { eventsData, Event } from "@/lib/eventsData";
import Link from "next/link";

export default function Events() {
  const upcomingEvents = eventsData.filter((e) => e.category === "Upcoming");
  const previousEvents = eventsData.filter((e) => e.category === "Previous");

  return (
    <section id="events" className="py-20 bg-iot-light dark:bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-iot-text dark:text-gray-100">
          Our Events
        </h2>
        <div className="w-24 h-1 bg-linear-to-r from-iot-green to-iot-green-dark mx-auto rounded-full mb-6"></div>
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

function SlidingCarousel({ events, labelPrefix }: { events: Event[]; labelPrefix?: string }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Clone first and last events for infinite loop
  const extendedEvents = [
    events[events.length - 1],
    ...events,
    events[0]
  ];

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsTransitioning(false);
      setCurrentIndex(events.length);
    } else if (currentIndex === events.length + 1) {
      setIsTransitioning(false);
      setCurrentIndex(1);
    }
  };

  // Turn transition back on after jump
  useEffect(() => {
    if (!isTransitioning) {
        // Force reflow
        const timer = setTimeout(() => {
           setIsTransitioning(true);
        }, 50);
        return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (events.length <= 1) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [handleNext, events.length]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };


  if (events.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center rounded-2xl bg-white dark:bg-iot-surface/30 border border-gray-200 dark:border-iot-surface border-dashed">
        <p className="text-gray-500 italic">No events found.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[80vw] md:max-w-[90vw] mx-auto group">
      {/* Navigation Controls - Outside Frame */}
      {events.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
            // Mobile: relative positioning or tight absolute near edge, similar to PreviousEventsCarousel
            className="absolute -left-6 md:-left-20 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-iot-surface text-iot-dark dark:text-white shadow-lg border border-gray-100 dark:border-white/10 hover:bg-iot-green hover:text-white dark:hover:bg-iot-green dark:hover:text-black transition-all z-30 transform scale-75 md:scale-100"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            className="absolute -right-6 md:-right-20 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-iot-surface text-iot-dark dark:text-white shadow-lg border border-gray-100 dark:border-white/10 hover:bg-iot-green hover:text-white dark:hover:bg-iot-green dark:hover:text-black transition-all z-30 transform scale-75 md:scale-100"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      <div 
        className="relative w-full h-[500px] md:h-[600px] overflow-hidden shadow-2xl rounded-3xl bg-iot-surface"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
      {/* Sliding Track */}
      <div 
        className={`flex h-full ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
        onTransitionEnd={handleTransitionEnd}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {extendedEvents.map((event, index) => {
          return (
            <div 
              key={`${event.id}-${index}`} 
              className={`min-w-full h-full relative ${event.image}`}
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
                          <Clock size={14} className="text-iot-green-dark" /> {event.date}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg tracking-tight">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-200 text-lg md:text-xl line-clamp-2 max-w-2xl mb-8 opacity-90 font-light leading-relaxed">
                        {event.description}
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
          
      {/* Indicators */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-16 flex gap-3 z-30">
        {events.map((_, idx) => (
            <button
            key={idx}
            onClick={(e) => {
                e.preventDefault();
                setCurrentIndex(idx + 1);
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
                (currentIndex - 1 + events.length) % events.length === idx ? "w-12 bg-white" : "w-6 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
            />
        ))}
        </div>
      </div>
    </div>
  );
}

function PreviousEventsCarousel({ events }: { events: Event[] }) {
  const [currentIndex, setCurrentIndex] = useState(3); // Start at first real item (after 3 clones)
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(3);
  
  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(window.innerWidth < 768 ? 1 : 3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prepare Extended List: 3 clones at start, 3 at end
  // Only consistent if events.length > 0
  const clonesCount = 3;
  
  // Ensure we have enough events to clone. If only 1 event, duplicate it to fill 3 spots?
  // Ideally we need at least 3 events for a 3-item carousel to look good, 
  // but if fewer, we just repeat them.
  const safeEvents = events.length === 0 ? [] : events;
  // If fewer than 3, multiply to get at least 3
  const filledEvents = [...safeEvents];
  while (filledEvents.length > 0 && filledEvents.length < 3) {
      filledEvents.push(...safeEvents);
  }
  
  const displayEvents = filledEvents.length > 0 ? [
    ...filledEvents.slice(-clonesCount),
    ...filledEvents,
    ...filledEvents.slice(0, clonesCount)
  ] : [];

  const totalReal = filledEvents.length;

  const handleTransitionEnd = () => {
    // Forward wrap
    if (currentIndex >= totalReal + clonesCount) {
      setIsTransitioning(false);
      // Snap to matching real item at start
      // e.g. if we are at clonesCount + totalReal (first clone at end), snap to clonesCount (first real)
      setCurrentIndex(currentIndex - totalReal);
    } 
    // Backward wrap
    else if (currentIndex < clonesCount) {
      setIsTransitioning(false);
      // Snap to matching real item at end
      setCurrentIndex(currentIndex + totalReal);
    }
  };

  // Turn transition back on
  useEffect(() => {
    if (!isTransitioning) {
       const timer = setTimeout(() => {
         setIsTransitioning(true);
       }, 50);
       return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => prev + 1);
  }, []);

  const handlePrev = useCallback(() => {
      setCurrentIndex(prev => prev - 1);
  }, []);

  // Auto-slide
  useEffect(() => {
    if (displayEvents.length <= 1) return;
    const timer = setInterval(() => {
       handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNext, displayEvents.length]);
  
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 italic">No previous events found.</p>
      </div>
    );
  }

  // Calculate generic translation
  // Each item width = 100% / itemsPerView
  // To shift 1 index = shift 1 item width
  // But we are translating the container (flex row).
  // transform = -currentIndex * (100 / itemsPerView)%
  
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3 mb-4 px-1">
          <div className="p-2 bg-iot-green/10 dark:bg-iot-green/20 rounded-lg text-iot-green dark:text-iot-green">
            <Clock size={24} />
          </div>
          <h3 className="text-2xl font-bold text-iot-text dark:text-white">Previous Events</h3>
      </div>

      <div className="relative w-full group/prev">
        <div className="overflow-hidden rounded-2xl mx-0 md:mx-4">
             <div 
                className={`flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`}
                onTransitionEnd={handleTransitionEnd}
                style={{ 
                    transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` 
                }}
             >
                {displayEvents.map((event, idx) => (
                    <div 
                        key={`${event.id}-${idx}`} 
                        className={`none shrink-0 px-2 md:px-3`}
                        style={{ width: `${100 / itemsPerView}%` }}
                    >
                         <Link href={`/events/${event.id}`} className="block h-full"> 
                            <div 
                                className="relative h-80 w-full rounded-2xl overflow-hidden group/card cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-black/5 dark:ring-white/10"
                            >
                                <div className={`absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover/card:scale-110 ${event.image}`} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover/card:opacity-90 transition-opacity" />
                                
                                <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover/card:translate-y-0 transition-transform">
                                    <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider uppercase bg-purple-600 rounded-full">
                                        Previous
                                    </span>
                                    <h4 className="text-sm md:text-2xl font-bold mb-2 leading-tight">{event.title}</h4>
                                    <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-gray-300">
                                        <span className="flex items-center gap-1"><Clock size={14} /> {event.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

        {/* Navigation Buttons - Outside on Desktop, overlaid on Mobile but better placed */}
        <>
            <button 
              onClick={(e) => { e.preventDefault(); handlePrev(); }}
              className="absolute -left-2 md:-left-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 hover:bg-iot-green hover:text-white dark:hover:bg-iot-green dark:hover:text-black transition-all shadow-lg z-20"
              aria-label="Previous events"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={(e) => { e.preventDefault(); handleNext(); }}
              className="absolute -right-2 md:-right-8 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white dark:bg-iot-surface border border-gray-200 dark:border-white/10 hover:bg-iot-green hover:text-white dark:hover:bg-iot-green dark:hover:text-black transition-all shadow-lg z-20"
               aria-label="Next events"
            >
              <ChevronRight size={24} />
            </button>
        </>
      </div>
    </div>
  );
}
