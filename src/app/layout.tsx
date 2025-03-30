// src/app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans"; // Use recommended Geist import
import { GeistMono } from "geist/font/mono";  // Use recommended Geist import
import "./globals.css"; // Import global styles

// Note: Using geist/font directly is often preferred over next/font/google for Geist
// const geistSans = Geist({ ... }) - Old way, might still work but geist/font is cleaner

export const metadata: Metadata = {
  // Update title/description later
  title: "Blockport - Solana Staking",
  description: "Secure, reliable Solana staking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}> {/* Apply font variables to HTML for better inheritance */}
      <body> {/* Removed manual className, fonts applied via html/CSS */}
        {children}
      </body>
    </html>
  );
}