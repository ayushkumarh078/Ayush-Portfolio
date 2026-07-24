"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function CherryTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let leaves: Leaf[] = [];
    
    // Determine colors based on theme (highly contrasted monochrome values to make it look elegant)
    const currentTheme = theme === 'system' ? resolvedTheme : theme;
    const isDark = currentTheme === "dark" || currentTheme === "midnight" || currentTheme === "graphite";
    
    const treeColor = isDark ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)";
    const leafColor = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6)";

    class Leaf {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      angle: number;
      spin: number;
      opacity: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 + 1; // Blow to the right
        this.speedY = Math.random() * 1 + 0.5; // Fall down
        this.angle = Math.random() * 360;
        this.spin = (Math.random() - 0.5) * 0.1;
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.speedX + Math.sin(this.angle) * 0.5;
        this.y += this.speedY;
        this.angle += this.spin;

        // Reset leaf if it goes off screen
        if (this.x > canvas!.width || this.y > canvas!.height) {
          this.x = canvas!.width * 0.1 + (Math.random() * canvas!.width * 0.2); // Start near tree
          this.y = Math.random() * canvas!.height * 0.5; // Start high
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = leafColor;
        
        // Draw a simple petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const initTree = () => {
      if (!ctx || !canvas) return;
      
      // Offscreen canvas for the static tree
      const offscreen = document.createElement("canvas");
      offscreen.width = canvas.width;
      offscreen.height = canvas.height;
      const offCtx = offscreen.getContext("2d");
      
      if (offCtx) {
        const startX = canvas.width * 0.15;
        const startY = canvas.height;
        
        const drawBranchOffscreen = (x: number, y: number, len: number, angle: number, branchWidth: number) => {
          offCtx.beginPath();
          offCtx.save();
          offCtx.strokeStyle = treeColor;
          offCtx.fillStyle = treeColor;
          offCtx.lineWidth = branchWidth;
          offCtx.translate(x, y);
          offCtx.rotate(angle * Math.PI / 180);
          offCtx.moveTo(0, 0);
          offCtx.lineTo(0, -len);
          offCtx.stroke();

          if (len < 10) {
            offCtx.restore();
            return;
          }

          drawBranchOffscreen(0, -len, len * 0.75, angle + (Math.random() * 20 + 5), branchWidth * 0.7);
          drawBranchOffscreen(0, -len, len * 0.75, angle - (Math.random() * 20 + 5), branchWidth * 0.7);
          
          offCtx.restore();
        };

        drawBranchOffscreen(startX, startY, canvas.height * 0.25, 10, 15);
      }

      // Initialize initial leaves
      leaves = [];
      for (let i = 0; i < 150; i++) {
        const startX = canvas.width * 0.1 + (Math.random() * canvas.width * 0.3);
        const startY = Math.random() * canvas.height * 0.6;
        leaves.push(new Leaf(startX, startY));
      }
      
      return offscreen;
    };

    let treeCanvas = initTree();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      treeCanvas = initTree();
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial setup

    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the cached tree
      if (treeCanvas) {
        ctx.drawImage(treeCanvas, 0, 0);
      }

      // Update and draw leaves
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, resolvedTheme]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full opacity-60" />
      {/* Gradient mask to blend smoothly with content */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/50 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none" />
    </div>
  );
}
