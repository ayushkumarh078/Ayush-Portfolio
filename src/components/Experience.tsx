"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Building } from "lucide-react";
import { useRef } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-32 px-6 relative z-10 bg-background overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <span className="font-mono text-primary tracking-widest text-sm uppercase block mb-3">
            04 — Career History
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight">Experience</h2>
        </motion.div>

        <div ref={containerRef} className="relative pl-8 md:pl-0">
          {/* Scroll-Driven Glowing Timeline */}
          <div className="absolute left-[39px] md:left-[50%] top-0 bottom-0 w-1 bg-border -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 w-full bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),1)] rounded-full"
              style={{ height: pathHeight }}
            />
          </div>

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className={`relative mb-24 last:mb-0 md:w-[calc(50%-50px)] ${i % 2 === 0 ? "md:ml-auto md:pl-0" : "md:mr-auto md:pr-0 md:text-right"}`}
            >
              {/* Timeline dot */}
              <div className={`absolute top-6 w-6 h-6 rounded-full bg-background border-4 border-border z-10 transition-colors duration-500 hover:border-primary hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] ${i % 2 === 0 ? "-left-[50px] md:-left-[62px]" : "-left-[50px] md:left-auto md:-right-[62px]"}`} />

              {/* Glassmorphic Card */}
              <div className="relative rounded-2xl overflow-hidden bg-background/50 backdrop-blur-xl border border-border shadow-2xl p-8 transition-all hover:bg-border/30 hover:border-primary/50 group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative z-10">
                  <div className={`flex flex-col gap-4 mb-6 ${i % 2 !== 0 ? "md:items-end" : ""}`}>
                    <div className={`flex items-center gap-3 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                      <span className="font-mono text-xs text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                        {exp.date}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground tracking-tight mb-2">{exp.role}</h3>
                      <div className={`flex items-center gap-2 text-primary-muted font-mono text-sm ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                        <Building size={14} /> {exp.company}
                      </div>
                      {exp.metrics && (
                        <p className={`text-primary font-mono text-xs mt-3 bg-primary/10 inline-block px-2 py-1 rounded border border-primary/20 ${i % 2 !== 0 ? "md:float-right" : ""}`}>
                          {exp.metrics}
                        </p>
                      )}
                    </div>
                  </div>

                  <ul className={`space-y-3 mb-8 text-left ${i % 2 !== 0 ? "md:text-right md:flex md:flex-col md:items-end" : ""}`}>
                    {exp.highlights.map((h, j) => (
                      <li key={j} className={`flex items-start gap-3 text-text-secondary text-sm leading-relaxed max-w-[90%] ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}>
                        <span className="text-primary mt-1 shrink-0">▹</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`flex flex-wrap gap-2 pt-6 border-t border-border ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                    {exp.tags.map((tag, j) => (
                      <span key={j} className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-border/50 border border-border text-primary-muted group-hover:text-foreground transition-colors">
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
