"use client";

import { motion } from 'framer-motion'
import { Code, Zap, Users } from 'lucide-react'

export function Values() {
  const values = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code"
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Optimizing apps for speed & UX"
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Designing with the end user in mind"
    }
  ]

  return (
    <section id="values" className="py-20 bg-slate-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold font-heading text-white mb-6">
            My Philosophy
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto font-sans">
            The core principles that guide my approach to development and problem-solving.
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group text-center p-8 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300"
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
                <value.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold font-heading text-white mb-4 group-hover:text-blue-300 transition-colors duration-300">
                {value.title}
              </h3>
              
              <p className="text-gray-300 font-sans leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
