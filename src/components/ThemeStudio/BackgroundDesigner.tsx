import { useThemeStore } from "@/store/themeStore";
import { motion } from "framer-motion";

const PREMIUM_COLORS = [
  { name: "Pure Black", hex: "#000000" },
  { name: "Graphite", hex: "#1c1c1e" },
  { name: "Midnight", hex: "#0f172a" },
  { name: "Charcoal", hex: "#27272a" },
  { name: "Navy", hex: "#1e3a8a" },
  { name: "Deep Ocean", hex: "#083344" },
  { name: "Cyan", hex: "#0891b2" },
  { name: "Emerald", hex: "#059669" },
  { name: "Forest Green", hex: "#14532d" },
  { name: "Purple", hex: "#7e22ce" },
  { name: "Violet", hex: "#4c1d95" },
  { name: "Crimson", hex: "#be123c" },
  { name: "Burgundy", hex: "#7f1d1d" },
  { name: "Orange", hex: "#c2410c" },
  { name: "Amber", hex: "#d97706" },
  { name: "White", hex: "#ffffff" },
  { name: "Silver", hex: "#e4e4e7" },
  { name: "Warm Gray", hex: "#d6d3d1" },
  { name: "Sand", hex: "#f3f0e6" },
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

      {/* Premium Colors */}
      <div>
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          Base Color 
          <span className="text-xs font-normal text-text-secondary opacity-60">Hover to preview instantly</span>
        </h3>
        <div className="flex flex-wrap gap-4">
          {PREMIUM_COLORS.map((color) => {
            const isActive = currentTheme.bgColor === color.hex;
            
            return (
              <button
                key={color.name}
                onClick={() => updateTheme({ bgColor: color.hex, textPrimary: color.hex === "#ffffff" ? "#000000" : "#ffffff" })}
                onMouseEnter={() => setLivePreview({ bgColor: color.hex, textPrimary: color.hex === "#ffffff" ? "#000000" : "#ffffff" })}
                onMouseLeave={() => setLivePreview(null)}
                className="group relative"
                title={color.name}
              >
                {/* Outer selection ring */}
                {isActive && (
                  <motion.div
                    layoutId="color-ring"
                    className="absolute -inset-2 rounded-full border-2 border-primary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* The Swatch */}
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full border border-white/10 shadow-lg relative z-10 transition-shadow group-hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  style={{ backgroundColor: color.hex }}
                >
                  {/* Subtle inner shadow/highlight for glass effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
