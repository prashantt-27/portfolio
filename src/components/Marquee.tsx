"use client";

import { motion, useScroll, useTransform, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import { useRef } from "react";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function Marquee() {
  const words = [
    "FULL STACK", "AI", "SAAS", "WEB APPS", "REAL-TIME", "SYSTEM DESIGN", "RAG", "AUTOMATION"
  ];
  
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useTransform(scrollVelocity, [-1000, 1000], [-5, 5], {
    clamp: false
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * 1 * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <section className="py-24 border-y border-white/10 overflow-hidden flex whitespace-nowrap bg-black">
      <motion.div className="flex text-5xl md:text-8xl font-black tracking-tighter" style={{ x }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center">
            {words.map((word, j) => (
              <div key={j} className="flex items-center">
                <span className="mx-8 text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/20">
                  {word}
                </span>
                <span className="text-white/20">✦</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
