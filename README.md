# Mara

A blank, production-ready foundation for building a modern website.

## Included

- Next.js and React
- TypeScript
- Tailwind CSS
- Reusable interface components
- Cloudflare-compatible Vinext build configuration
- Empty home page with no imposed design or content

## Start locally

```bash
npm install
npm run dev
```

## Validate changes

```bash
npm run typecheck
npm run build
```

Build the site from `app/page.tsx`. Shared styling belongs in `app/globals.css`, reusable elements belong in `components/`, and future images or videos can be placed in `public/`.

Store local secrets in `.env.local`. Environment files are ignored by Git and credentials should never be committed.
