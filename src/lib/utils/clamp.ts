// src/lib/utils/clamp.ts

/**
 * clampText
 * Truncates a string to a specified maximum length, appending an ellipsis or custom clamp string.
 * Ensures the returned string does not exceed the given max length.
 *
 * @param text - The input string to clamp.
 * @param maxLength - Maximum length of the returned string, including the clamp string.
 * @param clampStr - String to append when truncation occurs (default: '…').
 * @returns The clamped string.
 *
 * @example
 * clampText("Hello, world!", 5);
 * // => "Hel…"
 */
export function clampText(
    text: string,
    maxLength: number,
    clampStr = '…'
  ): string {
    if (text.length <= maxLength) {
      return text;
    }
  
    const availableLength = maxLength - clampStr.length;
    if (availableLength <= 0) {
      return clampStr;
    }
  
    return text.slice(0, availableLength) + clampStr;
  }
  