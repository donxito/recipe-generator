/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['edamam-product-images.s3.amazonaws.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edamam-product-images.s3.amazonaws.com',
        pathname: '/web-img/**',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
  // Add these options
  experimental: {
    esmExternals: 'loose',
  },
  transpilePackages: ['react', 'react-dom'],
}

export default nextConfig