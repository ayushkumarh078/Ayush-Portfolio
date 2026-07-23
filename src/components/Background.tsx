"use client";

import { useEffect, useRef } from "react";

export default function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Force play on mobile/low-power devices
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-background">
      {/*
        IMPORTANT: Drop your generated video file (background.mp4) into
        the /public folder. The video should be an 8-second seamless loop
        of a macro cinematic motherboard shot.
      */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.75 }}
      >
        <source src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/background.mp4`} type="video/mp4" />
      </video>

      {/* Cinematic dark vignette so text stays readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 0%, rgba(2,6,23,0.6) 100%)",
        }}
      />

      {/* Top and bottom cinematic letterbox fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(2,6,23,0.85) 0%, transparent 15%, transparent 85%, rgba(2,6,23,0.95) 100%)",
        }}
      />
    </div>
  );
}
