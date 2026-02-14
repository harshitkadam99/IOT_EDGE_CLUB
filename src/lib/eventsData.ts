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
    title: "Event 1",
    date: "March 15, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Innovation Lab, Block A",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "Upcoming",
    image: "bg-gradient-to-br from-iot-green via-iot-green-dark to-indigo-900"
  },
  {
    id: "2",
    title: "Event 2",
    date: "April 10-12, 2026",
    time: "48 Hours",
    location: "Main Auditorium",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "Upcoming",
    image: "bg-gradient-to-br from-slate-900 via-iot-green-dark to-iot-green"
  },
  {
    id: "3",
    title: "Event 3",
    date: "May 20, 2026",
    time: "4:00 PM - 6:00 PM",
    location: "Seminar Hall 2",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "Upcoming",
    image: "bg-gradient-to-br from-indigo-800 via-blue-700 to-sky-500"
  },
  {
    id: "4",
    title: "Event 4",
    date: "March 21, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Campus Grounds",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "Previous",
    image: "bg-gradient-to-br from-sky-600 via-cyan-600 to-teal-500"
  },
  {
    id: "5",
    title: "Event 5",
    date: "November 05, 2025",
    time: "3:00 PM",
    location: "Online (Discord)",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "Previous",
    image: "bg-gradient-to-br from-blue-900 via-slate-800 to-gray-900"
  },
  {
    id: "6",
    title: "Event 6",
    date: "October 15, 2025",
    time: "9:00 AM - 6:00 PM",
    location: "Library Conference Room",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    category: "Previous",
    image: "bg-gradient-to-br from-iot-green via-iot-green-dark to-indigo-900"
  }
];
