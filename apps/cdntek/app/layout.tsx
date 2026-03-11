import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import localFont from "next/font/local";
import I18nProvider from "@/i18n/I18nProvider";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

const depot = localFont({
  src: "../public/fonts/Depot.ttf",
  variable: "--font-depot",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CDNTEK - Technology & Innovation",
  description:
    "CDNTEK - Solu\u00e7\u00f5es de tecnologia, audiovisual, ciberseguran\u00e7a e gest\u00e3o de redes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="dark">
      <body
        className={`${inter.variable} ${rajdhani.variable} ${depot.variable} antialiased`}
        style={{ fontFamily: "var(--font-inter), sans-serif" }}
      >
        <I18nProvider>
          <Header />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
