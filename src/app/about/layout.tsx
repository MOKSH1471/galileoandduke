import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About the Studio',
    description: 'Learn about Galileo & Duke — an independent design and bespoke engineering studio founded by Moksh and Varul. Discover our dual heritage, atelier philosophy, and creative direction.',
    alternates: {
        canonical: '/about',
    },
    openGraph: {
        title: 'About the Studio | Galileo & Duke',
        description: 'Dual heritage, atelier philosophy, and bespoke digital craftsmanship founded by Moksh and Varul.',
        url: '/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
