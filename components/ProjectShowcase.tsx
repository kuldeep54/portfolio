"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, ArrowRight, Code, Star, Sparkles } from 'lucide-react';
import { BalancedText } from './PerfectText';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  liveDemo: string;
  featured?: boolean;
}

export function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth cinematic transforms
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);
  
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center py-20 overflow-hidden"
    >
      <motion.div 
        style={{ opacity: springOpacity, scale: springScale, rotateX }}
        className="relative w-full max-w-7xl px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
      >
        {/* Background Ambient Glow */}
        <div className="absolute -inset-20 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 blur-[100px] -z-10" />

        {/* Project Visual Stage */}
        <div className="relative w-full lg:w-3/5 group">
          <motion.div 
            style={{ y }}
            className="relative aspect-[16/10] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-gpu"
          >
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-[2s] ease-out"
              unoptimized
            />
            {/* Holographic Overlays */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-transparent to-white/10 opacity-30 group-hover:opacity-10 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090B]/10 to-[#09090B]/60" />
          </motion.div>

          {/* Floating Feature Tags (3D Layered) */}
          <div className="absolute -bottom-6 -right-6 lg:right-10 z-20 flex flex-wrap gap-3 max-w-[300px]">
             {project.technologies.map((tech, i) => (
                <motion.span 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className="px-5 py-2.5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-xs font-bold text-muted-foreground uppercase tracking-widest shadow-2xl hover:border-blue-500/30 hover:text-blue-300 transition-all"
                >
                  {tech}
                </motion.span>
             ))}
          </div>
        </div>

        {/* Floating Glass Metadata Panel */}
        <div className="w-full lg:w-2/5 text-left relative z-30">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
               {project.featured && (
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em]">
                    <Sparkles className="w-3 h-3" />
                    Featured Spotlight
                  </div>
               )}
               <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
                 {project.title.split(' ').map((word, i) => (
                   <span key={i} className="block last:text-gradient">
                     {word}
                   </span>
                 ))}
               </h3>
            </div>

            <BalancedText 
              text={project.description}
              font='400 18px "Plus Jakarta Sans"'
              maxWidth={512}
              lineHeight={28}
              className="!text-left !mx-0 text-muted-foreground/90"
            />

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    className="group/btn relative p-4 bg-white/5 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-blue-500/10 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                    <Github className="relative w-6 h-6" />
                  </a>
                )}
                {project.liveDemo && project.liveDemo !== '#' && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    className="group/btn relative p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400 hover:text-blue-300 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover/btn:translate-y-0 transition-transform" />
                    <ExternalLink className="relative w-6 h-6" />
                  </a>
                )}
              </div>

              <a 
                href={project.liveDemo !== '#' ? project.liveDemo : project.github}
                target="_blank"
                className="group/link flex items-center gap-4 text-lg font-bold text-white hover:text-blue-400 transition-all"
              >
                Launch Experience
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover/link:border-blue-500/30 group-hover/link:scale-110 transition-all">
                   <ArrowRight className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Index Number (Parallaxed) */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-200, 200]) }}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] pointer-events-none select-none z-0"
      >
        0{index + 1}
      </motion.div>
    </div>
  );
}
