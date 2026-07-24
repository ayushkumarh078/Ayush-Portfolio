"use client";

import { useEffect, useRef, useState } from "react";

// --- Petal Physics Constants ---
const PETAL_COUNT = 200;
const WIND_BASE_X = 1.2;
const WIND_GUST_STRENGTH = 2.5;
const WIND_GUST_FREQUENCY = 0.003;
const GRAVITY = 0.15;
const TURBULENCE = 0.4;

interface Petal {
  x: number;
  y: number;
  z: number; // depth (0 = far, 1 = close)
  size: number;
  rotation: number;
  rotationSpeed: number;
  tiltAngle: number;
  tiltSpeed: number;
  velocityX: number;
  velocityY: number;
  opacity: number;
  wobblePhase: number;
  wobbleSpeed: number;
  wobbleAmplitude: number;
}

function createPetal(canvasWidth: number, canvasHeight: number, fromTree: boolean): Petal {
  const z = Math.random(); // 0 = far background, 1 = close to camera
  const sizeMultiplier = 0.5 + z * 1.5; // far petals are smaller

  if (fromTree) {
    // Spawn from the tree area (left-center of the image)
    return {
      x: canvasWidth * (0.2 + Math.random() * 0.25),
      y: canvasHeight * (0.1 + Math.random() * 0.5),
      z,
      size: (3 + Math.random() * 5) * sizeMultiplier,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.08,
      tiltAngle: Math.random() * Math.PI * 2,
      tiltSpeed: 0.02 + Math.random() * 0.04,
      velocityX: WIND_BASE_X * (0.3 + Math.random() * 0.7),
      velocityY: 0.2 + Math.random() * 0.5,
      opacity: 0.4 + z * 0.5,
      wobblePhase: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.02 + Math.random() * 0.03,
      wobbleAmplitude: 15 + Math.random() * 30,
    };
  }

  // Random respawn across the scene
  return {
    x: -20 + Math.random() * canvasWidth * 0.3,
    y: -20 + Math.random() * canvasHeight * 0.3,
    z,
    size: (3 + Math.random() * 5) * sizeMultiplier,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.08,
    tiltAngle: Math.random() * Math.PI * 2,
    tiltSpeed: 0.02 + Math.random() * 0.04,
    velocityX: WIND_BASE_X * (0.3 + Math.random() * 0.7),
    velocityY: 0.2 + Math.random() * 0.5,
    opacity: 0.4 + z * 0.5,
    wobblePhase: Math.random() * Math.PI * 2,
    wobbleSpeed: 0.02 + Math.random() * 0.03,
    wobbleAmplitude: 15 + Math.random() * 30,
  };
}

function drawPetal(ctx: CanvasRenderingContext2D, petal: Petal) {
  ctx.save();
  ctx.translate(petal.x, petal.y);
  ctx.rotate(petal.rotation);

  // 3D tilt simulation
  const scaleX = Math.cos(petal.tiltAngle);
  ctx.scale(scaleX, 1);

  ctx.globalAlpha = petal.opacity;

  // Draw a realistic cherry petal shape
  const s = petal.size;
  const brightness = 180 + Math.floor(petal.z * 75); // whiter when closer
  ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
  ctx.shadowColor = `rgba(255, 255, 255, 0.15)`;
  ctx.shadowBlur = petal.z * 4;

  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.8, -s * 0.8, s, -s * 0.1, s * 0.2, s * 0.3);
  ctx.bezierCurveTo(s * 0.1, s * 0.6, -s * 0.1, s * 0.6, -s * 0.2, s * 0.3);
  ctx.bezierCurveTo(-s, -s * 0.1, -s * 0.8, -s * 0.8, 0, -s);
  ctx.closePath();
  ctx.fill();

  // Subtle vein line
  ctx.strokeStyle = `rgba(${brightness - 30}, ${brightness - 30}, ${brightness - 30}, 0.3)`;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.8);
  ctx.lineTo(0, s * 0.2);
  ctx.stroke();

  ctx.restore();
}

export function CherryTree() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petalsRef = useRef<Petal[]>([]);
  const frameRef = useRef<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = "/cherry-tree.jpg";
    img.onload = () => {
      imageRef.current = img;
      setImageLoaded(true);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageLoaded) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Reinitialize petals on resize
      petalsRef.current = [];
      for (let i = 0; i < PETAL_COUNT; i++) {
        petalsRef.current.push(createPetal(canvas.width, canvas.height, true));
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      if (!ctx || !canvas) return;
      time++;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Draw the photorealistic tree image as background ---
      if (imageRef.current) {
        const img = imageRef.current;
        const imgAspect = img.width / img.height;
        const canvasAspect = canvas.width / canvas.height;

        let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

        if (canvasAspect > imgAspect) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgAspect;
          drawX = 0;
          drawY = (canvas.height - drawHeight) / 2;
        } else {
          drawHeight = canvas.height;
          drawWidth = canvas.height * imgAspect;
          drawX = (canvas.width - drawWidth) / 2;
          drawY = 0;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }

      // --- Compute wind with gusts ---
      const gustPhase = Math.sin(time * WIND_GUST_FREQUENCY) * 0.5 + 0.5;
      const gustX = WIND_GUST_STRENGTH * gustPhase * Math.sin(time * 0.01);
      const currentWindX = WIND_BASE_X + gustX;
      const currentWindY = 0.3 * Math.sin(time * 0.005);

      // --- Update and draw each petal ---
      const petals = petalsRef.current;
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];

        // Wind effect scaled by depth (close petals move more)
        const depthWindScale = 0.4 + p.z * 0.6;

        // Wobble (sinusoidal lateral drift)
        p.wobblePhase += p.wobbleSpeed;
        const wobble = Math.sin(p.wobblePhase) * p.wobbleAmplitude * 0.02;

        // Turbulence (small random forces)
        const turbX = (Math.random() - 0.5) * TURBULENCE;
        const turbY = (Math.random() - 0.5) * TURBULENCE * 0.3;

        // Apply forces
        p.velocityX += (currentWindX * depthWindScale + wobble + turbX - p.velocityX) * 0.02;
        p.velocityY += (GRAVITY + currentWindY + turbY - p.velocityY) * 0.02;

        p.x += p.velocityX;
        p.y += p.velocityY;

        // Rotation and tilt
        p.rotation += p.rotationSpeed;
        p.tiltAngle += p.tiltSpeed;

        // Respawn if off-screen
        if (p.x > canvas.width + 50 || p.y > canvas.height + 50 || p.x < -100) {
          petals[i] = createPetal(canvas.width, canvas.height, Math.random() > 0.3);
        }

        drawPetal(ctx, p);
      }

      // --- Soft mist effect ---
      const mistOpacity = 0.03 + Math.sin(time * 0.002) * 0.015;
      const mistGrad = ctx.createLinearGradient(0, canvas.height * 0.5, 0, canvas.height);
      mistGrad.addColorStop(0, `rgba(200, 200, 200, 0)`);
      mistGrad.addColorStop(0.5, `rgba(200, 200, 200, ${mistOpacity})`);
      mistGrad.addColorStop(1, `rgba(200, 200, 200, ${mistOpacity * 2})`);
      ctx.fillStyle = mistGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [imageLoaded]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Gradient overlays to blend with page content */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-background/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background/30 pointer-events-none" />
    </div>
  );
}
