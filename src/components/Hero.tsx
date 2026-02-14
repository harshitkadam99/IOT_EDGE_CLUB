import Link from "next/link";
import Logo from "./Logo";
import { Wifi } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col justify-center items-center bg-transparent  text-white pt-20">
      {/* Decorative Background Element - The "Node" Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
        <div className="absolute top-[-10%] left-[20%] w-96 h-96 bg-blue-500/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[60%] w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px]" />
      </div>

      {/* Glassmorphism Container */}
      <div className="relative z-10 p-8 md:p-12 rounded-3xl  max-w-5xl mx-4 sm:mx-6 lg:mx-8 text-center mt-10">
        
        {/* Floating Tech Doodles - positioned relative to the container now if you want them "around" or sticking out slightly, 
            but for a cleaner look, let's keep them in the background layer but maybe adjust opacity/blending */}
        

        <h1 className="text-5xl md:text-7xl lg:text-9xl mb-8 flex items-center justify-center text-white drop-shadow-lg">
          <Logo edgeColor="text-blue-400" />
        </h1>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-200 text-sm font-medium mb-8 backdrop-blur-xl">
          MITS Gwalior
        </div>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-10 leading-relaxed">
          Welcome to the world of Automation
        </p>

        {/* <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#join"
            className="px-8 py-3 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all shadow-lg hover:shadow-cyan-500/25"
          >
            Join the Network
          </Link>
        </div> */}
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

      {/* Seamless Transition Glow */}
      {/* <div className="absolute bottom-0 left-0 w-full h-50 bg-linear-to-b from-transparent to-white dark:to-iot-dark z-20 pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-4/5 h-100 bg-blue-600/25 blur-[100px] z-10 pointer-events-none rounded-full" /> */}
    </section>
  );
}