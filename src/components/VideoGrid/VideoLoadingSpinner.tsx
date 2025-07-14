// src/components/VideoGrid/VideoLoadingSpinner.tsx
'use client';

import React from 'react';

interface SpinnerProps {
  title: string;
}

export default function VideoLoadingSpinner({ title }: SpinnerProps) {
  return (
    <div className="video-loading">
      <div className="loading-spinner large" />
      <p>Loading video…</p>
      <small>{title}</small>
    </div>
  );
}
