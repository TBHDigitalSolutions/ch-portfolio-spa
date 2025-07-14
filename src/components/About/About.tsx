// src/components/About/About.tsx
'use client';

import React from 'react';
import './about.css';

export type AboutProps = {
  intro: string[];
};

export default function About({ intro }: AboutProps) {
  return (
    <div className="about-container">
      {/* Single container for all intro paragraphs */}
      <div className="about-intro">
        {intro.map((paragraph, index) => (
          <p key={index} className="about-paragraph">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}