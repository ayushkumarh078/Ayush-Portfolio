"use client";

import { motion } from "framer-motion";
import { ChevronRight, Download } from "lucide-react";

export default function Hero() {
  const roles = ["Software Engineer", "Backend Developer", "Problem Solver", "QA Engineer", "Builder"];
  
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md w-max">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            <span className="text-sm font-mono text-white/70 tracking-wider">Available for Work</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
            Hi, I'm <br />
            <span className="text-gradient">Ayush Kumar.</span>
          </h1>
          
          <div className="text-xl md:text-2xl text-white/60 font-medium h-12">
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Building Scalable Backend Systems
            </motion.span>
          </div>
          
          <p className="text-lg text-white/50 max-w-lg leading-relaxed">
            I engineer reliable software architectures, transitioning from a robust background in QA and testing to full-time backend development.
          </p>
          
          <div className="flex flex-wrap gap-4 mt-4">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="px-6 py-3 rounded-full bg-white text-black font-semibold flex items-center gap-2 transition-colors hover:bg-gray-200"
            >
              View Projects <ChevronRight size={18} />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/resume.pdf" 
              className="px-6 py-3 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-medium flex items-center gap-2 backdrop-blur-md transition-colors"
            >
              <Download size={18} /> Resume
            </motion.a>
          </div>
        </motion.div>

        {/* Right Content - Abstract 3D Representation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[400px] hidden lg:flex items-center justify-center"
        >
          <div className="relative w-full h-full perspective-1000">
            {/* Abstract floating blocks */}
            <motion.div 
              animate={{ 
                y: [-20, 20, -20],
                rotateX: [10, -10, 10],
                rotateY: [-10, 10, -10]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-brand-900/40 to-brand-500/10 rounded-2xl border border-white/10 backdrop-blur-xl"
            />
            <motion.div 
              animate={{ 
                y: [20, -20, 20],
                rotateX: [-15, 15, -15],
                rotateY: [15, -15, 15]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gradient-to-tr from-brand-500/30 to-brand-100/10 rounded-full border border-white/10 backdrop-blur-xl"
            />
            <motion.div 
              animate={{ 
                y: [-10, 10, -10],
                x: [-10, 10, -10],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-black/40 rounded-3xl border border-brand-500/30 backdrop-blur-2xl flex items-center justify-center shadow-[0_0_50px_rgba(124,92,255,0.2)]"
            >
              <span className="font-mono text-4xl text-brand-100/80">{"</>"}</span>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
