"use client";

import { useState } from "react";
import { useThemeStore, defaultThemeState } from "@/store/themeStore";
import { Trash2, Star, Copy } from "lucide-react";

export function SavedThemes() {
  const { savedThemes, currentTheme, saveTheme, loadTheme, deleteSavedTheme } = useThemeStore();
  const [newName, setNewName] = useState(currentTheme.name);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h3 className="text-lg font-bold text-foreground mb-1">Saved Themes</h3>
        <p className="text-xs text-text-secondary opacity-60">Save and reload your custom combinations</p>
      </div>

      {/* Save Current */}
      <div className="rounded-2xl border border-border bg-border/20 p-5">
        <p className="text-sm font-semibold text-foreground mb-3">Save Current Theme</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Theme Name..."
            className="flex-1 px-4 py-2 rounded-xl bg-background border border-border text-sm text-foreground placeholder-text-secondary focus:outline-none focus:border-primary/60"
          />
          <button
            onClick={() => { if (newName.trim()) saveTheme(newName.trim()); }}
            className="px-4 py-2 rounded-xl bg-primary text-background text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      </div>

      {/* Saved Theme List */}
      {savedThemes.length === 0 ? (
        <div className="text-center py-12 text-text-secondary opacity-40">
          <Star size={32} className="mx-auto mb-3" />
          <p className="text-sm">No saved themes yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedThemes.map((t) => (
            <div
              key={t.name}
              className="flex items-center gap-3 p-4 rounded-xl border border-border bg-border/20 hover:bg-border/40 transition-colors group"
            >
              <div
                className="w-10 h-10 rounded-lg border border-white/10 shrink-0"
                style={{ backgroundColor: t.bgColor }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{t.name}</p>
                <p className="text-xs font-mono text-text-secondary opacity-60 truncate">{t.bgColor} · {t.primaryAccent}</p>
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => loadTheme(t)}
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs"
                  title="Load this theme"
                >
                  Load
                </button>
                <button
                  onClick={() => deleteSavedTheme(t.name)}
                  className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reset to Default */}
      <button
        onClick={() => loadTheme(defaultThemeState)}
        className="w-full py-3 rounded-xl border border-border text-text-secondary hover:text-foreground hover:border-primary/30 transition-colors text-sm font-medium"
      >
        Reset to Default Theme
      </button>
    </div>
  );
}
