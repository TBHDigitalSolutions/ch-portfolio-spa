// src/components/ImageGrid/Lightbox.tsx - Production Ready with Next.js Image
'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';

export interface LightboxProps {
  isOpen: boolean;
  src: string;
  alt?: string;
  caption?: string;
  onClose: () => void;
}

// Development logging utility
const isDev = process.env.NODE_ENV === 'development';
const debugLog = isDev ? console.log : () => {};

export default function Lightbox({
  isOpen,
  src,
  alt,
  caption,
  onClose,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 800, height: 600 });

  // Close handler
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Preload image to get dimensions for Next.js Image component
  useEffect(() => {
    if (!src) return;

    const preloadImg = new window.Image();
    preloadImg.onload = () => {
      setImageDimensions({
        width: preloadImg.naturalWidth,
        height: preloadImg.naturalHeight,
      });
      debugLog('Lightbox: Image dimensions loaded', {
        width: preloadImg.naturalWidth,
        height: preloadImg.naturalHeight,
        src
      });
    };
    preloadImg.onerror = () => {
      debugLog('Lightbox: Failed to preload image', src);
    };
    preloadImg.src = src;
  }, [src]);

  // Manage mount state and ESC key listener
  useEffect(() => {
    setMounted(true);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      debugLog('Lightbox: Opened', { src, alt });
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, src, alt]);

  // Reset loading flag when image source changes
  useEffect(() => {
    setImageLoaded(false);
  }, [src]);

  // Handle image load success
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
    debugLog('Lightbox: Image loaded successfully', src);
  }, [src]);

  // Handle image load error
  const handleImageError = useCallback(() => {
    setImageLoaded(true); // Still set to true to hide loading spinner
    debugLog('Lightbox: Image failed to load', src);
  }, [src]);

  // Don't render on server or when closed
  if (!mounted || !isOpen) {
    return null;
  }

  return (
    <div
      className="lightbox-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-image"
      aria-describedby={caption ? 'lightbox-caption' : undefined}
    >
      <div className="lightbox-backdrop" />

      <div
        className="lightbox-content"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="lightbox-close"
          aria-label="Close image viewer"
          type="button"
          autoFocus
        >
          <span className="lightbox-close-icon">×</span>
        </button>

        <div className="lightbox-image-container">
          {!imageLoaded && (
            <div className="lightbox-loading">
              <div className="loading-spinner large" />
            </div>
          )}
          <Image
            id="lightbox-image"
            src={src}
            alt={alt || caption || 'Lightbox image'}
            width={imageDimensions.width}
            height={imageDimensions.height}
            className={`lightbox-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            draggable={false}
            unoptimized={true} // For external URLs or if optimization causes issues
            priority={true} // Since it's user-triggered content
            quality={90} // High quality for lightbox viewing
            sizes="(max-width: 768px) 95vw, (max-width: 1200px) 90vw, 1200px"
            style={{
              width: '100%',
              height: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        {caption && (
          <div id="lightbox-caption" className="lightbox-caption">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}