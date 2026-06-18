/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        hostname: "i.ibb.co",
        protocol: "https",
      }
    ],
  },
};

export default nextConfig;
