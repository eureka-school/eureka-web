/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eureka-school.s3.us-east-005.backblazeb2.com",
      },
    ],
  },
};

module.exports = nextConfig;
