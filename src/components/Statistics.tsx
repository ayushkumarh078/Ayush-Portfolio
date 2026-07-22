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
  { value: 1, suffix: "", label: "Engineering Internship" },
  { value: 3, suffix: "", label: "Cloud Certifications" },
  { value: 3, suffix: "", label: "Production Apps Built" },
  { value: 95, suffix: "%", label: "Detection Accuracy" },
  { value: 500, suffix: "+", label: "Quizzes Generated" },
  { value: 40, suffix: "%", label: "Bug Leak Reduced" },
  { value: 10, suffix: "+", label: "Events Orchestrated" },
  { value: 5, suffix: "W", label: "Edge Power Draw" },
];

export default function Statistics() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="border border-white/5 rounded-3xl bg-white/[0.01] backdrop-blur-sm p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-center">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div
                  className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text mb-2"
                  style={{ backgroundImage: "linear-gradient(135deg, #fff, #c9c3ff)" }}
                >
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-snug">
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
