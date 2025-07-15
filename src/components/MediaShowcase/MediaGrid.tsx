// src/components/MediaShowcase/MediaGrid.tsx - Video Only Implementation
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { sanitizeCaption } from "@/lib/utils/formatCaption";

export type VideoItem = {
  id: string;
  src: string;
  title: string;
  thumbnail: string;
};

interface MediaGridProps {
  videos: VideoItem[];
  onSelect: (video: VideoItem) => void;
  selectedId?: string;
  variant?: "sidebar" | "grid-only";
}

// Enhanced thumbnail generation with fallback logic
const getThumbnailUrl = (video: VideoItem): string => {
  // Always use the provided thumbnail first
  if (video.thumbnail) {
    return video.thumbnail;
  }
  
  // Fallback logic: replace video extension with -thumb.png
  const fallbackThumb = video.src.replace(/\.(mp4|webm|mov)$/i, '-thumb.png');
  return fallbackThumb;
};

export default function MediaGrid({
  videos,
  onSelect,
  selectedId,
  variant = "sidebar"
}: MediaGridProps) {
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  if (!videos?.length) {
    return (
      <div className="media-grid-empty">
        <p>No videos available</p>
      </div>
    );
  }

  const handleImageError = (videoId: string) => {
    setImageErrors(prev => new Set([...prev, videoId]));
  };

  const handleImageLoad = (videoId: string) => {
    setLoadedImages(prev => new Set([...prev, videoId]));
  };

  const containerClass = variant === "grid-only" 
    ? "media-grid-container-full" 
    : "media-grid-container";

  return (
    <div className={containerClass}>
      {videos.map((video, index) => {
        const thumbnailUrl = getThumbnailUrl(video);
        const safeTitle = sanitizeCaption(video.title);
        const isSelected = video.id === selectedId;
        const hasError = imageErrors.has(video.id);
        const isLoaded = loadedImages.has(video.id);
        
        return (
          <div 
            key={video.id} 
            className={`media-grid-item ${isSelected ? 'selected' : ''}`}
            style={{ '--item-index': index } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={() => onSelect(video)}
              className={`media-item-button ${isSelected ? 'active' : ''}`}
              aria-pressed={isSelected}
              aria-label={`Play video: ${safeTitle}`}
            >
              {/* Thumbnail container */}
              <div className="media-thumbnail-container">
                {!hasError ? (
                  <Image
                    src={thumbnailUrl}
                    alt={`${safeTitle} thumbnail`}
                    fill
                    sizes="(max-width: 768px) 100px, 150px"
                    className={`media-thumbnail ${isLoaded ? 'loaded' : ''}`}
                    onLoad={() => handleImageLoad(video.id)}
                    onError={() => handleImageError(video.id)}
                    priority={index < 4} // Priority load first 4 items
                  />
                ) : (
                  <div className="media-thumbnail-fallback">
                    <div className="fallback-icon">▶</div>
                    <span className="fallback-text">Video</span>
                  </div>
                )}

                {/* Loading spinner */}
                {!isLoaded && !hasError && (
                  <div className="media-loading-overlay">
                    <div className="loading-spinner" />
                  </div>
                )}

                {/* Video type indicator */}
                <div className="media-type-indicator">▶</div>

                {/* Interactive hover overlay */}
                <div className="media-hover-overlay">
                  <div className="overlay-content">
                    <div className="play-icon">▶</div>
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

              {/* Video title below thumbnail */}
              <div className="media-item-title">
                <span className="title-text">{safeTitle}</span>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}