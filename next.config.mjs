/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgur.com"],
    domains: ["api.qrserver.com"],
  },
  async redirects() {
    return [
      {
        source: '/certificate',
        destination: '/report',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
