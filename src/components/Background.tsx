"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export default function Background() {
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
    
    let textColor = "rgba(255, 255, 255, 0.8)";
    let bgColor = "rgba(0, 0, 0, 0.05)";

    if (currentTheme === "light") {
      textColor = "rgba(0, 0, 0, 0.8)";
      bgColor = "rgba(255, 255, 255, 0.05)";
    } else if (currentTheme === "midnight") {
      textColor = "rgba(99, 102, 241, 0.8)"; // Indigo/Cyan
      bgColor = "rgba(10, 10, 25, 0.05)";
    } else if (currentTheme === "graphite") {
      textColor = "rgba(255, 180, 50, 0.8)"; // Amber/Orange
      bgColor = "rgba(20, 20, 20, 0.05)";
    } else {
      // Default dark theme (White matrix as requested previously)
      textColor = "rgba(255, 255, 255, 0.8)";
      bgColor = "rgba(0, 0, 0, 0.05)";
    }

    // Matrix chars (Katakana + Latin + Numerals)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン";
    const charArray = chars.split("");

    const fontSize = 16;
    const columns = width / fontSize;
    const drops: number[] = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; 
    }

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);

        // Background with slight opacity to create the trail effect
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);

        // Set text style
        ctx.fillStyle = textColor;
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = charArray[Math.floor(Math.random() * charArray.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      }
    };

    animationFrameId = requestAnimationFrame(draw);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      const newColumns = width / fontSize;
      if (drops.length < newColumns) {
        for (let x = drops.length; x < newColumns; x++) {
          drops[x] = Math.random() * -100;
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme, resolvedTheme]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-background transition-colors duration-500">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-30"
      />
      
      {/* Cinematic dark vignette so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, var(--background) 100%)",
          opacity: 0.9
        }}
      />
    </div>
  );
}
