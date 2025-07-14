// src/lib/utils/formatCaption.ts

/**
 * Remove HTML tags from a string and collapse whitespace.
 * @param input - Raw caption, potentially containing HTML.
 * @returns Sanitized plain text caption.
 */
export function sanitizeCaption(input: string): string {
    // Strip HTML tags
    const withoutTags = input.replace(/<[^>]*>/g, "");
    // Collapse multiple whitespace characters into a single space
    return withoutTags.replace(/\s+/g, " ").trim();
  }
  
  /**
   * Truncate a string to a maximum length, optionally preserving word boundaries.
   * @param input - Raw or sanitized caption.
   * @param maxLength - Maximum number of characters allowed.
   * @param options.ellipsis - String to append when truncated (default: '…').
   * @param options.wordBoundaries - If true, avoid breaking words; default false.
   * @returns Truncated string with ellipsis if needed.
   */
  export function truncateCaption(
    input: string,
    maxLength: number,
    options?: { ellipsis?: string; wordBoundaries?: boolean }
  ): string {
    const { ellipsis = '…', wordBoundaries = false } = options || {};
    const text = sanitizeCaption(input);
    if (text.length <= maxLength) return text;
  
    let truncated = text.slice(0, maxLength);
    if (wordBoundaries) {
      // Find last space within truncated
      const lastSpace = truncated.lastIndexOf(' ');
      if (lastSpace > 0) {
        truncated = truncated.slice(0, lastSpace);
      }
    }
  
    return truncated.trimEnd() + ellipsis;
  }
  