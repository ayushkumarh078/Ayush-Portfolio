import { motion } from "framer-motion";
import { Paintbrush, Hexagon, Layers, Bookmark, Settings, Grid } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TABS = [
  { id: "Background", icon: Paintbrush, label: "Background" },
  { id: "Matrix", icon: Grid, label: "Matrix Rain" },
  { id: "Gradient", icon: Layers, label: "Gradient Builder" },
  { id: "Presets", icon: Hexagon, label: "Presets" },
  { id: "Saved", icon: Bookmark, label: "Saved Themes" },
  { id: "Settings", icon: Settings, label: "Advanced Options" },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-background/30 p-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto scrollbar-hide">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium whitespace-nowrap md:whitespace-normal group ${
              isActive ? "text-foreground" : "text-text-secondary hover:text-foreground hover:bg-border/30"
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="sidebar-active"
                className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-xl"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            <Icon size={18} className={`relative z-10 ${isActive ? "text-primary" : "group-hover:text-primary-muted transition-colors"}`} />
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
