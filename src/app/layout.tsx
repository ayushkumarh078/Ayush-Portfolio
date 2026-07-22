import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Ayush Kumar | Software Engineer",
  description: "Portfolio of Ayush Kumar, Software Engineer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0a] text-white font-sans antialiased selection:bg-[#d4af37]/30">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
