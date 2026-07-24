import { useThemeStore } from "@/store/themeStore";
import { getContrastRatio, getWCAGRating } from "@/utils/colorUtils";
import { Undo2, Redo2, Share2, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToolbar() {
  const { currentTheme, undo, redo, historyIndex, history } = useThemeStore();
  const [copied, setCopied] = useState(false);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Calculate contrast dynamically
  const contrastRatio = getContrastRatio(currentTheme.bgColor, currentTheme.textPrimary);
  const wcagRating = getWCAGRating(contrastRatio);

  const handleShare = () => {
    // Basic sharing logic: Base64 encode the theme JSON
    const themeStr = JSON.stringify(currentTheme);
    const encoded = btoa(themeStr);
    const url = `${window.location.origin}?theme=${encoded}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 border-t border-border bg-background/50 flex flex-wrap items-center justify-between gap-4">
      {/* Undo / Redo */}
      <div className="flex items-center gap-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 rounded-lg bg-background border border-border text-foreground disabled:opacity-30 hover:bg-border/50 transition-colors"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 size={16} />
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 rounded-lg bg-background border border-border text-foreground disabled:opacity-30 hover:bg-border/50 transition-colors"
          title="Redo (Ctrl+Y)"
        >
          <Redo2 size={16} />
        </button>
      </div>

      {/* Accessibility Checker */}
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-background border border-border text-sm">
        <span className="text-text-secondary">Contrast:</span>
        <span className="font-mono">{contrastRatio.toFixed(2)}</span>
        {wcagRating === "AAA" && (
          <span className="flex items-center gap-1 text-green-500 bg-green-500/10 px-2 py-0.5 rounded text-xs font-bold">
            <CheckCircle2 size={12} /> AAA
          </span>
        )}
        {wcagRating === "AA" && (
          <span className="flex items-center gap-1 text-yellow-500 bg-yellow-500/10 px-2 py-0.5 rounded text-xs font-bold">
            <AlertTriangle size={12} /> AA
          </span>
        )}
        {wcagRating === "Fail" && (
          <span className="flex items-center gap-1 text-red-500 bg-red-500/10 px-2 py-0.5 rounded text-xs font-bold">
            <XCircle size={12} /> FAIL
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-background font-medium text-sm hover:opacity-90 transition-opacity"
        >
          {copied ? <CheckCircle2 size={16} /> : <Share2 size={16} />}
          {copied ? "Copied Link!" : "Share Theme"}
        </button>
      </div>
    </div>
  );
}
