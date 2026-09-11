"use client";

import { FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, MessageCircle, Phone, Plus, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Locale = "EN" | "RO";

const translations = {
  EN: {
    menu: "Menu", find: "Find an apartment", visit: "Book a visit", eyebrow: "Timișoara · Avenue & Forum",
    titleA: "The city,", titleB: "in motion.", intro: "Two neighbourhoods. One connected way of living.", scroll: "Scroll to explore",
    storyEyebrow: "City of Mara", storyTitle: "A better part of the city, built around everyday life.",
    storyBody: "City of Mara brings considered homes, useful services and generous green space together in two central Timișoara communities.",
    metrics: ["years shaping City of Mara", "homes across the collection", "everyday destinations", "distinct neighbourhoods"],
    locationEyebrow: "Connected by design", locationTitle: "Close to the centre. Closer to everything you need.",
    locationBody: "Work, culture, education and the daily essentials are all within easy reach—so more of the day belongs to you.",
    amenitiesEyebrow: "Life, already in place", amenitiesTitle: "A neighbourhood that works before you leave home.",
    amenitiesBody: "Gardens, cafés, fitness, retail and secure parking form a complete rhythm of daily life—not a list of afterthoughts.",
    amenityItems: ["Landscaped green space", "Retail & cafés", "Fitness & wellbeing", "Secure parking"],
    projectsEyebrow: "Two ways to live", projectsTitle: "Choose your City of Mara.",
    avenueLabel: "Established · Connected · Ready", avenueTitle: "Everything that matters, already around you.",
    forumLabel: "New · Mixed-use · In progress", forumTitle: "A new urban destination taking shape.",
    project: "The project", apartments: "Apartments", aboutEyebrow: "The organisation",
    aboutTitle: "Locally rooted. Built for the long term.", aboutBody: "We create enduring places, not isolated buildings—balancing design, function and community at every scale.",
    aboutLink: "About City of Mara", home: "Home", about: "About us", contact: "Contact", call: "Call", book: "Book",
  },
  RO: {
    menu: "Meniu", find: "Caută apartament", visit: "Programează o vizită", eyebrow: "Timișoara · Avenue & Forum",
    titleA: "Orașul,", titleB: "în mișcare.", intro: "Două cartiere. Un singur mod conectat de a trăi.", scroll: "Derulează pentru a explora",
    storyEyebrow: "City of Mara", storyTitle: "O parte mai bună a orașului, construită în jurul vieții de zi cu zi.",
    storyBody: "City of Mara reunește locuințe atent gândite, servicii utile și spații verzi generoase în două comunități centrale din Timișoara.",
    metrics: ["ani de City of Mara", "locuințe în întreaga colecție", "destinații pentru fiecare zi", "cartiere distincte"],
    locationEyebrow: "Conectat prin design", locationTitle: "Aproape de centru. Și mai aproape de tot ce contează.",
    locationBody: "Serviciul, cultura, educația și lucrurile esențiale sunt ușor accesibile—pentru ca timpul să rămână al tău.",
    amenitiesEyebrow: "Viața, deja aici", amenitiesTitle: "Un cartier care funcționează înainte să pleci de acasă.",
    amenitiesBody: "Grădinile, cafenelele, fitnessul, magazinele și parcarea securizată creează ritmul complet al vieții cotidiene.",
    amenityItems: ["Spații verzi amenajate", "Magazine și cafenele", "Fitness și wellbeing", "Parcare securizată"],
    projectsEyebrow: "Două moduri de a locui", projectsTitle: "Alege City of Mara.",
    avenueLabel: "Matur · Conectat · Pregătit", avenueTitle: "Tot ce contează este deja în jurul tău.",
    forumLabel: "Nou · Mixt · În dezvoltare", forumTitle: "O nouă destinație urbană prinde contur.",
    project: "Proiectul", apartments: "Apartamente", aboutEyebrow: "Organizația",
    aboutTitle: "Rădăcini locale. Construit pentru viitor.", aboutBody: "Creăm locuri durabile, nu clădiri izolate—echilibrând designul, funcționalitatea și comunitatea la fiecare scară.",
    aboutLink: "Despre City of Mara", home: "Acasă", about: "Despre noi", contact: "Contact", call: "Sună", book: "Vizită",
  },
};

const metricValues = [10, 700, 13, 2];
const metricSuffixes = ["+", "", "+", ""];

export default function Home() {
  const [locale, setLocale] = useState<Locale>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
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
    window.addEventListener("scroll", measure, { passive: true });
    video.addEventListener("loadedmetadata", measure);
    measure(); frame = requestAnimationFrame(render);
    return () => { window.removeEventListener("scroll", measure); video.removeEventListener("loadedmetadata", measure); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let target = window.scrollY, current = target, frame = 0;
    const animate = () => {
      current += (target - current) * 0.115;
      window.scrollTo(0, current);
      if (Math.abs(target - current) > 0.45) frame = requestAnimationFrame(animate);
      else { window.scrollTo(0, target); current = target; frame = 0; }
    };
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || (event.target as HTMLElement)?.closest("[role='dialog'], input, select, textarea")) return;
      event.preventDefault();
      target = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, target + event.deltaY * 0.82));
      if (!frame) { current = window.scrollY; frame = requestAnimationFrame(animate); }
    };
    const sync = () => { if (!frame) target = current = window.scrollY; };
    window.addEventListener("wheel", onWheel, { passive: false }); window.addEventListener("scroll", sync, { passive: true });
    return () => { window.removeEventListener("wheel", onWheel); window.removeEventListener("scroll", sync); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  const handleBooking = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setBookingDone(true); };
  const closeMenu = () => setMenuOpen(false);

  return <main id="top">
    <header className="site-header">
      <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="site-menu"><span className="menu-lines" aria-hidden="true" /> {copy.menu}</button>
      <a href="#top" aria-label="City of Mara home"><img className="brand-mark" src="/COMlogogeneral.webp" alt="" /></a>
      <nav className="header-actions" aria-label="Language and contact"><LanguageSwitch locale={locale} onChange={setLocale} /><LuxuryLink href={apartmentHref} label={copy.find} className="header-cta" /></nav>
    </header>

    <section ref={heroRef} className="hero-scroll" aria-labelledby="hero-title"><div className="hero-stage">
      <video ref={videoRef} className="hero-video" muted playsInline preload="metadata" poster="/COMconversationrender.webp" aria-hidden="true"><source src="/frame_0001-0241.mp4" type="video/mp4" /></video><div className="hero-veil" />
      <div className="hero-copy"><p className="eyebrow">{copy.eyebrow}</p><h1 id="hero-title">{copy.titleA}<br /><em>{copy.titleB}</em></h1><p className="hero-intro">{copy.intro}</p></div>
      <BookingDialog done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} triggerClass="book-visit" label={copy.visit} />
      <div className="scroll-cue"><span>{copy.scroll}</span><i /></div>
    </div></section>

    <section className="intro-proof section-pad" aria-labelledby="intro-title"><div className="intro-grid"><p className="eyebrow dark">{copy.storyEyebrow}</p><h2 id="intro-title">{copy.storyTitle}</h2><p className="lead-copy">{copy.storyBody}</p></div><div className="proof-grid">{metricValues.map((value, index) => <Metric key={value} value={value} suffix={metricSuffixes[index]} label={copy.metrics[index]} />)}</div></section>

    <section id="location" className="location-section"><div className="location-media"><img src="/COMsite.webp" alt="City of Mara in central Timișoara" /></div><div className="location-copy section-copy"><p className="eyebrow dark">{copy.locationEyebrow}</p><h2>{copy.locationTitle}</h2><p>{copy.locationBody}</p><div className="location-note"><span>45°45&apos;N</span><i /><span>21°13&apos;E</span></div></div></section>

    <section id="amenities" className="amenities-section section-pad"><div className="amenities-copy"><p className="eyebrow">{copy.amenitiesEyebrow}</p><h2>{copy.amenitiesTitle}</h2><p>{copy.amenitiesBody}</p></div><div className="amenity-list">{copy.amenityItems.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></section>

    <section id="projects" className="projects-section section-pad" aria-labelledby="projects-title"><div className="projects-heading"><p className="eyebrow dark">{copy.projectsEyebrow}</p><h2 id="projects-title">{copy.projectsTitle}</h2></div><div className="project-grid">
      <article id="avenue" className="project-card"><div className="project-image"><img src="/COMsitephoto.webp" alt="Completed City of Mara Avenue development" /></div><div className="project-copy"><p>{copy.avenueLabel}</p><h3>{copy.avenueTitle}</h3><div className="project-actions"><LuxuryLink href="#avenue" label={copy.project} /><LuxuryLink href={apartmentHref} label={copy.apartments} /></div></div></article>
      <article id="forum" className="project-card"><div className="project-image"><img src="/COMfullrender.webp" alt="Architectural visualisation of City of Mara Forum" /></div><div className="project-copy"><p>{copy.forumLabel}</p><h3>{copy.forumTitle}</h3><div className="project-actions"><LuxuryLink href="#forum" label={copy.project} /><LuxuryLink href={apartmentHref} label={copy.apartments} /></div></div></article>
    </div></section>

    <section id="about" className="about-section"><div className="about-copy section-copy"><p className="eyebrow">{copy.aboutEyebrow}</p><h2>{copy.aboutTitle}</h2><p>{copy.aboutBody}</p><LuxuryLink href="#footer" label={copy.aboutLink} /></div><div className="about-media"><img src="/COMconversationrender.webp" alt="A City of Mara landscaped residential courtyard" /></div></section>

    <footer id="footer"><a href="#top"><img src="/COMlogogeneral.webp" alt="City of Mara" /></a><div><p>Avenue</p><span>Calea Circumvalațiunii no. 1</span><a href="tel:+40725890799">+40 725 890 799</a></div><div><p>Forum</p><span>Calea Aradului 33</span><a href="tel:+40371236806">0371 236 806</a></div><div className="footer-end"><a href="mailto:sales@cityofmara.ro">sales@cityofmara.ro</a><span>© 2026 City of Mara</span></div></footer>

    <aside className="contact-dock" aria-label="Quick contact"><a href="tel:+40725890799"><Phone size={17} /><span>{copy.call}</span></a><a href="https://wa.me/40725890799"><MessageCircle size={17} /><span>WhatsApp</span></a><BookingDialog done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} compact label={copy.book} /></aside>

    {menuOpen && <div id="site-menu" className="menu-overlay" role="dialog" aria-modal="true" aria-label="Main navigation">
      <button className="menu-trigger close" onClick={closeMenu}><X size={25} /> {copy.menu}</button><img className="overlay-logo" src="/COMlogogeneral.webp" alt="City of Mara" /><BookingDialog done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} triggerClass="overlay-inquire" label={copy.visit} />
      <div className="menu-image"><img key={menuImage} src={menuImage} alt="" /></div><nav><a href="#top" onMouseEnter={() => setMenuImage("/COMfullrender.webp")} onClick={closeMenu}><span>01</span>{copy.home}</a><MenuGroup number="02" label="Avenue" image="/COMsitephoto.webp" onImage={setMenuImage} projectLabel={copy.project} apartmentsLabel={copy.apartments} projectHref="#avenue" apartmentsHref={apartmentHref} onNavigate={closeMenu} /><MenuGroup number="03" label="Forum" image="/COMgardenrender.webp" onImage={setMenuImage} projectLabel={copy.project} apartmentsLabel={copy.apartments} projectHref="#forum" apartmentsHref={apartmentHref} onNavigate={closeMenu} /><a href="#about" onMouseEnter={() => setMenuImage("/COMconversationrender.webp")} onClick={closeMenu}><span>04</span>{copy.about}</a><a href="#footer" onMouseEnter={() => setMenuImage("/COMsite.webp")} onClick={closeMenu}><span>05</span>{copy.contact}</a></nav>
      <div className="menu-bottom"><LanguageSwitch locale={locale} onChange={setLocale} overlay /><a href="tel:+40371236806">0371 236 806</a><span>Timișoara · Romania</span></div>
    </div>}
  </main>;
}

