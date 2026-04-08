import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

const readexPro = Readex_Pro({
  variable: "--font-readex",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loritalk — The power of custo\u2014mize",
  description:
    "Loritalk® — AI content for every social network. Write your idea, get optimized posts for Instagram, LinkedIn, X, TikTok and more. Free during Beta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${readexPro.variable} antialiased`}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
