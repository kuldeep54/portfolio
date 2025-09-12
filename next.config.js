/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports
  output: 'export',
  
  // Configure images
  images: {
    // Disable image optimization for static export
    unoptimized: true,
  },
  
  // Add base path if your site is served from a subdirectory
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  
  // Add asset prefix if your assets are served from a CDN
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
}

module.exports = nextConfig
