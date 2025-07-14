// src/components/SectionRationale/SectionRationale.tsx
'use client';

import React from 'react';
import './sectionRationale.css';

export type RationaleItem = { 
  title: string; 
  text: string; 
};

export type FinalInfo = { 
  label: string; 
  value: string; 
};

export type SectionRationaleProps = {
  sectionTitle: string;
  description: string[];
  why: RationaleItem[];
  finalInfo: FinalInfo[];
};

export default function SectionRationale({
  sectionTitle,
  description,
  why,
  finalInfo
}: SectionRationaleProps) {
  return (
    <div className="rationale">
      {/* Section title with underline */}
      <h2 className="section-title">{sectionTitle}</h2>
      
      {/* Description paragraphs */}
      <div className="rationale-description">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      
      {/* Why section with subheading */}
      <h3 className="rationale-subheading">Why This Content Was Selected:</h3>
      
      {/* Rationale list with bullet points */}
      <ul className="rationale-list">
        {why.map((item, index) => (
          <li key={index}>
            <span>
              <strong>{item.title}</strong> – {item.text}
            </span>
          </li>
        ))}
      </ul>
      
      {/* Final info section */}
      <div className="rationale-final">
        {finalInfo.map((info, index) => (
          <p key={index}>
            <strong>{info.label}:</strong> {info.value}
          </p>
        ))}
      </div>
    </div>
  );
}