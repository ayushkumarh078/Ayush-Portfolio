"use client";
import Image from "next/image";

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505] overflow-hidden">
      {/* 
        Uses the high-res AI generated lab background with a 60-second seamless CSS pan/zoom
        to create the illusion of a cinematic camera slowly moving through the facility.
      */}
      <Image 
        src="/background-lab.png"
        alt="AI Lab Background"
        fill
        priority
        className="object-cover opacity-80 animate-slow-pan will-change-transform"
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
