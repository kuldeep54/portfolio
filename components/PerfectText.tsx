"use client";

import React, { useRef, useEffect, useMemo, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { prepare, layout, prepareWithSegments, layoutWithLines, walkLineRanges } from '@chenglou/pretext';

interface BalancedTextProps {
  text: string;
  font?: string; // e.g. "400 18px 'Inter'"
  className?: string;
  maxWidth?: number;
  lineHeight?: number;
}

/**
 * BalancedText uses Pretext to binary search for the "Aesthetic width" 
 * that minimizes line-length variance (raggedness) for a given text.
 * It bypasses standard DOM wrapping for a 'Pro' symmetrical layout.
 */
export function BalancedText({ 
  text, 
  font = '400 18px "Plus Jakarta Sans"', 
  className = "", 
  maxWidth = 800,
  lineHeight = 24
}: BalancedTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [perfectWidth, setPerfectWidth] = useState<number | null>(null);

  // 1. One-time text analysis via Pretext
  const prepared = useMemo(() => prepareWithSegments(text, font), [text, font]);

  useEffect(() => {
    const findPerfectWidth = () => {
      if (!containerRef.current) return;
      const availableWidth = Math.min(containerRef.current.parentElement?.clientWidth || maxWidth, maxWidth);
      
      let bestW = availableWidth;
      let minVariance = Infinity;

      // Binary search / Sampling for symmetrical lines
      // We look for a width that maintains the same line count but balances lengths
      const initialLayout = layout(prepared, availableWidth, lineHeight);
      const targetLineCount = initialLayout.lineCount;

      for (let w = availableWidth * 0.7; w <= availableWidth; w += 10) {
        let currentMaxW = 0;
        let lines: number[] = [];
        
        walkLineRanges(prepared, w, (line) => {
          lines.push(line.width);
          if (line.width > currentMaxW) currentMaxW = line.width;
        });

        if (lines.length === targetLineCount) {
          // Calculate simple variance
          const avg = lines.reduce((a, b) => a + b, 0) / lines.length;
          const variance = lines.reduce((a, b) => a + Math.pow(b - avg, 2), 0);
          
          if (variance < minVariance) {
            minVariance = variance;
            bestW = currentMaxW + 2; // +2 for safety margin
          }
        }
      }
      setPerfectWidth(bestW);
    };

    window.addEventListener('resize', findPerfectWidth);
    findPerfectWidth();
    return () => window.removeEventListener('resize', findPerfectWidth);
  }, [prepared, maxWidth, lineHeight]);

  return (
    <div ref={containerRef} className={`w-full flex flex-col ${className}`}>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ width: perfectWidth ? `${perfectWidth}px` : 'auto' }}
        className="mx-auto text-center"
      >
        {text}
      </motion.p>
    </div>
  );
}

/**
 * HolographicText: High-performance canvas reveal using Pretext's layoutWithLines.
 * Perfect for Hero summaries and high-impact headlines.
 */
export function HolographicText({ 
  text, 
  font = '400 24px "Plus Jakarta Sans"', 
  lineHeight = 36,
  maxWidth = 1200,
  className = "" 
}: { 
  text: string; 
  font?: string; 
  lineHeight?: number;
  maxWidth?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const reveal = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const prepared = useMemo(() => prepareWithSegments(text, font), [text, font]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const updateSize = () => {
      const width = Math.min(containerRef.current!.clientWidth, maxWidth);
      const height = (layout(prepared, width, lineHeight).lineCount + 2) * lineHeight; 
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
      const { lines } = layoutWithLines(prepared, width, lineHeight);
      
      const progress = reveal.get();
      
      lines.forEach((line, i) => {
        const lineProgress = Math.min(Math.max(progress * 2.5 - (i * 0.1), 0), 1);
        if (lineProgress <= 0) return;

        ctx.save();
        ctx.font = font;
        ctx.fillStyle = ctx.fillStyle; // Keep original fillStyle from prop logic if any
        ctx.globalAlpha = lineProgress;
        
        const x = (width - line.width) / 2;
        const y = 40 + i * lineHeight;
        
        ctx.fillText(line.text.slice(0, Math.floor(line.text.length * lineProgress)), x, y);
        
        // Holographic flicker
        if (lineProgress > 0.9 && Math.random() > 0.98) {
           ctx.shadowBlur = 10;
           ctx.shadowColor = '#3b82f6';
           ctx.fillStyle = '#60a5fa';
           ctx.fillText(line.text, x, y);
        }
        
        ctx.restore();
      });

      frame = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('resize', updateSize);
      cancelAnimationFrame(frame);
    };
  }, [prepared, font, lineHeight, reveal, maxWidth]);

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      <canvas ref={canvasRef} className="pointer-events-none mx-auto" />
    </div>
  );
}
