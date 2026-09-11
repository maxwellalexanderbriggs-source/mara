"use client";

import { ArrowRight, Plus, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Locale = "EN" | "RO";

export default function ProjectNavigation({ locale, onLocale, mark, name }: { locale: Locale; onLocale: (locale: Locale) => void; mark: string; name: string }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const apartmentHref = locale === "RO" ? "https://www.cityofmara.ro/proiect-interactiv_/" : "https://www.cityofmara.ro/en/proiect-interactiv_/";
  const labels = locale === "RO" ? { menu: "Meniu", home: "Acasă", project: "Proiectul", location: "Locație", apartments: "Apartamente", find: "Caută apartament", about: "Despre noi", contact: "Contact" } : { menu: "Menu", home: "Home", project: "The project", location: "Location", apartments: "Apartments", find: "Find an apartment", about: "About us", contact: "Contact" };

  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  const close = () => { if (closing) return; setClosing(true); window.setTimeout(() => { setOpen(false); setClosing(false); }, 650); };

  return <>
    <header className="development-header inner-site-header">
      <button className="menu-trigger" onClick={() => setOpen(true)} aria-expanded={open}><span className="menu-lines" />{labels.menu}</button>
      <Link href={`/${name.toLowerCase()}`} className="development-mark" aria-label={`${name} home`}><img src={mark} alt={name} /></Link>
      <div className="development-actions"><div className="development-languages">{(["EN", "RO"] as Locale[]).map((language) => <button key={language} className={locale === language ? "active" : ""} onClick={() => onLocale(language)}>{language}</button>)}</div><a className="development-find" href={apartmentHref}><span>{labels.find}</span><ArrowRight size={16} /></a></div>
    </header>
    {open && <aside className={`inner-menu${closing ? " is-closing" : ""}`} role="dialog" aria-modal="true" aria-label="Main navigation">
      <button className="menu-trigger inner-menu-close" onClick={close}><X size={22} />{labels.menu}</button><img className="inner-menu-logo" src="/COMlogogeneral.webp" alt="City of Mara" /><a className="inner-menu-find" href={apartmentHref}>{labels.find}<ArrowRight size={16} /></a>
      <nav><Link href="/" onClick={close}><span>01</span>{labels.home}</Link><details onMouseEnter={(event) => { event.currentTarget.open = true; }} onMouseLeave={(event) => { event.currentTarget.open = false; }}><summary><span>02</span>Avenue<Plus size={20} /></summary><div><Link href="/avenue" onClick={close}>{labels.project}</Link><Link href="/avenue/location" onClick={close}>{labels.location}</Link><a href={apartmentHref}>{labels.apartments}</a></div></details><details onMouseEnter={(event) => { event.currentTarget.open = true; }} onMouseLeave={(event) => { event.currentTarget.open = false; }}><summary><span>03</span>Forum<Plus size={20} /></summary><div><Link href="/forum" onClick={close}>{labels.project}</Link><Link href="/forum/location" onClick={close}>{labels.location}</Link><a href={apartmentHref}>{labels.apartments}</a></div></details><Link href="/about" onClick={close}><span>04</span>{labels.about}</Link><Link href="/contact" onClick={close}><span>05</span>{labels.contact}</Link></nav>
      <div className="inner-menu-bottom"><span>Timișoara · Romania</span><a href="tel:+40371236806">0371 236 806</a></div>
    </aside>}
  </>;
}
