// src/components/ImageGrid/index.tsx - Production Ready
'use client';

import React, { useMemo } from 'react';
import clsx from 'clsx';
import ImageCard from './ImageCard';
import defaultImageGridData from '@/data/media/imageGrid.json';
import { SectionRationale, SectionRationaleProps } from '@/components/SectionRationale';
import type { ImageSize, ImageItem } from './types';
import './imagegrid.css';

export interface ImageGridProps {
  /** Explicit image list; falls back to default JSON if empty */
  images?: ImageItem[];
  /** Layout style: Instagram grid, Masonry, or Portfolio */
  variant?: 'instagram' | 'masonry' | 'portfolio';
  /** Tight or normal spacing between items */
  spacing?: 'normal' | 'tight';
  /** Optional rationale block data */
  rationaleData?: SectionRationaleProps;
  /** Additional wrapper class names */
  className?: string;
}

// Balanced size pattern for useMemo
const sizePatterns: ImageSize[] = [
  'medium','small','large','small','small','wide',
  'small','medium','small','tall','small','small',
];

export default function ImageGrid({
  images = [],
  variant = 'masonry',
  spacing = 'normal',
  rationaleData,
  className,
}: ImageGridProps) {
  // Build processedImages with sizes
  const processedImages = useMemo(() => {
    const validSizes: ImageSize[] = ['small', 'medium', 'large', 'wide', 'tall'];
    const source = images.length ? images : defaultImageGridData;

    return source.map((img, idx) => ({
      ...img,
      size: validSizes.includes(img.size as ImageSize)
        ? (img.size as ImageSize)
        : sizePatterns[idx % sizePatterns.length],
    }));
  }, [images]);

  // Early return if no items
  if (!processedImages.length) {
    return (
      <div className="image-grid-empty">
        <p>No images to display.</p>
      </div>
    );
  }

  // Compute grid classes
  const gridClasses = clsx(
    'image-grid',
    `image-grid-${variant}`,
    spacing === 'tight' && 'spacing-tight'
  );

  return (
    <section className={clsx('image-grid-section', className)}>
      {/* Optional rationale above */}
      {rationaleData && <SectionRationale {...rationaleData} />}

      <div className="image-grid-container">
        <div className={gridClasses}>
          {processedImages.map(item => (
            <ImageCard
              key={item.id}
              {...item}
              priority={item.priority}
            />
          ))}
        </div>
      </div>
    </section>
  );
}