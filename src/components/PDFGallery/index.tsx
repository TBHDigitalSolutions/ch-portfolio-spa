// src/components/PDFGallery/index.tsx - Fixed useMemo dependency
"use client";

import React, { useState, useMemo, useCallback } from 'react';
import PDFViewer from './PDFViewer';
import PDFCard from './PDFCard';
import { SectionRationale, SectionRationaleProps } from '@/components/SectionRationale';
import './PDFgallery.css';

export interface PDFDocument {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  description?: string;
  category?: string;
  pages?: number;
  fileSize?: string;
  lastModified?: string;
}

export interface PDFGalleryProps {
  documents?: PDFDocument[];
  rationaleData?: SectionRationaleProps;
  className?: string;
}

export default function PDFGallery({
  documents = [],
  rationaleData,
  className = '',
}: PDFGalleryProps) {
  const [activeDocIndex, setActiveDocIndex] = useState(0);

  // ✅ FIXED: Include activeDocIndex in the dependency array
  const activeDoc = useMemo(() => {
    return documents[activeDocIndex] || documents[0] || null;
  }, [documents, activeDocIndex]);

  const handleDocumentSelect = useCallback((index: number) => {
    if (index >= 0 && index < documents.length) {
      setActiveDocIndex(index);
    }
  }, [documents.length]);

  // Reset active document when documents change
  React.useEffect(() => {
    if (documents.length > 0 && activeDocIndex >= documents.length) {
      setActiveDocIndex(0);
    }
  }, [documents.length, activeDocIndex]);

  if (!documents.length) {
    return (
      <div className="pdf-gallery-empty">
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>No documents available</h3>
          <p>PDF documents will appear here when added.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`pdf-gallery-container ${className}`}>
      {/* Rationale Section */}
      {rationaleData && (
        <div className="pdf-gallery-rationale">
          <SectionRationale {...rationaleData} />
        </div>
      )}

      <div className="pdf-gallery-content">
        {/* Left Panel - PDF Viewer */}
        <div className="pdf-gallery-left">
          {activeDoc && (
            <>
              {/* Document Header */}
              <div className="pdf-document-header">
                <h2 className="pdf-header-title">{activeDoc.title}</h2>
                
                <div className="pdf-header-meta">
                  <span className="pdf-document-type">PDF Document</span>
                  {activeDoc.pages && (
                    <span className="pdf-page-count">
                      {activeDoc.pages} page{activeDoc.pages !== 1 ? 's' : ''}
                    </span>
                  )}
                  {activeDoc.fileSize && (
                    <span className="pdf-file-size">{activeDoc.fileSize}</span>
                  )}
                  {activeDoc.category && (
                    <span className="pdf-category">{activeDoc.category}</span>
                  )}
                </div>

                {activeDoc.lastModified && (
                  <p className="pdf-header-date">
                    Last modified: {new Date(activeDoc.lastModified).toLocaleDateString()}
                  </p>
                )}

                {activeDoc.description && (
                  <p className="pdf-header-desc">{activeDoc.description}</p>
                )}
              </div>

              {/* PDF Viewer */}
              <div className="pdf-viewer-wrapper">
                <PDFViewer
                  url={activeDoc.url}
                  title={activeDoc.title}
                />
              </div>
            </>
          )}
        </div>

        {/* Right Panel - Document Cards */}
        <div className="pdf-gallery-right">
          <div className="pdf-gallery-sidebar">
            <h3 className="pdf-sidebar-title">
              Documents ({documents.length})
            </h3>

            <div className="pdf-cards-container">
              {documents.map((doc, index) => (
                <PDFCard
                  key={doc.id}
                  document={doc}
                  isActive={index === activeDocIndex}
                  onSelect={() => handleDocumentSelect(index)}
                  index={index}
                  thumbnail={doc.thumbnail}
                  title={doc.title}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}