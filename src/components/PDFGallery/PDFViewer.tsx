// src/components/PDFGallery/PDFViewer.tsx - Production ready with only valid props
'use client';

import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

interface PDFViewerProps {
  url: string;
  title?: string;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: (error: string) => void;
}
 
export default function PDFViewer({
  url,
  title: _title,
  onLoadStart: _onLoadStart,
  onLoadComplete,
  onError: _onError,
}: PDFViewerProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const handleDocumentLoad = () => {
    onLoadComplete?.();
  };

  return (
    <div style={{ height: '100%', position: 'relative' }}>
     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={url}
          plugins={[defaultLayoutPluginInstance]}
          theme="light"
          defaultScale={SpecialZoomLevel.PageFit}
          onDocumentLoad={handleDocumentLoad}
        />
      </Worker>
    </div>
  );
}

// Also export named export for backwards compatibility
export { PDFViewer };