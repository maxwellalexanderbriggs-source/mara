# Mara

A production-ready, motion-led website foundation built with Next.js, React, TypeScript, Tailwind CSS, and Vinext for Cloudflare-compatible deployment.

## Start locally

```bash
npm install
npm run dev
```

Before shipping changes, run `npm run typecheck` and `npm run build`.

## Media

- Put images, posters, and videos in `public/media/`.
- Use WebP or AVIF for photography and SVG for simple graphic assets.
- Use MP4 (H.264) plus WebM when broad, efficient video delivery matters.
- Always provide a poster for video and keep autoplay media muted and `playsInline`.
- `MediaFrame` accepts either an image or video and reserves its aspect ratio to prevent layout shift.

## Motion

The page uses CSS-first motion and a small pointer-parallax layer. Animation automatically collapses when a visitor enables **Reduce Motion**. Keep decorative movement on `transform` and `opacity` for smooth rendering.

## Structure

```text
app/                  Routes, metadata, and global visual system
components/           Reusable motion and media components
public/media/          Optimized images, video, and poster assets
.openai/hosting.json   Sites deployment configuration
```

Local secrets belong in `.env.local`, which is ignored by Git. Never commit credentials.
