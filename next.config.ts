import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['via.placeholder.com'],
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.architect.io',
            },
        ],
    },
};

export default nextConfig;
