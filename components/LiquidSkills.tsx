"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { prepare, layout, PreparedText } from '@chenglou/pretext';
import { personalData } from '@/lib/data';

interface SkillBubble {
  id: string;
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  prepared: PreparedText;
  color: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  frontend: '#60a5fa', // blue-400
  backend: '#a78bfa',  // purple-400
  database: '#34d399', // emerald-400
  tools: '#fbbf24',    // amber-400
  other: '#fb7185'     // rose-400
};

export function LiquidSkills() {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const font = '600 14px "Plus Jakarta Sans"';
  const paddingX = 16;
  const paddingY = 8;

  useEffect(() => {
    setMounted(true);
  }, []);

  const bubbles = useMemo(() => {
    if (!mounted) return [];
    const allSkills: SkillBubble[] = [];
    Object.entries(personalData.skills).forEach(([category, skills]) => {
      (skills as string[]).forEach((skill) => {
        const prepared = prepare(skill, font);
        // We'll calculate the width using layout with a large maxWidth to get the single-line width
        const { height } = layout(prepared, 1000, 20); 
        // Note: Pretext layout currently doesn't return the exact single-line width easily without walkLineRanges,
        // but for short skills, we can estimate or use a helper. 
        // For this demo, let's assume a reasonable width or use raw canvas measure for the bubble size.
        allSkills.push({
          id: `${category}-${skill}`,
          text: skill,
          x: Math.random() * 800,
          y: Math.random() * 600,
          vx: 0,
          vy: 0,
          width: 0, // Will be set in effect
          height: 32,
          prepared,
          color: CATEGORY_COLORS[category] || '#94a3b8'
        });
      });
    });
    return allSkills;
  }, [font, mounted]);

  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const updateSize = () => {
      const width = containerRef.current!.clientWidth;
      const height = containerRef.current!.clientHeight || 600;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      
      // Initial positioning
      bubbles.forEach(b => {
        b.x = Math.random() * width;
        b.y = Math.random() * height;
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    // Set widths using canvas measurement for the bubbles
    ctx.font = font;
    bubbles.forEach(b => {
      b.width = ctx.measureText(b.text).width + paddingX * 2;
    });

    let frame: number;
    const render = () => {
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;

      bubbles.forEach((b, i) => {
        // 1. Center Attraction
        const dxCenter = centerX - b.x;
        const dyCenter = centerY - b.y;
        b.vx += dxCenter * 0.0005;
        b.vy += dyCenter * 0.0005;

        // 2. Mouse Repulsion
        const dxMouse = b.x - mouse.current.x;
        const dyMouse = b.y - mouse.current.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          const force = (1 - distMouse / 150) * 0.5;
          b.vx += (dxMouse / distMouse) * force;
          b.vy += (dyMouse / distMouse) * force;
        }

        // 3. Bubble Collision
        for (let j = i + 1; j < bubbles.length; j++) {
          const other = bubbles[j]!;
          const dx = b.x - other.x;
          const dy = b.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (b.width + other.width) / 2 + 10;

          if (dist < minDist) {
            const angle = Math.atan2(dy, dx);
            const force = (minDist - dist) * 0.02;
            b.vx += Math.cos(angle) * force;
            b.vy += Math.sin(angle) * force;
            other.vx -= Math.cos(angle) * force;
            other.vy -= Math.sin(angle) * force;
          }
        }

        // 4. Movement & Friction
        b.vx *= 0.92;
        b.vy *= 0.92;
        b.x += b.vx;
        b.y += b.vy;

        // Bounds
        if (b.x < b.width/2) b.x = b.width/2;
        if (b.x > width - b.width/2) b.x = width - b.width/2;
        if (b.y < b.height/2) b.y = b.height/2;
        if (b.y > height - b.height/2) b.y = height - b.height/2;

        // 5. Draw
        ctx.save();
        ctx.translate(b.x, b.y);

        // Bubble Background
        ctx.beginPath();
        const r = b.height / 2;
        const w = b.width;
        ctx.roundRect(-w/2, -r, w, b.height, r);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
        ctx.fill();
        ctx.strokeStyle = `${b.color}44`;
        ctx.stroke();

        // Text
        ctx.font = font;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillText(b.text, 0, 0);

        ctx.restore();
      });

      frame = requestAnimationFrame(render);
    };

    render();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateSize);
    };
  }, [bubbles, font]);

  return (
    <div ref={containerRef} className="w-full h-[600px] relative">
      <canvas
        ref={canvasRef}
        onMouseMove={(e) => {
          const rect = canvasRef.current?.getBoundingClientRect();
          if (rect) {
            mouse.current = {
              x: e.clientX - rect.left,
              y: e.clientY - rect.top
            };
          }
        }}
        onMouseLeave={() => {
          mouse.current = { x: -1000, y: -1000 };
        }}
      />
      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-6 px-6 py-3 bg-black/20 backdrop-blur-md rounded-full border border-white/5 pointer-events-none">
        {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
          <div key={cat} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{cat}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
