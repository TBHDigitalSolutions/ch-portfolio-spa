// src/components/Footer/FooterLogo.tsx
'use client';

import React from 'react';
import './footerlogo.css';

interface FooterLogoProps {
  text: string;
  logoPath: string;
  logoAlt: string;
  url: string;
}

export default function FooterLogo({ 
  text, 
  logoPath, 
  logoAlt, 
  url 
}: FooterLogoProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="footer-logo-link"
      aria-label={`${text} - Opens in new tab`}
    >
      <img 
        src={logoPath} 
        alt={logoAlt} 
        className="footer-logo-img"
        loading="lazy"
      />
      <span className="footer-logo-text">{text}</span>
    </a>
  );
}