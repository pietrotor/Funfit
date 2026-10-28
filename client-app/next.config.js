/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.pinclipart.com']
  },
  async redirects() {
    const destination = '/administration-panel/dailySale'
    return ['/', '/order', '/producto/:path*', '/gratitudePage'].map(
      source => ({ source, destination, permanent: false })
    )
  }
}

module.exports = nextConfig
