"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Code2 } from "lucide-react";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp", 
  "ArrowDown", "ArrowDown", 
  "ArrowLeft", "ArrowRight", 
  "ArrowLeft", "ArrowRight", 
  "b", "a"
];

export function KonamiCode() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (unlocked) return;

      const key = e.key;
      setInputSequence(prev => {
        const newSeq = [...prev, key];
        if (newSeq.length > KONAMI_SEQUENCE.length) {
          newSeq.shift();
        }
        
        if (newSeq.join(",") === KONAMI_SEQUENCE.join(",")) {
          setUnlocked(true);
          return [];
        }
        
        return newSeq;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlocked]);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 bg-background border border-primary p-4 rounded-2xl shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)] backdrop-blur-xl"
        >
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Trophy size={24} className="animate-bounce" />
          </div>
          <div>
            <h3 className="text-foreground font-bold font-sans text-lg">Achievement Unlocked!</h3>
            <p className="text-primary-muted font-mono text-xs flex items-center gap-1 mt-1">
              <Code2 size={12} /> The Konami Code
            </p>
          </div>
          <button 
            onClick={() => setUnlocked(false)}
            className="ml-4 px-4 py-2 bg-primary text-background rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Awesome
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
