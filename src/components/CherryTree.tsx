"use client";

import { useEffect, useRef } from "react";

interface Petal {
  x: number;
  y: number;
  z: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  tiltAngle: number;
  tiltSpeed: number;
  vx: number;
  vy: number;
  opacity: number;
  wobblePhase: number;
  wobbleSpeed: number;
}

function makePetal(W: number, H: number): Petal {
  const z = Math.random();
  return {
    x: W * 0.05 + Math.random() * W * 0.4,
    y: Math.random() * H * 0.8,
    z,
    size: (2 + Math.random() * 4) * (0.5 + z),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.06,
    tiltAngle: Math.random() * Math.PI * 2,
    tiltSpeed: 0.02 + Math.random() * 0.03,
    vx: 0.8 + Math.random() * 1.5,
    vy: 0.3 + Math.random() * 0.6,
    opacity: 0.3 + z * 0.6,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.015 + Math.random() * 0.025,
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, p: Petal) {
  ctx.save();
  ctx.translate(p.x, p.y);
  ctx.rotate(p.rotation);
  ctx.scale(Math.cos(p.tiltAngle), 1);
  ctx.globalAlpha = p.opacity;

  const b = Math.floor(160 + p.z * 95);
  ctx.fillStyle = `rgb(${b},${b},${b})`;
  ctx.shadowColor = "rgba(255,255,255,0.2)";
  ctx.shadowBlur = p.z * 6;

  const s = p.size;
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.8, -s * 0.7, s, 0, 0, s * 0.5);
  ctx.bezierCurveTo(-s, 0, -s * 0.8, -s * 0.7, 0, -s);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

export function CherryTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let petals: Petal[] = [];
    let W = 0, H = 0;
    let time = 0;

    // ---------- TREE DRAW (fractal, offscreen) ----------
    let treeOffscreen: HTMLCanvasElement | null = null;

    function buildTree(width: number, height: number) {
      const off = document.createElement("canvas");
      off.width = width;
      off.height = height;
      const c = off.getContext("2d");
      if (!c) return off;

      function branch(x: number, y: number, len: number, angle: number, thick: number, depth: number) {
        if (depth === 0 || len < 4) return;
        c!.save();
        c!.translate(x, y);
        c!.rotate(angle);
        c!.strokeStyle = `rgba(255,255,255,${0.15 + (thick / 15) * 0.7})`;
        c!.lineWidth = thick;
        c!.lineCap = "round";
        c!.beginPath();
        c!.moveTo(0, 0);
        c!.lineTo(0, -len);
        c!.stroke();

        const spread = 0.28 + Math.random() * 0.1;
        branch(0, -len, len * 0.72, -spread, thick * 0.68, depth - 1);
        branch(0, -len, len * 0.72, spread, thick * 0.68, depth - 1);
        if (depth > 3) {
          branch(0, -len * 0.6, len * 0.55, (Math.random() - 0.5) * 0.5, thick * 0.55, depth - 2);
        }
        c!.restore();
      }

      const trunkX = width * 0.22;
      const trunkLen = height * 0.32;
      branch(trunkX, height, trunkLen, -0.1, 14, 10);
      return off;
    }

    function init() {
      if (!canvas) return;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      treeOffscreen = buildTree(W, H);
      petals = Array.from({ length: 180 }, () => makePetal(W, H));
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      time++;

      // draw tree
      if (treeOffscreen) ctx.drawImage(treeOffscreen, 0, 0);

      // wind gust
      const gust = Math.sin(time * 0.004) * 1.5;

      // petals
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.wobblePhase += p.wobbleSpeed;
        p.vx += (0.9 + gust - p.vx) * 0.015;
        p.vy += (0.45 - p.vy) * 0.01;
        p.x += p.vx + Math.sin(p.wobblePhase) * 0.6;
        p.y += p.vy + Math.cos(p.wobblePhase * 0.7) * 0.3;
        p.rotation += p.rotationSpeed;
        p.tiltAngle += p.tiltSpeed;

        if (p.x > W + 40 || p.y > H + 40) {
          petals[i] = makePetal(W, H);
          petals[i].x = W * 0.05 + Math.random() * W * 0.3;
          petals[i].y = -10;
        }
        drawPetal(ctx, p);
      }

      // soft mist at bottom
      const mist = ctx.createLinearGradient(0, H * 0.6, 0, H);
      mist.addColorStop(0, "rgba(255,255,255,0)");
      mist.addColorStop(1, `rgba(255,255,255,${0.02 + Math.sin(time * 0.002) * 0.01})`);
      ctx.fillStyle = mist;
      ctx.fillRect(0, 0, W, H);

      raf = requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-70" />
      {/* Blend into page */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/70 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
    </div>
  );
}
