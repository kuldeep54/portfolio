/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],

  // ⚡ Redirect all traffic to new professional portfolio
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://kuldeep-malviya-atelier-pfpv.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
