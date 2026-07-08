"use client";

import { motion } from "framer-motion";
import { Mail, Code, User, Send } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">Let's Build the Future</h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Currently seeking an SDE role where I can build reliable, scalable systems. My inbox is always open.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row gap-12 relative z-10">
            {/* Left side info */}
            <div className="md:w-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Get In Touch</h3>
                <p className="text-white/50 mb-8">Ready to start your next project with me? Send a message.</p>
                
                <div className="space-y-6">
                  <a href="mailto:ayush@example.com" className="flex items-center gap-4 text-white/70 hover:text-brand-100 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                      <Mail size={20} />
                    </div>
                    <span className="font-medium text-lg">Email Me directly</span>
                  </a>
                  <a href="https://github.com/ayushkumarh078" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/70 hover:text-brand-100 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                      <Code size={20} />
                    </div>
                    <span className="font-medium text-lg">GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/ayushkumarh0078/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/70 hover:text-brand-100 transition-colors group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-brand-500/20 transition-colors">
                      <User size={20} />
                    </div>
                    <span className="font-medium text-lg">LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div className="md:w-1/2">
              <form className="flex flex-col gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-500/50 transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-500/50 transition-colors"
                />
                <textarea 
                  placeholder="Message" 
                  rows={4}
                  className="w-full bg-black/40 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-500/50 transition-colors resize-none"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                  type="button"
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
    <footer className="border-t border-white/5 py-12 relative z-10 bg-black/50 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-sm">© {new Date().getFullYear()} Ayush Kumar. All rights reserved.</p>
        
        <div className="flex gap-4 text-xs font-mono text-white/30 uppercase tracking-wider">
          <span>React</span>
          <span>•</span>
          <span>Next.js</span>
          <span>•</span>
          <span>TypeScript</span>
          <span>•</span>
          <span>Tailwind CSS</span>
          <span>•</span>
          <span>Framer Motion</span>
        </div>
      </div>
    </footer>
  );
}
