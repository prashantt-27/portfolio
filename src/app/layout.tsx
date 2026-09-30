import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import CommandPalette from "@/components/CommandPalette";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prashant Prajapati | Full Stack Developer",
  description: "Portfolio of Prashant Prajapati, a Full Stack Developer specializing in React, Next.js, AI, and scalable web applications.",
  openGraph: {
    title: "Prashant Prajapati | Full Stack Developer",
    description: "Portfolio of Prashant Prajapati, a Full Stack Developer specializing in React, Next.js, AI, and scalable web applications.",
    url: "https://prashant.dev",
    siteName: "Prashant Prajapati Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prashant Prajapati | Full Stack Developer",
    description: "Portfolio of Prashant Prajapati, a Full Stack Developer specializing in React, Next.js, AI, and scalable web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen selection:bg-white/30 selection:text-white`}>
        <div className="noise-overlay pointer-events-none" />
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          <CommandPalette />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
