import { motion } from "motion/react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Immersive Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/baikal/1920/1080?blur=2" 
          alt="Lake Baikal"
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />
      </div>

      {/* Editorial Typography */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-white/70 uppercase tracking-[0.5em] text-xs mb-8 font-sans font-semibold">
            The Deepest Experience
          </span>
          <h1 className="text-white font-serif text-[12vw] md:text-[10vw] leading-[0.85] tracking-tighter uppercase mb-12">
            Baikal<br />
            <span className="italic font-light">Mayak</span>
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-4 border border-white/30 text-white uppercase tracking-[0.3em] text-xs hover:bg-white hover:text-black transition-all duration-500"
          >
            Explore the Lighthouse
          </motion.button>
        </motion.div>
      </div>

      {/* Atmospheric Accents */}
      <div className="absolute bottom-12 left-12 z-10 hidden lg:block">
        <div className="flex flex-col gap-2 text-white/40 text-[10px] uppercase tracking-widest font-mono">
          <span>51.8683° N</span>
          <span>104.8856° E</span>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 z-10 hidden lg:block">
        <div className="flex flex-col gap-2 text-white/40 text-[10px] uppercase tracking-widest font-mono text-right">
          <span>The Pearl of Siberia</span>
          <span>Est. 2022</span>
        </div>
      </div>
    </section>
  );
}
