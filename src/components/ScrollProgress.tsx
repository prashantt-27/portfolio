"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  
  // Add a spring for smoother tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Map progress to Y translation for the orb (0 to 100vh)
  const orbY = useTransform(smoothProgress, [0, 1], ["0vh", "90vh"]);

  return (
    <>
      {/* The Scroll Line */}
      <div className="fixed right-6 top-[5vh] h-[90vh] w-[1px] bg-white/10 z-[100] hidden md:block mix-blend-difference">
        <motion.div
          className="w-full bg-white origin-top shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          style={{ height: "100%", scaleY: smoothProgress }}
        />
      </div>

      {/* The Floating Animated Orb that follows you */}
      <motion.div
        className="fixed right-[20px] top-[5vh] z-[101] hidden md:flex flex-col items-center justify-center mix-blend-difference pointer-events-none"
        style={{ y: orbY }}
      >
        {/* Glowing Halo */}
        <div className="absolute w-8 h-8 rounded-full border border-white/30 animate-[spin_4s_linear_infinite]" />
        <div className="absolute w-12 h-12 rounded-full border border-dashed border-white/20 animate-[spin_6s_linear_infinite_reverse]" />
        
        {/* Core */}
        <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]" />
        
        {/* Trailing particles or glow */}
        <div className="absolute top-2 w-[1px] h-12 bg-gradient-to-b from-white to-transparent opacity-50" />
      </motion.div>
    </>
  );
}
