"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileCode } from "lucide-react";
import { useEffect } from "react";

interface ReadmeModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  github?: string;
}

export function ReadmeModal({ isOpen, onClose, title, content, github }: ReadmeModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-5xl h-full max-h-[85vh] bg-background border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col cursor-default"
          >
            {/* GitHub-like Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background/50 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <FileCode className="text-primary-muted w-5 h-5" />
                <span className="font-mono text-sm text-foreground">{title} / README.md</span>
              </div>
              <div className="flex items-center gap-4">
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-primary-muted hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Open
                  </a>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-md hover:bg-border/50 text-primary-muted hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Markdown Body Area */}
            <div className="p-8 md:p-12 overflow-y-auto scroll-smooth prose prose-invert max-w-none">
              {/* Fake Markdown Rendering for Demo - In real life, use react-markdown */}
              <div className="font-sans text-text-secondary leading-relaxed space-y-6" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
