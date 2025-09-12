"use client";

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export function ProfileTiltPhoto() {
  const [isHovered, setIsHovered] = useState(false)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY

    const rotateXValue = (mouseY / (rect.height / 2)) * -10
    const rotateYValue = (mouseX / (rect.width / 2)) * 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={ref}
      className="relative w-64 h-80 perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
        animate={{
          scale: isHovered ? 1.05 : 1,
          rotateX: rotateX,
          rotateY: rotateY,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20,
          mass: 0.5
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-1">
          <div className="w-full h-full bg-slate-900 rounded-xl overflow-hidden">
            <Image
              src="/WhatsApp Image 2025-09-11 at 23.54.37_c88f92b9.jpg"
              alt="Kuldeep Malviya - Professional Photo"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 256px"
              priority
            />
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-600/20 via-transparent to-purple-600/20 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Professional Badge */}
        <motion.div
          className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 border border-slate-700/50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white font-semibold text-sm font-heading">Kuldeep Malviya</p>
          <p className="text-gray-300 text-xs font-sans">Full-Stack Developer</p>
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full"
        animate={{
          y: isHovered ? -5 : 0,
          scale: isHovered ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute -bottom-2 -left-2 w-3 h-3 bg-purple-500 rounded-full"
        animate={{
          y: isHovered ? 5 : 0,
          scale: isHovered ? 1.3 : 1,
        }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
    </motion.div>
  )
}
