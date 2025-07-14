// src/components/PDFGallery/PDFViewer.tsx
'use client';

import React from 'react';
import {
  Worker,
  Viewer,
  SpecialZoomLevel,
  type RenderViewerProps,
} from '@react-pdf-viewer/core';
import {
  defaultLayoutPlugin,
} from '@react-pdf-viewer/default-layout';
// Be sure to import the styles:
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import packageJson from '@/../package.json'; 

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

  // PDF.js worker URL; pin to a version compatible with @react-pdf-viewer
  const pdfjsVersion = packageJson.dependencies['pdfjs-dist'];  
  const workerUrl = `https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`;

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
