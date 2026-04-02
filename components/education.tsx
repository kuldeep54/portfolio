"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { MapPin, Award, ChevronRight, GraduationCap } from 'lucide-react';
import { personalData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { BalancedText } from './PerfectText';

function EducationCard({ edu, index }: { edu: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-60, 60], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-60, 60], [-5, 5]), { stiffness: 100, damping: 30 });

  function onMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 md:gap-24 mb-16 group"
    >
      {/* Timeline Connector (Mobile) */}
      <div className="absolute left-0 top-0 bottom-[-64px] w-px bg-gradient-to-b from-purple-500/50 to-transparent md:hidden" />
      
      {/* Timeline Dot */}
      <div className="absolute left-[-5px] md:left-1/2 md:ml-[-5px] top-8 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.5)] z-20 group-hover:scale-150 transition-transform duration-300" />

      <div className={cn(
        "w-full",
        index % 2 === 0 ? "md:text-right" : "md:col-start-2"
      )}>
        <motion.div
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX, rotateY }}
          className="perspective-1000 inline-block w-full max-w-xl"
        >
          <div className="glass-card p-8 rounded-3xl hover:translate-y-[-5px] transition-all duration-300 group border border-white/5 hover:border-purple-500/30 glass-shine">
            <span className="text-purple-500 font-bold mb-2 block tracking-wider uppercase text-xs">{edu.duration}</span>
            <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
            <p className="text-gradient font-medium mb-4">{edu.institution}</p>
            
            <div className={cn("flex flex-wrap gap-4 mb-6", index % 2 === 0 ? "md:justify-end" : "md:justify-start")}>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-muted-foreground text-xs">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>{edu.location}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 text-muted-foreground text-xs">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{edu.status}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-bold flex items-center gap-2 text-sm uppercase tracking-widest opacity-60">
                {index % 2 === 0 && <ChevronRight className="w-4 h-4 text-purple-400 rotate-180 hidden md:block" />}
                Key Focus Areas
                {index % 2 !== 0 && <ChevronRight className="w-4 h-4 text-purple-400 hidden md:block" />}
                <ChevronRight className="w-4 h-4 text-purple-400 md:hidden" />
              </h4>
              <ul className="space-y-3">
                {edu.achievements.map((achievement: string, idx: number) => (
                  <li key={idx} className={cn(
                    "text-muted-foreground text-sm leading-relaxed flex items-start gap-3",
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  )}>
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500/50 mt-2 flex-shrink-0" />
                    <BalancedText 
                      text={achievement}
                      font='400 14px "Plus Jakarta Sans"'
                      maxWidth={460}
                      lineHeight={22}
                      className={cn("!mx-0", index % 2 === 0 ? "!text-right" : "!text-left")}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function Education() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  return (
    <section ref={containerRef} id="education" className="relative py-32 overflow-hidden min-h-screen">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-6 lg:px-8 w-full"
      >
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4"
          >
            <GraduationCap className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400 uppercase tracking-widest">Academic Foundations</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            My <span className="text-gradient">Education</span>
          </h2>
          
          <BalancedText 
            text="A strategic path of learning that fuels my engineering mindset and problem-solving capabilities."
            font='400 20px "Plus Jakarta Sans"'
            maxWidth={600}
            lineHeight={30}
            className="text-muted-foreground/80"
          />
        </div>

        <div className="relative">
          {/* Central Timeline Line (Desktop) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-blue-500/30 to-transparent hidden md:block" />
          
          <div className="space-y-4">
            {personalData.education.map((edu, index) => (
              <EducationCard key={edu.id} edu={edu} index={index} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
