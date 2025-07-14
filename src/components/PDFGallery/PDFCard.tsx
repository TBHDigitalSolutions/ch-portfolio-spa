"use client";

import React, { memo, useCallback } from 'react';
import PDFThumbnail from './PDFThumbnail';
import { PDFDocument } from './index';

interface PDFCardProps {
  document: PDFDocument;
  isActive: boolean;
  onSelect: () => void;
  index?: number;
  thumbnail: string;
  title: string;
}

const PDFCard = memo<PDFCardProps>(function PDFCard({
  document,
  isActive,
  onSelect,
  index = 0,
  thumbnail,
  title
}) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect();
    }
  }, [onSelect]);

  return (
    <div
      className={`pdf-card ${isActive ? 'pdf-card-active' : 'pdf-card-hover'}`}
      style={{ '--item-index': index } as React.CSSProperties}
    >
      <button
        type="button"
        onClick={onSelect}
        onKeyDown={handleKeyDown}
        className="pdf-card-button"
        aria-pressed={isActive}
        aria-label={`View PDF: ${title}`}
      >
        {/* Thumbnail */}
        <div className="pdf-thumbnail-container">
          <PDFThumbnail
            url={document.url}
            thumbnail={thumbnail}
            alt={title}
          />

          {/* PDF Type Indicator */}
          <div className="pdf-type-indicator">PDF</div>

          {/* Hover Overlay */}
          <div className="pdf-hover-overlay">
            <div className="pdf-overlay-content">
              <div className="pdf-view-icon">👁️</div>
              <span className="pdf-overlay-text">View Document</span>
            </div>
          </div>

          {/* Active Indicator */}
          {isActive && (
            <div className="pdf-active-indicator">
              <div className="pdf-active-badge">✓</div>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="pdf-card-content">
          <h4 className="pdf-card-title">{title}</h4>
          {document.description && (
            <p className="pdf-card-description">
              {document.description.slice(0, 80)}...
            </p>
          )}
          <div className="pdf-card-meta">
            {document.pages && (
              <span className="pdf-meta-pages">
                {document.pages} page{document.pages !== 1 ? 's' : ''}
              </span>
            )}
            {document.fileSize && (
              <span className="pdf-meta-size">{document.fileSize}</span>
            )}
            {document.category && (
              <span className="pdf-meta-category">{document.category}</span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
});

export default PDFCard;
