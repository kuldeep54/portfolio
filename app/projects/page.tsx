import { Projects } from '@/components/projects'
import { Metadata } from 'next'
import { siteMetadata } from '@/lib/data'

export const metadata: Metadata = {
  title: `Projects | ${siteMetadata.title}`,
  description: siteMetadata.description,
}

export default function ProjectsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <Projects />
    </div>
  )
}
