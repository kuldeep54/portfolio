"use client";

import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('idle')
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setErrors({})
        
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        throw new Error(data.error || 'Failed to send message')
      }
      
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "malviyakuldeep54@gmail.com",
      href: "mailto:malviyakuldeep54@gmail.com"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-8303186080",
      href: "tel:+918303186080"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "India",
      href: null
    }
  ]

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
    }
  ]

  return (
    <section id="contact" className="pt-20 pb-20 bg-slate-900/50">
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
            Get In Touch
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto font-sans">
            Let's collaborate on your next project. I'm always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold font-heading text-white mb-6">
              Send a Message
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-sans">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 font-sans ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-600/50 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="Your Name"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 font-sans"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-sans">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 font-sans ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-600/50 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 font-sans"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-sans">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-200 resize-none font-sans ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-slate-600/50 focus:ring-blue-500 focus:border-transparent'
                  }`}
                  placeholder="Tell me about your project..."
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1 font-sans"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-lg transition-all duration-200 font-sans ${
                  isSubmitting
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } text-white`}
                whileHover={!isSubmitting ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <p className="text-green-400 font-sans">
                    Thank you! Your message has been sent successfully. I'll get back to you soon.
                  </p>
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <AlertCircle className="w-5 h-5 text-red-400" />
                  <p className="text-red-400 font-sans">
                    Sorry, there was an error sending your message. Please try again or contact me directly.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold font-heading text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-800/50 transition-all duration-200"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg">
                      <info.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 font-sans">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-white hover:text-blue-300 transition-colors duration-200 font-sans"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-white font-sans">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-bold font-heading text-white mb-4">
                Connect With Me
              </h4>
              
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 bg-slate-800/50 text-gray-300 rounded-lg border border-slate-700/50 hover:bg-slate-700/50 hover:text-white hover:border-slate-600/50 transition-all duration-200"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl border border-blue-500/20"
            >
              <h4 className="text-lg font-bold font-heading text-white mb-2">
                Ready to Start a Project?
              </h4>
              <p className="text-gray-300 font-sans mb-4">
                I'm available for freelance work and full-time opportunities.
              </p>
              <motion.a
                href="mailto:malviyakuldeep54@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-sans"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="w-4 h-4" />
                Let's Talk
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
