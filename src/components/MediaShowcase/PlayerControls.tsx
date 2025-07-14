// src/components/MediaShowcase/PlayerControls.tsx - Updated for Video.js
"use client";

import React, { useState, useEffect, useCallback } from "react";

export interface PlayerControlsProps {
  /** Ref to your Video.js player instance */
  playerRef: React.MutableRefObject<any>;
  /** "audio" or "video" */
  type: "audio" | "video";
  /** Optional: source file path for debugging */
  src?: string;
}

export default function PlayerControls({
  playerRef,
  type,
  src
}: PlayerControlsProps) {
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  // Format seconds → MM:SS
  const formatTime = (secs: number) => {
    if (!isFinite(secs) || isNaN(secs)) return "00:00";
    
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = Math.floor(secs % 60)
      .toString()
      .padStart(2, "0");
    return `${m}:${s}`;
  };

  // Update time & duration via polling for Video.js
  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (!player || typeof player.currentTime !== 'function') return;

      try {
        const t = player.currentTime() || 0;
        const d = player.duration() || 0;
        const vol = player.volume() || 0;
        const isMuted = player.muted() || false;
        const isPlaying = !player.paused();

        setCurrentTime(t);
        setDuration(d);
        setVolume(vol);
        setMuted(isMuted);
        setPlaying(isPlaying);
      } catch (error) {
        // Player might not be ready yet
        console.debug('Player not ready for controls update');
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [playerRef]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player || typeof player.paused !== 'function') return;

    try {
      if (player.paused()) {
        player.play();
        setPlaying(true);
        console.log(`▶️ PlayerControls: Playing ${type} - ${src}`);
      } else {
        player.pause();
        setPlaying(false);
        console.log(`⏸️ PlayerControls: Pausing ${type} - ${src}`);
      }
    } catch (error) {
      console.error('Error toggling play state:', error);
    }
  }, [playerRef, type, src]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    const player = playerRef.current;
    if (!player || typeof player.currentTime !== 'function') return;

    try {
      player.currentTime(val);
      setCurrentTime(val);
      console.log(`⏭️ PlayerControls: Seeking to ${formatTime(val)} in ${type}`);
    } catch (error) {
      console.error('Error seeking:', error);
    }
  }, [playerRef, type]);

  const handleVolume = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    const player = playerRef.current;
    if (!player || typeof player.volume !== 'function') return;

    try {
      player.volume(vol);
      setVolume(vol);
      console.log(`🔊 PlayerControls: Volume set to ${Math.round(vol * 100)}% for ${type}`);
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  }, [playerRef, type]);

  const toggleMute = useCallback(() => {
    const player = playerRef.current;
    if (!player || typeof player.muted !== 'function') return;

    try {
      const newMutedState = !player.muted();
      player.muted(newMutedState);
      setMuted(newMutedState);
      console.log(`🔇 PlayerControls: ${newMutedState ? 'Muted' : 'Unmuted'} ${type}`);
    } catch (error) {
      console.error('Error toggling mute:', error);
    }
  }, [playerRef, type]);

  const handleSkip = useCallback((seconds: number) => {
    const player = playerRef.current;
    if (!player || typeof player.currentTime !== 'function') return;

    try {
      const current = player.currentTime() || 0;
      const newTime = Math.max(0, Math.min(current + seconds, duration));
      player.currentTime(newTime);
      setCurrentTime(newTime);
      console.log(`⏭️ PlayerControls: Skipped ${seconds}s to ${formatTime(newTime)} in ${type}`);
    } catch (error) {
      console.error('Error skipping:', error);
    }
  }, [playerRef, duration, type]);

  // Set up Video.js event listeners
  useEffect(() => {
    const player = playerRef.current;
    if (!player || typeof player.on !== 'function') return;

    const onPlay = () => {
      setPlaying(true);
      console.log('🎬 PlayerControls: Play event received');
    };
    
    const onPause = () => {
      setPlaying(false);
      console.log('⏸️ PlayerControls: Pause event received');
    };

    const onTimeUpdate = () => {
      try {
        const t = player.currentTime() || 0;
        setCurrentTime(t);
      } catch (error) {
        // Ignore errors during time updates
      }
    };

    const onDurationChange = () => {
      try {
        const d = player.duration() || 0;
        setDuration(d);
        console.log(`⏱️ PlayerControls: Duration loaded: ${formatTime(d)} for ${type}`);
      } catch (error) {
        console.error('Error getting duration:', error);
      }
    };

    const onVolumeChange = () => {
      try {
        const vol = player.volume() || 0;
        const isMuted = player.muted() || false;
        setVolume(vol);
        setMuted(isMuted);
      } catch (error) {
        // Ignore errors during volume updates
      }
    };

    // Add event listeners
    player.on('play', onPlay);
    player.on('pause', onPause);
    player.on('timeupdate', onTimeUpdate);
    player.on('durationchange', onDurationChange);
    player.on('volumechange', onVolumeChange);

    // Cleanup function
    return () => {
      try {
        player.off('play', onPlay);
        player.off('pause', onPause);
        player.off('timeupdate', onTimeUpdate);
        player.off('durationchange', onDurationChange);
        player.off('volumechange', onVolumeChange);
      } catch (error) {
        console.warn('Error removing Video.js event listeners:', error);
      }
    };
  }, [playerRef, type]);

  return (
    <div className="player-controls">
      {/* Play/Pause */}
      <button
        onClick={togglePlay}
        className="control-button play-pause-btn"
        aria-label={playing ? "Pause" : "Play"}
        title={playing ? "Pause" : "Play"}
        disabled={!playerRef.current}
      >
        {playing ? "⏸️" : "▶️"}
      </button>

      {/* Skip backwards */}
      <button
        onClick={() => handleSkip(-10)}
        className="control-button skip-btn"
        aria-label="Skip backward 10 seconds"
        title="Skip backward 10 seconds"
        disabled={!playerRef.current}
      >
        ⏪
      </button>

      {/* Progress */}
      <div className="progress-section">
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={handleSeek}
          className="progress-slider"
          aria-label="Seek"
          disabled={!playerRef.current || !duration}
        />
        <div className="time-display">
          <span className="current-time">{formatTime(currentTime)}</span>
          <span className="duration">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Skip forward */}
      <button
        onClick={() => handleSkip(10)}
        className="control-button skip-btn"
        aria-label="Skip forward 10 seconds"
        title="Skip forward 10 seconds"
        disabled={!playerRef.current}
      >
        ⏩
      </button>

      {/* Volume */}
      <div className="volume-control">
        <button
          onClick={toggleMute}
          className="control-button mute-btn"
          aria-label={muted ? "Unmute" : "Mute"}
          title={muted ? "Unmute" : "Mute"}
          disabled={!playerRef.current}
        >
          {muted ? "🔇" : volume > 0.5 ? "🔊" : volume > 0 ? "🔉" : "🔈"}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={muted ? 0 : volume}
          onChange={handleVolume}
          className="volume-slider"
          aria-label="Volume"
          disabled={!playerRef.current}
        />
        <span className="volume-level">{Math.round((muted ? 0 : volume) * 100)}%</span>
      </div>

      {/* Media info */}
      <div className="media-info">
        {src && (
          <small title={src} className="media-filename">
            {src.split('/').pop()?.split('.')[0] || 'Unknown'}
          </small>
        )}
        <span className="media-type-indicator">{type.toUpperCase()}</span>
      </div>

      {/* Player status */}
      <div className="player-status">
        <span className={`status-indicator ${playing ? 'playing' : 'paused'}`}>
          {playing ? '⚫ PLAYING' : '⚪ PAUSED'}
        </span>
      </div>
    </div>
  );
}