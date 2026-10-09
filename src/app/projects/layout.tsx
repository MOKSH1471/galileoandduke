import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Selected Works',
    description: 'Flagship digital experiences, interactive web applications, and creative engineering builds crafted by Galileo & Duke.',
    alternates: {
        canonical: '/projects',
    },
    openGraph: {
        title: 'Selected Works | Galileo & Duke',
        description: 'Flagship digital experiences, interactive web applications, and creative engineering builds crafted by Galileo & Duke.',
        url: '/projects',
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
