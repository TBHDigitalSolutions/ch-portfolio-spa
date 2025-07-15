// src/components/Footer/FooterLogo.tsx
'use client';

import React from 'react';
import Image from 'next/image';
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
      <Image 
        src={logoPath} 
        alt={logoAlt} 
        width={24}
        height={24}
        className="footer-logo-img"
        loading="lazy"
      />
      <span className="footer-logo-text">{text}</span>
    </a>
  );
}