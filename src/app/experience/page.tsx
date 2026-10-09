'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
    Compass, 
    Layers, 
    Code2, 
    Rocket, 
    ArrowRight, 
    CheckCircle2, 
    Users, 
    FileText 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessPhase {
    number: string;
    id: string;
    title: string;
    subtitle: string;
    timeline: string;
    icon: React.ComponentType<{ className?: string }>;
    overview: string;
    clientParticipation: string;
    deliverables: string[];
    focusAreas: string[];
}

const PROCESS_PHASES: ProcessPhase[] = [
    {
        number: "01",
        id: "architecture",
        title: "Architecture, Design System & Wireframes",
        subtitle: "Review, sign-off, and the full visual identity foundation for your flagship.",
        timeline: "Weeks 1 – 2",
        icon: Compass,
        overview: "We begin every engagement with a comprehensive architecture sprint. We define your technical stack, map all user journeys, and craft a design system — custom banners, icons, layout graphics, adaptive fluid grids for mobile, tablet, and desktop — that sets the visual language for the entire build.",
        clientParticipation: "Discovery kick-off workshop with co-founders Moksh & Varul. Page-by-page wireframe review and formal design sign-off milestone.",
        deliverables: [
            "Interactive Code Prototyping",
            "Visual Identity Creation: Custom banners, icons & layout graphics",
            "Adaptive Layouts: Fluid grids for Mobile, Tablet & Desktop",
            "Design System: Consistent typography (Inter/Manrope) & color palette",
            "Milestone Architecture & Technical Blueprint Sign-off"
        ],
        focusAreas: ["Brand Positioning", "Technical Scope", "Wireframe Sign-off", "Design System"]
    },
    {
        number: "02",
        id: "core-development",
        title: "Core Engineering",
        subtitle: "Next.js setup, API development, and database schema — the robust backbone of your flagship.",
        timeline: "Weeks 3 – 4",
        icon: Code2,
        overview: "With a signed design system in hand, we engineer the full production codebase. We implement Next.js 14 with server-side rendering for SEO performance, dynamic product catalogues with filterable grid systems, a headless CMS (Sanity) for content management, and a clean modular React component architecture built for future scaling.",
        clientParticipation: "Weekly build drops to a private staging environment. Live review checkpoints for each core feature.",
        deliverables: [
            "Next.js 14 Framework with SSR (Server-Side Rendering) Engine",
            "Dynamic Product Catalogue: Filterable grid for generators/equipment",
            "Headless CMS (Sanity): Custom Admin Panel for products/content",
            "React Component Library: Modular architecture for future scaling",
            "API Routes & Database Schema Setup"
        ],
        focusAreas: ["Clean TypeScript", "SSR Performance", "CMS Integration", "Component Architecture"]
    },
    {
        number: "03",
        id: "cms-infra",
        title: "CMS Configuration, Content Entry & Performance",
        subtitle: "Global CDN deployment, image optimization, technical SEO, and content population.",
        timeline: "Weeks 5 – 6",
        icon: Layers,
        overview: "We configure the complete production infrastructure: global CDN via Vercel/AWS edge network for sub-second load times worldwide, an image optimization pipeline (auto-conversion to WebP), technical SEO with JSON-LD schema for rich Google results, Cloudflare integration for DNS management and caching, and full content entry into the CMS.",
        clientParticipation: "Content review and approval session. SEO keyword alignment meeting for meta titles and schema.",
        deliverables: [
            "Global CDN (Edge Network): Hosting via Vercel/AWS",
            "Image Optimization Pipeline: Auto-conversion to WebP format",
            "Technical SEO: JSON-LD Schema for rich Google results",
            "Cloudflare Integration: DNS management and caching",
            "Full CMS Content Entry & Population"
        ],
        focusAreas: ["Edge Caching", "Image Optimization", "Technical SEO", "DNS & Infra"]
    },
    {
        number: "04",
        id: "security-launch",
        title: "Security Audit, Load Testing & Go-Live",
        subtitle: "UAT, security hardening, cross-browser QA, and zero-downtime flagship launch.",
        timeline: "Weeks 7 – 8",
        icon: Rocket,
        overview: "Before a single visitor lands, we run comprehensive security hardening, user acceptance testing, and full cross-browser QA across Chrome, Safari, Edge, and Firefox. We enforce SSL/TLS encryption, configure security headers, implement spam protection, and conduct load testing to ensure your flagship performs flawlessly under real-world traffic.",
        clientParticipation: "Final UAT (User Acceptance Testing) walkthrough and go-live approval sign-off.",
        deliverables: [
            "SSL/TLS Encryption: HTTPS enforcement across all routes",
            "Security Headers: Protection against XSS/injection attacks",
            "Cross-Browser Testing: Chrome, Safari, Edge & Firefox",
            "Lead Capture Security: Spam protection on all contact forms",
            "Load Testing & Performance Validation",
            "Zero-Downtime Production Go-Live"
        ],
        focusAreas: ["Security Hardening", "Cross-Browser QA", "Load Testing", "Go-Live"]
    }
];

