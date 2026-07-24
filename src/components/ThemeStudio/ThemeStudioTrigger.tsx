"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush } from "lucide-react";
import { useState } from "react";
import { ThemeStudioModal } from "./ThemeStudioModal";

export function ThemeStudioTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-[60] w-12 h-12 rounded-full bg-background/60 backdrop-blur-md border border-white/10 shadow-lg flex items-center justify-center text-primary transition-all hover:border-primary/40 hover:shadow-[0_0_25px_rgba(var(--primary-rgb),0.25)] group"
        title="Open Theme Studio"
      >
        <Paintbrush size={20} className="group-hover:rotate-12 transition-transform duration-300" />
      </motion.button>

      <AnimatePresence>
        {isOpen && <ThemeStudioModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