function Metric({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null); const [display, setDisplay] = useState(0);
  useEffect(() => { const node = ref.current; if (!node) return; const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) return; const start = performance.now(); const tick = (now: number) => { const progress = Math.min(1, (now - start) / 1300); setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 4)))); if (progress < 1) requestAnimationFrame(tick); }; requestAnimationFrame(tick); observer.disconnect(); }, { threshold: 0.35 }); observer.observe(node); return () => observer.disconnect(); }, [value]);
  return <div ref={ref}><strong>{display}{suffix}</strong><span>{label}</span></div>;
}

function LuxuryLink({ href, label, className = "" }: { href: string; label: string; className?: string }) { return <a href={href} className={`luxury-action ${className}`}><span className="action-label"><span>{label}</span><span aria-hidden="true">{label}</span></span><span className="action-arrow"><ArrowRight size={16} /><ArrowRight size={16} aria-hidden="true" /></span></a>; }

function LanguageSwitch({ locale, onChange, overlay = false }: { locale: Locale; onChange: (locale: Locale) => void; overlay?: boolean }) { return <div className={overlay ? "overlay-languages" : "languages"} aria-label="Language">{(["EN", "RO"] as Locale[]).map((lang) => <button key={lang} className={locale === lang ? "active" : ""} onClick={() => onChange(lang)} aria-pressed={locale === lang}>{lang}</button>)}</div>; }

