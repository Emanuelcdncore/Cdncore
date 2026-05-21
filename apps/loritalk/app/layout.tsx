import type { Metadata, Viewport } from "next";
import { Readex_Pro, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import CookieBanner from "@/components/CookieBanner";
import MetaPixel from "@/components/MetaPixel";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const readexPro = Readex_Pro({
  variable: "--font-readex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lori-talk.eu"),
  title: {
    default: "Loritalk \u2014 AI Content for Every Social Network",
    template: "%s | Loritalk",
  },
  description:
    "Loritalk turns one brief into native posts for Instagram, LinkedIn, X, TikTok, Facebook, YouTube Shorts, Threads and Telegram. Free during Beta.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Loritalk",
    title: "Loritalk \u2014 AI Content for Every Social Network",
    description:
      "Write one idea, get a native post for every platform. Brand-voice personas, on-brand images, native publishing across 8 networks.",
    url: "https://lori-talk.eu",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Loritalk \u2014 AI Content for Every Social Network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loritalk \u2014 AI Content for Every Social Network",
    description:
      "One brief, eight native posts. Brand-voice personas and on-brand images across every social network.",
    images: ["/og-default.png"],
  },
  verification: {
    other: {
      "facebook-domain-verification": "hvk4falnb1lku5r77jxnhaib78ymdx",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#94BF5C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${readexPro.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      </head>
      <body className="min-h-screen" suppressHydrationWarning>
        <I18nProvider>
          {children}
          <CookieBanner />
          <MetaPixel />
          <GoogleAnalytics />
        </I18nProvider>
      </body>
    </html>
  );
}
