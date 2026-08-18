"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";
import { getContrastRatio } from "@/utils/colorUtils";

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

    // Cursor visibility logic: determine the highest contrast cursor color based on background
    const accentContrast = getContrastRatio(activeTheme.bgColor, activeTheme.primaryAccent);
    
    let cursorColor = activeTheme.primaryAccent;
    let cursorBorder = "rgba(255,255,255,0.8)";

    // If the accent color blends into the background, use a pure contrast color
    if (accentContrast < 3.0) {
      const whiteContrast = getContrastRatio(activeTheme.bgColor, "#ffffff");
      const blackContrast = getContrastRatio(activeTheme.bgColor, "#000000");
      if (whiteContrast > blackContrast) {
        cursorColor = "#ffffff";
        cursorBorder = activeTheme.primaryAccent; // use accent as the border instead
      } else {
        cursorColor = "#000000";
        cursorBorder = activeTheme.primaryAccent;
      }
    } else {
      // If accent is visible, pick a highly visible border
      const whiteContrastWithBg = getContrastRatio(activeTheme.bgColor, "#ffffff");
      cursorBorder = whiteContrastWithBg > 3 ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.5)";
    }

    root.style.setProperty("--cursor-color", cursorColor);
    root.style.setProperty("--cursor-border", cursorBorder);

    // Also update body background directly for smooth transitions
    document.body.style.background = "transparent";
  }, [activeTheme]);

  return null;
}
