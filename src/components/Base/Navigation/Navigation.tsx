// src/components/Base/Navigation/Navigation.tsx
"use client";

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
                  aria-label="Send email to conorhovis1@gmail.com"
                >
                  conorhovis1@gmail.com
                </a>
                <a 
                  href="tel:+1234567890" 
                  className="mobile-contact-link phone"
                  aria-label="Call phone number"
                >
                  (123) 456-7890
                </a>
              </div>
            </div>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
}