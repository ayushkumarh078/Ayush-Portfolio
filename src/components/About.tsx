"use client";

import { motion } from "framer-motion";
import { CheckCircle, Code2, Target, Terminal } from "lucide-react";

export default function About() {
  const sections = [
    {
      id: "intro",
      icon: <Terminal className="w-5 h-5 text-brand-500" />,
      title: "Who I Am",
      content: "Computer Science undergraduate at VIT-AP University, graduating in 2026. Passionate about building scalable backend systems and reliable software.",
    },
    {
      id: "fssai",
      icon: <CheckCircle className="w-5 h-5 text-emerald-400" />,
      title: "The QA Perspective",
      content: "During my Software Testing Internship at FSSAI Headquarters, I learned how to break software. This rigorous QA experience fundamentally changed how I write code—teaching me to anticipate edge cases and build resilient architectures.",
    },
    {
      id: "focus",
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      title: "Current Focus",
      content: "With a strong foundation in quality assurance, my primary focus is now purely on Software Development. I engineer robust backend APIs, optimize databases, and build full-stack solutions that don't fail in production.",
    },
    {
      id: "goal",
      icon: <Target className="w-5 h-5 text-rose-400" />,
      title: "Career Goal",
      content: "My immediate objective is becoming a Software Development Engineer (SDE) at a forward-thinking company where I can solve complex engineering challenges at scale.",
    }
  ];

  return (
    <section id="about" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-brand-500 tracking-widest text-sm uppercase mb-2 block">01. Background</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((sec, i) => (
            <motion.div
              key={sec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-panel p-8 rounded-2xl group hover:border-brand-500/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {sec.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{sec.title}</h3>
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {sec.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
