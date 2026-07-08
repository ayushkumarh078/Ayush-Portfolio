"use client";

import { motion, Variants } from "framer-motion";

const categories = [
  {
    name: "Programming",
    skills: ["Java", "Python", "SQL", "Redis", "NoSQL"],
  },
  {
    name: "Backend & Architecture",
    skills: ["REST APIs", "System Design", "Microservices"],
  },
  {
    name: "Cloud Computing",
    skills: ["AWS", "Azure", "Lambda", "RDS", "S3"],
  },
  {
    name: "Testing & QA",
    skills: ["Manual Testing", "Quality Assurance", "Test Cases", "Bug Tracking"],
  },
  {
    name: "Developer Tools",
    skills: ["Git", "GitHub", "LLMs", "Figma", "Excel", "PowerPoint"],
  }
];

export default function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="skills" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-brand-500 tracking-widest text-sm uppercase mb-2 block">04. Capabilities</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Technical Arsenal</h2>
        </motion.div>

        <div className="flex flex-col gap-12">
          {categories.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-6 border-b border-white/5 pb-2">
                {cat.name}
              </h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3"
              >
                {cat.skills.map((skill, j) => (
                  <motion.div
                    key={j}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="glass-panel px-5 py-3 rounded-xl border border-white/10 hover:border-brand-500/50 hover:shadow-[0_0_20px_rgba(124,92,255,0.2)] transition-all cursor-default flex items-center justify-center bg-white/5"
                  >
                    <span className="text-white/90 font-medium text-sm md:text-base">{skill}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
