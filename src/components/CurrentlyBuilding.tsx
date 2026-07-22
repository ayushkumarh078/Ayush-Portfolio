"use client";

import { motion } from "framer-motion";
import { GitCommit, Terminal, Cpu, CheckCircle2, Circle, ArrowRight } from "lucide-react";

export default function CurrentlyBuilding() {
  return (
    <section id="currently-building" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-gold tracking-widest text-sm uppercase block mb-3">
            01 — In Progress
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">Currently Building</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md overflow-hidden"
        >
          {/* Subtle gradient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="p-8 md:p-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Left Column: Project Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  <span className="font-mono text-xs text-gold uppercase tracking-widest">Active Development</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">Self-Aiming Smart Trash Can</h3>
                <p className="text-white/60 leading-relaxed mb-8 text-sm md:text-base">
                  A hardware and edge computing project combining computer vision with robotics. Uses a Raspberry Pi to perform real-time waste detection and motorized centering to catch thrown objects.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-white/80 font-medium mb-3 text-sm">
                      <Cpu size={16} className="text-gold" /> Architecture Highlights
                    </h4>
                    <ul className="space-y-2 text-sm text-white/50 font-mono">
                      <li className="flex items-start gap-2"><span className="text-gold-muted">▹</span> Raspberry Pi edge computing base</li>
                      <li className="flex items-start gap-2"><span className="text-gold-muted">▹</span> OpenCV & MobileNet SSD for real-time vision</li>
                      <li className="flex items-start gap-2"><span className="text-gold-muted">▹</span> Custom motor control logic for centering targets</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-white/80 font-medium mb-3 text-sm">
                      <Terminal size={16} className="text-gold" /> Recent Commits
                    </h4>
                    <div className="bg-black/40 rounded-xl border border-white/5 p-4 space-y-3 font-mono text-xs">
                      <div className="flex items-start gap-3">
                        <GitCommit size={14} className="text-white/30 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-white/70">Optimize MobileNet SSD inference for 15+ FPS</p>
                          <span className="text-white/30">2 days ago</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <GitCommit size={14} className="text-white/30 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-white/70">Integrate servo motor logic for X-axis tracking</p>
                          <span className="text-white/30">5 days ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Roadmap & Progress */}
              <div className="flex-1 lg:max-w-sm">
                <div className="bg-white/[0.03] rounded-2xl border border-white/10 p-6 md:p-8 h-full">
                  <h4 className="text-lg font-bold text-white mb-6">Roadmap</h4>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gold/50 before:to-transparent">
                    
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gold bg-black z-10 shrink-0">
                        <CheckCircle2 size={12} className="text-gold-muted" />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-white/10 bg-black/40">
                        <h5 className="font-bold text-white text-sm mb-1">Phase 1</h5>
                        <p className="text-white/50 text-xs">Object Detection Pipeline (OpenCV)</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gold bg-black z-10 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-gold/30 bg-gold/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                        <h5 className="font-bold text-white text-sm mb-1">Phase 2</h5>
                        <p className="text-indigo-200/70 text-xs">Motor Integration & Target Tracking</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-black z-10 shrink-0">
                        <Circle size={12} className="text-white/20" />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                        <h5 className="font-bold text-white/50 text-sm mb-1">Phase 3</h5>
                        <p className="text-white/30 text-xs">Edge Optimization & Power Tuning</p>
                      </div>
                    </div>

                  </div>

                  <a href="#" className="mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-white/80 text-sm font-medium border border-white/10 group">
                    View Repository <ArrowRight size={14} className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
