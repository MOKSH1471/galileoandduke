import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Capabilities',
    description: 'Websites, interactions, and tools built around your business. Bespoke web design, motion choreography, and automated workflows.',
};

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
