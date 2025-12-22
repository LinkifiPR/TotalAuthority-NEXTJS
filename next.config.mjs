/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pgbcixncaeyjunwxrsik.supabase.co',
      },
    ],
  },
  // Ignore TypeScript errors during build (for migration)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Ensure compatibility with Replit
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
