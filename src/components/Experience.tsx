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
              <div className="absolute -left-[37px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 ring-4 ring-[#020814] shadow-[0_0_12px_rgba(99,102,241,0.8)]" />

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                  <p className="text-indigo-300 font-mono text-sm mt-1">{exp.company}</p>
                  {exp.metrics && (
                    <p className="text-emerald-400/80 font-mono text-xs mt-1">{exp.metrics}</p>
                  )}
                </div>
                <span className="font-mono text-xs text-white/30 bg-white/5 px-3 py-1.5 rounded-full border border-white/8 whitespace-nowrap self-start">
                  {exp.date}
                </span>
              </div>

              <ul className="space-y-2.5 mb-5">
                {exp.highlights.map((h, j) => (
                  <li key={j} className="flex items-start gap-3 text-white/65 text-sm leading-relaxed">
                    <span className="text-indigo-500 mt-0.5 shrink-0">▹</span>
                    {h}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {exp.tags.map((tag, j) => (
                  <span key={j} className="text-xs font-mono px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
