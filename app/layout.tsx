import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NagrikNazar — The Citizen's Eye on Indian Politics",
  description:
    "India's most comprehensive political transparency platform. Track politician criminal records, assets, controversies, budget allocation, and government project progress. Built for every Indian citizen.",
  keywords: "india politics transparency, politician criminal records, budget tracker, election commission data, ADR india, myneta, PRS, non-partisan accountability",
  openGraph: {
    title: "NagrikNazar — The Citizen's Eye",
    description: "A non-partisan, fully-sourced view of Indian politics — criminal records, assets, budgets and controversies, every claim traceable to an official record.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "NagrikNazar — The Citizen's Eye",
    description: "A non-partisan, fully-sourced view of Indian politics. Every claim traceable to an official record.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
