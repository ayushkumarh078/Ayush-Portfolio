"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, X, Play, Palette, Mail, Sparkles } from "lucide-react";

export function WelcomeSequence() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasSeen = localStorage.getItem("has_seen_welcome");
    if (!hasSeen) {
      setIsOpen(true);
      localStorage.setItem("has_seen_welcome", "true");
    }
  }, []);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Cinematic Blur Backdrop */}
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-background/60"
            />

            {/* Main Sequence Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-full max-w-2xl bg-background/50 border border-primary/20 shadow-[0_0_80px_rgba(var(--primary-rgb),0.15)] rounded-3xl overflow-hidden backdrop-blur-xl p-8 md:p-12"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 text-text-secondary hover:text-foreground transition-colors"
              >
                <span className="sr-only">Skip</span>
                <X size={24} />
              </button>

              <div className="flex flex-col gap-8 text-center sm:text-left">
                {/* Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 border border-primary/20">
                    <Sparkles size={14} /> Interactive Experience
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-playfair tracking-tight leading-tight">
                    Welcome to my portfolio.
                  </h2>
                  <p className="text-lg text-text-secondary leading-relaxed">
                    This isn't just a static resume. It's an interactive operating system designed to showcase my engineering work. Feel free to explore the projects, skills, and achievements.
                  </p>
                </motion.div>

                {/* Theme Customizer Feature */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.8 }}
                  className="bg-border/30 border border-border rounded-2xl p-6 flex items-start gap-4"
                >
                  <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                    <Palette size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">Completely Personalizable</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      You can completely personalize the website using the <strong>Color Switcher</strong>. Mix and match background types and Matrix rain colors to create your own custom theme, and instantly preview the changes.
                    </p>
                  </div>
                </motion.div>

                {/* Contact Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4, duration: 0.8 }}
                >
                  <p className="text-sm text-text-secondary mb-4 text-center sm:text-left">
                    If you'd like to connect, simply click the icons below or in the contact section to get in touch:
                  </p>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-4">
                    
                    <a href="https://www.linkedin.com/in/ayushkumarh0078/" target="_blank" rel="noreferrer" className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 hover:bg-blue-500 hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      <span className="font-semibold text-sm">LinkedIn</span>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Let's connect on LinkedIn
                      </div>
                    </a>

                    <a href="https://github.com/ayushkumarh078" target="_blank" rel="noreferrer" className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-foreground/10 text-foreground border border-foreground/20 hover:bg-foreground hover:text-background hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      <span className="font-semibold text-sm">GitHub</span>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        View my GitHub projects
                      </div>
                    </a>

                    <a href="mailto:ayushkumar.h078@gmail.com" className="group relative flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.4)] transition-all duration-300">
                      <Mail size={16} /> 
                      <span className="font-semibold text-sm">Email</span>
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-foreground text-background text-xs font-bold rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Send me an email
                      </div>
                    </a>

                  </div>
                </motion.div>

                {/* Proceed Button */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.2, duration: 0.8 }}
                  className="mt-4 flex justify-center sm:justify-start"
                >
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-background rounded-full font-bold hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] transition-all duration-300"
                  >
                    Enter Portfolio <Play size={16} className="fill-background" />
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Replay Info Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-border/50 backdrop-blur-md border border-border flex items-center justify-center text-text-secondary hover:text-primary hover:bg-border transition-all hover:scale-110 shadow-lg"
        title="Replay Introduction"
      >
        <Info size={20} />
      </motion.button>
    </>
  );
}
