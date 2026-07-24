"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { BackgroundDesigner } from "./BackgroundDesigner";
import { MatrixDesigner } from "./MatrixDesigner";
import { GradientEditor } from "./GradientEditor";
import { PresetThemes } from "./PresetThemes";
import { SavedThemes } from "./SavedThemes";
import { AdvancedSettings } from "./AdvancedSettings";
import { ThemeToolbar } from "./ThemeToolbar";

const PANEL_MAP: Record<string, React.ReactNode> = {};

export function ThemeStudioModal({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("Presets");

  const renderPanel = () => {
    switch (activeTab) {
      case "Background": return <BackgroundDesigner />;
      case "Matrix":    return <MatrixDesigner />;
      case "Gradient":  return <GradientEditor />;
      case "Presets":   return <PresetThemes />;
      case "Saved":     return <SavedThemes />;
      case "Settings":  return <AdvancedSettings />;
      default:          return <PresetThemes />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-md p-4 md:p-8"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: -10, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-5xl h-[88vh] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/10"
        style={{
          background: "rgba(10, 10, 10, 0.88)",
          backdropFilter: "blur(40px) saturate(180%)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

        {/* Sidebar */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div>
              <h2 className="text-lg font-bold font-sans tracking-tight text-white">Theme Studio</h2>
              <p className="text-xs text-white/40">Customize every pixel of your experience</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Panel */}
          <div className="flex-1 overflow-y-auto p-6" style={{ scrollbarWidth: "none" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderPanel()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Toolbar: Undo / Redo / Contrast / Share */}
          <ThemeToolbar />
        </div>
      </motion.div>
    </motion.div>
  );
}
