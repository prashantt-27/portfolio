"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const scale1 = useTransform(scrollYProgress, [0.2, 0.6], [0.8, 1]);
  const opacity1 = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);
  const y1 = useTransform(scrollYProgress, [0.2, 0.6], [50, 0]);

  const scale2 = useTransform(scrollYProgress, [0.4, 0.8], [0.8, 1]);
  const opacity2 = useTransform(scrollYProgress, [0.4, 0.8], [0, 1]);
  const y2 = useTransform(scrollYProgress, [0.4, 0.8], [50, 0]);

  const formOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const formY = useTransform(scrollYProgress, [0.6, 1], [50, 0]);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" ref={ref} className="py-32 bg-black relative border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h2 
              style={{ scale: scale1, opacity: opacity1, y: y1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] origin-left"
            >
              HAVE AN
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
                IDEA?
              </span>
            </motion.h2>
            <motion.h2 
              style={{ scale: scale2, opacity: opacity2, y: y2 }}
              className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mt-4 text-gray-500 origin-left"
            >
              LET'S BUILD
              <br />
              IT.
            </motion.h2>

            <motion.div 
              style={{ opacity: formOpacity, y: formY }}
              className="mt-16 flex flex-col gap-6 text-xl"
            >
              <Link href="mailto:prashantprajapati2711@gmail.com" className="flex items-center gap-4 hover:text-gray-400 transition-colors w-fit group">
                Email Me 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="#" className="flex items-center gap-4 hover:text-gray-400 transition-colors w-fit group">
                GitHub 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="#" className="flex items-center gap-4 hover:text-gray-400 transition-colors w-fit group">
                LinkedIn 
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <motion.div
            style={{ opacity: formOpacity, y: formY }}
            className="bg-white/5 p-8 md:p-12 rounded-3xl border border-white/10 relative"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium tracking-widest uppercase text-gray-400">Name</label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium tracking-widest uppercase text-gray-400">Email</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium tracking-widest uppercase text-gray-400">Message</label>
                <textarea 
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-white transition-colors text-xl resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              
              <button 
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="group flex items-center justify-between w-full bg-white text-black px-8 py-6 rounded-2xl font-bold mt-4 hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>
                  {status === "loading" && "SENDING..."}
                  {status === "success" && "SENT SUCCESSFULLY"}
                  {status === "error" && "ERROR - TRY AGAIN"}
                  {status === "idle" && "SEND MESSAGE"}
                </span>
                {status === "idle" && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
