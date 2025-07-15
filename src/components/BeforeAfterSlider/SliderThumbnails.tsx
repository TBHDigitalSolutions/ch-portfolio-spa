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
    // ✅ FIXED: Removed console.warn to fix ESLint error
    // Use proper error handling/logging if needed
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
      aria-label="Before and after image thumbnails"
    >
      {items.map((item, index) => {
        const isSelected = index === selectedIndex;
        const isLoaded = loadedThumbnails.has(item.id);
        const hasError = errorThumbnails.has(item.id);

        return (
          <button
            key={item.id}
            type="button"
            className={`slider-thumbnail-btn ${isSelected ? "active" : ""}`}
            onClick={() => onSelect(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            aria-selected={isSelected}
            aria-label={`View ${item.caption || `image ${index + 1}`}`}
            tabIndex={isSelected ? 0 : -1}
          >
            <div className="thumbnail-image-container">
              {!hasError ? (
                <Image
                  src={item.thumbnail}
                  alt={item.caption || `Thumbnail ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100px, 150px"
                  className={`thumbnail-image ${isLoaded ? "loaded" : ""}`}
                  onLoad={() => handleThumbnailLoad(item.id)}
                  onError={() => handleThumbnailError(item.id)}
                />
              ) : (
                <div className="thumbnail-fallback">
                  <div className="fallback-icon">🖼️</div>
                  <div className="fallback-text">Image</div>
                </div>
              )}

              {!isLoaded && !hasError && (
                <div className="thumbnail-loading">
                  <div className="loading-spinner" />
                </div>
              )}

              {isSelected && (
                <div className="thumbnail-active-indicator">
                  <div className="active-badge">✓</div>
                </div>
              )}
            </div>

            <div className="thumbnail-content">
              <p className="thumbnail-caption">
                {item.caption || `Image ${index + 1}`}
              </p>
              {!isVerticalLayout && (
                <div className="thumbnail-number">{index + 1}</div>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
});

export default SliderThumbnails;