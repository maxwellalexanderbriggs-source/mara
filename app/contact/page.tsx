import type { Metadata } from "next";
import ContactPageClient from "@/components/contact-page";

export const metadata: Metadata = { title: "Contact | City of Mara", description: "Contact the City of Mara Avenue and Forum sales teams in Timișoara." };

export default function ContactPage() { return <ContactPageClient />; }
