import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300","400","500","600","700","800","900"],
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rakcontracting.com"),
  title: {
    default: "Rashid Al Khanzori Trading & Contracting LLC | Building Excellence in Musandam",
    template: "%s | Rashid Al Khanzori Trading & Contracting LLC",
  },
  description:
    "Award-winning construction and contracting company in Musandam, Oman. Premium luxury villas, commercial buildings, EPC projects, and infrastructure works across Musandam and the GCC.",
  keywords: [
    "construction company Musandam",
    "contracting Oman",
    "luxury villa builder Khasab",
    "EPC company Oman",
    "Rashid Al Khanzori",
    "Rashid Al Khanzori Trading & Contracting LLC",
    "infrastructure Musandam",
    "Khasab builder",
  ],
  openGraph: {
    title: "Rashid Al Khanzori Trading & Contracting LLC",
    description: "Crafting Tomorrow's Landmarks. Construction · Infrastructure · Excellence since 1998.",
    type: "website",
    locale: "en_US",
    siteName: "Rashid Al Khanzori Trading & Contracting LLC",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rakcontracting.com" },
};

import { LanguageProvider } from "@/lib/LanguageContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
