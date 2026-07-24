"use client";

import { useEffect, useRef } from "react";
import { useThemeStore } from "@/store/themeStore";

const CHAR_SETS: Record<string, string> = {
  Katakana: "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレゲゼデベペオォコソトノホモヨョロゴゾドボポヴッン",
  Binary: "01",
  Hexadecimal: "0123456789ABCDEF",
  Programming: "{}[]()<>/*+-=&|!@#$%^~;:,.?",
  Python: "def class import return lambda yield with self True False None",
  JavaScript: "const let var function => async await class export import",
  React: "</>useState useEffect props children render Fragment key ref",
  Docker: "FROM RUN CMD COPY ENV EXPOSE ARG WORKDIR ENTRYPOINT VOLUME",
  AWS: "EC2 S3 RDS SQS SNS Lambda CloudFront IAM VPC ECS",
  SQL: "SELECT FROM WHERE JOIN GROUP ORDER HAVING INSERT UPDATE DELETE",
  Random: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*",
};

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const themeStore = useThemeStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const activeTheme = themeStore.livePreviewState || themeStore.currentTheme;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Check if matrix is enabled
    if (!activeTheme.matrixEnabled) {
      ctx.clearRect(0, 0, width, height);
      return;
    }

    const matrixColor = activeTheme.matrixColor;
    const charSetKey = activeTheme.matrixCharSet;
    const chars = (CHAR_SETS[charSetKey] || CHAR_SETS.Katakana).split(" ").join("").split("");
    const fontSize = activeTheme.matrixSize;
    const speedMultiplier = activeTheme.matrixSpeed;
    const densityFactor = activeTheme.matrixDensity / 50; // 0 to 2

    const columns = Math.floor((width / fontSize) * densityFactor);
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100;
    }

    let animationFrameId: number;
    let lastTime = 0;
    const fps = 20 * speedMultiplier;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);
      const deltaTime = currentTime - lastTime;

      if (deltaTime > interval) {
        lastTime = currentTime - (deltaTime % interval);

        // Fading trail
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, width, height);

        ctx.fillStyle = matrixColor;
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          const x = (i * width) / columns;
          ctx.fillText(text, x, drops[i] * fontSize);

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
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [
    themeStore.currentTheme.matrixColor,
    themeStore.currentTheme.matrixEnabled,
    themeStore.currentTheme.matrixSpeed,
    themeStore.currentTheme.matrixDensity,
    themeStore.currentTheme.matrixSize,
    themeStore.currentTheme.matrixCharSet,
    themeStore.livePreviewState,
  ]);

  const activeTheme = themeStore.livePreviewState || themeStore.currentTheme;

  // Build the background style based on the backgroundType
  let bgStyle: React.CSSProperties = { backgroundColor: activeTheme.bgColor };

  if (activeTheme.backgroundType === "Linear Gradient") {
    bgStyle = {
      background: `linear-gradient(${activeTheme.gradientAngle}deg, ${activeTheme.gradientColors.join(", ")})`,
    };
  } else if (activeTheme.backgroundType === "Radial Gradient") {
    bgStyle = {
      background: `radial-gradient(circle at center, ${activeTheme.gradientColors.join(", ")})`,
    };
  } else if (activeTheme.backgroundType === "Animated Gradient") {
    bgStyle = {
      background: `linear-gradient(${activeTheme.gradientAngle}deg, ${activeTheme.gradientColors.join(", ")})`,
      backgroundSize: "400% 400%",
      animation: "gradient-shift 8s ease infinite",
    };
  } else if (activeTheme.backgroundType === "Aurora") {
    bgStyle = {
      background: `linear-gradient(135deg, ${activeTheme.bgColor} 0%, ${activeTheme.gradientColors[0] || "#1a1a2e"} 50%, ${activeTheme.gradientColors[1] || "#16213e"} 100%)`,
    };
  } else if (activeTheme.backgroundType === "Mesh") {
    bgStyle = {
      background: `
        radial-gradient(at 40% 20%, ${activeTheme.primaryAccent}33 0px, transparent 50%),
        radial-gradient(at 80% 0%, ${activeTheme.gradientColors[0] || "#7e22ce"}33 0px, transparent 50%),
        radial-gradient(at 0% 50%, ${activeTheme.gradientColors[1] || "#0891b2"}33 0px, transparent 50%),
        ${activeTheme.bgColor}
      `,
    };
  } else if (activeTheme.backgroundType === "Minimal Grid") {
    bgStyle = {
      backgroundColor: activeTheme.bgColor,
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    };
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-700" style={bgStyle}>
      {/* Matrix Rain canvas */}
      {activeTheme.matrixEnabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.35 }}
        />
      )}

      {/* Vignette for readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
        }}
      />
    </div>
  );
}
