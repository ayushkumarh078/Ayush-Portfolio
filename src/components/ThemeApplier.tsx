"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

export function ThemeApplier() {
  const currentTheme = useThemeStore((state) => state.currentTheme);
  const livePreviewState = useThemeStore((state) => state.livePreviewState);
  const loadTheme = useThemeStore((state) => state.loadTheme);

  // Active theme for live preview
  const activeTheme = livePreviewState || currentTheme;

  // On mount: check if there's a ?theme=... URL param to import
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("theme");
    if (encoded) {
      try {
        const decoded = JSON.parse(atob(encoded));
        loadTheme(decoded);
        // Clean URL
        window.history.replaceState({}, "", window.location.pathname);
      } catch {
        console.warn("Failed to decode theme from URL");
      }
    }
  }, []);

  // Apply the active theme's colors to CSS variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--bg-primary", activeTheme.bgColor);
    root.style.setProperty("--text-primary", activeTheme.textPrimary);
    root.style.setProperty("--text-secondary", activeTheme.textSecondary);
    root.style.setProperty("--primary", activeTheme.primaryAccent);
    root.style.setProperty("--primary-muted", activeTheme.primaryAccent);
    root.style.setProperty("--border", `rgba(255, 255, 255, ${activeTheme.borderGlow})`);

    // Also update body background directly for smooth transitions
    document.body.style.background = "transparent";
  }, [activeTheme]);

  return null;
}
