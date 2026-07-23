"use client";

import { motion } from "framer-motion";
import { ChevronRight, FileText, ArrowDown, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

const roles = ["Software Engineer", "AI Developer", "Backend Engineer", "Problem Solver", "System Designer"];

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
          setTimeout(() => setTyping(false), 2500);
        }
      } else {
        if (i >= 0) {
          setDisplayed(target.slice(0, i));
        } else {
          setTyping(true);
          setRoleIdx((prev) => (prev + 1) % roles.length);
        }
      }
    }, typing ? 50 : 25);

    return () => clearTimeout(timer);
  }, [displayed, typing, roleIdx]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-12 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} 
        className="flex flex-col items-center gap-8 max-w-5xl w-full"
      >
        {/* Photo Placeholder */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
          className="w-24 h-24 rounded-full bg-border/50 border border-border flex items-center justify-center overflow-hidden mb-2 relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
          <span className="text-xs text-primary-muted font-mono">Photo</span>
        </motion.div>

        {/* Main Heading */}
        <div className="flex flex-col gap-2 items-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans font-bold tracking-tighter leading-[1.1] text-foreground">
            Hi, I'm Ayush Kumar.
          </h1>
          
          <div className="h-10 md:h-14 mt-4 flex items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-sans font-medium tracking-tight text-primary-muted flex items-center gap-3">
              I am a <span className="text-primary">{displayed}</span>
              <span className="animate-pulse text-primary font-light">|</span>
            </h2>
          </div>
        </div>

        <p className="text-base md:text-xl text-text-secondary max-w-2xl leading-relaxed mt-4 font-light">
          Building production-quality systems, optimizing cloud infrastructure, and writing code that scales. Welcome to my engineering portfolio.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 w-full sm:w-auto">
          <motion.a
            whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(var(--primary-rgb),0.5)" }}
            whileTap={{ scale: 0.98 }}
            href="#projects"
            className="px-8 py-3.5 rounded-full bg-primary text-background font-medium text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)] hover:bg-primary/90"
          >
            View Projects <ChevronRight size={16} />
          </motion.a>
          
          {[
            { label: "Resume", href: "/Ayush_Resume.pdf", icon: <FileText size={16} /> },
            { label: "GitHub", href: "https://github.com/ayushkumarh078", icon: null },
            { label: "LinkedIn", href: "https://linkedin.com/in/ayushkumarh078", icon: null },
            { label: "Contact", href: "#contact", icon: null },
          ].map((link, i) => (
            <motion.a
              key={link.label}
              whileHover={{ y: -2, backgroundColor: "var(--border)" }}
              whileTap={{ scale: 0.98 }}
              href={link.href}
              target={link.href.startsWith("http") || link.href.endsWith(".pdf") ? "_blank" : "_self"}
              className="px-6 py-3.5 rounded-full border border-border bg-background/50 backdrop-blur-md text-foreground font-medium text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {link.icon} {link.label}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 flex flex-col items-center gap-3 text-primary-muted"
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase opacity-70">Scroll to Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown size={14} className="opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
