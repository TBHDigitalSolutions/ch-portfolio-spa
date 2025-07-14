// src/components/Base/Navigation/Navigation.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import NavBranding from "@/components/Base/NavBranding/NavBranding";
import "./navigation.css";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: "about", label: "About & Skills" },
    { href: "before-after", label: "Before & After" },
    { href: "media-showcase", label: "Media Showcase" },
    { href: "documents", label: "Documents" },
    { href: "video-content", label: "Video Content" },
    { href: "image-gallery", label: "Image Gallery" },
  ];

  return (
    <nav 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="nav-container">
        {/* Left Side - NavBranding Component */}
        <NavBranding className="nav-branding-area" />

        {/* Center - Navigation Links */}
        <ul className={`nav-list ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <ScrollLink
                to={item.href}
                spy={true}
                smooth={true}
                offset={-80} // Account for fixed nav height
                duration={500}
                className="nav-link"
                activeClass="nav-link-active"
                aria-label={`Navigate to ${item.label} section`}
                onClick={closeMobileMenu}
              >
                {item.label}
              </ScrollLink>
            </li>
          ))}
          
          {/* Mobile Contact Section */}
          <li className="mobile-contact-container">
            <div className="mobile-contact-info">
              <span className="mobile-contact-label">Get in touch:</span>
              <div className="mobile-contact-links">
                <a 
                  href="mailto:conorhovis1@gmail.com"
                  className="mobile-contact-link email"
                  aria-label="Send email to Conor Hovis"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <span>Email</span>
                </a>
                <a 
                  href="https://linkedin.com/in/conorhovis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-contact-link linkedin"
                  aria-label="View Conor's LinkedIn profile"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>
    </nav>
  );
}