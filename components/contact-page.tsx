"use client";

import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";
import { BlurLines, MotionHeading } from "@/components/motion-text";
import ProjectNavigation from "@/components/project-navigation";
import SiteFooter from "@/components/site-footer";

type Locale = "EN" | "RO";

const copy = {
  EN: { eyebrow: "Contact", title: "Let’s find your place in City of Mara.", intro: "Speak directly with the Avenue or Forum sales team, or send us a message and we will come back to you.", avenue: "Avenue sales office", forum: "Forum sales office", name: "Name", email: "Email", phone: "Phone", project: "Project of interest", choose: "Choose a project", message: "How can we help?", consent: "I agree to be contacted about City of Mara properties.", send: "Send enquiry", sent: "Thank you. Your email application is opening with the enquiry prepared." },
  RO: { eyebrow: "Contact", title: "Hai să găsim locul tău în City of Mara.", intro: "Discută direct cu echipa de vânzări Avenue sau Forum ori trimite-ne un mesaj și te vom contacta.", avenue: "Biroul de vânzări Avenue", forum: "Biroul de vânzări Forum", name: "Nume", email: "Email", phone: "Telefon", project: "Proiect de interes", choose: "Alege un proiect", message: "Cum te putem ajuta?", consent: "Sunt de acord să fiu contactat despre proprietățile City of Mara.", send: "Trimite solicitarea", sent: "Mulțumim. Aplicația ta de email se deschide cu solicitarea pregătită." },
};

export default function ContactPageClient() {
  const [locale, setLocale] = useState<Locale>("EN");
  const [sent, setSent] = useState(false);
  const text = copy[locale];
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const project = String(data.get("project") || "City of Mara");
    const recipient = project === "Forum" ? "forum@cityofmara.ro" : "sales@cityofmara.ro";
    const body = [`Name: ${data.get("name")}`, `Email: ${data.get("email")}`, `Phone: ${data.get("phone") || "Not provided"}`, `Project: ${project}`, "", String(data.get("message"))].join("\n");
    setSent(true);
    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(`City of Mara enquiry: ${project}`)}&body=${encodeURIComponent(body)}`;
  };

  return <main id="top" className="contact-page">
    <ProjectNavigation locale={locale} onLocale={setLocale} mark="/COMlogogeneral.webp" name="Contact" />
    <section className="contact-layout">
      <div className="contact-details">
        <p className="contact-eyebrow">{text.eyebrow}</p><MotionHeading as="h1" text={text.title} /><BlurLines className="contact-intro" text={text.intro} />
        <div className="contact-offices">
          <article><span>01</span><MotionHeading as="h2" text={text.avenue} /><BlurLines lines={["Calea Circumvalațiunii 1", "Timișoara, Romania"]} /><a href="tel:+40725890799">+40 725 890 799</a><a href="mailto:sales@cityofmara.ro">sales@cityofmara.ro</a></article>
          <article><span>02</span><MotionHeading as="h2" text={text.forum} /><BlurLines lines={["Calea Aradului 33", "Timișoara, Romania"]} /><a href="tel:+40371236806">0371 236 806</a><a href="mailto:forum@cityofmara.ro">forum@cityofmara.ro</a></article>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label><span>{text.name}</span><input name="name" autoComplete="name" required /></label>
        <label><span>{text.email}</span><input name="email" type="email" autoComplete="email" required /></label>
        <label><span>{text.phone}</span><input name="phone" type="tel" autoComplete="tel" /></label>
        <label><span>{text.project}</span><select name="project" defaultValue="" required><option value="" disabled>{text.choose}</option><option>Avenue</option><option>Forum</option><option>Avenue & Forum</option></select></label>
        <label className="contact-message"><span>{text.message}</span><textarea name="message" rows={4} required /></label>
        <label className="contact-consent"><input type="checkbox" required /><span>{text.consent}</span></label>
        <button type="submit"><span>{text.send}</span><ArrowRight size={17} /></button>
        {sent && <p className="contact-success" role="status">{text.sent}</p>}
      </form>
    </section>
    <SiteFooter />
  </main>;
}
