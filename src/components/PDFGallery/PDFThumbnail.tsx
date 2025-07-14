'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface PDFThumbnailProps {
  /** Optional precomputed thumbnail image path */
  thumbnail?: string;
  /** Alt text for accessibility */
  alt: string;
  /** Additional wrapper class names */
  className?: string;
}

export default function PDFThumbnail({
  thumbnail,
  alt,
  className = '',
}: PDFThumbnailProps) {
  // Prefer JSON-provided thumbnail, fallback to static logo
  const src = thumbnail?.trim() || '/images/tbhdigitalsolutions-logo.png';

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Reset load/error state when src changes
  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [src]);

  return (
    <div className={`pdf-thumbnail-wrapper ${className} relative`.trim()}>
      {/* Loading spinner */}
      {!loaded && (
        <div className="pdf-thumbnail-loading">
          <div className="pdf-thumbnail-spinner" />
        </div>
      )}

      {/* Error fallback */}
      {error ? (
        <div className="pdf-thumbnail-fallback">
          <div className="pdf-fallback-icon">📄</div>
          <span className="pdf-fallback-text">PDF</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          className={`pdf-thumbnail-image ${loaded ? 'pdf-thumbnail-loaded' : 'pdf-thumbnail-hidden'}`}
          onLoadingComplete={() => setLoaded(true)}
          onError={() => {
            setError(true);
            setLoaded(true);
          }}
          loading="lazy"
        />
      )}
    </div>
  );
}
