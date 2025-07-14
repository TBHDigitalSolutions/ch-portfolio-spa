// src/components/PDFGallery/PDFViewer.tsx
'use client';

import React from 'react';
import {
  Worker,
  Viewer,
  SpecialZoomLevel,
} from '@react-pdf-viewer/core';
import {
  defaultLayoutPlugin,
} from '@react-pdf-viewer/default-layout';

// Import styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
  url: string;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: (error: string) => void;
}

export default function PDFViewer({
  url,
  onLoadStart,
  onLoadComplete,
  onError,
}: PDFViewerProps) {
  const defaultLayout = defaultLayoutPlugin();

  // Use the matching worker version for @react-pdf-viewer
  // This matches the API version "3.11.174"
  const workerUrl = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Worker workerUrl={workerUrl}>
        <Viewer
          fileUrl={url}
          plugins={[defaultLayout]}
          theme="light"
          onDocumentLoadStart={() => onLoadStart?.()}
          onDocumentLoad={() => onLoadComplete?.()}
          onDocumentLoadFailed={(err) => onError?.(String(err))}
          defaultScale={SpecialZoomLevel.PageFit}
        />
      </Worker>
    </div>
  );
}