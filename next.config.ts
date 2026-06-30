import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  typescript: {
    tsconfigPath: "./tsconfig.json",
  },

  eslint: {
    dirs: ["src"],
  },

  images: {
    unoptimized: true,
  },
};

export default nextConfig;