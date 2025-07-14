'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import PDFViewer from './PDFViewer';
import PDFControls from './PDFControls';
import PDFCard from './PDFCard';
import { clampText } from '@/lib/utils/clamp';
import { SectionRationale, SectionRationaleProps } from '@/components/SectionRationale';
import documentDesignRationale from '@/data/content/documentDesignRationale.json';
import documents from '@/data/media/pdfGallery.json';
import './PDFgallery.css';

export interface PDFDocument {
  id: string;
  url: string;
  title: string;
  thumbnail?: string;
  description?: string;
  pages?: number;
  fileSize?: string;
  category?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PDFGalleryProps {
  /** Array of documents to display; falls back to JSON import if omitted */
  documents?: PDFDocument[];
  /** Additional container class names */
  className?: string;
  /** Optional override for the rationale block */
  rationaleData?: SectionRationaleProps;
}

const PDFGallery: React.FC<PDFGalleryProps> = ({
  documents: customDocuments,
  className = '',
  rationaleData,
}) => {
  // Use passed documents or default JSON
  const docs = useMemo<PDFDocument[]>(
    () => customDocuments ?? documents,
    [customDocuments]
  );

  // Choose rationale data
  const rationale: SectionRationaleProps =
    rationaleData ?? (documentDesignRationale as SectionRationaleProps);

  // Component state
  const [selectedId, setSelectedId] = useState<string>(docs[0]?.id || '');
  const [page, setPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Active document
  const activeDoc = useMemo(
    () => docs.find((d) => d.id === selectedId) || docs[0],
    [docs, selectedId]
  );

  // Format creation date
  const formattedDate = useMemo(() => {
    const created = activeDoc?.createdAt;
    if (!created) return '';
    try {
      return new Date(created).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return created;
    }
  }, [activeDoc?.createdAt]);

  // URL for viewer (with page & zoom)
  const viewerUrl = useMemo(() => {
    if (!activeDoc) return '';
    return `${activeDoc.url}#page=${page}&zoom=${Math.round(zoom * 100)}`;
  }, [activeDoc?.url, page, zoom]);

  // Selection handler
  const onSelect = useCallback((id: string) => {
    setSelectedId(id);
    setPage(1);
    setZoom(1);
    setIsLoading(true);
  }, []);

  // Page controls
  const onNextPage = useCallback(() => {
    if (activeDoc && page < (activeDoc.pages ?? Infinity)) {
      setPage((p) => p + 1);
    }
  }, [activeDoc, page]);

  const onPrevPage = useCallback(() => {
    if (page > 1) {
      setPage((p) => p - 1);
    }
  }, [page]);

  // Zoom controls
  const onZoomIn = useCallback(() => {
    setZoom((z) => Math.min(z + 0.25, 3));
  }, []);

  const onZoomOut = useCallback(() => {
    setZoom((z) => Math.max(z - 0.25, 0.5));
  }, []);

  // Fullscreen
  const onFullscreen = useCallback(() => {
    containerRef.current?.requestFullscreen().catch(() => {});
  }, []);

  // Reset page/zoom on selection change
  useEffect(() => {
    if (selectedId) {
      setPage(1);
      setZoom(1);
    }
  }, [selectedId]);

  // Empty/fallback states
  if (!docs.length) {
    return (
      <div className="pdf-gallery-empty">
        <div className="empty-state">
          <div className="empty-icon">📄</div>
          <h3>No documents available</h3>
          <p>Add some PDF documents to get started.</p>
        </div>
      </div>
    );
  }

  if (!activeDoc) {
    return (
      <div className="pdf-gallery-empty">
        <div className="empty-state">
          <div className="empty-icon">⚠️</div>
          <h3>Document not found</h3>
          <p>The selected document could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <section className={`pdf-gallery-container ${className}`.trim()}>
      {/* Rationale */}
      <SectionRationale {...rationale} />

      <div className="pdf-gallery-content">
        {/* Viewer Section */}
        <main className="pdf-gallery-left">
          <header className="pdf-document-header">
            <h3 className="pdf-header-title">{activeDoc.title}</h3>
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
            {formattedDate && (
              <p className="pdf-header-date">{formattedDate}</p>
            )}
            {activeDoc.description && (
              <p className="pdf-header-desc">
                {clampText(activeDoc.description, 150)}
              </p>
            )}
          </header>

          <div
            className={`pdf-viewer-wrapper ${isLoading ? 'loading' : ''}`.trim()}
            ref={containerRef}
          >
            <PDFViewer
              url={viewerUrl}
              onLoadStart={() => setIsLoading(true)}
              onLoadComplete={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </div>

          <PDFControls
            url={activeDoc.url}
            currentPage={page}
            totalPages={activeDoc.pages ?? 1}
            zoom={zoom}
            onPrevPage={onPrevPage}
            onNextPage={onNextPage}
            onZoomIn={onZoomIn}
            onZoomOut={onZoomOut}
            onFullscreen={onFullscreen}
            disabled={isLoading}
          />
        </main>

        {/* Thumbnails Section */}
        <aside className="pdf-gallery-right">
          <h3 className="pdf-thumbnails-title">Documents ({docs.length})</h3>
          <div className="pdf-thumbnails-grid">
            {docs.map((doc, idx) => (
              <PDFCard
                key={doc.id}
                document={doc}
                isActive={doc.id === selectedId}
                onSelect={() => onSelect(doc.id)}
                index={idx}
                thumbnail={doc.thumbnail}
                title={clampText(doc.title, 60)}
              />
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default PDFGallery;
