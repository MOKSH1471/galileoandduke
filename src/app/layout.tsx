import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display, Alex_Brush } from 'next/font/google';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider, I18nProvider, SmoothScrollProvider } from '@/providers';
import { ThemeAwareClickSpark } from '@/components/ui/ThemeAwareClickSpark';
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation';
import { ArcPreloaderWrapper } from '@/components/layout/ArcPreloaderWrapper';

import '@/styles/globals.css';
import { portfolioData } from '@/data/portfolio';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://galileoandduke.com';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const signature = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-signature',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'Galileo & Duke | Design & Development Studio',
        template: '%s | Galileo & Duke',
    },
    description: 'Galileo & Duke is an independent design and development studio founded by Moksh and Varul. We build web experiences that transcend templates — scroll-driven storytelling, cinematic motion, and bespoke engineering.',
    keywords: ['Galileo & Duke', 'design studio', 'creative technology', 'cinematic motion', 'GSAP', 'React Three Fiber', 'WebGL', 'scroll storytelling', 'bespoke engineering'],
    authors: [{ name: 'Moksh' }, { name: 'Varul' }],
    creator: 'Galileo & Duke',
    metadataBase: new URL(siteUrl),
    alternates: {
        canonical: siteUrl,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        title: 'Galileo & Duke | Design & Development Studio',
        description: 'Web experiences beyond the template — cinematic motion, scroll-driven storytelling, and bespoke engineering.',
        siteName: 'Galileo & Duke',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Galileo & Duke | Design & Development Studio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Galileo & Duke | Design & Development Studio',
        description: 'Web experiences beyond the template — cinematic motion, scroll-driven storytelling, and bespoke engineering.',
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    ],
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Organization',
                '@id': `${siteUrl}/#organization`,
                name: 'Galileo & Duke',
                url: siteUrl,
                logo: `${siteUrl}/icon.png`,
                email: 'hello@galileoduke.com',
                description: 'Galileo & Duke is an independent design and development studio founded by Moksh and Varul. We build web experiences that transcend templates — scroll-driven storytelling, cinematic motion, and bespoke engineering.',
                founders: [
                    { '@type': 'Person', name: 'Moksh' },
                    { '@type': 'Person', name: 'Varul' },
                ],
                sameAs: [
                    'https://github.com/MOKSH1471',
                    'https://www.instagram.com/galileoandduke/',
                    'https://linkedin.com/company/galileo-duke',
                ],
            },
            {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: siteUrl,
                name: 'Galileo & Duke',
                description: 'Bespoke web experiences, cinematic motion, and creative engineering studio.',
                publisher: {
                    '@id': `${siteUrl}/#organization`,
                },
            },
        ],
    };

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${signature.variable} font-sans relative`} suppressHydrationWarning>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <ThemeProvider>
                    <I18nProvider locale={locale} messages={messages}>
                        <SmoothScrollProvider>
                            <ThemeAwareClickSpark>
                                <ArcPreloaderWrapper>
                                    <ConditionalNavigation>
                                        {children}
                                    </ConditionalNavigation>
                                </ArcPreloaderWrapper>
                            </ThemeAwareClickSpark>
                        </SmoothScrollProvider>
                    </I18nProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
