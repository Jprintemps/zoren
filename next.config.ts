import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isUserSite = repositoryName.endsWith(".github.io");
const explicitBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";
const derivedBasePath = repositoryName && !isUserSite ? `/${repositoryName}` : "";
const basePath = explicitBasePath || derivedBasePath;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
