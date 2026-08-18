"use client";

import { motion } from "framer-motion";

const education = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "VIT-AP University",
    date: "2022 - 2026",
    score: "7.8 CGPA",
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

const certs = [
  {
    name: "Microsoft Azure DP-900",
    issuer: "Microsoft",
    tag: "Azure",
    color: "#0078d4",
    link: "https://drive.google.com/file/d/1GOG1HcmAUP5XX3AY3VRzghkrYqu83hL_/view",
  },
  {
    name: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    tag: "AWS",
    color: "#FF9900",
    link: "https://drive.google.com/file/d/1vm4YMymWQJdYTJfKg2jc3sDAxDU__iQc/view",
  },
  {
    name: "AWS Cloud Architecting",
    issuer: "Amazon Web Services",
    tag: "AWS",
    color: "#FF9900",
    link: "https://drive.google.com/file/d/13sektBlr09yicyXwkBxk2elXOgPlYZCg/view",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col gap-24">
        
        {/* Education Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="font-mono text-primary tracking-widest text-sm uppercase block mb-3">
              05 — Academics
            </span>
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-foreground tracking-tight">Education</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative rounded-2xl border border-border bg-border/30 p-8 group hover:border-primary/50 transition-colors overflow-hidden"
              >
                {edu.current && (
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
                )}
                <div className="font-mono text-xs text-text-secondary mb-4 uppercase tracking-widest">{edu.date}</div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                  {edu.school}
                </h3>
                <p className="text-sm text-text-secondary">{edu.degree}</p>
                {edu.score && (
                  <div className="mt-6 pt-4 border-t border-border flex justify-between items-center">
                    <span className="font-mono text-xs text-text-secondary uppercase tracking-widest">Score</span>
                    <span className="font-bold text-primary">{edu.score}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:w-1/3"
            >
              <h2 className="text-3xl font-sans font-bold text-foreground tracking-tight">Certifications</h2>
              <p className="text-sm text-text-secondary mt-2">Cloud computing and architecture credentials.</p>
            </motion.div>

            <div className="md:w-2/3 flex flex-wrap gap-4">
              {certs.map((cert, i) => (
                <motion.a
                  key={i}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 py-3 px-5 rounded-full border border-border bg-border/30 hover:bg-border/50 transition-colors group"
                >
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cert.color }} />
                  <div>
                    <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      {cert.name}
                    </h3>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
