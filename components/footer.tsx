"use client";

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    <footer className="py-12 border-t border-white/5 relative bg-[#09090B]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left"
          >
            <h3 className="text-xl font-bold text-gradient tracking-tighter">
              KULDEEP MALVIYA
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              Software Engineer & Digital Artisan
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-12 h-12 bg-white/5 text-muted-foreground rounded-2xl border border-white/5 hover:bg-white/10 hover:text-white hover:border-blue-500/20 transition-all duration-300 shadow-xl"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
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
            <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-end gap-2">
              © 2024 Built with <Heart className="w-3 h-3 text-red-500 animate-pulse" /> by Kuldeep
            </p>
            <p className="text-[10px] text-muted-foreground/40 uppercase tracking-[0.2em] mt-1">
              All Rights Reserved
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
