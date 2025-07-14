'use client';

import React from 'react';
import {
  Worker,
  Viewer,
  SpecialZoomLevel,
} from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
  url: string;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: (error: string) => void;
}

// Use CDN worker, no local pdfjs-dist
const workerUrl = 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

const PDFViewer: React.FC<PDFViewerProps> = ({
  url,
  onLoadStart,
  onLoadComplete,
  onError,
}) => {
  const defaultLayout = defaultLayoutPlugin();

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
};

export default PDFViewer;