function MenuGroup({ number, label, image, onImage, projectLabel, apartmentsLabel, projectHref, apartmentsHref, onNavigate }: { number: string; label: string; image: string; onImage: (image: string) => void; projectLabel: string; apartmentsLabel: string; projectHref: string; apartmentsHref: string; onNavigate: () => void }) { return <details className="menu-group" onMouseEnter={() => onImage(image)}><summary><span>{number}</span>{label}<Plus size={19} /></summary><div className="submenu"><a href={projectHref} onClick={onNavigate}>{projectLabel}</a><a href={apartmentsHref}>{apartmentsLabel}</a></div></details>; }

function BookingDialog({ done, onDone, onReset, label, triggerClass = "", compact = false }: { done: boolean; onDone: (event: FormEvent<HTMLFormElement>) => void; onReset: () => void; label: string; triggerClass?: string; compact?: boolean }) {
  const trigger: ReactNode = compact ? <button className="dock-book"><CalendarDays size={17} /><span>{label}</span></button> : <button className={`luxury-action ${triggerClass || "visit-button"}`}><span className="action-label"><span>{label}</span><span aria-hidden="true">{label}</span></span><span className="action-arrow"><ArrowRight size={16} /><ArrowRight size={16} aria-hidden="true" /></span></button>;
  return <Dialog onOpenChange={(open) => { if (!open) onReset(); }}><DialogTrigger asChild>{trigger}</DialogTrigger><DialogContent className="booking-dialog">{done ? <div className="booking-success"><span><Check size={28} /></span><DialogTitle>Visit request prepared</DialogTitle><DialogDescription>This private preview does not send the request. A live calendar and CRM can be connected at launch.</DialogDescription><p>Thursday, 17 September · 11:30<br />City of Mara sales office, Timișoara</p></div> : <><DialogHeader><p className="eyebrow dark">Private appointment · Preview</p><DialogTitle>Visit City of Mara</DialogTitle><DialogDescription>Choose how and when you would like to explore Avenue or Forum. No request is sent from this review version.</DialogDescription></DialogHeader><form onSubmit={onDone} className="booking-form"><label>Development<select required defaultValue="Forum"><option>Avenue</option><option>Forum</option></select><ChevronDown size={15} /></label><label>Visit type<select required><option>In person</option><option>Virtual tour</option></select><ChevronDown size={15} /></label><div className="form-row"><label>Date<input required type="date" min="2026-09-12" defaultValue="2026-09-17" /></label><label>Time<select required defaultValue="11:30"><option>09:30</option><option>11:30</option><option>14:00</option><option>16:30</option></select><ChevronDown size={15} /></label></div><div className="form-row"><label>Name<input required placeholder="Your name" /></label><label>Phone<input required type="tel" placeholder="+40" /></label></div><label>Email<input required type="email" placeholder="you@example.com" /></label><label className="consent"><input required type="checkbox" /> I agree to be contacted about this visit.</label><button type="submit">Prepare this request <ArrowRight size={18} /></button></form></>}</DialogContent></Dialog>;
}
