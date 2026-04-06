import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  basePath: process.env.BASE_PATH || "",
  env: { BASE_PATH: process.env.BASE_PATH || "" },
  outputFileTracingRoot: path.join(__dirname, "../../"),
  turbopack: {
    root: path.join(__dirname, "../../"),
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
