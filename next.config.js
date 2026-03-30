/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Three.js is bundled properly
  transpilePackages: ['three'],
}
module.exports = nextConfig
