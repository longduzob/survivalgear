/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'ae01.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ae04.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ae02.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ae03.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ae05.alicdn.com',
      },
      {
        protocol: 'https',
        hostname: 'www.aliexpress.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
