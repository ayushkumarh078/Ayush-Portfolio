"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "QA & Testing Intern",
    company: "FSSAI Headquarters",
    date: "Jan 2026 – Jun 2026",
    highlights: [
      "Designed and executed comprehensive test cases for national-scale platforms.",
      "Worked heavily on FoSCoS, Consumer Grievance Portal, AMS, and AMC.",
      "Built workflow diagrams to map system architecture and logic.",
      "Discovered critical bugs, validated fixes, and ensured high reliability.",
      "Collaborated directly with stakeholders to improve software quality."
    ],
    tags: ["Testing", "QA", "Documentation", "Flowcharts", "Bug Tracking"],
  },
  {
    role: "Tech Lead",
    company: "Innovators Quest Club",
    date: "2024 – 2025",
    highlights: [
      "Led a 10-member technical team to build and deploy club initiatives.",
      "Drove a 35% engagement increase across technical workshops.",
      "Achieved a 25% membership growth by orchestrating high-value technical events."
    ],
    tags: ["Leadership", "Team Management", "Event Planning"],
  },
  {
    role: "Core Member",
    company: "English Literacy Club",
    date: "2023 – 2024",
    highlights: [
      "Successfully managed and executed 10+ large-scale events.",
      "Handled core event management, logistics, and inter-departmental communication.",
      "Demonstrated strong leadership and organizational skills in high-pressure situations."
    ],
    tags: ["Event Management", "Leadership", "Communication"],
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-brand-500 tracking-widest text-sm uppercase mb-2 block">02. Career</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Experience</h2>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-8 flex flex-col gap-12">
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-brand-500 shadow-[0_0_10px_#9b8cff]" />
              
              <div className="glass-panel p-8 rounded-2xl group hover:border-brand-500/40 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-brand-100 transition-colors">{exp.role}</h3>
                    <div className="text-lg text-brand-500 font-medium">{exp.company}</div>
                  </div>
                  <span className="font-mono text-sm text-white/40 bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.date}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((highlight, j) => (
                    <li key={j} className="text-white/70 text-sm md:text-base flex items-start gap-3">
                      <span className="text-brand-500 mt-1">▹</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {exp.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-mono text-brand-100 bg-brand-500/10 border border-brand-500/20 px-3 py-1.5 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
