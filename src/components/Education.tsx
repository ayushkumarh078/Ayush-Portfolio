"use client";

import { motion } from "framer-motion";

export default function Education() {
  const education = [
    {
      degree: "Computer Science Undergraduate",
      school: "VIT-AP University",
      date: "Expected Graduation: 2026",
      score: null,
    },
    {
      degree: "12th Grade (Senior Secondary)",
      school: "City Montessori School",
      date: "Graduated",
      score: "87.2%",
    },
    {
      degree: "10th Grade (Secondary)",
      school: "City Montessori School",
      date: "Graduated",
      score: "89.6%",
    }
  ];

  return (
    <section id="education" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-brand-500 tracking-widest text-sm uppercase mb-2 block">05. Academics</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Education</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-panel p-8 rounded-2xl flex flex-col justify-between hover:border-brand-500/30 transition-colors group"
            >
              <div>
                <div className="text-sm font-mono text-white/40 mb-4">{edu.date}</div>
                <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-brand-100 transition-colors">{edu.school}</h3>
                <p className="text-white/60 text-sm">{edu.degree}</p>
              </div>
              
              {edu.score && (
                <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="text-xs uppercase tracking-widest text-white/40 font-mono">Score</span>
                  <span className="font-bold text-brand-500">{edu.score}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
