"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const experiences = [
    {
      year: "2026",
      title: "Full Stack Development",
      description: "Building production web applications and AI-powered systems.",
    },
    {
      year: "2025",
      title: "MERN Development",
      description: "Working with React, Node.js, Express and MongoDB.",
    }
  ];

  return (
    <section className="py-32 bg-black relative" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-24">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">EXPERIENCE</h2>
        </div>
        <div className="relative border-l border-white/10 pl-8 md:pl-16 ml-4 md:ml-8 space-y-32">
          
          {/* Scroll Progress Line */}
          <motion.div 
            className="absolute left-[-1px] top-0 w-[2px] bg-gradient-to-b from-white via-white to-transparent origin-top shadow-[0_0_10px_rgba(255,255,255,1)]"
            style={{ height: lineHeight }}
          />

          {experiences.map((exp, i) => (
            <ExperienceItem key={exp.year} exp={exp} index={i} scrollYProgress={scrollYProgress} total={experiences.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ exp, index, scrollYProgress, total }: { exp: any, index: number, scrollYProgress: any, total: number }) {
  // Determine activation point based on index
  const triggerPoint = index / total;
  
  // Create motion values tied precisely to scroll
  const isActive = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint + 0.1], [0, 1]);
  const dotScale = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint + 0.1], [1, 1.5]);
  const dotColor = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint + 0.1], ["#111", "#fff"]);
  const textOpacity = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint + 0.1], [0.3, 1]);
  const yOffset = useTransform(scrollYProgress, [triggerPoint - 0.1, triggerPoint + 0.1], [20, 0]);

  return (
    <motion.div
      style={{ opacity: textOpacity, y: yOffset }}
      className="relative"
    >
      {/* Timeline Dot */}
      <motion.div 
        className="absolute -left-[41px] md:-left-[73px] top-2 w-5 h-5 rounded-full border-[3px] border-white z-10"
        style={{ backgroundColor: dotColor, scale: dotScale }}
      />
      {/* Glow behind the dot when active */}
      <motion.div 
        className="absolute -left-[41px] md:-left-[73px] top-2 w-5 h-5 rounded-full bg-white blur-md z-0 pointer-events-none"
        style={{ opacity: isActive }}
      />
      
      <div className="text-xl md:text-2xl font-mono text-gray-500 mb-4">{exp.year}</div>
      <motion.h3 
        className="text-3xl md:text-4xl font-bold tracking-tight mb-4"
        style={{ textShadow: useTransform(isActive, [0, 1], ["none", "0 0 20px rgba(255,255,255,0.3)"]) }}
      >
        {exp.title}
      </motion.h3>
      <p className="text-xl text-gray-400 font-light max-w-2xl">{exp.description}</p>
    </motion.div>
  );
}
