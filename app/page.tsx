import { ArrowDown, ArrowUpRight, Play } from "lucide-react";
import { MotionShell } from "@/components/motion-shell";
import { MediaFrame } from "@/components/media-frame";

const capabilities = [
  ["01", "Motion", "Scroll reveals, ambient movement, and tactile hover states."],
  ["02", "Film", "Responsive video with posters, captions, and mobile-safe playback."],
  ["03", "Imagery", "Optimized art direction without layout shift or visual noise."],
] as const;

export default function Home() {
  return (
    <MotionShell>
      <main>
        <nav className="site-nav" aria-label="Primary navigation">
          <a className="wordmark" href="#top" aria-label="Mara, back to top">Mara<span>.</span></a>
          <a className="nav-link" href="#foundation">Explore <ArrowDown aria-hidden="true" size={15} /></a>
        </nav>

        <section className="hero" id="top">
          <div className="hero-kicker reveal" style={{ "--delay": "80ms" } as React.CSSProperties}>
            <span>Creative foundation</span><span>Est. 2026</span>
          </div>
          <h1 className="hero-title" aria-label="Move people">
            <span className="title-line title-line-one">Move</span>
            <span className="title-line title-line-two">people<span className="title-dot">.</span></span>
          </h1>
          <p className="hero-copy reveal" style={{ "--delay": "520ms" } as React.CSSProperties}>
            A cinematic, performance-minded starting point for stories told through motion, film, and image.
          </p>
          <div className="orbital" aria-hidden="true">
            <span className="orbital-ring" />
            <span className="orbital-core"><Play size={18} fill="currentColor" /></span>
          </div>
          <div className="hero-index" aria-hidden="true">001</div>
        </section>

        <section className="foundation" id="foundation">
          <div className="section-heading"><p>Built to flex</p><h2>A quiet system for<br />bold material.</h2></div>
          <MediaFrame
            className="feature-frame"
            eyebrow="Showreel"
            title="Your motion, full bleed"
            description="Replace the supplied poster with your own optimized video when the first reel is ready."
          />
          <div className="capability-grid">
            {capabilities.map(([number, title, copy]) => (
              <article className="capability" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <footer>
          <p>Mara — ready for what comes next.</p>
          <a href="#top">Back to top <ArrowUpRight aria-hidden="true" size={16} /></a>
        </footer>
      </main>
    </MotionShell>
  );
}
