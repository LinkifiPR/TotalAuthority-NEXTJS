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
    // Tree-shake large icon/util barrels so only used exports are bundled.
    // Cuts a significant slice of the first-party client JS.
    optimizePackageImports: ['lucide-react', 'date-fns', 'recharts'],
  },
};

export default nextConfig;
