"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingSequence() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = "hidden";

    const duration = 2500; // 2.5 seconds loading sequence
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
        }, 500);
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
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-background text-foreground"
        >
          {/* Subtle background particles (simulated via radial gradients) */}
          <div className="absolute inset-0 pointer-events-none opacity-50 bg-[radial-gradient(circle_at_50%_50%,var(--primary-muted)_0%,transparent_50%)] blur-3xl scale-150" />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Glowing Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 flex items-center justify-center border border-primary/20 rounded-2xl bg-primary/5 shadow-[0_0_30px_rgba(var(--primary-rgb),0.2)] mb-8 overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary/30 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]" />
              <span className="text-2xl font-serif text-primary font-bold tracking-tighter">AK</span>
            </motion.div>

            {/* Neural Network Line Simulator */}
            <div className="w-64 h-[1px] bg-border relative overflow-hidden mb-6">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ type: "tween", ease: "linear" }}
              />
            </div>

            {/* Percentage */}
            <div className="flex items-end gap-1 font-mono text-primary">
              <span className="text-4xl font-light tabular-nums tracking-tighter">{progress}</span>
              <span className="text-sm font-medium mb-1 opacity-50">%</span>
            </div>
            
            <div className="mt-4 text-[10px] tracking-widest uppercase text-primary-muted font-medium">
              Initializing System
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
