import { About } from '@/components/about'
import { Metadata } from 'next'
import { siteMetadata } from '@/lib/data'

export const metadata: Metadata = {
  title: `About | ${siteMetadata.title}`,
  description: siteMetadata.description,
}

export default function AboutPage() {
  return (
    <div className="pt-24 min-h-screen">
      <About />
    </div>
  )
}
