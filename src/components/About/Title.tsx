// src/components/About/Title.tsx
'use client';

import React from 'react';
import './title.css';

export type TitleProps = {
  title: string;
};

export default function Title({ title }: TitleProps) {
  return (
    <div className="about-title-wrapper">
      <h2 className="about-title-heading">{title}</h2>
    </div>
  );
}