"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

type Locale = "RO" | "EN" | "DE" | "FR";
type Development = "Avenue" | "Forum";
type ApartmentSearchInput = { development?: "All" | Development; rooms?: "All" | 1 | 2 | 3; maxPrice?: number };

type ModelContextLike = {
  registerTool: (tool: {
    name: string;
    title: string;
    description: string;
    inputSchema: object;
    annotations: { readOnlyHint: boolean; untrustedContentHint: boolean };
    execute: (input: ApartmentSearchInput) => unknown;
  }, options?: { signal?: AbortSignal }) => void | Promise<void>;
};

const translations = {
  EN: { menu: "Menu", find: "Find an apartment", visit: "Book a visit", eyebrow: "Timișoara · Avenue & Forum", titleA: "The city,", titleB: "in motion.", intro: "Two neighbourhoods. One connected way of living.", scroll: "Scroll to explore", homes: "homes match your search", results: "Available homes", all: "Both developments" },
  RO: { menu: "Meniu", find: "Caută apartament", visit: "Programează o vizită", eyebrow: "Timișoara · Avenue & Forum", titleA: "Orașul,", titleB: "în mișcare.", intro: "Două cartiere. Un singur mod conectat de a trăi.", scroll: "Derulează pentru a explora", homes: "locuințe corespund căutării", results: "Locuințe disponibile", all: "Ambele proiecte" },
  DE: { menu: "Menü", find: "Wohnung finden", visit: "Besichtigung buchen", eyebrow: "Timișoara · Avenue & Forum", titleA: "Die Stadt,", titleB: "in Bewegung.", intro: "Zwei Quartiere. Eine vernetzte Art zu leben.", scroll: "Scrollen zum Entdecken", homes: "Wohnungen entsprechen Ihrer Suche", results: "Verfügbare Wohnungen", all: "Beide Projekte" },
  FR: { menu: "Menu", find: "Trouver un appartement", visit: "Réserver une visite", eyebrow: "Timișoara · Avenue & Forum", titleA: "La ville,", titleB: "en mouvement.", intro: "Deux quartiers. Une même façon de vivre, connectée.", scroll: "Défiler pour découvrir", homes: "logements correspondent à votre recherche", results: "Logements disponibles", all: "Les deux projets" },
};

const units = [
  { id: "AV-M11-1C", development: "Avenue" as Development, rooms: 1, area: 37.31, floor: 4, price: 119428, status: "Available", orientation: "NW", image: "/COMbuildingrender.webp" },
  { id: "AV-M11-3F", development: "Avenue" as Development, rooms: 2, area: 66.98, floor: 7, price: 161749, status: "Available", orientation: "NE", image: "/COMsitephoto.webp" },
  { id: "AV-M12-3A", development: "Avenue" as Development, rooms: 3, area: 74.2, floor: 10, price: 170693, status: "Reserved", orientation: "SE", image: "/COMsite.webp" },
  { id: "AV-M12-3E", development: "Avenue" as Development, rooms: 3, area: 82.5, floor: 12, price: 186614, status: "Available", orientation: "NE", image: "/COMbuildingrender.webp" },
  { id: "FO-M14-1A", development: "Forum" as Development, rooms: 1, area: 37.5, floor: 2, price: 103587, status: "Available", orientation: "NW", image: "/COMintimaterender.webp" },
  { id: "FO-M15-2D", development: "Forum" as Development, rooms: 2, area: 53.57, floor: 5, price: 136649, status: "Available", orientation: "NE", image: "/COMmediumrender.webp" },
  { id: "FO-M16-2BB", development: "Forum" as Development, rooms: 2, area: 56.2, floor: 8, price: 158381, status: "Reserved", orientation: "E", image: "/COMgardenrender.webp" },
  { id: "FO-M17-3B", development: "Forum" as Development, rooms: 3, area: 77.04, floor: 11, price: 247760, status: "Available", orientation: "E", image: "/COMrender.webp" },
];

