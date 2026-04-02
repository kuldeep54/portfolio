"use client";

import React, { useRef, useEffect, useMemo } from 'react';

export function DragonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  const text = "UNLEASHING HIGH PERFORMANCE ARCHITECTURAL PRECISION ZERO REFLOW NARRATIVES";
  const words = useMemo(() => text.split(' '), [text]);
  const font = '900 32px "Plus Jakarta Sans"';
  
  const segments = useRef(words.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 })));

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const updateSize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth * dpr;
        canvas.height = canvas.parentElement.clientHeight * dpr;
        ctx.scale(dpr, dpr);
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    segments.current.forEach(s => {
      s.x = window.innerWidth / 2;
      s.y = window.innerHeight / 2;
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      for (let i = 0; i < segments.current.length; i++) {
        const s = segments.current[i]!;
        const targetX = i === 0 ? mouse.current.x : segments.current[i - 1]!.x;
        const targetY = i === 0 ? mouse.current.y : segments.current[i - 1]!.y;

        const dx = targetX - s.x;
        const dy = targetY - s.y;
        const angle = Math.atan2(dy, dx);
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = i === 0 ? 0 : 40;

        if (dist > minDist) {
           s.x += Math.cos(angle) * (dist - minDist) * 0.15;
           s.y += Math.sin(angle) * (dist - minDist) * 0.15;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(angle);
        
        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const hue = (Date.now() / 50 + i * 15) % 360;
        // Super subtle for background
        ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${0.05 * (1 - i/segments.current.length)})`;
        ctx.fillText(words[i]!, 0, 0);
        
        ctx.restore();
      }

      frame = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [words]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-0" 
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
