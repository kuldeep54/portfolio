import { Education } from '@/components/education'
import { Metadata } from 'next'
import { siteMetadata } from '@/lib/data'

export const metadata: Metadata = {
  title: `Education | ${siteMetadata.title}`,
  description: siteMetadata.description,
}

export default function EducationPage() {
  return (
    <div className="pt-24 min-h-screen">
      <Education />
    </div>
  )
}
