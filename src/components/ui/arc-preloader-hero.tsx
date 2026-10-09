"use client";

import * as React from "react";
import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useLenis } from 'lenis/react';
import { usePerformance } from '@/hooks/usePerformance';

export type PreloadPhase = "intro" | "text" | "reveal" | "done";
export const PreloadContext = React.createContext<{ isPreloading: boolean, phase: PreloadPhase }>({ isPreloading: false, phase: "done" });
export const usePreloadState = () => React.useContext(PreloadContext);

export type ArcRevealGreeting = {
  text: string;
  subtitle?: string;
  number?: string;
  lang?: string;
};

export interface ArcRevealHeroProps {
  greetings?: ArcRevealGreeting[];
  greetingHold?: number;
  revealDuration?: number;
  className?: string;
  introClassName?: string;
  greetingClassName?: string;
  revealClassName?: string;
  storageKey?: string;
  children?: React.ReactNode;
}

const ROUTE_INFO: Record<string, { text: string; subtitle?: string; number?: string }> = {
  '/': { text: 'Galileo & Duke', subtitle: 'Design & Development Studio' },
  '/projects': { text: 'Work', subtitle: 'Selected Flagships & Case Studies', number: '01' },
  '/experience': { text: 'Approach', subtitle: '4-Phase Studio Engagement Flow', number: '02' },
  '/skills': { text: 'Capabilities', subtitle: 'Interactive Systems & Engineering', number: '03' },
  '/about': { text: 'Studio', subtitle: 'Atelier Heritage & Leadership', number: '04' },
  '/gallery': { text: 'Gallery', subtitle: 'Curated Visual Archive', number: '05' },
  '/contact': { text: 'Contact', subtitle: 'Initiate a Flagship Build' },
};

