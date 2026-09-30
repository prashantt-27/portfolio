"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { projectsData } from "@/data";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/icons";
import Link from "next/link";
import Image from "next/image";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} id="work" className="relative bg-[#020202] py-24 pb-48">
      <div className="container mx-auto px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
            SELECTED WORK
          </h2>
        </motion.div>
      </div>

      <div className="mt-12">
        {projectsData.map((project, index) => {
          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              progress={scrollYProgress}
              total={projectsData.length}
            />
          );
        })}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  progress,
  total
}: {
  project: typeof projectsData[0],
  index: number,
  progress: MotionValue<number>,
  total: number
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Calculate when this card should start scaling down
  // It starts scaling down when the NEXT card begins to cover it
  const targetScale = 1 - ((total - index) * 0.05);

  // Create a scroll range where this specific card scales down
  // We use the global scrollYProgress of the section
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;

  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, targetScale]);

  return (
    <div className="h-screen flex items-center justify-center sticky top-0 px-4 md:px-0">
      <motion.div
        ref={cardRef}
        style={{ scale, top: `calc(5vh + ${index * 15}px)` }}
        className="w-full max-w-6xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative flex flex-col justify-center origin-top h-[85vh] md:h-[80vh]"
      >
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-12 h-full">
          {/* Info Content */}
          <div className="flex-1 lg:col-span-5 flex flex-col justify-center p-6 md:p-8 lg:p-12 h-full overflow-y-auto scrollbar-hide">
            <div className="text-white/30 font-mono text-xl md:text-2xl font-black mb-2 md:mb-4">{project.id}</div>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 md:mb-6">{project.title}</h3>
            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed mb-6 md:mb-8">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
              {project.tech.map(t => (
                <span key={t} className="px-2 md:px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] md:text-xs text-gray-300 whitespace-nowrap">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 md:gap-6 mt-auto">
              <Link
                href={project.link}
                className="flex items-center gap-2 pb-1 border-b border-white hover:text-gray-400 hover:border-gray-400 transition-colors uppercase tracking-widest text-xs md:text-sm font-medium"
              >
                VIEW PROJECT <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
              </Link>
              <Link
                href={project.github}
                className="p-2 md:p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors"
              >
                <Github className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </div>

          {/* Image Display */}
          <div className="h-[30vh] lg:h-full lg:col-span-7 relative overflow-hidden bg-black border-b lg:border-b-0 lg:border-l border-white/10">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0A0A0A] z-10 hidden lg:block" />

            <img
              src={project.image}
              alt={project.title}
              className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-700 hover:scale-105"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