const navItems = [
  ["01", "Home", "#top", "/COMfullrender.webp"],
  ["02", "Avenue — Overview", "#avenue", "/COMsitephoto.webp"],
  ["03", "Avenue — Apartments", "#apartments", "/COMbuildingrender.webp"],
  ["04", "Forum — Overview", "#forum", "/COMrender.webp"],
  ["05", "Forum — Apartments", "#apartments", "/COMgardenrender.webp"],
  ["06", "About Us", "#about", "/COMsite.webp"],
  ["07", "Membership Card", "#membership", "/COMlifestylerender.webp"],
  ["08", "News", "#news", "/photo-1706272730144-7b51588935f3eaa.avif"],
  ["09", "Contact", "#visit", "/COMconversationrender.webp"],
];

const formatPrice = (value: number) => new Intl.NumberFormat("de-DE").format(value);

export default function Home() {
  const [locale, setLocale] = useState<Locale>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuImage, setMenuImage] = useState(navItems[0][3]);
  const [development, setDevelopment] = useState("All");
  const [rooms, setRooms] = useState("All");
  const [floor, setFloor] = useState("All");
  const [status, setStatus] = useState("Available");
  const [price, setPrice] = useState([100000, 270000]);
  const [bookingDone, setBookingDone] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copy = translations[locale];

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return;
    let frame = 0;
    let target = 0;
    let current = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const measure = () => {
      const rect = hero.getBoundingClientRect();
      const distance = Math.max(1, hero.offsetHeight - window.innerHeight);
      target = Math.min(1, Math.max(0, -rect.top / distance));
    };
    const render = () => {
      current += (target - current) * 0.16;
      if (!reduceMotion && Number.isFinite(video.duration)) {
        const next = current * video.duration;
        if (Math.abs(video.currentTime - next) > 0.025) video.currentTime = next;
      }
      frame = requestAnimationFrame(render);
    };
    const onScroll = () => measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    video.addEventListener("loadedmetadata", measure);
    measure();
    frame = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("scroll", onScroll);
      video.removeEventListener("loadedmetadata", measure);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);

  useEffect(() => {
    const context = (document as Document & { modelContext?: ModelContextLike }).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    const register = context.registerTool({
      name: "search_city_of_mara_apartments",
      title: "Search City of Mara apartments",
      description: "Set the visible Avenue/Forum apartment filters and return the number of matching sample homes.",
      inputSchema: {
        type: "object",
        properties: {
          development: { type: "string", enum: ["All", "Avenue", "Forum"] },
          rooms: { anyOf: [{ type: "string", const: "All" }, { type: "integer", enum: [1, 2, 3] }] },
          maxPrice: { type: "number", minimum: 100000, maximum: 270000 },
        },
        additionalProperties: false,
      },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: (input) => {
        if (!input || typeof input !== "object") throw new Error("Search input must be an object.");
        const chosenDevelopment = input.development ?? "All";
        const chosenRooms = input.rooms ?? "All";
        const maxPrice = input.maxPrice ?? 270000;
        if (!["All", "Avenue", "Forum"].includes(chosenDevelopment)) throw new Error("Unknown development.");
        if (!(chosenRooms === "All" || [1, 2, 3].includes(chosenRooms))) throw new Error("Rooms must be All, 1, 2, or 3.");
        if (maxPrice < 100000 || maxPrice > 270000) throw new Error("Maximum price is outside the supported range.");
        setDevelopment(chosenDevelopment);
        setRooms(String(chosenRooms));
        setPrice([100000, maxPrice]);
        const count = units.filter((unit) =>
          (chosenDevelopment === "All" || unit.development === chosenDevelopment) &&
          (chosenRooms === "All" || unit.rooms === chosenRooms) &&
          unit.status === "Available" && unit.price <= maxPrice
        ).length;
        document.querySelector("#apartments")?.scrollIntoView({ behavior: "smooth" });
        return { matchingHomes: count, development: chosenDevelopment, rooms: chosenRooms, maxPrice };
      },
    }, { signal: lifecycle.signal });
    void Promise.resolve(register).catch(() => undefined);
    return () => lifecycle.abort();
  }, []);

  const filtered = useMemo(() => units.filter((unit) =>
    (development === "All" || unit.development === development) &&
    (rooms === "All" || unit.rooms === Number(rooms)) &&
    (floor === "All" || (floor === "High" ? unit.floor >= 7 : floor === "Mid" ? unit.floor >= 3 && unit.floor <= 6 : unit.floor <= 2)) &&
    (status === "All" || unit.status === status) &&
    unit.price >= price[0] && unit.price <= price[1]
  ), [development, rooms, floor, status, price]);

  const resetFilters = () => { setDevelopment("All"); setRooms("All"); setFloor("All"); setStatus("Available"); setPrice([100000, 270000]); };
  const handleBooking = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setBookingDone(true); };

  return (
    <main id="top">
      <header className="site-header">
        <button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="site-menu">
          <span className="menu-lines" aria-hidden="true" /> {copy.menu}
        </button>
        <a href="#top" aria-label="City of Mara home"><img className="brand-mark" src="/COMlogogeneral.webp" alt="" /></a>
        <nav className="header-actions" aria-label="Language and contact">
          <div className="languages" aria-label="Language">
            {(Object.keys(translations) as Locale[]).map((lang) => <button key={lang} className={locale === lang ? "active" : ""} onClick={() => setLocale(lang)} aria-pressed={locale === lang}>{lang}</button>)}
          </div>
          <a className="header-cta" href="#apartments">{copy.find}<span>↗</span></a>
        </nav>
      </header>

      <section ref={heroRef} className={`hero-scroll ${skipped ? "is-skipped" : ""}`} aria-labelledby="hero-title">
        <div className="hero-stage">
          <video ref={videoRef} className="hero-video" muted playsInline preload="metadata" poster="/COMconversationrender.webp" aria-hidden="true">
            <source src="/frame_0001-0241.mp4" type="video/mp4" />
          </video>
          <div className="hero-veil" />
          <div className="hero-copy">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1 id="hero-title">{copy.titleA}<br /><em>{copy.titleB}</em></h1>
            <p className="hero-intro">{copy.intro}</p>
          </div>
          <BookingDialog locale={locale} done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} triggerClass="book-visit" label={copy.visit} />
          <button className="skip-film" onClick={() => { setSkipped(true); document.querySelector("#apartments")?.scrollIntoView(); }}>Skip film</button>
          <div className="scroll-cue"><span>{copy.scroll}</span><i /></div>
        </div>
      </section>

      <section id="apartments" className="finder-section section-pad">
        <div className="section-heading">
          <div><p className="eyebrow dark">Apartment finder</p><h2>Find the place<br />that fits your life.</h2></div>
          <p>Explore a representative selection from Avenue and Forum. Every choice updates instantly.</p>
        </div>
        <div className="finder-panel">
          <div className="filter-field"><label>Development</label><Select value={development} onValueChange={setDevelopment}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All">{copy.all}</SelectItem><SelectItem value="Avenue">Avenue</SelectItem><SelectItem value="Forum">Forum</SelectItem></SelectContent></Select></div>
          <div className="filter-field"><label>Rooms</label><Select value={rooms} onValueChange={setRooms}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All">Any</SelectItem><SelectItem value="1">Studio / 1</SelectItem><SelectItem value="2">2 rooms</SelectItem><SelectItem value="3">3 rooms</SelectItem></SelectContent></Select></div>
          <div className="filter-field price-field"><label>Price · €{formatPrice(price[0])}—€{formatPrice(price[1])}</label><Slider value={price} onValueChange={setPrice} min={100000} max={270000} step={5000} aria-label="Price range" /></div>
          <div className="filter-field"><label>Floor</label><Select value={floor} onValueChange={setFloor}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="All">Any floor</SelectItem><SelectItem value="Low">Ground—2</SelectItem><SelectItem value="Mid">3—6</SelectItem><SelectItem value="High">7+</SelectItem></SelectContent></Select></div>
          <div className="filter-field"><label>Status</label><Select value={status} onValueChange={setStatus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Available">Available</SelectItem><SelectItem value="Reserved">Reserved</SelectItem><SelectItem value="All">All statuses</SelectItem></SelectContent></Select></div>
        </div>
        <div className="results-head"><div><span className="result-count">{filtered.length}</span><span>{copy.homes}</span></div><button onClick={resetFilters}>Reset filters</button></div>
        {filtered.length ? <div className="unit-grid">{filtered.map((unit) => <article className="unit-card" key={unit.id}>
          <div className="unit-image"><img src={unit.image} alt={`${unit.development} residential architecture`} /><span className={`status ${unit.status.toLowerCase()}`}>{unit.status}</span><span className="orientation">{unit.orientation}</span></div>
          <div className="unit-copy"><div><p>{unit.development} · Floor {unit.floor}</p><h3>{unit.rooms === 1 ? "Studio / 1 room" : `${unit.rooms} rooms`} <span>{unit.id}</span></h3></div><dl><div><dt>Usable area</dt><dd>{unit.area} sqm</dd></div><div><dt>From</dt><dd>€{formatPrice(unit.price)} + VAT</dd></div></dl><button aria-label={`View ${unit.id}`}>View this home <ArrowRight size={16} /></button></div>
        </article>)}</div> : <div className="empty-state"><h3>No exact matches</h3><p>Try a wider price range or view both developments.</p><button onClick={resetFilters}>Clear all filters</button></div>}
      </section>

      <section className="development-split" aria-label="Developments">
        <article id="avenue" className="development avenue"><img src="/COMsitephoto.webp" alt="Completed City of Mara Avenue development" /><div className="development-veil" /><div className="development-copy"><img src="/COMavenue.png" alt="City of Mara Avenue" /><p>Residential · Community · Completed</p><h2>At the heart of<br />everything that matters.</h2><a href="#apartments" onClick={() => setDevelopment("Avenue")}>Explore Avenue <ArrowRight size={18} /></a></div></article>
        <article id="forum" className="development forum"><img src="/COMfullrender.webp" alt="Architectural visualisation of City of Mara Forum" /><div className="development-veil" /><div className="development-copy"><img src="/COMforum.webp" alt="City of Mara Forum" /><p>Residential · Mixed-use · In development</p><h2>Life in progress.</h2><a href="#apartments" onClick={() => setDevelopment("Forum")}>Explore Forum <ArrowRight size={18} /></a></div></article>
      </section>

      <section id="about" className="proof-section section-pad">
        <p className="eyebrow dark">A city built to last</p>
        <div className="proof-intro"><h2>More than homes.<br />A living urban ecosystem.</h2><p>City of Mara connects thoughtful homes, useful services, green space and a community with a character of its own.</p></div>
        <div className="proof-grid"><div><strong>10+</strong><span>years of City of Mara</span></div><div><strong>650+</strong><span>apartments delivered</span></div><div><strong>13+</strong><span>retailers in our communities</span></div><div><strong>2</strong><span>central Timișoara locations</span></div></div>
      </section>

      <section className="editorial-section">
        <div className="editorial-media"><img src="/COMconversationrender.webp" alt="Landscaped courtyard at City of Mara Forum" /></div>
        <div className="editorial-copy"><p className="eyebrow dark">Everyday city life</p><h2>Everything you need,<br /><em>already around you.</em></h2><p>Landscaped gardens, cafés, fitness, retail and secure parking—planned around the way people actually live.</p><a href="#forum">Discover the experience <ArrowRight size={18} /></a></div>
      </section>

      <section id="membership" className="membership-section section-pad">
        <div className="member-card"><div className="card-mark">M</div><span>City of Mara</span><strong>MEMBERSHIP</strong><small>RESIDENT 00481</small></div>
        <div className="membership-copy"><p className="eyebrow">Resident privileges</p><h2>More than<br />an address.</h2><p>Up to 20% off at selected shops, restaurants and services, plus invitations to resident-only events.</p><a href="#visit">Explore membership <ArrowRight size={18} /></a></div>
      </section>

      <section id="news" className="news-section section-pad">
        <div className="section-heading"><div><p className="eyebrow dark">Journal</p><h2>Perspectives<br />from the city.</h2></div><a href="#news">View all stories <ArrowRight size={18} /></a></div>
        <div className="story-grid"><article><img src="/COMrender.webp" alt="City of Mara Forum aerial visualisation" /><p>Forum · Project update</p><h3>The future opens today: Forum launches in Timișoara</h3></article><article><img src="/COMsite.webp" alt="City of Mara Avenue at dusk" /><p>Avenue · Availability</p><h3>The last apartments available at Avenue</h3></article><article><img src="/photo-1706272730144-7b51588935f3eaa.avif" alt="Timișoara skyline" /><p>City life · 5 min read</p><h3>Timișoara’s centre is more than an address</h3></article></div>
      </section>

      <section id="visit" className="visit-section">
        <img src="/COMgardenrender.webp" alt="Garden and residences at City of Mara" />
        <div className="visit-veil" />
        <div className="visit-copy"><p className="eyebrow">Your next visit</p><h2>Come and see<br />where life happens.</h2><BookingDialog locale={locale} done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} label={copy.visit} /></div>
      </section>

      <footer><a href="#top"><img src="/COMlogogeneral.webp" alt="City of Mara" /></a><div><p>Avenue</p><span>Calea Circumvalațiunii no. 1</span><a href="tel:+40725890799">+40 725 890 799</a></div><div><p>Forum</p><span>Calea Aradului 33</span><a href="tel:+40371236806">0371 236 806</a></div><div className="footer-end"><a href="mailto:sales@cityofmara.ro">sales@cityofmara.ro</a><span>© 2026 City of Mara</span></div></footer>

      <aside className="contact-dock" aria-label="Quick contact"><a href="tel:+40725890799"><Phone size={17} /><span>Call</span></a><a href="https://wa.me/40725890799"><MessageCircle size={17} /><span>WhatsApp</span></a><BookingDialog locale={locale} done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} compact label="Book" /></aside>

      {menuOpen && <div id="site-menu" className="menu-overlay" role="dialog" aria-modal="true" aria-label="Main navigation">
        <button className="menu-trigger close" onClick={() => setMenuOpen(false)}><X size={28} /> Close</button>
        <img className="overlay-logo" src="/COMlogogeneral.webp" alt="City of Mara" />
        <BookingDialog locale={locale} done={bookingDone} onDone={handleBooking} onReset={() => setBookingDone(false)} triggerClass="overlay-inquire" label={copy.visit} />
        <div className="menu-image"><img src={menuImage} alt="" /></div>
        <nav>{navItems.map(([number, label, href, image]) => <a key={number} href={href} onMouseEnter={() => setMenuImage(image)} onFocus={() => setMenuImage(image)} onClick={() => setMenuOpen(false)}><span>{number}</span>{label}</a>)}</nav>
        <div className="menu-bottom"><div className="overlay-languages">{(Object.keys(translations) as Locale[]).map((lang) => <button key={lang} className={locale === lang ? "active" : ""} onClick={() => setLocale(lang)}>{lang}</button>)}</div><a href="tel:+40371236806">0371 236 806</a><span>Timișoara · Romania</span></div>
      </div>}
    </main>
  );
}

