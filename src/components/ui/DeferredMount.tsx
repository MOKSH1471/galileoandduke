'use client';

import type { ReactNode } from 'react';

// Preserve the existing component API without gating useful content on animation.
export function DeferredMount({ children }: { children: ReactNode; fallback?: ReactNode }) {
    return <>{children}</>;
}
