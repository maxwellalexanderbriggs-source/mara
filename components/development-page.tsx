"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ElementType, useEffect, useRef, useState } from "react";
import ProjectNavigation from "@/components/project-navigation";
import SiteFooter from "@/components/site-footer";

type Locale = "EN" | "RO";
type Metric = { value: number; decimals?: number; prefix?: string; suffix?: string; label: string };
type Story = { eyebrow: string; title: string; body: string; image: string; alt: string };
type Copy = {
  name: string;
  eyebrow: string;
  title: string[];
  intro: string;
  introductionEyebrow: string;
  introductionTitle: string[];
  introductionBody: string;
  metrics: Metric[];
  locationEyebrow: string;
  locationTitle: string[];
  locationBody: string;
  locationStories: Story[];
  amenitiesEyebrow: string;
  amenitiesTitle: string[];
  amenitiesBody: string;
  amenityStories: Story[];
  closingEyebrow: string;
  closingTitle: string[];
  nextLabel: string;
};

export type DevelopmentConfig = {
  slug: "avenue" | "forum";
  mark: string;
  hero: string;
  nextHref: string;
  nextImage: string;
  copy: Record<Locale, Copy>;
};

const apartmentLinks: Record<Locale, string> = {
  EN: "https://www.cityofmara.ro/en/proiect-interactiv_/",
  RO: "https://www.cityofmara.ro/proiect-interactiv_/",
};

const interfaceCopy = {
  EN: { back: "City of Mara", find: "Find an apartment", project: "The project", location: "Location", amenities: "Amenities", explore: "Explore apartments", next: "Discover" },
  RO: { back: "City of Mara", find: "Caută apartament", project: "Proiectul", location: "Locație", amenities: "Facilități", explore: "Descoperă apartamentele", next: "Descoperă" },
};

export default function DevelopmentPage({ config }: { config: DevelopmentConfig }) {
  const [locale, setLocale] = useState<Locale>("EN");
  const copy = config.copy[locale];
  const ui = interfaceCopy[locale];

  return (
    <main className={`development-page development-${config.slug}`}>
      <ProjectNavigation locale={locale} onLocale={setLocale} mark={config.mark} name={copy.name} />

      <section id="top" className="development-hero">
        <RevealImage src={config.hero} alt={`${copy.name}, City of Mara`} eager parallax />
        <div className="development-hero-shade" />
        <div className="development-hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <RiseHeading as="h1" lines={copy.title} />
          <p>{copy.intro}</p>
        </div>
        <nav className="development-anchor-nav" aria-label="On this page">
          <a href="#introduction">{ui.project}</a><Link href={`/${config.slug}/location`}>{ui.location}</Link><a href="#amenities">{ui.amenities}</a>
        </nav>
      </section>

      <section id="introduction" className="development-intro development-gutter">
        <p className="eyebrow dark">{copy.introductionEyebrow}</p>
        <RiseHeading as="h2" lines={copy.introductionTitle} />
        <div className="development-intro-body">
          <p>{copy.introductionBody}</p>
          <a className="editorial-link" href={apartmentLinks[locale]}><RollingLabel label={ui.explore} /><ArrowRight size={17} /></a>
        </div>
      </section>

      <section className="development-metrics development-gutter" aria-label="Project facts">
        {copy.metrics.map((metric) => <CountMetric key={metric.label} metric={metric} />)}
      </section>

      <StorySection id="location" eyebrow={copy.locationEyebrow} title={copy.locationTitle} body={copy.locationBody} stories={copy.locationStories} />
      <StorySection id="amenities" eyebrow={copy.amenitiesEyebrow} title={copy.amenitiesTitle} body={copy.amenitiesBody} stories={copy.amenityStories} dark />

      <section className="development-closing">
        <RevealImage src={config.nextImage} alt="City of Mara" />
        <div className="development-closing-shade" />
        <div className="development-closing-copy">
          <p className="eyebrow">{copy.closingEyebrow}</p>
          <RiseHeading as="h2" lines={copy.closingTitle} />
          <Link href={config.nextHref}>{ui.next} {copy.nextLabel}<ArrowRight size={18} /></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

function StorySection({ id, eyebrow, title, body, stories, dark = false }: { id: string; eyebrow: string; title: string[]; body: string; stories: Story[]; dark?: boolean }) {
  return <section id={id} className={`development-story${dark ? " story-dark" : ""}`}>
    <div className="story-left"><div className="story-sticky"><p className="eyebrow">{eyebrow}</p><RiseHeading as="h2" lines={title} /><p className="story-intro">{body}</p></div></div>
    <div className="story-feed">{stories.map((story, index) => <article className="story-card" key={`${story.title}-${index}`}>
      <RevealImage src={story.image} alt={story.alt} />
      <div className="story-card-copy"><span>0{index + 1}</span><div><p>{story.eyebrow}</p><RiseHeading as="h3" lines={[story.title]} /><p className="story-body">{story.body}</p></div></div>
    </article>)}</div>
  </section>;
}

function RiseHeading({ as: Tag, lines }: { as: ElementType; lines: string[] }) {
  const ref = useReveal<HTMLHeadingElement>();
  return <Tag ref={ref} className="rise-heading">{lines.map((line, index) => <span className="rise-line" key={`${line}-${index}`}><span style={{ transitionDelay: `${index * 90}ms` }}>{line}</span></span>)}</Tag>;
}

function RevealImage({ src, alt, eager = false, parallax = false }: { src: string; alt: string; eager?: boolean; parallax?: boolean }) {
  const ref = useReveal<HTMLDivElement>();
  return <div ref={ref} className={`wipe-image${eager ? " wipe-eager" : ""}`} data-parallax={parallax || undefined}><div className="wipe-image-inner"><img src={src} alt={alt} loading={eager ? "eager" : "lazy"} /></div></div>;
}

function CountMetric({ metric }: { metric: Metric }) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min(1, (now - start) / 1200);
        setDisplay(metric.value * (1 - Math.pow(1 - progress, 4)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: .08, rootMargin: "0px 0px -5% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, [metric.value]);
  return <div ref={ref} className="development-metric"><strong>{metric.prefix}{display.toFixed(metric.decimals ?? 0)}{metric.suffix}</strong><span>{metric.label}</span></div>;
}

function RollingLabel({ label }: { label: string }) {
  return <span className="rolling-label"><span>{label}</span><span aria-hidden="true">{label}</span></span>;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.classList.add("is-visible"); observer.disconnect(); }
    }, { threshold: 0, rootMargin: "0px 0px -5% 0px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}
