import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "City of Mara | Avenue & Forum, Timișoara",
  description: "Discover available apartments at City of Mara Avenue and Forum in central Timișoara.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
