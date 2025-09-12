"use client";

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export function RaihanHero() {
  const scrollToNext = () => {
    const aboutSection = document.querySelector('#about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="home" 
      className="relative flex items-center justify-center text-center h-screen overflow-hidden"
      role="banner"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/me.jpg"
          alt="RAIHAN fadil portrait"
          fill
          className="object-cover object-top"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

      {/* Content Container */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {/* Main Heading */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.0,
            delay: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          I BUILD THE QUIET SPACE—
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-white/90 leading-relaxed mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.0,
            delay: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          WHERE FUNCTION AND BEAUTY MEET.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          className="inline-flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          whileHover={{ y: -5 }}
          aria-label="Scroll to explore more content"
        >
          <span className="text-sm sm:text-base font-medium mb-2 tracking-wide">
            Scroll to explore ↓
          </span>
          
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="group-hover:scale-110 transition-transform duration-300"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Subtle Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
    </section>
  )
}
