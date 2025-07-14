"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { VideoItem } from "./index";

interface VideoCardProps {
  item: VideoItem;
  isSelected: boolean;
  onSelect: () => void;
  index?: number;
}

export default function VideoCard({
  item,
  isSelected,
  onSelect,
  index = 0
}: VideoCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = useCallback(() => {
    console.warn(`Failed to load thumbnail for ${item.id}`);
    setImageError(true);
    setImageLoaded(true);
  }, [item.id]);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    setImageError(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  }, [onSelect]);

  // Get category info from JSON
  const category = item.category || "Creative";
  const categoryLower = category.toLowerCase();

  // Get category-specific icon for fallback
  const getCategoryIcon = () => {
    switch (categoryLower) {
      case 'corporate':
        return "🏢";
      case 'creative':
        return "🎨";
      case 'comedy':
        return "😂";
      default:
        return "🎬";
    }
  };

  return (
    <div 
      className={`video-card ${isSelected ? 'selected' : ''}`}
      style={{ '--item-index': index } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        className="video-card-button"
        aria-pressed={isSelected}
        aria-label={`Play video: ${item.title} - ${category}`}
      >
        {/* Thumbnail Container */}
        <div className="video-thumbnail-container">
          {!imageError ? (
            <Image
              src={item.thumbnail}
              alt={`Thumbnail for ${item.title}`}
              fill
              sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 200px"
              className={`video-thumbnail ${imageLoaded ? 'loaded' : ''}`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={index < 4}
            />
          ) : (
            <div className="video-thumbnail-fallback">
              <div className="fallback-icon">
                {getCategoryIcon()}
              </div>
              <span className="fallback-text">
                {category.toUpperCase()}
              </span>
            </div>
          )}

          {/* Category Label - Single Instance */}
          <div className={`video-category-label ${categoryLower}`}>
            {category}
          </div>

          {/* Play Overlay */}
          <div className="video-overlay">
            <div className="overlay-content">
              <div className="play-icon">▶</div>
              <span className="overlay-text">
                {isSelected ? "Now Playing" : "Play Video"}
              </span>
            </div>
          </div>

          {/* Selection Indicator */}
          {isSelected && (
            <div className="selection-indicator">
              <div className="selection-badge">✓</div>
            </div>
          )}

          {/* Loading State */}
          {!imageLoaded && !imageError && (
            <div className="thumbnail-loading">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>

        {/* Card Content - No duplicate label */}
        <div className="video-card-content">
          <h5 className="video-title">{item.title}</h5>
        </div>
      </button>
    </div>
  );
}