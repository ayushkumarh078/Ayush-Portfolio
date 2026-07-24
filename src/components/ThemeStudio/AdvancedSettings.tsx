"use client";

import { useThemeStore } from "@/store/themeStore";

const ACCENT_PALETTE = [
  { name: "Pure White", hex: "#ffffff" },
  { name: "Cyan", hex: "#00d4ff" },
  { name: "Green Matrix", hex: "#00ff41" },
  { name: "Gold", hex: "#f59e0b" },
  { name: "Rose", hex: "#f43f5e" },
  { name: "Violet", hex: "#8b5cf6" },
  { name: "Orange", hex: "#f97316" },
  { name: "Sky", hex: "#38bdf8" },
  { name: "Lime", hex: "#a3e635" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Amber", hex: "#fbbf24" },
  { name: "Indigo", hex: "#6366f1" },
  { name: "Teal", hex: "#14b8a6" },
  { name: "Red", hex: "#ef4444" },
  { name: "Pure Black", hex: "#000000" },
];

export function AdvancedSettings() {
  const { currentTheme, updateTheme } = useThemeStore();

  const sliders = [
    { label: "Glass Transparency", key: "glassTransparency" as const, min: 0, max: 1, step: 0.05 },
    { label: "Border Glow", key: "borderGlow" as const, min: 0, max: 0.5, step: 0.01 },
    { label: "Rounded Corners (px)", key: "roundedCorners" as const, min: 0, max: 32 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Advanced Options</h3>
        <p className="text-xs text-text-secondary opacity-60">Fine-tune every detail</p>
      </div>

      {/* Accent Color */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Primary Accent Color
          <span className="text-xs font-normal text-text-secondary opacity-60 ml-2">Used for buttons, cursor, links, highlights</span>
        </h4>
        <div className="flex flex-wrap gap-3 mb-4">
          {ACCENT_PALETTE.map((c) => {
            const isActive = currentTheme.primaryAccent.toLowerCase() === c.hex.toLowerCase();
            return (
              <button key={c.name} title={c.name}
                onClick={() => updateTheme({ primaryAccent: c.hex })}
                className="relative group"
              >
                {isActive && (
                  <div className="absolute -inset-1.5 rounded-full border-2 border-primary" />
                )}
                <div
                  className="w-8 h-8 rounded-full border border-white/10 shadow relative z-10 hover:scale-110 transition-transform"
                  style={{ backgroundColor: c.hex }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent" />
                </div>
              </button>
            );
          })}
          {/* Custom accent picker */}
          <label className="relative group cursor-pointer" title="Custom Accent">
            <div
              className="w-8 h-8 rounded-full border-2 border-dashed border-white/30 relative z-10 hover:scale-110 transition-transform overflow-hidden"
              style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
            />
            <input type="color" value={currentTheme.primaryAccent}
              onChange={(e) => updateTheme({ primaryAccent: e.target.value })}
              className="sr-only"
            />
          </label>
        </div>
        {/* HEX input */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg border border-border shrink-0" style={{ backgroundColor: currentTheme.primaryAccent }} />
          <input type="text" value={currentTheme.primaryAccent}
            onChange={(e) => updateTheme({ primaryAccent: e.target.value })}
            className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:border-primary/60"
            placeholder="#ffffff"
          />
        </div>
      </div>

      {/* Text Colors */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Text Colors</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border bg-border/10">
            <label className="text-xs font-medium text-text-secondary block mb-2">Primary Text</label>
            <div className="flex items-center gap-2">
              <input type="color" value={currentTheme.textPrimary}
                onChange={(e) => updateTheme({ textPrimary: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
              />
              <input type="text" value={currentTheme.textPrimary}
                onChange={(e) => updateTheme({ textPrimary: e.target.value })}
                className="flex-1 px-2 py-1.5 rounded-lg bg-background border border-border text-xs font-mono text-foreground focus:outline-none"
              />
            </div>
          </div>
          <div className="p-4 rounded-xl border border-border bg-border/10">
            <label className="text-xs font-medium text-text-secondary block mb-2">Secondary Text</label>
            <div className="flex items-center gap-2">
              <input type="color" value={currentTheme.textSecondary}
                onChange={(e) => updateTheme({ textSecondary: e.target.value })}
                className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
              />
              <input type="text" value={currentTheme.textSecondary}
                onChange={(e) => updateTheme({ textSecondary: e.target.value })}
                className="flex-1 px-2 py-1.5 rounded-lg bg-background border border-border text-xs font-mono text-foreground focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Sliders */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Fine Tuning</h4>
        <div className="space-y-5">
          {sliders.map(({ label, key, min, max, step }) => (
            <div key={key} className="p-4 rounded-xl border border-border bg-border/10">
              <div className="flex justify-between mb-3">
                <label className="text-xs font-semibold text-foreground">{label}</label>
                <span className="text-xs font-mono text-primary">{currentTheme[key]}</span>
              </div>
              <input type="range" min={min} max={max} step={step ?? 1}
                value={currentTheme[key] as number}
                onChange={(e) => updateTheme({ [key]: parseFloat(e.target.value) })}
                className="w-full accent-primary"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
