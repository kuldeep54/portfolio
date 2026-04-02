"use client";

import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Stars, 
  Environment, 
  Float, 
  ContactShadows,
  BakeShadows,
  Detailed
} from '@react-three/drei';
import { DigitalSeed } from './DigitalSeed';
import * as THREE from 'three';

function SceneContent({ progress }: { progress: number }) {
  const { camera } = useThree();
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  // GSAP-like Camera Orbiting based on progress
  useFrame((state) => {
    const angle = progress * Math.PI * 2;
    const distance = 8 + Math.sin(progress * Math.PI) * 2;
    
    // Zoom and Orbit effect
    state.camera.position.x = Math.sin(angle) * distance;
    state.camera.position.z = Math.cos(angle) * distance;
    state.camera.position.y = Math.cos(angle * 0.5) * 3;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#022c22', 5, 20]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#059669" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={2} color="#10b981" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Suspense fallback={null}>
        <DigitalSeed progress={progress} />
        <Environment preset="night" />
        <ContactShadows 
          resolution={1024} 
          scale={20} 
          blur={2.5} 
          opacity={0.4} 
          far={10} 
          color="#064e3b" 
        />
      </Suspense>

      <BakeShadows />
    </>
  );
}

export function Scene3D({ progress }: { progress: number }) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas 
        shadows 
        gl={{ antialias: true, stencil: false, depth: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
