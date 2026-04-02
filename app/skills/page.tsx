import { Skills } from '@/components/skills'
import { Metadata } from 'next'
import { siteMetadata } from '@/lib/data'

export const metadata: Metadata = {
  title: `Skills | ${siteMetadata.title}`,
  description: siteMetadata.description,
}

export default function SkillsPage() {
  return (
    <div className="pt-24 min-h-screen">
      <Skills />
    </div>
  )
}
