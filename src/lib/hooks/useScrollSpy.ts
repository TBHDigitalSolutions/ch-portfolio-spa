// src/lib/hooks/useScrollSpy.ts
import { useState, useEffect } from 'react';

/**
 * useScrollSpy hook to track which section is currently visible
 * @param sectionIds Array of section IDs to track
 * @param options IntersectionObserver options
 * @returns Currently active section ID
 */
export default function useScrollSpy(
  sectionIds: string[],
  options: IntersectionObserverInit = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0.1
  }
): string {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, options]);

  return activeSection;
}