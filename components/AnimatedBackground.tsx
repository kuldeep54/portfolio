"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollY } = useScroll();

  // Parallax movement for larger nebulas
  const yTranslate1 = useTransform(scrollY, [0, 1000], [0, -150]);
  const yTranslate2 = useTransform(scrollY, [0, 1000], [0, -250]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const stars: any[] = [];
    const starColors = ['#ffffff', '#ffffff', '#ffffff', '#ffd27d', '#fff4e8', '#f0f8ff'];

    const createStars = () => {
      Array.from({ length: 400 }).forEach(() => {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.1,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          alpha: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005
        });
      });
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.2) star.twinkleSpeed *= -1;
        
        ctx.globalAlpha = Math.max(0.2, Math.min(1, star.alpha));
        ctx.fill();

        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });
      ctx.globalAlpha = 1;
    };

    const animate = () => {
      drawStars();
      requestAnimationFrame(animate);
    };

    createStars();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full -z-20 bg-[#09090B] overflow-hidden">
      {/* Canvas Starfield */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40 mix-blend-screen"
      />

      {/* Perspective Grid */}
      <div 
        className="absolute inset-0 z-[-1] opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          transform: 'perspective(1000px) rotateX(60deg) translateY(-50%)',
          transformOrigin: 'top',
        }}
      />

      {/* Modern Mesh Gradients */}
      <motion.div
        style={{ y: yTranslate1 }}
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/10 rounded-full blur-[110px] mix-blend-screen"
      />
      <motion.div
        style={{ y: yTranslate2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/10 rounded-full blur-[110px] mix-blend-screen"
      />
      <motion.div
        style={{ y: yTranslate1 }}
        className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen"
      />
      <motion.div
        style={{ y: yTranslate2 }}
        className="absolute bottom-[30%] left-[5%] w-[35%] h-[35%] bg-violet-500/5 rounded-full blur-[90px] mix-blend-screen"
      />
      
      {/* Filmic Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none noise-bg" />
    </div>
  );
}
