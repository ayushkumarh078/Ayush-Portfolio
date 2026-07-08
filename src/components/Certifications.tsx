"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

export default function Certifications() {
  const certs = [
    {
      name: "Microsoft Azure DP-900",
      issuer: "Microsoft",
      link: "https://drive.google.com/file/d/13sektBlr09yicyXwkBxk2elXOgPlYZCg/view"
    },
    {
      name: "AWS Cloud Foundations",
      issuer: "Amazon Web Services",
      link: "https://drive.google.com/file/d/1vm4YMymWQJdYTJfKg2jc3sDAxDU__iQc/view"
    },
    {
      name: "AWS Cloud Architecting",
      issuer: "Amazon Web Services",
      link: "https://drive.google.com/file/d/1GOG1HcmAUP5XX3AY3VRzghkrYqu83hL_/view"
    }
  ];

  return (
    <section className="py-20 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certs.map((cert, i) => (
            <motion.a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel p-6 rounded-2xl flex flex-col items-center text-center gap-4 hover:border-brand-500/50 hover:bg-white/5 transition-all group"
            >
              <BadgeCheck className="w-12 h-12 text-brand-500 group-hover:text-brand-100 transition-colors" />
              <div>
                <h4 className="text-lg font-bold text-white mb-1">{cert.name}</h4>
                <p className="text-sm font-mono text-white/50">{cert.issuer}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
