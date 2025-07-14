// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import React from "react";

import "@/styles/globals.css";
import Navigation from "@/components/Base/Navigation/Navigation";
import Footer from "@/components/Footer";
import Home from "./page";  // <-- explicit import of your page

export const metadata: Metadata = {
  title: "Conor Hovis Portfolio",
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
  creator: "Conor Hovis",
  openGraph: {
    title: "Conor Hovis Portfolio",
    description:
      "Showcasing my work in photo editing, document design, media production, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Conor Hovis Portfolio",
    description:
      "Showcasing my work in photo editing, document design, media production, and more.",
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

        {/* Theme color & color-scheme */}
        <meta name="theme-color" content="#1d4ed8" />
        <meta name="color-scheme" content="light dark" />
      </head>

      <body>
        {/* Accessibility skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Navigation */}
        <Navigation />

        {/* Render your page.tsx directly */}
        <main id="main-content" className="main-content" role="main">
          <div className="content-grid">
            <Home />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
