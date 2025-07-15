// src/components/VideoGrid/index.tsx
'use client';

import React, { useState } from 'react';
import VideoGridList from './VideoGrid';
import VideoPlayer from './VideoPlayer';
import { sanitizeCaption } from '@/lib/utils/formatCaption';
import { SectionRationaleGrid, SectionRationaleGridProps } from '@/components/SectionRationale';
import videoGridRationale from '@/data/content/videoGridRationale.json';
import './videogrid.css';

// ✅ FIXED: Make category type more flexible to match JSON data
export interface VideoItem {
  id: string;
  src?: string;
  url?: string;
  title: string;
  thumbnail: string;
  category?: string; // ✅ CHANGED: from 'Corporate' | 'Creative' | 'Comedy' to string
}

export interface VideoGridData {
  corporate: VideoItem[];
  creative: VideoItem[];
}

interface VideoGridProps {
  data: VideoGridData;
  /** Optional override for rationale */
  rationaleData?: SectionRationaleGridProps;
}

export default function VideoGrid({
  data,
  rationaleData,
}: VideoGridProps) {
  const rationale: SectionRationaleGridProps =
    rationaleData ?? (videoGridRationale as SectionRationaleGridProps);

  const [corporateSelected, setCorporateSelected] = useState<VideoItem | null>(
    data.corporate[0] || null
  );
  const [creativeSelected, setCreativeSelected] = useState<VideoItem | null>(
    data.creative[0] || null
  );

  return (
    <section className="video-grid-showcase">
      {/* Rationale block */}
      <SectionRationaleGrid {...rationale} />

      {/* Corporate Section */}
      <div className="video-section corporate-section">
        <h3 className="section-title">Corporate Videos</h3>
        <div className="video-section-content">
          <aside className="video-grid-sidebar">
            <VideoGridList
              items={data.corporate}
              selectedId={corporateSelected?.id}
              onSelect={setCorporateSelected}
              variant="sidebar"
            />
          </aside>

          <main className="video-player-area">
            {corporateSelected && (
              <>
                <div className="player-header">
                  <h4 className="player-title">
                    {sanitizeCaption(corporateSelected.title)}
                  </h4>
                </div>
                <VideoPlayer
                  src={corporateSelected.src ?? corporateSelected.url!}
                  title={corporateSelected.title}
                  className="video-player-main"
                />
              </>
            )}
          </main>
        </div>
      </div>

      {/* Creative Section */}
      <div className="video-section creative-section">
        <h3 className="section-title">Creative Videos</h3>
        <div className="video-section-content creative-layout">
          <aside className="video-grid-sidebar">
            <VideoGridList
              items={data.creative}
              selectedId={creativeSelected?.id}
              onSelect={setCreativeSelected}
              variant="sidebar"
            />
          </aside>

          <main className="video-player-area">
            {creativeSelected && (
              <>
                <div className="player-header">
                  <h4 className="player-title">
                    {sanitizeCaption(creativeSelected.title)}
                  </h4>
                </div>
                <VideoPlayer
                  src={creativeSelected.src ?? creativeSelected.url!}
                  title={creativeSelected.title}
                  className="video-player-main"
                />
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}