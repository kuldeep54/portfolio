"use client";

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

export function Footer() {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/kuldeep54"
    },
    {
      icon: Linkedin,
      label: "LinkedIn", 
      href: "https://linkedin.com/in/kuldeep-malviya-017314253"
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:malviyakuldeep54@gmail.com"
    }
  ]

  return (
    <footer className="py-12 bg-slate-900/80 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold font-heading bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              KULDEEP
            </h3>
            <p className="text-gray-400 text-sm font-sans mt-1">
              Full-Stack Developer
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-4"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-slate-800/50 text-gray-400 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 hover:text-white hover:border-slate-600/50 transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center md:text-right"
          >
            <p className="text-gray-400 text-sm font-sans flex items-center justify-center md:justify-end gap-1">
              © 2024 Made with <Heart className="w-3 h-3 text-red-400" /> by Kuldeep Malviya
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
