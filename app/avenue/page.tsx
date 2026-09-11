import type { Metadata } from "next";
import DevelopmentPage, { DevelopmentConfig } from "@/components/development-page";

export const metadata: Metadata = {
  title: "Avenue | City of Mara",
  description: "Discover Avenue, the established City of Mara neighbourhood in central Timișoara.",
};

const avenue: DevelopmentConfig = {
  slug: "avenue",
  mark: "/COMavenue.png",
  hero: "/COMsitephoto.webp",
  nextHref: "/forum",
  nextImage: "/COMfullrender.webp",
  copy: {
    EN: {
      name: "Avenue",
      eyebrow: "City of Mara · Avenue",
      title: ["The complete city,", "already in place."],
      intro: "An established urban community between Timișoara’s historic centre and its new northern hub.",
      introductionEyebrow: "Avenue · The project",
      introductionTitle: ["Everything that matters,", "within your everyday."],
      introductionBody: "Avenue brings homes, landscaped courtyards, useful services and a commercial boulevard together in one coherent neighbourhood. Five completed buildings create a lived-in community, not a promise of one to come.",
      metrics: [
        { value: 55, prefix: "€", suffix: "m+", label: "investment in the Avenue neighbourhood" },
        { value: 2.8, decimals: 1, suffix: " ha", label: "coherent urban site" },
        { value: 5, label: "completed residential buildings" },
        { value: 4000, suffix: " sqm", label: "ground-floor shops and services" },
      ],
      locationEyebrow: "Avenue · Location",
      locationTitle: ["At the heart of", "everything that matters."],
      locationBody: "Avenue occupies the sweet spot between the old centre and Timișoara’s newest office, retail and leisure district.",
      locationStories: [
        { eyebrow: "The city on foot", title: "Historic centre to new centre", body: "Piața Unirii, the Bega riverfront and the university district sit in one direction; Iulius Town, offices and retail in the other.", image: "/COMsite.webp", alt: "Aerial view of Avenue and central Timișoara" },
        { eyebrow: "Everyday proximity", title: "A walkable rhythm", body: "Schools, kindergartens, green spaces, fitness and daily services are close enough to make the car optional for much of the week.", image: "/COMsitephoto.webp", alt: "Landscaped pedestrian routes through Avenue" },
        { eyebrow: "Connected in every mode", title: "Move the way the day asks", body: "Immediate boulevard access, nearby tram and bus connections, pedestrian routes and bicycle infrastructure keep the whole city within reach.", image: "/COMbuildingrender.webp", alt: "Avenue residential architecture" },
      ],
      amenitiesEyebrow: "Avenue · Amenities",
      amenitiesTitle: ["A neighbourhood", "that works beautifully."],
      amenitiesBody: "The practical parts of daily life are integrated into the architecture, leaving more space for the life around them.",
      amenityStories: [
        { eyebrow: "Green at the centre", title: "Landscaped inner courtyards", body: "Protected gardens, mature planting and places to pause give the five buildings a calm shared interior landscape.", image: "/COMsitephoto.webp", alt: "Avenue landscaped courtyard" },
        { eyebrow: "Below the landscape", title: "Secure underground parking", body: "Controlled access, efficient LED lighting and electric-vehicle charging keep cars convenient while the ground level stays people-first.", image: "/COMsite.webp", alt: "Avenue urban neighbourhood" },
        { eyebrow: "Life at ground level", title: "Services that belong nearby", body: "Cafés, restaurants, clinics, wellness services and an on-site World Class club make Avenue useful from morning to evening.", image: "/COMbuildingrender.webp", alt: "Avenue mixed-use ground floor" },
        { eyebrow: "Designed for everyone", title: "Safe, open and accessible", body: "Controlled access, perimeter lighting, ramps, lifts and generous halls create a neighbourhood that is easy to navigate at every age.", image: "/COMconversationrender.webp", alt: "Residents meeting in a landscaped courtyard" },
      ],
      closingEyebrow: "Continue through City of Mara",
      closingTitle: ["Avenue is established.", "Forum is taking shape."],
      nextLabel: "Forum",
    },
    RO: {
      name: "Avenue",
      eyebrow: "City of Mara · Avenue",
      title: ["Orașul complet,", "deja aici."],
      intro: "O comunitate urbană matură între centrul istoric al Timișoarei și noul pol din nord.",
      introductionEyebrow: "Avenue · Proiectul",
      introductionTitle: ["Tot ce contează,", "în viața de zi cu zi."],
      introductionBody: "Avenue reunește locuințe, curți amenajate, servicii utile și un bulevard comercial într-un cartier coerent. Cinci clădiri finalizate formează o comunitate vie, nu doar promisiunea uneia.",
      metrics: [
        { value: 55, prefix: "€", suffix: "m+", label: "investiție în cartierul Avenue" },
        { value: 2.8, decimals: 1, suffix: " ha", label: "ansamblu urban coerent" },
        { value: 5, label: "clădiri rezidențiale finalizate" },
        { value: 4000, suffix: " mp", label: "magazine și servicii la parter" },
      ],
      locationEyebrow: "Avenue · Locație",
      locationTitle: ["În centrul lucrurilor", "care contează."],
      locationBody: "Avenue se află între centrul vechi și cel mai nou pol de birouri, retail și petrecere a timpului liber din Timișoara.",
      locationStories: [
        { eyebrow: "Orașul la pas", title: "De la centrul istoric la cel nou", body: "Piața Unirii, malul Begăi și zona universitară sunt într-o direcție; Iulius Town, birourile și retailul, în cealaltă.", image: "/COMsite.webp", alt: "Vedere aeriană Avenue și centrul Timișoarei" },
        { eyebrow: "Aproape în fiecare zi", title: "Un ritm pietonal", body: "Școli, grădinițe, spații verzi, fitness și servicii cotidiene sunt suficient de aproape încât mașina să devină opțională.", image: "/COMsitephoto.webp", alt: "Trasee pietonale amenajate în Avenue" },
        { eyebrow: "Conectat în orice mod", title: "Te miști cum îți cere ziua", body: "Accesul imediat la bulevarde, tramvaiul, autobuzul, traseele pietonale și infrastructura pentru biciclete țin întregul oraș aproape.", image: "/COMbuildingrender.webp", alt: "Arhitectura rezidențială Avenue" },
      ],
      amenitiesEyebrow: "Avenue · Facilități",
      amenitiesTitle: ["Un cartier care", "funcționează frumos."],
      amenitiesBody: "Aspectele practice ale vieții sunt integrate în arhitectură, lăsând mai mult spațiu pentru viața din jurul lor.",
      amenityStories: [
        { eyebrow: "Verde în centru", title: "Curți interioare amenajate", body: "Grădinile protejate, vegetația matură și locurile de odihnă oferă celor cinci clădiri un peisaj interior calm.", image: "/COMsitephoto.webp", alt: "Curte amenajată Avenue" },
        { eyebrow: "Sub peisaj", title: "Parcare subterană securizată", body: "Accesul controlat, iluminatul LED și încărcarea electrică păstrează mașina la îndemână și parterul dedicat oamenilor.", image: "/COMsite.webp", alt: "Cartierul urban Avenue" },
        { eyebrow: "Viața la parter", title: "Servicii aproape de casă", body: "Cafenele, restaurante, clinici, servicii wellness și clubul World Class fac Avenue util de dimineața până seara.", image: "/COMbuildingrender.webp", alt: "Parter mixt Avenue" },
        { eyebrow: "Pentru fiecare", title: "Sigur, deschis și accesibil", body: "Accesul controlat, iluminatul perimetral, rampele, lifturile și holurile generoase fac zona ușor de folosit la orice vârstă.", image: "/COMconversationrender.webp", alt: "Rezidenți într-o curte amenajată" },
      ],
      closingEyebrow: "Continuă prin City of Mara",
      closingTitle: ["Avenue este matur.", "Forum prinde contur."],
      nextLabel: "Forum",
    },
  },
};

export default function AvenuePage() { return <DevelopmentPage config={avenue} />; }
