import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AIConcierge from "./components/AIConcierge";
import ImageGen from "./components/ImageGen";
import VideoGen from "./components/VideoGen";
import Footer from "./components/Footer";
import { motion } from "motion/react";
import { Waves, Mountain, Wind, Sun } from "lucide-react";

export default function App() {
  return (
    <main className="bg-black min-h-screen selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      
      {/* Experience Section */}
      <section id="experience" className="py-32 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
            <div className="lg:col-span-1 space-y-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="text-6xl font-serif uppercase leading-none tracking-tighter">
                  The Deepest<br />
                  <span className="italic font-light">Connection</span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest">
                  Lake Baikal is not just a destination; it is a spiritual journey. At Baikal Mayak, we bridge the gap between untamed nature and modern luxury.
                </p>
              </motion.div>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Waves className="w-6 h-6 text-white/40" />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold">Crystal Waters</h4>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">Visibility up to 40 meters deep.</p>
                </div>
                <div className="space-y-2">
                  <Mountain className="w-6 h-6 text-white/40" />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold">Siberian Peaks</h4>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">Surrounded by the Khamar-Daban range.</p>
                </div>
                <div className="space-y-2">
                  <Wind className="w-6 h-6 text-white/40" />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold">Pure Air</h4>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">Filtered by the vast Taiga forest.</p>
                </div>
                <div className="space-y-2">
                  <Sun className="w-6 h-6 text-white/40" />
                  <h4 className="text-[10px] uppercase tracking-widest font-bold">Golden Hours</h4>
                  <p className="text-[10px] text-white/20 uppercase tracking-widest leading-relaxed">Unforgettable sunsets over the horizon.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-6 h-[600px]">
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="h-full rounded-3xl overflow-hidden relative group"
              >
                <img 
                  src="https://picsum.photos/seed/baikal-ice/800/1200" 
                  alt="Baikal Ice" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                  <span className="text-xs uppercase tracking-widest font-bold">Winter Magic</span>
                </div>
              </motion.div>
              <div className="grid grid-rows-2 gap-6 h-full">
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="rounded-3xl overflow-hidden relative group"
                >
                  <img 
                    src="https://picsum.photos/seed/baikal-summer/800/600" 
                    alt="Baikal Summer" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-xs uppercase tracking-widest font-bold">Summer Bliss</span>
                  </div>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="rounded-3xl overflow-hidden relative group"
                >
                  <img 
                    src="https://picsum.photos/seed/baikal-resort/800/600" 
                    alt="Resort" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                    <span className="text-xs uppercase tracking-widest font-bold">Premium Comfort</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIConcierge />
      <ImageGen />
      <VideoGen />
      <Footer />
    </main>
  );
}
