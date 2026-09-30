"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import Link from "next/link";
import Magnetic from "./Magnetic";
import profile_photo from '../../public/profile_photo.jpeg';
import Particles from "./Particles";
import TechOrbit from "./TechOrbit";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  // Cinematic Morph Transforms
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [1, 0, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const line1X = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const line2X = useTransform(scrollYProgress, [0, 0.5], [0, 150]);

  const pOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const pY = useTransform(scrollYProgress, [0, 0.3], [0, 40]);

  const btnOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const btnY = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  const canvasScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.2, 0]);

  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const blurAmount = useTransform(scrollYProgress, [0, 0.8], [0, 20]);

  return (
    <section ref={ref} className="relative h-[200vh] w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
      {/* Background Elements */}
      <motion.div 
        style={{ filter: `blur(${blurAmount}px)` }}
        className="absolute inset-0 z-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10"
      />

      {/* Interactive Particles Background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 2 }}
        style={{ opacity: canvasOpacity }}
        className="absolute inset-0 z-0"
      >
        <Particles />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-3xl lg:w-1/2"
          >

            <motion.h1
              variants={itemVariants}
              style={{ scale: headingScale, opacity: headingOpacity, y: headingY }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
            >
              <motion.div style={{ x: line1X }}>FULL STACK</motion.div>
              <motion.div style={{ x: line2X }} className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                DEVELOPER
              </motion.div>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              style={{ opacity: pOpacity, y: pY }}
              className="mt-8 text-xl md:text-2xl text-gray-400 max-w-2xl font-light"
            >
              I build scalable web applications, SaaS platforms and AI-powered digital experiences.
            </motion.p>

            <motion.div
              variants={itemVariants}
              style={{ opacity: btnOpacity, y: btnY }}
              className="mt-12 flex flex-col sm:flex-row gap-6 items-start"
            >
              <Magnetic strength={0.3}>
                <Link
                  href="#work"
                  className="group flex items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-medium transition-transform"
                >
                  EXPLORE WORK
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.3}>
                <Link
                  href="#contact"
                  className="flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 rounded-full font-medium hover:bg-white/5 transition-colors"
                >
                  LET'S TALK
                </Link>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={itemVariants}
              style={{ opacity: btnOpacity }}
              className="mt-16 flex items-center gap-6 text-gray-400"
            >
              <Magnetic>
                <Link href={process.env.NEXT_PUBLIC_GITHUB_LINK || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 block">
                  <Github className="w-6 h-6" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href={process.env.NEXT_PUBLIC_LINKEDIN_LINK || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-2 block">
                  <Linkedin className="w-6 h-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href="mailto:prashantprajapati2711@gmail.com" className="hover:text-white transition-colors p-2 block">
                  <Mail className="w-6 h-6" />
                  <span className="sr-only">Email</span>
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.8, duration: 1, type: "spring" as const, bounce: 0.4 }}
             style={{ opacity: btnOpacity }}
             className="hidden lg:block w-full lg:w-1/2 max-w-2xl perspective-1000"
          >
             <TechOrbit />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ opacity: indicatorOpacity }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest text-gray-500 font-medium">SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ height: ["0px", "40px", "0px"], top: ["0%", "50%", "100%"] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] bg-white/30 h-10 relative overflow-hidden"
        >
          <motion.div
            animate={{ top: ["-100%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute left-0 w-full h-full bg-white"
          />
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
}
