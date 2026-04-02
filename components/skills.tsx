"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personalData } from '@/lib/data';
import { Cpu, Globe, Server, Database, Code2, Wrench, Sparkles } from 'lucide-react';
import { BalancedText } from './PerfectText';

// Define category styling
const categoryData = [
  {
    key: 'frontend',
    title: 'Frontend Mastery',
    icon: <Code2 className="w-5 h-5" />,
    colorClass: 'text-blue-400',
    bgClass: 'bg-blue-500/10',
    borderClass: 'border-blue-500/20',
    hoverClass: 'hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]'
  },
  {
    key: 'backend',
    title: 'Backend Architecture',
    icon: <Server className="w-5 h-5" />,
    colorClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10',
    borderClass: 'border-purple-500/20',
    hoverClass: 'hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)]'
  },
  {
    key: 'database',
    title: 'Data & Cloud',
    icon: <Database className="w-5 h-5" />,
    colorClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/20',
    hoverClass: 'hover:border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]'
  },
  {
    key: 'tools',
    title: 'Workflow & Tooling',
    icon: <Wrench className="w-5 h-5" />,
    colorClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10',
    borderClass: 'border-amber-500/20',
    hoverClass: 'hover:border-amber-500/50 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)]'
  },
  {
    key: 'other',
    title: 'Core Concepts',
    icon: <Sparkles className="w-5 h-5" />,
    colorClass: 'text-rose-400',
    bgClass: 'bg-rose-500/10',
    borderClass: 'border-rose-500/20',
    hoverClass: 'hover:border-rose-500/50 hover:shadow-[0_0_20px_rgba(244,63,94,0.2)]'
  }
];

export function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section ref={containerRef} id="skills" className="relative py-32 overflow-hidden min-h-screen bg-[#09090B]">
      {/* Background Ambience */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10"
      >
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-md"
          >
            <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-sm font-bold text-blue-400 uppercase tracking-widest">My Expertise</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          
          <BalancedText 
            text="I specialize in building scalable, modern applications using the latest industry-standard technologies. Below is a structured breakdown of my core competencies."
            font='400 20px "Plus Jakarta Sans"'
            maxWidth={700}
            lineHeight={30}
            className="text-muted-foreground/80 mx-auto"
          />
        </div>

        {/* Structured Glass Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categoryData.map((category) => {
            const skills = personalData.skills[category.key as keyof typeof personalData.skills] || [];
            if (skills.length === 0) return null;

            return (
              <motion.div 
                key={category.key} 
                variants={itemVariants}
                className={`glass-card rounded-[2rem] p-8 glass-shine group relative overflow-hidden flex flex-col`}
              >
                 <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[50px] transition-colors duration-500 ${category.bgClass} opacity-50 group-hover:opacity-100`} />
                 
                 <div className="relative z-10 mb-8 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md ${category.bgClass} ${category.colorClass} border ${category.borderClass}`}>
                       {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{category.title}</h3>
                 </div>

                 <div className="relative z-10 flex flex-wrap gap-3 mt-auto">
                    {skills.map(skill => (
                      <span 
                        key={skill} 
                        className={`px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-white/90 tracking-wide transition-all duration-300 ${category.hoverClass} cursor-default`}
                      >
                         {skill}
                      </span>
                    ))}
                 </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Multilingual / Extra Info */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 text-center pb-20"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full glass-card border border-white/10 hover:border-indigo-500/30 transition-colors shadow-2xl">
            <div className="p-2 bg-indigo-500/20 rounded-full">
               <Globe className="w-5 h-5 text-indigo-400 animate-spin-slow" />
            </div>
            <p className="text-white/80 font-medium text-sm md:text-base">
              Global Delivery Approach <span className="mx-2 text-white/20">•</span> 
              <span className="text-indigo-400 font-bold bg-indigo-500/10 px-3 py-1 rounded-lg ml-1">English & Hindi</span>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
