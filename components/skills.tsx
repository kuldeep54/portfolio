"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { personalData } from '@/lib/data';
import { Code, Cpu, Database, Cloud, Settings } from 'lucide-react';

type SkillCategory = 'frontend' | 'backend' | 'tools' | 'cloud' | 'other';

const skillCategories: { 
  id: SkillCategory; 
  title: string; 
  color: string;
  icon: React.ReactNode;
}[] = [
  { 
    id: 'frontend', 
    title: 'Frontend', 
    color: 'from-blue-500 to-cyan-400',
    icon: <Code className="w-6 h-6" />
  },
  { 
    id: 'backend', 
    title: 'Backend', 
    color: 'from-purple-500 to-pink-500',
    icon: <Database className="w-6 h-6" />
  },
  { 
    id: 'tools', 
    title: 'Tools', 
    color: 'from-amber-500 to-orange-500',
    icon: <Settings className="w-6 h-6" />
  },
  { 
    id: 'cloud', 
    title: 'Cloud', 
    color: 'from-emerald-500 to-teal-500',
    icon: <Cloud className="w-6 h-6" />
  },
  { 
    id: 'other', 
    title: 'Other', 
    color: 'from-rose-500 to-pink-500',
    icon: <Cpu className="w-6 h-6" />
  },
];

const SkillPill = ({ skill, level, color }: { skill: string; level: number; color: string }) => (
  <div className="group relative">
    <div className="flex items-center justify-between mb-1">
      <span className="text-sm font-medium text-gray-300">{skill}</span>
      <span className="text-xs font-mono text-gray-400">{level}%</span>
    </div>
    <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
      <motion.div 
        className={`h-full rounded-full bg-gradient-to-r ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ 
          duration: 1, 
          delay: 0.3,
          ease: [0.16, 1, 0.3, 1]
        }}
      />
    </div>
    <div className="absolute -bottom-6 left-0 text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      {level < 50 ? 'Learning' : level < 80 ? 'Proficient' : 'Expert'}
    </div>
  </div>
);

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });

  const opacityProgess = useTransform(scrollYProgress, [0, 0.7], [0.2, 1]);
  const yProgess = useTransform(scrollYProgress, [0, 0.7], [20, 0]);

  // Skill levels with more granular control
  const skillLevels: Record<string, number> = {
    // Frontend
    'HTML': 92,
    'CSS': 88,
    'JavaScript': 85,
    'React': 82,
    'Tailwind CSS': 87,
    
    // Backend
    'Java': 78,
    'Node.js': 80,
    'Express.js': 75,
    
    // Tools
    'GitHub': 85,
    'Git': 82,
    'VS Code': 95,
    
    // Cloud
    'AWS Basics': 70,
    'Cloud Architecture': 65,
    
    // Other
    'AI/ML Basics': 72,
    'Responsive Design': 88,
    'Problem Solving': 95,
  };

  return (
    <section ref={ref} id="skills" className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(16, 24, 39, 1) 0%, rgba(15, 23, 42, 1) 100%)
          `,
          opacity: opacityProgess
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-24"
        >
          <motion.span 
            className="inline-block text-sm font-medium text-blue-400 mb-4 tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            MY EXPERTISE
          </motion.span>
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Skills & Technologies
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Technologies and tools I use to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.id}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-2xl p-6 border border-slate-700/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/20">
                <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  {category.title}
                  <span className="ml-2 text-xs font-normal text-gray-400">
                    ({personalData.skills[category.id]?.length || 0} skills)
                  </span>
                </h3>
                
                <div className="space-y-5">
                  {personalData.skills[category.id]?.map((skill: string) => (
                    <SkillPill 
                      key={skill} 
                      skill={skill} 
                      level={skillLevels[skill] || 70}
                      color={category.color}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Cloud */}
        <motion.div 
          className="mt-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
              Skill Cloud
            </span>
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(skillLevels).map(([skill, level]) => {
              const size = Math.max(12, Math.min(24, level / 4));
              const opacity = 0.5 + (level / 200);
              return (
                <motion.div
                  key={skill}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2 rounded-full border ${
                    level > 80 
                      ? 'bg-blue-500/10 border-blue-500/20 text-blue-300' 
                      : level > 60 
                        ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' 
                        : 'bg-slate-700/50 border-slate-600/50 text-gray-300'
                  } text-sm font-medium cursor-default transition-all duration-300 hover:shadow-lg`}
                  style={{
                    fontSize: `${size}px`,
                    opacity,
                  }}
                >
                  {skill}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
