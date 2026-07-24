"use client";

import { useEffect, useRef, useState } from "react";
import { useThemeStore } from "@/store/themeStore";

// The cat is drawn entirely in canvas - no images needed
// It has: blinking eyes, wagging tail, walking paws, ear wiggle, purr text on hover

export default function Cursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -200, y: -200 });
  const posRef = useRef({ x: -200, y: -200 }); // smooth lag position
  const isHoveringRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  const accentColor = useThemeStore((s) => (s.livePreviewState || s.currentTheme).primaryAccent);
  const accentRef = useRef(accentColor);
  accentRef.current = accentColor;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    
    let frame = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      isHoveringRef.current = !!(
        t.tagName === "A" || t.tagName === "BUTTON" ||
        t.closest("a") || t.closest("button")
      );
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    function drawCat(x: number, y: number, accent: string, blinking: boolean, hovering: boolean, walkFrame: number) {
      ctx.save();
      ctx.translate(x, y);

      const scale = hovering ? 1.3 : 1.0;
      ctx.scale(scale, scale);

      // ---- TAIL (behind body) ----
      const tailWag = Math.sin(walkFrame * 0.08) * 18;
      ctx.beginPath();
      ctx.moveTo(8, 2);
      ctx.bezierCurveTo(22, -10 + tailWag, 30, -25 + tailWag * 0.5, 20, -38 + tailWag * 0.8);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.stroke();

      // ---- BODY ----
      ctx.beginPath();
      ctx.ellipse(0, 0, 13, 10, 0, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      // ---- HEAD ----
      ctx.beginPath();
      ctx.arc(0, -16, 10, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.fill();

      // ---- EARS ----
      const earWiggle = Math.sin(walkFrame * 0.12) * 3;
      // Left ear
      ctx.beginPath();
      ctx.moveTo(-8, -24);
      ctx.lineTo(-13 - earWiggle, -36);
      ctx.lineTo(-2, -28);
      ctx.closePath();
      ctx.fillStyle = accent;
      ctx.fill();
      // Right ear
      ctx.beginPath();
      ctx.moveTo(8, -24);
      ctx.lineTo(13 + earWiggle, -36);
      ctx.lineTo(2, -28);
      ctx.closePath();
      ctx.fillStyle = accent;
      ctx.fill();

      // ---- INNER EAR (pink) ----
      ctx.beginPath();
      ctx.moveTo(-8, -25);
      ctx.lineTo(-11 - earWiggle, -33);
      ctx.lineTo(-3, -27);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,150,180,0.7)";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(8, -25);
      ctx.lineTo(11 + earWiggle, -33);
      ctx.lineTo(3, -27);
      ctx.closePath();
      ctx.fillStyle = "rgba(255,150,180,0.7)";
      ctx.fill();

      // ---- EYES ----
      const eyeH = blinking ? 1 : 4;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.ellipse(-4, -17, 3, eyeH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(4, -17, 3, eyeH, 0, 0, Math.PI * 2);
      ctx.fill();

      if (!blinking) {
        // Pupils
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.ellipse(-4, -17, 1.5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.ellipse(4, -17, 1.5, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Eye gleam
        ctx.fillStyle = "rgba(255,255,255,0.8)";
        ctx.beginPath();
        ctx.arc(-3.2, -17.8, 0.7, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(4.8, -17.8, 0.7, 0, Math.PI * 2);
        ctx.fill();
      }

      // ---- NOSE ----
      ctx.fillStyle = "rgba(255,150,180,0.9)";
      ctx.beginPath();
      ctx.arc(0, -13.5, 1.5, 0, Math.PI * 2);
      ctx.fill();

      // ---- WHISKERS ----
      ctx.strokeStyle = "rgba(255,255,255,0.6)";
      ctx.lineWidth = 0.8;
      ctx.lineCap = "round";
      [-1, 0, 1].forEach((i) => {
        ctx.beginPath(); ctx.moveTo(-2, -13 + i * 1.5); ctx.lineTo(-14, -14 + i * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(2, -13 + i * 1.5); ctx.lineTo(14, -14 + i * 2); ctx.stroke();
      });

      // ---- SMILE (on hover) ----
      if (hovering) {
        ctx.beginPath();
        ctx.arc(0, -11, 3, 0.1, Math.PI - 0.1);
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1;
        ctx.stroke();
        // Tiny heart above head
        ctx.save();
        ctx.translate(6, -30);
        ctx.scale(0.4, 0.4);
        ctx.fillStyle = "#ff6b9d";
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.bezierCurveTo(-10, -5, -20, 0, -20, 10);
        ctx.bezierCurveTo(-20, 20, 0, 28, 0, 28);
        ctx.bezierCurveTo(0, 28, 20, 20, 20, 10);
        ctx.bezierCurveTo(20, 0, 10, -5, 0, 5);
        ctx.fill();
        ctx.restore();
      }

      // ---- WALKING PAWS ----
      const paw1 = Math.sin(walkFrame * 0.1) * 4;
      const paw2 = Math.sin(walkFrame * 0.1 + Math.PI) * 4;
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.ellipse(-6, 9 + paw1, 4, 3, 0, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(6, 9 + paw2, 4, 3, 0, 0, Math.PI * 2); ctx.fill();

      ctx.restore();
    }

    function loop() {
      rafId = requestAnimationFrame(loop);
      frame++;

      // Resize canvas to viewport
      if (!canvas) return;
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }

      // Smooth lag following
      const lerp = 0.15;
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * lerp;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * lerp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Blink every ~4 seconds
      const blinking = frame % 240 > 232;

      drawCat(
        posRef.current.x,
        posRef.current.y,
        accentRef.current,
        blinking,
        isHoveringRef.current,
        frame
      );
    }

    loop();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none hidden md:block"
      style={{ zIndex: 99999, width: "100vw", height: "100vh" }}
    />
  );
}
