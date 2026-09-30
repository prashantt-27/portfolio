"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, User, Briefcase, Terminal as TerminalIcon, Mail, FileText, Code2, Cpu } from "lucide-react";
import { Github } from "./icons";


export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const commands = [
    { id: "about", icon: User, name: "About Me", href: "#about" },
    { id: "projects", icon: Briefcase, name: "Projects", href: "#work" },
    { id: "experience", icon: Code2, name: "Experience", href: "#experience" },
    { id: "stack", icon: Cpu, name: "Tech Stack", href: "#stack" },
    { id: "terminal", icon: TerminalIcon, name: "Developer Terminal", href: "#terminal" },
    { id: "github", icon: Github, name: "GitHub Profile", href: "https://github.com/prashantt-27", external: true },
    { id: "contact", icon: Mail, name: "Contact Me", href: "#contact" },
  ];

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  useEffect(() => {
    if (!isOpen) {
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle keyboard navigation inside the palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const cmd = filteredCommands[selectedIndex];
        if (cmd) {
          if (cmd.external) {
            window.open(cmd.href, "_blank");
          } else {
            router.push(cmd.href);
          }
          setIsOpen(false);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, router]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, y: -20, x: "-50%" }}
            transition={{ duration: 0.15 }}
            className="fixed top-[20%] left-1/2 w-[90%] max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl z-[201] overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-white/10">
              <Search className="w-5 h-5 text-gray-500 mr-3" />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-gray-500"
              />
              <div className="text-xs text-gray-500 border border-white/10 px-2 py-1 rounded bg-white/5">
                ESC
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto py-2">
              {filteredCommands.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No commands found for "{search}"
                </div>
              ) : (
                filteredCommands.map((cmd, idx) => {
                  const isSelected = idx === selectedIndex;
                  const Icon = cmd.icon;
                  return (
                    <div
                      key={cmd.id}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => {
                        if (cmd.external) window.open(cmd.href, "_blank");
                        else router.push(cmd.href);
                        setIsOpen(false);
                      }}
                      className={`flex items-center px-4 py-3 mx-2 rounded-lg cursor-pointer transition-colors ${isSelected ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                        }`}
                    >
                      <Icon className={`w-5 h-5 mr-3 ${isSelected ? "text-white" : "text-gray-500"}`} />
                      <span className="flex-1 font-medium">{cmd.name}</span>
                      {isSelected && (
                        <span className="text-xs text-gray-500">Press Enter</span>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            <div className="bg-white/5 px-4 py-2 text-xs text-gray-500 flex items-center gap-4 border-t border-white/10">
              <span className="flex items-center gap-1"><span className="border border-white/20 px-1 rounded">↑</span><span className="border border-white/20 px-1 rounded">↓</span> to navigate</span>
              <span className="flex items-center gap-1"><span className="border border-white/20 px-1 rounded">↵</span> to select</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
