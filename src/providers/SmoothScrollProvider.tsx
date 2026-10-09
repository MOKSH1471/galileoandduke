'use client';

import { ReactLenis } from 'lenis/react';
import { MotionConfig } from 'framer-motion';
import { MotionConfig as ModernMotionConfig } from 'motion/react';
import { usePerformance } from '@/hooks/usePerformance';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    const { prefersReducedMotion } = usePerformance();
    return (
        <MotionConfig reducedMotion="user">
        <ModernMotionConfig reducedMotion="user">
        <ReactLenis root options={{
            lerp: prefersReducedMotion ? 1 : 0.14,
            smoothWheel: !prefersReducedMotion,
            syncTouch: false,
            wheelMultiplier: 1.0,
        }}>
            {children}
        </ReactLenis>
        </ModernMotionConfig>
        </MotionConfig>
    );
}