function BookingDialog({ locale, done, onDone, onReset, label, triggerClass = "", compact = false }: { locale: Locale; done: boolean; onDone: (event: FormEvent<HTMLFormElement>) => void; onReset: () => void; label: string; triggerClass?: string; compact?: boolean }) {
  return <Dialog onOpenChange={(open) => { if (!open) onReset(); }}>
    <DialogTrigger asChild>{compact ? <button className="dock-book"><CalendarDays size={17} /><span>{label}</span></button> : <button className={triggerClass || "visit-button"}>{label}<ArrowRight size={18} /></button>}</DialogTrigger>
    <DialogContent className="booking-dialog">
      {done ? <div className="booking-success"><span><Check size={28} /></span><DialogTitle>Visit request received</DialogTitle><DialogDescription>Our sales team will confirm your selected time shortly.</DialogDescription><p>Thursday, 17 September · 11:30<br />City of Mara sales office, Timișoara</p></div> : <><DialogHeader><p className="eyebrow dark">Private appointment</p><DialogTitle>Visit City of Mara</DialogTitle><DialogDescription>Choose how and when you would like to explore Avenue or Forum.</DialogDescription></DialogHeader><form onSubmit={onDone} className="booking-form"><label>Development<select required defaultValue="Forum"><option>Avenue</option><option>Forum</option></select><ChevronDown size={15} /></label><label>Visit type<select required><option>In person</option><option>Virtual tour</option></select><ChevronDown size={15} /></label><div className="form-row"><label>Date<input required type="date" min="2026-09-12" defaultValue="2026-09-17" /></label><label>Time<select required defaultValue="11:30"><option>09:30</option><option>11:30</option><option>14:00</option><option>16:30</option></select><ChevronDown size={15} /></label></div><div className="form-row"><label>Name<input required placeholder="Your name" /></label><label>Phone<input required type="tel" placeholder="+40" /></label></div><label>Email<input required type="email" placeholder="you@example.com" /></label><label className="consent"><input required type="checkbox" /> I agree to be contacted about this visit.</label><button type="submit">Request this time <ArrowRight size={18} /></button></form></>}
    </DialogContent>
  </Dialog>;
}
