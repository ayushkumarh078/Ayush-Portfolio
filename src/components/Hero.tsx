"use client";

import { motion } from "framer-motion";
import { ChevronRight, FileText, ArrowDown, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const roles = ["Software Engineer", "Systems Architect", "Backend Developer", "Product Builder"];

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
          setTimeout(() => setTyping(false), 2500); // Wait longer before deleting
        }
      } else {
        if (i >= 0) {
          setDisplayed(target.slice(0, i));
        } else {
          setTyping(true);
          setRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }
    }, typing ? 60 : 30); // Faster, smoother typing

    return () => clearTimeout(timer);
  }, [displayed, typing, roleIdx]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Vercel-like spring curve
        className="flex flex-col items-center gap-8 max-w-4xl"
      >
        {/* Currently Building Badge */}
        <motion.a
          href="#currently-building"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md hover:bg-indigo-500/10 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-500/20">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          </div>
          <span className="text-xs md:text-sm font-mono text-indigo-300/80 tracking-wide flex items-center gap-2">
            Currently Building: <strong className="text-indigo-300 font-semibold group-hover:text-indigo-200 transition-colors">Distributed Job Scheduler</strong>
            <ChevronRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
          </span>
        </motion.a>

        {/* Main Heading */}
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1]">
            <span className="text-white">Engineering </span>
            <span
              className="text-transparent"
              style={{
                background: "linear-gradient(to right, #c9c3ff, #7c5cff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Reliability.
            </span>
          </h1>
        </div>

        {/* Typing subtitle */}
        <div className="h-8 flex items-center justify-center">
          <span className="text-xl md:text-2xl font-medium text-white/70 font-mono tracking-tight flex items-center gap-2">
            <Terminal size={20} className="text-indigo-500/70" />
            {displayed}
            <span className="animate-pulse text-indigo-400 font-light">|</span>
          </span>
        </div>

        <p className="text-base md:text-lg text-white/50 max-w-2xl leading-relaxed mt-2">
          I build production-quality backend systems, optimize cloud infrastructure, and write code that scales. Transitioning from enterprise QA at FSSAI to full-stack engineering, I bring a testing-first mindset to modern product development.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full sm:w-auto">
          <motion.a
            whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(124,92,255,0.5)" }}
            whileTap={{ scale: 0.98 }}
            href="#technical-deep-dives"
            className="px-8 py-3.5 rounded-full bg-white text-black font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-gray-100 w-full sm:w-auto"
          >
            Explore Case Studies <ChevronRight size={16} />
          </motion.a>
          <motion.a
            whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium text-sm flex items-center justify-center gap-2 transition-all w-full sm:w-auto"
          >
            <FileText size={16} /> View Resume
          </motion.a>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-3 text-white/30"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={14} className="opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
