"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingSequence() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Respect reduced motion preference — skip loading entirely
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setLoading(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const duration = 1200; // 1.2 seconds — fast enough to not annoy recruiters
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(currentProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "";
        }, 300);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background text-foreground"
        >
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="w-14 h-14 flex items-center justify-center border border-border rounded-xl bg-border/20 mb-6"
            >
              <span className="text-xl font-serif text-foreground font-bold tracking-tighter">AK</span>
            </motion.div>

            {/* Progress line */}
            <div className="w-48 h-px bg-border relative overflow-hidden mb-4">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-foreground"
                style={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear" }}
              />
            </div>

            {/* Percentage */}
            <span className="font-mono text-xs text-text-secondary tracking-widest">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
