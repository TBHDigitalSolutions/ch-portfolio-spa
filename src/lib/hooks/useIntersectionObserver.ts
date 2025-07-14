// src/lib/hooks/useIntersectionObserver.ts
import { useEffect } from "react";

export type IntersectionObserverOptions = IntersectionObserverInit;

/**
 * useIntersectionObserver
 * Fires a callback when the target element enters or leaves the viewport.
 *
 * @param ref React ref object pointing to the target DOM element
 * @param callback Function called on each IntersectionObserverEntry
 * @param options IntersectionObserverInit (root, rootMargin, threshold)
 */
export default function useIntersectionObserver(
  ref: React.RefObject<Element> | React.MutableRefObject<Element | null>,
  callback: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void,
  options: IntersectionObserverOptions = { root: null, rootMargin: "0px", threshold: 0 }
): void {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        callback(entry, obs);
      });
    }, options);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  // We include options as string to avoid deep compare issues
  }, [ref, callback, JSON.stringify(options)]);
}
