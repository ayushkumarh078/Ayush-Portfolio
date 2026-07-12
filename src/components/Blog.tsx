"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

const articles = [
  {
    title: "How I Tested Government Software at FSSAI",
    excerpt: "A deep dive into automating regression suites for national-scale platforms and finding critical bugs before production deployment.",
    date: "Aug 15, 2025",
    readTime: "8 min read",
    category: "QA Engineering",
    link: "#"
  },
  {
    title: "Building an Autonomous Smart Trash Can",
    excerpt: "Hardware, edge computing, and CV combined. How I built a smart waste sorting system using Raspberry Pi and optimized OpenCV models.",
    date: "May 22, 2025",
    readTime: "12 min read",
    category: "Edge Computing",
    link: "#"
  },
  {
    title: "Lessons Learned from Building AI Applications",
    excerpt: "Handling LLM rate limits, asynchronous job queues, and optimizing prompts for an NLP-powered quiz generator.",
    date: "Feb 10, 2025",
    readTime: "6 min read",
    category: "System Design",
    link: "#"
  }
];

export default function Blog() {
  return (
    <section id="blog" className="py-32 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
              08 — Writing
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Engineering Blog</h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-sm font-mono text-white/50 hover:text-indigo-400 transition-colors group pb-2">
            View All Articles <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href={article.link}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] hover:border-indigo-500/30 transition-all group cursor-pointer"
            >
              <div className="mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                  {article.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors leading-snug">
                {article.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed mb-8 flex-grow">
                {article.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs font-mono text-white/40 pt-6 border-t border-white/5 mt-auto">
                <span>{article.date}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
