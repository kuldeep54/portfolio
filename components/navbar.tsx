"use client";

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, Mail } from 'lucide-react'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/kuldeep54', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/kuldeep-malviya-017314253', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:malviyakuldeep54@gmail.com', label: 'Email' }
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${isScrolled ? 'bg-black/20 backdrop-blur-2xl border-b border-white/10 shadow-xl' : 'bg-transparent'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection('home')}
              className="group relative z-[110]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span 
                className="text-2xl font-light text-white tracking-wide"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Kuldeep{' '}
                <motion.span 
                  className="font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  Malviya
                </motion.span>
              </motion.span>
              <motion.div 
                className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 z-[110]">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group relative px-6 py-3 text-white/80 hover:text-white font-medium transition-all duration-300"
                  style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <span className="relative z-10">{item.name}</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.div 
                    className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                    initial={{ opacity: 0, scale: 0 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ transform: 'translateX(-50%)' }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Social Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-4 z-[110]">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 text-white/60 hover:text-white transition-all duration-300"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl backdrop-blur-sm border border-white/10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <social.icon className="w-5 h-5 relative z-10" />
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-12 h-12 relative text-white/80 hover:text-white transition-colors duration-300 z-[110]"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div 
                className="absolute inset-0 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute"
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="absolute"
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[90] md:hidden"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 h-full w-80 bg-black/40 backdrop-blur-2xl border-l border-white/10 shadow-2xl z-[95]"
            >
              <div className="flex flex-col h-full pt-24 px-8">
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="group w-full text-left p-4 text-white/80 hover:text-white font-medium transition-all duration-300 rounded-xl"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-white/5"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span className="relative z-10 text-lg">{item.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Social Links */}
                <div className="mt-auto mb-8">
                  <motion.div 
                    className="text-white/60 text-sm font-medium mb-4 tracking-wider uppercase"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    Connect
                  </motion.div>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative p-4 text-white/60 hover:text-white transition-all duration-300 rounded-xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-white/10"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                        <social.icon className="w-6 h-6 relative z-10" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
