// src/components/Footer/Footer.tsx
'use client';

import React from 'react';
import FooterLogo from './FooterLogo';
import './footer.css';

// Default footer data structure
const defaultFooterData = {
  copyright: {
    text: "© {year} Conor Hovis. All rights reserved."
  },
  socialLinks: [
    {
      type: "email",
      text: "Email",
      url: "mailto:conorhovis1@gmail.com",
      ariaLabel: "Send email to Conor Hovis"
    },
    {
      type: "linkedin",
      text: "LinkedIn",
      url: "https://www.linkedin.com/in/conor-hovis/",
      ariaLabel: "Visit Conor Hovis LinkedIn profile"
    },
    {
      type: "projects",
      text: "More Projects",
      url: "https://www.linkedin.com/in/conor-hovis/details/projects/",
      ariaLabel: "View more projects on LinkedIn"
    }
  ],
  backToTop: {
    href: "#top",
    text: "Back to Top",
    ariaLabel: "Scroll back to top of page"
  },
  poweredBy: {
    text: "Powered by TBHDigitalSolutions",
    logoPath: "/images/tbhdigitalsolutions-logo.png",
    logoAlt: "TBHDigitalSolutions Logo",
    url: "https://tbhdigitalsolutions.com"
  }
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-content">
        {/* Social Links */}
        <div className="footer-links">
          {defaultFooterData.socialLinks.map((link) => (
            <a
              key={link.type}
              href={link.url}
              className="footer-link"
              aria-label={link.ariaLabel}
              {...(link.type !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.text}
            </a>
          ))}
        </div>

        {/* Back to Top */}
        <div className="footer-back-to-top">
          <a
            href={defaultFooterData.backToTop.href}
            className="back-to-top-btn"
            aria-label={defaultFooterData.backToTop.ariaLabel}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {defaultFooterData.backToTop.text}
          </a>
        </div>

        {/* Copyright */}
        <p className="footer-copyright">
          {defaultFooterData.copyright.text.replace('{year}', String(year))}
        </p>

        {/* Powered by logo/text */}
        <div className="footer-powered-by">
          <FooterLogo {...defaultFooterData.poweredBy} />
        </div>
      </div>
    </footer>
  );
}