import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/components/I18nProvider";

const readexPro = Readex_Pro({
  variable: "--font-readex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lori-talk.eu"),
  title: {
    default: "Loritalk \u2014 AI Content for Every Social Network",
    template: "%s | Loritalk",
  },
  description:
    "Loritalk uses multiple AI models (Claude, GPT, Gemini) to generate optimized posts for Instagram, LinkedIn, X, TikTok, and Facebook \u2014 in seconds. Free during Beta.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Loritalk",
    title: "Loritalk \u2014 AI Content for Every Social Network",
    description: "Write one idea, get optimized posts for every platform. Multiple AI models compete to give you the best result.",
    url: "https://lori-talk.eu",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Loritalk \u2014 AI Content for Every Social Network" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Loritalk \u2014 AI Content for Every Social Network",
    description: "Write one idea, get optimized posts for every platform. Multiple AI models compete to give you the best result.",
    images: ["/og-default.png"],
  },
  icons: { icon: [{ url: "/favicon.ico" }] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${readexPro.variable} antialiased`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" rel="stylesheet" />
      </head>
      <body className="min-h-screen" suppressHydrationWarning>
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  );
}
