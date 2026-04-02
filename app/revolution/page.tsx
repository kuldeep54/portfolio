"use client";

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useSpring } from 'framer-motion';

// Dynamic Import with No SSR to prevent the R3F/Scheduler crash during pre-rendering
const Scene3D = dynamic(() => import('@/components/revolution/Scene3D').then(mod => mod.Scene3D), { 
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#020617] flex items-center justify-center text-emerald-400 font-black tracking-widest animate-pulse">ESTABLISHING SYNAPSE...</div>
});

const HUD = dynamic(() => import('@/components/revolution/HUD').then(mod => mod.HUD), { ssr: false });

export default function RevolutionPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Use a spring to smooth out the transition for the 3D scene
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsubscribe = smoothProgress.on("change", (latest) => {
      setProgress(latest);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  return (
    <main className="bg-[#020617] text-white">
      {/* 1. Immersive WebGL Scene (Client-Only) */}
      <Scene3D progress={progress} />

      {/* 2. Cinematic HUD Layer (Client-Only) */}
      <HUD progress={progress} />

      {/* 3. The Scroll Container (Determines the narrative length) */}
      <div ref={containerRef} className="h-[800vh] relative z-20 pointer-events-none">
        {/* Invisible sections to guide the user's scroll depth */}
        <section id="genesis" className="h-[200vh]" />
        <section id="synthesis" className="h-[200vh]" />
        <section id="constellation" className="h-[200vh]" />
        <section id="transmission" className="h-[200vh]" />
      </div>

      {/* 4. Scroll Soundscape Placeholder (Silent but visual hint) */}
      <div className="fixed bottom-12 left-12 z-40 flex items-center gap-4 opacity-20 hover:opacity-100 transition-opacity">
        <div className="flex items-end gap-1">
          {[0.2, 0.4, 0.8, 0.4, 0.2].map((h, i) => (
             <div 
              key={i} 
              className="w-[2px] bg-emerald-400/50 animate-pulse" 
              style={{ height: `${h * 20}px`, animationDelay: `${i * 0.2}s` }}
             />
          ))}
        </div>
        <span className="text-[8px] font-black tracking-[0.4em] uppercase text-emerald-400/50">Digital Atmosphere Active</span>
      </div>
    </main>
  );
}
