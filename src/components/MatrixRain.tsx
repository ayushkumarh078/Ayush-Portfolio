"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    // We will use primary colors depending on the theme. 
    // Fallback to green for the true hacker look if dark, or blue/primary for others.
    const isDark = currentTheme === "dark" || currentTheme === "midnight" || currentTheme === "graphite";
    
    // Matrix chars (Katakana + Latin + Numerals)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン";
    const charArray = chars.split("");

    const fontSize = 16;
    const columns = width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // Start at different random negative positions
    }

    const draw = () => {
      // Black background with slight opacity to create the trail effect
      ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, width, height);

      // Set text style
      ctx.fillStyle = isDark ? "#0f0" : "#2563eb"; // Green for dark mode, blue for light mode
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Pick a random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to the top randomly to create a continuous stream
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i]++;
      }
    };

    const intervalId = setInterval(draw, 33); // ~30fps is perfect for Matrix rain

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newColumns = width / fontSize;
      // Adjust drops array length based on new width
      if (drops.length < newColumns) {
        for (let x = drops.length; x < newColumns; x++) {
          drops[x] = Math.random() * -100;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, resolvedTheme]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Gradient masks to blend smoothly with content */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background pointer-events-none" />
    </div>
  );
}
