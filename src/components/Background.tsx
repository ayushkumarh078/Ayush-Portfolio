"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Background() {
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050505]">
      {/* Animated Grid */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(124, 92, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 92, 255, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(circle at center, black, transparent 80%)",
          WebkitMaskImage: "radial-gradient(circle at center, black, transparent 80%)",
        }}
      />
      
      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-brand-500 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ["0vh", "-100vh"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
