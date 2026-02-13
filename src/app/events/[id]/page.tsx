import { eventsData } from "@/lib/eventsData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetails({ params }: PageProps) {
  const { id } = await params;
  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-[#0f0e17] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/#events" 
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Events
        </Link>
        
        <div className="relative w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-8 shadow-2xl">
           <img
            src={event.image}
            alt={event.title}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 inline-block ${
              event.category === 'Upcoming' ? 'bg-blue-600' : 'bg-green-600'
            }`}>
              {event.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{event.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">About the Event</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
              {event.description}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="md:col-span-1">
            <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10 space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Event Details</h3>
              
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                  <p className="font-medium text-gray-900 dark:text-white">{event.date}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
                  <p className="font-medium text-gray-900 dark:text-white">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p className="font-medium text-gray-900 dark:text-white">{event.location}</p>
                </div>
              </div>
              
              {event.category === 'Upcoming' && (
                <button className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors shadow-lg shadow-blue-500/30">
                  Register Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
