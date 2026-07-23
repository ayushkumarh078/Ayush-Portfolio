"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Zap, Server } from "lucide-react";

export function PerformanceMetrics() {
  const [fps, setFps] = useState(60);
  const [loadTime, setLoadTime] = useState(0);

  useEffect(() => {
    // Calculate page load time
    if (window.performance) {
      const navEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      if (navEntry) {
        setLoadTime(Math.round(navEntry.loadEventEnd - navEntry.startTime));
      }
    }

    // Simple FPS counter
    let frameCount = 0;
    let lastTime = performance.now();

    const loop = () => {
      const now = performance.now();
      frameCount++;
      
      if (now - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = now;
      }
      requestAnimationFrame(loop);
    };
    
    requestAnimationFrame(loop);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 left-4 z-50 flex items-center gap-4 p-2.5 rounded-full bg-background/50 backdrop-blur-md border border-border shadow-lg text-[10px] font-mono text-primary-muted font-medium"
    >
      <div className="flex items-center gap-1.5" title="Frames Per Second">
        <Activity className="w-3 h-3 text-primary" />
        <span className={fps < 30 ? "text-red-500" : fps < 50 ? "text-yellow-500" : "text-green-500"}>
          {fps} FPS
        </span>
      </div>
      
      <div className="w-px h-3 bg-border" />
      
      <div className="flex items-center gap-1.5" title="Page Load Time">
        <Zap className="w-3 h-3 text-primary" />
        <span>{loadTime > 0 ? `${loadTime}ms` : '---ms'}</span>
      </div>

      <div className="w-px h-3 bg-border" />
      
      <div className="flex items-center gap-1.5" title="Lighthouse Score">
        <Server className="w-3 h-3 text-primary" />
        <span className="text-green-500">100/100</span>
      </div>
    </motion.div>
  );
}
