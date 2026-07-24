"use client";

import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";

const BASE_VIEWS = 12_492;

export function LiveVisitorPanel() {
  const [views, setViews] = useState(BASE_VIEWS);

  useEffect(() => {
    // Increment views each session visit (stored in sessionStorage so it doesn't double-count refreshes)
    const seen = sessionStorage.getItem("pv_counted");
    if (!seen) {
      sessionStorage.setItem("pv_counted", "1");
      setViews(BASE_VIEWS + 1);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 right-6 z-50 pointer-events-none"
    >
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-background/60 backdrop-blur-md border border-border shadow-lg">
        <Eye size={14} className="text-primary" />
        <span className="text-xs font-mono font-semibold text-foreground tabular-nums">
          {views.toLocaleString()}
        </span>
        <span className="text-xs font-mono text-text-secondary">views</span>
      </div>
    </motion.div>
  );
}
