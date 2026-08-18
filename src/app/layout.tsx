import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

import Cursor from "@/components/Cursor";
import Navbar from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { LoadingSequence } from "@/components/LoadingSequence";
import { VisitorCounter } from "@/components/VisitorCounter";
import { KonamiCode } from "@/components/KonamiCode";
import { ThemeApplier } from "@/components/ThemeApplier";
import { ThemeStudioTrigger } from "@/components/ThemeStudio/ThemeStudioTrigger";

export const metadata: Metadata = {
  title: "Ayush Kumar | Software Engineer",
  description: "Portfolio of Ayush Kumar, Software Engineer building scalable backend systems, AI applications, and optimized cloud infrastructure.",
  keywords: ["Software Engineer", "Backend Developer", "AI Developer", "Ayush Kumar", "Portfolio"],
  openGraph: {
    title: "Ayush Kumar | Software Engineer",
    description: "Portfolio of Ayush Kumar, Software Engineer",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-background text-foreground font-sans antialiased transition-colors duration-500 selection:bg-primary/30">
        <ThemeApplier />
        <LoadingSequence />
        <Cursor />
        <Navbar />
        <CommandPalette />
        <ThemeStudioTrigger />
        <VisitorCounter />
        <KonamiCode />
        {children}
      </body>
    </html>
  );
}
