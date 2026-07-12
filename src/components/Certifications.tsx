"use client";

import { motion } from "framer-motion";

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

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:w-1/3"
        >
          <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
            05 — Credentials
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">Certifications</h2>
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
              className="flex items-center gap-4 py-3 px-5 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group"
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cert.color }} />
              <div>
                <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {cert.name}
                </h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
