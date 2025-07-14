// src/components/ImageGrid/ImageCard.tsx - Optimized for fast loading and caching
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
import { ImageSize } from './index';

interface ImageCardProps {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
  size?: ImageSize;
  priority?: boolean;
  /** low-res placeholder for blur (optional) */
  blurDataURL?: string;
}

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
  const [ratio, setRatio] = useState(1);
  const [rows, setRows] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const safeAlt = sanitizeCaption(alt ?? caption ?? id);

  // Reset when src changes
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
      const naturalWidth = preloadImg.naturalWidth;
      const naturalHeight = preloadImg.naturalHeight;
      const r = naturalWidth / naturalHeight;
      
      setRatio(r);
      setDimensions({ width: naturalWidth, height: naturalHeight });

      // Compute how many rows to span
      let span = 3;
      switch (size) {
        case 'small':
          span = r > 1.2 ? 2 : r < 0.8 ? 3 : 2;
          break;
        case 'medium':
          span = r > 1.5 ? 2 : r < 0.7 ? 4 : 3;
          break;
        case 'large':
          span = r > 1.5 ? 3 : r < 0.7 ? 5 : 4;
          break;
        case 'wide':
          span = 2;
          break;
        case 'tall':
          span = r < 0.8 ? 6 : 5;
          break;
      }
      setRows(span);

      if (cardRef.current) {
        cardRef.current.style.gridRowEnd = `span ${span}`;
      }
    };

    preloadImg.onerror = () => {
      console.warn(`Pre-load failed for: ${src}`);
      setError(true);
    };

    preloadImg.src = src;
  }, [src, size]);

  // Handle Next.js Image load event
  const handleImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
    },
    []
  );

  const handleImageError = useCallback(() => {
    console.warn(`Next.js Image load failed: ${src}`);
    setError(true);
    setLoaded(true);
  }, [src]);

  // Dynamic aspect ratio class
  const getAspectClass = () => {
    if (ratio > 1.7) return 'aspect-video';
    if (ratio < 0.6) return 'aspect-9-16';
    if (ratio > 1.4) return 'aspect-4-3';
    if (ratio < 0.7) return 'aspect-3-4';
    if (ratio > 1.1) return 'aspect-5-4';
    if (ratio < 0.9) return 'aspect-4-5';
    return 'aspect-square';
  };

  // Classes
  const sizeClass = `image-card-${size}`;
  const aspectClass = getAspectClass();

  const classes = [
    'image-card',
    sizeClass,
    aspectClass,
    priority && 'priority',
    loaded && 'loaded',
    isHovered && 'hovered',
  ]
    .filter(Boolean)
    .join(' ');

  // Generate blur placeholder if not provided
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;
    
    // Generate a simple gradient blur placeholder
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, 10, 10);
      gradient.addColorStop(0, '#f3f4f6');
      gradient.addColorStop(1, '#e5e7eb');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 10, 10);
      return canvas.toDataURL();
    }
    return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R/Huf/Z';
  };

  // Sizes prop for responsive images
  const getSizes = () => {
    if (size === 'large' || size === 'wide') {
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw';
    }
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  };

  return (
    <>
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`View image: ${safeAlt}`}
        className={classes}
        style={{
          '--aspect-ratio': ratio,
          '--grid-rows': rows,
        } as React.CSSProperties}
        onDoubleClick={openLB}
        onKeyDown={onKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {!error && dimensions.width > 0 ? (
          <Image
            ref={imageRef}
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
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
            }}
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