"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Code, ExternalLink, Terminal, Cpu, Database, FolderGit2, BookOpen } from "lucide-react";
import React, { useState } from "react";
import { ReadmeModal } from "./ReadmeModal";

const filters = ["All", "AI Quiz Generator", "ATM Edge Security", "Smart Bin Robotics"];

export default function TechnicalDeepDives() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [readmeOpen, setReadmeOpen] = useState(false);
  const [activeReadme, setActiveReadme] = useState({ title: "", content: "", github: "" });

  const openReadme = (title: string, content: string, github: string) => {
    setActiveReadme({ title, content, github });
    setReadmeOpen(true);
  };

  const project1Content = `
    <h1>AI Quiz Generator</h1>
    <p>NLP-powered microservice architecture that parses unstructured documents and generates contextual quizzes using LLMs.</p>
    <h2>Architecture</h2>
    <p>Event-driven serverless architecture. API Gateway routes requests to Lambda functions. Text extraction is handled by Python NLP workers, which then query OpenAI APIs. State is managed via Amazon RDS.</p>
    <h2>Challenges</h2>
    <p>Handling rate limits from OpenAI and managing long-running extraction tasks. Solved by implementing an asynchronous job queue using SQS.</p>
  `;

  const project2Content = `
    <h1>ATM Edge Security</h1>
    <p>Real-time edge computing security system using computer vision and IoT sensors to detect physical ATM anomalies.</p>
    <h2>Architecture</h2>
    <p>Edge device captures camera feed and sensor data. Frame differencing and Haar cascades run locally. Alerts are pushed via MQTT to a central monitoring dashboard.</p>
  `;

  const project3Content = `
    <h1>Self-Aiming Smart Trash Can</h1>
    <p>Hardware and edge computing project combining computer vision with robotics to automatically center and catch thrown objects.</p>
    <h2>Architecture</h2>
    <p>The camera feed is processed frame-by-frame on the Pi. Detection bounding boxes calculate the offset from the center, sending PWM signals to X/Y axis servo motors for instant correction.</p>
  `;

  return (
    <section id="projects" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <span className="font-mono text-primary tracking-widest text-sm uppercase block mb-3">
              02 — Engineering Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight">Featured Projects</h2>
          </div>

          {/* Animated Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeFilter === filter ? "text-background" : "text-primary-muted hover:text-foreground"
                }`}
              >
                {activeFilter === filter && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 bg-primary rounded-full z-0"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="space-y-24">
          
          {/* PROJECT 1: Floating 3D Card Style (AI Quiz Generator) */}
          <AnimatePresence mode="popLayout">
            {(activeFilter === "All" || activeFilter === "AI Quiz Generator") && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-primary-muted font-mono text-sm">
                    <Database size={16} /> Backend Microservices
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">AI Quiz Generator</h3>
                  <p className="text-text-secondary leading-relaxed">
                    An NLP pipeline running on AWS Lambda that extracts key concepts from unstructured documents and generates varied quiz formats instantly using LLMs.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "AWS Lambda", "SQS", "RDS", "OpenAI"].map(t => (
                      <span key={t} className="px-3 py-1 rounded-md bg-border/50 text-xs font-mono text-foreground border border-border">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <button 
                      onClick={() => openReadme("AI Quiz Generator", project1Content, "https://github.com/ayushkumarh078/AI-Generated-Quiz")}
                      className="px-5 py-2.5 rounded-lg bg-primary text-background font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                      <BookOpen size={16} /> README.md
                    </button>
                    <a href="https://github.com/ayushkumarh078/AI-Generated-Quiz" className="p-2.5 rounded-lg border border-border text-foreground hover:bg-border/50 transition-colors">
                      <Code size={18} />
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2 perspective-1000">
                  <motion.div 
                    whileHover={{ rotateY: -5, rotateX: 5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-border shadow-2xl overflow-hidden flex items-center justify-center transform-gpu"
                  >
                    {/* Abstract Floating 3D Elements */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="w-32 h-32 rounded-xl bg-indigo-500/30 backdrop-blur-md border border-border shadow-xl absolute top-10 left-10" />
                    <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="w-40 h-24 rounded-full bg-purple-500/20 backdrop-blur-md border border-border shadow-xl absolute bottom-10 right-10" />
                    <div className="z-10 text-center font-mono text-primary text-sm bg-background/80 p-4 rounded-lg backdrop-blur-md border border-border">
                      AWS_LAMBDA_INVOKE: SUCCESS<br/>
                      TOKENS_GENERATED: 4,092
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* PROJECT 2: Code Editor Preview Style (ATM Edge Security) */}
            {(activeFilter === "All" || activeFilter === "ATM Edge Security") && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7 perspective-1000">
                  <div className="relative w-full aspect-video rounded-xl bg-[#0d1117] border border-border shadow-2xl overflow-hidden flex flex-col font-mono text-xs">
                    {/* Fake Window Header */}
                    <div className="h-8 bg-[#161b22] border-b border-border flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                      </div>
                      <span className="ml-4 text-[#8b949e]">detector.py — ATM_Edge</span>
                    </div>
                    {/* Fake Code Area */}
                    <div className="p-4 text-[#e6edf3] flex-1 overflow-hidden relative">
                      <div className="text-[#8b949e] absolute left-4 select-none text-right w-4">
                        1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7
                      </div>
                      <div className="ml-8">
                        <span className="text-[#ff7b72]">import</span> cv2<br/>
                        <span className="text-[#ff7b72]">import</span> paho.mqtt.client <span className="text-[#ff7b72]">as</span> mqtt<br/>
                        <br/>
                        <span className="text-[#ff7b72]">def</span> <span className="text-[#d2a8ff]">detect_anomaly</span>(frame):<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;motion = cascade.detectMultiScale(gray, <span className="text-[#79c0ff]">1.1</span>, <span className="text-[#79c0ff]">4</span>)<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-[#ff7b72]">return</span> <span className="text-[#79c0ff]">len</span>(motion) &gt; <span className="text-[#79c0ff]">0</span>
                      </div>
                      {/* Blinking cursor */}
                      <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-primary absolute top-20 left-[210px]" />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-primary-muted font-mono text-sm">
                    <Cpu size={16} /> Edge IoT System
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">ATM Edge Security</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Real-time edge computing security system using computer vision and IoT sensors to detect physical ATM anomalies with sub-second latency on Raspberry Pi.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Python", "OpenCV", "Raspberry Pi", "MQTT"].map(t => (
                      <span key={t} className="px-3 py-1 rounded-md bg-border/50 text-xs font-mono text-foreground border border-border">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <button 
                      onClick={() => openReadme("ATM Edge Security", project2Content, "https://github.com/ayushkumarh078")}
                      className="px-5 py-2.5 rounded-lg bg-primary text-background font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                      <BookOpen size={16} /> README.md
                    </button>
                    <a href="https://github.com/ayushkumarh078" className="p-2.5 rounded-lg border border-border text-foreground hover:bg-border/50 transition-colors">
                      <Code size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PROJECT 3: Dashboard/Terminal Style (Smart Trash Can) */}
            {(activeFilter === "All" || activeFilter === "Smart Bin Robotics") && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-6">
                  <div className="flex items-center gap-3 text-primary-muted font-mono text-sm">
                    <Terminal size={16} /> Robotics & Vision
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Self-Aiming Smart Bin</h3>
                  <p className="text-text-secondary leading-relaxed">
                    Hardware and edge computing project combining computer vision with robotics to automatically center and catch thrown objects in real-time.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Raspberry Pi", "MobileNet SSD", "Robotics", "PID Controller"].map(t => (
                      <span key={t} className="px-3 py-1 rounded-md bg-border/50 text-xs font-mono text-foreground border border-border">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <button 
                      onClick={() => openReadme("Smart Trash Can", project3Content, "https://github.com/ayushkumarh078")}
                      className="px-5 py-2.5 rounded-lg bg-primary text-background font-medium text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors"
                    >
                      <BookOpen size={16} /> README.md
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 order-1 lg:order-2">
                  <div className="relative w-full aspect-video rounded-2xl bg-gradient-to-tr from-amber-500/10 to-orange-500/10 border border-border shadow-2xl p-6 flex items-center justify-center">
                    <div className="grid grid-cols-2 gap-4 w-full h-full">
                      {/* Fake Telemetry Dashboard */}
                      <div className="bg-background/80 backdrop-blur-md rounded-xl border border-border p-4 flex flex-col justify-between">
                        <span className="text-xs text-primary-muted font-mono">SERVO_X_POS</span>
                        <div className="text-4xl font-sans font-bold text-foreground">124°</div>
                        <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                          <motion.div animate={{ width: ["40%", "70%", "30%", "60%"] }} transition={{ duration: 2, repeat: Infinity }} className="h-full bg-amber-500" />
                        </div>
                      </div>
                      <div className="bg-background/80 backdrop-blur-md rounded-xl border border-border p-4 flex flex-col justify-between">
                        <span className="text-xs text-primary-muted font-mono">TARGET_LOCK</span>
                        <div className="text-4xl font-sans font-bold text-foreground">98%</div>
                        <div className="w-full flex items-center justify-center p-2 border border-green-500/30 rounded-lg text-green-500 text-xs font-mono bg-green-500/10">
                          TRACKING ACTIVE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      <ReadmeModal 
        isOpen={readmeOpen} 
        onClose={() => setReadmeOpen(false)} 
        title={activeReadme.title} 
        content={activeReadme.content}
        github={activeReadme.github}
      />
    </section>
  );
}
