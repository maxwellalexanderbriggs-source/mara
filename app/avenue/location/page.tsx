import type { Metadata } from "next";
import LocationPage, { LocationConfig } from "@/components/location-page";

export const metadata: Metadata = { title: "Avenue Location | City of Mara", description: "Avenue connects Timișoara’s historic centre, Iulius Town and everyday city life." };

const config: LocationConfig = {
  slug: "avenue", mark: "/COMavenue.png", hero: "/photo-1687696162053-0358eea87c8b.avif", largeImage: "/COMsitephoto.webp", smallImage: "/COMbuildingrender.webp",
  copy: {
    EN: { eyebrow: "Avenue · Location", title: "At the heart of everything that matters.", intro: "Between the historic centre and Timișoara’s new northern hub.", statement: "Walk to work, culture, education and the everyday essentials, then come home through a neighbourhood made for people.", pairCaption: "A connected address with an established community already in place.", carouselEyebrow: "Five directions · One address", carouselTitle: "The city revolves around Avenue.", features: [
      { title: "Historic centre within easy reach", eyebrow: "Culture", image: "/COMsite.webp" }, { title: "Iulius Town in your daily radius", eyebrow: "Work & retail", image: "/COMsitephoto.webp" }, { title: "Tram, bus and rail connections", eyebrow: "Mobility", image: "/COMbuildingrender.webp" }, { title: "Schools and universities nearby", eyebrow: "Education", image: "/COMconversationrender.webp" }, { title: "The Bega and green routes", eyebrow: "Outdoors", image: "/COMsite.webp" }
    ], ctaEyebrow: "Live closer", ctaTitle: "Make more of the city part of your day.", ctaBody: "Explore the remaining Avenue homes or arrange a private visit." },
    RO: { eyebrow: "Avenue · Locație", title: "În centrul lucrurilor care contează.", intro: "Între centrul istoric și noul pol din nordul Timișoarei.", statement: "Mergi pe jos spre birou, cultură, educație și lucrurile esențiale, apoi revino într-un cartier construit pentru oameni.", pairCaption: "O adresă conectată, cu o comunitate matură deja formată.", carouselEyebrow: "Cinci direcții · O adresă", carouselTitle: "Orașul se învârte în jurul Avenue.", features: [
      { title: "Centrul istoric la îndemână", eyebrow: "Cultură", image: "/COMsite.webp" }, { title: "Iulius Town în raza cotidiană", eyebrow: "Birouri și retail", image: "/COMsitephoto.webp" }, { title: "Tramvai, autobuz și tren", eyebrow: "Mobilitate", image: "/COMbuildingrender.webp" }, { title: "Școli și universități aproape", eyebrow: "Educație", image: "/COMconversationrender.webp" }, { title: "Bega și traseele verzi", eyebrow: "În aer liber", image: "/COMsite.webp" }
    ], ctaEyebrow: "Locuiește mai aproape", ctaTitle: "Fă din oraș o parte mai mare din ziua ta.", ctaBody: "Descoperă locuințele Avenue sau programează o vizită privată." }
  }
};

export default function AvenueLocationPage() { return <LocationPage config={config} />; }
