"use client";

import { motion } from 'framer-motion'
import { Code, Zap, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Values() {
  const values = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code with a focus on long-term sustainability."
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing every interaction for speed and fluidity, ensuring a seamless user experience across devices."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Designing with empathy for the end user, prioritising intuitive flows and accessible interfaces."
    }
  ]

  return (
    <section id="values" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            The Philosophy of <span className="text-gradient">Craftsmanship</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            The core principles that guide my approach to engineering and creative problem-solving.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group text-center p-10 glass-card rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-2xl transform-gpu"
              whileHover={{ y: -10 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/5 text-white rounded-3xl mb-8 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all duration-500 shadow-inner">
                <value.icon className="w-10 h-10 text-gradient" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors duration-300">
                {value.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
