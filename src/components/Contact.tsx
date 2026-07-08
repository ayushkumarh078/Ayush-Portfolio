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
          <span className="font-mono text-indigo-400 tracking-widest text-sm uppercase block mb-3">
            07 — Connect
          </span>
          <h2
            className="text-6xl md:text-8xl font-black text-transparent bg-clip-text leading-none tracking-tight mb-6"
            style={{ backgroundImage: "linear-gradient(135deg, #fff 30%, #7c5cff 100%)" }}
          >
            Let's Build the Future
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Seeking an SDE role. My inbox is always open — let's connect and build something great.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md overflow-hidden"
        >
          {/* Glow accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10 md:p-14 relative z-10">
            {/* Left */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
                <p className="text-white/45 text-sm mb-10 leading-relaxed">
                  Whether it's about an opportunity, collaboration, or just saying hi — I'll get back to you fast.
                </p>
                <div className="space-y-5">
                  {[
                    {
                      icon: <Mail size={18} />,
                      label: "Email",
                      href: "mailto:ayushkumar.h078@gmail.com",
                    },
                    {
                      icon: <Code size={18} />,
                      label: "GitHub",
                      href: "https://github.com/ayushkumarh078",
                    },
                    {
                      icon: <User size={18} />,
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/ayushkumarh0078/",
                    },
                  ].map((item, i) => (
                    <a
                      key={i}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 text-white/60 hover:text-white group transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all">
                        {item.icon}
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full px-5 py-4 rounded-xl bg-black/30 border border-white/8 text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/60 transition-colors text-sm"
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Your Email"
                  className="w-full px-5 py-4 rounded-xl bg-black/30 border border-white/8 text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/60 transition-colors text-sm"
                />
                <textarea
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Your Message"
                  className="w-full px-5 py-4 rounded-xl bg-black/30 border border-white/8 text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/60 transition-colors resize-none text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(124,92,255,0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors text-base"
                >
                  Send Message <Send size={18} />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-10 border-t border-white/5 relative z-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/30 text-xs font-mono">
          © {new Date().getFullYear()} Ayush Kumar — All rights reserved.
        </p>
        <div className="flex gap-3 text-xs font-mono text-white/20 uppercase tracking-widest">
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
