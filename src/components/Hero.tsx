"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const roles = ["Software Engineer", "Backend Developer", "Problem Solver", "QA Engineer", "Builder"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIdx];
    let i = typing ? displayed.length : displayed.length - 1;

    const timer = setTimeout(() => {
      if (typing) {
        if (i < target.length) {
          setDisplayed(target.slice(0, i + 1));
        } else {
          setTimeout(() => setTyping(false), 1800);
        }
      } else {
        if (i >= 0) {
          setDisplayed(target.slice(0, i));
        } else {
          setTyping(true);
          setRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }
    }, typing ? 80 : 45);

    return () => clearTimeout(timer);
  }, [displayed, typing, roleIdx]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="flex flex-col items-center gap-6 max-w-4xl"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-mono text-white/60 tracking-widest">Open for work — 2026</span>
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-none">
          <span className="text-white">Hi, I'm </span>
          <span
            className="text-transparent"
            style={{
              background: "linear-gradient(135deg, #c9c3ff 0%, #7c5cff 50%, #a78bfa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Ayush Kumar.
          </span>
        </h1>

        {/* Typing subtitle */}
        <div className="h-10 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-light text-white/70 font-mono">
            {displayed}
            <span className="animate-pulse text-indigo-400">|</span>
          </span>
        </div>

        <p className="text-lg text-white/50 max-w-2xl leading-relaxed">
          CS undergraduate at <span className="text-white/80">VIT-AP University</span> (2026). Engineering reliable backend systems and
          transitioning from a rigorous QA background to full-time software development.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(124,92,255,0.4)" }}
            whileTap={{ scale: 0.97 }}
            href="#projects"
            className="px-8 py-4 rounded-full bg-white text-black font-bold text-base flex items-center gap-2 transition-all"
          >
            View Projects <ChevronRight size={18} />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="#contact"
            className="px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 text-white font-medium text-base flex items-center gap-2 transition-all"
          >
            <Download size={18} /> Contact Me
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-12 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll to explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
