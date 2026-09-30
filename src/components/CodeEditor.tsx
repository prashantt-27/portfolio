"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const codeLines = [
  "const developer = {",
  '  name: "Prashant",',
  '  role: "Full Stack Developer",',
  "  skills: [",
  '    "React", "Next.js", "TypeScript",',
  '    "Node.js", "Python", "AWS"',
  "  ],",
  "  isAvailable: true,",
  "  buildAmazingThings: function() {",
  '    console.log("Let\'s collaborate!");',
  "  }",
  "};",
  "",
  "developer.buildAmazingThings();"
];

export default function CodeEditor() {
  const [displayedLines, setDisplayedLines] = useState<string[]>(Array(codeLines.length).fill(""));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) return;

    const line = codeLines[currentLineIndex];

    if (currentCharIndex < line.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines[currentLineIndex] === undefined) {
            newLines[currentLineIndex] = "";
          }
          newLines[currentLineIndex] += line[currentCharIndex];
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, Math.random() * 30 + 20); // Random typing speed

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 300); // Pause at end of line
      return () => clearTimeout(timeout);
    }
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="w-full rounded-xl overflow-hidden bg-[#0d1117]/80 backdrop-blur-md border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
      {/* Mac-style Window Header */}
      <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="mx-auto text-xs text-gray-400 font-mono flex items-center gap-2">
          <span className="opacity-50">bash</span>
          <span>~ /portfolio/dev.ts</span>
        </div>
      </div>

      {/* Code Area */}
      <div className="p-8 text-base md:text-lg font-mono leading-relaxed h-[420px] overflow-hidden text-gray-300">
        {displayedLines.map((line, i) => {
          if (i > currentLineIndex && !line) return null;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              key={i}
              className="flex"
            >
              <span className="w-6 shrink-0 text-gray-600 select-none mr-4">{i + 1}</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/".*?"/g, "<span class='text-[#a5d6ff]'>$&</span>")
                    .replace(/\b(const|function|true)\b/g, "<span class='text-[#ff7b72]'>$&</span>")
                    .replace(/\b(developer|name|role|skills|isAvailable|buildAmazingThings|console)\b/g, "<span class='text-[#79c0ff]'>$&</span>")
                    .replace(/\b(log)\b/g, "<span class='text-[#d2a8ff]'>$&</span>")
                }}
              />
            </motion.div>
          );
        })}
        {currentLineIndex < codeLines.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-4 bg-white ml-1 align-middle"
            style={{ marginTop: '-2px' }}
          />
        )}
      </div>
    </div>
  );
}
