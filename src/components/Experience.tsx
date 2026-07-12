"use client";

import { motion } from "framer-motion";
import { Briefcase, Building } from "lucide-react";

const experiences = [
  {
    role: "Software Testing Intern",
    company: "FSSAI IT Division",
    date: "2025 - 2026",
    metrics: "Reduced bug leak to prod by 40%",
    highlights: [
      "Engineered automated regression test suites for FoSCoS and national-scale government platforms.",
      "Identified and patched 30+ critical vulnerabilities before production deployment.",
      "Designed comprehensive workflow diagrams mapping the microservices data flow."
    ],
    tags: ["Jest", "Playwright", "System Architecture", "Security Testing"],
  },
  {
    role: "Technical Lead",
    company: "Innovators Quest Club, VIT-AP",
    date: "2024 - 2025",
    metrics: "35% increase in engagement",
    highlights: [
      "Led a 10-member technical team to architect and deploy club infrastructure and internal tools.",
      "Orchestrated 5+ high-value technical workshops, growing membership by 25%.",
      "Mentored junior developers in modern React and backend engineering practices."
    ],
    tags: ["Leadership", "Next.js", "Node.js", "Agile"],
  },
  {
    role: "Core Member",
    company: "English Literacy Club, VIT-AP",
    date: "2023 - 2024",
    metrics: "10+ events managed",
    highlights: [
      "Successfully managed and executed large-scale campus events with 500+ attendees.",
      "Streamlined communication channels between 5 different university departments."
    ],
    tags: ["Event Management", "Communication"],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
            04 — Career History
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Experience</h2>
        </motion.div>

        <div className="relative pl-8 md:pl-0">
          {/* Timeline Line */}
          <div className="absolute left-[39px] md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-white/10 to-transparent -translate-x-1/2" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative mb-16 last:mb-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? "md:ml-auto md:pl-10" : "md:mr-auto md:pr-10 md:text-right"}`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-6 w-5 h-5 rounded-full bg-black border-4 border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 ${i % 2 === 0 ? "-left-[40px] md:-left-[60px]" : "-left-[40px] md:left-auto md:-right-[60px]"}`} />

              {/* Liquid Glass Card */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.05] to-white/[0.01] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-8 transition-all hover:bg-white/[0.08] hover:border-indigo-500/30 group">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
                
                <div className="relative z-10">
                  <div className={`flex flex-col gap-4 mb-6 ${i % 2 !== 0 ? "md:items-end" : ""}`}>
                    <div className={`flex items-center gap-3 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                      <span className="font-mono text-xs text-indigo-200 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30 shadow-inner">
                        {exp.date}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight mb-2">{exp.role}</h3>
                      <div className={`flex items-center gap-2 text-indigo-400 font-mono text-sm ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                        <Building size={14} /> {exp.company}
                      </div>
                      {exp.metrics && (
                        <p className={`text-emerald-400 font-mono text-xs mt-3 bg-emerald-400/10 inline-block px-2 py-1 rounded border border-emerald-400/20 ${i % 2 !== 0 ? "md:float-right" : ""}`}>
                          {exp.metrics}
                        </p>
                      )}
                    </div>
                  </div>

                  <ul className={`space-y-3 mb-8 text-left ${i % 2 !== 0 ? "md:text-right" : ""}`}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} className={`flex items-start gap-3 text-white/70 text-sm leading-relaxed ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                        <span className="text-indigo-500 mt-1 shrink-0">▹</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 pt-6 border-t border-white/10 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                    {exp.tags.map((tag, j) => (
                      <span key={j} className="text-[11px] font-mono px-2.5 py-1 rounded bg-black/40 border border-white/5 text-white/50">
                        {tag}
                      </span>
                    ))}
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
