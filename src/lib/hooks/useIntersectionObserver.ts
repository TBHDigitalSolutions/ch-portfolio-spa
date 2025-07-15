// src/lib/hooks/useIntersectionObserver.ts - Fixed dependency issue
import { useEffect, useMemo, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: UseIntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined {
  const { freezeOnceVisible = false, ...observerOptions } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  // ✅ FIXED: Only include observerOptions, remove specific property dependencies
  const observer = useMemo(() => {
    if (typeof window === 'undefined') return null;
    
    return new IntersectionObserver(([entry]) => setEntry(entry), observerOptions);
  }, [observerOptions]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || frozen || !observer) return;

    observer.observe(element);

    return () => observer.unobserve(element);
  }, [elementRef, frozen, observer]);

  return entry;
}