"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, MessageCircle, Phone, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BlurLines, MotionHeading } from "@/components/motion-text";
import SiteFooter from "@/components/site-footer";

type Locale = "EN" | "RO";

const translations = {
  EN: {
    menu: "Menu", find: "Find an apartment", visit: "Book a visit", eyebrow: "Timișoara · Avenue & Forum",
    titleA: "The city,", titleB: "in motion.", intro: "Two neighbourhoods. One connected way of living.", scroll: "Scroll to explore",
    storyEyebrow: "City of Mara", storyTitle: "A better part of the city, built around everyday life.",
    storyBody: "City of Mara brings considered homes, useful services and generous green space together in two central Timișoara communities.",
    metrics: ["years shaping City of Mara", "homes across the collection", "everyday destinations", "distinct neighbourhoods"],
    locationEyebrow: "Connected by design", locationTitle: "Close to the centre. Closer to everything you need.",
    locationBody: "Work, culture, education and the daily essentials are all within easy reach, so more of the day belongs to you.",
    amenitiesEyebrow: "Life, already in place", amenitiesTitle: "A neighbourhood that works before you leave home.",
    amenitiesBody: "Gardens, cafés, fitness, retail and secure parking form a complete rhythm of daily life, not a list of afterthoughts.",
    amenityItems: ["Landscaped green space", "Retail & cafés", "Fitness & wellbeing", "Secure parking"],
    projectsEyebrow: "Two ways to live", projectsTitle: "Choose your City of Mara.",
    avenueLabel: "Established · Connected · Ready", avenueTitle: "Everything that matters, already around you.",
    forumLabel: "New · Mixed-use · In progress", forumTitle: "A new urban destination taking shape.",
    project: "The project", apartments: "Apartments", aboutEyebrow: "The organisation",
    aboutTitle: "Locally rooted. Built for the long term.", aboutBody: "We create enduring places, not isolated buildings, balancing design, function and community at every scale.",
    aboutLink: "About City of Mara", home: "Home", about: "About us", contact: "Contact", location: "Location", call: "Call", book: "Book",
  },
  RO: {
    menu: "Meniu", find: "Caută apartament", visit: "Programează o vizită", eyebrow: "Timișoara · Avenue & Forum",
    titleA: "Orașul,", titleB: "în mișcare.", intro: "Două cartiere. Un singur mod conectat de a trăi.", scroll: "Derulează pentru a explora",
    storyEyebrow: "City of Mara", storyTitle: "O parte mai bună a orașului, construită în jurul vieții de zi cu zi.",
    storyBody: "City of Mara reunește locuințe atent gândite, servicii utile și spații verzi generoase în două comunități centrale din Timișoara.",
    metrics: ["ani de City of Mara", "locuințe în întreaga colecție", "destinații pentru fiecare zi", "cartiere distincte"],
    locationEyebrow: "Conectat prin design", locationTitle: "Aproape de centru. Și mai aproape de tot ce contează.",
    locationBody: "Serviciul, cultura, educația și lucrurile esențiale sunt ușor accesibile, pentru ca timpul să rămână al tău.",
    amenitiesEyebrow: "Viața, deja aici", amenitiesTitle: "Un cartier care funcționează înainte să pleci de acasă.",
    amenitiesBody: "Grădinile, cafenelele, fitnessul, magazinele și parcarea securizată creează ritmul complet al vieții cotidiene.",
    amenityItems: ["Spații verzi amenajate", "Magazine și cafenele", "Fitness și wellbeing", "Parcare securizată"],
    projectsEyebrow: "Două moduri de a locui", projectsTitle: "Alege City of Mara.",
    avenueLabel: "Matur · Conectat · Pregătit", avenueTitle: "Tot ce contează este deja în jurul tău.",
    forumLabel: "Nou · Mixt · În dezvoltare", forumTitle: "O nouă destinație urbană prinde contur.",
    project: "Proiectul", apartments: "Apartamente", aboutEyebrow: "Organizația",
    aboutTitle: "Rădăcini locale. Construit pentru viitor.", aboutBody: "Creăm locuri durabile, nu clădiri izolate, echilibrând designul, funcționalitatea și comunitatea la fiecare scară.",
    aboutLink: "Despre City of Mara", home: "Acasă", about: "Despre noi", contact: "Contact", location: "Locație", call: "Sună", book: "Vizită",
  },
};

const metricValues = [10, 700, 13, 2];
const metricSuffixes = ["+", "", "+", ""];
const amenityImages = ["/COMgardenrender.webp", "/COMlifestylerender.webp", "/COMintimaterender.webp", "/COMbuildingrender.webp"];

