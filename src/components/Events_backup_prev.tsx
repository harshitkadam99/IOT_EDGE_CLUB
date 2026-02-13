"use client";

import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Clock } from "lucide-react";
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
          <SectionHeader
            icon={<Clock className="w-6 h-6 text-iot-green-dark" />}
            title="Previous Events"
          />
          <SlidingCarousel events={previousEvents} labelPrefix="Event" />
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
