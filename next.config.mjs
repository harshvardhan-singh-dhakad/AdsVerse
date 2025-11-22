/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/services',
                destination: '/our-services',
                permanent: true,
            },
            {
                source: '/en/services',
                destination: '/en/our-services',
                permanent: true,
            },
            {
                source: '/hi/services',
                destination: '/hi/our-services',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;
