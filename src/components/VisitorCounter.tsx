"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useEffect, useState, useRef } from "react";

export function VisitorCounter() {
  const [visitors, setVisitors] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    // Prevent double-fetching in React Strict Mode
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    // Fetch fresh global hit counter on every page load
    fetch('https://abacus.jasoncameron.dev/hit/ayushkumarh078/portfolio', {
      cache: "no-store", // Ensure we bypass all browser/fetch caching
      headers: {
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && typeof data.value === 'number') {
          // Adjust by +234 baseline as requested
          // This adds 234 to the ACTUAL backend count precisely once per display
          setVisitors(data.value + 234);
        } else {
          setFailed(true);
        }
      })
      .catch(err => {
        console.error("Counter API failed", err);
        setFailed(true);
      });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5, ease: "easeOut" }}
      id="tour-visitor-counter"
      className="fixed top-24 right-0 z-50 pointer-events-none"
    >
      <div className="flex items-center gap-2 px-4 py-3 rounded-l-xl bg-background/50 backdrop-blur-lg border border-r-0 border-border shadow-2xl">
        <UserPlus size={16} className="text-primary" />
        <div className="flex flex-col">
          <span className="text-xs font-mono font-semibold text-foreground leading-none min-w-[30px]">
            {visitors !== null ? visitors.toLocaleString() : (failed ? "---" : "...")}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-text-secondary leading-none mt-1">
            Total Visits
          </span>
        </div>
      </div>
    </motion.div>
  );
}
