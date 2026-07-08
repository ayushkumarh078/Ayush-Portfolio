"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "B.Tech — Computer Science",
    school: "VIT-AP University",
    date: "Expected 2026",
    score: null,
    current: true,
  },
  {
    degree: "12th Grade — Senior Secondary",
    school: "City Montessori School",
    date: "Graduated",
    score: "87.2%",
    current: false,
  },
  {
    degree: "10th Grade — Secondary",
    school: "City Montessori School",
    date: "Graduated",
    score: "89.6%",
    current: false,
  },
];

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
            05 — Academics
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Education</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-8 group hover:border-indigo-500/40 transition-colors overflow-hidden"
            >
              {edu.current && (
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
              )}
              <div className="font-mono text-xs text-white/30 mb-4 uppercase tracking-widest">{edu.date}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-200 transition-colors leading-snug">
                {edu.school}
              </h3>
              <p className="text-sm text-white/50">{edu.degree}</p>
              {edu.score && (
                <div className="mt-6 pt-4 border-t border-white/8 flex justify-between items-center">
                  <span className="font-mono text-xs text-white/30 uppercase tracking-widest">Score</span>
                  <span className="font-bold text-indigo-400">{edu.score}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
