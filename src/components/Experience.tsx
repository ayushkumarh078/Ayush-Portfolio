"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "QA & Testing Intern",
    company: "FSSAI Headquarters",
    date: "2025 – 2026",
    highlights: [
      "Designed and executed comprehensive test cases for national-scale government platforms.",
      "Worked on FoSCoS, Consumer Grievance Portal, AMS, and AMC.",
      "Built workflow diagrams mapping system architecture and data flow.",
      "Discovered critical bugs, validated fixes, and collaborated directly with stakeholders.",
    ],
    tags: ["Testing", "QA", "Documentation", "Flowcharts", "Bug Tracking"],
  },
  {
    role: "Tech Lead",
    company: "Innovators Quest Club, VIT-AP",
    date: "2024 – 2025",
    metrics: "35% engagement ↑ · 10-member team · 25% membership growth",
    highlights: [
      "Led a 10-member technical team to build and deploy impactful club initiatives.",
      "Drove a 35% increase in student engagement through technical workshops.",
      "Grew membership 25% by orchestrating high-value events.",
    ],
    tags: ["Leadership", "Team Management", "Event Planning"],
  },
  {
    role: "Core Member",
    company: "English Literacy Club, VIT-AP",
    date: "2023 – 2024",
    metrics: "10+ events managed",
    highlights: [
      "Successfully managed and executed 10+ large-scale campus events.",
      "Demonstrated strong leadership and organizational skills under pressure.",
    ],
    tags: ["Event Management", "Leadership", "Communication"],
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
            02 — Career
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Experience</h2>
        </motion.div>

        <div className="relative pl-8 border-l border-white/10">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-16 last:mb-0"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[45px] top-6 w-4 h-4 rounded-full bg-indigo-500 ring-4 ring-[#020814] shadow-[0_0_15px_rgba(99,102,241,0.9)] z-10" />

              {/* Liquid Glass Card */}
              <div className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-8 md:p-10 transition-all hover:bg-white/[0.1] hover:border-indigo-500/30 group">
                {/* Glossy top edge highlight */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                
                {/* Subtle inner ambient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">{exp.role}</h3>
                      <p className="text-indigo-400 font-mono text-sm mt-2">{exp.company}</p>
                      {exp.metrics && (
                        <p className="text-emerald-400/90 font-mono text-xs mt-2 bg-emerald-400/10 inline-block px-2 py-1 rounded-md border border-emerald-400/20">{exp.metrics}</p>
                      )}
                    </div>
                    <span className="font-mono text-xs text-indigo-200 bg-indigo-500/20 px-4 py-2 rounded-full border border-indigo-500/30 whitespace-nowrap self-start shadow-[inset_0_0_8px_rgba(99,102,241,0.3)]">
                      {exp.date}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {exp.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-3 text-white/75 text-sm md:text-base leading-relaxed">
                        <span className="text-indigo-500 mt-1 shrink-0">▹</span>
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                    {exp.tags.map((tag, j) => (
                      <span key={j} className="text-xs font-mono px-3 py-1.5 rounded-md bg-black/40 border border-white/5 text-white/60 shadow-inner">
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
