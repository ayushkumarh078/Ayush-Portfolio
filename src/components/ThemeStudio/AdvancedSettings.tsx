"use client";

import { useThemeStore } from "@/store/themeStore";

export function AdvancedSettings() {
  const { currentTheme, updateTheme } = useThemeStore();

  const settings = [
    { label: "Glass Transparency", key: "glassTransparency" as const, min: 0, max: 1, step: 0.05 },
    { label: "Border Glow", key: "borderGlow" as const, min: 0, max: 0.5, step: 0.01 },
    { label: "Rounded Corners (px)", key: "roundedCorners" as const, min: 0, max: 32 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Advanced Options</h3>
        <p className="text-xs text-text-secondary opacity-60">Fine-tune every detail of the visual experience</p>
      </div>

      {/* Accent Color Picker */}
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Primary Accent Color</h4>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={currentTheme.primaryAccent}
            onChange={(e) => updateTheme({ primaryAccent: e.target.value })}
            className="w-14 h-14 rounded-xl border border-border cursor-pointer bg-transparent"
          />
          <div className="flex-1">
            <input
              type="text"
              value={currentTheme.primaryAccent}
              onChange={(e) => updateTheme({ primaryAccent: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:border-primary/50"
              placeholder="#ffffff"
            />
            <p className="text-xs text-text-secondary opacity-50 mt-1">Used for buttons, links, and highlights</p>
          </div>
        </div>
      </div>

      {/* Text Colors */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-text-secondary block mb-2">Primary Text</label>
          <input
            type="color"
            value={currentTheme.textPrimary}
            onChange={(e) => updateTheme({ textPrimary: e.target.value })}
            className="w-full h-10 rounded-lg border border-border cursor-pointer bg-transparent"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-text-secondary block mb-2">Secondary Text</label>
          <input
            type="color"
            value={currentTheme.textSecondary}
            onChange={(e) => updateTheme({ textSecondary: e.target.value })}
            className="w-full h-10 rounded-lg border border-border cursor-pointer bg-transparent"
          />
        </div>
      </div>

      {/* Advanced Sliders */}
      <div className="space-y-6">
        {settings.map(({ label, key, min, max, step }) => (
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
              className="w-full accent-primary"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
