"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";

function MicrochipCore() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Total number of circuitry pillars around the CPU
  const count = 3000;
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Generate a grid of pillars around a central void (the CPU)
  const instances = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      let x = (Math.random() - 0.5) * 60;
      let z = (Math.random() - 0.5) * 60;
      
      // Leave a 10x10 empty space in the center for the main CPU die
      if (Math.abs(x) < 5 && Math.abs(z) < 5) {
        x = x > 0 ? x + 5 : x - 5;
        z = z > 0 ? z + 5 : z - 5;
      }
      
      const height = Math.random() * 2 + 0.1;
      const scale = Math.random() > 0.9 ? 1.5 : 0.5;
      
      data.push({ x, y: height / 2, z, height, scale, phase: Math.random() * Math.PI * 2 });
    }
    return data;
  }, [count]);

  useEffect(() => {
    if (meshRef.current) {
      instances.forEach((inst, i) => {
        dummy.position.set(inst.x, inst.y, inst.z);
        dummy.scale.set(inst.scale, inst.height, inst.scale);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, instances]);

  useFrame((state, delta) => {
    // Animate camera pulling back and up, starting inside the chip
    const targetZ = 12;
    const targetY = 8;
    
    // Smooth lerp camera outwards for the "coming out of screen" effect
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, delta * 1.5);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, delta * 1.5);
    
    state.camera.lookAt(0, 0, 0);
    
    // Slowly rotate the entire chip structure
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* The Main CPU Die */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[8, 1, 8]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
        {/* Glowing edge ring for the CPU */}
        <lineSegments>
          <edgesGeometry attach="geometry" args={[new THREE.BoxGeometry(8.1, 1.1, 8.1)]} />
          <lineBasicMaterial attach="material" color="#d4af37" linewidth={2} />
        </lineSegments>
      </mesh>

      {/* The glowing CPU core */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[4, 0.1, 4]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>

      {/* Dynamic core lighting */}
      <pointLight position={[0, 4, 0]} color="#d4af37" intensity={50} distance={20} />

      {/* Surrounding Motherboard Circuitry Pillars */}
      <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
        <boxGeometry args={[0.2, 1, 0.2]} />
        <meshStandardMaterial 
          color="#222" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#d4af37"
          emissiveIntensity={0.2}
        />
      </instancedMesh>
      
      {/* Base Motherboard plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#050505" metalness={0.5} roughness={0.8} />
      </mesh>
      
      {/* Grid helper for circuit trace aesthetics */}
      <gridHelper args={[100, 100, "#d4af37", "#111"]} position={[0, 0.01, 0]} />
    </group>
  );
}

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      {/* Start camera practically inside the CPU (y=2, z=2) so it rapidly pulls back to (y=8, z=12) */}
      <Canvas camera={{ position: [0, 2, 2], fov: 60 }}>
        <fog attach="fog" args={["#050505", 15, 40]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#d4af37" />
        <MicrochipCore />
      </Canvas>
      
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at center, transparent 0%, #050505 100%)"
        }} 
      />
    </div>
  );
}
