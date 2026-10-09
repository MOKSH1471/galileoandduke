'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

// In React 19 / Next.js 16, React's dev reconciler flags the inline theme script injected by next-themes
// as a script tag inside a component. This filter intercepts this known false-positive in development.
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    const origError = console.error;
    console.error = (...args: unknown[]) => {
        if (typeof args[0] === 'string' && args[0].includes('Encountered a script tag')) {
            return;
        }
        origError.apply(console, args);
    };
}

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={true}
            storageKey="portfolio-theme"
        >
            {children}
        </NextThemesProvider>
    );
}
