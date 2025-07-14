// src/components/ImageGrid/index.tsx
'use client';

import React, { useMemo } from 'react';
import ImageCard from './ImageCard';
import { SectionRationale, SectionRationaleProps } from '@/components/SectionRationale';
import imageGridRationale from '@/data/content/imageGridRationale.json';
import './imagegrid.css';

export type ImageSize = 'small' | 'medium' | 'large' | 'wide' | 'tall';

export interface ImageItem {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
  size?: ImageSize;
  priority?: boolean;
}

interface ImageGridProps {
  images?: ImageItem[];
  variant?: 'instagram' | 'masonry' | 'portfolio';
  spacing?: 'normal' | 'tight';
  /** Optional rationale block data */
  rationaleData?: SectionRationaleProps;
}

export default function ImageGrid({
  images = [],
  variant = 'masonry',
  spacing = 'normal',
  rationaleData,
}: ImageGridProps) {
  if (images.length === 0) return null;

  // Prepare rationale data (prop override or default JSON)
  const rationale: SectionRationaleProps =
    rationaleData ?? (imageGridRationale as SectionRationaleProps);

  // Assign sizes if missing
  const processedImages = useMemo(() => {
    const patterns: ImageSize[] = [
      'medium','small','large','small','small','wide',
      'small','medium','small','tall','small','small'
    ];
    return images.map((img, i) =>
      img.size ? img : { ...img, size: patterns[i % patterns.length] }
    );
  }, [images]);

  const getContainerClasses = () => {
    const base = 'image-grid-container';
    const variantClass = `image-grid-${variant}`;
    const spacingClass = spacing === 'tight' ? 'tight' : '';
    return `${base} ${variantClass} ${spacingClass}`.trim();
  };

  return (
    <div>
      {/* Rationale block above the grid */}
      <SectionRationale {...rationale} />

      <div className={getContainerClasses()}>
        {processedImages.map((img, idx) => (
          <ImageCard
            key={img.id}
            id={img.id}
            src={img.src}
            alt={img.alt}
            caption={img.caption}
            size={img.size}
            priority={img.priority || idx < 4}
          />
        ))}
      </div>
    </div>
  );
}
