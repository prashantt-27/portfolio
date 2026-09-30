"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  // Strict opacity crossfades - one finishes before next starts
  const op1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const op2 = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const op3 = useTransform(scrollYProgress, [0.7, 0.75, 1], [0, 1, 1]);

  // Use display none to absolutely guarantee no phantom overlapping
  const display1 = useTransform(scrollYProgress, v => v > 0.35 ? "none" : "block");
  const display2 = useTransform(scrollYProgress, v => (v < 0.3 || v > 0.7) ? "none" : "block");
  const display3 = useTransform(scrollYProgress, v => v < 0.65 ? "none" : "block");

  // Y translates for sliding up
  const y1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [0, 0, -20]);
  const y2 = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [20, 0, 0, -20]);
  const y3 = useTransform(scrollYProgress, [0.7, 0.75, 1], [20, 0, 0]);

  // Strict content opacities
  const contentOp1 = useTransform(scrollYProgress, [0, 0.25, 0.3], [1, 1, 0]);
  const contentOp2 = useTransform(scrollYProgress, [0.35, 0.4, 0.6, 0.65], [0, 1, 1, 0]);
  const contentOp3 = useTransform(scrollYProgress, [0.7, 0.75, 1], [0, 1, 1]);

  return (
    <section id="about" ref={ref} className="bg-black relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 relative h-auto lg:h-[60vh]">
            
            {/* Left side titles overlapping */}
            <div className="relative h-[120px] md:h-[150px] lg:h-auto">
              <motion.div 
                style={{ opacity: op1, y: y1, display: display1 }} 
                className="absolute top-0 left-0 w-full"
              >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                  ABOUT ME
                  <br />
                  <span className="text-gray-500 text-2xl md:text-4xl">A DEVELOPER WHO LOVES BUILDING THINGS.</span>
                </h2>
              </motion.div>
              
              <motion.div 
                style={{ opacity: op2, y: y2, display: display2 }} 
                className="absolute top-0 left-0 w-full"
              >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                  CURRENTLY BUILDING
                  <br />
                  <span className="text-gray-500 text-2xl md:text-4xl">SCALABLE BACKEND SYSTEMS & SAAS.</span>
                </h2>
              </motion.div>

              <motion.div 
                style={{ opacity: op3, y: y3, display: display3 }} 
                className="absolute top-0 left-0 w-full"
              >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
                  CURRENTLY EXPLORING
                  <br />
                  <span className="text-gray-500 text-2xl md:text-4xl">AI / RAG / AGENTS.</span>
                </h2>
              </motion.div>
            </div>

            {/* Right side content overlapping */}
            <div className="relative flex flex-col gap-8 text-lg md:text-xl text-gray-400 font-light h-[250px] lg:h-auto">
              
              <motion.div 
                style={{ opacity: contentOp1, y: y1, display: display1 }} 
                className="absolute top-0 left-0 w-full flex flex-col gap-6"
              >
                <p>
                  I'm Prashant Prajapati, a Full Stack Developer focused on building modern web applications, scalable backend systems, and AI-powered products.
                </p>
                <p>
                  I enjoy turning complex problems into simple, intuitive experiences.
                </p>
              </motion.div>

              <motion.div 
                style={{ opacity: contentOp2, y: y2, display: display2 }} 
                className="absolute top-0 left-0 w-full flex flex-col gap-6"
              >
                <p>
                  I work extensively with the MERN stack, Next.js, and modern cloud infrastructure.
                </p>
                <p>
                  My goal is to engineer resilient architectures that scale smoothly from zero to millions of users while remaining maintainable and fast.
                </p>
              </motion.div>

              <motion.div 
                style={{ opacity: contentOp3, y: y3, display: display3 }} 
                className="absolute top-0 left-0 w-full flex flex-col gap-6"
              >
                <p>
                  Beyond traditional software, I am deeply researching large language models and intelligent systems.
                </p>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <ul className="flex flex-wrap gap-3 mt-4">
                    {["AI Agents", "RAG", "MCP", "LLM Applications", "Real-time Systems"].map((item) => (
                      <li key={item} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
