// src/components/About/AboutContact.tsx
'use client';

import React from 'react';
import './aboutcontact.css';

export type ContactLink = {
  type: 'primary' | 'secondary';
  label: string;
  href: string;
};

export type AboutContactProps = {
  links: ContactLink[];
};

export default function AboutContact({ links }: AboutContactProps) {
  return (
    <div className="about-contact">
      <div className="contact-buttons">
        {links.map((link, index) => (
          <a
            key={`${link.type}-${index}`}
            href={link.href}
            className={`contact-button contact-${link.type}`}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            aria-label={`${link.label} - Opens ${link.href.startsWith('http') ? 'in new tab' : 'email client'}`}
          >
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}