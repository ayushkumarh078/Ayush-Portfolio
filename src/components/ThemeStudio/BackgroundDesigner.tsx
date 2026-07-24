import { useThemeStore } from "@/store/themeStore";
import { motion } from "framer-motion";

const PREMIUM_COLORS = [
  // Dark Blacks & Grays
  { name: "Pure Black", hex: "#000000" },
  { name: "Graphite", hex: "#1c1c1e" },
  { name: "Charcoal", hex: "#27272a" },
  { name: "Iron", hex: "#3f3f46" },
  { name: "Ash", hex: "#52525b" },
  // Blues & Teals
  { name: "Midnight", hex: "#0f172a" },
  { name: "Navy", hex: "#1e3a8a" },
  { name: "Royal Blue", hex: "#1d4ed8" },
  { name: "Deep Ocean", hex: "#083344" },
  { name: "Sky Blue", hex: "#0369a1" },
  { name: "Cyan", hex: "#0891b2" },
  { name: "Teal", hex: "#0f766e" },
  // Greens
  { name: "Emerald", hex: "#059669" },
  { name: "Forest Green", hex: "#14532d" },
  { name: "Lime", hex: "#4d7c0f" },
  { name: "Sage", hex: "#3f6212" },
  // Purples & Pinks
  { name: "Purple", hex: "#7e22ce" },
  { name: "Violet", hex: "#4c1d95" },
  { name: "Indigo", hex: "#3730a3" },
  { name: "Plum", hex: "#6b21a8" },
  { name: "Rose", hex: "#9d174d" },
  { name: "Hot Pink", hex: "#be185d" },
  // Reds & Oranges
  { name: "Crimson", hex: "#be123c" },
  { name: "Burgundy", hex: "#7f1d1d" },
  { name: "Orange", hex: "#c2410c" },
  { name: "Amber", hex: "#d97706" },
  { name: "Gold", hex: "#b45309" },
  // Light & Neutrals
  { name: "White", hex: "#ffffff" },
  { name: "Silver", hex: "#e4e4e7" },
  { name: "Warm Gray", hex: "#d6d3d1" },
  { name: "Sand", hex: "#f3f0e6" },
  { name: "Cream", hex: "#fdfbf7" },
];

const BACKGROUND_TYPES = [
  "Solid", "Linear Gradient", "Radial Gradient", "Animated Gradient",
  "Aurora", "Glass", "Mesh", "Noise", "Starfield", "Minimal Grid", "Abstract Waves"
] as const;

export function BackgroundDesigner() {
  const { currentTheme, updateTheme, setLivePreview } = useThemeStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Background Type Selector */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4">Background Style</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BACKGROUND_TYPES.map((type) => {
            const isActive = currentTheme.backgroundType === type;
            return (
              <button
                key={type}
                onClick={() => updateTheme({ backgroundType: type })}
                onMouseEnter={() => setLivePreview({ backgroundType: type })}
                onMouseLeave={() => setLivePreview(null)}
                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all relative overflow-hidden group ${
                  isActive
                    ? "bg-primary text-background border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)]"
                    : "bg-background border-border text-text-secondary hover:text-foreground hover:border-primary/50"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="bg-type-active"
                    className="absolute inset-0 bg-white/20"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{type}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Premium Color Swatches */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1 flex items-center gap-2">
          Base Color
          <span className="text-xs font-normal text-text-secondary opacity-60 ml-1">Hover to preview · Click to apply</span>
        </h3>
        <div className="flex flex-wrap gap-3 mt-4">
          {PREMIUM_COLORS.map((color) => {
            const isActive = currentTheme.bgColor === color.hex;
            const isLight = color.hex === "#ffffff" || color.hex === "#fdfbf7" || color.hex === "#e4e4e7" || color.hex === "#d6d3d1" || color.hex === "#f3f0e6";
            return (
              <button
                key={color.name}
                onClick={() => updateTheme({ bgColor: color.hex, textPrimary: isLight ? "#111111" : "#ffffff" })}
                onMouseEnter={() => setLivePreview({ bgColor: color.hex, textPrimary: isLight ? "#111111" : "#ffffff" })}
                onMouseLeave={() => setLivePreview(null)}
                className="group relative"
                title={color.name}
              >
                {isActive && (
                  <motion.div
                    layoutId="color-ring"
                    className="absolute -inset-2 rounded-full border-2 border-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <motion.div
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.88 }}
                  className="w-9 h-9 rounded-full border border-white/10 shadow-lg relative z-10 transition-shadow group-hover:shadow-[0_0_16px_4px] group-hover:shadow-current"
                  style={{ backgroundColor: color.hex }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                </motion.div>
              </button>
            );
          })}

          {/* Custom color picker */}
          <div className="relative group" title="Custom Color">
            <motion.label
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.88 }}
              className="w-9 h-9 rounded-full border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer hover:border-primary transition-colors z-10 relative"
              style={{ background: "conic-gradient(red, yellow, lime, cyan, blue, magenta, red)" }}
            >
              <input
                type="color"
                value={currentTheme.bgColor}
                onChange={(e) => updateTheme({ bgColor: e.target.value })}
                className="sr-only"
              />
            </motion.label>
          </div>
        </div>
      </div>

    </div>
  );
}
