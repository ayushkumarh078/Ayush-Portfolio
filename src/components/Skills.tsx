"use client";

import { motion } from "framer-motion";
import { Server, Layout, Cloud, Bot, Database, TestTube, Settings, Code2 } from "lucide-react";

const categories = [
  { name: "Languages", icon: <Code2 size={18} />, skills: ["Go", "Python", "Java", "TypeScript", "SQL"] },
  { name: "Backend", icon: <Server size={18} />, skills: ["Node.js", "Flask", "gRPC", "REST APIs", "Microservices"] },
  { name: "Frontend", icon: <Layout size={18} />, skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { name: "Cloud", icon: <Cloud size={18} />, skills: ["AWS", "Azure", "GCP", "Lambda"] },
  { name: "Databases", icon: <Database size={18} />, skills: ["PostgreSQL", "Redis", "MongoDB", "DynamoDB"] },
  { name: "AI / ML", icon: <Bot size={18} />, skills: ["OpenAI API", "OpenCV", "NLP", "LLM Integration"] },
  { name: "DevOps", icon: <Settings size={18} />, skills: ["Docker", "GitHub Actions", "CI/CD", "Linux"] },
  { name: "Testing", icon: <TestTube size={18} />, skills: ["Jest", "Playwright", "QA Engineering"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
            03 — Core Competencies
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Technical Arsenal</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05 }}
              className="bg-black/30 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500/10 group-hover:scale-110 transition-all border border-white/5">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-white tracking-tight">{cat.name}</h3>
              </div>
              <ul className="space-y-3">
                {cat.skills.map((skill, si) => (
                  <li key={si} className="text-sm text-white/60 font-mono flex items-center gap-2 group-hover:text-white/80 transition-colors">
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-indigo-500 transition-colors" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
