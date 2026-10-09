import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Capabilities & Services',
    description: 'Websites, interactions, and tools built around your business. Bespoke web design, motion choreography, and automated workflows crafted by Galileo & Duke.',
    alternates: {
        canonical: '/skills',
    },
    openGraph: {
        title: 'Capabilities & Services | Galileo & Duke',
        description: 'Bespoke web design, motion choreography, 3D interaction, and automated digital workflows.',
        url: '/skills',
    },
};

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
