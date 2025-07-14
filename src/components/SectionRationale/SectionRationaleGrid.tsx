// src/components/SectionRationale/SectionRationaleGrid.tsx
'use client';

import React from 'react';
import './sectionRationaleGrid.css';

export interface CategoryRationale {
  title: string;
  items: string[];
}

export interface FinalInfo {
  label: string;
  value: string;
}

export interface SectionRationaleGridProps {
  sectionTitle: string;
  description: string[];
  categories: CategoryRationale[];
  finalInfo: FinalInfo[];
}

export default function SectionRationaleGrid({
  sectionTitle,
  description,
  categories,
  finalInfo,
}: SectionRationaleGridProps) {
  return (
    <div className="rationale-grid">
      {/* Section title with underline */}
      <h2 className="section-title">{sectionTitle}</h2>
      
      {/* Description paragraphs */}
      <div className="rationale-description">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Grid of category blocks */}
      <div className="rationale-categories">
        {categories.map((category, index) => (
          <div key={index} className="rationale-category-block">
            {/* Category title with underline */}
            <h5 className="category-title">{category.title}</h5>
            
            {/* Category items list */}
            <ul className="category-list">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

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