"use client";

import { motion } from "framer-motion";

const certs = [
  {
    name: "Microsoft Azure DP-900",
    issuer: "Microsoft",
    tag: "Azure",
    color: "#0078d4",
    link: "https://drive.google.com/file/d/13sektBlr09yicyXwkBxk2elXOgPlYZCg/view",
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
    link: "https://drive.google.com/file/d/1GOG1HcmAUP5XX3AY3VRzghkrYqu83hL_/view",
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
            06 — Credentials
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">Certifications</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.a
              key={i}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="relative group rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm p-8 overflow-hidden flex flex-col gap-4 cursor-pointer"
            >
              {/* Top glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-60 transition-opacity group-hover:opacity-100"
                style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
              />

              {/* Provider tag */}
              <span
                className="self-start px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-widest"
                style={{
                  background: `${cert.color}20`,
                  color: cert.color,
                  border: `1px solid ${cert.color}40`,
                }}
              >
                {cert.tag}
              </span>

              <h3 className="text-xl font-bold text-white leading-snug group-hover:text-indigo-200 transition-colors">
                {cert.name}
              </h3>
              <p className="text-sm font-mono text-white/40 mt-auto">{cert.issuer}</p>

              {/* View certificate text */}
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Certificate</span>
                <span>→</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
