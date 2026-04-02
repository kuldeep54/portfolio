"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { prepareWithSegments, layoutNextLine, LayoutCursor, LayoutLine } from '@chenglou/pretext';

export default function LiquidDemo() {
  const [mounted, setMounted] = useState(false);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const text = `In the future of web architecture, layout is no longer static. We are moving towards "Interactive Structuralism," where text behaves like a physical fluid. By leveraging the zero-reflow capabilities of Pretext, we can calculate complex typographic wrapping in real-time, at 60 frames per second, without ever touching the expensive browser layout engine. This demo showcases a "Mouse Vortex"—as you move your cursor, the words physically move aside to make room for your presence, creating a digital void that feels truly organic. This is the intersection of high-performance engineering and immersive storytelling. Culminating code into weightless narratives that respond to every human touch.`;

  const font = '500 24px "Plus Jakarta Sans"';
  const lineHeight = 42;

  useEffect(() => {
    setMounted(true);
  }, []);

  const prepared = useMemo(() => {
    if (!mounted) return null;
    return prepareWithSegments(text, font);
  }, [text, mounted]);

  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current || !prepared) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const updateSize = () => {
      const width = containerRef.current!.clientWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    let frame: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      const width = canvas.width / dpr;
      const radius = 100;
      
      let cursor: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };
      let y = 100;

      ctx.font = font;
      ctx.textBaseline = 'top';

      while (true) {
        const lineTop = y;
        const lineBottom = y + lineHeight;
        const lineCenterY = y + lineHeight / 2;
        
        // Calculate the "void" width at this Y
        const distY = Math.abs(lineCenterY - mouse.y);
        let voidWidth = 0;
        if (distY < radius) {
          voidWidth = Math.sqrt(radius * radius - distY * distY) * 2;
        }

        if (voidWidth > 10) {
          // Two-segment layout (Flow around)
          const leftSpace = (width - voidWidth) / 2 - 20;
          const rightSpace = (width - voidWidth) / 2 - 20;
          
          // Layout Left
          const lineL = layoutNextLine(prepared, cursor, leftSpace);
          if (lineL) {
             ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
             ctx.fillText(lineL.text, 20, y);
             cursor = lineL.end;
          }

          // Layout Right
          const lineR = layoutNextLine(prepared, cursor, rightSpace);
          if (lineR) {
             ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
             ctx.fillText(lineR.text, width - rightSpace - 20, y);
             cursor = lineR.end;
          }
        } else {
          // Single-segment layout (Normal)
          const line = layoutNextLine(prepared, cursor, width - 40);
          if (!line) break;
          ctx.fillStyle = 'white';
          ctx.fillText(line.text, (width - line.width) / 2, y);
          cursor = line.end;
        }

        y += lineHeight;
        if (y > canvas.height / dpr || cursor.segmentIndex >= prepared.segments.length) break;
      }

      // Draw mouse indicator
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();

      frame = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateSize);
    };
  }, [prepared, mouse]);

  return (
    <div 
      ref={containerRef} 
      className="w-full min-h-screen bg-[#09090B] flex flex-col items-center p-12 overflow-hidden cursor-none"
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setMouse({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
          });
        }
      }}
    >
      <div className="absolute top-12 left-12 z-20">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tighter">Liquid <span className="text-blue-500">Vortex</span> Demo</h1>
        <p className="text-muted-foreground max-w-sm">Move your mouse to physically displace the text layout in real-time. Zero layout reflow, 60fps.</p>
      </div>
      <canvas ref={canvasRef} className="mt-20" />
    </div>
  );
}
