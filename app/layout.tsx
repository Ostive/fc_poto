import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/Ticker";
import { CookieBanner } from "@/components/CookieBanner";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"]
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata: Metadata = {
  title: "FC Poto · Football Club de Toulouse",
  description:
    "FC Poto, club de football amateur basé à Toulouse depuis 2010. Foot à 11, foot à 7, walking foot. Pratiques, calendrier, actualités, et toute la vie du club.",
  metadataBase: new URL("https://fcpoto.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/android-chrome-512x512.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "FC Poto · Football Club de Toulouse",
    description:
      "Le football comme on l'aime : le terrain, le maillot, le crampon. Bienvenue au FC Poto.",
    type: "website",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "FC Poto" }]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${archivo.variable} ${mono.variable}`}>
      <body className="font-sans bg-cream text-ink min-h-screen flex flex-col">
        <TopTicker />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
