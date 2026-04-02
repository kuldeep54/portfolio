"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', id: '/' },
    { name: 'About', id: '/about' },
    { name: 'Experience', id: '/experience' },
    { name: 'Education', id: '/education' },
    { name: 'Skills', id: '/skills' },
    { name: 'Projects', id: '/projects' },
    { name: 'Contact', id: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500",
      scrolled ? "bg-[#09090B]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:rotate-12 transition-transform">
            K
          </div>
          <span className="text-xl font-bold tracking-tighter text-white">
            Kuldeep <span className="text-gradient">Malviya</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.id}
              className={cn(
                "text-sm font-medium tracking-wide transition-all hover:text-blue-400",
                pathname === item.id ? "text-blue-500 underline underline-offset-8" : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <a 
            href="/api/download-resume"
            className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white text-sm font-bold rounded-full border border-white/10 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4 text-blue-400" />
            Resume
          </a>
          <Link href="/contact">
            <button className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95">
              Hire Me
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-muted-foreground hover:text-white transition-colors"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#09090B] border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.id}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium",
                    pathname === item.id ? "text-blue-500" : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <button className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl">
                  Hire Me
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
