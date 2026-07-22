import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Ayush-Portfolio",
  env: {
    NEXT_PUBLIC_BASE_PATH: "/Ayush-Portfolio",
  },
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
