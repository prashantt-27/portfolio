"use client";

import { motion } from "framer-motion";
import { techStackData } from "@/data";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPython,
  SiDjango,
  SiTailwindcss,
  SiGit,
  SiDocker,
  SiLangchain
} from "react-icons/si";
import { FaBrain, FaRobot } from "react-icons/fa";

const iconMap: Record<string, React.ElementType> = {
  "React": SiReact,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "JavaScript": SiJavascript,
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  "MongoDB": SiMongodb,
  "PostgreSQL": SiPostgresql,
  "Python": SiPython,
  "Django": SiDjango,
  "Tailwind": SiTailwindcss,
  "Git": SiGit,
  "Docker": SiDocker,
  "LangChain": SiLangchain,
  "RAG": FaBrain,
  "AI": FaRobot
};

const getFloatingAnimation = (index: number) => {
  const durationY = 3 + (index % 3);
  const durationX = 4 + (index % 4);
  const yOffset = 15 + (index % 10);
  const xOffset = 10 + (index % 5);

  return {
    y: [-yOffset, yOffset],
    x: [-xOffset, xOffset],
    durationY,
    durationX
  };
};

export default function TechStack() {
  return (
    <section className="py-32 bg-[#020202] relative overflow-hidden min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_60%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col h-full justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">MY TOOLBOX</h2>
          <p className="text-xl text-gray-500 mt-4 font-light">Technologies I use to build scalable systems.</p>
        </motion.div>

        {/* Floating Interactive Ecosystem - using group/stack to trigger child dimming */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 max-w-6xl mx-auto px-4 py-12 relative group/stack">
          {techStackData.map((tech, i) => {
            const Icon = iconMap[tech.name];
            const anim = getFloatingAnimation(i);

            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, type: "spring", stiffness: 100 }}
                className="relative group cursor-pointer z-10 hover:z-50 opacity-100 group-hover/stack:opacity-40 hover:!opacity-100 transition-opacity duration-300"
              >
                <motion.div
                  animate={{ y: anim.y, x: anim.x }}
                  transition={{
                    y: { duration: anim.durationY, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
                    x: { duration: anim.durationX, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
                  }}
                  className="relative z-10 scale-100 group-hover:scale-110 transition-transform duration-300"
                >
                  {/* Particles / Orbit (Always in DOM, visible only on hover) */}
                  <div className="absolute inset-[-50%] pointer-events-none opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/20 animate-[spin_4s_linear_infinite]" style={{ borderColor: `${tech.color}55` }} />
                    <div className="absolute inset-4 rounded-full border border-white/10 animate-[spin_3s_linear_infinite_reverse]" style={{ borderColor: `${tech.color}33` }} />
                    <div
                      className="absolute w-2 h-2 rounded-full left-0 top-1/2 -translate-y-1/2 animate-[spin_2s_linear_infinite]"
                      style={{ backgroundColor: tech.color, boxShadow: `0 0 10px ${tech.color}`, transformOrigin: "250%" }}
                    />
                  </div>

                  {/* Core Icon Circle */}
                  <div
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center bg-black/80 backdrop-blur-md border border-white/10 group-hover:border-transparent transition-all duration-500 relative overflow-hidden"
                    style={{
                      boxShadow: `0 0 30px ${tech.color}11, inset 0 0 20px ${tech.color}05`
                    }}
                  >
                    {/* Inner glowing pulse (Visible on hover) */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <span
                      className="text-3xl md:text-4xl transition-all duration-500 flex items-center justify-center relative z-10 text-white/50 group-hover:text-white"
                      style={{ filter: `drop-shadow(0 0 0px transparent)` }}
                    >
                      {Icon ? (
                        <Icon className="group-hover:drop-shadow-[0_0_15px_currentColor] transition-all duration-500" style={{ color: tech.color }} />
                      ) : (
                        <span className="font-black text-xl" style={{ color: tech.color }}>{tech.name[0]}</span>
                      )}
                    </span>
                  </div>

                  {/* Metadata Label */}
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 border px-4 py-2 rounded-xl pointer-events-none z-50 shadow-2xl backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-5 scale-90 group-hover:scale-100 transition-all duration-300"
                    style={{ borderColor: `${tech.color}44` }}
                  >
                    <div className="font-bold text-sm tracking-wide text-white">{tech.name}</div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
