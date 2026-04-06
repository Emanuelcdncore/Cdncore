import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aiaccountant.pt"),
  title: {
    default: "Ai-Accountant - The Accounting Revolution",
    template: "%s | Ai-Accountant",
  },
  description:
    "Transform financial management with artificial intelligence. Automate processes, eliminate errors, and gain strategic time.",
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Ai-Accountant",
    title: "Ai-Accountant - The Accounting Revolution",
    description:
      "Transform financial management with artificial intelligence. Automate processes, eliminate errors, and gain strategic time.",
    url: "https://aiaccountant.pt",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ai-Accountant - The Accounting Revolution",
    description:
      "Transform financial management with artificial intelligence.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
