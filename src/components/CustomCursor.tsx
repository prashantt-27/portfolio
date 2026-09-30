"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    // Setup interactive elements
    const setupInteractions = () => {
      const links = document.querySelectorAll("a, button");
      links.forEach((link) => {
        link.addEventListener("mouseenter", () => setCursorVariant("hover"));
        link.addEventListener("mouseleave", () => setCursorVariant("default"));
      });

      const projects = document.querySelectorAll(".project-panel");
      projects.forEach((proj) => {
        proj.addEventListener("mouseenter", () => setCursorVariant("project"));
        proj.addEventListener("mouseleave", () => setCursorVariant("default"));
      });
    };

    // Delay setup to let elements mount
    setTimeout(setupInteractions, 1000);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobile) return null;

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      height: 16,
      width: 16,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference" as const,
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.5)",
      mixBlendMode: "normal" as const,
    },
    project: {
      x: mousePosition.x - 40,
      y: mousePosition.y - 40,
      height: 80,
      width: 80,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "normal" as const,
      opacity: 1,
    }
  };

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[100] flex items-center justify-center font-bold text-black text-xs"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 28,
        mass: 0.5,
      }}
    >
      {cursorVariant === "project" && "VIEW"}
    </motion.div>
  );
}
