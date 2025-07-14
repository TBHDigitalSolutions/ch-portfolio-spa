// src/components/Base/SectionDivider/Divider.tsx
'use client';

import React from 'react';
import './Divider.css';

interface DividerProps {
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ className = '' }) => {
  // simple string concat in place of clsx
  const classes = ['section-divider', className].filter(Boolean).join(' ');
  return <div className={classes} />;
};

export default Divider;
