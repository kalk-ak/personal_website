import type { NextConfig } from "next";

// GitHub Pages serves this repo at /personal_website/, not at the domain
// root, so assets need that prefix baked in. Only apply it in CI (where
// GITHUB_ACTIONS is set) so local dev and builds still run at the root path.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "personal_website";
const basePath = isGithubActions ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  // next/image doesn't add basePath to src, so components need it by hand.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    viewTransition: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGithubActions && {
    basePath,
    assetPrefix: basePath,
  }),
};

export default nextConfig;
