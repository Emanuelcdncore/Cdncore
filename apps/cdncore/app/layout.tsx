import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import I18nProvider from "@/components/I18nProvider";
import ScrollToTop from "@/components/ScrollToTop";
import NavigationWrapper from "@/components/NavigationWrapper";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const depot = localFont({
  src: "../public/fonts/Depot.ttf",
  variable: "--font-depot",
  display: "swap",
  weight: "700",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cdncore.pt"),
  title: {
    default: "CDNCore - Applied Informatics & AI Solutions",
    template: "%s | CDNCore",
  },
  description:
    "Cutting-edge applied informatics and AI solutions, driven by R&D and innovation, empowering modern enterprises through agentic intelligence.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CDNCore",
    title: "CDNCore - Applied Informatics & AI Solutions",
    description:
      "Cutting-edge applied informatics and AI solutions, driven by R&D and innovation.",
    url: "https://cdncore.pt",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "CDNCore - Applied Informatics & AI Solutions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CDNCore - Applied Informatics & AI Solutions",
    description:
      "Cutting-edge applied informatics and AI solutions, driven by R&D and innovation.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Three.js r134 for VANTA */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" defer></script>
        {/* VANTA FOG */}
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js" defer></script>
        {/* VANTA DOTS */}
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.dots.min.js" defer></script>
        {/* Leaflet CSS */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        {/* Leaflet JS */}
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" defer></script>
      </head>
      <body className={`${inter.variable} ${depot.variable} antialiased`}>
        <I18nProvider>
          <ScrollToTop />
          <NavigationWrapper />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
