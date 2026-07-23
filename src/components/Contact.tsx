"use client";

import { motion } from "framer-motion";
import { Mail, Code, User, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`);
    window.location.href = `mailto:ayushkumar.h078@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary tracking-widest text-sm uppercase block mb-3">
            09 — Next Steps
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground tracking-tight mb-6">
            Let's build something scalable.
          </h2>
          <p className="text-text-secondary opacity-50 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            I'm currently seeking a full-time Software Engineering role. Whether you have an opportunity that matches my skills or just want to talk system architecture, I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-border bg-border/30 backdrop-blur-md overflow-hidden max-w-2xl mx-auto p-8 md:p-12"
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Name"
                className="w-full px-5 py-4 rounded-xl bg-background/80 border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors text-sm"
              />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email address"
                className="w-full px-5 py-4 rounded-xl bg-background/80 border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors text-sm"
              />
            </div>
            <textarea
              rows={4}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="How can I help you?"
              className="w-full px-5 py-4 rounded-xl bg-background/80 border border-border text-foreground placeholder-white/30 focus:outline-none focus:border-primary/50 transition-colors resize-none text-sm"
            />
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-2">
              <div className="flex gap-4">
                <a href="mailto:ayushkumar.h078@gmail.com" className="text-text-secondary opacity-40 hover:text-foreground transition-colors"><Mail size={20} /></a>
                <a href="https://github.com/ayushkumarh078" target="_blank" rel="noopener noreferrer" className="text-text-secondary opacity-40 hover:text-foreground transition-colors"><Code size={20} /></a>
                <a href="https://www.linkedin.com/in/ayushkumarh0078/" target="_blank" rel="noopener noreferrer" className="text-text-secondary opacity-40 hover:text-foreground transition-colors"><User size={20} /></a>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(124,92,255,0.3)" }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-primary text-background font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary/90 transition-all text-sm"
              >
                Start a Conversation <Send size={16} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-10 border-t border-border relative z-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-text-secondary opacity-30 text-xs font-mono">
          © {new Date().getFullYear()} Ayush Kumar — All rights reserved.
        </p>
        <div className="flex gap-3 text-xs font-mono text-text-secondary opacity-20 uppercase tracking-widest">
          {["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"].map((t, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && <span className="opacity-40">·</span>}
              {t}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
