"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Box, Cpu, Layers } from "lucide-react";
import Link from "next/link";

interface ServicePillar {
    id: string;
    number: string;
    title: string;
    tagline: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    deliverables: string[];
    tech: string[];
}

const SERVICES: ServicePillar[] = [
    {
        id: "cinematic-motion",
        number: "01",
        title: "Cinematic Motion & Scroll Storytelling",
        tagline: "Fluid, physics-based choreographies engineered for retention.",
        description: "We turn websites into immersive digital narratives. By orchestrating scroll-scrubbed sequences, kinetic typography, and fluid spring physics, we create journeys visitors remember.",
        icon: Sparkles,
        deliverables: [
            "GSAP ScrollTrigger Architecture",
            "Smooth-Scroll Choreography (Lenis)",
            "Kinetic Typography & Micro-Animations",
            "Hardware-Accelerated 60fps Performance"
        ],
        tech: ["GSAP", "Framer Motion", "Lenis", "CSS Houdini"]
    },
    {
        id: "spatial-3d",
        number: "02",
        title: "Spatial Environments & Real-Time 3D",
        tagline: "Interactive 3D environments running natively in the browser.",
        description: "Transcending flat screens with spatial depth. We craft custom Three.js and React Three Fiber environments, interactive object viewers, and shader-driven light effects.",
        icon: Box,
        deliverables: [
            "React Three Fiber (R3F) Interactive Scenes",
            "Custom GLSL Procedural Shaders",
            "Physics Simulation (Rapier)",
            "Low-Poly GPU Optimization & Asset Streaming"
        ],
        tech: ["Three.js", "React Three Fiber", "GLSL Shaders", "Rapier"]
    },
    {
        id: "bespoke-flagships",
        number: "03",
        title: "Bespoke Digital Flagships",
        tagline: "Enterprise-grade web engineering engineered to endure.",
        description: "Built on Next.js App Router and TypeScript, our web flagships are fast, robust, and search-optimized. We engineer digital flagships that convert discerning audiences without compromise.",
        icon: Cpu,
        deliverables: [
            "Next.js App Router Architecture",
            "Sub-Second Core Web Vitals & Edge Caching",
            "Modern Semantic HTML5 & SEO Engineering",
            "Cross-Platform Responsive Precision"
        ],
        tech: ["Next.js", "React 19", "TypeScript", "Tailwind CSS"]
    },
    {
        id: "creative-direction",
        number: "04",
        title: "Creative Direction & Design Systems",
        tagline: "Tailored brand narratives and scalable interface systems.",
        description: "From celestial wonder to classical craft, we define unique aesthetic languages for visionary brands. Every color token, typography pairing, and spacing grid is built with deliberate purpose.",
        icon: Layers,
        deliverables: [
            "Spatial Art Direction & Typography Systems",
            "Comprehensive Tokenized Component Libraries",
            "Interactive Prototypes & Motion Guidelines",
            "End-to-End Brand Digital Transformation"
        ],
        tech: ["Figma", "Design Tokens", "Typography", "Art Direction"]
    }
];

export default function ExpertiseSection() {
    return (
        <section id="capabilities" className="relative py-24 md:py-36 bg-background overflow-hidden">
            {/* Subtle Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(to right, currentColor 1px, transparent 1px)',
                    backgroundSize: '48px 48px'
                }}
            />

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24 pb-8 border-b border-foreground/10">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-muted-foreground font-mono text-[11px] font-bold uppercase tracking-[0.2em]">
                            <span>Agency Capabilities</span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.05]">
                            What We Build for Discerning Brands.
                        </h2>
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground max-w-md font-medium leading-relaxed">
                        We combine cinematic art direction with obsessive engineering rigor to produce web flagships that set industry standards.
                    </p>
                </div>

                {/* 4-Card Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {SERVICES.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative rounded-[2rem] border border-foreground/10 bg-card/40 dark:bg-zinc-900/30 p-8 md:p-12 hover:border-foreground/25 hover:bg-card/70 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-2xl"
                            >
                                {/* Glow Accent */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700 pointer-events-none" />

                                <div>
                                    {/* Top Metadata */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-3">
                                            <div className="p-3 rounded-2xl bg-foreground/5 text-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="font-mono text-xs font-bold text-muted-foreground uppercase tracking-widest">
                                                {service.number} // SERVICE
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center text-muted-foreground group-hover:text-foreground group-hover:border-foreground/30 transition-all">
                                            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </div>
                                    </div>

                                    {/* Title & Tagline */}
                                    <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm font-semibold text-muted-foreground/80 mb-4 tracking-wide uppercase font-mono text-[11px]">
                                        {service.tagline}
                                    </p>
                                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                                        {service.description}
                                    </p>
                                </div>

                                {/* Deliverables List */}
                                <div className="pt-6 border-t border-foreground/10 space-y-4">
                                    <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
                                        Verified Deliverables
                                    </div>
                                    <ul className="space-y-2">
                                        {service.deliverables.map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-foreground/85">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Stack Badges */}
                                    <div className="flex flex-wrap gap-1.5 pt-4">
                                        {service.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground font-mono text-[10px] font-medium tracking-wider"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Action Bar */}
                <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-foreground/5 border border-foreground/10">
                    <div className="space-y-1 text-center sm:text-left">
                        <h4 className="font-bold text-foreground text-base md:text-lg">
                            Have a specific flagship or interactive experience in mind?
                        </h4>
                        <p className="text-xs md:text-sm text-muted-foreground">
                            We tailor our motion systems and technical architecture to your specific brand goals.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-full bg-foreground text-background font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shrink-0"
                    >
                        Initiate Project
                    </Link>
                </div>
            </div>
        </section>
    );
}
