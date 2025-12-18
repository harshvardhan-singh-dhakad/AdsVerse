/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.adsverse.in',
          },
        ],
        destination: 'https://adsverse.in/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
