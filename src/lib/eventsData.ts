export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: "Upcoming" | "Previous";
  image: string;
  link?: string;
};

export const eventsData: Event[] = [
  {
    id: "1",
    title: "IoT Workshop: ESP32 Basics",
    date: "March 15, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Innovation Lab, Block A",
    description: "Hands-on session with ESP32 microcontrollers. Learn to connect sensors and stream data to the cloud. Perfect for beginners looking to get started with hardware projects.",
    category: "Upcoming",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "HackTheEdge 2026",
    date: "April 10-12, 2026",
    time: "48 Hours",
    location: "Main Auditorium",
    description: "Our annual flagship hackathon focusing on Edge Computing and AIoT solutions. Join 200+ developers for a weekend of innovation.",
    category: "Upcoming",
    image: "https://images.unsplash.com/photo-1504384308090-c54be3855833?q=80&w=1962&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "AI on the Edge",
    date: "May 20, 2026",
    time: "4:00 PM - 6:00 PM",
    location: "Seminar Hall 2",
    description: "Deep dive into running ML models on edge devices like Raspberry Pi and Jetson Nano.",
    category: "Upcoming",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "4",
    title: "Arduino Day 2025",
    date: "March 21, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Campus Grounds",
    description: "Celebrated Arduino Day with project showcases, robotics competitions, and open hardware talks.",
    category: "Previous",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "5",
    title: "Intro to Sensors Session",
    date: "November 05, 2025",
    time: "3:00 PM",
    location: "Online (Discord)",
    description: "A beginner-friendly guide to choosing the right sensors for your IoT projects.",
    category: "Previous",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "6",
    title: "Smart Campus Ideathon",
    date: "October 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Library Conference Room",
    description: "Brainstorming session for making our campus smarter and more energy efficient.",
    category: "Previous",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop"
  }
];
