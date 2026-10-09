'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    X, 
    ExternalLink, 
    Github, 
    ChevronRight, 
    CheckCircle2, 
    Maximize2, 
    ArrowUpRight, 
    ArrowLeft, 
    Layers, 
    LayoutGrid, 
    Compass, 
    FileText, 
    Sparkles, 
    Terminal, 
    Mail 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { portfolioData } from '@/data/portfolio';

// Helper to render text with bold markers (**text**)
const renderRichText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-bold text-foreground bg-primary/10 px-1 rounded mx-0.5">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
    });
};

// --- Vertical Gallery Component ---
const ProjectGallery = ({
    images,
    onImageClick,
}: {
    images: string[];
    onImageClick: (img: string) => void;
}) => {
    const [showAll, setShowAll] = useState(false);
    const visibleImages = showAll ? images : images.slice(0, 3);

    return (
        <div className="flex flex-col gap-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {visibleImages.map((img, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                        className={cn(
                            "group relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 shadow-2xl cursor-zoom-in",
                            idx === 0 && visibleImages.length % 2 === 1 ? "md:col-span-2" : ""
                        )}
                        onClick={() => onImageClick(img)}
                    >
                        <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950 flex items-center justify-center">
                            {/* Ambient backdrop */}
                            <Image
                                src={img}
                                alt=""
                                aria-hidden="true"
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="absolute inset-0 object-cover blur-2xl opacity-20 scale-110 pointer-events-none"
                            />
                            <Image
                                src={img}
                                alt={`Showcase Visual ${idx + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="relative z-10 object-contain md:object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            
                            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 text-[11px] font-mono text-white flex items-center gap-2">
                                    <span>FIGURE 0{idx + 1}</span>
                                    <Maximize2 className="w-3 h-3 text-primary" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {images.length > 3 && (
                <div className="flex justify-center pt-4">
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="px-8 py-3 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 transition-colors text-xs font-mono tracking-widest uppercase flex items-center gap-2 text-white"
                    >
                        <span>{showAll ? "Show Fewer Views" : `View All ${images.length} Imagery Assets`}</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform duration-300", showAll ? "-rotate-90" : "rotate-90")} />
                    </button>
                </div>
            )}
        </div>
    );
};

export function ProjectPageContent({ project }: { project: Project; isLowPowerMode?: boolean }) {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleExit = () => {
        router.push('/projects');
    };

    // Next / Previous Flagships
    const { prevProject, nextProject, otherProjects } = useMemo(() => {
        const all = portfolioData.projects || [];
        const currentIndex = all.findIndex(p => p.slug === project.slug);
        const prev = currentIndex > 0 ? all[currentIndex - 1] : all[all.length - 1];
        const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : all[0];
        const others = all.filter(p => p.slug !== project.slug);
        return { prevProject: prev, nextProject: next, otherProjects: others };
    }, [project.slug]);

    return (
        <div className="min-h-screen bg-background text-foreground pb-24 pt-28 sm:pt-36">

            {/* 1. HEADER SECTION (Editorial Case Study Header) */}
            <div className="container max-w-7xl mx-auto px-6 mb-12 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Back Link */}
                    <div className="flex items-center gap-4 mb-8">
                        <button
                            onClick={handleExit}
                            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-white transition-colors group cursor-pointer"
                        >
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            <span>Return to All Work</span>
                        </button>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            {project.developmentStage || 'Production Flagship'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-300">
                            {project.category || 'Agency Showcase'}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-neutral-400">
                            {project.customTimeline || '2024'}
                        </span>
                    </div>

                    {/* Main Title & Tagline */}
                    <div className="w-full max-w-5xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground mb-6 uppercase leading-[1.05]">
                            {project.title}
                        </h1>

                        {project.tagline && (
                            <p className="text-xl sm:text-2xl md:text-3xl text-neutral-300 font-serif italic mb-6 leading-relaxed">
                                {project.tagline}
                            </p>
                        )}

                        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-3xl">
                            {project.description}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* 2. HERO IMAGE BANNER (Widescreen 16:9 Frame) */}
            <div className="container max-w-7xl mx-auto px-6 mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="relative w-full aspect-video md:aspect-[16/9] max-h-[72vh] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 group cursor-zoom-in flex items-center justify-center"
                    onClick={() => project.image && setSelectedImage(project.image)}
                >
                    {/* Ambient blurred backdrop to frame aspect variances */}
                    <Image 
                        src={project.image || `/project/${project.slug}/hero.jpg`}
                        alt=""
                        aria-hidden="true"
                        fill
                        sizes="100vw"
                        priority
                        className="absolute inset-0 object-cover blur-3xl opacity-30 scale-110 pointer-events-none"
                    />
                    <Image
                        src={project.image || `/project/${project.slug}/hero.jpg`}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1280px) 100vw, 1200px"
                        priority
                        className="relative z-10 object-contain md:object-cover object-center transition-transform duration-700 group-hover:scale-[1.01]"
                    />
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    
                    <div className="absolute bottom-6 right-6 z-20 px-4 py-2 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono text-white flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Maximize2 className="w-3.5 h-3.5 text-primary" />
                        <span>View High-Res Master</span>
                    </div>
                </motion.div>
            </div>

            {/* 3. DOSSIER METADATA MATRIX */}
            <div className="container max-w-7xl mx-auto px-6 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 py-8 font-mono">
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                            Discipline / Type
                        </span>
                        <span className="text-sm font-bold text-white">
                            {project.projectType || project.category || 'Digital Flagship'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                            Client / Context
                        </span>
                        <span className="text-sm font-bold text-white">
                            {project.client || 'Galileo & Duke Studio'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                            Studio Role
                        </span>
                        <span className="text-sm font-bold text-white">
                            {project.role || 'Design & Engineering'}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
                            Core Architecture
                        </span>
                        <span className="text-sm font-bold text-white truncate">
                            {project.techStack.slice(0, 3).join(', ')}
                        </span>
                    </div>
                </div>
            </div>

            {/* 4. MAIN CONTENT GRID */}
            <div className="container max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                    {/* LEFT COLUMN: Main Case Study Flow (8 cols) */}
                    <div className="lg:col-span-8 space-y-20">

                        {/* BRIEF & STRATEGY */}
                        {project.brief && (
                            <section id="brief">
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <Compass className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-mono text-sm">
                                        The Brief & Design Objective
                                    </h2>
                                </div>
                                <div className="p-8 rounded-2xl bg-neutral-900/40 border border-white/10 backdrop-blur-sm">
                                    <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-serif italic">
                                        "{project.brief}"
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* DETAILED NARRATIVE */}
                        <section id="overview">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                                    <FileText className="w-5 h-5" />
                                </span>
                                <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-mono text-sm">
                                    Architectural Narrative
                                </h2>
                            </div>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-neutral-300 leading-relaxed">
                                <p className="text-base sm:text-lg">
                                    {project.longDescription || project.description}
                                </p>
                            </div>
                        </section>

                        {/* DELIVERABLES & CORE CAPABILITIES */}
                        {project.deliverables && project.deliverables.length > 0 && (
                            <section id="deliverables">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                        <Layers className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-mono text-sm">
                                        Delivered Scope & Capabilities
                                    </h2>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.deliverables.map((item, idx) => (
                                        <div 
                                            key={idx}
                                            className="p-5 rounded-xl bg-neutral-900/40 border border-white/10 flex items-start gap-3"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                                            <span className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* TECHNICAL CHALLENGES & ARCHITECTURAL SOLUTIONS */}
                        {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
                            <section id="engineering">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                                        <Terminal className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-mono text-sm">
                                        Technical Challenges & Engineered Solutions
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    {project.challengesAndSolutions.map((item, idx) => (
                                        <div 
                                            key={idx} 
                                            className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-4"
                                        >
                                            <div>
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-1">
                                                    Engineering Challenge 0{idx + 1}
                                                </span>
                                                <h4 className="text-base sm:text-lg font-bold text-white">
                                                    {item.problem}
                                                </h4>
                                            </div>
                                            <div className="pt-3 border-t border-white/10">
                                                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block mb-1">
                                                    Architectural Solution
                                                </span>
                                                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                                                    {item.solution}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* MEASURED OUTCOMES */}
                        {project.outcomes && project.outcomes.length > 0 && (
                            <section id="outcomes">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                                        <Sparkles className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-mono text-sm">
                                        Commercial & Production Outcomes
                                    </h2>
                                </div>
                                <div className="space-y-3">
                                    {project.outcomes.map((item, idx) => (
                                        <div 
                                            key={idx}
                                            className="p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 mt-2" />
                                            <span className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-medium">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* VISUAL ASSETS & GALLERY */}
                        {project.galleryImages && project.galleryImages.length > 0 && (
                            <section id="gallery">
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="p-2 rounded-lg bg-primary/10 text-primary">
                                        <LayoutGrid className="w-5 h-5" />
                                    </span>
                                    <h2 className="text-2xl font-bold tracking-tight text-white uppercase font-mono text-sm">
                                        Visual Gallery & Interface Assets
                                    </h2>
                                </div>
                                <ProjectGallery
                                    images={project.galleryImages}
                                    onImageClick={(img) => setSelectedImage(img)}
                                />
                            </section>
                        )}

                    </div>

                    {/* RIGHT COLUMN: Sticky Studio Sidebar (4 cols) */}
                    <div className="lg:col-span-4 relative">
                        <div className="sticky top-28 space-y-8">

                            {/* Project Access & Repo Links */}
                            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md space-y-5">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                                    Project Access
                                </h3>

                                <div className="space-y-3">
                                    {project.demoUrl && project.demoUrl !== '#' && (
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-lg"
                                        >
                                            <span>Launch Live Showcase</span>
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}

                                    {project.repoUrl && project.repoUrl !== '#' && (
                                        <a
                                            href={project.repoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors"
                                        >
                                            <Github className="w-4 h-4" />
                                            <span>Source Code</span>
                                            <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                                        </a>
                                    )}

                                    <Link
                                        href={`/contact?project=${encodeURIComponent(project.title)}`}
                                        className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-primary/15 border border-primary/30 hover:bg-primary/25 text-primary font-bold text-xs uppercase tracking-wider transition-colors"
                                    >
                                        <Mail className="w-4 h-4" />
                                        <span>Inquire Similar Project</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Tech Stack Matrix */}
                            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                                    Technologies Employed
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.techStack.map((tech) => (
                                        <span 
                                            key={tech} 
                                            className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-neutral-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Index */}
                            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/10 backdrop-blur-md">
                                <h3 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4">
                                    Dossier Contents
                                </h3>
                                <ul className="space-y-2.5 text-xs font-mono text-neutral-400">
                                    {project.brief && (
                                        <li><a href="#brief" className="hover:text-white transition-colors block">→ 01. Strategic Brief</a></li>
                                    )}
                                    <li><a href="#overview" className="hover:text-white transition-colors block">→ 02. Narrative Architecture</a></li>
                                    {project.deliverables && (
                                        <li><a href="#deliverables" className="hover:text-white transition-colors block">→ 03. Delivered Scope</a></li>
                                    )}
                                    {project.challengesAndSolutions && (
                                        <li><a href="#engineering" className="hover:text-white transition-colors block">→ 04. Engineering Solutions</a></li>
                                    )}
                                    {project.outcomes && (
                                        <li><a href="#outcomes" className="hover:text-white transition-colors block">→ 05. Measured Outcomes</a></li>
                                    )}
                                    {project.galleryImages && (
                                        <li><a href="#gallery" className="hover:text-white transition-colors block">→ 06. Visual Assets</a></li>
                                    )}
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* 5. NEXT / PREVIOUS FLAGSHIP NAVIGATION */}
            <div className="container max-w-7xl mx-auto px-6 mt-32 border-t border-white/10 pt-16">
                <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        Selected Studio Works
                    </span>
                    <Link href="/projects" className="text-xs font-mono uppercase tracking-widest text-primary hover:underline">
                        View Complete Showcase →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* Previous */}
                    <Link
                        href={`/projects/${prevProject.slug}`}
                        className="group block p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-white/20 transition-all"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                            ← Previous Flagship
                        </span>
                        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {prevProject.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                            {prevProject.category}
                        </p>
                    </Link>

                    {/* Next */}
                    <Link
                        href={`/projects/${nextProject.slug}`}
                        className="group block p-6 rounded-2xl bg-neutral-900/40 border border-white/10 hover:border-white/20 transition-all text-right"
                    >
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block mb-2">
                            Next Flagship →
                        </span>
                        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                            {nextProject.title}
                        </h4>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-1">
                            {nextProject.category}
                        </p>
                    </Link>
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                        className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
                    >
                        <img
                            src={selectedImage}
                            alt="Lightbox Preview"
                            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
                        />
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
