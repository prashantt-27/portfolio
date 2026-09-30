"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";
import profile_photo from '../../public/profile_photo.jpeg'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "numeric",
        hour12: true
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000 * 60); // Update every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/40 backdrop-blur-md py-4" : "bg-transparent py-6"
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-tighter hover:text-gray-300 transition-colors">
          <img src={profile_photo.src} alt="Prashant" className="w-12 h-12 rounded-full border border-white/20" />
          PRASHANT.DEV
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Magnetic><Link href="#work" className="hover:text-gray-300 transition-colors py-2 px-1">WORK</Link></Magnetic>
          <Magnetic><Link href="#about" className="hover:text-gray-300 transition-colors py-2 px-1">ABOUT</Link></Magnetic>
          <Magnetic><Link href="#lab" className="hover:text-gray-300 transition-colors py-2 px-1">LAB</Link></Magnetic>
          <Magnetic><Link href="#contact" className="hover:text-gray-300 transition-colors py-2 px-1">CONTACT</Link></Magnetic>

          <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-8">
            <div className="flex flex-col text-xs text-gray-500 font-mono">
              <span className="uppercase tracking-widest text-gray-400">Ahmedabad, India</span>
              <span>{time || "LOADING..."}</span>
            </div>
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <Link href="#contact" className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1 border border-white/10" onClick={() => setMobileMenuOpen(false)}>
          </Link>
          <button
            className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col items-center py-8 gap-8 z-40 shadow-2xl"
          >
            <Link href="#work" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold tracking-widest hover:text-gray-300 transition-colors">WORK</Link>
            <Link href="#about" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold tracking-widest hover:text-gray-300 transition-colors">ABOUT</Link>
            <Link href="#lab" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold tracking-widest hover:text-gray-300 transition-colors">LAB</Link>
            <Link href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-xl font-bold tracking-widest hover:text-gray-300 transition-colors">CONTACT</Link>

            <div className="flex flex-col items-center mt-4 text-xs text-gray-500 font-mono border-t border-white/10 pt-8 w-1/2">
              <span className="uppercase tracking-widest text-gray-400">Ahmedabad, India</span>
              <span className="mt-1">{time || "LOADING..."}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
