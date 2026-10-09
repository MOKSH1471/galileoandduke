import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Approach & Process',
    description: 'The Galileo & Duke engagement lifecycle — our 4-phase framework covering discovery, technical architecture, interactive motion prototyping, and production deployment.',
    alternates: {
        canonical: '/experience',
    },
    openGraph: {
        title: 'Approach & Process | Galileo & Duke',
        description: 'Our 4-phase engagement framework: Discovery, Architecture, Motion Prototyping, and Production Deployment.',
        url: '/experience',
    },
};

export default function ExperienceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