export default function Home() {
  const [locale, setLocale] = useState<Locale>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const [menuImage, setMenuImage] = useState("/COMfullrender.webp");
  const [bookingDone, setBookingDone] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copy = translations[locale];
  const apartmentHref = locale === "RO" ? "https://www.cityofmara.ro/proiect-interactiv_/" : "https://www.cityofmara.ro/en/proiect-interactiv_/";

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;
    let frame = 0, target = 0, current = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => {
      const rect = hero.getBoundingClientRect();
      target = Math.min(1, Math.max(0, -rect.top / Math.max(1, hero.offsetHeight - window.innerHeight)));
    };
    const render = () => {
      current += (target - current) * 0.13;
      if (!reduceMotion && Number.isFinite(video.duration)) {
        const next = current * video.duration;
        if (Math.abs(video.currentTime - next) > 0.025) video.currentTime = next;
      }
      frame = requestAnimationFrame(render);
    };
    const primeVideo = () => {
      if (Number.isFinite(video.duration) && video.duration > 0 && video.currentTime === 0) {
        video.currentTime = Math.min(0.01, video.duration);
      }
      measure();
    };
    window.addEventListener("scroll", measure, { passive: true });
    video.addEventListener("loadeddata", primeVideo);
    measure(); frame = requestAnimationFrame(render);
    return () => { window.removeEventListener("scroll", measure); video.removeEventListener("loadeddata", primeVideo); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen && !menuClosing) {
        setMenuClosing(true);
        window.setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 700);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen, menuClosing]);

  const handleBooking = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setBookingDone(true); };
  const closeMenu = () => {
    if (menuClosing) return;
    setMenuClosing(true);
    window.setTimeout(() => { setMenuOpen(false); setMenuClosing(false); }, 700);
  };

  return <main id="top">
    <header className="site-header">
      <button className="menu-trigger" onClick={() => { setMenuClosing(false); setMenuOpen(true); }} aria-expanded={menuOpen} aria-controls="site-menu"><span className="menu-lines" aria-hidden="true" /> {copy.menu}</button>
      <a href="#top" aria-label="City of Mara home"><img className="brand-mark" src="/COMlogogeneral.webp" alt="" /></a>
      <nav className="header-actions" aria-label="Language and contact"><LanguageSwitch locale={locale} onChange={setLocale} /><LuxuryLink href={apartmentHref} label={copy.find} className="header-cta" /></nav>
    </header>

    <section ref={heroRef} className="hero-scroll" aria-labelledby="hero-title"><div className="hero-stage">
      <div className="hero-video-frame" data-parallax><video ref={videoRef} className="hero-video" muted playsInline preload="auto" poster="/COMconversationrender.webp" aria-hidden="true"><source src="/frame_0001-0241.mp4" type="video/mp4" /></video></div><div className="hero-veil" />
      <div className="hero-copy"><p className="eyebrow">{copy.eyebrow}</p><MotionHeading as="h1" id="hero-title" className="hero-title" lines={[copy.titleA, copy.titleB]} /><BlurLines className="hero-intro" text={copy.intro} /></div>
      <BookingDialog done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} triggerClass="book-visit" label={copy.visit} />
    </div></section>

    <section className="intro-proof section-pad" aria-labelledby="intro-title"><div className="intro-grid"><p className="eyebrow dark">{copy.storyEyebrow}</p><MotionHeading as="h2" id="intro-title" className="intro-title" lines={locale === "EN" ? ["A better part of the city,", "built around everyday", "life."] : ["O parte mai bună a orașului,", "construită în jurul vieții", "de zi cu zi."]} /><BlurLines className="lead-copy" text={copy.storyBody} /></div><div className="proof-grid">{metricValues.map((value, index) => <Metric key={value} value={value} suffix={metricSuffixes[index]} label={copy.metrics[index]} />)}</div></section>

    <section id="projects" className="projects-section section-pad" aria-labelledby="projects-title"><div className="projects-heading"><p className="eyebrow dark">{copy.projectsEyebrow}</p><MotionHeading as="h2" id="projects-title" lines={locale === "EN" ? ["Choose your", "City of Mara."] : ["Alege", "City of Mara."]} /></div><div className="project-grid">
      <article id="avenue" className="project-card"><div className="project-image"><img src="/COMsitephoto.webp" alt="Completed City of Mara Avenue development" /></div><div className="project-copy"><p>{copy.avenueLabel}</p><MotionHeading as="h3" text={copy.avenueTitle} /><div className="project-actions"><LuxuryLink href="/avenue" label={copy.project} /><LuxuryLink href={apartmentHref} label={copy.apartments} /></div></div></article>
      <article id="forum" className="project-card"><div className="project-image"><img src="/COMfullrender.webp" alt="Architectural visualisation of City of Mara Forum" /></div><div className="project-copy"><p>{copy.forumLabel}</p><MotionHeading as="h3" text={copy.forumTitle} /><div className="project-actions"><LuxuryLink href="/forum" label={copy.project} /><LuxuryLink href={apartmentHref} label={copy.apartments} /></div></div></article>
    </div></section>

    <AmenitiesStory locale={locale} eyebrow={copy.amenitiesEyebrow} title={copy.amenitiesTitle} body={copy.amenitiesBody} items={copy.amenityItems} />

    <section className="news-teaser" aria-labelledby="news-teaser-title">
      <div><p className="eyebrow dark">News &amp; progress</p><MotionHeading as="h2" id="news-teaser-title" lines={["Follow what’s", "taking shape."]} /></div>
      <div><BlurLines text="Find out about project milestones, neighbourhood updates and how Avenue and Forum are progressing." /><LuxuryLink href="/news" label="View the latest news" /></div>
    </section>

    <section id="about" className="about-section"><div className="about-copy section-copy"><p className="eyebrow">{copy.aboutEyebrow}</p><MotionHeading as="h2" text={copy.aboutTitle} /><BlurLines text={copy.aboutBody} /><LuxuryLink href="/about" label={copy.aboutLink} /></div><div className="about-media"><img src="/COMconversationrender.webp" alt="A City of Mara landscaped residential courtyard" /></div></section>

    <SiteFooter />

    <aside className="contact-dock" aria-label="Quick contact"><a href="tel:+40725890799"><Phone size={17} /><span>{copy.call}</span></a><a href="https://wa.me/40725890799"><MessageCircle size={17} /><span>WhatsApp</span></a><BookingDialog done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} compact label={copy.book} /></aside>

    {menuOpen && <div id="site-menu" className={`menu-overlay${menuClosing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-label="Main navigation">
      <button className="menu-trigger close" onClick={closeMenu}><X size={25} /> {copy.menu}</button><img className="overlay-logo" src="/COMlogogeneral.webp" alt="City of Mara" /><BookingDialog done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} triggerClass="overlay-inquire" label={copy.visit} />
      <div className="menu-image"><img key={menuImage} src={menuImage} alt="" /></div><nav><a href="#top" onMouseEnter={() => setMenuImage("/COMfullrender.webp")} onClick={closeMenu}><span>01</span>{copy.home}</a><MenuGroup number="02" label="Avenue" image="/COMsitephoto.webp" onImage={setMenuImage} projectLabel={copy.project} locationLabel={copy.location} apartmentsLabel={copy.apartments} projectHref="/avenue" locationHref="/avenue/location" apartmentsHref={apartmentHref} onNavigate={closeMenu} /><MenuGroup number="03" label="Forum" image="/COMgardenrender.webp" onImage={setMenuImage} projectLabel={copy.project} locationLabel={copy.location} apartmentsLabel={copy.apartments} projectHref="/forum" locationHref="/forum/location" apartmentsHref={apartmentHref} onNavigate={closeMenu} /><a href="/about" onMouseEnter={() => setMenuImage("/COMconversationrender.webp")} onClick={closeMenu}><span>04</span>{copy.about}</a><a href="/contact" onMouseEnter={() => setMenuImage("/COMsite.webp")} onClick={closeMenu}><span>05</span>{copy.contact}</a></nav>
      <div className="menu-bottom"><LanguageSwitch locale={locale} onChange={setLocale} overlay /><a href="tel:+40371236806">0371 236 806</a><span>Timișoara · Romania</span></div>
    </div>}
  </main>;
}

function AmenitiesStory({ locale, eyebrow, title, body, items }: { locale: Locale; eyebrow: string; title: string; body: string; items: string[] }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(Number((visible.target as HTMLElement).dataset.index));
    }, { threshold: [0, .25, .5, .75, 1], rootMargin: "-36% 0px -36% 0px" });
    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return <section id="amenities" className="amenities-story">
    <div className="amenities-left">
      <div className="amenities-intro">
        <p className="eyebrow">{eyebrow}</p>
        <MotionHeading as="h2" lines={locale === "EN" ? ["A neighbourhood that works", "before you leave home."] : ["Un cartier care funcționează", "înainte să pleci de acasă."]} />
        <BlurLines text={body} />
      </div>
      <div className="amenity-scroll-list">{items.map((item, index) => <div ref={(node) => { itemRefs.current[index] = node; }} data-index={index} className={active === index ? "is-active" : ""} key={item}><span>0{index + 1}</span><strong>{item}</strong><img className="amenity-mobile-image" src={amenityImages[index]} alt={item} /></div>)}</div>
    </div>
    <div className="amenities-visual"><div className="amenity-image-stage motion-image-frame">{amenityImages.map((image, index) => <img key={image} className={active === index ? "is-active" : ""} src={image} alt={items[index]} />)}</div></div>
  </section>;
}

function Metric({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null); const [display, setDisplay] = useState(0);
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; const start = performance.now(); const tick = (now: number) => { const progress = Math.min(1, (now - start) / 1300); setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 4)))); if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); observer.disconnect(); }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }); observer.observe(node); return () => observer.disconnect(); }, [value]);
  return <div ref={ref}><strong>{display}{suffix}</strong><span>{label}</span></div>;
}

function LuxuryLink({ href, label, className = "" }: { href: string; label: string; className?: string }) { return <a href={href} className={`luxury-action ${className}`}><span className="action-label"><span>{label}</span><span aria-hidden="true">{label}</span></span><span className="action-arrow"><ArrowRight size={16} /><ArrowRight size={16} aria-hidden="true" /></span></a>; }

function LanguageSwitch({ locale, onChange, overlay = false }: { locale: Locale; onChange: (locale: Locale) => void; overlay?: boolean }) { return <div className={overlay ? "overlay-languages" : "languages"} aria-label="Language">{(["EN", "RO"] as Locale[]).map((lang) => <button key={lang} className={locale === lang ? "active" : ""} onClick={() => onChange(lang)} aria-pressed={locale === lang}>{lang}</button>)}</div>; }

function MenuGroup({ number, label, image, onImage, projectLabel, locationLabel, apartmentsLabel, projectHref, locationHref, apartmentsHref, onNavigate }: { number: string; label: string; image: string; onImage: (image: string) => void; projectLabel: string; locationLabel: string; apartmentsLabel: string; projectHref: string; locationHref: string; apartmentsHref: string; onNavigate: () => void }) { return <details className="menu-group" onMouseEnter={(event) => { onImage(image); event.currentTarget.open = true; }} onMouseLeave={(event) => { event.currentTarget.open = false; }}><summary><span>{number}</span>{label}<Plus size={19} /></summary><div className="submenu"><a href={projectHref} onClick={onNavigate}>{projectLabel}</a><a href={locationHref} onClick={onNavigate}>{locationLabel}</a><a href={apartmentsHref}>{apartmentsLabel}</a></div></details>; }

function BookingDialog({ done, onDone, onReset, label, triggerClass = "", compact = false }: { done: boolean; onDone: (event: FormEvent<HTMLFormElement>) => void; onReset: () => void; label: string; triggerClass?: string; compact?: boolean }) {
  const trigger: ReactNode = compact ? <button className="dock-book"><CalendarDays size={17} /><span>{label}</span></button> : <button className={`luxury-action ${triggerClass || "visit-button"}`}><span className="action-label"><span>{label}</span><span aria-hidden="true">{label}</span></span><span className="action-arrow"><ArrowRight size={16} /><ArrowRight size={16} aria-hidden="true" /></span></button>;
  return <Dialog onOpenChange={(open) => { if (!open) onReset(); }}><DialogTrigger asChild>{trigger}</DialogTrigger><DialogContent className="booking-dialog">{done ? <div className="booking-success"><span><Check size={28} /></span><DialogTitle>Visit request prepared</DialogTitle><DialogDescription>This private preview does not send the request. A live calendar and CRM can be connected at launch.</DialogDescription><p>Thursday, 17 September · 11:30<br />City of Mara sales office, Timișoara</p></div> : <><DialogHeader><p className="eyebrow dark">Private appointment · Preview</p><DialogTitle>Visit City of Mara</DialogTitle><DialogDescription>Choose how and when you would like to explore Avenue or Forum. No request is sent from this review version.</DialogDescription></DialogHeader><form onSubmit={onDone} className="booking-form"><label>Development<select required defaultValue="Forum"><option>Avenue</option><option>Forum</option></select><ChevronDown size={15} /></label><label>Visit type<select required><option>In person</option><option>Virtual tour</option></select><ChevronDown size={15} /></label><div className="form-row"><label>Date<input required type="date" min="2026-09-12" defaultValue="2026-09-17" /></label><label>Time<select required defaultValue="11:30"><option>09:30</option><option>11:30</option><option>14:00</option><option>16:30</option></select><ChevronDown size={15} /></label></div><div className="form-row"><label>Name<input required placeholder="Your name" /></label><label>Phone<input required type="tel" placeholder="+40" /></label></div><label>Email<input required type="email" placeholder="you@example.com" /></label><label className="consent"><input required type="checkbox" /> I agree to be contacted about this visit.</label><button type="submit">Prepare this request <ArrowRight size={18} /></button></form></>}</DialogContent></Dialog>;
}
