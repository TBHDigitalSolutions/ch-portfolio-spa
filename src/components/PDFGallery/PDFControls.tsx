// src/components/PDFGallery/PDFControls.tsx - Enhanced Version
"use client";

import React, { memo } from 'react'

interface PDFControlsProps {
  url: string
  currentPage: number
  totalPages: number
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onNextPage: () => void
  onPrevPage: () => void
  onFullscreen: () => void
  disabled?: boolean
}

const PDFControls = memo<PDFControlsProps>(function PDFControls({
  url,
  currentPage,
  totalPages,
  zoom,
  onZoomIn,
  onZoomOut,
  onNextPage,
  onPrevPage,
  onFullscreen,
  disabled = false
}) {
  const zoomPercentage = Math.round(zoom * 100)

  return (
    <div className="pdf-controls-container">
      {/* Navigation Controls */}
      <div className="pdf-controls-section">
        <button
          onClick={onPrevPage}
          disabled={disabled || currentPage <= 1}
          aria-label="Previous page"
          className="pdf-control-button"
        >
          <svg className="pdf-control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <span className="pdf-page-info">
          {currentPage} / {totalPages}
        </span>
        
        <button
          onClick={onNextPage}
          disabled={disabled || currentPage >= totalPages}
          aria-label="Next page"
          className="pdf-control-button"
        >
          <svg className="pdf-control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="pdf-controls-section">
        <button
          onClick={onZoomOut}
          disabled={disabled || zoom <= 0.5}
          aria-label="Zoom out"
          className="pdf-control-button"
        >
          <svg className="pdf-control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </button>
        
        <span className="pdf-zoom-info">{zoomPercentage}%</span>
        
        <button
          onClick={onZoomIn}
          disabled={disabled || zoom >= 3}
          aria-label="Zoom in"
          className="pdf-control-button"
        >
          <svg className="pdf-control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </button>
      </div>

      {/* Action Controls */}
      <div className="pdf-controls-section">
        <a
          href={url}
          download
          aria-label="Download PDF"
          className="pdf-control-button pdf-download-button"
        >
          <svg className="pdf-control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
        
        <button
          onClick={onFullscreen}
          disabled={disabled}
          aria-label="Fullscreen"
          className="pdf-control-button"
        >
          <svg className="pdf-control-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
          </svg>
        </button>
      </div>
    </div>
  )
})

export default PDFControls
