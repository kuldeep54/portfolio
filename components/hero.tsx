"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { personalData } from '@/lib/data';
import dynamic from 'next/dynamic';
import { BalancedText, HolographicText } from './PerfectText';

const DragonBackground = dynamic(() => import('./DragonBackground').then(mod => mod.DragonBackground), { ssr: false });

function MagneticButton({ children, className, href }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Magnetic pull (limited to 50px)
    x.set(distanceX * 0.35);
    y.set(distanceY * 0.35);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Cinematic Scaling Reveal
  const titleScale = useTransform(scrollYProgress, [0, 0.4], [1.2, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [1, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.1], [0, 0]);

  // Card Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), { stiffness: 100, damping: 30 });

  function handleMouseMove(e: React.MouseEvent) {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX - innerWidth / 2);
    mouseY.set(clientY - innerHeight / 2);
  }

  return (
    <section 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="relative min-h-[140vh] w-full flex flex-col items-center justify-start pt-32 overflow-hidden"
    >
      {/* Interactive Dragon Background Guide */}
      <DragonBackground />

      {/* Immersive Background Glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-blue-500/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-purple-500/5 blur-[120px] -z-10 rounded-full" />

      <motion.div 
        style={{ opacity, filter: `blur(${blur}px)` }}
        className="sticky top-32 z-20 w-full flex flex-col items-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-12 backdrop-blur-xl"
        >
          <div className="relative flex h-3 w-3">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
          </div>
          <span className="text-[10px] font-black text-blue-300 uppercase tracking-[0.4em]">Available for Strategic Projects</span>
        </motion.div>

        <motion.div style={{ scale: titleScale, y: titleY }} className="mb-12">
            <h1 className="text-[12vw] lg:text-[10vw] font-bold text-white tracking-tighter leading-[0.8] mix-blend-difference">
              KULDEEP <br/>
              <span className="text-gradient">MALVIYA</span>
            </h1>
        </motion.div>

        {/* 2. CINEMATIC NARRATIVE REVEAL - ENGINEERED WITH PRETEXT */}
        <div className="w-full max-w-4xl min-h-[150px] mb-8">
          <HolographicText 
            text="I design and develop high-performance, immersive digital experiences pushing the boundaries of full-stack engineering. Culminating code into weightless narratives."
            font='500 28px "Plus Jakarta Sans"'
            lineHeight={48}
            maxWidth={800}
          />
        </div>

        <div className="max-w-xl mx-auto opacity-60">
           <BalancedText 
            text="Specializing in building exceptionally fast, scalable, and beautifully engineered web experiences for a global audience."
            font='400 16px "Plus Jakarta Sans"'
            maxWidth={500}
            lineHeight={24}
           />
        </div>
      </motion.div>

      {/* 3D Glass Identity Identity Card (Centered Narrative) */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="relative z-10 w-full max-w-xl aspect-[16/11] mt-40 transform-gpu group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-600/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative h-full w-full glass-card rounded-[3rem] p-1 overflow-hidden transition-all duration-700 hover:scale-[1.02] hover:shadow-[0_0_80px_rgba(59,130,246,0.15)] group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          
          <div className="relative h-full w-full rounded-[2.8rem] overflow-hidden">
            <img 
              src="/mountain.jpg" 
              alt="Kuldeep Malviya" 
              className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-[3s] ease-out"
            />
            {/* Holographic light reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-transparent to-white/10 opacity-40 mix-blend-overlay" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/10 to-transparent p-12 flex flex-col justify-end">
               <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.5em] mb-4">Lead Software Architect</span>
               <div className="flex items-end justify-between">
                  <div className="space-y-1">
                     <p className="text-3xl font-bold text-white tracking-tighter">Culminating code into</p>
                     <p className="text-4xl font-bold text-gradient leading-none">Experiences.</p>
                  </div>
                  <div className="flex gap-4 mb-2">
                     <Link href={personalData.github} className="p-3 bg-white/5 rounded-2xl border border-white/5 text-white hover:text-blue-400 hover:bg-white/10 transition-all"><Github className="w-5 h-5" /></Link>
                     <Link href={personalData.linkedin} className="p-3 bg-white/5 rounded-2xl border border-white/5 text-white hover:text-blue-400 hover:bg-white/10 transition-all"><Linkedin className="w-5 h-5" /></Link>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Magnetic Bottom Dock */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[40] flex items-center gap-4 bg-[#0c0c0e]/80 backdrop-blur-2xl px-6 py-4 rounded-[2.5rem] border border-white/10 shadow-3xl"
      >
        <MagneticButton href="/projects" className="group flex items-center gap-4 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-[2rem] border border-white/5 text-white transition-all overflow-hidden relative">
           <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
           <span className="text-sm font-bold tracking-tight flex items-center gap-3 uppercase whitespace-nowrap">
             Explore Projects <ArrowRight className="w-4 h-4 text-blue-400" />
           </span>
        </MagneticButton>

        <MagneticButton href="/api/download-resume" className="group flex items-center gap-4 px-8 py-4 bg-blue-500/10 hover:bg-blue-500/20 rounded-[2rem] border border-blue-500/20 text-blue-400 transition-all overflow-hidden relative">
           <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
           <span className="text-sm font-bold tracking-tight flex items-center gap-3 uppercase whitespace-nowrap">
             Resume <Sparkles className="w-4 h-4" />
           </span>
        </MagneticButton>

        <div className="w-px h-10 bg-white/10 mx-2" />

        <div className="flex items-center gap-3">
           <MagneticButton href="mailto:kuldeepmalviya54@gmail.com" className="p-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/5 text-white hover:text-blue-400 transition-all">
              <Mail className="w-5 h-5" />
           </MagneticButton>
        </div>
      </motion.div>

      {/* Decorative Scrolling Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-40 flex flex-col items-center gap-4 opacity-20"
      >
        <span className="text-[10px] font-bold text-white uppercase tracking-[0.6em] vertical-text">Scroll to Venture</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-white via-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
