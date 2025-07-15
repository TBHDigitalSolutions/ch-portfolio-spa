// ✅ UPDATED: MediaShowcase with layout and player container enhancements
'use client';

import React, { useState, useMemo } from 'react';
import MediaGrid, { VideoItem } from './MediaGrid';
import VideoPlayer from '../VideoGrid/VideoPlayer';
import Divider from '../Base/SectionDivider/Divider';
import { SectionRationale, SectionRationaleProps } from '@/components/SectionRationale';
import { sanitizeCaption } from '@/lib/utils/formatCaption';
import mediaQuicklookRationale from '@/data/content/mediaQuicklookRationale.json';

import './mediashowcase.css';
import './mediagrid.css';
import '../VideoGrid/videoplayer.css';

export type MediaShowcaseData = {
  videos: VideoItem[];
};

interface MediaShowcaseProps {
  data?: MediaShowcaseData;
  variant?: 'showcase' | 'grid-only';
}

export default function MediaShowcase({
  data,
  variant = 'showcase',
}: MediaShowcaseProps) {
  const videoItems = useMemo(() => data?.videos ?? [], [data?.videos]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(videoItems[0] || null);

  React.useEffect(() => {
    if (videoItems.length > 0 && (!selectedVideo || !videoItems.find(v => v.id === selectedVideo.id))) {
      setSelectedVideo(videoItems[0]);
    }
  }, [videoItems, selectedVideo]);

  const handleVideoSelect = (video: VideoItem) => {
    if (video.id !== selectedVideo?.id) {
      setSelectedVideo(video);
    }
  };

  if (!videoItems.length) {
    return (
      <section className="media-showcase-empty">
        <div className="empty-state">
          <div className="empty-icon">🎬</div>
          <h3>No videos available</h3>
          <p>Add some video files to get started.</p>
        </div>
      </section>
    );
  }

  if (variant === 'grid-only') {
    return (
      <section className="media-showcase-grid-only">
        <MediaGrid
          videos={videoItems}
          selectedId={selectedVideo?.id}
          onSelect={handleVideoSelect}
          variant="grid-only"
        />
      </section>
    );
  }

  return (
    <section className="media-showcase">
      <SectionRationale {...(mediaQuicklookRationale as SectionRationaleProps)} />

      <div className="media-showcase-content">
        <aside className="media-showcase-sidebar">
          <div className="sidebar-heading-group">
            <h3 className="sidebar-title">Video Production Samples</h3>
            <Divider />
          </div>

          <MediaGrid
            videos={videoItems}
            selectedId={selectedVideo?.id}
            onSelect={handleVideoSelect}
            variant="sidebar"
          />
        </aside>

        <main className="media-showcase-main">
          {selectedVideo && (
            <>
              <div className="player-header">
                <h4 className="player-title">{sanitizeCaption(selectedVideo.title)}</h4>
              </div>

              <div className="player-container">
                <div className="video-player-wrapper">
                  <VideoPlayer
                    src={selectedVideo.src}
                    title={selectedVideo.title}
                    poster={selectedVideo.thumbnail}
                    responsive={true}
                    aspectRatio="16/9"
                    className="media-showcase-player"
                  />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </section>
  );
}
