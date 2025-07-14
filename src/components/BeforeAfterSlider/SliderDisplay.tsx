// src/components/BeforeAfterSlider/SliderDisplay.tsx
"use client";

import React, { memo } from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

export interface SliderDisplayProps {
  beforeSrc: string;
  afterSrc: string;
  caption?: string;
  /** Tailwind height class, e.g. "h-96" or "h-[600px]" */
  heightClass?: string;
}

const SliderDisplay = memo<SliderDisplayProps>(function SliderDisplay({
  beforeSrc,
  afterSrc,
  caption,
  heightClass = "h-full",
}) {
  return (
    <div className="slider-display-wrapper">
      {/* Caption overlay - using CSS class for consistency */}
      {caption && (
        <div className="slider-caption">
          {caption}
        </div>
      )}

      {/* React Compare Slider */}
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage
            src={beforeSrc}
            alt={caption ? `${caption} — before` : "Before image"}
          />
        }
        itemTwo={
          <ReactCompareSliderImage
            src={afterSrc}
            alt={caption ? `${caption} — after` : "After image"}
          />
        }
      />

      {/* Screen reader instructions */}
      <div className="sr-only">
        Use left and right arrow keys or drag the slider handle to compare before and after images.
      </div>
    </div>
  );
});

export default SliderDisplay;