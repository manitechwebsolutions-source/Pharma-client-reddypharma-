import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  typescript: {
    tsconfigPath: "./tsconfig.json",
  },

  eslint: {
   ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;