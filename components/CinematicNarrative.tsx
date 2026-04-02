"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { prepareWithSegments, layoutWithLines } from '@chenglou/pretext';
import { personalData } from '@/lib/data';

export function CinematicNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth scroll and reveal values
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const revealProgress = useTransform(smoothProgress, [0.1, 0.6], [0, 1]);
  const yOffset = useTransform(smoothProgress, [0, 1], [100, -100]);

  // Pre-layout the text using Pretext for zero-reflow precision
  const preparedText = useMemo(() => {
    // Adding some "Architectural" flair to the summary for this high-performance stage
    const narrative = `${personalData.summary} I don't just build interfaces; I architect low-latency narratives that push the boundaries of modern web performance. By bypassing standard DOM bottlenecks and optimizing every frame, I ensure digital experiences feel truly alive and weightless.`;
    return prepareWithSegments(narrative, '400 32px "Plus Jakarta Sans"');
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: 800 });
      }
    };

    window.addEventListener('resize', updateDimensions);
    updateDimensions();

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect();
        mouseX.current = e.clientX - rect.left;
        mouseY.current = e.clientY - rect.top;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High DPI Support
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;
    ctx.scale(dpr, dpr);

    let animationFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // 1. Layout lines using Pretext - pure arithmetic, zero reflow
      const maxWidth = dimensions.width * 0.8;
      const lineHeight = 48;
      const { lines } = layoutWithLines(preparedText, maxWidth, lineHeight);

      const startY = 100;
      const progress = revealProgress.get();

      lines.forEach((line, i) => {
        const lineY = startY + i * lineHeight;
        const lineProgress = Math.min(Math.max((progress * lines.length - i), 0), 1);
        
        if (lineProgress <= 0) return;

        // 2. Pro Effect: Magnetic Distortion & Glow
        const dx = mouseX.current - dimensions.width / 2;
        const dy = mouseY.current - lineY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, (200 - dist) / 200);
        
        ctx.save();
        
        // Per-line opacity and slight vertical glide
        ctx.globalAlpha = lineProgress * (0.8 + force * 0.2);
        const xPos = (dimensions.width - line.width) / 2 + (dx * force * 0.05);
        const yPos = lineY + (lineProgress < 1 ? (1 - lineProgress) * 20 : 0);

        // Holographic Glow Trail
        if (force > 0.1) {
          ctx.shadowBlur = 15 * force;
          ctx.shadowColor = 'rgba(59, 130, 246, 0.5)'; // Blue glow
        }

        ctx.font = '400 32px "Plus Jakarta Sans"';
        ctx.fillStyle = force > 0.5 ? 'white' : 'rgba(255, 255, 255, 0.9)';
        
        // Draw the text lines computed by Pretext
        ctx.fillText(line.text.slice(0, Math.floor(line.text.length * lineProgress)), xPos, yPos);
        
        // Decorative underline/trail
        if (lineProgress > 0.9) {
           ctx.beginPath();
           ctx.moveTo(xPos, yPos + 8);
           ctx.lineTo(xPos + (line.width * (lineProgress - 0.9) * 10), yPos + 8);
           ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * force})`;
           ctx.lineWidth = 1;
           ctx.stroke();
        }

        ctx.restore();
      });

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [dimensions, preparedText, revealProgress]);

  return (
    <div ref={containerRef} className="relative w-full min-h-[100vh] flex flex-col items-center justify-center py-32 bg-[#09090B]">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        style={{ y: yOffset }}
        className="relative z-10 w-full max-w-7xl px-6"
      >
        <div className="flex flex-col items-center mb-16">
           <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em]">Engineered Narratives</span>
           </div>
           <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter text-center">
             Architectural <span className="text-gradient">Precision</span>
           </h2>
        </div>

        <canvas 
          ref={canvasRef}
          className="w-full cursor-crosshair"
        />

        <div className="mt-20 flex justify-center opacity-40">
           <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              <span>Optimized with @chenglou/pretext</span>
              <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
              <span>Zero-Reflow Layout Engine</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
