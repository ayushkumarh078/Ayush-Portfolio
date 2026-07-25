"use client";

import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

export function VisitorCounter() {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Try to get global hit counter
    fetch('https://api.counterapi.dev/v1/ayushkumarh078/portfolio/up')
      .then(res => res.json())
      .then(data => {
        if (data && data.count) {
          setVisitors(data.count);
        }
      })
      .catch(err => {
        console.error("Counter API failed, falling back to local storage", err);
        // Fallback
        const currentVisits = parseInt(localStorage.getItem("actual_visits") || "0", 10);
        const sessionCounted = sessionStorage.getItem("session_counted");
        let newVisits = currentVisits;
        if (!sessionCounted) {
          newVisits += 1;
          localStorage.setItem("actual_visits", newVisits.toString());
          sessionStorage.setItem("session_counted", "true");
        }
        setVisitors(newVisits);
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
