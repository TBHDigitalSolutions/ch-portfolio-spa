// src/components/VideoGrid/VideoGrid.tsx
"use client";

import React from "react";
import VideoCard from "./VideoCard";
import { VideoItem } from "./index";
import './videogrid-component.css';

interface VideoGridProps {
  items: VideoItem[];
  selectedId?: string;
  onSelect: (item: VideoItem) => void;
  variant?: "sidebar" | "full";
}

export default function VideoGridList({
  items,
  selectedId,
  onSelect,
  variant = "sidebar"
}: VideoGridProps) {
  if (!items?.length) {
    return (
      <div className="video-grid-empty">
        <p>No videos available</p>
      </div>
    );
  }

  const containerClass = variant === "full" 
    ? "video-grid-container-full" 
    : "video-grid-container";

  return (
    <div className={containerClass}>
      {items.map((item, index) => (
        <VideoCard
          key={item.id}
          item={item}
          isSelected={item.id === selectedId}
          onSelect={() => onSelect(item)}
          index={index}
        />
      ))}
    </div>
  );
}
