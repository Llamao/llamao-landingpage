import GA4Analytics from "@/components/analytics/GA4Analytics";
import { baseMetadata } from "@/lib/seo";
import {
  Geist,
  Geist_Mono,
  Pixelify_Sans,
  Press_Start_2P,
  Silkscreen,
} from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const silkscreen = Silkscreen({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-silkscreen",
});

const pixelifySans = Pixelify_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-pixelify",
});

export const metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable} ${silkscreen.variable} ${pixelifySans.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <GA4Analytics />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
