// src/components/ImageGrid/ImageCard.tsx - Production Ready with Debug Logging
'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import Image from 'next/image';
import Lightbox from './Lightbox';
import { sanitizeCaption } from '@/lib/utils/formatCaption';
import type { ImageItem } from './types';

/**
 * Props for ImageCard derive from the core ImageItem type.
 */
export interface ImageCardProps extends ImageItem {
  /** low-res placeholder for blur (optional) */
  blurDataURL?: string;
}

// Development logging utility
const isDev = process.env.NODE_ENV === 'development';
const debugWarn = isDev ? console.warn : () => {};

export default function ImageCard({
  id,
  src,
  alt,
  caption,
  size = 'medium',
  priority = false,
  blurDataURL,
}: ImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const safeAlt = sanitizeCaption(alt ?? caption ?? id);

  // Reset state when src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
    setDimensions({ width: 0, height: 0 });
  }, [src]);

  const openLB = useCallback(() => setIsOpen(true), []);
  const closeLB = useCallback(() => setIsOpen(false), []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLB();
      }
    },
    [openLB]
  );

  // Pre-load image to get dimensions before Next.js Image renders
  useEffect(() => {
    if (!src) return;

    const preloadImg = new window.Image();
    preloadImg.onload = () => {
      setDimensions({
        width: preloadImg.naturalWidth,
        height: preloadImg.naturalHeight,
      });
    };
    preloadImg.onerror = () => {
      debugWarn(`Pre-load failed for: ${src}`);
      setError(true);
    };
    preloadImg.src = src;
  }, [src]);

  // Handle Next.js Image load & error
  const handleImageLoad = useCallback(() => setLoaded(true), []);
  const handleImageError = useCallback(() => {
    debugWarn(`Next.js Image load failed: ${src}`);
    setError(true);
    setLoaded(true);
  }, [src]);

  // CSS classes
  const classes = [
    'image-card',
    `image-card-${size}`,
    priority && 'priority',
    loaded && 'loaded',
    isHovered && 'hovered',
  ]
    .filter(Boolean)
    .join(' ');

  // Blur placeholder fallback
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=';
  };

  // Responsive sizes attribute
  const getSizes = () =>
    size === 'large' || size === 'wide'
      ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw';

  return (
    <>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`View image: ${safeAlt}`}
        className={classes}
        onDoubleClick={openLB}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!error && dimensions.width > 0 ? (
          <Image
            src={src}
            alt={safeAlt}
            width={dimensions.width}
            height={dimensions.height}
            priority={priority}
            placeholder="blur"
            blurDataURL={getBlurDataURL()}
            sizes={getSizes()}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className="image-card-img"
            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
          />
        ) : error ? (
          <div className="image-card-fallback">
            <div className="fallback-icon">⚠️</div>
            <span className="fallback-text">Image failed to load</span>
          </div>
        ) : (
          <div className="image-card-loading">
            <div className="loading-spinner" />
          </div>
        )}

        <div className="image-card-overlay">
          <div className="image-card-overlay-content">
            <div className="overlay-text">Double-click to view</div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="expand-icon"
              aria-hidden="true"
            >
              <path
                d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {isOpen && (
        <Lightbox
          src={src}
          alt={safeAlt}
          caption={caption}
          isOpen
          onClose={closeLB}
        />
      )}
    </>
  );
}