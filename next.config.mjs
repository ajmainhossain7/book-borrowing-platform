/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: 'i.ibb.co.com',
      },
      {
        hostname: 'covers.openlibrary.org',
      },
      {
        hostname: 'www.w3.org',
      }
    ],
  },
};

export default nextConfig;