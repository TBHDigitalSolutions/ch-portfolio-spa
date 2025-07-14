// src/components/VideoGrid/VideoJSPlayer.tsx - Fixed SSR Error
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface VideoJSPlayerProps {
  src?: string;      // Local video file
  url?: string;      // External video URL (YouTube, etc.)
  title: string;
  onReady?: () => void;
  onError?: (error: string) => void;
}

export default function VideoJSPlayer({
  src,
  url,
  title,
  onReady,
  onError
}: VideoJSPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [videoJsLoaded, setVideoJsLoaded] = useState(false);

  const videoSource = src || url;
  const isLocal = !!src;
  const isYouTube = url?.includes("youtube.com") || url?.includes("youtu.be");

  // Clean YouTube URLs
  const cleanYouTubeUrl = useCallback((rawUrl: string) => {
    if (!rawUrl.includes("youtube")) return rawUrl;
    
    // Convert various YouTube formats to embed format
    const videoId = rawUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    
    if (!videoId) return rawUrl;
    
    // Extract start time if present
    const timeMatch = rawUrl.match(/[?&]t=(\d+)/);
    const startTime = timeMatch ? `?start=${timeMatch[1]}` : "";
    
    return `https://www.youtube.com/watch?v=${videoId}${startTime}`;
  }, []);

  const handleError = useCallback((error: any) => {
    const errorMsg = `Failed to load video: ${title}`;
    console.error(`❌ VideoJS Error:`, error);
    setIsLoading(false);
    setHasError(true);
    setErrorMessage(errorMsg);
    onError?.(errorMsg);
  }, [title, onError]);

  const handleReady = useCallback(() => {
    console.log(`✅ VideoJS Ready: ${title}`);
    setIsLoading(false);
    setHasError(false);
    onReady?.();
  }, [title, onReady]);

  // ✅ FIXED: Dynamic import Video.js only on client-side
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadVideoJS = async () => {
      try {
        // Dynamic import Video.js and its dependencies
        const [{ default: videojs }] = await Promise.all([
          import('video.js'),
          import('video.js/dist/video-js.css'),
          import('videojs-youtube').catch(() => {
            console.warn('videojs-youtube plugin not available');
            return null;
          })
        ]);

        // Make videojs globally available for use
        (window as any).videojs = videojs;
        setVideoJsLoaded(true);
        setIsMounted(true);

        console.log('✅ Video.js loaded successfully');
      } catch (error) {
        console.error('❌ Error loading Video.js:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    loadVideoJS();

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    if (!isMounted || !videoJsLoaded || !videoRef.current || !videoSource) return;

    const videojs = (window as any).videojs;
    if (!videojs) {
      console.error('Video.js not available');
      setHasError(true);
      return;
    }

    console.log(`🎬 VideoJS Loading: ${title} - ${videoSource}`);
    setIsLoading(true);
    setHasError(false);

    // Clean the URL if it's YouTube
    const cleanedUrl = isYouTube ? cleanYouTubeUrl(videoSource) : videoSource;

    // Configure Video.js options
    const options: any = {
      controls: true,
      fluid: false,
      responsive: true,
      fill: true,
      preload: "metadata",
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      plugins: {},
      techOrder: isYouTube ? ["youtube", "html5"] : ["html5"],
    };

    // Configure source based on type
    if (isLocal) {
      options.sources = [{
        src: src,
        type: "video/mp4"
      }];
    } else if (isYouTube) {
      options.techOrder = ["youtube"];
      options.sources = [{
        src: cleanedUrl,
        type: "video/youtube"
      }];
      options.youtube = {
        ytControls: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        rel: 0,
        showinfo: 0
      };
    } else {
      options.sources = [{
        src: url,
        type: "video/mp4"
      }];
    }

    // Create video element
    const videoElement = document.createElement("video");
    videoElement.className = "video-js vjs-default-skin";
    videoElement.setAttribute("data-setup", "{}");
    
    // Clear any existing content and append video element
    if (videoRef.current) {
      videoRef.current.innerHTML = "";
      videoRef.current.appendChild(videoElement);
    }

    // Initialize Video.js player
    const player = videojs(videoElement, options);

    // Event listeners
    player.ready(() => {
      if (isMounted) {
        handleReady();
      }
    });

    player.on("error", (e: any) => {
      if (isMounted) {
        handleError(e);
      }
    });

    player.on("loadstart", () => {
      if (isMounted) {
        setIsLoading(true);
      }
    });

    player.on("canplay", () => {
      if (isMounted) {
        setIsLoading(false);
      }
    });

    // Store player reference
    playerRef.current = player;

    // Cleanup function
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (e) {
          console.warn("Error disposing VideoJS player:", e);
        }
      }
    };
  }, [videoSource, isLocal, isYouTube, title, src, url, cleanYouTubeUrl, handleError, handleReady, isMounted, videoJsLoaded]);

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    
    // Force re-render by updating a key or reloading the component
    if (playerRef.current) {
      try {
        playerRef.current.dispose();
      } catch (e) {
        console.warn("Error disposing player during retry:", e);
      }
    }
    
    // The useEffect will handle recreation
  };

  // Show loading while Video.js is being loaded
  if (!isMounted || !videoJsLoaded) {
    return (
      <div className="video-player-container videojs-container">
        <div className="video-loading">
          <div className="loading-spinner large"></div>
          <p>Loading video player...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="video-player-error">
        <div className="error-content">
          <div className="error-icon">⚠️</div>
          <h4>Unable to load video</h4>
          <p>{errorMessage}</p>
          <div className="error-details">
            <small>Source: {videoSource}</small>
            <br />
            <small>Type: {isLocal ? "Local MP4" : isYouTube ? "YouTube" : "External"}</small>
          </div>
          <button onClick={handleRetry} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-player-container videojs-container">
      {isLoading && (
        <div className="video-loading">
          <div className="loading-spinner large"></div>
          <p>Loading video...</p>
          <small>{title}</small>
        </div>
      )}
      
      <div 
        ref={videoRef} 
        className="videojs-wrapper"
        style={{
          width: "100%",
          height: "100%",
          position: "relative"
        }}
      />
    </div>
  );
}