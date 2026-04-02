"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BalancedText } from '../PerfectText';

const CHAPTERS = [
  { id: 'genesis', title: '01 / GENESIS', subtitle: 'The origin of architectural thought.' },
  { id: 'synthesis', title: '02 / SYNTHESIS', subtitle: 'Merging logic with immersive narratives.' },
  { id: 'constellation', title: '03 / CONSTELLATION', subtitle: 'The technical arsenal in alignment.' },
  { id: 'transmission', title: '04 / TRANSMISSION', subtitle: 'Synthesizing contact.' }
];

export function HUD({ progress }: { progress: number }) {
  const currentChapterIndex = Math.min(Math.floor(progress * CHAPTERS.length), CHAPTERS.length - 1);
  const chapter = CHAPTERS[currentChapterIndex]!;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-between p-12 overflow-hidden">
      {/* 1. Cinematic Grain Overly */}
      <div className="absolute inset-0 bg-[#020617]/5 opacity-30 mix-blend-overlay pointer-events-none z-50">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 animate-noise" />
      </div>

      {/* 2. Top Navigation / Branding */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-xl font-black text-emerald-400 tracking-[0.4em] uppercase">Revolution</h1>
          <p className="text-[10px] font-bold text-white/40 tracking-widest">KULDEEP MALVIYA / ARCHIVE v0.3</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           <div className="w-48 h-[1px] bg-white/10 relative">
              <motion.div 
                className="absolute inset-y-0 left-0 bg-emerald-400"
                style={{ width: `${progress * 100}%` }}
              />
           </div>
           <span className="text-[10px] font-bold text-emerald-400 tracking-[0.6em]">ESTABLISHING SEQUENCE</span>
        </div>
      </div>

      {/* 3. Central Narrative Reveal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-6 text-center">
        <motion.div
          key={chapter.id}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <span className="text-sm font-black text-emerald-400/60 tracking-[1em] block mb-4">{chapter.title}</span>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter mix-blend-difference overflow-hidden">
             {chapter.id.toUpperCase()}
          </h2>
          
          <BalancedText 
            text={chapter.subtitle}
            font='400 20px "Plus Jakarta Sans"'
            maxWidth={600}
            lineHeight={32}
            className="text-white/40 opacity-80"
          />
        </motion.div>
      </div>

      {/* 4. Bottom Metadata / Status */}
      <div className="flex justify-between items-end">
        <div className="space-y-4">
           {[
             { label: 'COORDS', value: '38.40N / 21.32E' },
             { label: 'STATUS', value: 'TRANSMITTING' },
             { label: 'PHASE', value: `0${currentChapterIndex + 1}` }
           ].map(stat => (
             <div key={stat.label} className="flex gap-4">
               <span className="text-[10px] font-black text-emerald-400 tracking-widest w-12">{stat.label}</span>
               <span className="text-[10px] font-bold text-white/20 tracking-wider font-mono">{stat.value}</span>
             </div>
           ))}
        </div>

        <div className="text-right">
           <p className="text-[10px] font-black text-white/10 tracking-[0.8em] uppercase">Venturing through the</p>
           <p className="text-[10px] font-black text-emerald-400 tracking-[1.2em] uppercase">Digital Revolution</p>
        </div>
      </div>

      {/* Chapter Marker Tics */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-8 flex flex-col items-center">
         {CHAPTERS.map((c, i) => (
           <div 
            key={c.id} 
            className={`w-1 h-8 transition-all duration-500 rounded-full ${i === currentChapterIndex ? 'bg-emerald-400 scale-125' : 'bg-white/10'}`}
           />
         ))}
      </div>
    </div>
  );
}
