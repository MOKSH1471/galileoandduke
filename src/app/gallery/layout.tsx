import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Visual Archive & Motion Gallery',
    description: 'Explore the Galileo & Duke visual archive — curated motion studies, interaction experiments, and atmospheric art direction.',
    alternates: {
        canonical: '/gallery',
    },
    openGraph: {
        title: 'Visual Archive & Motion Gallery | Galileo & Duke',
        description: 'Curated motion studies, interaction experiments, and atmospheric art direction by Galileo & Duke.',
        url: '/gallery',
    },
};

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
