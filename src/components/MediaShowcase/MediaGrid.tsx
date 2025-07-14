// src/components/MediaShowcase/MediaGrid.tsx - Production Ready with Title Overlays
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { sanitizeCaption } from "@/lib/utils/formatCaption";

export type MediaItem = {
  id: string;
  src: string;
  title: string;
  type: "audio" | "video";
  thumbnail?: string;
};

interface MediaGridProps {
  items: MediaItem[];
  onSelect: (item: MediaItem) => void;
  selectedId?: string;
  variant?: "sidebar" | "grid-only";
}

// Enhanced thumbnail generation with fallback logic
const getThumbnailUrl = (item: MediaItem): string => {
  // 1️⃣ ALWAYS use the provided thumbnail first
  if (item.thumbnail) {
    console.log(`Using provided thumbnail for ${item.id}:`, item.thumbnail);
    return item.thumbnail;
  }
  
  // 2️⃣ Fallback logic only if no thumbnail provided
  if (item.type === "video") {
    // Match JSON convention: -thumb.png
    const fallbackThumb = item.src.replace(/\.(mp4|webm|mov)$/i, '-thumb.png');
    console.log(`Generated video thumbnail for ${item.id}:`, fallbackThumb);
    return fallbackThumb;
  }
  
  // 3️⃣ Audio fallback
  const audioFallback = '/assets/fallback/audio-placeholder.svg';
  console.log(`Using audio fallback for ${item.id}:`, audioFallback);
  return audioFallback;
};

export default function MediaGrid({
  items,
  onSelect,
  selectedId,
  variant = "sidebar"
}: MediaGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  if (!items?.length) {
    return (
      <div className="media-grid-empty">
        <p>No media items available</p>
      </div>
    );
  }

  const handleImageError = (itemId: string, thumbnailUrl: string) => {
    console.warn(`❌ Thumbnail failed to load for ${itemId}:`, thumbnailUrl);
    setImageErrors(prev => new Set([...prev, itemId]));
  };

  const handleImageLoad = (itemId: string, thumbnailUrl: string) => {
    console.log(`✅ Thumbnail loaded successfully for ${itemId}:`, thumbnailUrl);
    setLoadedImages(prev => new Set([...prev, itemId]));
  };

  const containerClass = variant === "grid-only" 
    ? "media-grid-container-full" 
    : "media-grid-container";

  return (
    <div className={containerClass}>
      {items.map((item, index) => {
        const thumbnailUrl = getThumbnailUrl(item);
        const safeTitle = sanitizeCaption(item.title);
        const isSelected = item.id === selectedId;
        const hasError = imageErrors.has(item.id);
        const isLoaded = loadedImages.has(item.id);
        
        return (
          <div 
            key={item.id} 
            className={`media-grid-item ${isSelected ? 'selected' : ''}`}
            style={{ '--item-index': index } as React.CSSProperties}
          >
            <button
              type="button"
              aria-label={`Play ${item.type}: ${safeTitle}`}
              aria-pressed={isSelected}
              onClick={() => onSelect(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(item);
                }
              }}
              className="media-item-button"
            >
              {/* Thumbnail container */}
              <div className="media-thumbnail-container">
                {!hasError ? (
                  <Image
                    src={thumbnailUrl}
                    alt={safeTitle}
                    fill
                    sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 200px"
                    className={`media-thumbnail ${isLoaded ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad(item.id, thumbnailUrl)}
                    onError={() => handleImageError(item.id, thumbnailUrl)}
                    priority={index < 4} // Load first 4 images eagerly
                    unoptimized={thumbnailUrl.includes('.svg')} // Don't optimize SVGs
                  />
                ) : (
                  <div className="media-thumbnail-fallback">
                    <div className="fallback-icon">
                      {item.type === "video" ? "🎬" : "🎵"}
                    </div>
                    <span className="fallback-text">{item.type}</span>
                  </div>
                )}

                {/* ✅ NEW: Always visible title overlay */}
                <div className="media-title-overlay">
                  <span className="overlay-title">{safeTitle}</span>
                </div>

                {/* Media type indicator */}
                <div className="media-type-indicator">
                  {item.type === "video" ? "▶" : "♪"}
                </div>

                {/* Interactive hover overlay */}
                <div className="media-hover-overlay">
                  <div className="overlay-content">
                    <div className="play-icon">
                      {item.type === "video" ? "▶" : "♪"}
                    </div>
                    <span className="overlay-action-text">
                      {isSelected ? "Now Playing" : "Click to Play"}
                    </span>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="selection-indicator">
                    <div className="selection-badge">✓</div>
                  </div>
                )}
              </div>

              {/* Enhanced title below thumbnail */}
              <div className="media-item-title">
                <span className="title-text">{safeTitle}</span>
                <span className="media-duration">
                  {item.type === "video" ? "Video" : "Audio"}
                </span>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}