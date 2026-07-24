"use client";

import { motion } from "framer-motion";
import { useThemeStore, MatrixCharSet } from "@/store/themeStore";

const MATRIX_COLORS = [
  { name: "White", value: "rgba(255, 255, 255, 0.85)" },
  { name: "Green", value: "rgba(0, 255, 70, 0.85)" },
  { name: "Cyan", value: "rgba(0, 220, 255, 0.85)" },
  { name: "Blue", value: "rgba(100, 150, 255, 0.85)" },
  { name: "Purple", value: "rgba(180, 100, 255, 0.85)" },
  { name: "Gold", value: "rgba(255, 200, 50, 0.85)" },
  { name: "Red", value: "rgba(255, 60, 60, 0.85)" },
  { name: "Orange", value: "rgba(255, 140, 30, 0.85)" },
  { name: "Pink", value: "rgba(255, 100, 180, 0.85)" },
  { name: "Emerald", value: "rgba(0, 200, 130, 0.85)" },
  { name: "Lime", value: "rgba(160, 230, 0, 0.85)" },
];

const CHAR_SETS: MatrixCharSet[] = [
  "Binary", "Hexadecimal", "Katakana", "Programming",
  "Python", "JavaScript", "React", "Docker", "AWS", "SQL", "Random"
];

export function MatrixDesigner() {
  const { currentTheme, updateTheme, setLivePreview } = useThemeStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Enable Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-foreground">Matrix Rain</h3>
          <p className="text-xs text-text-secondary opacity-60 mt-1">Toggle and customize the background animation</p>
        </div>
        <button
          onClick={() => updateTheme({ matrixEnabled: !currentTheme.matrixEnabled })}
          className={`relative w-14 h-7 rounded-full transition-all duration-300 ${currentTheme.matrixEnabled ? "bg-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)]" : "bg-border"}`}
        >
          <motion.div
            animate={{ x: currentTheme.matrixEnabled ? 26 : 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
          />
        </button>
      </div>

      {currentTheme.matrixEnabled && (
        <>
          {/* Color Picker */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Character Color</h4>
            <div className="flex flex-wrap gap-3">
              {MATRIX_COLORS.map((c) => {
                const isActive = currentTheme.matrixColor === c.value;
                return (
                  <button
                    key={c.name}
                    title={c.name}
                    onClick={() => updateTheme({ matrixColor: c.value })}
                    onMouseEnter={() => setLivePreview({ matrixColor: c.value })}
                    onMouseLeave={() => setLivePreview(null)}
                    className="group relative"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="matrix-color-ring"
                        className="absolute -inset-1.5 rounded-full border-2 border-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-full border border-white/10 shadow-lg relative z-10"
                      style={{ backgroundColor: c.value.replace("0.85", "1") }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                    </motion.div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Character Set */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Character Set</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {CHAR_SETS.map((cs) => {
                const isActive = currentTheme.matrixCharSet === cs;
                return (
                  <button
                    key={cs}
                    onClick={() => updateTheme({ matrixCharSet: cs })}
                    className={`px-3 py-2 rounded-lg text-xs font-mono border transition-all ${
                      isActive
                        ? "bg-primary text-background border-primary"
                        : "bg-background border-border text-text-secondary hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    {cs}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Density", key: "matrixDensity" as const, min: 10, max: 100 },
              { label: "Speed", key: "matrixSpeed" as const, min: 0.3, max: 5, step: 0.1 },
              { label: "Char Size (px)", key: "matrixSize" as const, min: 8, max: 28 },
            ].map(({ label, key, min, max, step }) => (
              <div key={key}>
                <div className="flex justify-between mb-2">
                  <label className="text-xs font-medium text-text-secondary">{label}</label>
                  <span className="text-xs font-mono text-primary">{currentTheme[key]}</span>
                </div>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step ?? 1}
                  value={currentTheme[key] as number}
                  onChange={(e) => updateTheme({ [key]: parseFloat(e.target.value) })}
                  onMouseEnter={() => setLivePreview({ [key]: currentTheme[key] })}
                  onMouseLeave={() => setLivePreview(null)}
                  className="w-full accent-primary"
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
