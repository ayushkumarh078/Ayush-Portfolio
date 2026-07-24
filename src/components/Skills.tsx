"use client";

import { motion } from "framer-motion";
import { Server, Layout, Cloud, Bot, Database, TestTube, Settings, Code2 } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "Languages", icon: <Code2 size={18} />, skills: [
    { name: "Python", hover: "🐍", color: "#3776AB" },
    { name: "Java", hover: "☕", color: "#007396" },
    { name: "Go", hover: "🐹", color: "#00ADD8" },
    { name: "TypeScript", hover: "🦕", color: "#3178C6" },
    { name: "SQL", hover: "🗃️", color: "#4479A1" }
  ]},
  { name: "Backend", icon: <Server size={18} />, skills: [
    { name: "Node.js", hover: "🟢", color: "#339933" },
    { name: "Flask", hover: "🌶️", color: "#000000" },
    { name: "gRPC", hover: "⚡", color: "#244C5A" },
    { name: "REST APIs", hover: "🔌", color: "#0096D6" }
  ]},
  { name: "Frontend", icon: <Layout size={18} />, skills: [
    { name: "React", hover: "⚛️", color: "#61DAFB" },
    { name: "Next.js", hover: "▲", color: "#000000" },
    { name: "Tailwind", hover: "🌊", color: "#06B6D4" },
    { name: "Framer Motion", hover: "✨", color: "#0055FF" }
  ]},
  { name: "Cloud", icon: <Cloud size={18} />, skills: [
    { name: "AWS", hover: "☁️", color: "#232F3E" },
    { name: "Azure", hover: "⛅", color: "#0089D6" },
    { name: "GCP", hover: "🌥️", color: "#4285F4" },
    { name: "Lambda", hover: "λ", color: "#FF9900" }
  ]},
  { name: "Databases", icon: <Database size={18} />, skills: [
    { name: "PostgreSQL", hover: "🐘", color: "#4169E1" },
    { name: "Redis", hover: "⚡", color: "#DC382D" },
    { name: "MongoDB", hover: "🍃", color: "#47A248" }
  ]},
  { name: "AI / ML", icon: <Bot size={18} />, skills: [
    { name: "OpenAI API", hover: "🤖", color: "#412991" },
    { name: "OpenCV", hover: "👁️", color: "#5C3EE8" },
    { name: "NLP", hover: "🧠", color: "#FF5A5F" }
  ]},
  { name: "DevOps", icon: <Settings size={18} />, skills: [
    { name: "Docker", hover: "🐳", color: "#2496ED" },
    { name: "GitHub Actions", hover: "▶️", color: "#2088FF" },
    { name: "CI/CD", hover: "🔄", color: "#FF4081" }
  ]},
  { name: "Testing", icon: <TestTube size={18} />, skills: [
    { name: "Jest", hover: "🃏", color: "#C21325" },
    { name: "Playwright", hover: "🎭", color: "#2EAD33" },
    { name: "QA Engineering", hover: "🛡️", color: "#FFB300" }
  ]},
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-32 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-primary tracking-widest text-sm uppercase block mb-3">
            03 — Core Competencies
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight">Technical Arsenal</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.05 }}
              className="bg-background/50 backdrop-blur-sm border border-border rounded-2xl p-6 hover:bg-border/30 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-border/50 flex items-center justify-center text-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all border border-border shadow-sm">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-foreground tracking-tight">{cat.name}</h3>
              </div>
              <ul className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <li 
                    key={si} 
                    className="text-sm font-mono flex items-center cursor-default relative h-6"
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border mr-3 transition-colors" />
                    <div className="relative flex-1 h-full flex items-center">
                      <motion.span 
                        animate={{ opacity: hoveredSkill === skill.name ? 0 : 1, y: hoveredSkill === skill.name ? -10 : 0 }}
                        className="absolute text-text-secondary transition-colors"
                      >
                        {skill.name}
                      </motion.span>
                      
                      <motion.span 
                        animate={{ opacity: hoveredSkill === skill.name ? 1 : 0, y: hoveredSkill === skill.name ? 0 : 10 }}
                        className="absolute font-bold text-lg"
                        style={{ color: skill.color }}
                      >
                        {skill.hover} {skill.name}
                      </motion.span>
                    </div>
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
