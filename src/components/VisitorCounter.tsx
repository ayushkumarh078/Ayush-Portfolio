"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    const sessionCounted = sessionStorage.getItem("session_counted");
    
    if (!sessionCounted) {
      // Fetch global hit counter
      fetch('https://abacus.jasoncameron.dev/hit/ayushkumarh078/portfolio')
        .then(res => res.json())
        .then(data => {
          if (data && typeof data.value === 'number') {
            setVisitors(data.value);
            sessionStorage.setItem("session_counted", "true");
            localStorage.setItem("actual_visits", data.value.toString());
          }
        })
        .catch(err => {
          console.error("Counter API failed", err);
          // Fallback to local
          const currentVisits = parseInt(localStorage.getItem("actual_visits") || "0", 10);
          setVisitors(currentVisits + 1);
        });
    } else {
      // If already counted this session, just load from local storage
      const currentVisits = parseInt(localStorage.getItem("actual_visits") || "0", 10);
      setVisitors(currentVisits);
    }
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
          <span className="text-xs font-mono font-semibold text-foreground leading-none">
            {visitors.toLocaleString()}
          </span>
          <span className="text-[9px] uppercase tracking-wider text-text-secondary leading-none mt-1">
            Total Visits
          </span>
        </div>
      </div>
    </motion.div>
  );
}
