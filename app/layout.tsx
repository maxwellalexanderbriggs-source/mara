import type { Metadata } from "next";
import "./globals.css";
import SiteMotion from "@/components/site-motion";

export const metadata: Metadata = {
  title: "City of Mara | Avenue & Forum, Timișoara",
  description: "Discover available apartments at City of Mara Avenue and Forum in central Timișoara.",
  icons: {
    icon: "/COMlogogeneral.webp",
    shortcut: "/COMlogogeneral.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><SiteMotion />{children}</body>
    </html>
  );
}
