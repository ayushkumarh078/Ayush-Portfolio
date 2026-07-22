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
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505] overflow-hidden">
      {/* 
        Uses the high-res AI generated lab background with a 60-second seamless CSS pan/zoom
        to create the illusion of a cinematic camera slowly moving through the facility.
      */}
      <div 
        className="absolute inset-0 w-full h-full opacity-50 animate-slow-pan will-change-transform"
        style={{
          backgroundImage: "url('/background-lab.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
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
