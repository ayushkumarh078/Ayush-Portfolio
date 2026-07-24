"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { motion } from "framer-motion";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, themes } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme || "dark");
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onClick={cycleTheme}
      className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-background/60 backdrop-blur-md border border-border shadow-lg hover:bg-background/80 transition-all text-primary hover:text-primary-muted"
      title={`Current Theme: ${theme}`}
    >
      <Palette size={20} />
    </motion.button>
  );
}
