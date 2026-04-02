"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { prepareWithSegments, layoutNextLine, LayoutCursor } from '@chenglou/pretext';

export default function DragonDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  const text = "UNLEASHING HIGH PERFORMANCE ARCHITECTURAL PRECISION ZERO REFLOW NARRATIVES";
  const words = useMemo(() => text.split(' '), [text]);
  const font = '900 48px "Plus Jakarta Sans"';
  
  // Dragon Physics State
  const segments = useRef(words.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 })));

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const updateSize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    // Initialize segments at center
    segments.current.forEach(s => {
      s.x = window.innerWidth / 2;
      s.y = window.innerHeight / 2;
    });

    let frame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      // Physics Update
      for (let i = 0; i < segments.current.length; i++) {
        const s = segments.current[i]!;
        const targetX = i === 0 ? mouse.current.x : segments.current[i - 1]!.x;
        const targetY = i === 0 ? mouse.current.y : segments.current[i - 1]!.y;

        // Spring physics
        const dx = targetX - s.x;
        const dy = targetY - s.y;
        
        // Follow distance
        const angle = Math.atan2(dy, dx);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = i === 0 ? 0 : 60; // Space between words

        if (dist > minDist) {
           s.x += Math.cos(angle) * (dist - minDist) * 0.2;
           s.y += Math.sin(angle) * (dist - minDist) * 0.2;
        }

        // Draw Word
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(angle);
        
        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Dragon Glow
        const hue = (Date.now() / 20 + i * 20) % 360;
        ctx.shadowBlur = 20;
        ctx.shadowColor = `hsla(${hue}, 70%, 50%, 0.5)`;
        ctx.fillStyle = `hsla(${hue}, 80%, 60%, ${1 - i/segments.current.length})`;
        
        ctx.fillText(words[i]!, 0, 0);
        
        // Add "Scales" effect
        if (i > 0) {
           ctx.beginPath();
           ctx.moveTo(-30, 0);
           ctx.lineTo(30, 0);
           ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - i/words.length)})`;
           ctx.lineWidth = 2;
           ctx.stroke();
        }

        ctx.restore();
      }

      frame = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateSize);
    };
  }, [words]);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-screen bg-[#060608] flex flex-col items-center justify-center overflow-hidden cursor-crosshair"
      onMouseMove={(e) => {
         mouse.current = { x: e.clientX, y: e.clientY };
      }}
    >
      <div className="absolute top-12 left-12 z-20 pointer-events-none">
        <h1 className="text-5xl font-black text-white mb-4 tracking-tighter mix-blend-difference">TYPOGRAPHIC <span className="text-gradient">DRAGON</span></h1>
        <p className="text-muted-foreground max-w-sm uppercase text-[10px] tracking-[0.4em]">Interactive Phsyics Engine • Pretext Measurement • 60FPS</p>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#060608_100%)] pointer-events-none" />
      
      <canvas ref={canvasRef} />
      
      <div className="absolute bottom-12 text-center pointer-events-none opacity-30">
         <p className="text-white text-xs font-bold tracking-[0.5em] uppercase animate-pulse">Lead the beast through the narrative void</p>
      </div>
    </div>
  );
}
