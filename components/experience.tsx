"use client";

import { motion } from 'framer-motion'
import { Calendar, MapPin, Award, ChevronRight } from 'lucide-react'

export function Experience() {
  const experiences = [
    {
      id: 1,
      title: "AI-ML Virtual Internship",
      company: "AICTE",
      location: "Remote",
      duration: "Jan 2024 - Mar 2024",
      type: "Internship",
      achievements: [
        "AWS AI-ML Foundations certified",
        "Data preprocessing, model training, evaluation, deployment",
        "Gained hands-on experience with machine learning workflows"
      ]
    },
    {
      id: 2,
      title: "Cloud Virtual Internship", 
      company: "AICTE",
      location: "Remote",
      duration: "Sept 2023 - Nov 2023",
      type: "Internship",
      achievements: [
        "AWS Cloud Foundations certified",
        "Learned architecture, services, security, deployment",
        "Understanding of cloud infrastructure and best practices"
      ]
    }
  ]

  return (
    <section id="experience" className="py-20 bg-slate-800/30">
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
            Experience
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto font-sans">
            My professional journey and key learning experiences in technology and development.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full border-4 border-slate-900 shadow-lg"></div>

                {/* Experience Card */}
                <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 group">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold font-heading text-white group-hover:text-blue-300 transition-colors duration-300">
                          {exp.title}
                        </h3>
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 font-sans">
                          {exp.type}
                        </span>
                      </div>
                      
                      <h4 className="text-xl font-semibold text-blue-400 mb-4 font-heading">
                        {exp.company}
                      </h4>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-400 font-sans">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h5 className="text-lg font-semibold text-white mb-4 flex items-center gap-2 font-heading">
                      <Award className="w-5 h-5 text-yellow-400" />
                      Key Achievements
                    </h5>
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: 0.1 * idx }}
                          className="flex items-start gap-3 text-gray-300 font-sans"
                        >
                          <ChevronRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg mb-6 font-sans">
            Interested in my professional journey?
          </p>
          <motion.a
            href="https://drive.google.com/file/d/1234567890/view"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 font-sans"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Award className="w-5 h-5 mr-2" />
            View Full Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
