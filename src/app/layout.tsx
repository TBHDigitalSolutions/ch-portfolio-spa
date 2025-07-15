// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import React from "react";

import "@/styles/globals.css";
import Navigation from "@/components/Base/Navigation/Navigation";
import Footer from "@/components/Footer";
import Home from "./page";

export const metadata: Metadata = {
  title: "Conor Hovis | Content Portfolio",
  description:
    "Showcasing my work in photo editing, document design, media production, and more.",
  keywords: [
    "portfolio",
    "photo editing",
    "document design",
    "media production",
    "video editing",
  ],
  authors: [{ name: "Conor Hovis" }],
  creator: "TBH Digital Solutions",
  openGraph: {
    title: "Conor Hovis | Content Portfolio",
    description:
      "Showcasing my work in photo editing, document design, media production, and more.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-thumbnail.jpg", // relative to /public
        width: 1200,
        height: 630,
        alt: "Conor Hovis Portfolio Thumbnail",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Conor Hovis | Content Portfolio",
    description:
      "Showcasing my work in photo editing, document design, media production, and more.",
    images: ["/og-thumbnail.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout() {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload critical fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Open Graph meta fallback for non-Next.js parsers */}
        <meta property="og:image" content="/og-thumbnail.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Conor Hovis Portfolio Thumbnail" />
        <meta name="twitter:image" content="/og-thumbnail.jpg" />

        {/* Theme & Color Scheme */}
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="color-scheme" content="light dark" />
      </head>

      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navigation />
        <main id="main-content" className="main-content" role="main">
          <div className="content-grid">
            <Home />
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
