// src/components/VideoGrid/VideoPlayer.tsx
'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import './videoplayer.css';

interface VideoPlayerProps {
  /** URL of the video file or embed page */
  src: string;
  /** Title of the video for accessibility and display */
  title?: string;
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
  /** Media type for proper handling */
  type?: 'video' | 'audio';
}

export default function VideoPlayer({
  src,
  title,
  poster,
  alt = 'Video',
  autoPlay = false,
  loop = false,
  muted = false,
  responsive = true,
  aspectRatio = '16/9',
  className = '',
  type = 'video',
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side to prevent hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Determine if this is an embed (YouTube, Vimeo, etc.)
  const isEmbed = !/\.(mp4|webm|mov|avi|mkv)$/i.test(src);

  // Generate accessible alt text using title fallback
  const accessibleAlt = alt || title || `${type === 'video' ? 'Video' : 'Audio'} player`;

  // Handlers
  const toggleModal = useCallback(() => {
    setModalOpen(prev => !prev);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoading(false);
  }, []);

  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    setHasError(false);
  }, []);

  const handleCanPlay = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!modalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          closeModal();
          break;
        case 'Tab':
          // Trap focus within modal
          if (modalRef.current && closeButtonRef.current) {
            e.preventDefault();
            closeButtonRef.current.focus();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Focus the close button when modal opens
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalOpen, closeModal]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    if (modalOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [modalOpen]);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className={clsx('video-player-wrapper', className)}>
        <div className="video-player-container video-player-responsive">
          <div className="video-loading">
            <div className="loading-spinner" />
            <p>Loading video player...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (hasError || !src) {
    return (
      <div className={clsx('video-player-wrapper', 'video-player-error', className)}>
        <div className="video-player-container">
          <div className="error-content">
            <p>Unable to load {type}.</p>
            {title && <small>{title}</small>}
            <button 
              onClick={() => window.location.reload()} 
              className="retry-button"
              type="button"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // The in-place player component
  const PlayerElement = (
    <motion.div
      className={clsx('video-player-wrapper', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      onClick={!isEmbed ? toggleModal : undefined}
      onKeyDown={(e) => {
        if (!isEmbed && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          toggleModal();
        }
      }}
      tabIndex={!isEmbed ? 0 : -1}
      role={!isEmbed ? 'button' : undefined}
      aria-label={!isEmbed ? `Open ${accessibleAlt} in full screen` : undefined}
    >
      <div
        className={clsx('video-player-container', {
          'video-player-responsive': responsive,
          'video-player-loading': isLoading,
        })}
        style={responsive ? { aspectRatio } : undefined}
      >
        {isEmbed ? (
          <iframe
            src={src}
            title={title || accessibleAlt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="video-player-iframe"
            loading="lazy"
            onLoad={handleCanPlay}
            onError={handleError}
          />
        ) : (
          <>
            {/* ✅ FIXED: Use proper createElement syntax without children prop */}
            {type === 'video' ? (
              <video
                ref={videoRef}
                src={src}
                poster={poster}
                controls
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline
                aria-label={accessibleAlt}
                className="video-player-element"
                onError={handleError}
                onLoadStart={handleLoadStart}
                onCanPlay={handleCanPlay}
              >
                <source src={src} />
                <track
                  kind="captions"
                  srcLang="en"
                  label="English"
                  default={false}
                />
                Your browser does not support the video element.
              </video>
            ) : (
              <audio
                ref={videoRef as React.RefObject<HTMLAudioElement>}
                src={src}
                controls
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                aria-label={accessibleAlt}
                className="video-player-element"
                onError={handleError}
                onLoadStart={handleLoadStart}
                onCanPlay={handleCanPlay}
              >
                <source src={src} />
                Your browser does not support the audio element.
              </audio>
            )}
            
            {isLoading && (
              <div className="video-loading">
                <div className="loading-spinner" />
                <p>Loading {type}...</p>
                {title && <small>{title}</small>}
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );

  // Full-screen modal for native video/audio
  const Modal = () => {
    if (isEmbed) return null;

    return createPortal(
      <div
        ref={modalRef}
        className="video-modal-backdrop"
        onClick={closeModal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          className="video-modal-content"
          style={{ aspectRatio: type === 'video' ? aspectRatio : '16/9' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Screen reader content */}
          <h2 id="modal-title" className="sr-only">
            {title || `${type === 'video' ? 'Video' : 'Audio'} Player`}
          </h2>
          <p id="modal-description" className="sr-only">
            Full screen {type} player. Press Escape to close.
          </p>

          <button
            ref={closeButtonRef}
            className="video-modal-close"
            onClick={closeModal}
            aria-label={`Close ${type} player`}
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>

          {/* ✅ FIXED: Use proper JSX syntax instead of createElement with children prop */}
          {type === 'video' ? (
            <video
              src={src}
              poster={poster}
              controls
              autoPlay={true}
              loop={loop}
              muted={muted}
              playsInline
              className="video-modal-player"
              onError={handleError}
            >
              <source src={src} />
              Your browser does not support the video element.
            </video>
          ) : (
            <audio
              src={src}
              controls
              autoPlay={true}
              loop={loop}
              muted={muted}
              className="video-modal-player"
              onError={handleError}
            >
              <source src={src} />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      {PlayerElement}
      {modalOpen && <Modal />}
    </>
  );
}