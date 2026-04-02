"use client";

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';
import { BalancedText, HolographicText } from './PerfectText';

export function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Custom Tilt Effect Logic for the Form Card
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]), { stiffness: 100, damping: 30 });

  function onMouseMove(event: React.MouseEvent) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={containerRef} id="contact" className="relative py-32 overflow-hidden min-h-screen flex items-center justify-center">
      <motion.div 
        style={{ opacity, scale }}
        className="max-w-7xl mx-auto px-6 lg:px-8 w-full"
      >
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4"
          >
            <MessageSquare className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-medium text-indigo-400 uppercase tracking-widest">Connect With Me</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          
          <BalancedText 
            text="Have a project in mind or just want to say hi? My inbox is always open."
            font='400 20px "Plus Jakarta Sans"'
            maxWidth={600}
            lineHeight={30}
            className="text-muted-foreground/80"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Contact Info & Hub */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="glass-card rounded-[2.5rem] p-10 border border-white/5 space-y-12">
               <div>
                  <h3 className="text-3xl font-bold text-white mb-8 tracking-tight">Information</h3>
                  <div className="space-y-6">
                    {[
                      { icon: Mail, label: 'Email', value: 'malviyakuldeep54@gmail.com', href: 'mailto:malviyakuldeep54@gmail.com', color: 'blue' },
                      { icon: Phone, label: 'Phone', value: '+91-8303186080', href: 'tel:+918303186080', color: 'purple' },
                      { icon: MapPin, label: 'Location', value: 'Greater Noida, India', color: 'emerald' },
                    ].map((item, i) => (
                      <motion.a
                        key={i}
                        href={item.href}
                        whileHover={{ x: 10 }}
                        className="flex items-center gap-5 group"
                      >
                        <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center transition-all group-hover:scale-110 shadow-lg`}>
                          <item.icon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">{item.label}</p>
                          <p className="text-lg font-medium text-muted-foreground group-hover:text-white transition-colors">{item.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>
               </div>

               <div>
                  <h3 className="text-xl font-bold text-white mb-6 tracking-tight">Social Networks</h3>
                  <div className="flex gap-4">
                    {[
                      { icon: Github, href: 'https://github.com/kuldeep54', color: 'bg-white/5 hover:bg-white/10' },
                      { icon: Linkedin, href: 'https://linkedin.com/in/kuldeep-malviya-017314253', color: 'bg-blue-600/10 hover:bg-blue-600/20' },
                    ].map((social, i) => (
                      <motion.a
                        key={i}
                        href={social.href}
                        target="_blank"
                        whileHover={{ y: -5, scale: 1.1 }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 transition-all text-white shadow-xl ${social.color}`}
                      >
                        <social.icon className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
               </div>
            </div>

            {/* Availability Badge */}
            <div className="p-8 glass-card border-l-4 border-l-green-500 rounded-3xl flex items-center gap-6">
                <div className="relative">
                  <div className="w-4 h-4 rounded-full bg-green-500 animate-ping absolute inset-0" />
                  <div className="w-4 h-4 rounded-full bg-green-500 relative z-10" />
               </div>
               <div>
                  <p className="text-white font-bold text-lg">Currently Available</p>
                  <p className="text-muted-foreground text-sm">Open for full-time roles and freelance opportunities.</p>
               </div>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="perspective-1000"
          >
            <motion.div
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              style={{ rotateX, rotateY }}
              className="glass-card rounded-[2.5rem] p-10 border border-white/5 shadow-2xl transform-gpu"
            >
              <h3 className="text-3xl font-bold text-white mb-10 tracking-tight">Send Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] ml-1">Your Message</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all font-medium resize-none"
                    placeholder="How can I help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full relative group overflow-hidden rounded-2xl bg-blue-600 py-5 font-bold text-white shadow-xl hover:bg-blue-500 transition-all disabled:opacity-50"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        {submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
                        <Send className={`w-5 h-5 transition-transform ${submitStatus === 'success' ? 'scale-0' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </form>

              {/* Status Indicator */}
              {submitStatus === 'success' && (
                <div className="mt-8 pt-8 border-t border-white/5">
                   <HolographicText 
                    text="THANKS! I'LL GET BACK TO YOU SHORTLY."
                    font='700 24px "Plus Jakarta Sans"'
                    maxWidth={400}
                    lineHeight={32}
                    className="!text-emerald-400"
                   />
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <p className="text-sm text-red-400 font-medium">Failed to send. Please try again or email me directly.</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
