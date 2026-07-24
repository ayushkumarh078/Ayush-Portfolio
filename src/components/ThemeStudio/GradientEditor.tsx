"use client";

import { useThemeStore } from "@/store/themeStore";
import { motion } from "framer-motion";

export function GradientEditor() {
  const { currentTheme, updateTheme, setLivePreview } = useThemeStore();

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...currentTheme.gradientColors];
    newColors[index] = color;
    updateTheme({ gradientColors: newColors });
  };

  const addColorStop = () => {
    if (currentTheme.gradientColors.length < 4) {
      updateTheme({ gradientColors: [...currentTheme.gradientColors, "#7c3aed"] });
    }
  };

  const removeColorStop = (index: number) => {
    if (currentTheme.gradientColors.length > 2) {
      const newColors = currentTheme.gradientColors.filter((_, i) => i !== index);
      updateTheme({ gradientColors: newColors });
    }
  };

  const gradientPreview = `linear-gradient(${currentTheme.gradientAngle}deg, ${currentTheme.gradientColors.join(", ")})`;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Gradient Builder</h3>
        <p className="text-xs text-text-secondary opacity-60">Build and apply custom gradients</p>
      </div>

      {/* Live Preview */}
      <div
        className="w-full h-32 rounded-2xl border border-border shadow-inner transition-all duration-500"
        style={{ background: gradientPreview }}
        onMouseEnter={() => setLivePreview({ backgroundType: "Linear Gradient", gradientColors: currentTheme.gradientColors, gradientAngle: currentTheme.gradientAngle })}
        onMouseLeave={() => setLivePreview(null)}
      />

      {/* Color Stops */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-foreground">Color Stops ({currentTheme.gradientColors.length})</h4>
          {currentTheme.gradientColors.length < 4 && (
            <button
              onClick={addColorStop}
              className="text-xs px-3 py-1 rounded-full border border-border text-text-secondary hover:text-foreground hover:border-primary/50 transition-colors"
            >
              + Add Stop
            </button>
          )}
        </div>

        <div className="space-y-3">
          {currentTheme.gradientColors.map((color, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="color"
                value={color}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="w-10 h-10 rounded-lg border border-border cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={color}
                onChange={(e) => handleColorChange(i, e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-background border border-border text-sm font-mono text-foreground focus:outline-none focus:border-primary/50"
              />
              {currentTheme.gradientColors.length > 2 && (
                <button
                  onClick={() => removeColorStop(i)}
                  className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Angle Control */}
      <div>
        <div className="flex justify-between mb-2">
          <label className="text-xs font-medium text-text-secondary">Gradient Angle</label>
          <span className="text-xs font-mono text-primary">{currentTheme.gradientAngle}°</span>
        </div>
        <input
          type="range"
          min={0}
          max={360}
          value={currentTheme.gradientAngle}
          onChange={(e) => updateTheme({ gradientAngle: parseInt(e.target.value) })}
          className="w-full accent-primary"
        />
      </div>

      {/* Apply Button */}
      <button
        onClick={() => updateTheme({ backgroundType: "Linear Gradient" })}
        className="w-full py-3 rounded-xl bg-primary text-background font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        Apply This Gradient as Background
      </button>
    </div>
  );
}
