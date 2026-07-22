"use client";

import { useEffect, useRef } from "react";

export default function CinematicBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays automatically on mount, even in low power mode
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      {/* 
        This video element expects a file named 'background.mp4' in your 'public' folder.
        Please generate the video using Runway Gen-3, Luma, or Sora, and place it there!
      */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        poster="/fallback-bg.jpg"
      >
        <source src="/background.mp4" type="video/mp4" />
      </video>
      
      {/* Cinematic Vignette Overlay to blend the video edges and text */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at center, transparent 0%, #050505 100%)"
        }} 
      />
      {/* Slight dark tint to ensure text remains highly readable */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none" />
    </div>
  );
}
