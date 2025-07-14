// src/components/VideoGrid/VideoPlayer.tsx
'use client';

import React, { useRef, useState, useEffect, KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './videoplayer.css'; // you'll need to adapt styles from your shared-ui

interface VideoPlayerProps {
  /** URL of the video file or embed page */
  src: string;
  /** Poster image shown before playback */
  poster?: string;
  /** Accessible alt text */
  alt?: string;
  /** Should it autoplay when opened? */
  autoPlay?: boolean;
  /** Should it loop? */
  loop?: boolean;
  /** Should it start muted? */
  muted?: boolean;
  /** If true, wraps in an aspect-ratio box */
  responsive?: boolean;
  /** The CSS aspect-ratio (e.g. "16/9") */
  aspectRatio?: string;
  /** Extra wrapper classes */
  className?: string;
}

export default function VideoPlayer({
  src,
  poster,
  alt = 'Video',
  autoPlay = false,
  loop = false,
  muted = false,
  responsive = true,
  aspectRatio = '16/9',
  className = '',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If the src doesn’t end in .mp4/.webm/.mov, treat as embed
  const isEmbed = !/\.(mp4|webm|mov)$/i.test(src);

  // Handlers
  const toggleModal = () => setModalOpen((v) => !v);
  const onError = () => setHasError(true);

  // Close modal on Escape
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', onKey as any);
    return () => document.removeEventListener('keydown', onKey as any);
  }, [modalOpen]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = modalOpen ? 'hidden' : '';
  }, [modalOpen]);

  if (hasError || !src) {
    return (
      <div className="video-player-error">
        <p>Unable to load video.</p>
      </div>
    );
  }

  // The in-place player (click to open modal if native video)
  const PlayerElement = (
    <motion.div
      className={clsx('video-player-wrapper', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onClick={!isEmbed ? toggleModal : undefined}
      tabIndex={!isEmbed ? 0 : undefined}
      role={!isEmbed ? 'button' : undefined}
      aria-label={!isEmbed ? 'Open full-screen video' : undefined}
      onKeyDown={(e) => {
        if (!isEmbed && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          toggleModal();
        }
      }}
    >
      <div
        className={clsx('video-player-container', {
          'video-player-responsive': responsive,
        })}
        style={responsive ? { aspectRatio } : undefined}
      >
        {isEmbed ? (
          <iframe
            src={src}
            title={alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="video-player-iframe"
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline
            aria-label={alt}
            className="video-player-element"
            onError={onError}
          >
            <source src={src} />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </motion.div>
  );

  // The full-screen modal for native video
  const Modal = () =>
    createPortal(
      <div
        className="video-modal-backdrop"
        onClick={toggleModal}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="video-modal-content"
          style={{ aspectRatio }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="video-modal-close"
            onClick={toggleModal}
            aria-label="Close video"
          >
            &times;
          </button>
          <video
            src={src}
            poster={poster}
            controls
            autoPlay
            loop={loop}
            muted={muted}
            playsInline
            className="video-modal-player"
            onError={onError}
          />
        </div>
      </div>,
      document.body
    );

  return (
    <>
      {PlayerElement}
      {!isEmbed && modalOpen && <Modal />}
    </>
  );
}
