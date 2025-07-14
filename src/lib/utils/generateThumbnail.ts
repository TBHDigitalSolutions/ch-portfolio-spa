// src/lib/utils/generateThumbnail.ts

/**
 * generateThumbnail
 * ---------------
 * Given a URL (image, PDF, YouTube link, or local video), returns
 * the best-guess thumbnail URL:
 *  - Images        ⇒ returned unchanged
 *  - PDFs          ⇒ .pdf → .png (preserves query/hash)
 *  - YouTube URLs  ⇒ YouTube’s high-quality thumbnail endpoint
 *  - Local videos  ⇒ replace .mp4/.webm/.mov with `-thumb.png`
 *  - Otherwise     ⇒ generic media placeholder
 *
 * @param url - The input URL or path.
 * @returns A URL or path to the thumbnail image.
 */
export function generateThumbnail(url: string): string {
  // Split off any query string
  const [path, query = ""] = url.split(/\?(.+)/, 2);

  // 1) If it’s already an image, just return it
  if (/\.(jpe?g|png|gif|webp|svg)(?:$|\?|\#)/i.test(path)) {
    return url;
  }

  // 2) PDF → swap to .png, re-attach query
  if (/\.pdf(?=$|\?|#)/i.test(path)) {
    const png = path.replace(/(\.pdf)(?=$|\?|#)/i, ".png");
    return png + (query ? `?${query}` : "");
  }

  // 3) YouTube → high-res thumbnail
  const ytMatch = url.match(
    /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  if (ytMatch) {
    const id = ytMatch[1];
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  // 4) Local video → replace ext with `-thumb.png`
  const vidMatch = path.match(/(.+)\.(mp4|webm|mov)$/i);
  if (vidMatch) {
    const base = vidMatch[1];
    return `${base}-thumb.png${query ? `?${query}` : ""}`;
  }

  // 5) Fallback → generic placeholder
  return `/assets/media-showcase/generic-media-thumb.png`;
}
