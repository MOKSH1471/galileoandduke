'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
    Compass, 
    ArrowRight, 
    ArrowUpRight, 
    X,
    Sparkles,
    Layers,
    Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { portfolioData } from '@/data/portfolio';

export interface CelestialBody {
    id: string;
    name: string;
    astronomicalName: string;
    distanceAU: string;
    sizeVmin: number;
    orbitRadiusVmin: number;
    speedMultiplier: number;
    initialAngle: number;
    sphereGradient: string;
    glowColor: string;
    hasRings?: boolean;
    moons?: { name: string; distanceVmin: number; speed: number; color: string; sizeVmin: number }[];
    // Associated Agency Project
    projectSlug?: string;
    projectTitle: string;
    projectRole: string;
    projectTagline: string;
    projectCategory: string;
    projectClient: string;
    projectYear: string;
    projectImage?: string;
    projectTechStack?: string[];
    projectDescription: string;
}

export function OrbitalWorkSection({ isFullPage = false }: { isFullPage?: boolean }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeBody, setActiveBody] = useState<CelestialBody | null>(null);
    const [hoveredBody, setHoveredBody] = useState<CelestialBody | null>(null);

    // Retrieve real portfolio projects
    const rawProjects = useMemo(() => portfolioData.projects ?? [], []);

    const nxElit = rawProjects.find((p) => p.slug === 'nx-elit');
    const crystal4u = rawProjects.find((p) => p.slug === 'crystal4u');
    const leadB = rawProjects.find((p) => p.slug === 'lead-b');

    // All 8 authentic planets with enlarged expansive radial spacing up to 54vmin
    // Spans wider across the viewport for a majestic, grand, immersive celestial Orrery
    const celestialBodies: CelestialBody[] = useMemo(() => [
        {
            id: 'mercury',
            name: 'Mercury',
            astronomicalName: '0.39 AU • Hermes',
            distanceAU: '0.39 AU',
            sizeVmin: 1.4,
            orbitRadiusVmin: 8.5,
            speedMultiplier: 2.8,
            initialAngle: 40,
            sphereGradient: 'radial-gradient(circle at 35% 35%, #f1f5f9 0%, #94a3b8 50%, #475569 100%)',
            glowColor: 'rgba(148, 163, 184, 0.4)',
            projectTitle: 'Rapid Telemetry Pipeline',
            projectRole: 'Internal Speed Engine',
            projectTagline: 'Sub-second CLI workflows, automated asset conversion & zero-latency execution.',
            projectCategory: 'Systems Engineering',
            projectClient: 'Galileo & Duke Internal',
            projectYear: '2024',
            projectDescription: 'Like Mercury sweeping swift in its tight solar lane, this suite powers our rapid-cycle CI/CD, image compression pipelines, and performance budgets.'
        },
        {
            id: 'venus',
            name: 'Venus',
            astronomicalName: '0.72 AU • Aphrodite',
            distanceAU: '0.72 AU',
            sizeVmin: 2.05,
            orbitRadiusVmin: 14.5,
            speedMultiplier: 2.1,
            initialAngle: 170,
            sphereGradient: 'radial-gradient(circle at 35% 35%, #fef08a 0%, #eab308 55%, #854d0e 100%)',
            glowColor: 'rgba(234, 179, 8, 0.45)',
            projectSlug: crystal4u?.slug || 'crystal4u',
            projectTitle: crystal4u?.title || 'Crystal4u',
            projectRole: crystal4u?.role || 'Luxury Gemstone Atelier',
            projectTagline: crystal4u?.tagline || 'Artisanal Mineral & Gemstone Digital Storefront',
            projectCategory: crystal4u?.category || 'Luxury & E-Commerce',
            projectClient: crystal4u?.client || 'Artisanal Gemstone Atelier',
            projectYear: crystal4u?.customTimeline || '2024',
            projectImage: crystal4u?.image || '/project/crystal4u/hero.jpg',
            projectTechStack: crystal4u?.techStack || ['Next.js', 'Tailwind CSS', 'Framer Motion'],
            projectDescription: crystal4u?.description || 'Curated gemstone flagship in antique gold on warm ivory with sensory product staging and energetic filtering.'
        },
        {
            id: 'earth',
            name: 'Earth & Luna',
            astronomicalName: '1.00 AU • Terra',
            distanceAU: '1.00 AU',
            sizeVmin: 2.5,
            orbitRadiusVmin: 21.5,
            speedMultiplier: 1.5,
            initialAngle: 305,
            sphereGradient: 'radial-gradient(circle at 35% 35%, #38bdf8 0%, #0284c7 50%, #0f172a 100%)',
            glowColor: 'rgba(56, 189, 248, 0.55)',
            moons: [
                { name: 'Luna', distanceVmin: 2.2, speed: 4.8, color: '#f1f5f9', sizeVmin: 0.6 }
            ],
            projectSlug: nxElit?.slug || 'nx-elit',
            projectTitle: nxElit?.title || 'NX Elit',
            projectRole: nxElit?.role || 'Boutique Hospitality Flagship',
            projectTagline: nxElit?.tagline || 'Boutique Hospitality Flagship & Reservation Inquiry Architecture',
            projectCategory: nxElit?.category || 'Hospitality & Luxury',
            projectClient: nxElit?.client || 'Boutique Luxury Hospitality',
            projectYear: nxElit?.customTimeline || '2024',
            projectImage: nxElit?.image || '/project/nx-elit/hero.jpg',
            projectTechStack: nxElit?.techStack || ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
            projectDescription: nxElit?.description || 'Boutique hotel design MVP and frontend inquiry interface for luxury hospitality, showcasing sensory visual presentation and bespoke room curation.'
        },
        {
            id: 'mars',
            name: 'Mars',
            astronomicalName: '1.52 AU • Ares',
            distanceAU: '1.52 AU',
            sizeVmin: 1.75,
            orbitRadiusVmin: 28.5,
            speedMultiplier: 1.1,
            initialAngle: 125,
            sphereGradient: 'radial-gradient(circle at 35% 35%, #f87171 0%, #dc2626 55%, #7f1d1d 100%)',
            glowColor: 'rgba(239, 68, 68, 0.45)',
            projectSlug: leadB?.slug || 'lead-b',
            projectTitle: leadB?.title || 'Lead B',
            projectRole: leadB?.role || 'Autonomous Sales Intelligence',
            projectTagline: leadB?.tagline || 'Internal Sales Intelligence & Prospecting Automation Pipeline',
            projectCategory: leadB?.category || 'Automation & Data',
            projectClient: leadB?.client || 'Galileo & Duke Internal Tooling',
            projectYear: leadB?.customTimeline || '2024',
            projectImage: leadB?.image || '/project/lead-b/hero.jpg',
            projectTechStack: leadB?.techStack || ['Python 3.11', 'Playwright', 'AsyncIO', 'Telegram API'],
            projectDescription: leadB?.description || 'Internal prospecting workflow automation pipeline combining headless browser crawling, contact data structuring, and instant Telegram notification alerts.'
        },
        {
            id: 'jupiter',
            name: 'Jupiter & 4 Moons',
            astronomicalName: '5.20 AU • Zeus',
            distanceAU: '5.20 AU',
            sizeVmin: 3.9,
            orbitRadiusVmin: 36,
            speedMultiplier: 0.7,
            initialAngle: 235,
            sphereGradient: 'radial-gradient(circle at 35% 35%, #fed7aa 0%, #f97316 45%, #7c2d12 85%, #451a03 100%)',
            glowColor: 'rgba(249, 115, 22, 0.45)',
            moons: [
                { name: 'Io', distanceVmin: 2.7, speed: 6.5, color: '#fef08a', sizeVmin: 0.42 },
                { name: 'Europa', distanceVmin: 3.3, speed: 5.2, color: '#e0f2fe', sizeVmin: 0.38 },
                { name: 'Ganymede', distanceVmin: 4.0, speed: 3.8, color: '#fed7aa', sizeVmin: 0.48 },
                { name: 'Callisto', distanceVmin: 4.7, speed: 2.6, color: '#cbd5e1', sizeVmin: 0.42 }
            ],
            projectTitle: 'Planetary Systems & Real-Time Canvases',
            projectRole: 'Creative Technology Labs',
            projectTagline: 'Experimental GLSL shaders, physics simulations & spatial 3D canvas storytelling.',
            projectCategory: 'Creative Technology',
            projectClient: 'Galileo & Duke Showcase',
            projectYear: '2024',
            projectTechStack: ['Three.js', 'React Three Fiber', 'Rapier', 'GLSL'],
            projectDescription: 'Directly honoring Galileo’s 1610 discovery of Jupiter’s four satellites — proving bodies orbit centers other than Earth — this celestial node hosts our dynamic physics environments and generative shader studies.'
        },
        {
            id: 'saturn',
            name: 'Saturn & Rings',
            astronomicalName: '9.58 AU • Chronos',
            distanceAU: '9.58 AU',
            sizeVmin: 3.2,
            orbitRadiusVmin: 43,
            speedMultiplier: 0.45,
            initialAngle: 15,
            sphereGradient: 'radial-gradient(circle at 35% 35%, #fef3c7 0%, #d97706 60%, #78350f 100%)',
            glowColor: 'rgba(217, 119, 6, 0.4)',
            hasRings: true,
            projectTitle: 'Design Architecture & Systems',
            projectRole: 'Enduring Pedigree',
            projectTagline: 'Scalable typography foundations, design tokens & performance budgets.',
            projectCategory: 'Design Systems',
            projectClient: 'Enterprise Standards',
            projectYear: '2024',
            projectTechStack: ['Tailwind CSS', 'Figma Tokens', 'Next.js 14', 'TypeScript'],
            projectDescription: 'Embodying our Duke heritage: noble pedigree, architectural restraint, and resilient system engineering designed to endure.'
        },
        {
            id: 'uranus',
            name: 'Uranus',
            astronomicalName: '19.2 AU • Caelus',
            distanceAU: '19.2 AU',
            sizeVmin: 2.5,
            orbitRadiusVmin: 49,
            speedMultiplier: 0.3,
            initialAngle: 195,
            sphereGradient: 'radial-gradient(circle at 35% 35%, #cffafe 0%, #06b6d4 50%, #0e7490 100%)',
            glowColor: 'rgba(6, 182, 212, 0.4)',
            projectTitle: '60fps Performance Engineering',
            projectRole: 'Low-Power & Motion Engine',
            projectTagline: 'Zero layout shift, GPU compositing & low-power device optimization.',
            projectCategory: 'Performance Engineering',
            projectClient: 'Studio Standard',
            projectYear: '2024',
            projectTechStack: ['Chrome Profiler', 'Lighthouse', 'Compositor Optimization'],
            projectDescription: 'The icy outer giant represents our uncompromising commitment: visual spectacle engineered to run at a continuous 60fps even on battery-constrained devices.'
        },
        {
            id: 'neptune',
            name: 'Neptune',
            astronomicalName: '30.1 AU • Poseidon',
            distanceAU: '30.1 AU',
            sizeVmin: 2.4,
            orbitRadiusVmin: 54,
            speedMultiplier: 0.2,
            initialAngle: 55,
            sphereGradient: 'radial-gradient(circle at 35% 35%, #93c5fd 0%, #3b82f6 50%, #1e3a8a 100%)',
            glowColor: 'rgba(59, 130, 246, 0.45)',
            projectTitle: 'Global Edge & Cloud Infrastructure',
            projectRole: 'Edge Distribution',
            projectTagline: 'Global Vercel/AWS CDN edge network, image optimization pipelines & security hardening.',
            projectCategory: 'Cloud & Infrastructure',
            projectClient: 'Production Grade',
            projectYear: '2024',
            projectTechStack: ['AWS Edge', 'Vercel CDN', 'Cloudflare DNS', 'SSL/TLS'],
            projectDescription: 'Marking the perimeter of our celestial system: global edge network distribution, sub-second TTFB worldwide, and hardened production infrastructure.'
        }
    ], [crystal4u, leadB, nxElit]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 32,
        damping: 24,
        mass: 0.55,
        restDelta: 0.001
    });

    // Milestone phase tracker
    const [currentPhase, setCurrentPhase] = useState(0);

    useTransform(smoothProgress, (p) => {
        if (p < 0.33 && currentPhase !== 0) setCurrentPhase(0);
        else if (p >= 0.33 && p < 0.66 && currentPhase !== 1) setCurrentPhase(1);
        else if (p >= 0.66 && currentPhase !== 2) setCurrentPhase(2);
        return p;
    });

    const dialDegrees = useTransform(smoothProgress, [0, 1], [0, 360]);

    return (
        <section
            id="work"
            ref={containerRef}
            className={cn(
                "relative bg-background text-foreground dark:bg-black dark:text-white transition-colors duration-500 overflow-visible selection:bg-primary/20",
                isFullPage ? "min-h-[300vh]" : "h-[280vh] border-b border-border/40"
            )}
        >
            {/* STICKY STAGE (Fixed Viewport) */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">

                {/* 1. MINIMAL CELESTIAL AMBIENCE */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle,_#00000008_1px,_transparent_1px)] dark:bg-[radial-gradient(circle,_#ffffff06_1px,_transparent_1px)] bg-[size:36px_36px] opacity-60" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vmin] h-[60vmin] bg-amber-500/[0.035] rounded-full blur-[120px]" />
                    {/* Subtle Cardinal Lines */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/25 to-transparent" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border/25 to-transparent" />
                </div>

                {/* 2. FLOATING TOP CORNER HUD: Does not obstruct or cover the central solar field */}
                <div className="absolute top-20 sm:top-24 left-6 sm:left-12 z-30 pointer-events-auto max-w-sm">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                        <span className="font-mono text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
                            1610 // The Heliocentric Orrery
                        </span>
                    </div>
                    <h1 className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-foreground">
                        Selected Flagships in Harmonic Orbit
                    </h1>
                </div>

                {/* TOP-RIGHT CORNER: Historic Whisper */}
                <div className="absolute top-20 sm:top-24 right-6 sm:right-12 z-30 pointer-events-auto text-right hidden sm:block">
                    <span className="font-serif italic text-xs md:text-sm text-foreground/80 block">
                        “E pur si muove — And yet it moves.”
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground tracking-tight">
                        Click any planet to inspect the work.
                    </span>
                </div>

                {/* 3. THE EXPANSIVE FULL-VIEWPORT ORRERY CANVASES (Spans 88vmin across viewport) */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">

                    {/* CENTRAL SUN (SOL // GALILEO & DUKE CORE) */}
                    <div className="relative flex items-center justify-center z-40 pointer-events-auto">
                        {/* Radiant Solar Corona */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.25, 0.45, 0.25],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute rounded-full bg-amber-500/15 blur-xl pointer-events-none"
                            style={{
                                width: '13vmin',
                                height: '13vmin'
                            }}
                        />

                        {/* Sun Core Sphere */}
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setActiveBody({
                                id: 'sol',
                                name: 'Sol',
                                astronomicalName: 'The Solar Core • 0.00 AU',
                                distanceAU: '0.00 AU',
                                sizeVmin: 5.8,
                                orbitRadiusVmin: 0,
                                speedMultiplier: 0,
                                initialAngle: 0,
                                sphereGradient: 'radial-gradient(circle at 35% 35%, #fffbeb 0%, #fef08a 25%, #f59e0b 65%, #b45309 100%)',
                                glowColor: 'rgba(245, 158, 11, 0.75)',
                                projectTitle: 'Galileo & Duke Studio',
                                projectRole: 'The Gravitational Core',
                                projectTagline: 'Independent Design & Development Studio Founded by Moksh & Varul',
                                projectCategory: 'Studio Core',
                                projectClient: 'Galileo & Duke',
                                projectYear: '2024',
                                projectImage: '/about/galileo.jpg',
                                projectDescription: 'At the center of our cosmos: an uncompromising commitment to crafting digital flagships that transcend static templates through kinetic choreography, 3D spatial depth, and architectural rigor.'
                            })}
                            className="relative rounded-full shadow-[0_0_32px_rgba(245,158,11,0.75),inset_0_0_8px_rgba(255,255,255,0.85)] flex flex-col items-center justify-center text-center select-none cursor-pointer group"
                            style={{
                                width: '5.6vmin',
                                height: '5.6vmin',
                                background: 'radial-gradient(circle at 35% 35%, #fffbeb 0%, #fef08a 25%, #f59e0b 65%, #b45309 100%)'
                            }}
                        >
                            <span className="font-mono font-black text-[7px] sm:text-[9px] text-amber-950 uppercase tracking-wider drop-shadow-sm">
                                SOL
                            </span>

                            {/* Center Tooltip */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-card/90 border border-border text-[8px] font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-md">
                                Studio Core
                            </div>
                        </motion.div>
                    </div>

                    {/* ALL 8 PLANETARY ORBIT RINGS & SPHERES */}
                    {celestialBodies.map((planet, index) => (
                        <GrandPlanetOrbit
                            key={planet.id}
                            body={planet}
                            progress={smoothProgress}
                            index={index}
                            isActive={activeBody?.id === planet.id}
                            onSelect={() => setActiveBody(activeBody?.id === planet.id ? null : planet)}
                            onHover={(h) => setHoveredBody(h ? planet : null)}
                        />
                    ))}
                </div>

                {/* 4. FLOATING BOTTOM-LEFT CORNER: Live Compass & Sentiments */}
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-12 z-30 pointer-events-auto flex items-center gap-3 max-w-md">
                    <div className="w-8 h-8 rounded-full border border-border bg-card/70 backdrop-blur-md flex items-center justify-center flex-shrink-0 shadow-sm">
                        <motion.div style={{ rotate: dialDegrees }}>
                            <Compass className="w-3.5 h-3.5 text-foreground/70" />
                        </motion.div>
                    </div>

                    <div>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground font-bold block">
                            {currentPhase === 0 && '01 // The Heliocentric Discovery'}
                            {currentPhase === 1 && '02 // E Pur Si Muove'}
                            {currentPhase === 2 && '03 // Kinetic Harmony'}
                        </span>
                        <p className="text-xs font-medium text-foreground/90 leading-tight">
                            {currentPhase === 0 && 'All 8 planets in eternal, harmonic orbit around the luminous center.'}
                            {currentPhase === 1 && '“And yet it moves.” Software engineered in perpetual, purposeful motion.'}
                            {currentPhase === 2 && 'Every celestial sphere is a dedicated digital flagship engineered with bespoke craft.'}
                        </p>
                    </div>
                </div>

                {/* FLOATING BOTTOM-RIGHT: Live Hovered Telemetry Readout */}
                <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-12 z-30 pointer-events-auto font-mono text-[10px] text-muted-foreground tracking-widest uppercase text-right hidden sm:block">
                    {hoveredBody ? (
                        <span className="text-foreground font-bold px-3 py-1 rounded-full bg-card/80 border border-border backdrop-blur-md shadow-sm">
                            {hoveredBody.name} • {hoveredBody.projectTitle} ({hoveredBody.distanceAU})
                        </span>
                    ) : (
                        <span>Scroll to orbit • Click any planet to explore</span>
                    )}
                </div>

                {/* 5. LUXURY EDITORIAL GLASS PROJECT DOSSIER */}
                <AnimatePresence>
                    {activeBody && (
                        <LuxuryProjectDossier
                            body={activeBody}
                            onClose={() => setActiveBody(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: Grand Planet Orbit (Mathematically Exact Centering & Large Scale)
// ---------------------------------------------------------------------------
interface GrandPlanetOrbitProps {
    body: CelestialBody;
    progress: any;
    index: number;
    isActive: boolean;
    onSelect: () => void;
    onHover: (hovered: boolean) => void;
}

function GrandPlanetOrbit({ body, progress, index, isActive, onSelect, onHover }: GrandPlanetOrbitProps) {
    const rotate = useTransform(
        progress,
        [0, 1],
        [body.initialAngle, body.initialAngle + 360 * body.speedMultiplier]
    );

    const counterRotate = useTransform(rotate, (r) => -r);

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Hairline Orbital Track Ring */}
            <div
                className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 pointer-events-none",
                    isActive
                        ? "border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.25)] border-solid"
                        : "border-border/25 dark:border-white/[0.09]"
                )}
                style={{
                    width: `${body.orbitRadiusVmin * 2}vmin`,
                    height: `${body.orbitRadiusVmin * 2}vmin`
                }}
            />

            {/* Rotating Orbit Plane (Centered at (0,0)) */}
            <motion.div
                style={{ rotate }}
                className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center pointer-events-none will-change-transform transform-gpu"
            >
                {/* Planet Pivot Anchor: Exactly at (radius, 0) */}
                <div
                    className="absolute top-0 left-0 w-0 h-0 flex items-center justify-center pointer-events-auto cursor-pointer"
                    style={{
                        transform: `translateX(${body.orbitRadiusVmin}vmin)`
                    }}
                    onClick={onSelect}
                    onMouseEnter={() => onHover(true)}
                    onMouseLeave={() => onHover(false)}
                >
                    {/* Centered Planet Body: Translates -50% -50% so the center is 100% on the orbit line! */}
                    <motion.div
                        style={{ rotate: counterRotate }}
                        className="relative flex items-center justify-center group/sphere select-none -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Interactive Scale on Hover */}
                        <motion.div
                            whileHover={{ scale: 1.4 }}
                            whileTap={{ scale: 0.92 }}
                            className="relative flex items-center justify-center"
                        >
                            {/* Atmospheric Halo */}
                            <div
                                className={cn(
                                    "absolute inset-0 rounded-full transition-all duration-300 blur-sm pointer-events-none",
                                    isActive ? "opacity-100 scale-150" : "opacity-35 group-hover/sphere:opacity-90"
                                )}
                                style={{ backgroundColor: body.glowColor }}
                            />

                            {/* Authentic Planet Marble Sphere */}
                            <div
                                className={cn(
                                    "rounded-full transition-transform shadow-md relative z-10",
                                    isActive ? "ring-2 ring-foreground" : ""
                                )}
                                style={{
                                    width: `${body.sizeVmin}vmin`,
                                    height: `${body.sizeVmin}vmin`,
                                    background: body.sphereGradient,
                                    boxShadow: `0 0 10px ${body.glowColor}, inset -2px -2px 3px rgba(0,0,0,0.7), inset 1px 1px 2px rgba(255,255,255,0.4)`
                                }}
                            />

                            {/* Saturn's Planetary Rings */}
                            {body.hasRings && (
                                <div
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                    style={{
                                        width: `${body.sizeVmin * 2.6}vmin`,
                                        height: `${body.sizeVmin * 0.75}vmin`,
                                        borderRadius: '50%',
                                        border: '2px solid rgba(217, 119, 6, 0.7)',
                                        boxShadow: '0 0 6px rgba(217, 119, 6, 0.35)',
                                        transform: 'translate(-50%, -50%) rotate(-25deg)'
                                    }}
                                />
                            )}

                            {/* Orbiting Moon Sub-system (Earth's Luna or Jupiter's 4 Galilean Moons) */}
                            {body.moons && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    {body.moons.map((moon) => (
                                        <motion.div
                                            key={moon.name}
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 10 / moon.speed,
                                                repeat: Infinity,
                                                ease: 'linear'
                                            }}
                                            className="absolute flex items-center justify-center"
                                            style={{
                                                width: `${moon.distanceVmin * 2}vmin`,
                                                height: `${moon.distanceVmin * 2}vmin`
                                            }}
                                        >
                                            <div
                                                className="rounded-full shadow-sm"
                                                style={{
                                                    width: `${moon.sizeVmin}vmin`,
                                                    height: `${moon.sizeVmin}vmin`,
                                                    backgroundColor: moon.color,
                                                    transform: `translateX(${moon.distanceVmin}vmin)`,
                                                    boxShadow: `0 0 4px ${moon.color}`
                                                }}
                                                title={moon.name}
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Minimalist Floating Tag (Reveals only on hover) */}
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover/sphere:opacity-100 transition-all duration-200 pointer-events-none z-50">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-foreground px-2.5 py-0.5 rounded-full bg-card/95 border border-border shadow-lg backdrop-blur-md">
                                {body.name} • {body.projectTitle}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: Luxury Editorial Glass Project Dossier
// ---------------------------------------------------------------------------
interface LuxuryProjectDossierProps {
    body: CelestialBody;
    onClose: () => void;
}

function LuxuryProjectDossier({ body, onClose }: LuxuryProjectDossierProps) {
    const [mounted, setMounted] = useState(false);
    const lenis = useLenis();

    useEffect(() => {
        setMounted(true);
        // Pause Lenis smooth scrolling so background stays strictly locked
        lenis?.stop();

        // Lock native document scroll on both body and documentElement
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            // Resume Lenis smooth scroll and restore native styles
            lenis?.start();
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.overflow = originalHtmlOverflow;
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose, lenis]);

    if (!mounted) return null;

    const modalContent = (
        <div 
            className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-xl pointer-events-auto"
            data-lenis-prevent
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
        >
            {/* Backdrop click to dismiss */}
            <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

            {/* Dossier Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 16 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                data-lenis-prevent
                className="relative w-full max-w-lg md:max-w-xl max-h-[85vh] flex flex-col bg-zinc-950/95 dark:bg-black/95 border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.95)] text-white overflow-hidden z-10"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
            >
                {/* Scrollable Content Body with min-h-0 flex-1 */}
                <div 
                    data-lenis-prevent
                    className="overflow-y-auto overscroll-contain p-5 sm:p-6 space-y-4 flex-1 min-h-0"
                    onWheel={(e) => e.stopPropagation()}
                    onTouchMove={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            {/* Glowing Planet Sphere */}
                            <div
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full shadow-md flex-shrink-0 relative"
                                style={{
                                    background: body.sphereGradient,
                                    boxShadow: `0 0 14px ${body.glowColor}`
                                }}
                            />
                            <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/90 border border-white/15 text-[9px] font-mono uppercase tracking-widest">
                                        {body.name} • {body.distanceAU}
                                    </span>
                                    <span className="font-mono text-[9px] text-white/50 uppercase">
                                        {body.projectYear}
                                    </span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-white leading-tight">
                                    {body.projectTitle}
                                </h2>
                                <p className="text-[11px] font-mono text-white/50">
                                    Client: {body.projectClient}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors flex items-center justify-center flex-shrink-0"
                            aria-label="Close dossier"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Image Preview with constrained height */}
                    {body.projectImage && (
                        <div className="relative w-full h-40 sm:h-48 md:h-52 rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-black/60 flex-shrink-0">
                            <Image
                                src={body.projectImage}
                                alt={body.projectTitle}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 600px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        </div>
                    )}

                    {/* Narrative & Tagline */}
                    <div className="space-y-1.5">
                        <h3 className="text-xs sm:text-sm font-semibold text-white/90 leading-snug">
                            {body.projectTagline}
                        </h3>
                        <p className="text-xs sm:text-[13px] text-white/65 leading-relaxed font-light">
                            {body.projectDescription}
                        </p>
                    </div>

                    {/* Tech Stack Pills */}
                    {body.projectTechStack && body.projectTechStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                            {body.projectTechStack.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Fixed Bottom Action Footer */}
                <div className="flex items-center justify-between px-5 sm:px-6 py-3 sm:py-3.5 bg-zinc-950/90 border-t border-white/10 backdrop-blur-md">
                    <button
                        onClick={onClose}
                        className="text-xs font-mono text-white/50 hover:text-white transition-colors"
                    >
                        ← Return to Orrery
                    </button>

                    {body.projectSlug ? (
                        <Link
                            href={`/projects/${body.projectSlug}`}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-md"
                        >
                            <span>Explore Case Study</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    ) : (
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors shadow-md"
                        >
                            <span>Inquire Capability</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    )}
                </div>
            </motion.div>
        </div>
    );

    return createPortal(modalContent, document.body);
}

export default OrbitalWorkSection;
