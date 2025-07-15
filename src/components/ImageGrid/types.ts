// src/components/ImageGrid/types.ts
export type ImageSize = 'small' | 'medium' | 'large' | 'wide' | 'tall';

export interface ImageItem {
  id: string;
  src: string;
  alt?: string;
  caption?: string;
  size?: ImageSize;
  priority?: boolean;
}
