"use client";

import { motion } from 'framer-motion';
import { ArrowRight, Code, Cpu, Database, Smartphone, GitBranch, Server, CpuIcon, ChevronDown, Download } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tech stack items with icons and colors
  const techStack = [
    { name: 'React', icon: <Code className="w-5 h-5" />, color: 'from-blue-400 to-cyan-400' },
    { name: 'Next.js', icon: <Cpu className="w-5 h-5" />, color: 'from-purple-400 to-pink-400' },
    { name: 'TypeScript', icon: <Code className="w-5 h-5" />, color: 'from-blue-500 to-blue-300' },
    { name: 'Node.js', icon: <Server className="w-5 h-5" />, color: 'from-green-400 to-emerald-300' },
    { name: 'Tailwind', icon: <Smartphone className="w-5 h-5" />, color: 'from-cyan-400 to-sky-300' },
  ];

  // Particles effect
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speedX: number, speedY: number}>>([]);
  
  useEffect(() => {
    if (!mounted) return;
    
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2
    }));
    
    setParticles(newParticles);
    
    const animate = () => {
      setParticles(prevParticles => 
        prevParticles.map(p => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100
        }))
      );
      animationId = requestAnimationFrame(animate);
    };
    
    let animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [mounted]);

  const handleResumeDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/download-resume');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Kuldeep_Malviya_Resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading resume:', error);
      // Fallback to direct link if API fails
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mountain Photo Background */}
        <div className="absolute inset-0">
          <img
            src="/mountain.jpg"
            alt="Scenic mountain view"
            className="w-full h-full object-cover object-center"
            style={{
              opacity: 0.15,
              filter: 'blur(12px) brightness(0.6) contrast(1.2)',
              transform: 'scale(1.1)',
              objectPosition: 'center 30%',
              mixBlendMode: 'soft-light'
            }}
          />
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/95"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black, transparent 70%)'
        }}></div>
        
        {/* Animated Particles */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-white/20 backdrop-blur-sm"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: 0.5 + Math.random() * 0.5,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6 group"
            >
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Open to New Opportunities
              </span>
            </motion.div>
            
            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Kuldeep</span>
            </motion.h1>
            
            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-300 mb-6 leading-relaxed"
            >
              Full-Stack Developer passionate about crafting exceptional digital experiences
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
                className="px-6 py-3.5 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 group"
              >
                Get In Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                className="px-6 py-3.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
              >
                View My Work
              </a>
              <motion.button
                onClick={handleResumeDownload}
                className="px-6 py-3.5 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Download CV</span>
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </motion.button>
            </motion.div>
          </div>

          {/* Profile Photo */}
          <motion.div 
            className="relative group mt-4 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-purple-400/70 transition-all duration-700 shadow-2xl">
              <motion.img
                src="/mountain.jpg"
                alt="Scenic mountain view"
                className="w-full h-full object-cover object-center"
                style={{
                  filter: 'brightness(0.9) contrast(1.1) saturate(1.1)',
                  transform: 'scale(1.05)'
                }}
                whileHover={{
                  scale: 1.1,
                  filter: 'brightness(1.1) contrast(1.2) saturate(1.3)',
                  transition: { 
                    duration: 0.6,
                    ease: [0.2, 0.8, 0.4, 1]
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-slate-900/40 rounded-full opacity-90 group-hover:opacity-60 transition-opacity duration-700"></div>
              <div className="absolute inset-0 rounded-full border-4 border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/0 via-transparent to-pink-500/0 opacity-0 group-hover:opacity-40 blur-xl -z-10 transition-all duration-1000 group-hover:scale-110"></div>
          </motion.div>
        </div>

        {/* Tech Stack */}
        <motion.div 
          className="mt-12 sm:mt-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <p className="text-xs sm:text-sm font-medium text-gray-400 mb-4">TECH STACK</p>
          <div className="flex flex-wrap justify-center gap-2">
            {techStack.map((tech, index) => (
              <motion.div 
                key={tech.name}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-sm rounded-lg border border-white/5 hover:border-white/10 transition-all text-sm"
                whileHover={{ 
                  y: -2,
                  boxShadow: '0 6px 12px -2px rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.08)'
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 10,
                  delay: index * 0.03
                }}
              >
                <span className={`bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                  {tech.icon}
                </span>
                <span className="text-sm font-medium text-gray-200">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
