"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Palette, Mail, ExternalLink } from "lucide-react";
import { useState } from "react";

export function ResumeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-full bg-background border border-border shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header / Onboarding Message */}
            <div className="bg-primary/10 border-b border-primary/20 p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
                  👋 Welcome to my Portfolio!
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Treat this like your own new account—feel free to customize it! Click the 
                  <strong className="text-primary mx-1">Theme Studio (🖌️)</strong> 
                  button in the bottom left to change colors, matrix effects, and backgrounds. 
                  Want to get in touch? Connect with me via the links below!
                </p>
                <div className="flex gap-3 mt-4">
                  <a href="https://www.linkedin.com/in/ayushkumarh0078/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> LinkedIn
                  </a>
                  <a href="https://github.com/ayushkumarh078" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold bg-foreground/10 text-foreground px-3 py-1.5 rounded-full hover:bg-foreground/20 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg> GitHub
                  </a>
                  <a href="mailto:ayushkumar.h078@gmail.com" className="flex items-center gap-1.5 text-xs font-semibold bg-red-500/10 text-red-500 px-3 py-1.5 rounded-full hover:bg-red-500/20 transition-colors">
                    <Mail size={14} /> Email
                  </a>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-border/50 text-foreground hover:bg-primary hover:text-background transition-colors shrink-0"
              >
                <X size={20} />
              </button>
            </div>

            {/* Resume Document */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 hide-scrollbar bg-background">
              <div className="max-w-3xl mx-auto space-y-10 font-sans">
                
                {/* Resume Header */}
                <header className="border-b border-border pb-6">
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-2">Ayush Kumar</h1>
                  <h2 className="text-xl text-primary font-medium mb-4">Software Engineer & AI Developer</h2>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-2xl">
                    Passionate software engineer building production-quality systems, optimizing cloud infrastructure, and writing scalable code. Experienced in full-stack development, AI integrations, and high-performance web applications.
                  </p>
                </header>

                {/* Experience */}
                <section>
                  <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-widest text-primary-muted flex items-center gap-2">
                    <span className="w-4 h-px bg-primary"></span> Experience
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <h4 className="font-bold text-foreground text-lg">Full Stack Developer Intern</h4>
                        <span className="text-xs font-mono text-text-secondary opacity-70">2023 - Present</span>
                      </div>
                      <p className="text-sm text-primary mb-3">Tech Innovators Inc.</p>
                      <ul className="list-disc list-inside text-sm text-text-secondary space-y-1.5 opacity-90 leading-relaxed marker:text-primary/50">
                        <li>Developed and maintained scalable web applications using Next.js and TypeScript.</li>
                        <li>Implemented complex AI-driven features leveraging OpenAI APIs and Edge computing.</li>
                        <li>Optimized database queries, reducing load times by 40%.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-widest text-primary-muted flex items-center gap-2">
                    <span className="w-4 h-px bg-primary"></span> Education
                  </h3>
                  <div>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold text-foreground text-lg">B.Tech — Computer Science & Engineering</h4>
                      <span className="text-xs font-mono text-text-secondary opacity-70">2022 - 2026</span>
                    </div>
                    <p className="text-sm text-primary mb-1">VIT-AP University</p>
                    <p className="text-sm text-text-secondary opacity-90">CGPA: <strong className="text-foreground">7.8</strong></p>
                  </div>
                </section>

                {/* Projects */}
                <section>
                  <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-widest text-primary-muted flex items-center gap-2">
                    <span className="w-4 h-px bg-primary"></span> Key Projects
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-foreground text-base mb-1">Nexus AI Platform</h4>
                      <p className="text-sm text-text-secondary opacity-90 leading-relaxed">
                        A full-stack AI platform built with Next.js and Tailwind, integrating multiple LLM APIs to provide seamless conversational interfaces and data analysis tools. Deployed on Vercel with Redis caching.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-base mb-1">Distributed Edge Network Node</h4>
                      <p className="text-sm text-text-secondary opacity-90 leading-relaxed">
                        A Rust-based background service for distributing computation loads across IoT devices, reducing central server costs by 35%.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h3 className="text-lg font-bold text-foreground mb-4 uppercase tracking-widest text-primary-muted flex items-center gap-2">
                    <span className="w-4 h-px bg-primary"></span> Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {["TypeScript", "React", "Next.js", "Node.js", "Python", "Go", "Rust", "AWS", "Docker", "PostgreSQL", "MongoDB", "Redis", "Tailwind CSS", "Framer Motion"].map(skill => (
                      <span key={skill} className="px-3 py-1 bg-border/30 border border-border rounded-md text-xs font-medium text-text-secondary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>
                
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-border/30 border-t border-border p-4 flex justify-center">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 bg-primary text-background px-6 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
              >
                <Download size={16} /> Print / Save as PDF
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
