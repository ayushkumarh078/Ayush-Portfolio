"use client";

import { motion } from "framer-motion";
import { Code, ExternalLink, ArrowRight, LayoutTemplate, Activity, Target, Cpu } from "lucide-react";
import React, { useRef, useState } from "react";

const projects = [
  {
    num: "01",
    title: "AI Quiz Generator",
    overview: "NLP-powered microservice architecture that parses unstructured documents and generates contextual quizzes using LLMs.",
    problem: "Students and educators waste hours manually extracting key concepts from large textbooks to create flashcards.",
    solution: "An automated NLP pipeline running on AWS Lambda that extracts key concepts and generates varied quiz formats instantly.",
    architecture: "Event-driven serverless architecture. API Gateway routes requests to Lambda functions. Text extraction is handled by Python NLP workers, which then query OpenAI APIs. State is managed via Amazon RDS.",
    challenges: "Handling rate limits from OpenAI and managing long-running extraction tasks. Solved by implementing an asynchronous job queue using SQS.",
    metrics: [
      { label: "Quizzes Generated", value: "500+" },
      { label: "Prep Time Saved", value: "70%" },
      { label: "Accuracy", value: "92%" }
    ],
    tech: ["Python", "Flask", "AWS Lambda", "SQS", "RDS", "OpenAI API"],
    github: "https://github.com/ayushkumarh078/AI-Generated-Quiz",
    gradient: "from-violet-900/30 to-blue-900/20",
    accent: "#7c5cff",
  },
  {
    num: "02",
    title: "ATM Edge Security",
    overview: "Real-time edge computing security system using computer vision and IoT sensors to detect physical ATM anomalies.",
    problem: "Traditional ATM security relies on post-incident footage — doing nothing to prevent theft in progress.",
    solution: "A Raspberry Pi edge system running optimized OpenCV models to detect forced entry, fire, and tampering with sub-second alert latency.",
    architecture: "Edge device captures camera feed and sensor data. Frame differencing and Haar cascades run locally. Alerts are pushed via MQTT to a central monitoring dashboard.",
    challenges: "Achieving high FPS on low-power ARM hardware. Solved by down-sampling frames and using lightweight models.",
    metrics: [
      { label: "Detection Accuracy", value: "95%" },
      { label: "Alert Latency", value: "<1s" },
      { label: "Power Draw", value: "5W" }
    ],
    tech: ["Python", "OpenCV", "IoT", "Raspberry Pi", "MQTT"],
    github: "https://github.com/ayushkumarh078",
    gradient: "from-emerald-900/30 to-teal-900/20",
    accent: "#10b981",
  },
  {
    num: "03",
    title: "Self-Aiming Smart Trash Can",
    overview: "Hardware and edge computing project combining computer vision with robotics to automatically center and catch thrown objects.",
    problem: "Static waste bins require physical proximity. Integrating robotics and computer vision to track fast-moving objects on edge hardware is complex.",
    solution: "A Raspberry Pi with a Pi Camera runs real-time waste detection using OpenCV and MobileNet SSD, driving servo motors to track and align with targets.",
    architecture: "The camera feed is processed frame-by-frame on the Pi. Detection bounding boxes calculate the offset from the center, sending PWM signals to X/Y axis servo motors for instant correction.",
    challenges: "Inference latency causing the motors to lag behind the object. Solved by optimizing the MobileNet SSD inference to hit 15+ FPS and tuning the PID controller for the servos.",
    metrics: [
      { label: "Inference Speed", value: "15 FPS" },
      { label: "Power Draw", value: "<10W" },
      { label: "Accuracy", value: "Tracking" }
    ],
    tech: ["Raspberry Pi", "OpenCV", "MobileNet SSD", "Robotics", "Python"],
    github: "https://github.com/ayushkumarh078",
    gradient: "from-amber-900/30 to-orange-900/20",
    accent: "#d4af37",
  }
];

export default function TechnicalDeepDives() {
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  return (
    <section id="technical-deep-dives" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-gold tracking-widest text-sm uppercase block mb-3">
            02 — Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">Technical Deep Dives</h2>
        </motion.div>

        <div className="space-y-16">
          {projects.map((proj, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${proj.gradient} border border-white/10`}
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${proj.accent}, transparent)` }} />

              <div className="p-8 md:p-12">
                <div className="flex items-start justify-between mb-8">
                  <span className="font-mono text-6xl md:text-7xl font-serif font-bold text-white/5 leading-none select-none">{proj.num}</span>
                  <div className="flex gap-3">
                    <a
                      href={proj.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-black/40 hover:bg-white/10 text-white/70 hover:text-white text-xs font-mono transition-all"
                    >
                      <Code size={14} /> GitHub
                    </a>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 -mt-8 relative z-10">{proj.title}</h3>
                <p className="text-base md:text-lg text-white/70 leading-relaxed mb-8 max-w-3xl">{proj.overview}</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                      <Target size={16} style={{ color: proj.accent }} /> The Problem
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">{proj.problem}</p>
                  </div>
                  <div className="bg-black/30 rounded-2xl p-6 border border-white/5">
                    <h4 className="flex items-center gap-2 text-sm font-bold text-white mb-3">
                      <LayoutTemplate size={16} style={{ color: proj.accent }} /> The Solution
                    </h4>
                    <p className="text-white/60 text-sm leading-relaxed">{proj.solution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.tech.map((t, j) => (
                    <span key={j} className="text-xs font-mono px-3 py-1.5 rounded-md bg-black/50 border border-white/10 text-white/60 shadow-inner">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Expanded Deep Dive Section */}
                {expandedProject === i && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="pt-8 border-t border-white/10 mt-8 space-y-8"
                  >
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-3">
                        <Cpu size={18} style={{ color: proj.accent }} /> Technical Architecture
                      </h4>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed bg-black/20 p-5 rounded-xl border border-white/5">
                        {proj.architecture}
                      </p>
                    </div>
                    <div>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-white mb-3">
                        <Activity size={18} style={{ color: proj.accent }} /> Key Challenges & Trade-offs
                      </h4>
                      <p className="text-white/60 text-sm md:text-base leading-relaxed bg-black/20 p-5 rounded-xl border border-white/5">
                        {proj.challenges}
                      </p>
                    </div>
                  </motion.div>
                )}

                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between pt-8 border-t border-white/10">
                  {/* Metrics */}
                  <div className="flex gap-8">
                    {proj.metrics.map((m, j) => (
                      <div key={j}>
                        <div className="text-2xl md:text-3xl font-serif font-bold text-white">{m.value}</div>
                        <div className="text-[10px] md:text-xs font-mono text-white/40 uppercase tracking-widest mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors flex items-center gap-2 border border-white/10"
                  >
                    {expandedProject === i ? "Hide Details" : "Read Case Study"} 
                    <ArrowRight size={16} className={`transition-transform ${expandedProject === i ? 'rotate-90' : ''}`} />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
