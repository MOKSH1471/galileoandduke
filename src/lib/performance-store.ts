'use client';

type DeviceNavigator = Navigator & {
    deviceMemory?: number;
    connection?: EventTarget & { saveData?: boolean };
};

export const serverState = {
    isMobile: false,
    isTablet: false,
    isLowPowerMode: true,
    prefersReducedMotion: true,
    isPageVisible: true,
};
let state = serverState;
const listeners = new Set<() => void>();
let cleanup: (() => void) | undefined;
export const getSnapshot = () => state;
export const getServerSnapshot = () => serverState;

export function subscribe(listener: () => void) {
    listeners.add(listener);
    if (listeners.size === 1) {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        const device = navigator as DeviceNavigator;
        const update = () => {
            const width = window.innerWidth;
            const next = {
                isMobile: width < 768,
                isTablet: width >= 768 && width < 1024,
                prefersReducedMotion: media.matches,
                isPageVisible: document.visibilityState !== 'hidden',
                isLowPowerMode: width < 1024 || media.matches || !!device.connection?.saveData
                    || (device.hardwareConcurrency > 0 && device.hardwareConcurrency <= 4)
                    || (device.deviceMemory !== undefined && device.deviceMemory <= 4),
            };
            if (Object.keys(next).some(key => next[key as keyof typeof next] !== state[key as keyof typeof state])) {
                state = next;
                listeners.forEach(notify => notify());
            }
        };
        window.addEventListener('resize', update);
        media.addEventListener('change', update);
        document.addEventListener('visibilitychange', update);
        device.connection?.addEventListener('change', update);
        update();
        cleanup = () => {
            window.removeEventListener('resize', update);
            media.removeEventListener('change', update);
            document.removeEventListener('visibilitychange', update);
            device.connection?.removeEventListener('change', update);
        };
    }
    return () => {
        listeners.delete(listener);
        if (!listeners.size) {
            cleanup?.();
            cleanup = undefined;
            state = serverState;
        }
    };
}
