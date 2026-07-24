"use client";

import { motion } from "framer-motion";
import { ChevronRight, FileText, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { TerminalDesk3D } from "./TerminalDesk3D";

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
        
        {/* Interactive 3D Hacker Desk replacing the Photo/Particles */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl mx-auto mb-4"
        >
          <TerminalDesk3D />
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

        <p className="text-base md:text-xl text-text-secondary max-w-2xl leading-relaxed mt-2 font-light">
          Building production-quality systems, optimizing cloud infrastructure, and writing code that scales. Welcome to my engineering portfolio.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <MagneticButton>
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center gap-2 bg-foreground text-background px-8 py-4 rounded-full font-bold text-sm tracking-wide overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(var(--foreground-rgb),0.3)] w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10">Explore My Work</span>
              <ChevronRight size={16} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/resume.pdf"
              target="_blank"
              className="group relative inline-flex items-center justify-center gap-2 bg-border/50 text-foreground border border-border px-8 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-border transition-colors w-full sm:w-auto backdrop-blur-md"
            >
              <FileText size={16} className="group-hover:-translate-y-0.5 transition-transform" />
              <span>View Resume</span>
            </a>
          </MagneticButton>
        </div>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <MagneticButton>
            <a href="https://www.linkedin.com/in/ayushkumarh0078/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-border/30 text-text-secondary hover:text-primary hover:bg-border/80 border border-border transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="https://github.com/ayushkumarh078" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-12 h-12 rounded-full bg-border/30 text-text-secondary hover:text-foreground hover:bg-border/80 border border-border transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a href="mailto:ayushkumar.h078@gmail.com" className="flex items-center justify-center w-12 h-12 rounded-full bg-border/30 text-text-secondary hover:text-primary hover:bg-border/80 border border-border transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </a>
          </MagneticButton>
        </motion.div>

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
