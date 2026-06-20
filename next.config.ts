import type { NextConfig } from "next";

// GitHub Pages serves this repo at /personal_website/, not at the domain
// root, so assets need that prefix baked in. Only apply it in CI (where
// GITHUB_ACTIONS is set) so local dev and builds still run at the root path.
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "personal_website";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(isGithubActions && {
    basePath: `/${repoName}`,
    assetPrefix: `/${repoName}`,
  }),
};

export default nextConfig;
