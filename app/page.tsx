import { Hero } from '@/components/hero'

export default function Home() {
  return (
    <div className="relative pt-16">
      <Hero />
      
      {/* Landing Hub only shows Hero and minimal overview */}
      <div className="flex flex-col gap-32 pb-32">
        <section className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8 opacity-20">Full academic & professional history available across pages</h2>
        </section>
      </div>
    </div>
  )
}
