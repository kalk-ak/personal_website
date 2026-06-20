# Personal Website

My portfolio site. Next.js, Tailwind, Framer Motion.

## Running it locally

```bash
npm install
npm run dev
```

Opens at http://localhost:3000.

## Course admin

Small local-only tool for adding/removing entries in the coursework section without hand-editing the JSON file:

```bash
npm run admin
```

Runs at http://localhost:4545. Never part of the deployed site.

## Deploying

Pushes to `master` kick off the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages. Pages needs to be set to "GitHub Actions" as its source under repo Settings, otherwise the deploy step fails.
