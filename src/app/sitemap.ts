import type { MetadataRoute } from 'next';
import { portfolioData } from '@/data/portfolio';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://galileoandduke.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date();

    const staticRoutes = [
        { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
        { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/skills', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/experience', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/gallery', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
    ].map(({ path, priority, changeFrequency }) => ({
        url: `${baseUrl}${path}`,
        lastModified,
        changeFrequency,
        priority,
    }));

    const projectRoutes = portfolioData.projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...projectRoutes];
}
