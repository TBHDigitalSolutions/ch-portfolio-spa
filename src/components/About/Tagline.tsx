// src/components/About/Tagline.tsx
'use client';

import React from 'react';
import './tagline.css';

export type TaglineProps = {
  tagline: string;
};

export default function Tagline({ tagline }: TaglineProps) {
  return (
    <div className="about-tagline-wrapper">
      <p className="about-tagline">{tagline}</p>
    </div>
  );
}