"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "AI Quiz Generator",
    overview: "NLP-powered quiz platform backed by AWS Lambda and RDS. Automatically parses documents and generates contextual quizzes.",
    problem: "Students waste hours creating flashcards instead of studying the actual material.",
    solution: "Automated the entire process with an NLP pipeline that extracts key content and generates quizzes instantly.",
    metrics: [{ label: "Users Served", value: "500+" }, { label: "Prep Time Saved", value: "70%" }],
    tech: ["Python", "Flask", "AWS Lambda", "NLP", "RDS"],
    github: "https://github.com/ayushkumarh078/AI-Generated-Quiz",
    gradient: "from-violet-900/30 to-blue-900/20",
    accent: "#7c5cff",
  },
  {
    num: "02",
    title: "ATM Theft Detection",
    overview: "Real-time security monitoring using computer vision + IoT sensors to detect anomalies and alert instantly.",
    problem: "Traditional ATM security relies on post-incident footage — doing nothing to prevent theft in progress.",
    solution: "Built a Raspberry Pi edge system detecting forced entry, fire, and tampering with sub-1-second alert latency.",
    metrics: [{ label: "Accuracy", value: "95%" }, { label: "Alert Latency", value: "<1s" }],
    tech: ["Python", "OpenCV", "IoT", "Raspberry Pi"],
    github: "https://github.com/ayushkumarh078",
    gradient: "from-emerald-900/30 to-teal-900/20",
    accent: "#10b981",
  },
  {
    num: "03",
    title: "Self-Aiming Smart Trash Can",
    overview: "Edge AI system using MobileNet SSD for real-time object detection and motorized targeting.",
    problem: "Waste management systems are static and require manual sorting.",
    solution: "Engineered a motorized targeting system running MobileNet SSD at 20 FPS on a 10W power budget.",
    metrics: [{ label: "Realtime", value: "20 FPS" }, { label: "Power Budget", value: "10W" }],
    tech: ["MobileNet SSD", "OpenCV", "Raspberry Pi", "Python"],
    github: "https://github.com/ayushkumarh078/Self-Aiming-Trash-Bin",
    gradient: "from-rose-900/30 to-orange-900/20",
    accent: "#f43f5e",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
            03 — Work
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Featured Projects</h2>
        </motion.div>

        <div className="space-y-20">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
              className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${proj.gradient} border border-white/8`}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${proj.accent}80, transparent)` }} />

              <div className="p-8 md:p-12">
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-7xl font-black text-white/5 leading-none select-none">{proj.num}</span>
                  <div className="flex gap-3">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm font-mono transition-all"
                    >
                      <Code size={14} /> GitHub
                    </a>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 -mt-8 relative z-10">{proj.title}</h3>
                <p className="text-lg text-white/65 leading-relaxed mb-8 max-w-2xl">{proj.overview}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: proj.accent }}>Problem</h4>
                    <p className="text-white/55 text-sm leading-relaxed">{proj.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: proj.accent }}>Solution</h4>
                    <p className="text-white/55 text-sm leading-relaxed">{proj.solution}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  {/* Metrics */}
                  <div className="flex gap-8">
                    {proj.metrics.map((m, j) => (
                      <div key={j}>
                        <div className="text-2xl font-black text-white">{m.value}</div>
                        <div className="text-xs font-mono text-white/40 uppercase tracking-widest">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {proj.tech.map((t, j) => (
                      <span key={j} className="text-xs font-mono px-3 py-1.5 rounded-md bg-black/30 border border-white/10 text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
