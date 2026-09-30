"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState, useRef } from "react";
import { labData } from "@/data";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Lab() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest <= 0) {
      setActiveIndex(null);
      return;
    }
    const index = Math.floor(latest * labData.length);
    setActiveIndex(Math.min(index, labData.length - 1));
  });

  return (
    <section id="lab" className="py-32 bg-black relative" ref={containerRef}>
      <div className="container mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">THE LAB</h2>
          <p className="text-2xl text-gray-500 mt-4 font-light">Things I'm experimenting with.</p>
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col border-t border-white/10 relative h-[150vh]">
          <div className="sticky top-32">
            {labData.map((item, i) => {
              const isActive = activeIndex === i;
              return (
                <motion.div
                  key={item.title}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    borderColor: isActive ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.1)",
                    backgroundColor: isActive ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0)"
                  }}
                  transition={{ duration: 0.4 }}
                  className="group border-b py-8 px-4 relative rounded-lg mt-2"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                    <motion.h3
                      animate={{ color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.3)" }}
                      className="text-4xl md:text-5xl font-black tracking-tight transition-colors duration-500"
                    >
                      {item.title}
                    </motion.h3>

                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -20 }}
                      className="flex items-center gap-4"
                    >
                      <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-8 pb-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                          <p className="text-xl text-gray-400 font-light max-w-lg">
                            {item.description}
                          </p>
                          <div>
                            <h4 className="text-sm tracking-widest text-white uppercase mb-4 font-medium">Related</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.related.map(r => (
                                <span key={r} className="px-3 py-1 rounded-full bg-white/10 text-sm text-white">
                                  {r}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
