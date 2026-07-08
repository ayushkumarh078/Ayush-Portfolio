"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const spring = useSpring(0, { bounce: 0, duration: 2000 });
  const display = useTransform(spring, (v) => Math.round(v) + suffix);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

const stats = [
  { value: 1, suffix: "", label: "Internship Completed" },
  { value: 3, suffix: "", label: "Certifications Earned" },
  { value: 3, suffix: "", label: "Major Projects Built" },
  { value: 15, suffix: "+", label: "Events Managed" },
  { value: 50, suffix: "+", label: "Students Mentored" },
  { value: 10, suffix: "", label: "Member Team Led" },
  { value: 95, suffix: "%", label: "Detection Accuracy" },
  { value: 500, suffix: "+", label: "Users Served" },
];

export default function Statistics() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="border border-white/8 rounded-3xl bg-white/[0.02] backdrop-blur-sm p-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-black text-white text-center mb-14 tracking-tight"
          >
            By the Numbers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
              >
                <div
                  className="text-4xl md:text-5xl font-black text-transparent bg-clip-text mb-2"
                  style={{ backgroundImage: "linear-gradient(135deg, #c9c3ff, #7c5cff)" }}
                >
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-xs font-mono text-white/40 uppercase tracking-widest leading-snug">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
