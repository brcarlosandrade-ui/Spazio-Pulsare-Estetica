import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/content/site.config";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.clinicName} — ${siteConfig.tagline}`,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${playfairDisplay.variable} ${inter.variable} ${cormorantGaramond.variable}`}
    >
      <body className="bg-warmWhite font-body text-graphite antialiased">
        {children}
      </body>
    </html>
  );
}
