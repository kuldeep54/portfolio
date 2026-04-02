import { Contact } from '@/components/contact'
import { Metadata } from 'next'
import { siteMetadata } from '@/lib/data'

export const metadata: Metadata = {
  title: `Contact | ${siteMetadata.title}`,
  description: siteMetadata.description,
}

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen">
      <Contact />
    </div>
  )
}
