"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { BlurLines, MotionHeading } from "@/components/motion-text";
import ProjectNavigation from "@/components/project-navigation";
import SiteFooter from "@/components/site-footer";

type Locale = "EN" | "RO";

const content = {
  EN: {
    eyebrow: "About City of Mara", title: "We build cities that last.", hero: "For more than a decade, we have turned land into communities with care for the people who live there and the city around them.",
    introEyebrow: "Our philosophy", introTitle: "Places where people choose to live, invest and stay.", introBody: "City of Mara creates complete urban neighbourhoods, not isolated buildings. Homes, useful services, green spaces and community life are considered together from the first line drawn.", introLink: "Explore our projects",
    valuesEyebrow: "What makes City of Mara", valuesTitle: "Four values shape every neighbourhood.",
    values: [
      { title: "Real community", body: "Neighbours become familiar faces at the school gate, the café and the shared garden." },
      { title: "Investment in the city", body: "Every project adds services, public life and infrastructure designed for the long term." },
      { title: "Functional services", body: "Retail, fitness, restaurants and cafés are everyday utilities, not brochure promises." },
      { title: "Identity and culture", body: "Community events, creative spaces and a distinct visual identity create a genuine sense of belonging." },
    ],
    foundationEyebrow: "Alber Foundation", foundationTitle: "Building opportunities beyond our neighbourhoods.", foundationBody: "Together with the Alber Foundation, City of Mara supports projects that fight school dropout and functional illiteracy, while helping transform schoolyards into green places where children can learn and thrive.", foundationLink: "Discover the Alber Foundation",
  },
  RO: {
    eyebrow: "Despre City of Mara", title: "Construim orașe care durează.", hero: "De peste un deceniu transformăm terenuri în comunități, cu grijă pentru oamenii care trăiesc aici și pentru orașul din jur.",
    introEyebrow: "Filosofia noastră", introTitle: "Locuri în care oamenii aleg să trăiască, să investească și să rămână.", introBody: "City of Mara creează cartiere urbane complete, nu clădiri izolate. Locuințele, serviciile utile, spațiile verzi și viața comunității sunt gândite împreună încă de la prima linie trasată.", introLink: "Descoperă proiectele",
    valuesEyebrow: "Ce definește City of Mara", valuesTitle: "Patru valori modelează fiecare cartier.",
    values: [
      { title: "Comunitate reală", body: "Vecinii devin chipuri familiare la școală, la cafenea și în grădina comună." },
      { title: "Investiție în oraș", body: "Fiecare proiect adaugă servicii, viață publică și infrastructură pentru termen lung." },
      { title: "Servicii funcționale", body: "Retailul, fitnessul, restaurantele și cafenelele sunt utilități cotidiene, nu promisiuni de broșură." },
      { title: "Identitate și cultură", body: "Evenimentele, spațiile creative și identitatea vizuală distinctă creează un sentiment real de apartenență." },
    ],
    foundationEyebrow: "Fundația Alber", foundationTitle: "Construim oportunități dincolo de cartierele noastre.", foundationBody: "Alături de Fundația Alber, City of Mara susține proiecte care combat abandonul școlar și analfabetismul funcțional și transformă curțile școlilor în spații verzi unde copiii pot învăța și crește.", foundationLink: "Descoperă Fundația Alber",
  },
};

const valueImages = ["/photo-1688410117183-0cded5109c37.avif", "/COMsite.webp", "/COMintimaterender.webp", "/COMgardenrender.webp"];

export default function AboutPageClient() {
  const [locale, setLocale] = useState<Locale>("EN");
  const copy = content[locale];
  return <main id="top" className="about-page">
    <ProjectNavigation locale={locale} onLocale={setLocale} mark="/COMlogogeneral.webp" name="About" />
    <section className="about-hero"><img src="/photo-1687696162053-0358eea87c8b.avif" alt="Timișoara skyline" data-parallax /><div /><div className="about-hero-copy"><p>{copy.eyebrow}</p><MotionHeading as="h1" text={copy.title} /><BlurLines as="span" text={copy.hero} /></div></section>
    <section className="about-philosophy"><div className="about-philosophy-copy"><p>{copy.introEyebrow}</p><MotionHeading as="h2" text={copy.introTitle} /><BlurLines as="span" text={copy.introBody} /><a href="/#projects">{copy.introLink}<ArrowRight size={17} /></a></div><div className="about-philosophy-image"><img src="/COMconversationrender.webp" alt="Life in a City of Mara courtyard" /></div></section>
    <section className="about-values"><div className="about-values-heading"><div><p>{copy.valuesEyebrow}</p><MotionHeading as="h2" text={copy.valuesTitle} /></div><a href="mailto:sales@cityofmara.ro">{locale === "RO" ? "Contact" : "Contact us"}<ArrowRight size={16} /></a></div><div className="about-values-grid">{copy.values.map((value, index) => <article key={value.title}><div><img src={valueImages[index]} alt="" /></div><span>0{index + 1}</span><MotionHeading as="h3" text={value.title} /><BlurLines text={value.body} /></article>)}</div></section>
    <section className="about-foundation"><div className="about-foundation-image"><img src="/photo-1590690104484-1070f9fc3eaa.avif" alt="Young people learning together" /></div><div className="about-foundation-copy"><p>{copy.foundationEyebrow}</p><MotionHeading as="h2" text={copy.foundationTitle} /><BlurLines as="span" text={copy.foundationBody} /><a href={locale === "RO" ? "https://www.cityofmara.ro/fundatia-alber/" : "https://www.cityofmara.ro/en/alber-foundation/"}>{copy.foundationLink}<ArrowRight size={17} /></a></div></section>
    <SiteFooter />
  </main>;
}
