import type { Metadata } from "next";
import LocationPage, { LocationConfig } from "@/components/location-page";

export const metadata: Metadata = { title: "Forum Location | City of Mara", description: "Forum sits between Iulius Town and Timișoara’s historic centre." };

const config: LocationConfig = {
  slug: "forum", mark: "/COMforum.webp", hero: "/photo-1706272730144-7b51588935f3.avif", largeImage: "/COMmediumrender.webp", smallImage: "/COMlifestylerender.webp",
  copy: {
    EN: { eyebrow: "Forum · Location", title: "Where the city’s next chapter begins.", intro: "Between Iulius Town and the historic centre, connected in every direction.", statement: "Forum puts business, retail, parks and the old city into one effortless urban radius, without giving up space, calm or greenery.", pairCaption: "A new mixed-use destination at the meeting point of established and emerging Timișoara.", carouselEyebrow: "Five advantages · One connected place", carouselTitle: "Every direction leads somewhere useful.", features: [
      { title: "Iulius Town in ten minutes", eyebrow: "Business & retail", image: "/COMfullrender.webp" }, { title: "The historic centre stays close", eyebrow: "Culture", image: "/COMlifestylerender.webp" }, { title: "Direct access across the city", eyebrow: "Connections", image: "/COMmediumrender.webp" }, { title: "Daily retail within a short walk", eyebrow: "Convenience", image: "/COMintimaterender.webp" }, { title: "Botanical Park on your route", eyebrow: "Green space", image: "/COMgardenrender.webp" }
    ], ctaEyebrow: "Life in progress", ctaTitle: "Find your place in Forum.", ctaBody: "Compare available homes or arrange a private introduction to the project." },
    RO: { eyebrow: "Forum · Locație", title: "Acolo unde începe următorul capitol al orașului.", intro: "Între Iulius Town și centrul istoric, conectat în toate direcțiile.", statement: "Forum aduce businessul, retailul, parcurile și orașul vechi într-o rază urbană simplă, fără să renunțe la spațiu, calm sau verdeață.", pairCaption: "O nouă destinație mixtă la întâlnirea dintre Timișoara consacrată și cea în formare.", carouselEyebrow: "Cinci avantaje · Un loc conectat", carouselTitle: "Fiecare direcție duce undeva util.", features: [
      { title: "Iulius Town în zece minute", eyebrow: "Business și retail", image: "/COMfullrender.webp" }, { title: "Centrul istoric rămâne aproape", eyebrow: "Cultură", image: "/COMlifestylerender.webp" }, { title: "Acces direct prin oraș", eyebrow: "Conexiuni", image: "/COMmediumrender.webp" }, { title: "Retail cotidian la câțiva pași", eyebrow: "Comoditate", image: "/COMintimaterender.webp" }, { title: "Parcul Botanic pe traseul tău", eyebrow: "Spațiu verde", image: "/COMgardenrender.webp" }
    ], ctaEyebrow: "Viața în desfășurare", ctaTitle: "Găsește-ți locul în Forum.", ctaBody: "Compară locuințele disponibile sau programează o prezentare privată." }
  }
};

export default function ForumLocationPage() { return <LocationPage config={config} />; }
