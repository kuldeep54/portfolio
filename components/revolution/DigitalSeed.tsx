"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

export function DigitalSeed({ progress }: { progress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const points = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2, 2);
    return geo.attributes.position.array;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.z = time * 0.05;
      
      // Evolution based on scroll progress
      const scale = 1 + Math.sin(progress * Math.PI) * 0.5;
      meshRef.current.scale.set(scale, scale, scale);
    }
    if (coreRef.current) {
      coreRef.current.rotation.x = -time * 0.2;
    }
  });

  return (
    <group>
      {/* The "Constellation" Shell */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial 
          color="#10b981" 
          wireframe 
          transparent 
          opacity={0.3} 
          emissive="#059669" 
          emissiveIntensity={2}
        />
      </mesh>

      {/* The Evolving Core */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial 
            color="#064e3b" 
            speed={3} 
            distort={0.4 + progress * 0.4} 
            radius={1}
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>

      {/* Floating Data Points */}
      <group>
        {Array.from({ length: 20 }).map((_, i) => (
          <mesh key={i} position={[
            Math.sin(i) * 5,
            Math.cos(i) * 5,
            Math.tan(i) * 2
          ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.5} />
          </mesh>
        ))}
      </group>
    </group>
  );
}
