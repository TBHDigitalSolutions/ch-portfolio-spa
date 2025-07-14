// src/components/MediaShowcase/index.tsx
'use client';

import React, { useState, useMemo } from 'react';
import MediaGrid, { MediaItem } from './MediaGrid';
import VideoPlayer from '../VideoGrid/VideoPlayer';
import { SectionRationale, SectionRationaleProps } from '@/components/SectionRationale';
import mediaQuicklookRationale from '@/data/content/mediaQuicklookRationale.json';
import { sanitizeCaption } from '@/lib/utils/formatCaption';

import './mediashowcase.css';
import './mediagrid.css';
import '../VideoGrid/videoplayer.css';

export type MediaShowcaseData = {
  audio?: { id: string; src: string; title: string; thumbnail?: string }[];
  video?: { id: string; src: string; title: string; thumbnail?: string }[];
};

interface MediaShowcaseProps {
  data?: MediaShowcaseData;
  variant?: 'showcase' | 'grid-only';
}

export default function MediaShowcase({
  data,
  variant = 'showcase',
}: MediaShowcaseProps) {
  const audioItems = data?.audio ?? [];
  const videoItems = data?.video ?? [];
  const items: MediaItem[] = useMemo(
    () => [
      ...videoItems.map(v => ({ ...v, type: 'video' as const })),
      ...audioItems.map(a => ({ ...a, type: 'audio' as const })),
    ],
    [audioItems, videoItems]
  );

  if (items.length === 0) {
    return (
      <section className="media-showcase-empty">
        <div className="empty-state">
          <div className="empty-icon">🎬</div>
          <h3>No media available</h3>
          <p>Add some videos or audio files to get started.</p>
        </div>
      </section>
    );
  }

  const [selected, setSelected] = useState<MediaItem>(items[0]);

  const handleSelect = (item: MediaItem) => {
    if (item.id !== selected.id) {
      setSelected(item);
    }
  };

  if (variant === 'grid-only') {
    return (
      <section className="media-showcase-grid-only">
        <MediaGrid
          items={items}
          selectedId={selected.id}
          onSelect={handleSelect}
          variant="grid-only"
        />
      </section>
    );
  }

  return (
    <section className="media-showcase">
      {/* Rationale */}
      <SectionRationale {...(mediaQuicklookRationale as SectionRationaleProps)} />

      <div className="media-showcase-content">
        {/* Sidebar */}
        <aside className="media-showcase-sidebar">
          <h3 className="sidebar-title">
            {videoItems.length && audioItems.length
              ? `Media Library (${videoItems.length} video${videoItems.length > 1 ? 's' : ''}, ${audioItems.length} audio)`
              : videoItems.length
              ? `Video Library (${videoItems.length})`
              : `Audio Library (${audioItems.length})`}
          </h3>
          <MediaGrid
            items={items}
            selectedId={selected.id}
            onSelect={handleSelect}
            variant="sidebar"
          />
        </aside>

        {/* Player */}
        <main className="media-showcase-player">
          <div className="player-header">
            <h3 className="player-title">{sanitizeCaption(selected.title)}</h3>
          </div>
          <div className="player-container">
            <VideoPlayer
              src={selected.src}
              poster={selected.thumbnail}
              alt={selected.title}
              autoPlay={false}
              loop={false}
              muted={false}
            />
          </div>
        </main>
      </div>
    </section>
  );
}