export default function ApproachPage() {
    const [activePhase, setActivePhase] = useState<number>(0);
    const current = PROCESS_PHASES[activePhase];
    const Icon = current.icon;

    return (
        <main className="relative min-h-screen bg-background pt-36 md:pt-48 pb-32 overflow-hidden selection:bg-primary/20">
            {/* Background Texture */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Hero Header */}
                <div className="max-w-3xl mb-16 md:mb-24">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-muted-foreground font-mono text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                        <span>Studio Methodology</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-foreground leading-[1.02] mb-6">
                        Our Approach.
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                        A disciplined 4-phase engagement process — from architecture sign-off to go-live — completed in 8 weeks with full transparency and zero-compromise craft.
                    </p>
                </div>

                {/* Phase Selection Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
                    {PROCESS_PHASES.map((phase, idx) => {
                        const isSelected = activePhase === idx;
                        const PhaseIcon = phase.icon;
                        return (
                            <button
                                key={phase.id}
                                onClick={() => setActivePhase(idx)}
                                className={cn(
                                    "p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between min-h-[140px]",
                                    isSelected
                                        ? "bg-foreground text-background border-foreground shadow-xl scale-[1.02]"
                                        : "bg-card/40 border-foreground/10 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                                )}
                            >
                                <div className="flex items-center justify-between w-full">
                                    <span className={cn(
                                        "font-mono text-xs font-bold uppercase tracking-widest",
                                        isSelected ? "text-background/70" : "text-muted-foreground"
                                    )}>
                                        Phase {phase.number}
                                    </span>
                                    <PhaseIcon className={cn("w-4 h-4", isSelected ? "text-background" : "text-foreground/60")} />
                                </div>
                                <div className="mt-4">
                                    <div className={cn(
                                        "text-xs font-mono mb-1",
                                        isSelected ? "text-background/80" : "text-primary font-medium"
                                    )}>
                                        {phase.timeline}
                                    </div>
                                    <h3 className={cn(
                                        "font-bold text-sm leading-snug",
                                        isSelected ? "text-background" : "text-foreground"
                                    )}>
                                        {phase.title.split('&')[0]}
                                    </h3>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Active Phase Deep Dive */}
                <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="rounded-[2.5rem] border border-foreground/10 bg-card/60 dark:bg-zinc-900/40 p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl"
                >
                    {/* Glow Accent */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                        {/* Left Overview Column */}
                        <div className="lg:col-span-7 space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3.5 rounded-2xl bg-foreground/5 text-foreground">
                                    <Icon className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                                        Phase {current.number} // {current.timeline}
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-foreground tracking-tight">
                                        {current.title}
                                    </h2>
                                </div>
                            </div>

                            <p className="text-lg md:text-xl font-medium text-foreground/90 leading-relaxed">
                                {current.subtitle}
                            </p>

                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                {current.overview}
                            </p>

                            {/* Client Participation Callout */}
                            <div className="p-6 rounded-2xl bg-foreground/5 border border-foreground/10 space-y-2">
                                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-foreground">
                                    <Users className="w-4 h-4 text-primary" />
                                    <span>Client Collaboration &amp; Input</span>
                                </div>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                    {current.clientParticipation}
                                </p>
                            </div>

                            {/* Focus Badges */}
                            <div className="space-y-2">
                                <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                                    Key Focus Areas
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {current.focusAreas.map(area => (
                                        <span
                                            key={area}
                                            className="px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 font-mono text-xs text-foreground/80 font-medium"
                                        >
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Deliverables Column */}
                        <div className="lg:col-span-5 p-8 rounded-3xl bg-background/80 dark:bg-black/60 border border-foreground/10 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <FileText className="w-5 h-5 text-primary" />
                                    <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                                        Verified Deliverables
                                    </h4>
                                </div>
                                <ul className="space-y-4">
                                    {current.deliverables.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm md:text-base text-foreground/90 font-medium">
                                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-8 pt-6 border-t border-foreground/10 flex items-center justify-between text-xs font-mono text-muted-foreground">
                                <span>Typical Duration:</span>
                                <span className="text-foreground font-bold">{current.timeline}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Bottom CTA Strip */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-3xl bg-foreground text-background">
                    <div className="space-y-1 text-center sm:text-left">
                        <h3 className="text-xl md:text-2xl font-black">
                            Ready to start your 8-week flagship build?
                        </h3>
                        <p className="text-xs md:text-sm text-background/70 font-medium">
                            Book a direct consultation with founders Moksh &amp; Varul to kick off Phase 01.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-background text-foreground font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shrink-0"
                    >
                        <span>Initiate Phase 01</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </main>
    );
}
