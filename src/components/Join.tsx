import { ArrowRight, Terminal } from "lucide-react";

export default function Join() {
  return (
    <section id="join" className="py-20 px-4 bg-gray-50 dark:bg-transparent transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Joint the <span className="text-iot-green">Club</span>
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 text-balance">
          Whether you're a hardware enthusiast, a firmware wizard, or just curious about 
          the world of IoT, there's a node for you in our network.
        </p>

        <div className="flex flex-col items-center justify-center gap-6">
          <a 
            href="#" 
            target="_blank"
            className="group flex items-center gap-2 px-8 py-4 bg-iot-green text-white dark:text-iot-dark font-bold rounded-full hover:scale-105 transition-all shadow-md hover:shadow-lg hover:shadow-iot-green/30"
          >
            Apply for Membership
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <div className="text-sm text-gray-500 dark:text-gray-500 font-medium">
            <span className="text-iot-green font-mono">Status:</span> Recruitment Open for 2026
          </div>
        </div>
      </div>
    </section>
  );
}