"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const techStack = [
  { name: "React", color: "#61DAFB", position: [2, 1, 0] },
  { name: "Next.js", color: "#FFFFFF", position: [-2, 1.5, -1] },
  { name: "TypeScript", color: "#3178C6", position: [0, 2.5, 2] },
  { name: "Node.js", color: "#339933", position: [1.5, 0.5, -2] },
  { name: "Python", color: "#3776AB", position: [-1.5, 2, 1.5] },
];

function DeskSetup() {
  const groupRef = useRef<THREE.Group>(null);

  // Slowly rotate the entire desk setup
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Table Top */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 0.2, 3]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Table Legs */}
      {[[-2.3, -1.1, -1.3], [2.3, -1.1, -1.3], [-2.3, -1.1, 1.3], [2.3, -1.1, 1.3]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Laptop Base */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.05, 0.8]} />
        <meshStandardMaterial color="#2d2d2d" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Laptop Screen */}
      <group position={[0, 0.075, -0.35]} rotation={[-0.2, 0, 0]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[1.2, 0.8, 0.05]} />
          <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.1} />
        </mesh>
        
        {/* Glowing Screen Content */}
        <mesh position={[0, 0.4, 0.026]}>
          <planeGeometry args={[1.1, 0.7]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* Coffee Mug */}
      <mesh position={[1.5, 0.2, 0.5]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.1} />
      </mesh>

      {/* Keyboard glow */}
      <mesh position={[0, 0.08, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 0.4]} />
        <meshBasicMaterial color="#00ff41" transparent opacity={0.2} />
      </mesh>

      {/* Floating Tech Stack Orbits */}
      {techStack.map((tech, index) => (
        <Float key={tech.name} speed={2} rotationIntensity={1} floatIntensity={2} position={tech.position as [number, number, number]}>
          <mesh castShadow>
            <octahedronGeometry args={[0.2]} />
            <meshStandardMaterial color={tech.color} wireframe />
          </mesh>
          <Html center distanceFactor={10}>
            <div className="px-2 py-1 bg-background/80 backdrop-blur-sm border border-border rounded-md text-xs font-mono font-bold text-primary whitespace-nowrap">
              {tech.name}
            </div>
          </Html>
        </Float>
      ))}
    </group>
  );
}

export function TerminalDesk3D() {
  return (
    <div className="w-full h-[500px] lg:h-[600px] relative rounded-3xl overflow-hidden border border-white/5 bg-background/20 backdrop-blur-sm">
      <Canvas shadows camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow shadow-mapSize={1024} />
        <pointLight position={[-5, 5, -5]} intensity={1} color="#6366f1" />
        
        <DeskSetup />
        
        {/* Hyper-realistic environment reflections */}
        <Environment preset="city" />
        
        {/* Soft contact shadows on the "floor" */}
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      
      {/* Overlay gradient to blend with the page */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}
