"use client";

import { motion } from "framer-motion";
import { Users, Activity } from "lucide-react";
import { useEffect, useState } from "react";

export function LiveVisitorPanel() {
  const [visitors, setVisitors] = useState(1);
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    setActivePath(window.location.hash || "/");
    
    const handleHashChange = () => {
      setActivePath(window.location.hash || "/");
    };
    window.addEventListener("hashchange", handleHashChange);
    
    // Simulate slight fluctuations in visitor count for the demo
    const interval = setInterval(() => {
      setVisitors(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return newCount > 0 && newCount < 15 ? newCount : prev; // Keep it realistic (1-15 visitors)
      });
    }, 8000);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearInterval(interval);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed top-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none"
    >
      {/* Visitor Count Badge */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-border shadow-lg">
        <div className="flex items-center justify-center w-2 h-2 rounded-full bg-green-500 relative">
          <span className="absolute inline-flex w-full h-full rounded-full bg-green-400 opacity-75 animate-ping" />
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-primary-muted font-medium">
          <Users size={12} className="text-primary" />
          <span>{visitors} Live Visitor{visitors !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Path Tracker Badge */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/30 backdrop-blur-md border border-border shadow-md opacity-80">
        <Activity size={10} className="text-text-secondary" />
        <span className="text-[10px] font-mono text-text-secondary truncate max-w-[150px]">
          {activePath}
        </span>
      </div>
    </motion.div>
  );
}
