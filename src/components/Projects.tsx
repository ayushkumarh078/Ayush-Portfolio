"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code, ArrowRight } from "lucide-react";

const projects = [
  {
    title: "AI Quiz Generator",
    overview: "NLP-powered quiz platform backed by AWS Lambda and RDS. Parses documents automatically and generates contextual quizzes.",
    problem: "Students spend too much time creating flashcards instead of studying the actual material.",
    solution: "Automated the entire process by building an NLP pipeline that extracts key information and generates quizzes instantly.",
    impact: "Cut study prep time by 70% for active users.",
    metrics: [{ label: "Users Served", value: "500+" }, { label: "Prep Saved", value: "70%" }],
    tech: ["Python", "Flask", "AWS Lambda", "NLP", "RDS"],
    github: "https://github.com/ayushkumarh078/AI-Generated-Quiz",
    demo: "#",
    gradient: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "ATM Theft Detection",
    overview: "Real-time security monitoring using computer vision + IoT sensors to detect anomalies instantly.",
    problem: "Traditional ATMs rely on after-the-fact footage for investigations, doing nothing to stop theft in progress.",
    solution: "Built a Raspberry Pi edge system that detects forced entry, fire, and tampering with sub-1-second alert latency.",
    impact: "Significantly reduced response times for physical security breaches.",
    metrics: [{ label: "Accuracy", value: "95%" }, { label: "Latency", value: "<1s" }],
    tech: ["Python", "OpenCV", "IoT", "Raspberry Pi"],
    github: "https://github.com/ayushkumarh078",
    demo: "#",
    gradient: "from-emerald-500/20 to-teal-500/20"
  },
  {
    title: "Self-Aiming Smart Trash Can",
    overview: "Edge-computing system using MobileNet SSD for real-time object detection and motorized targeting.",
    problem: "Waste management systems are static and require manual sorting and targeting.",
    solution: "Engineered a low-power motorized targeting system running at 20 FPS on a 10-watt power budget.",
    impact: "Proved the viability of real-time edge AI in low-power consumer robotics.",
    metrics: [{ label: "Realtime", value: "20 FPS" }, { label: "Power", value: "10W" }],
    tech: ["MobileNet SSD", "OpenCV", "Raspberry Pi"],
    github: "https://github.com/ayushkumarh078/Self-Aiming-Trash-Bin",
    demo: "#",
    gradient: "from-rose-500/20 to-orange-500/20"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-brand-500 tracking-widest text-sm uppercase mb-2 block">03. Work</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Featured Projects</h2>
        </motion.div>

        <div className="flex flex-col gap-24">
          {projects.map((proj, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="group relative"
            >
              {/* Project Card */}
              <div className="glass-panel rounded-3xl overflow-hidden flex flex-col lg:flex-row border border-white/5 hover:border-brand-500/30 transition-colors duration-500">
                
                {/* Left side: Image/Abstract representation */}
                <div className={`lg:w-5/12 relative overflow-hidden bg-gradient-to-br ${proj.gradient} p-8 flex flex-col justify-between`}>
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:24px_24px]" />
                  
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <h3 className="text-3xl font-bold text-white leading-tight mb-6">{proj.title}</h3>
                    
                    <div className="flex gap-4">
                      {proj.metrics.map((m, j) => (
                        <div key={j} className="bg-black/50 backdrop-blur-md rounded-xl p-4 border border-white/10 w-1/2">
                          <div className="text-2xl font-black text-brand-100">{m.value}</div>
                          <div className="text-xs text-white/50 uppercase tracking-widest font-mono mt-1">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Content */}
                <div className="lg:w-7/12 p-8 md:p-12 flex flex-col">
                  
                  <div className="flex gap-4 justify-end mb-6">
                    <a href={proj.github} target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-colors">
                      <Code size={20} />
                    </a>
                    {proj.demo !== "#" && (
                      <a href={proj.demo} target="_blank" rel="noopener noreferrer" className="p-2 bg-brand-500/20 hover:bg-brand-500/40 border border-brand-500/30 rounded-full text-brand-100 transition-colors">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>

                  <p className="text-lg text-white/80 leading-relaxed mb-8">
                    {proj.overview}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-brand-500 font-mono text-sm uppercase mb-2">The Problem</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{proj.problem}</p>
                    </div>
                    <div>
                      <h4 className="text-brand-500 font-mono text-sm uppercase mb-2">The Solution</h4>
                      <p className="text-sm text-white/60 leading-relaxed">{proj.solution}</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2">
                      {proj.tech.map((t, j) => (
                        <span key={j} className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded-md text-white/60">
                          {t}
                        </span>
                      ))}
                    </div>
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
