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
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-foreground tracking-tight">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Story */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <p className="text-xl text-text-secondary opacity-70 leading-relaxed">
              I'm a Computer Science undergraduate at{" "}
              <span className="text-foreground font-semibold">VIT-AP University</span>, graduating in 2026.
              Passionate about building scalable backend systems and reliable software.
            </p>

            <div className="border-l-2 border-primary/50 pl-6">
              <h3 className="text-foreground font-bold text-lg mb-2">The QA Shift</h3>
              <p className="text-text-secondary opacity-60 leading-relaxed">
                My Software Testing Internship at <span className="text-primary">FSSAI Headquarters</span> taught
                me how to <em>break</em> software—which fundamentally changed how I <em>build</em> it. I now write
                code that anticipates edge cases before they reach production.
              </p>
            </div>

            <div className="border-l-2 border-primary-border/50 pl-6">
              <h3 className="text-foreground font-bold text-lg mb-2">Career Goal</h3>
              <p className="text-text-secondary opacity-60 leading-relaxed">
                Becoming a <span className="text-foreground font-semibold">Software Development Engineer</span> at a
                forward-thinking company where I can solve complex problems and build systems that scale.
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
                <div className="text-4xl font-serif font-bold text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg,#c9c3ff,#7c5cff)" }}>
                  {stat.value}
                </div>
                <div className="mt-1 text-foreground font-semibold text-base">{stat.label}</div>
                <div className="text-xs text-text-secondary opacity-40 font-mono mt-1">{stat.sub}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
