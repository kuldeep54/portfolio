import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteMetadata } from '@/lib/data'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })
const AnimatedBackground = dynamic(() => import('@/components/AnimatedBackground'), { ssr: false })
import { LoadingIndicator } from '@/components/LoadingIndicator'
import { Suspense } from 'react'

// We use framer-motion and CSS for stable '3D-like' effects
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: siteMetadata.author }],
  creator: siteMetadata.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.image,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
    creator: '@kuldeep54',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark select-none">
      <body className={`${inter.className} bg-[#09090B] antialiased`}>
        <SmoothScroll>
          <CustomCursor />
          <div className="relative z-0 min-h-screen overflow-x-hidden">
            <Suspense fallback={null}>
              <LoadingIndicator />
            </Suspense>
            <AnimatedBackground />
            <Navbar />
            <main className="min-h-screen text-foreground selection:bg-blue-500/30">
              {children}
            </main>
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  )
}
