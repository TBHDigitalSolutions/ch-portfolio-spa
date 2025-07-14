// src/components/MediaShowcase/MediaPlayer.tsx - Fixed SSR Issue
"use client";

import React, {
  forwardRef,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";

export interface MediaPlayerProps {
  src: string;
  type: "audio" | "video";
  onLoadStart?: () => void;
  onReady?: () => void;
  onError?: (msg: string) => void;
}

// Expose the player instance via ref
const MediaPlayer = forwardRef<HTMLVideoElement | HTMLAudioElement, MediaPlayerProps>(
  ({ src, type, onLoadStart, onReady, onError }, ref) => {
    const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null);
    const playerRef = useRef<any>(null);
    const [useNative, setUseNative] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [videoJsLoaded, setVideoJsLoaded] = useState(false);

    // Ensure we're on the client side
    useEffect(() => {
      setIsClient(true);
    }, []);

    // Dynamically import Video.js only on client side
    useEffect(() => {
      if (!isClient) return;

      const loadVideoJs = async () => {
        try {
          // Dynamic imports for client-side only
          const videojs = (await import("video.js")).default;
          await import("video.js/dist/video-js.css");
          await import("videojs-youtube");
          
          // Store videojs globally for use in other effects
          (window as any).__videojs = videojs;
          setVideoJsLoaded(true);
        } catch (error) {
          console.error("Failed to load Video.js:", error);
          setUseNative(true);
          onError?.("Failed to load Video.js");
        }
      };

      loadVideoJs();
    }, [isClient, onError]);

    // Cleanup function
    const cleanup = useCallback(() => {
      if (playerRef.current && typeof playerRef.current.dispose === 'function') {
        try {
          playerRef.current.dispose();
          playerRef.current = null;
        } catch (error) {
          console.warn("Error disposing Video.js player:", error);
        }
      }
    }, []);

    // Initialize Video.js player when everything is ready
    useEffect(() => {
      if (!isClient || !videoJsLoaded || !mediaRef.current || useNative) return;

      const videojs = (window as any).__videojs;
      if (!videojs) {
        setUseNative(true);
        return;
      }

      onLoadStart?.();

      const isYouTube = /youtu/.test(src);
      const options: any = {
        controls: true,
        fluid: true,
        preload: "auto",
        techOrder: isYouTube ? ["youtube", "html5"] : ["html5"],
        sources: [
          {
            src,
            type: isYouTube ? "video/youtube" : `${type}/${src.split(".").pop()}`,
          },
        ],
        youtube: isYouTube
          ? { modestbranding: 1, rel: 0, showinfo: 0 }
          : undefined,
      };

      try {
        const player = videojs(mediaRef.current, options);
        playerRef.current = player;

        player.ready(() => {
          onReady?.();
        });

        player.on("error", (e: any) => {
          console.error("Video.js player error:", e);
          setUseNative(true);
          onError?.(`Video.js playback error: ${src}`);
        });

      } catch (error) {
        console.error("Video.js initialization error:", error);
        setUseNative(true);
        onError?.(`Video.js initialization failed: ${src}`);
      }

      return cleanup;
    }, [isClient, videoJsLoaded, src, type, cleanup, onLoadStart, onReady, onError, useNative]);

    // Handle native HTML5 fallback
    useEffect(() => {
      if (!useNative || !mediaRef.current) return;

      const media = mediaRef.current as HTMLVideoElement | HTMLAudioElement;
      media.src = src;
      media.load();
      
      const handleCanPlay = () => onReady?.();
      const handleError = () => onError?.(`Native ${type} playback error: ${src}`);

      media.addEventListener('canplay', handleCanPlay);
      media.addEventListener('error', handleError);

      return () => {
        media.removeEventListener('canplay', handleCanPlay);
        media.removeEventListener('error', handleError);
      };
    }, [useNative, src, type, onReady, onError]);

    // Expose player via parent ref
    useEffect(() => {
      if (ref && mediaRef.current) {
        (ref as React.MutableRefObject<any>).current = mediaRef.current;
      }
    }, [ref]);

    // Show loading state during SSR and initial client render
    if (!isClient) {
      return (
        <div className="media-player-loading">
          <div className="loading-spinner large"></div>
          <p>Loading media player...</p>
        </div>
      );
    }

    // Render appropriate media element
    if (useNative) {
      return React.createElement(type, {
        ref: mediaRef,
        controls: true,
        className: "native-media-player",
        style: { width: "100%", height: "100%" },
      });
    }

    return React.createElement(type, {
      ref: mediaRef,
      className: `video-js vjs-default-skin`,
      "data-setup": "{}",
      style: { width: "100%", height: "100%" },
    });
  }
);

MediaPlayer.displayName = "MediaPlayer";

export default MediaPlayer;