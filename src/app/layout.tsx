import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dmsans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

import Cursor from "@/components/Cursor";

import { ThemeProvider } from "@/components/ThemeProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { PerformanceMetrics } from "@/components/PerformanceMetrics";
import { LoadingSequence } from "@/components/LoadingSequence";
import { AiAssistant } from "@/components/AiAssistant";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { VisitorCounter } from "@/components/VisitorCounter";
import { KonamiCode } from "@/components/KonamiCode";

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
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-transparent text-foreground font-sans antialiased transition-colors duration-500 selection:bg-primary/30">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
          themes={["light", "dark", "midnight", "graphite"]}
        >
          <LoadingSequence />
          <Cursor />
          <CommandPalette />
          <PerformanceMetrics />
          <AiAssistant />
          <ThemeSwitcher />
          <VisitorCounter />
          <KonamiCode />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
