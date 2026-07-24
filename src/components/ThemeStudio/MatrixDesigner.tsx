"use client";

import { useThemeStore, MatrixCharSet } from "@/store/themeStore";
import { motion } from "framer-motion";

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
  { name: "Indigo", value: "rgba(100, 80, 230, 0.85)" },
  { name: "Rose", value: "rgba(244, 63, 94, 0.85)" },
  { name: "Amber", value: "rgba(245, 158, 11, 0.85)" },
  { name: "Teal", value: "rgba(20, 184, 166, 0.85)" },
  { name: "Violet", value: "rgba(139, 92, 246, 0.85)" },
];

const CHAR_SETS: MatrixCharSet[] = [
  "Binary", "Hexadecimal", "Katakana", "Programming",
  "Python", "Java", "JavaScript", "React", "Docker", "AWS", "SQL", "Random",
];

const CHAR_SET_PREVIEWS: Record<MatrixCharSet, string> = {
  Binary: "01",
  Hexadecimal: "A3F9",
  Katakana: "アイウ",
  Programming: "{}()=>",
  Python: "def():",
  Java: "class{}",
  JavaScript: "const=>",
  React: "</>",
  Docker: "FROM",
  AWS: "EC2 S3",
  SQL: "SELECT",
  Random: "!@#$",
};

export function MatrixDesigner() {
  const { currentTheme, updateTheme, setLivePreview } = useThemeStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Toggle */}
      <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-border/10">
        <div>
          <h3 className="text-base font-bold text-foreground">Matrix Rain</h3>
          <p className="text-xs text-text-secondary opacity-60 mt-0.5">Background falling characters animation</p>
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
          {/* Color Selector */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Character Color</h4>
            <div className="flex flex-wrap gap-3">
              {MATRIX_COLORS.map((c) => {
                const isActive = currentTheme.matrixColor === c.value;
                const solidColor = c.value.replace("0.85", "1");
                return (
                  <button key={c.name} title={c.name} className="group relative"
                    onClick={() => updateTheme({ matrixColor: c.value })}
                    onMouseEnter={() => setLivePreview({ matrixColor: c.value })}
                    onMouseLeave={() => setLivePreview(null)}
                  >
                    {isActive && (
                      <motion.div layoutId="matrix-color-ring"
                        className="absolute -inset-1.5 rounded-full border-2 border-primary"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full border border-white/10 shadow-lg relative z-10"
                      style={{ backgroundColor: solidColor }}
                    >
                      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                    </motion.div>
                    <p className="text-[9px] text-center text-text-secondary opacity-50 mt-1 leading-none">{c.name}</p>
                  </button>
                );
              })}
              {/* Custom matrix color */}
              <div className="group relative" title="Custom">
                <motion.label whileHover={{ scale: 1.2 }}
                  className="w-8 h-8 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer relative z-10"
                  style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
                >
                  <input type="color"
                    onChange={(e) => {
                      const hex = e.target.value;
                      const r = parseInt(hex.slice(1, 3), 16);
                      const g = parseInt(hex.slice(3, 5), 16);
                      const b = parseInt(hex.slice(5, 7), 16);
                      updateTheme({ matrixColor: `rgba(${r}, ${g}, ${b}, 0.85)` });
                    }}
                    className="sr-only"
                  />
                </motion.label>
                <p className="text-[9px] text-center text-text-secondary opacity-50 mt-1 leading-none">Custom</p>
              </div>
            </div>
          </div>

          {/* Character Set */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Character Set</h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {CHAR_SETS.map((cs) => {
                const isActive = currentTheme.matrixCharSet === cs;
                return (
                  <button key={cs}
                    onClick={() => updateTheme({ matrixCharSet: cs })}
                    onMouseEnter={() => setLivePreview({ matrixCharSet: cs })}
                    onMouseLeave={() => setLivePreview(null)}
                    className={`px-2 py-2.5 rounded-xl text-xs border transition-all text-center flex flex-col gap-1 ${
                      isActive
                        ? "bg-primary text-background border-primary"
                        : "bg-background border-border text-text-secondary hover:border-primary/50 hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-70">{CHAR_SET_PREVIEWS[cs]}</span>
                    <span className="font-semibold">{cs}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Density", key: "matrixDensity" as const, min: 5, max: 100, desc: "Number of columns" },
              { label: "Speed", key: "matrixSpeed" as const, min: 0.2, max: 6, step: 0.1, desc: "Fall speed" },
              { label: "Char Size (px)", key: "matrixSize" as const, min: 8, max: 32, desc: "Font size" },
            ].map(({ label, key, min, max, step, desc }) => (
              <div key={key} className="p-4 rounded-xl border border-border bg-border/10">
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-semibold text-foreground">{label}</label>
                  <span className="text-xs font-mono text-primary">{currentTheme[key]}</span>
                </div>
                <p className="text-[10px] text-text-secondary opacity-50 mb-3">{desc}</p>
                <input type="range" min={min} max={max} step={step ?? 1}
                  value={currentTheme[key] as number}
                  onChange={(e) => updateTheme({ [key]: parseFloat(e.target.value) })}
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
