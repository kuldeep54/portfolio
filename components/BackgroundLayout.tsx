"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ReactNode, useRef } from 'react'

interface BackgroundLayoutProps {
  children: ReactNode
  backgroundImage?: string
  overlayOpacity?: number
}

export function BackgroundLayout({ 
  children, 
  backgroundImage = "/mountain.jpg",
  overlayOpacity = 0.4 
}: BackgroundLayoutProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Parallax effect: slight zoom on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Full-screen background image with animations */}
      <motion.div
        className="fixed inset-0 w-full h-full z-0"
        style={{ scale, y }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        <Image
          src={backgroundImage}
          alt="Mountain Background"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay for text readability */}
      <motion.div
        className="fixed inset-0 z-10"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.3,
          ease: "easeOut"
        }}
      />

      {/* Content container */}
      <div className="relative z-20 min-h-screen">
        {children}
      </div>
    </div>
  )
}
