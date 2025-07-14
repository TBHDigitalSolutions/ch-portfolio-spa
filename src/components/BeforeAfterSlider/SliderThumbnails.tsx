// src/components/BeforeAfterSlider/SliderThumbnails.tsx
"use client";

import React, { useState, useEffect, memo, useCallback } from "react";
import Image from "next/image";
import type { BeforeAfterItem } from "./index";

interface SliderThumbnailsProps {
  items: BeforeAfterItem[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

const SliderThumbnails = memo<SliderThumbnailsProps>(function SliderThumbnails({
  items,
  selectedIndex,
  onSelect,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMdUp, setIsMdUp] = useState(false);
  const [loadedThumbnails, setLoadedThumbnails] = useState<Set<string>>(new Set());
  const [errorThumbnails, setErrorThumbnails] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsMounted(true);
    
    // Function to check if we're at md breakpoint or above
    const checkBreakpoint = () => {
      setIsMdUp(window.innerWidth >= 768); // 768px is md breakpoint
    };

    // Check on mount
    checkBreakpoint();

    // Add resize listener
    window.addEventListener('resize', checkBreakpoint);
    
    return () => {
      window.removeEventListener('resize', checkBreakpoint);
    };
  }, []);

  // Handle thumbnail load success
  const handleThumbnailLoad = useCallback((itemId: string) => {
    setLoadedThumbnails(prev => new Set([...prev, itemId]));
  }, []);

  // Handle thumbnail load error
  const handleThumbnailError = useCallback((itemId: string) => {
    console.warn(`Failed to load thumbnail for item: ${itemId}`);
    setErrorThumbnails(prev => new Set([...prev, itemId]));
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onSelect(index);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        onSelect(index > 0 ? index - 1 : items.length - 1);
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        onSelect(index < items.length - 1 ? index + 1 : 0);
        break;
    }
  }, [onSelect, items.length]);

  // Render mobile layout by default until mounted
  // This prevents hydration mismatch since server always renders mobile
  const isVerticalLayout = isMounted && isMdUp;

  return (
    <div
      className={`slider-thumbnails ${
        isVerticalLayout
          ? "slider-thumbnails-vertical"
          : "slider-thumbnails-horizontal"
      }`}
      role="tablist"
      aria-orientation={isVerticalLayout ? "vertical" : "horizontal"}
      aria-label="Before and after image selection"
    >
      {items.map((item, idx) => {
        const isActive = idx === selectedIndex;
        const isLoaded = loadedThumbnails.has(item.id);
        const hasError = errorThumbnails.has(item.id);
        
        return (
          <button
            key={item.id}
            onClick={() => onSelect(idx)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`slider-thumbnail-btn ${isActive ? 'active' : ''}`}
            role="tab"
            aria-selected={isActive}
            aria-controls="slider-display"
            aria-label={`Show ${item.caption} comparison (${idx + 1} of ${items.length})`}
            id={`thumb-${item.id}`}
            tabIndex={isActive ? 0 : -1}
            style={{ '--item-index': idx } as React.CSSProperties}
          >
            {/* Thumbnail Image Container - Video Card Style */}
            <div className="thumbnail-image-container">
              {!hasError ? (
                <Image
                  src={item.thumbnail}
                  alt={`Thumbnail for ${item.caption}`}
                  width={400}
                  height={225}
                  sizes="(max-width: 768px) 140px, 200px"
                  className={`thumbnail-image ${isLoaded ? 'loaded' : ''}`}
                  onLoad={() => handleThumbnailLoad(item.id)}
                  onError={() => handleThumbnailError(item.id)}
                  priority={idx < 3} // Load first 3 thumbnails with priority
                />
              ) : (
                /* Fallback content for failed thumbnails */
                <div className="thumbnail-fallback">
                  <div className="fallback-icon">🖼️</div>
                  <span className="fallback-text">Image</span>
                </div>
              )}

              {/* Loading spinner */}
              {!isLoaded && !hasError && (
                <div className="thumbnail-loading">
                  <div className="loading-spinner-small"></div>
                </div>
              )}

              {/* Active indicator - Video Card Style */}
              {isActive && (
                <div className="thumbnail-active-indicator">
                  <div className="active-badge">✓</div>
                </div>
              )}
            </div>

            {/* Card Content - Video Card Style */}
            <div className="thumbnail-content">
              {/* Caption Text - Styled like video title */}
              <h6 className="thumbnail-caption">
                {item.caption}
              </h6>
              
              {/* Number indicator - Mobile Only, styled like video source */}
              {!isVerticalLayout && (
                <span className="thumbnail-number">
                  {idx + 1} of {items.length}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
});

export default SliderThumbnails;