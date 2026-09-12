"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BlurLines, MotionHeading } from "@/components/motion-text";
import ProjectNavigation from "@/components/project-navigation";
import SiteFooter from "@/components/site-footer";

type Locale = "EN" | "RO";

const articles = [
  {
    date: "05 September 2026",
    category: "Project update",
    title: "Forum reaches its next construction milestone.",
    summary: "A concise look at recent progress across the Forum site and the work preparing the neighbourhood for its next phase.",
    image: "/COMfullrender.webp",
    alt: "City of Mara Forum development",
  },
  {
    date: "28 August 2026",
    category: "Community",
    title: "Avenue’s gardens settle into late summer.",
    summary: "Landscaped spaces continue to mature, creating quieter routes, shaded corners and more places to spend time outdoors.",
    image: "/COMgardenrender.webp",
    alt: "Landscaped gardens at City of Mara",
  },
  {
    date: "14 August 2026",
    category: "Neighbourhood",
    title: "New ground-floor spaces planned for daily life.",
    summary: "The next mix of useful services is being shaped around the routines of residents, visitors and the wider city.",
    image: "/COMsitephoto.webp",
    alt: "Ground-floor public space at City of Mara",
  },
];

export default function NewsPage() {
  const [locale, setLocale] = useState<Locale>("EN");

  return <main id="top" className="news-page">
    <ProjectNavigation locale={locale} onLocale={setLocale} mark="/COMlogogeneral.webp" name="News" />
    <section className="news-hero">
      <p>City of Mara journal</p>
      <MotionHeading as="h1" lines={["News, progress", "and life in place."]} />
      <BlurLines as="span" text="Project milestones, neighbourhood stories and useful updates from Avenue and Forum." />
    </section>
    <section className="news-index" aria-label="Latest news">
      <div className="news-index-heading"><p>Latest updates</p><span>Three stories from across City of Mara</span></div>
      <div className="news-list">{articles.map((article, index) => <article className={`news-card${index === 0 ? " news-card-featured" : ""}`} key={article.title}>
        <div className="news-card-media"><img src={article.image} alt={article.alt} /></div>
        <div className="news-card-copy">
          <div className="news-card-meta"><span>{article.date}</span><span>{article.category}</span></div>
          <MotionHeading as="h2" text={article.title} />
          <BlurLines text={article.summary} />
        </div>
      </article>)}</div>
      <Link className="news-back" href="/"><span>Back to City of Mara</span><ArrowRight size={17} /></Link>
    </section>
    <SiteFooter />
  </main>;
}
