"use client";

import { useThemeStore } from "@/store/themeStore";
import { motion } from "framer-motion";

const PRESET_THEMES = [
  {
    name: "Cyberpunk",
    bgColor: "#0d0d0d",
    primaryAccent: "#00fff5",
    textPrimary: "#e0e0e0",
    textSecondary: "#888",
    matrixColor: "rgba(0, 255, 245, 0.85)",
    backgroundType: "Mesh",
    gradientColors: ["#00fff5", "#ff00b8"],
    gradientAngle: 135,
    matrixEnabled: true,
    matrixCharSet: "Hexadecimal",
  },
  {
    name: "Matrix",
    bgColor: "#000000",
    primaryAccent: "#00ff41",
    textPrimary: "#00ff41",
    textSecondary: "#008f11",
    matrixColor: "rgba(0, 255, 65, 0.85)",
    backgroundType: "Solid",
    gradientColors: ["#000000", "#001100"],
    gradientAngle: 180,
    matrixEnabled: true,
    matrixCharSet: "Katakana",
  },
  {
    name: "Royal Navy",
    bgColor: "#0a0f2c",
    primaryAccent: "#d4af37",
    textPrimary: "#f5f0dc",
    textSecondary: "#9e9e7f",
    matrixColor: "rgba(212, 175, 55, 0.85)",
    backgroundType: "Linear Gradient",
    gradientColors: ["#0a0f2c", "#1a2060"],
    gradientAngle: 135,
    matrixEnabled: true,
    matrixCharSet: "Random",
  },
  {
    name: "Deep Ocean",
    bgColor: "#020c1b",
    primaryAccent: "#64ffda",
    textPrimary: "#ccd6f6",
    textSecondary: "#8892b0",
    matrixColor: "rgba(100, 255, 218, 0.85)",
    backgroundType: "Radial Gradient",
    gradientColors: ["#0a1128", "#020c1b"],
    gradientAngle: 180,
    matrixEnabled: true,
    matrixCharSet: "Binary",
  },
  {
    name: "Synthwave",
    bgColor: "#1a0030",
    primaryAccent: "#f72585",
    textPrimary: "#ffe0ff",
    textSecondary: "#c77dff",
    matrixColor: "rgba(247, 37, 133, 0.85)",
    backgroundType: "Mesh",
    gradientColors: ["#f72585", "#7b2ff7"],
    gradientAngle: 135,
    matrixEnabled: true,
    matrixCharSet: "JavaScript",
  },
  {
    name: "Forest",
    bgColor: "#0d1f0d",
    primaryAccent: "#39d353",
    textPrimary: "#d9f0d9",
    textSecondary: "#6a9a6a",
    matrixColor: "rgba(57, 211, 83, 0.85)",
    backgroundType: "Linear Gradient",
    gradientColors: ["#0d1f0d", "#1a3d1a"],
    gradientAngle: 180,
    matrixEnabled: true,
    matrixCharSet: "Binary",
  },
  {
    name: "Fire",
    bgColor: "#120000",
    primaryAccent: "#ff6b00",
    textPrimary: "#fff0e0",
    textSecondary: "#c26800",
    matrixColor: "rgba(255, 107, 0, 0.85)",
    backgroundType: "Radial Gradient",
    gradientColors: ["#4d0000", "#120000"],
    gradientAngle: 180,
    matrixEnabled: true,
    matrixCharSet: "Random",
  },
  {
    name: "Aurora",
    bgColor: "#0d0d20",
    primaryAccent: "#7df9ff",
    textPrimary: "#f0f8ff",
    textSecondary: "#9ab0cc",
    matrixColor: "rgba(125, 249, 255, 0.85)",
    backgroundType: "Mesh",
    gradientColors: ["#9b5de5", "#00bbf9"],
    gradientAngle: 135,
    matrixEnabled: true,
    matrixCharSet: "Katakana",
  },
  {
    name: "GitHub Dark",
    bgColor: "#0d1117",
    primaryAccent: "#f0f6fc",
    textPrimary: "#e6edf3",
    textSecondary: "#8b949e",
    matrixColor: "rgba(240, 246, 252, 0.85)",
    backgroundType: "Solid",
    gradientColors: ["#0d1117", "#161b22"],
    gradientAngle: 180,
    matrixEnabled: true,
    matrixCharSet: "Programming",
  },
  {
    name: "Monochrome",
    bgColor: "#ffffff",
    primaryAccent: "#000000",
    textPrimary: "#111111",
    textSecondary: "#555555",
    matrixColor: "rgba(0, 0, 0, 0.85)",
    backgroundType: "Solid",
    gradientColors: ["#ffffff", "#f0f0f0"],
    gradientAngle: 180,
    matrixEnabled: true,
    matrixCharSet: "Random",
  },
  {
    name: "Midnight",
    bgColor: "#060818",
    primaryAccent: "#a5b4fc",
    textPrimary: "#e2e8f0",
    textSecondary: "#94a3b8",
    matrixColor: "rgba(165, 180, 252, 0.85)",
    backgroundType: "Linear Gradient",
    gradientColors: ["#060818", "#0f1735"],
    gradientAngle: 135,
    matrixEnabled: true,
    matrixCharSet: "Katakana",
  },
  {
    name: "Neon Rainbow",
    bgColor: "#000000",
    primaryAccent: "#ff00ff",
    textPrimary: "#ffffff",
    textSecondary: "#888888",
    matrixColor: "rgba(255, 0, 255, 0.85)",
    backgroundType: "Mesh",
    gradientColors: ["#ff0000", "#00ff00", "#0000ff"],
    gradientAngle: 135,
    matrixEnabled: true,
    matrixCharSet: "Random",
  },
];

