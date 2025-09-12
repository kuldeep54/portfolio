"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Code, Server, Database, Cpu, BookOpen, Lightbulb, Sparkles } from 'lucide-react';
import { ProfileTiltPhoto } from './ProfileTiltPhoto';

const AnimatedText = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay }}
    className="inline-block"
  >
    {children}
  </motion.span>
);

const SkillPill = ({ skill, category }: { skill: string; category: 'frontend' | 'backend' | 'tools' }) => {
  const colors = {
    frontend: 'from-blue-500 to-cyan-400',
    backend: 'from-purple-500 to-pink-500',
    tools: 'from-amber-500 to-orange-500',
  };

  const shadowColors = {
    frontend: 'hover:shadow-blue-500/30',
    backend: 'hover:shadow-purple-500/30',
    tools: 'hover:shadow-amber-500/30',
  };

  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.05 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`inline-block px-4 py-2 bg-gradient-to-r ${colors[category]} text-white rounded-full text-sm font-medium shadow-md ${shadowColors[category]} transition-all duration-300 hover:shadow-lg m-1`}
    >
      {skill}
    </motion.span>
  );
};

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });

  const opacityProgess = useTransform(scrollYProgress, [0, 0.7], [0.2, 1]);
  const yProgess = useTransform(scrollYProgress, [0, 0.7], [30, 0]);

  const skills = {
    frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    backend: ["Java", "Node.js", "Express.js"],
    tools: ["Git", "AWS", "VS Code"]
  };

  return (
    <section ref={ref} id="about" className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 25%),
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
            ABOUT ME
          </motion.span>
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              My Journey & Expertise
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            From lines of code to impactful digital experiences
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - My Journey */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-2xl p-8 border border-slate-700/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">My Journey</h3>
              </div>
              
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <AnimatedText>
                  <p className="text-lg">
                    I'm a passionate Full-Stack Developer with a strong foundation in modern web technologies. 
                    My journey in programming began during my Computer Science studies, where I discovered 
                    my love for creating digital solutions that make a real impact.
                  </p>
                </AnimatedText>
                
                <AnimatedText delay={0.1}>
                  <p>
                    With experience in both frontend and backend development, I enjoy building complete 
                    web applications from concept to deployment. I'm particularly drawn to creating 
                    user-friendly interfaces and efficient, scalable backend systems.
                  </p>
                </AnimatedText>
                
                <AnimatedText delay={0.2}>
                  <p>
                    Currently pursuing my Bachelor's in Computer Science & Engineering, I'm always 
                    eager to learn new technologies and take on challenging projects that push my 
                    skills to the next level.
                  </p>
                </AnimatedText>
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white">Education</h4>
              </div>
              <div className="space-y-2">
                <p className="text-blue-300 font-semibold">Bachelor of Technology</p>
                <p className="text-gray-300">Computer Science & Engineering</p>
                <p className="text-gray-400 text-sm mt-1">Galgotias University</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills & Photo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Profile Photo */}
            <motion.div 
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ProfileTiltPhoto />
            </motion.div>

            {/* Technical Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-2xl p-8 border border-slate-700/30 backdrop-blur-sm hover:backdrop-blur-md transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/5 hover:border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-white">Technical Skills</h3>
              </div>
              
              <div className="space-y-8">
                {/* Frontend */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Code className="w-5 h-5 text-blue-400" />
                    <h4 className="text-lg font-semibold text-blue-300">Frontend</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skills.frontend.map((skill) => (
                      <SkillPill key={skill} skill={skill} category="frontend" />
                    ))}
                  </div>
                </motion.div>

                {/* Backend */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Server className="w-5 h-5 text-purple-400" />
                    <h4 className="text-lg font-semibold text-purple-300">Backend</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skills.backend.map((skill) => (
                      <SkillPill key={skill} skill={skill} category="backend" />
                    ))}
                  </div>
                </motion.div>

                {/* Tools & Databases */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Database className="w-5 h-5 text-amber-400" />
                    <h4 className="text-lg font-semibold text-amber-300">Tools & Databases</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skills.tools.map((skill) => (
                      <SkillPill key={skill} skill={skill} category="tools" />
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500"
            >
              <blockquote className="text-gray-300 italic relative pl-6 border-l-2 border-blue-500/30">
                <span className="absolute -left-3 text-4xl text-blue-400">"</span>
                <p className="pl-4">
                  Code is like humor. When you have to explain it, it's bad.
                </p>
              </blockquote>
              <p className="text-blue-300 text-sm text-right mt-3 font-medium">- Cory House</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
