"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useEffect } from "react";

function ServerClusters() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  const serverCount = 300; 
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const servers = useMemo(() => {
    const data = [];
    for (let i = 0; i < serverCount; i++) {
      // Position along the corridor (left and right sides)
      const isLeft = i % 2 === 0;
      const x = isLeft ? -12 - Math.random() * 10 : 12 + Math.random() * 10;
      const z = (Math.random() - 0.5) * 400; // Extremely long corridor
      const y = 8; // Height center
      
      const width = 6;
      const height = 20 + Math.random() * 15; // Massive server racks
      const depth = 6;
      
      data.push({ x, y, z, width, height, depth });
    }
    return data;
  }, []);

  useEffect(() => {
    if (meshRef.current) {
      servers.forEach((s, i) => {
        dummy.position.set(s.x, s.y, s.z);
        dummy.scale.set(s.width, s.height, s.depth);
        dummy.updateMatrix();
        meshRef.current!.setMatrixAt(i, dummy.matrix);
      });
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [dummy, servers]);

  return (
    <group>
      <instancedMesh ref={meshRef} args={[undefined, undefined, serverCount]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} roughness={0.1} />
      </instancedMesh>
    </group>
  );
}

function FiberOptics() {
  const count = 300;
  const lines = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 15,
        y: Math.random() * 15,
        z: (Math.random() - 0.5) * 400,
        speed: 30 + Math.random() * 50,
        length: 5 + Math.random() * 20
      });
    }
    return data;
  }, []);

  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state, delta) => {
    if (!ref.current) return;
    lines.forEach((line, i) => {
      // Data flows towards the camera
      line.z += delta * line.speed;
      if (line.z > 100) line.z = -300;
      
      dummy.position.set(line.x, line.y, line.z);
      dummy.scale.set(0.1, 0.1, line.length);
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry args={[1, 1, 1]} />
      {/* Glowing silver/platinum data streams */}
      <meshBasicMaterial color="#e2e8f0" transparent opacity={0.7} />
    </instancedMesh>
  );
}

function CinematicCamera() {
  useFrame((state, delta) => {
    // Camera moves slowly forward deep into the facility
    state.camera.position.z -= delta * 8;
    
    // Subtle cinematic steadicam drift
    state.camera.position.x = Math.sin(state.clock.elapsedTime * 0.15) * 2;
    state.camera.position.y = 5 + Math.cos(state.clock.elapsedTime * 0.2) * 1.5;
    
    // Infinite loop
    if (state.camera.position.z < -200) {
      state.camera.position.z = 100;
    }
    
    // Always look slightly ahead and down the corridor
    state.camera.lookAt(0, 5, state.camera.position.z - 50);
  });
  return null;
}

export default function CinematicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      <Canvas camera={{ position: [0, 5, 100], fov: 50 }}>
        {/* Deep, thick fog to give massive scale and hide the clipping plane */}
        <fog attach="fog" args={["#020617", 20, 100]} />
        <ambientLight intensity={0.1} />
        {/* Blue/Slate atmospheric lighting */}
        <directionalLight position={[0, 20, -50]} intensity={2} color="#94a3b8" />
        <pointLight position={[0, 10, 0]} intensity={50} color="#cbd5e1" distance={50} />
        
        <ServerClusters />
        <FiberOptics />
        <CinematicCamera />
      </Canvas>
      
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(2, 6, 23, 0.95) 100%)"
        }} 
      />
    </div>
  );
}
