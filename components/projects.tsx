"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, ArrowRight, Sparkles } from 'lucide-react';
import { projects } from '@/lib/data';
import { ProjectShowcase } from './ProjectShowcase';

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} id="projects" className="relative py-40 overflow-hidden min-h-screen bg-[#09090B]">
      {/* Decorative Cinematic Background Accents */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[150px] -z-10 rounded-full" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-purple-500/5 blur-[150px] -z-10 rounded-full" />

      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10"
      >
        <div className="text-center mb-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold text-gradient uppercase tracking-[0.3em]">Selected Engineering Work</span>
          </motion.div>
          
          <h2 className="text-6xl md:text-9xl font-bold text-white mb-10 tracking-tighter leading-none">
            Built for <br/>
            <span className="text-gradient">Performance.</span>
          </h2>
          <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            Exploring the boundaries of what's possible in software engineering through cinematic interfaces and robust architectures.
          </p>
        </div>

        {/* Narrative Showcase (Replacing the Grid) */}
        <div className="space-y-40 lg:space-y-0">
          {projects.map((project, index) => (
            <ProjectShowcase key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Global Cinematic Footer CTA */}
        <motion.div 
          className="text-center mt-60 pb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative group inline-block">
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
             <a
               href="https://github.com/kuldeep54"
               target="_blank"
               className="relative flex items-center gap-8 px-12 py-8 bg-[#09090B] hover:bg-[#0c0c0e] border border-white/5 rounded-[3rem] text-white transition-all group shadow-3xl"
             >
               <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">
                  <Github className="w-10 h-10 text-blue-400" />
               </div>
               <div className="text-left">
                 <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.4em] mb-2">Extended Archive</p>
                 <p className="text-2xl font-bold tracking-tight">Venture into the Repository</p>
                 <p className="text-sm text-muted-foreground/60 mt-1">25+ Projects contributing to the ecosystem</p>
               </div>
               <div className="ml-8 w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-blue-500/40 group-hover:scale-110 transition-all">
                  <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
               </div>
             </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