const PRESET_GRADIENTS: Record<string, string> = {
  Cyberpunk: "linear-gradient(135deg, #00fff5, #ff00b8)",
  Matrix: "#000000",
  "Royal Navy": "linear-gradient(135deg, #0a0f2c, #d4af37)",
  "Deep Ocean": "radial-gradient(circle, #0a1128, #020c1b)",
  Synthwave: "linear-gradient(135deg, #f72585, #7b2ff7)",
  Forest: "linear-gradient(180deg, #0d1f0d, #39d353)",
  Fire: "radial-gradient(circle, #4d0000, #ff6b00)",
  Aurora: "linear-gradient(135deg, #9b5de5, #7df9ff)",
  "GitHub Dark": "#0d1117",
  Monochrome: "#ffffff",
  Midnight: "linear-gradient(135deg, #060818, #a5b4fc)",
  "Neon Rainbow": "linear-gradient(135deg, #ff0000, #00ff00, #0000ff)",
};

export function PresetThemes() {
  const { loadTheme, currentTheme } = useThemeStore();

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Preset Themes</h3>
        <p className="text-xs text-text-secondary opacity-60">Click any theme to apply it instantly</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {PRESET_THEMES.map((preset) => {
          const isActive = currentTheme.name === preset.name;
          const bg = PRESET_GRADIENTS[preset.name] || preset.bgColor;

          return (
            <motion.button
              key={preset.name}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => loadTheme({ ...preset, matrixGlow: 5, matrixDensity: 50, matrixSpeed: 1, matrixSize: 16, backgroundType: preset.backgroundType as any, matrixCharSet: preset.matrixCharSet as any, noiseAmount: 20, blurAmount: 0, glassTransparency: 0.8, borderGlow: 0.15, roundedCorners: 16, ambientEffect: "Matrix Rain" })}
              className={`relative overflow-hidden rounded-2xl border transition-all shadow-lg text-left ${
                isActive ? "border-primary shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)]" : "border-white/10 hover:border-white/30"
              }`}
            >
              {/* Swatch Preview */}
              <div
                className="h-20 w-full"
                style={{ background: bg }}
              />

              {/* Name */}
              <div className="p-3" style={{ backgroundColor: preset.bgColor }}>
                <p className="text-xs font-bold" style={{ color: preset.textPrimary }}>{preset.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: preset.primaryAccent }} />
                  <span className="text-[10px] font-mono opacity-60" style={{ color: preset.textSecondary }}>{preset.primaryAccent}</span>
                </div>
              </div>

              {isActive && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-background text-[10px]">
                  ✓
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
