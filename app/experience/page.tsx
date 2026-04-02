import { Experience } from '@/components/experience'
import { Metadata } from 'next'
import { siteMetadata } from '@/lib/data'

export const metadata: Metadata = {
  title: `Experience | ${siteMetadata.title}`,
  description: siteMetadata.description,
}

export default function ExperiencePage() {
  return (
    <div className="pt-24 min-h-screen">
      <Experience />
    </div>
  )
}
