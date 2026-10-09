'use client';

import { useSyncExternalStore } from 'react';
import { subscribe, getSnapshot, getServerSnapshot } from '@/lib/performance-store';

// Conservative device hints, not a battery detector or frame-rate benchmark.
export function usePerformance() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
