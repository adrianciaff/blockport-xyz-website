import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blockport - Solana Staking", // Updated title
  description: "Secure, reliable, zero-fee Solana staking.", // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Apply default font (quicksand) via font-sans
    <html lang="en" className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* --- IMPORTANT: REPLACE WITH YOUR ADOBE FONTS PROJECT LINK --- */}
        <link rel="stylesheet" href="https://use.typekit.net/esv0mpp.css" />
        {/* Add other head elements like favicons here */}
      </head>
      <body className="font-sans bg-rich-black antialiased">
        {children}
      </body>
    </html>
  );
}