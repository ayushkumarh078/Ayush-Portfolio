"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useMemo } from "react";

function DataTunnel() {
  const ref = useRef<THREE.Points>(null);
  const count = 4000;
  
  // Generate particles in a cylindrical tunnel
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Cylinder radius (from 3 to 12)
      const radius = 3 + Math.random() * 9; 
      const theta = Math.random() * 2 * Math.PI;
      const x = radius * Math.cos(theta);
      const y = radius * Math.sin(theta);
      // Length of tunnel (-150 to 50)
      const z = (Math.random() - 0.5) * 200; 
      
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    
    // Smooth tunnel rotation
    ref.current.rotation.z -= delta * 0.15;
    
    // Move particles towards camera (positive Z) to create "flying out of screen" effect
    const pos = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 2] += delta * 60; // Speed of travel
      if (pos[i * 3 + 2] > 20) {
        // Reset to far back when they pass the camera
        pos[i * 3 + 2] = -180;
      }
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#d4af37" // Gold
          size={0.12}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 0], fov: 90 }}>
        <fog attach="fog" args={["#050505", 10, 100]} />
        <DataTunnel />
      </Canvas>
      
      {/* Vignette overlay to blend edges */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at center, transparent 0%, #050505 100%)"
        }} 
      />
    </div>
  );
}
