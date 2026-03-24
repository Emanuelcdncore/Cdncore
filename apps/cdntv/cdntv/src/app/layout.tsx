import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CopyProtection from "@/components/CopyProtection";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "CDNTV - Empowering Creative Connections",
  description: "CDNTV - Empowering Creative Connections",
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
        {children}
      </body>
    </html>
  );
}
