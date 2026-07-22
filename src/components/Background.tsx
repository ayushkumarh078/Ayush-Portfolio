"use client";

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      {/* 
        Using a standard img tag with a relative path ensures it works 
        on all hosting environments (including GitHub Pages with basePaths)
        without Turbopack or next/image optimization bugs.
      */}
      <img 
        src="./background-lab.png"
        alt="AI Lab Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      
      {/* Very light vignette for text readability */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(5, 5, 5, 0.9) 100%)"
        }} 
      />
    </div>
  );
}
