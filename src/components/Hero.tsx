import Link from "next/link";
import Logo from "./Logo";
import { Wifi } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center bg-iot-green text-black pt-20">
      {/* Decorative Background Element - The "Node" Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[20%] w-72 h-72 bg-iot-green/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-72 h-72 bg-iot-green/15 rounded-full blur-[120px]" />
      </div>
      {/* Floating Tech Doodles */}
      <img 
        src="/assets/Arduino1.png" 
        alt="Arduino" 
        className="absolute top-[12%] left-[5%] md:top-[18%] md:left-[8%] w-24 sm:w-40 md:w-52 lg:w-64 -rotate-15 opacity-80 hover:scale-110 hover:-rotate-6 transition-all duration-500 ease-in-out pointer-events-auto select-none"
      />
      <img 
        src="/assets/relay.png" 
        alt="Relay" 
        className="absolute top-[12%] right-[5%] md:top-[18%] md:right-[8%] w-24 sm:w-40 md:w-52 lg:w-64 rotate-12 opacity-80 hover:scale-110 hover:rotate-6 transition-all duration-500 ease-in-out pointer-events-auto select-none"
      />
      <img 
        src="/assets/servo.png" 
        alt="Servo" 
        className="absolute bottom-[12%] left-[5%] md:bottom-[15%] md:left-[8%] w-24 sm:w-40 md:w-52 lg:w-64 rotate-12 opacity-80 hover:scale-110 hover:rotate-6 transition-all duration-500 ease-in-out pointer-events-auto select-none"
      />
      <img 
        src="/assets/esp32.png" 
        alt="ESP32" 
        className="absolute bottom-[12%] right-[5%] md:bottom-[15%] md:right-[8%] w-24 sm:w-40 md:w-52 lg:w-64 -rotate-12 opacity-80 hover:scale-110 hover:rotate-6 transition-all duration-500 ease-in-out pointer-events-auto select-none"
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/20 bg-black/5 text-black text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
          </span>
          MITS Gwalior
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-9xl mb-8 flex items-center justify-center text-black">
          <Logo edgeColor="text-white" />
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-black/80 mb-10">
          The official IoT Edge Club club. We build smart solutions, 
          experiment with edge computing, and connect the world one node at a time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* <Link
            href="#projects"
            className="px-8 py-3 rounded-full bg-black text-iot-green font-bold hover:bg-gray-800 transition-all shadow-lg"
          >
            View Projects
          </Link> */}
          <Link
            href="#join"
            className="px-8 py-3 rounded-full border-2 border-black text-black font-semibold hover:bg-black hover:text-iot-green transition-all"
          >
            Join the Network
          </Link>
        </div>
      </div>
    </section>
  );
}