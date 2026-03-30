import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CopyProtection from "@/components/CopyProtection";
import NavWrapper from "@/components/NavWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cdntv.pt"),
  title: {
    default: "CDNTV - Professional Audiovisual Production",
    template: "%s | CDNTV",
  },
  description:
    "High-end audiovisual production services. From concept to delivery, we create institutional, corporate, social media and live event content with precision and refined visual identity.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CDNTV",
    title: "CDNTV - Professional Audiovisual Production",
    description:
      "High-end audiovisual production services for institutional, corporate, social media and live events.",
    url: "https://cdntv.pt",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "CDNTV - Professional Audiovisual Production",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CDNTV - Professional Audiovisual Production",
    description:
      "High-end audiovisual production services for institutional, corporate, social media and live events.",
    images: ["/og-default.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { rel: "shortcut icon", url: "/favicon.ico" },
    ],
    apple: [{ url: "/favicon.ico" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <CopyProtection />
        <NavWrapper />
        {children}
      </body>
    </html>
  );
}
