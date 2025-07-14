// src/components/Base/NavBranding/NavBranding.tsx
"use client";

import React from 'react';
import Divider from '@/components/Base/SectionDivider/Divider';
import './navbranding.css';

interface NavBrandingProps {
  className?: string;
}

export default function NavBranding({ className = '' }: NavBrandingProps) {
  return (
    <div className={`nav-branding ${className}`}>
      <div className="nav-branding-container">
        {/* Main Brand Name */}
        <h1 className="nav-brand-name">Conor Hovis</h1>
        
        {/* Divider Component */}
        <Divider />
        
        {/* Subtitle */}
        <p className="nav-brand-subtitle">Content Portfolio</p>
      </div>
    </div>
  );
}