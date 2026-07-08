"use client";

import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2000,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  const display = useTransform(springValue, (current) => Math.round(current) + suffix);

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Statistics() {
  const stats = [
    { label: "Internship", value: 1, suffix: "" },
    { label: "Certifications", value: 3, suffix: "" },
    { label: "Major Projects", value: 3, suffix: "" },
    { label: "Events Managed", value: 15, suffix: "+" },
    { label: "Students Mentored", value: 50, suffix: "+" },
    { label: "Member Team Led", value: 10, suffix: "" },
    { label: "Detection Accuracy", value: 95, suffix: "%" },
    { label: "Users Served", value: 500, suffix: "+" },
  ];

  return (
    <section className="py-20 px-6 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-brand-900/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <div className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(124,92,255,0.5)]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs md:text-sm font-mono uppercase tracking-widest text-white/50">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
