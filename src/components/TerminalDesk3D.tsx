"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Html, Float, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

const techStack = [
  { name: "React", color: "#61DAFB", position: [2.5, 1.5, 0] },
  { name: "Next.js", color: "#FFFFFF", position: [-2.5, 2, -1.5] },
  { name: "TypeScript", color: "#3178C6", position: [0, 3, 2.5] },
  { name: "Node.js", color: "#339933", position: [2, 0.5, -2.5] },
  { name: "Python", color: "#3776AB", position: [-2, 2.5, 2] },
];

function CharacterSetup() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);

  // Animate character
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    
    // Head looks around slightly and follows mouse
    if (headRef.current) {
      headRef.current.rotation.y = Math.sin(t * 0.5) * 0.1 + (state.pointer.x * 0.2);
      headRef.current.rotation.x = Math.sin(t * 0.3) * 0.05 - (state.pointer.y * 0.2);
    }

    // Arms typing animation
    if (leftArmRef.current && rightArmRef.current) {
      leftArmRef.current.position.y = 0.5 + Math.sin(t * 15) * 0.02;
      rightArmRef.current.position.y = 0.5 + Math.cos(t * 15) * 0.02;
    }

    // Slow orbit of the entire setup
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.1) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* --- THE DESK --- */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.1} metalness={0.8} />
      </mesh>
      
      {/* Desk Legs */}
      {[[-1.8, -0.4, -0.8], [1.8, -0.4, -0.8], [-1.8, -0.4, 0.8], [1.8, -0.4, 0.8]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 1.6, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* --- THE LAPTOP --- */}
      <group position={[0, 0.5, 0.2]}>
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[1, 0.05, 0.7]} />
          <meshStandardMaterial color="#2d2d2d" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.3, -0.3]} rotation={[-0.1, 0, 0]} castShadow>
          <boxGeometry args={[1, 0.7, 0.05]} />
          <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Glowing Screen */}
        <mesh position={[0, 0.3, -0.27]} rotation={[-0.1, 0, 0]}>
          <planeGeometry args={[0.9, 0.6]} />
          <meshBasicMaterial color="#00ff41" transparent opacity={0.8} />
        </mesh>
      </group>

      {/* --- THE CHAIR --- */}
      <mesh position={[0, -0.2, 1.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.7, 1.2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.8} />
      </mesh>

      {/* --- THE 3D CHARACTER --- */}
      <group position={[0, 0.4, 1.2]}>
        {/* Torso */}
        <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.6, 0.7, 0.4]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.4} /> {/* Indigo shirt */}
        </mesh>

        {/* Head */}
        <mesh ref={headRef} position={[0, 0.95, 0]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#fcd34d" roughness={0.3} /> {/* Skin tone */}
          {/* Glowing Eyes */}
          <mesh position={[-0.1, 0.05, 0.21]}>
            <boxGeometry args={[0.08, 0.08, 0.01]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.1, 0.05, 0.21]}>
            <boxGeometry args={[0.08, 0.08, 0.01]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </mesh>

        {/* Left Arm */}
        <mesh ref={leftArmRef} position={[-0.4, 0.4, -0.2]} rotation={[1.5, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.4} />
        </mesh>

        {/* Right Arm */}
        <mesh ref={rightArmRef} position={[0.4, 0.4, -0.2]} rotation={[1.5, 0, 0]} castShadow>
          <boxGeometry args={[0.15, 0.5, 0.15]} />
          <meshStandardMaterial color="#3b82f6" roughness={0.4} />
        </mesh>

        {/* Legs */}
        <mesh position={[-0.15, -0.2, 0.2]} rotation={[-1.5, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.6} /> {/* Dark pants */}
        </mesh>
        <mesh position={[0.15, -0.2, 0.2]} rotation={[-1.5, 0, 0]} castShadow>
          <boxGeometry args={[0.2, 0.5, 0.2]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.6} />
        </mesh>
      </group>

      {/* Floating Tech Stack Orbits */}
      {techStack.map((tech) => (
        <Float key={tech.name} speed={2} rotationIntensity={1} floatIntensity={2} position={tech.position as [number, number, number]}>
          <mesh castShadow>
            <octahedronGeometry args={[0.25]} />
            <meshStandardMaterial color={tech.color} wireframe />
          </mesh>
          <Html center distanceFactor={12}>
            <div className="px-3 py-1.5 bg-background/90 backdrop-blur-md border border-border rounded-lg text-sm font-mono font-bold text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.3)] whitespace-nowrap">
              {tech.name}
            </div>
          </Html>
        </Float>
      ))}

      {/* Cool Background Hologram Feature */}
      <Float speed={1} rotationIntensity={2} floatIntensity={0} position={[0, 1.5, -1.5]}>
        <mesh>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.3} wireframe />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={-2} floatIntensity={0} position={[0, 1.5, -1.5]}>
        <mesh>
          <torusGeometry args={[1.2, 0.02, 16, 100]} />
          <meshBasicMaterial color="#d4af37" transparent opacity={0.3} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

export function TerminalDesk3D() {
  return (
    <div className="w-full h-[500px] lg:h-[600px] relative rounded-3xl overflow-hidden border border-white/5 bg-background/20 backdrop-blur-sm cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 1.5, 6], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[5, 8, 5]} angle={0.4} penumbra={1} intensity={2.5} castShadow shadow-mapSize={1024} />
        <pointLight position={[-5, 5, -5]} intensity={1.5} color="#6366f1" />
        
        <CharacterSetup />
        
        {/* Hyper-realistic environment reflections */}
        <Environment preset="city" />
        
        {/* Soft contact shadows on the "floor" */}
        <ContactShadows position={[0, -1.5, 0]} opacity={0.7} scale={15} blur={2} far={4} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.1}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
        />
      </Canvas>
      
      {/* Overlay gradient to blend with the page */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background via-transparent to-transparent" />
    </div>
  );
}
