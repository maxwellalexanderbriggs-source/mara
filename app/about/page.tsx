import type { Metadata } from "next";
import AboutPageClient from "@/components/about-page";

export const metadata: Metadata = { title: "About | City of Mara", description: "City of Mara creates lasting urban communities in Timișoara, developed by Alber Holding." };

export default function AboutPage() { return <AboutPageClient />; }