export function ArcRevealHero({
  greetings,
  greetingHold = 240,
  revealDuration = 180,
  className,
  introClassName,
  greetingClassName,
  revealClassName,
  storageKey,
  children,
}: ArcRevealHeroProps) {
  const pathname = usePathname();
  const lenis = useLenis();
  const { prefersReducedMotion } = usePerformance();

  const [phase, setPhase] = React.useState<PreloadPhase>("done");
  const [prevPathname, setPrevPathname] = React.useState(pathname);

  // Progress from 0 to 2
  // 0 -> 1: Black curve rises from bottom
  // 1: Text appears (held by greetingHold)
  // 1 -> 2: Black curve lifts up to reveal page
  const progress = useMotionValue(0);

  // Handle route change during render to catch the navigation instantly
  if (pathname !== prevPathname) {
    const isBackToProjects = prevPathname.startsWith('/projects/') && pathname === '/projects';
    setPrevPathname(pathname);
    
    // Skip preloader if navigating back to listing from detail or if reduced motion is requested
    if (!prefersReducedMotion && !isBackToProjects) {
      setPhase("intro");
      progress.set(0);
    }
  }

  // Generate title & section info from pathname
  const currentGreeting = React.useMemo<ArcRevealGreeting>(() => {
    if (greetings && greetings.length > 0) return greetings[0];

    if (ROUTE_INFO[pathname]) {
      return ROUTE_INFO[pathname];
    }

    const parts = pathname.split('/').filter(Boolean);
    if (parts[0] === 'projects' && parts.length > 1) {
      const slugTitle = parts[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { text: slugTitle, subtitle: 'Work // Case Study', number: '01' };
    }

    if (parts[0] === 'blog' && parts.length > 1) {
      const slugTitle = parts[1]
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      return { text: slugTitle, subtitle: 'Journal // Article' };
    }

    if (parts.length > 0) {
      const formatted = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      return { text: formatted };
    }

    return { text: 'Galileo & Duke' };
  }, [pathname, greetings]);

  const arcPath = useTransform(progress, (p: number) => {
    if (p <= 1) {
      // Rise phase (0 to 1)
      const topEdge = 110 - p * 110;
      // Convex upwards curve
      const control = topEdge - 28 * Math.sin(p * Math.PI);
      return `M 0 ${topEdge} Q 50 ${control} 100 ${topEdge} L 100 110 L 0 110 Z`;
    } else {
      // Reveal phase (1 to 2)
      const t = p - 1;
      const bottomEdge = 110 - t * 110;
      // Concave upwards curve
      const control = bottomEdge - 28 * Math.sin(t * Math.PI);
      return `M 0 0 L 100 0 L 100 ${bottomEdge} Q 50 ${control} 0 ${bottomEdge} Z`;
    }
  });

  // Reduced motion guard
  React.useEffect(() => {
    if (prefersReducedMotion) setPhase('done');
  }, [prefersReducedMotion]);

  // Scroll reset & global event on route change
  React.useEffect(() => {
    const isPreloading = phase !== "done" && !prefersReducedMotion;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('preload-state-change', { detail: isPreloading }));
    }

    if (isPreloading) {
      window.scrollTo(0, 0);
      if (lenis) lenis.scrollTo(0, { immediate: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('preload-state-change', { detail: false }));
      }
    };
  }, [phase, lenis, prefersReducedMotion]);

  // Check initial load overrides
  React.useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined') {
      const isLoaded = sessionStorage.getItem('portfolioLoaded');
      if (!isLoaded) {
        setPhase("done");
        return;
      }
    }

    if (storageKey && typeof window !== "undefined") {
      try {
        if (window.sessionStorage.getItem(storageKey) === "done") {
          setPhase("done");
          return;
        }
      } catch {
        // ignore
      }
    }
  }, []); // Run only once on mount

  // Phase: Intro -> Text
  React.useEffect(() => {
    if (phase !== "intro" || prefersReducedMotion) return;
    
    const controls = animate(progress, 1, {
      duration: revealDuration / 1000,
      ease: [0.76, 0, 0.24, 1], // snappy cubic bezier
      onComplete: () => {
        setPhase("text");
      }
    });
    
    return () => controls.stop();
  }, [phase, progress, revealDuration, prefersReducedMotion]);

  // Phase: Text hold -> Reveal
  React.useEffect(() => {
    if (phase !== "text" || prefersReducedMotion) return;
    
    const t = window.setTimeout(() => {
      setPhase("reveal");
    }, greetingHold);
    
    return () => window.clearTimeout(t);
  }, [phase, greetingHold, prefersReducedMotion]);

  // Phase: Reveal -> Done
  React.useEffect(() => {
    if (phase !== "reveal" || prefersReducedMotion) return;
    
    const controls = animate(progress, 2, {
      duration: revealDuration / 1000,
      ease: [0.76, 0, 0.24, 1],
      onComplete: () => {
        setPhase("done");
        if (storageKey && typeof window !== "undefined") {
          try {
            window.sessionStorage.setItem(storageKey, "done");
          } catch {
            // ignore
          }
        }
      }
    });
    
    return () => controls.stop();
  }, [phase, progress, revealDuration, storageKey, prefersReducedMotion]);

  const showOverlay = phase !== "done" && !prefersReducedMotion;

  return (
    <div
      className={cn(
        "relative isolate min-h-screen w-full bg-background text-foreground",
        className,
      )}
    >
      <PreloadContext.Provider value={{ isPreloading: showOverlay, phase }}>
        <div className={cn("relative z-0", revealClassName)}>{children}</div>
      </PreloadContext.Provider>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="arc-reveal-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className={cn(
              "fixed inset-0 z-[999] h-screen w-full overflow-hidden pointer-events-none",
              introClassName,
            )}
          >
            {/* The text layer - highly readable, clearly styled */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <AnimatePresence mode="wait">
                {phase === "text" && currentGreeting && (
                  <motion.div
                    key={currentGreeting.text}
                    lang={currentGreeting.lang}
                    initial={{ opacity: 0, y: 12, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.98 }}
                    transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center text-center px-6"
                  >
                    {currentGreeting.number && (
                      <span className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-[#D1FF4D] mb-2.5 font-bold">
                        {currentGreeting.number} // SECTION
                      </span>
                    )}
                    <h2
                      className={cn(
                        "select-none text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white",
                        greetingClassName,
                      )}
                    >
                      {currentGreeting.text}
                    </h2>
                    {currentGreeting.subtitle && (
                      <p className="mt-2.5 text-xs md:text-sm font-mono tracking-widest text-white/65 uppercase">
                        {currentGreeting.subtitle}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* The background curves layer - dark obsidian for guaranteed contrast & crispness */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full z-0"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              {(phase === "intro" || phase === "text") && (
                <rect width="100" height="100" className="fill-[#09090b]" />
              )}
              <motion.path d={arcPath} className="fill-[#09090b]" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
