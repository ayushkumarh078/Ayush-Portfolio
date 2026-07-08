"use client";

import { motion, Variants } from "framer-motion";

const categories = [
  { name: "Programming", skills: ["Java", "Python", "SQL", "Redis", "NoSQL"] },
  { name: "Backend & APIs", skills: ["REST APIs", "System Design", "Microservices"] },
  { name: "Cloud", skills: ["AWS", "Azure", "Lambda", "RDS", "S3"] },
  { name: "Testing & QA", skills: ["Manual Testing", "Quality Assurance", "Test Cases", "Bug Tracking"] },
  { name: "Tools", skills: ["Git", "GitHub", "Figma", "LLMs", "Excel", "PowerPoint"] },
];

const chipVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

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
            04 — Capabilities
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Technical Arsenal</h2>
        </motion.div>

        <div className="space-y-14">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.08 }}
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-xs uppercase tracking-widest text-indigo-400/80">
                  {cat.name}
                </span>
                <div className="flex-1 h-px bg-white/8" />
              </div>

              <motion.div
                className="flex flex-wrap gap-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.06, delayChildren: ci * 0.05 }}
              >
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={si}
                    variants={chipVariants}
                    whileHover={{ scale: 1.08, borderColor: "rgba(124,92,255,0.8)" }}
                    className="px-5 py-2.5 rounded-full text-sm font-medium text-white/80 border border-white/10 bg-white/[0.04] backdrop-blur-sm cursor-default select-none transition-colors hover:text-white"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
