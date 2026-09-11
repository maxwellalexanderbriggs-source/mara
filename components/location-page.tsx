"use client";

import { ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef, useState } from "react";
import ProjectNavigation from "@/components/project-navigation";
import SiteFooter from "@/components/site-footer";

type Locale = "EN" | "RO";
type Feature = { title: string; eyebrow: string; image: string };
type LocationCopy = {
  eyebrow: string; title: string; intro: string; statement: string; pairCaption: string;
  carouselEyebrow: string; carouselTitle: string; features: Feature[];
  ctaEyebrow: string; ctaTitle: string; ctaBody: string;
};

export type LocationConfig = {
  slug: "avenue" | "forum"; mark: string; hero: string; largeImage: string; smallImage: string;
  copy: Record<Locale, LocationCopy>;
};

export default function LocationPage({ config }: { config: LocationConfig }) {
  const [locale, setLocale] = useState<Locale>("EN");
  const railRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const copy = config.copy[locale];
  const apartments = locale === "RO" ? "https://www.cityofmara.ro/proiect-interactiv_/" : "https://www.cityofmara.ro/en/proiect-interactiv_/";

  useLayoutEffect(() => {
    const rail = railRef.current;
    const stage = rail?.querySelector<HTMLElement>(".location-rail-stage");
    const track = trackRef.current;
    if (!rail || !stage || !track) return;
    gsap.registerPlugin(ScrollTrigger);

    const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const updateCards = (progress: number) => {
      const offset = progress * travel();
      if (progressRef.current) progressRef.current.textContent = `${String(Math.round(progress * (copy.features.length - 1)) + 1).padStart(2, "0")}  /  ${String(copy.features.length).padStart(2, "0")}`;
      cardsRef.current.forEach((card) => {
        if (!card) return;
        const center = card.offsetLeft - offset + card.offsetWidth / 2;
        const normalized = Math.max(-1.15, Math.min(1.15, (center - window.innerWidth / 2) / (window.innerWidth / 2)));
        const edge = Math.min(1, Math.max(0, (Math.abs(normalized) - .24) / .76));
        const curve = Math.sign(normalized) * Math.pow(edge, 1.45);
        gsap.set(card, { rotateY: curve * 13, rotateZ: curve * 2.4, y: edge * 18, scale: 1 - edge * .025, transformPerspective: 1800 });
      });
    };

    const context = gsap.context(() => {
      gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: rail,
          start: "top top",
          end: () => `+=${travel()}`,
          pin: stage,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => updateCards(self.progress),
          onRefresh: (self) => updateCards(self.progress),
        },
      });
      updateCards(0);
    }, rail);

    const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
    resizeObserver.observe(track);
    return () => { resizeObserver.disconnect(); context.revert(); };
  }, [copy.features.length]);

  return <main id="top" className={`location-page location-${config.slug}`}>
    <ProjectNavigation locale={locale} onLocale={setLocale} mark={config.mark} name={config.slug === "avenue" ? "Avenue" : "Forum"} />

    <section className="location-hero">
      <img src={config.hero} alt={`${config.slug} location`} data-parallax />
      <div className="location-hero-shade" />
      <div><p>{copy.eyebrow}</p><h1>{copy.title}</h1><span>{copy.intro}</span></div>
    </section>

    <section className="location-statement">
      <p>{copy.eyebrow}</p><h2>{copy.statement}</h2>
    </section>

    <section className="location-image-pair">
      <figure className="pair-large"><img src={config.largeImage} alt="City of Mara and Timișoara" /></figure>
      <figure className="pair-small"><img src={config.smallImage} alt="Connected city life" /><figcaption>{copy.pairCaption}</figcaption></figure>
    </section>

    <section id="location-highlights" ref={railRef} className="location-rail">
      <div className="location-rail-stage">
        <div className="rail-heading"><p>{copy.carouselEyebrow}</p><h2>{copy.carouselTitle}</h2></div>
        <div ref={trackRef} className="rail-track" aria-label="Location advantages">{copy.features.map((feature, index) => <article ref={(node) => { cardsRef.current[index] = node; }} className="rail-card" key={feature.title}>
          <img src={feature.image} alt="" /><div className="rail-card-shade" /><div><span>0{index + 1} · {feature.eyebrow}</span><h3>{feature.title}</h3></div>
        </article>)}</div>
        <span ref={progressRef} className="rail-progress">01&nbsp;&nbsp;/&nbsp;&nbsp;05</span>
      </div>
    </section>

    <section id="inquire" className="location-cta">
      <p>{copy.ctaEyebrow}</p><h2>{copy.ctaTitle}</h2><span>{copy.ctaBody}</span>
      <div><a href={apartments}>{locale === "RO" ? "Vezi apartamentele" : "View apartments"}<ArrowRight size={17} /></a><a href="tel:+40371236806">{locale === "RO" ? "Programează o vizită" : "Book a visit"}<ArrowRight size={17} /></a></div>
    </section>

    <SiteFooter />
  </main>;
}
