// src/components/ImageGrid/Lightbox.tsx
"use client";

import React, { useEffect, useState, useCallback } from "react";

export interface LightboxProps {
  isOpen: boolean;
  src: string;
  alt?: string;
  caption?: string;
  onClose: () => void;
}

export default function Lightbox({
  isOpen,
  src,
  alt,
  caption,
  onClose,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Memoize the close function to prevent unnecessary re-renders
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    setMounted(true);
    
    // Handle ESC key to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
      // Focus management
      const activeElement = document.activeElement as HTMLElement;
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "unset";
        // Restore focus when closing
        if (activeElement) {
          activeElement.focus();
        }
      };
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleClose]);

  // Reset image loaded state when src changes
  useEffect(() => {
    setImageLoaded(false);
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
      aria-describedby={caption ? "lightbox-caption" : undefined}
    >
      {/* Backdrop */}
      <div className="lightbox-backdrop" />
      
      {/* Modal Content */}
      <div 
        className="lightbox-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - FIXED */}
        <button
          onClick={handleClose}
          className="lightbox-close"
          aria-label="Close image viewer"
          type="button"
          autoFocus
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(8px)'
          }}
        >
          {/* Simple X character - more reliable than SVG */}
          <span style={{
            fontSize: '24px',
            fontWeight: 'bold',
            lineHeight: 1,
            color: 'white'
          }}>
            ×
          </span>
        </button>

        {/* Alternative: Fixed SVG approach */}
        {/* 
        <button
          onClick={handleClose}
          className="lightbox-close"
          aria-label="Close image viewer"
          type="button"
          autoFocus
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none"
            className="close-icon"
            aria-hidden="true"
            style={{ color: 'white' }}
          >
            <path 
              d="M18 6L6 18M6 6l12 12" 
              stroke="white" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
        */}

        {/* Image Container */}
        <div className="lightbox-image-container">
          {!imageLoaded && (
            <div className="lightbox-loading">
              <div className="loading-spinner large"></div>
            </div>
          )}
          <img
            id="lightbox-image"
            src={src}
            alt={alt}
            className={`lightbox-image ${imageLoaded ? 'loaded' : ''}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error('Failed to load lightbox image:', src);
              setImageLoaded(true);
            }}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* Caption */}
        {caption && (
          <div id="lightbox-caption" className="lightbox-caption">
            {caption}
          </div>
        )}
      </div>
    </div>
  );
}