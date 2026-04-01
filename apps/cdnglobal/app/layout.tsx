import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cdnglobal.eu"),
  title: "CDN Global - Empowering the Future",
  description: "Gateway to the CDN Global group: cdnCore, cdnTV, and cdnTek.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "CDN Global",
    title: "CDN Global - Empowering the Future",
    description: "Gateway to the CDN Global group: cdnCore, cdnTV, and cdnTek.",
    url: "https://cdnglobal.eu",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
