import type { Metadata } from "next";
import DevelopmentPage, { DevelopmentConfig } from "@/components/development-page";

export const metadata: Metadata = {
  title: "Forum | City of Mara",
  description: "Discover Forum, City of Mara’s new mixed-use urban destination in Timișoara.",
};

const forum: DevelopmentConfig = {
  slug: "forum",
  mark: "/COMforum.webp",
  hero: "/COMfullrender.webp",
  nextHref: "/avenue",
  nextImage: "/COMsitephoto.webp",
  copy: {
    EN: {
      name: "Forum",
      eyebrow: "City of Mara · Forum",
      title: ["Life,", "in progress."],
      intro: "A new mixed-use destination bringing homes, hospitality, wellness and a public square into one generous urban composition.",
      introductionEyebrow: "Forum · The project",
      introductionTitle: ["A new centre of gravity", "for everyday life."],
      introductionBody: "Forum builds on the experience of Avenue with a more ambitious mixed-use vision: homes, an international hotel, retail, wellness, green space and an open central square designed as one connected place.",
      metrics: [
        { value: 3600, suffix: " sqm", label: "landscaped gardens and courtyards" },
        { value: 10, suffix: " min", label: "walk to Iulius Town" },
        { value: 2, suffix: " min", label: "walk to the nearest bus stop" },
        { value: 24, suffix: "/7", label: "controlled security and monitoring" },
      ],
      locationEyebrow: "Forum · Location",
      locationTitle: ["Between where the city works", "and where it lives."],
      locationBody: "Forum connects western Romania’s largest business and retail hub with Timișoara’s historic centre, and places both inside your daily radius.",
      locationStories: [
        { eyebrow: "The new urban hub", title: "Iulius Town in ten minutes", body: "Offices, retail, restaurants, parkland and daily services are a ten-minute walk away, or around four minutes by car.", image: "/COMfullrender.webp", alt: "Forum in the northern Timișoara skyline" },
        { eyebrow: "Direct connections", title: "The city opens in every direction", body: "Calea Aradului and Calea Torontalului provide direct road access, while nearby buses and bicycle routes make short journeys simple.", image: "/COMmediumrender.webp", alt: "Forum central square and pedestrian routes" },
        { eyebrow: "Culture and green space", title: "The centre stays close", body: "The Botanical Park and historic centre remain within a comfortable walk, connecting Forum to the established life of Timișoara.", image: "/COMlifestylerender.webp", alt: "Pedestrian life and greenery at Forum" },
      ],
      amenitiesEyebrow: "Forum · Amenities",
      amenitiesTitle: ["More than a residence.", "A piece of the city."],
      amenitiesBody: "Forum combines private calm with an active public realm, bringing everyday destinations together around a generous central landscape.",
      amenityStories: [
        { eyebrow: "The shared landscape", title: "3,600 sqm of gardens", body: "Landscaped courtyards, planted paths and spaces for play form a green interior world protected from the pace of the city.", image: "/COMgardenrender.webp", alt: "Landscaped gardens and play spaces at Forum" },
        { eyebrow: "The social centre", title: "An open urban square", body: "The central square gives the development a civic heart, an address for meeting, dining, lingering and moving through.", image: "/COMmediumrender.webp", alt: "The open central square at Forum" },
        { eyebrow: "Part of the architecture", title: "Hospitality, retail and wellness", body: "An international hotel, cafés, a restaurant, pharmacy, clinic and fitness facilities make the ground floor a useful destination in its own right.", image: "/COMintimaterender.webp", alt: "Retail and café spaces at Forum" },
        { eyebrow: "Quietly practical", title: "Parking, safety and access", body: "Underground parking with EV charging, controlled access, CCTV, round-the-clock security, lifts and ramps are integrated from the beginning.", image: "/COMrender.webp", alt: "Forum mixed-use architecture" },
      ],
      closingEyebrow: "The story began with Avenue",
      closingTitle: ["See the neighbourhood", "already in motion."],
      nextLabel: "Avenue",
    },
    RO: {
      name: "Forum",
      eyebrow: "City of Mara · Forum",
      title: ["Viața,", "în desfășurare."],
      intro: "O nouă destinație mixtă care aduce locuințe, ospitalitate, wellness și o piață publică într-o compoziție urbană generoasă.",
      introductionEyebrow: "Forum · Proiectul",
      introductionTitle: ["Un nou centru de greutate", "pentru viața de zi cu zi."],
      introductionBody: "Forum dezvoltă experiența Avenue într-o viziune mixtă mai ambițioasă: locuințe, un hotel internațional, retail, wellness, spațiu verde și o piață centrală deschisă, gândite ca un singur loc conectat.",
      metrics: [
        { value: 3600, suffix: " mp", label: "grădini și curți amenajate" },
        { value: 10, suffix: " min", label: "de mers pe jos până la Iulius Town" },
        { value: 2, suffix: " min", label: "de mers până la stația de autobuz" },
        { value: 24, suffix: "/7", label: "securitate și monitorizare controlată" },
      ],
      locationEyebrow: "Forum · Locație",
      locationTitle: ["Între locul în care orașul lucrează", "și cel în care trăiește."],
      locationBody: "Forum conectează cel mai mare pol de business și retail din vestul României cu centrul istoric al Timișoarei și le aduce pe ambele în raza vieții cotidiene.",
      locationStories: [
        { eyebrow: "Noul pol urban", title: "Iulius Town în zece minute", body: "Birouri, retail, restaurante, parc și servicii cotidiene se află la zece minute pe jos sau aproximativ patru minute cu mașina.", image: "/COMfullrender.webp", alt: "Forum în orizontul de nord al Timișoarei" },
        { eyebrow: "Conexiuni directe", title: "Orașul se deschide în toate direcțiile", body: "Calea Aradului și Calea Torontalului oferă acces rutier direct, iar autobuzele și pistele de bicicletă simplifică drumurile scurte.", image: "/COMmediumrender.webp", alt: "Piața centrală și traseele pietonale Forum" },
        { eyebrow: "Cultură și verde", title: "Centrul rămâne aproape", body: "Parcul Botanic și centrul istoric sunt la o plimbare confortabilă, conectând Forum cu viața deja consacrată a Timișoarei.", image: "/COMlifestylerender.webp", alt: "Viață pietonală și spații verzi la Forum" },
      ],
      amenitiesEyebrow: "Forum · Facilități",
      amenitiesTitle: ["Mai mult decât locuințe.", "O parte din oraș."],
      amenitiesBody: "Forum combină calmul privat cu un spațiu public activ, reunind destinațiile cotidiene în jurul unui peisaj central generos.",
      amenityStories: [
        { eyebrow: "Peisajul comun", title: "3.600 mp de grădini", body: "Curți amenajate, trasee plantate și spații de joacă formează o lume interioară verde, protejată de ritmul orașului.", image: "/COMgardenrender.webp", alt: "Grădini și spații de joacă la Forum" },
        { eyebrow: "Centrul social", title: "O piață urbană deschisă", body: "Piața centrală oferă ansamblului o inimă civică, un loc pentru întâlniri, masă, relaxare și trecere.", image: "/COMmediumrender.webp", alt: "Piața centrală deschisă Forum" },
        { eyebrow: "Parte din arhitectură", title: "Ospitalitate, retail și wellness", body: "Un hotel internațional, cafenele, restaurant, farmacie, clinică și fitness transformă parterul într-o destinație utilă în sine.", image: "/COMintimaterender.webp", alt: "Spații comerciale și cafenele Forum" },
        { eyebrow: "Practic, fără ostentație", title: "Parcare, siguranță și acces", body: "Parcarea subterană cu încărcare EV, accesul controlat, CCTV, securitatea permanentă, lifturile și rampele sunt integrate de la început.", image: "/COMrender.webp", alt: "Arhitectura mixtă Forum" },
      ],
      closingEyebrow: "Povestea a început cu Avenue",
      closingTitle: ["Descoperă cartierul", "deja în mișcare."],
      nextLabel: "Avenue",
    },
  },
};

export default function ForumPage() { return <DevelopmentPage config={forum} />; }
