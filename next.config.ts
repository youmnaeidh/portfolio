import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves this project beneath /portfolio, without a Node server.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;

