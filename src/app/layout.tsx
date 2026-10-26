import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "BuilDo — Your idea. Live in days.",
  description:
    "Custom websites, apps and automations. Built, tested and launched by our team with guaranteed response times and end-to-end delivery responsibility.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    title: "BuilDo — Your idea. Live in days.",
    description: "Managed custom software delivery. Built, tested and launched by our dedicated team.",
    type: "website",
    siteName: "BuilDo",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col selection:bg-[var(--brand-soft)] selection:text-[var(--brand)]">
        {children}
      </body>
    </html>
  );
}
