import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display, Alex_Brush } from 'next/font/google';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider, I18nProvider, SmoothScrollProvider } from '@/providers';
import { ThemeAwareClickSpark } from '@/components/ui/ThemeAwareClickSpark';
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation';
import { ArcPreloaderWrapper } from '@/components/layout/ArcPreloaderWrapper';

import '@/styles/globals.css';
import { portfolioData } from '@/data/portfolio';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.galileoandduke.com';

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
        default: 'Galileo & Duke | Premium Web Development & Digital Design Studio',
        template: '%s | Galileo & Duke',
    },
    description: 'Galileo & Duke is an independent design and bespoke web development studio founded by Moksh and Varul. We engineer high-performance digital flagships, 3D interactive web experiences, and scalable websites for ambitious startups, B2B enterprises, and global brands.',
    keywords: [
        // Brand & Disambiguation
        'Galileo & Duke',
        'Galileo and Duke',
        'Galileo and Duke Studio',
        'Galileo & Duke Agency',

        // Core Intent & Quality
        'best web development',
        'best web development company',
        'premium web development',
        'premium website design studio',
        'bespoke web development',
        'luxury website design',
        'custom web development',

        // B2B, Startups & Modern Architecture
        'startup web development',
        'websites for startups',
        'b2b web development',
        'b2b website design',
        'Next.js web development',
        'React Three Fiber',
        'WebGL 3D websites',
        'cinematic motion',
        'GSAP animation',
        'high performance websites',
        'WordPress alternative custom development',
        'creative technology studio',

        // US (United States / NYC / SF)
        'web development agency USA',
        'web design studio NYC',
        'creative web agency New York',
        'custom software and web development US',

        // UK (United Kingdom / London)
        'web design studio London UK',
        'bespoke web development agency UK',
        'creative digital agency London',
        'B2B web design London',

        // UAE (Dubai / Abu Dhabi)
        'web design studio Dubai UAE',
        'luxury website design Dubai',
        'best web development agency Dubai',
        'custom web design Abu Dhabi',

        // India — Kolkata & Mumbai
        'web design studio Kolkata',
        'custom web development Kolkata',
        'best web development company in Kolkata',
        'bespoke website designers Kolkata',
        'creative web design agency Mumbai',
        'custom web development company Mumbai',
        'UI UX design agency Mumbai',
        'top website development agency Mumbai',

        // Australia (AUS / Sydney / Melbourne)
        'web design studio Sydney Australia',
        'creative digital design studio Melbourne',
        'custom web development agency Australia',

        // Singapore
        'web design studio Singapore',
        'creative web development agency Singapore',
        'best UI UX design agency Singapore',
        'enterprise web development Singapore',

        // Hong Kong
        'web design studio Hong Kong',
        'luxury corporate web development Hong Kong',
        'creative digital agency Hong Kong',
    ],
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
        title: 'Galileo & Duke | Premium Web Development & Digital Design Studio',
        description: 'Bespoke web experiences, cinematic 3D motion, and high-performance digital flagships engineered for startups and B2B leaders.',
        siteName: 'Galileo & Duke',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Galileo & Duke | Premium Web Development & Digital Design Studio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Galileo & Duke | Premium Web Development & Digital Design Studio',
        description: 'Bespoke web experiences, cinematic 3D motion, and high-performance digital flagships engineered for startups and B2B leaders.',
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
    verification: {
        google: 'google6ba34fe07bc1101a',
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
                '@type': ['ProfessionalService', 'Organization'],
                '@id': `${siteUrl}/#organization`,
                name: 'Galileo & Duke',
                alternateName: [
                    'Galileo and Duke',
                    'Galileo & Duke Studio',
                    'Galileo and Duke Studio',
                    'Galileo & Duke Agency',
                    'galileoandduke'
                ],
                url: siteUrl,
                logo: `${siteUrl}/icon.png`,
                email: 'studio@galileoandduke.com',
                priceRange: '$$$$',
                disambiguatingDescription: 'Galileo & Duke is an independent digital design and premium web development studio founded by Moksh and Varul, engineering bespoke websites, 3D interactive experiences, and digital flagships for B2B enterprises and startups.',
                description: 'Galileo & Duke is an independent design and bespoke web development studio founded by Moksh and Varul. We build web experiences that transcend templates — scroll-driven storytelling, cinematic motion, and high-performance engineering for startups and modern businesses.',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Kolkata',
                    addressRegion: 'West Bengal',
                    addressCountry: 'IN',
                },
                geo: {
                    '@type': 'GeoCoordinates',
                    latitude: '22.5726',
                    longitude: '88.3639',
                },
                areaServed: [
                    { '@type': 'City', name: 'Kolkata' },
                    { '@type': 'City', name: 'Mumbai' },
                    { '@type': 'City', name: 'New York' },
                    { '@type': 'City', name: 'London' },
                    { '@type': 'City', name: 'Dubai' },
                    { '@type': 'City', name: 'Sydney' },
                    { '@type': 'Country', name: 'India' },
                    { '@type': 'Country', name: 'United States' },
                    { '@type': 'Country', name: 'United Kingdom' },
                    { '@type': 'Country', name: 'United Arab Emirates' },
                    { '@type': 'Country', name: 'Australia' },
                    { '@type': 'Country', name: 'Singapore' },
                    { '@type': 'AdministrativeArea', name: 'Hong Kong' },
                    { '@type': 'AdministrativeArea', name: 'Global' },
                ],
                knowsAbout: [
                    'Premium Web Development',
                    'B2B Web Development & Design',
                    'Startup Digital Flagships',
                    'Custom Web Application Engineering',
                    'Next.js & React Engineering',
                    'Interactive 3D & WebGL',
                    'GSAP Motion Systems',
                    'High-Performance Frontend Architecture',
                    'UI/UX Design Systems'
                ],
                founders: [
                    { '@type': 'Person', name: 'Moksh', jobTitle: 'Co-Founder & Creative Technologist' },
                    { '@type': 'Person', name: 'Varul', jobTitle: 'Co-Founder & Studio Director' },
                ],
                hasMap: 'https://www.google.com/maps/search/?api=1&query=Galileo+%26+Duke&query_place_id=ChIJiWgaBx-1VYIRHPidPtw135M',
                sameAs: [
                    'https://github.com/MOKSH1471',
                    'https://www.instagram.com/galileoandduke/',
                    'https://linkedin.com/company/galileo-duke',
                    'https://twitter.com/galileoduke',
                    'https://g.page/r/CRz4nT7cNd-TEBM',
                    'https://g.page/r/CRz4nT7cNd-TEBM/review',
                    'https://search.google.com/local/writereview?placeid=ChIJiWgaBx-1VYIRHPidPtw135M',
                    'https://www.google.com/maps/search/?api=1&query=Galileo+%26+Duke&query_place_id=ChIJiWgaBx-1VYIRHPidPtw135M',
                ],
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: 'Premium Web Development & Design Services',
                    itemListElement: [
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Premium Startup & B2B Web Development',
                                description: 'Custom-built, high-converting digital flagships and web applications engineered with Next.js, TypeScript, and modern headless architectures. Zero template bloat, sub-second global performance.',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Interactive 3D & Spatial Web Experiences',
                                description: 'Bespoke browser experiences incorporating Three.js, React Three Fiber, physics simulations, and custom GLSL shaders.',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'Custom UI/UX Design Systems & Motion Choreography',
                                description: 'Brand-led digital design systems, custom typography, and 60fps GSAP scroll interactions that elevate brands above template aesthetics.',
                            },
                        },
                        {
                            '@type': 'Offer',
                            itemOffered: {
                                '@type': 'Service',
                                name: 'WordPress to Custom Modern Stack Migration',
                                description: 'Modernizing legacy WordPress sites into secure, fast, and scalable Next.js web applications.',
                            },
                        },
                    ],
                },
            },
            {
                '@type': 'WebSite',
                '@id': `${siteUrl}/#website`,
                url: siteUrl,
                name: 'Galileo & Duke',
                alternateName: 'Galileo and Duke',
                description: 'Premium web development, cinematic motion, and creative engineering studio for startups and B2B leaders.',
                publisher: {
                    '@id': `${siteUrl}/#organization`,
                },
            },
        ],
    };

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${signature.variable} font-sans relative`} suppressHydrationWarning>
                {/* Security: Controlled JSON-LD schema generated from static site metadata */}
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
