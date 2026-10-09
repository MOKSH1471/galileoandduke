import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';
import { ProjectPageContent } from '@/components/projects/ProjectPageContent';
import { getProjectImages } from '@/app/actions/getProjectImages';

export async function generateStaticParams() {
    return portfolioData.projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const project = portfolioData.projects.find((p) => p.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }

    const title = `${project.title} | Case Study`;
    const description = project.description || `Explore ${project.title}, a bespoke digital build by Galileo & Duke.`;
    const ogImage = project.image || `/project/${slug}/hero.jpg`;

    return {
        title,
        description,
        alternates: {
            canonical: `/projects/${slug}`,
        },
        openGraph: {
            title: `${project.title} | Galileo & Duke`,
            description,
            url: `/projects/${slug}`,
            type: 'article',
            images: ogImage ? [{ url: ogImage, alt: project.title }] : undefined,
        },
        twitter: {
            card: 'summary_large_image',
            title: `${project.title} | Galileo & Duke`,
            description,
            images: ogImage ? [ogImage] : undefined,
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = portfolioData.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    // Fetch dynamic images from public/project folder
    const galleryImages = await getProjectImages(slug, project.title);

    // If dynamic images found, override the project data
    const updatedProject = {
        ...project,
        image: galleryImages.length > 0 ? galleryImages[0] : project.image, // First image as Hero
        galleryImages: galleryImages.length > 0 ? galleryImages : project.galleryImages, // All images for gallery
    };

    return <ProjectPageContent project={updatedProject} />;
}
