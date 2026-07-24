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
          <span className="font-mono text-primary tracking-widest text-sm uppercase block mb-3">
            01 — In Progress
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight">Currently Building</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-border bg-border/30 backdrop-blur-md overflow-hidden"
        >
          {/* Subtle gradient glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          
          <div className="p-8 md:p-12 relative z-10">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Left Column: Project Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.8)]" />
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">Active Development</span>
                </div>
                
                <h3 className="text-3xl font-bold text-foreground mb-4">DevLens (GitHub Project Analyzer)</h3>
                <p className="text-text-secondary opacity-60 leading-relaxed mb-8 text-sm md:text-base">
                  A multi-phase tool for GitHub repository intelligence. It extracts insights (languages, architecture, dependencies) without AI hallucinations, and gradually layers in LLM capabilities for code explanation and team-wide technical debt tracking.
                </p>

                <div className="space-y-6">
                  <div>
                    <h4 className="flex items-center gap-2 text-text-secondary opacity-80 font-medium mb-3 text-sm">
                      <Cpu size={16} className="text-primary" /> Tech Stack
                    </h4>
                    <ul className="space-y-2 text-sm text-text-secondary opacity-50 font-mono">
                      <li className="flex items-start gap-2"><span className="text-primary-muted">▹</span> Next.js, Tailwind, shadcn for UI</li>
                      <li className="flex items-start gap-2"><span className="text-primary-muted">▹</span> FastAPI (Python) Backend</li>
                      <li className="flex items-start gap-2"><span className="text-primary-muted">▹</span> GitPython, Tree-sitter, NetworkX for static analysis</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 text-text-secondary opacity-80 font-medium mb-3 text-sm">
                      <Terminal size={16} className="text-primary" /> Recent Milestones
                    </h4>
                    <div className="bg-background/80 rounded-xl border border-border p-4 space-y-3 font-mono text-xs">
                      <div className="flex items-start gap-3">
                        <GitCommit size={14} className="text-text-secondary opacity-30 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-text-secondary opacity-70">Implement temporary workspace cloning and AST parsing</p>
                          <span className="text-text-secondary opacity-30">Just started</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <GitCommit size={14} className="text-text-secondary opacity-30 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-text-secondary opacity-70">Design Phase 1 Repository Intelligence dashboard</p>
                          <span className="text-text-secondary opacity-30">In progress</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Roadmap & Progress */}
              <div className="flex-1 lg:max-w-sm">
                <div className="bg-border/30 rounded-2xl border border-border p-6 md:p-8 h-full">
                  <h4 className="text-lg font-bold text-foreground mb-6">Execution Roadmap</h4>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gold/50 before:to-transparent">
                    
                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-primary bg-background z-10 shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-primary/50 bg-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">
                        <h5 className="font-bold text-foreground text-sm mb-1">Phase 1 (MVP)</h5>
                        <p className="text-primary-muted/70 text-xs">Repo Intelligence (No LLMs). Detect structure, architecture, dependencies.</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-background z-10 shrink-0">
                        <Circle size={12} className="text-text-secondary opacity-50" />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-border bg-border/30">
                        <h5 className="font-bold text-foreground opacity-90 text-sm mb-1">Phase 2</h5>
                        <p className="text-text-secondary opacity-80 text-xs">AI Understanding: Ask Repo, Code Explanations, Diagram Gen.</p>
                      </div>
                    </div>

                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border bg-background z-10 shrink-0">
                        <Circle size={12} className="text-text-secondary opacity-50" />
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-4 rounded-xl border border-border bg-border/30">
                        <h5 className="font-bold text-foreground opacity-90 text-sm mb-1">Phase 3</h5>
                        <p className="text-text-secondary opacity-80 text-xs">Team Features: PR Reviews, CI/CD, Tech Debt Tracking.</p>
                      </div>
                    </div>
                  </div>

                  <a href="#" className="mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-border/30 hover:bg-border/30 transition-colors text-text-secondary opacity-80 text-sm font-medium border border-border group">
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
