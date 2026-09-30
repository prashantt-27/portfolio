"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon, Maximize2, Minus, X } from "lucide-react";

type CommandHistory = {
  command: string;
  output: React.ReactNode;
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: "whoami",
      output: (
        <div className="text-gray-400">
          <span className="text-white font-bold">Prashant Prajapati</span>
          <br />
          Full Stack Developer
        </div>
      )
    }
  ]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const cmd = input.trim().toLowerCase();
    let output: React.ReactNode = "";

    switch (cmd) {
      case "help":
        output = (
          <div className="text-gray-400">
            Available commands:
            <ul className="list-disc ml-6 mt-2 grid grid-cols-2 gap-2">
              <li>about</li>
              <li>projects</li>
              <li>skills</li>
              <li>experience</li>
              <li>status</li>
              <li>contact</li>
              <li>clear</li>
            </ul>
          </div>
        );
        break;
      case "about":
        output = <div className="text-gray-400">I build scalable backend systems, AI applications, and premium user interfaces.</div>;
        break;
      case "projects":
        output = (
          <div className="text-gray-400">
            <ul className="list-none space-y-1">
              <li>- AI PDF Assistant</li>
              <li>- Career Guidance AI</li>
              <li>- Society Management Platform</li>
              <li>- SaaS / CRM Platform</li>
            </ul>
          </div>
        );
        break;
      case "skills":
        output = <div className="text-gray-400">React, Next.js, TypeScript, Node.js, MongoDB, Python, Django, AI, RAG</div>;
        break;
      case "experience":
        output = <div className="text-gray-400">2026: Full Stack Development & AI Systems<br/>2025: MERN Stack Engineering</div>;
        break;
      case "status":
        output = <div className="text-emerald-400 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Available for opportunities</div>;
        break;
      case "contact":
        output = <div className="text-gray-400">Email: prashantprajapati2711@gmail.com<br/>GitHub: @prashantt-27<br/>LinkedIn: /in/prashant-prajapati-018370317</div>;
        break;
      case "clear":
        setHistory([]);
        setInput("");
        return;
      case "whoami":
        output = (
          <div className="text-gray-400">
            <span className="text-white font-bold">Prashant Prajapati</span>
            <br />
            Full Stack Developer
          </div>
        );
        break;
      default:
        output = <div className="text-red-400">Command not found: {cmd}. Type 'help' for available commands.</div>;
    }

    setHistory([...history, { command: input, output }]);
    setInput("");
  };

  return (
    <section className="py-32 bg-[#050505] relative border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">TERMINAL</h2>
          <p className="text-xl text-gray-500 mt-4 font-light">Interactive developer console.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-xl overflow-hidden border border-white/10 bg-[#0A0A0A] shadow-2xl font-mono text-sm md:text-base relative group"
        >
          {/* Mac-style Window Header */}
          <div className="bg-white/5 px-4 py-3 flex items-center justify-between border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="text-gray-500 text-xs font-medium flex items-center gap-2">
              <TerminalIcon className="w-4 h-4" /> prashant@dev ~
            </div>
            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity text-gray-500">
              <Minus className="w-4 h-4" />
              <Maximize2 className="w-4 h-4" />
              <X className="w-4 h-4" />
            </div>
          </div>

          {/* Terminal Body */}
          <div 
            ref={scrollContainerRef}
            className="p-6 h-[400px] overflow-y-auto scrollbar-hide text-gray-300 relative"
            onClick={() => inputRef.current?.focus()}
          >
            {/* History */}
            <div className="flex flex-col gap-4">
              {history.map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-emerald-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <span className="text-gray-500">$</span>
                    <span>{item.command}</span>
                  </div>
                  <div className="pl-6">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Input */}
            <form onSubmit={handleCommand} className="flex items-center gap-2 mt-4 text-white">
              <span className="text-emerald-400">➜</span>
              <span className="text-blue-400">~</span>
              <span className="text-gray-500">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp") {
                    e.preventDefault();
                    if (history.length > 0) {
                      setInput(history[history.length - 1].command);
                    }
                  } else if (e.key === "Tab") {
                    e.preventDefault();
                    const commands = ["help", "about", "projects", "skills", "experience", "status", "contact", "clear", "whoami"];
                    const match = commands.find(c => c.startsWith(input.toLowerCase()));
                    if (match) setInput(match);
                  }
                }}
                className="bg-transparent border-none outline-none flex-1 text-white shadow-none focus:ring-0 p-0"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="w-2 h-4 bg-white/50 animate-pulse ml-[-8px] pointer-events-none" />
            </form>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
