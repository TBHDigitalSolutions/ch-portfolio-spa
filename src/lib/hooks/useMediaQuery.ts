// src/lib/hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

/**
 * Breakpoint aliases matching Tailwind defaults.
 */
export type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

const breakpointQueries: Record<Breakpoint, string> = {
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
};

/**
 * useMediaQuery
 * React hook to track if a given media query matches.
 * Handles SSR by defaulting to false on server.
 * 
 * @param query CSS media query string
 * @returns boolean indicating if the query currently matches
 */
export function useMediaQuery(query: string): boolean {
  // Initial match state (false during SSR)
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Listen for changes
    mql.addEventListener("change", handler);
    // Set initial
    setMatches(mql.matches);

    return () => {
      mql.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}

/**
 * useBreakpoint
 * Convenience hook to check Tailwind breakpoints.
 * 
 * @param bp Breakpoint alias (sm, md, lg, xl, 2xl)
 * @returns boolean indicating if viewport is at or above the specified breakpoint
 */
export function useBreakpoint(bp: Breakpoint): boolean {
  const query = breakpointQueries[bp];
  return useMediaQuery(query);
}