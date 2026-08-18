"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-primary tracking-widest text-sm uppercase block mb-3">
            01 — Background
          </span>
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-foreground tracking-tight">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-xl text-text-secondary leading-relaxed">
              I'm a <span className="text-foreground font-semibold">Computer Science graduate from VIT-AP University</span> who enjoys building backend systems, working with AI, and figuring out how things work under the hood.
            </p>

            <div className="border-l-2 border-primary/50 pl-6">
              <h3 className="text-foreground font-bold text-lg mb-2">The QA Shift</h3>
              <p className="text-text-secondary leading-relaxed">
                During my Software Testing Internship at <span className="text-primary">FSSAI Headquarters</span>, I spent a lot of time looking for things that could go wrong. That experience changed the way I write software. I also started paying more attention to edge cases, reliability, and the small details that are easy to overlook.
              </p>
            </div>

            <div className="border-l-2 border-primary/50 pl-6">
              <h3 className="text-foreground font-bold text-lg mb-2">Currently Building</h3>
              <p className="text-text-secondary leading-relaxed">
                <span className="text-foreground font-semibold">DevLens</span> — A project I'm currently working on to understand GitHub repositories more deeply. It uses AST parsing and Python to analyze code, architecture, and dependencies without relying blindly on AI-generated answers.
              </p>
            </div>
          </motion.div>

          {/* Right: Stat grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-5"
          >
            {[
              { value: "1", label: "Internship", sub: "FSSAI HQ — QA & Testing" },
              { value: "3", label: "Certifications", sub: "AWS + Azure" },
              { value: "3", label: "Major Projects", sub: "AI / CV / IoT" },
              { value: "2026", label: "Graduation", sub: "VIT-AP University" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl p-6 border border-border bg-border/30 backdrop-blur-sm"
              >
                <div className="text-4xl font-serif font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-1 text-foreground font-semibold text-base">{stat.label}</div>
                <div className="text-xs text-text-secondary font-mono mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
