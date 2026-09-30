"use client";

import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, MotionValue } from "framer-motion";
import React from "react";
import Image from "next/image";

const skills = [
  { name: "React", radius: 140, angle: 0, speed: 0.015, size: "w-16 h-16" },
  { name: "Next.js", radius: 140, angle: 180, speed: 0.015, size: "w-20 h-20" },
  { name: "Node.js", radius: 220, angle: 90, speed: -0.01, size: "w-24 h-24" },
  { name: "Python", radius: 220, angle: 270, speed: -0.01, size: "w-16 h-16" },
  { name: "AWS", radius: 300, angle: 45, speed: 0.005, size: "w-20 h-20" },
  { name: "SQL", radius: 300, angle: 225, speed: 0.005, size: "w-16 h-16" },
  { name: "GraphQL", radius: 300, angle: 135, speed: 0.005, size: "w-16 h-16" },
  { name: "Docker", radius: 300, angle: 315, speed: 0.005, size: "w-20 h-20" },
];

function SkillNode({
  skill,
  time,
  rotateX,
  rotateY
}: {
  skill: typeof skills[0],
  time: MotionValue<number>,
  rotateX: MotionValue<number>,
  rotateY: MotionValue<number>
}) {
  // Use framer-motion's useTransform to calculate positions natively without React renders
  const currentAngle = useTransform(time, t => (skill.angle * Math.PI / 180) + (t * skill.speed * 0.04));
  const x = useTransform(currentAngle, a => Math.cos(a) * skill.radius);
  const y = useTransform(currentAngle, a => Math.sin(a) * skill.radius);
  const z = useTransform(y, val => val * 0.2);

  // Counter-rotate the text so it always faces the camera
  const invRotateX = useTransform(rotateX, r => -r);
  const invRotateY = useTransform(rotateY, r => -r);

  return (
    <motion.div
      className={`absolute flex justify-center items-center rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-[10px] md:text-xs font-mono text-gray-300 font-bold tracking-widest hover:bg-white hover:text-black hover:scale-110 transition-colors duration-300 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.8)] ${skill.size}`}
      style={{
        x,
        y,
        z,
        rotateX: invRotateX,
        rotateY: invRotateY
      }}
    >
      {skill.name}
    </motion.div>
  );
}

export default function TechOrbit() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(useSpring(mouseY, { stiffness: 100, damping: 30 }), [-0.5, 0.5], [30, -30]);
  const rotateY = useTransform(useSpring(mouseX, { stiffness: 100, damping: 30 }), [-0.5, 0.5], [-30, 30]);

  const time = useMotionValue(0);

  // Native animation loop - bypasses React re-renders entirely!
  useAnimationFrame((t, delta) => {
    time.set(time.get() + delta);
  });

  function handleMouseMove(ev: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = ev.currentTarget.getBoundingClientRect();
    const x = (ev.clientX - rect.left) / rect.width - 0.5;
    const y = (ev.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      className="relative w-full h-[600px] flex justify-center items-center perspective-[2000px] cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Ambience */}
      <div className="absolute w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />

      <motion.div
        className="relative flex justify-center items-center w-full h-full transform-style-3d"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        {/* Central Core */}
        <div className="absolute w-32 h-32 rounded-full border border-white/20 shadow-[0_0_60px_rgba(255,255,255,0.15)] z-10 overflow-hidden" style={{ transform: "translateZ(50px)" }}>
          <div className="w-full h-full absolute inset-0 z-0">
            <div className="w-16 h-16 rounded-full border border-white/40 animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-overlay" />
            <div className="w-20 h-20 rounded-full border border-dashed border-white/30 animate-[spin_10s_linear_infinite] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none mix-blend-overlay" />
          </div>
          <Image
            src="/profile_photo.jpeg"
            alt="Profile Photo"
            fill
            className="object-cover relative z-10"
            priority
          />
        </div>

        {/* Orbit Rings */}
        {[140, 220, 300].map((radius) => (
          <div
            key={radius}
            className="absolute rounded-full border border-white/10 pointer-events-none"
            style={{
              width: radius * 2,
              height: radius * 2,
              transform: "translateZ(0px)"
            }}
          />
        ))}

        {/* Orbiting Skill Nodes */}
        {skills.map((skill, i) => (
          <SkillNode
            key={i}
            skill={skill}
            time={time}
            rotateX={rotateX}
            rotateY={rotateY}
          />
        ))}

        {/* Decorative Grid Plane */}
        <div
          className="absolute w-[800px] h-[800px] border border-white/5 opacity-20 rounded-full pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            transform: "translateZ(-100px) rotateX(60deg)"
          }}
        />
      </motion.div>
    </div>
  );
}
