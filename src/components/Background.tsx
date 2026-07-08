"use client";

import { useEffect, useRef } from "react";

export default function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let mode = 0;
    let nextMode = 0;
    let blend = 0;
    let transitioning = false;
    let animId: number;

    // --- RESIZE ---
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initMatrix();
    };

    // --- MATRIX ---
    let mat: { fs: number; chars: string; cols: number; drops: number[] };
    const initMatrix = () => {
      const fs = 15;
      const cols = Math.ceil(canvas.width / fs);
      const drops: number[] = [];
      for (let i = 0; i < cols; i++) drops[i] = Math.random() * -150;
      mat = { fs, chars: "01アイウエカキクケABCDEFabcdef<>{}[]()=+*|;:,.~`", cols, drops };
    };

    const drawMatrix = (alpha: number) => {
      ctx.fillStyle = `rgba(2, 8, 20, 0.06)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${mat.fs}px 'JetBrains Mono', monospace`;
      for (let i = 0; i < mat.cols; i++) {
        const char = mat.chars[Math.floor(Math.random() * mat.chars.length)];
        const x = i * mat.fs;
        const y = mat.drops[i] * mat.fs;
        if (Math.random() > 0.97) ctx.fillStyle = `rgba(220,230,255,${alpha})`;
        else if (Math.random() > 0.85) ctx.fillStyle = `rgba(165,180,252,${alpha * 0.8})`;
        else ctx.fillStyle = `rgba(79,70,229,${alpha * 0.5})`;
        ctx.fillText(char, x, y);
        if (y > canvas.height && Math.random() > 0.97) mat.drops[i] = 0;
        mat.drops[i] += 0.5;
      }
    };

    // --- NEURAL ---
    let neural: { nodes: { x: number; y: number; vx: number; vy: number; r: number; phase: number }[] };
    const initNeural = () => {
      const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000));
      neural = {
        nodes: Array.from({ length: count }, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          r: Math.random() * 2.5 + 1,
          phase: Math.random() * Math.PI * 2,
        })),
      };
    };

    const drawNeural = (alpha: number) => {
      ctx.fillStyle = `rgba(2,8,20,0.12)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const nodes = neural.nodes;
      const maxD = 160;
      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        const pulse = n.r + Math.sin(frame * 0.03 + n.phase) * 1.2;
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulse * 6);
        g.addColorStop(0, `rgba(99,102,241,${alpha * 0.4})`);
        g.addColorStop(1, `rgba(99,102,241,0)`);
        ctx.beginPath(); ctx.arc(n.x, n.y, pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165,180,252,${alpha * 0.9})`; ctx.fill();
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / maxD) * alpha * 0.35})`;
            ctx.lineWidth = 0.8; ctx.stroke();
          }
        }
      }
    };

    // --- STARS ---
    let stars: { list: { x: number; y: number; r: number; phase: number; speed: number }[]; nebula: { x: number; y: number } };
    const initStars = () => {
      stars = {
        list: Array.from({ length: 250 }, () => ({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.8 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.015 + 0.005,
        })),
        nebula: { x: window.innerWidth * 0.6, y: window.innerHeight * 0.4 },
      };
    };

    const drawStars = (alpha: number) => {
      ctx.fillStyle = `rgba(2,8,20,0.18)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const nb = ctx.createRadialGradient(stars.nebula.x, stars.nebula.y, 0, stars.nebula.x, stars.nebula.y, canvas.width * 0.55);
      nb.addColorStop(0, `rgba(88,28,135,${alpha * 0.12})`);
      nb.addColorStop(0.5, `rgba(49,46,129,${alpha * 0.06})`);
      nb.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = nb; ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.list.forEach((s) => {
        const twinkle = 0.4 + 0.6 * Math.sin(frame * s.speed + s.phase);
        const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
        grd.addColorStop(0, `rgba(255,255,255,${alpha * twinkle})`);
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd; ctx.fill();
      });
    };

    const renderMode = (m: number, alpha: number) => {
      if (alpha <= 0) return;
      if (m === 0) drawMatrix(alpha);
      else if (m === 1) drawNeural(alpha);
      else drawStars(alpha);
    };

    const tick = () => {
      frame++;
      renderMode(0, 1);
      animId = requestAnimationFrame(tick);
    };

    resize();
    initNeural();
    initStars();
    tick();
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="bg-canvas"
      className="fixed inset-0 z-[-1] pointer-events-none"
    />
  );
}
