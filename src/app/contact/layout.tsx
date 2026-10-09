import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Connect with Galileo & Duke for digital commissions, technical architecture, and creative engineering partnerships. Send us your inquiry or book an exploratory consultation.',
    alternates: {
        canonical: '/contact',
    },
    openGraph: {
        title: 'Contact | Galileo & Duke',
        description: 'Connect with Galileo & Duke for digital commissions, technical architecture, and creative engineering partnerships.',
        url: '/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
