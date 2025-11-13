"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Github, ExternalLink, ArrowRight, Code, Star } from 'lucide-react';
import { projects } from '@/lib/data';
import { useRef, useState } from 'react';

type Project = typeof projects[0];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.8 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  const yProgress = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === (project.screenshots?.length || 1) - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? (project.screenshots?.length || 1) - 1 : prevIndex - 1
    );
  };

  const hasMultipleImages = project.screenshots && project.screenshots.length > 1;

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
        y: yProgress,
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-slate-800/30 to-slate-900/30 backdrop-blur-sm transition-all duration-300 hover:border-white/10 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <div className="relative aspect-video overflow-hidden">
        {project.screenshots ? (
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500 z-10" />
            <Image
              src={project.screenshots[currentImageIndex] || project.image}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 2}
              unoptimized={process.env.NODE_ENV !== 'production'}
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70 hover:scale-110"
                  aria-label="Next image"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                  {project.screenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentImageIndex(i);
                      }}
                      className={`h-1.5 rounded-full transition-all ${
                        i === currentImageIndex 
                          ? 'w-6 bg-gradient-to-r from-blue-400 to-purple-500' 
                          : 'w-2 bg-white/30 hover:bg-white/50'
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
            <Code className="h-12 w-12 text-slate-600" />
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-300">
            {project.title}
          </h3>
          {project.featured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 group-hover:border-blue-400/30 transition-all duration-300">
              <Star className="w-3 h-3" />
              <span>Featured</span>
            </span>
          )}
        </div>
        
        <p className="text-gray-400 text-sm mb-6 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
          {project.description}
        </p>
        
        <div className="pt-4 border-t border-slate-700/50 group-hover:border-slate-600/50 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-slate-800/50 text-xs text-blue-100 rounded-full border border-slate-700/50 group-hover:border-slate-600/50 group-hover:bg-slate-700/50 transition-all duration-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              {project.liveDemo && project.liveDemo !== '#' && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-2 px-4 py-2.5 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <span className="relative z-10">Live Demo</span>
                  <ExternalLink className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 group/github"
                  aria-label="GitHub Repository"
                  title="View on GitHub"
                >
                  <Github className="w-5 h-5 group-hover/github:scale-110 transition-transform duration-300" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
    </motion.div>
  );
};

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1 1"],
  });

  const opacityProgress = useTransform(scrollYProgress, [0, 0.7], [0.2, 1]);
  const yProgress = useTransform(scrollYProgress, [0, 0.7], [30, 0]);

  // Filter featured projects
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  return (
    <section ref={ref} id="projects" className="relative py-24 overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 90% 80%, rgba(168, 85, 247, 0.05) 0%, transparent 25%),
            radial-gradient(circle at 50% 50%, rgba(16, 24, 39, 1) 0%, rgba(15, 23, 42, 1) 100%)
          `,
          opacity: opacityProgress
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-block text-sm font-medium text-blue-400 mb-4 tracking-wider"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            MY WORK
          </motion.span>
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Featured Projects
            </span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            A collection of my recent work, built with modern technologies and best practices
          </motion.p>
        </motion.div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <h3 className="text-2xl font-bold text-white mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400">
                Other Projects
              </span>
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://github.com/kuldeep54"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 text-white rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/10 hover:border-blue-500/30"
          >
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
