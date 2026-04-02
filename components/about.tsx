"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Brain, Zap, Code2, Database, Cpu, MapPin, Globe, Award, Terminal } from 'lucide-react';
import { personalData } from '@/lib/data';

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  
  // Stagger variants for the bento grid
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 20 } }
  };

  return (
    <section ref={containerRef} id="about" className="relative w-full bg-[#09090B] py-32 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      {/* 1. Header */}
      <motion.div 
        style={{ y: titleY }}
        className="w-full flex flex-col items-center justify-center px-6 mb-24 z-10 relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-black text-emerald-300 uppercase tracking-[0.4em]">Beyond The Code</span>
        </motion.div>
        
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter text-center">
          ENGINEERING <br />
          <span className="text-gradient">THE FUTURE</span>
        </h2>
      </motion.div>

      {/* 2. BENTO GRID */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 relative z-10"
      >
        {/* CARD 1: Core Philosophy & Summary */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-4 lg:col-span-4 row-span-2 glass-card rounded-[2rem] p-8 md:p-12 glass-shine group relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[60px] group-hover:scale-125 transition-transform duration-700" />
           <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                 <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">The Architect</h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light mb-8 max-w-2xl">
                {personalData.summary}
              </p>
              <div className="flex flex-wrap gap-3">
                 <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white tracking-wide flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-emerald-400" /> Full-Stack Mastery
                 </span>
                 <span className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white tracking-wide flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-400" /> Scalable Systems
                 </span>
              </div>
           </div>
        </motion.div>

        {/* CARD 2: Current Focus */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 glass-card rounded-[2rem] p-8 relative overflow-hidden group">
           <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[50px] group-hover:bg-purple-500/30 transition-colors duration-500" />
           <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-6">
                 <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Current Focus</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Deep-diving into Advanced AI Agents and Distributed Systems Architecture, exploring the intersection of autonomous reasoning & hyperscale performance.
              </p>
              <div className="flex flex-wrap gap-2">
                 {['AI AGENTS', 'LLM OPS', 'NEXT.JS', 'SYSTEM ARCH'].map(tag => (
                   <span key={tag} className="px-2 py-1 bg-white/5 rounded-md text-[10px] font-bold text-purple-300 tracking-widest">{tag}</span>
                 ))}
              </div>
           </div>
        </motion.div>

        {/* CARD 3: Location */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-2 glass-card rounded-[2rem] p-8 flex flex-col justify-between relative overflow-hidden">
           <div className="absolute inset-0 noise-bg opacity-[0.03]" />
           <div className="relative z-10 flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                 <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Based In</h3>
                <p className="text-xl font-bold text-emerald-400">{personalData.location.split(',')[0]}</p>
              </div>
           </div>
           
           <div className="relative z-10 mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                 </div>
                 <span className="text-xs font-semibold text-emerald-100/70 tracking-wider">AVAILABLE GLOBALLY</span>
              </div>
              <Globe className="w-5 h-5 text-white/20" />
           </div>
        </motion.div>

        {/* CARD 4: Tech Stack Highlights */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3 glass-card rounded-[2rem] p-8 group overflow-hidden border-t-2 border-t-blue-500/30">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 <Cpu className="w-5 h-5 text-blue-400" />
                 <h3 className="text-lg font-bold text-white">Core Arsenal</h3>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-3">
                 <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Frontend</span>
                 <div className="flex flex-wrap gap-2">
                    {personalData.skills.frontend.slice(0,4).map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-xs font-medium text-blue-200">{skill}</span>
                    ))}
                 </div>
              </div>
              <div className="space-y-3">
                 <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Backend</span>
                 <div className="flex flex-wrap gap-2">
                    {personalData.skills.backend.slice(0,4).map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-lg text-xs font-medium text-purple-200">{skill}</span>
                    ))}
                 </div>
              </div>
           </div>
        </motion.div>

        {/* CARD 5: Certifications & Languages */}
        <motion.div variants={itemVariants} className="col-span-1 md:col-span-2 lg:col-span-3 glass-card rounded-[2rem] p-8 flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <Award className="w-5 h-5 text-pink-400" />
                 <h3 className="text-lg font-bold text-white">Certifications & Languages</h3>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4 flex items-center justify-between hover:bg-white/10 transition-colors">
                 <span className="text-sm font-semibold text-white/90">{personalData.certifications[0]}</span>
                 <Zap className="w-4 h-4 text-pink-400" />
              </div>
           </div>
           
           <div className="flex gap-4">
              {personalData.languages.map(lang => (
                <div key={lang} className="flex-1 text-center py-2 bg-white/5 rounded-xl text-xs font-bold text-muted-foreground uppercase tracking-widest border border-white/5">
                  {lang}
                </div>
              ))}
           </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
