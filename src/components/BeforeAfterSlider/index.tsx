// src/components/BeforeAfterSlider/index.tsx
'use client';

import React, { useState, memo, useCallback } from 'react';
import SliderDisplay from './SliderDisplay';
import SliderThumbnails from './SliderThumbnails';
import { SectionRationale, SectionRationaleProps } from '@/components/SectionRationale';
import './slider.css';
import { sanitizeCaption, truncateCaption } from '@/lib/utils/formatCaption';

export interface BeforeAfterItem {
  id: string;
  before: string;
  after: string;
  thumbnail: string;
  caption: string;
}

export interface BeforeAfterSliderProps {
  items?: BeforeAfterItem[];
  /** Data for the rationale section above the slider */
  rationaleData?: SectionRationaleProps;
  className?: string;
  onSlideChange?: (index: number, item: BeforeAfterItem) => void;
}

const BeforeAfterSlider = memo<BeforeAfterSliderProps>(function BeforeAfterSlider({
  items = [],
  rationaleData,
  className = '',
  onSlideChange,
}) {
  if (!items.length) {
    return (
      <div
        className="before-after-empty"
        role="region"
        aria-label="Before and after gallery"
      >
        <p>No before and after images available</p>
      </div>
    );
  }

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = items[selectedIndex];

  const handleSlideChange = useCallback(
    (index: number) => {
      if (index !== selectedIndex && index >= 0 && index < items.length) {
        setSelectedIndex(index);
        onSlideChange?.(index, items[index]);
      }
    },
    [selectedIndex, items, onSlideChange]
  );

  const caption = truncateCaption(
    sanitizeCaption(selected.caption),
    60,
    { wordBoundaries: true }
  );

  return (
    <div className={`before-after-slider-wrapper ${className}`}>
      {/* Rationale block, if provided */}
      {rationaleData && <SectionRationale {...rationaleData} />}

      <div
        className="before-after-slider-container"
        role="region"
        aria-label="Before and after image comparison gallery"
      >
        {/* Slider Display (75% on desktop) */}
        <div className="slider-display-area">
          <SliderDisplay
            beforeSrc={selected.before}
            afterSrc={selected.after}
            caption={caption}
            heightClass="h-full"
          />
        </div>

        {/* Thumbnails (25% on desktop) */}
        <div className="slider-thumbnails-area">
          <SliderThumbnails
            items={items}
            selectedIndex={selectedIndex}
            onSelect={handleSlideChange}
          />
        </div>
      </div>
    </div>
  );
});

export default BeforeAfterSlider;
