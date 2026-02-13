import Link from "next/link";
import Logo from "./Logo";
import { Wifi } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center bg-gray-950 text-white pt-20">
      {/* Decorative Background Element - The "Node" Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px]" />
      </div>

      {/* Glassmorphism Container */}
      <div className="relative z-10 p-8 md:p-12 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl max-w-5xl mx-4 sm:mx-6 lg:mx-8 text-center mt-10">
        
        {/* Floating Tech Doodles - positioned relative to the container now if you want them "around" or sticking out slightly, 
            but for a cleaner look, let's keep them in the background layer but maybe adjust opacity/blending */}
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-200 text-sm font-medium mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          MITS Gwalior
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-9xl mb-8 flex items-center justify-center text-white drop-shadow-lg">
          <Logo edgeColor="text-blue-400" />
        </h1>

        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          The official IoT Edge Club club. We build smart solutions, 
          experiment with edge computing, and connect the world one node at a time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#join"
            className="px-8 py-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/25"
          >
            Join the Network
          </Link>
        </div>
      </div>

      {/* Floating Tech Doodles */}
      <img 
        src="/assets/Arduino1.png" 
        alt="Arduino" 
        className="absolute top-[12%] left-[5%] md:top-[15%] md:left-[5%] w-24 sm:w-40 md:w-52 lg:w-64 -rotate-15 opacity-60 hover:opacity-100 hover:scale-110 hover:-rotate-6 transition-all duration-500 ease-in-out pointer-events-auto select-none mix-blend-screen"
      />
      <img 
        src="/assets/relay.png" 
        alt="Relay" 
        className="absolute top-[12%] right-[5%] md:top-[15%] md:right-[5%] w-24 sm:w-40 md:w-52 lg:w-64 rotate-12 opacity-60 hover:opacity-100 hover:scale-110 hover:rotate-6 transition-all duration-500 ease-in-out pointer-events-auto select-none mix-blend-screen"
      />
      <img 
        src="/assets/servo.png" 
        alt="Servo" 
        className="absolute bottom-[12%] left-[5%] md:bottom-[10%] md:left-[5%] w-24 sm:w-40 md:w-52 lg:w-64 rotate-12 opacity-60 hover:opacity-100 hover:scale-110 hover:rotate-6 transition-all duration-500 ease-in-out pointer-events-auto select-none mix-blend-screen"
      />
      <img 
        src="/assets/esp32.png" 
        alt="ESP32" 
        className="absolute bottom-[12%] right-[5%] md:bottom-[10%] md:right-[5%] w-24 sm:w-40 md:w-52 lg:w-64 -rotate-12 opacity-60 hover:opacity-100 hover:scale-110 hover:rotate-6 transition-all duration-500 ease-in-out pointer-events-auto select-none mix-blend-screen"
      />
    </section>
  );
}