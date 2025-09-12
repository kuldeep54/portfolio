import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Experience } from '@/components/experience'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Values } from '@/components/values'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'
import { Navbar } from '@/components/navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-gray-100 overflow-x-hidden">
      <Navbar />
      <div className="pt-16"> {/* Add padding to account for fixed navbar */}
        <Hero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <About />
          <div className="mt-24">
            <Experience />
          </div>
          <div className="mt-24">
            <Skills />
          </div>
          <div className="mt-24">
            <Projects />
          </div>
          <div className="mt-24">
            <Values />
          </div>
          <div className="mt-24">
            <Contact />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
