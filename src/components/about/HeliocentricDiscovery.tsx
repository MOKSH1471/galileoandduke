'use client';

import React, { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Orbit, Eye, ChevronRight, Info, ShieldCheck, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanetConfig {
    id: string;
    name: string;
    historicalName: string;
    color: string;
    glowColor: string;
    size: number;
    radiusDesktop: number;
    radiusMobile: number;
    speedMultiplier: number;
    initialAngle: number;
    distanceAU: string;
    discoveryNote: string;
    galileoLog: string;
    moons?: { name: string; distance: number; speed: number; color: string }[];
}

const CELESTIAL_PLANETS: PlanetConfig[] = [
    {
        id: 'mercury',
        name: 'Mercury',
        historicalName: 'Hermes / Stilbon',
        color: '#94a3b8',
        glowColor: 'rgba(148, 163, 184, 0.4)',
        size: 10,
        radiusDesktop: 110,
        radiusMobile: 70,
        speedMultiplier: 3.2,
        initialAngle: 45,
        distanceAU: '0.39 AU',
        discoveryNote: 'Inner Swift Runner',
        galileoLog: 'Observed as a rapid twilight traveler; its swift transit defied rigid stationary spheres.'
    },
    {
        id: 'venus',
        name: 'Venus',
        historicalName: 'Aphrodite / Phosphorus',
        color: '#fef08a',
        glowColor: 'rgba(254, 240, 138, 0.5)',
        size: 14,
        radiusDesktop: 180,
        radiusMobile: 110,
        speedMultiplier: 2.1,
        initialAngle: 190,
        distanceAU: '0.72 AU',
        discoveryNote: 'Crescent & Gibbous Phases (1610)',
        galileoLog: '“Cynthiae figuras aemulatur mater amorum” — Venus exhibits crescent phases exactly like the Moon, impossible unless it revolves directly around the Sun.'
    },
    {
        id: 'earth',
        name: 'Earth & Luna',
        historicalName: 'Terra / Our World',
        color: '#38bdf8',
        glowColor: 'rgba(56, 189, 248, 0.6)',
        size: 16,
        radiusDesktop: 270,
        radiusMobile: 160,
        speedMultiplier: 1.4,
        initialAngle: 310,
        distanceAU: '1.00 AU',
        discoveryNote: 'Orbital Voyage — 365.25 Days',
        galileoLog: 'Earth is not the motionless pivot of creation, but a vibrant celestial voyager sailing through the solar winds.',
        moons: [
            { name: 'Luna', distance: 22, speed: 4.5, color: '#e2e8f0' }
        ]
    },
    {
        id: 'mars',
        name: 'Mars',
        historicalName: 'Ares / The Red Traveler',
        color: '#f87171',
        glowColor: 'rgba(248, 113, 113, 0.5)',
        size: 12,
        radiusDesktop: 370,
        radiusMobile: 220,
        speedMultiplier: 0.9,
        initialAngle: 120,
        distanceAU: '1.52 AU',
        discoveryNote: 'Retrograde Arc Deconstructed',
        galileoLog: 'The mysterious backward loops of Mars are simply an optical consequence of Earth overtaking it along an inner solar lane.'
    },
    {
        id: 'jupiter',
        name: 'Jupiter & 4 Moons',
        historicalName: 'The Medicean Stars (Jan 7, 1610)',
        color: '#fbbf24',
        glowColor: 'rgba(251, 191, 36, 0.6)',
        size: 24,
        radiusDesktop: 480,
        radiusMobile: 285,
        speedMultiplier: 0.45,
        initialAngle: 240,
        distanceAU: '5.20 AU',
        discoveryNote: 'Io, Europa, Ganymede, Callisto',
        galileoLog: 'Galileo spotted 4 bright points moving around Jupiter night after night. Proof undeniable that celestial bodies can orbit a center other than Earth.',
        moons: [
            { name: 'Io', distance: 24, speed: 6.0, color: '#fef08a' },
            { name: 'Europa', distance: 30, speed: 4.8, color: '#e0f2fe' },
            { name: 'Ganymede', distance: 37, speed: 3.5, color: '#fed7aa' },
            { name: 'Callisto', distance: 44, speed: 2.2, color: '#cbd5e1' }
        ]
    }
];

const MILESTONES = [
    {
        threshold: 0.0,
        epoch: 'c. 150 – 1609 AD',
        tag: 'Phase 01 // The Geocentric Orthodoxy',
        headline: 'The Immovable Center',
        quote: 'For fifteen centuries, dogma held that Earth stood frozen and supreme at the core of all existence, while the entire cosmos wheeled in subservience.',
        subtext: 'Ptolemy’s complex clockwork of epicycles hid a simpler truth beneath rigid tradition.',
        latin: '“Terra immobilis in centro mundi.”'
    },
    {
        threshold: 0.25,
        epoch: 'January 7, 1610 • Padua',
        tag: 'Phase 02 // The Starry Messenger',
        headline: 'The Heavens in Motion',
        quote: 'Grinding his own lenses to 20x magnification, Galileo turned his spyglass to Jupiter and beheld four radiant companions in perpetual dance.',
        subtext: 'In one stroke, the discovery of the Medicean moons shattered the claim that all heavenly spheres revolve around humanity’s feet.',
        latin: '“Sidereus Nuncius — Unveiling what eye had never seen.”'
    },
    {
        threshold: 0.55,
        epoch: 'June 22, 1633 • Rome',
        tag: 'Phase 03 // The Defiant Whisper',
        headline: '“E Pur Si Muove”',
        quote: 'Forced by the Roman Inquisition to recant Copernican truth under penalty of fire, Galileo rose from his knees and muttered his immortal defiance.',
        subtext: '“And yet it moves.” Truth does not bow to decrees, and momentum cannot be arrested by consensus.',
        latin: '“E pur si muove — And yet it moves.”'
    },
    {
        threshold: 0.80,
        epoch: 'Present Era • The Studio Ethos',
        tag: 'Phase 04 // Studio Heritage',
        headline: 'Beyond The Static Canvas',
        quote: 'We carry Galileo’s lens into modern software. We reject the frozen, predictable templates of the web in favor of living digital systems.',
        subtext: 'Every flagship we build is an orchestrated ecosystem — dynamic WebGL, spatial depth, and kinetic choreography revolving around a luminous brand core.',
        latin: '“Curiosity without apology. Craft without compromise.”'
    }
];

export function HeliocentricDiscovery() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePlanet, setActivePlanet] = useState<PlanetConfig | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 35,
        damping: 22,
        mass: 0.6,
        restDelta: 0.001
    });

    // Milestone phase tracker (0, 1, 2, 3)
    const [currentPhase, setCurrentPhase] = useState(0);

    useTransform(smoothProgress, (p) => {
        if (p < 0.25 && currentPhase !== 0) setCurrentPhase(0);
        else if (p >= 0.25 && p < 0.55 && currentPhase !== 1) setCurrentPhase(1);
        else if (p >= 0.55 && p < 0.80 && currentPhase !== 2) setCurrentPhase(2);
        else if (p >= 0.80 && currentPhase !== 3) setCurrentPhase(3);
        return p;
    });

    const activeMilestone = MILESTONES[currentPhase];

    // Cosmic dial degree calculation
    const dialDegree = useTransform(smoothProgress, [0, 1], [0, 360]);

    return (
        <section
            ref={containerRef}
            className="relative h-[280vh] bg-[#05060b] text-white selection:bg-amber-500/30 overflow-visible border-b border-border/40"
        >
            {/* STICKY THEATER STAGE */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* 1. CELESTIAL BACKGROUND & STARFIELD */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    {/* Dark nebula radial glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-gradient-to-br from-amber-500/[0.04] via-blue-500/[0.03] to-transparent rounded-full blur-[140px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-70" />

                    {/* Astrolabe / Coordinate Meridian Circles */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] md:w-[1050px] md:h-[1050px] border border-white/[0.03] rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-dashed border-amber-500/[0.06] rounded-full" />
                    
                    {/* Compass Crosshairs */}
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.04] to-transparent" />
                </div>

                {/* 2. THE HELIOCENTRIC ORRERY CANVAS */}
                <div className="relative w-full h-full flex items-center justify-center z-10">
                    
                    {/* CENTRAL SUN (SOL) */}
                    <div className="relative flex items-center justify-center z-30">
                        {/* Outer Solar Corona Pulse */}
                        <motion.div
                            animate={{
                                scale: [1, 1.15, 1],
                                opacity: [0.35, 0.6, 0.35],
                                rotate: [0, 180, 360]
                            }}
                            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                            className="absolute w-44 h-44 md:w-56 md:h-56 rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/30 to-yellow-500/20 blur-2xl pointer-events-none"
                        />

                        {/* Mid Flare Layer */}
                        <motion.div
                            animate={{ scale: [1, 1.06, 1], opacity: [0.6, 0.85, 0.6] }}
                            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                            className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-amber-400/40 blur-xl pointer-events-none"
                        />

                        {/* Solar Sphere Core */}
                        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 shadow-[0_0_50px_rgba(245,158,11,0.8),inset_0_0_15px_rgba(255,255,255,0.9)] flex flex-col items-center justify-center text-center select-none cursor-default group">
                            <span className="text-[9px] md:text-[10px] font-mono font-black text-amber-950 uppercase tracking-widest drop-shadow-sm">
                                SOL
                            </span>
                            <span className="text-[7px] font-mono text-amber-900/80 uppercase tracking-tighter hidden md:block">
                                0.0 AU
                            </span>

                            {/* Center Tooltip on Hover */}
                            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 backdrop-blur-md border border-amber-500/30 px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                                    The Center of Celestial Gravity
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* CONCENTRIC PLANETARY ORBIT RINGS */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {CELESTIAL_PLANETS.map((planet, index) => (
                            <OrbitalTrack
                                key={planet.id}
                                planet={planet}
                                progress={smoothProgress}
                                index={index}
                                activePlanet={activePlanet}
                                setActivePlanet={setActivePlanet}
                            />
                        ))}
                    </div>
                </div>

                {/* 3. FLOATING EDITORIAL HUD (TOP-LEFT / SIDE DOCKED) */}
                <div className="absolute top-6 left-6 md:top-12 md:left-12 max-w-sm md:max-w-md z-40 pointer-events-none">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] md:text-[11px] font-mono uppercase tracking-[0.25em] w-fit mb-3">
                        <Orbit className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
                        <span>The Galileo Heritage Proof</span>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeMilestone.tag}
                            initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="space-y-3 pointer-events-auto"
                        >
                            <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-amber-400/80 uppercase">
                                <span>{activeMilestone.epoch}</span>
                                <span className="text-white/20">•</span>
                                <span>{activeMilestone.tag}</span>
                            </div>

                            <h3 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight">
                                {activeMilestone.headline}
                            </h3>

                            <blockquote className="text-xs md:text-sm text-zinc-300 leading-relaxed font-light border-l-2 border-amber-500/60 pl-3.5 my-2">
                                “{activeMilestone.quote}”
                            </blockquote>

                            <p className="text-[11px] md:text-xs text-zinc-400 leading-relaxed font-mono">
                                {activeMilestone.subtext}
                            </p>

                            <div className="pt-2 text-[11px] font-serif italic text-amber-300/80">
                                {activeMilestone.latin}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* 4. BOTTOM-RIGHT TELEMETRY DOCK (INTERACTIVE INSPECTOR) */}
                <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 max-w-xs z-40">
                    <AnimatePresence mode="wait">
                        {activePlanet ? (
                            <motion.div
                                key={activePlanet.id}
                                initial={{ opacity: 0, scale: 0.92, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.92, y: 10 }}
                                className="p-5 rounded-2xl bg-zinc-950/90 border border-amber-500/40 backdrop-blur-xl shadow-2xl space-y-3"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: activePlanet.color, boxShadow: `0 0 10px ${activePlanet.glowColor}` }}
                                        />
                                        <span className="font-bold text-sm text-white">{activePlanet.name}</span>
                                    </div>
                                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest">{activePlanet.distanceAU}</span>
                                </div>

                                <p className="text-[11px] font-mono text-zinc-400 leading-relaxed">
                                    {activePlanet.historicalName}
                                </p>

                                <div className="p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-[11px] text-zinc-300 leading-relaxed font-light italic">
                                    {activePlanet.galileoLog}
                                </div>

                                <div className="text-[9px] font-mono text-amber-400/90 uppercase tracking-wider flex items-center gap-1">
                                    <Sparkles className="w-3 h-3" /> {activePlanet.discoveryNote}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="hidden md:flex flex-col gap-2 p-4 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-md text-right"
                            >
                                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                                    Astronomical Telemetry
                                </span>
                                <span className="text-xs text-zinc-300 font-light">
                                    Scroll to advance celestial orbits.<br />Hover any planet to inspect Galileo’s notes.
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 5. CELESTIAL TIMELINE DIAL (BOTTOM-LEFT PROGRESS TRACKER) */}
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 flex items-center gap-4 z-40 pointer-events-none">
                    {/* Rotating Astro Compass */}
                    <div className="relative w-12 h-12 rounded-full border border-amber-500/30 bg-black/60 backdrop-blur-md flex items-center justify-center">
                        <motion.div
                            style={{ rotate: dialDegree }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            <Compass className="w-6 h-6 text-amber-400" />
                        </motion.div>
                    </div>

                    <div className="flex flex-col font-mono text-[10px] text-zinc-400">
                        <span className="text-amber-400 font-bold uppercase tracking-widest">
                            Heliocentric Trajectory
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                            {MILESTONES.map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300",
                                        i === currentPhase
                                            ? "w-6 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"
                                            : "w-2 bg-white/20"
                                    )}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Vignette Top and Bottom for Seamless Page Blending */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#05060b] via-[#05060b]/80 to-transparent pointer-events-none z-20" />
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#05060b] via-[#05060b]/80 to-transparent pointer-events-none z-20" />
            </div>
        </section>
    );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENT: Orbital Track & Satellite with Upright Counter-Rotation
// ---------------------------------------------------------------------------
interface OrbitalTrackProps {
    planet: PlanetConfig;
    progress: any;
    index: number;
    activePlanet: PlanetConfig | null;
    setActivePlanet: (p: PlanetConfig | null) => void;
}

function OrbitalTrack({ planet, progress, index, activePlanet, setActivePlanet }: OrbitalTrackProps) {
    // Angular rotation based on scroll progress and Keplerian speed
    const rotate = useTransform(
        progress,
        [0, 1],
        [planet.initialAngle, planet.initialAngle + 360 * planet.speedMultiplier]
    );

    // Counter-rotation so glyphs, text, and labels stay upright
    const counterRotate = useTransform(rotate, (r) => -r);

    const isHovered = activePlanet?.id === planet.id;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Visual Orbit Guide Ring */}
            <div
                className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-300 pointer-events-none",
                    isHovered
                        ? "border-amber-400/50 shadow-[0_0_25px_rgba(251,191,36,0.3)] border-solid"
                        : "border-white/[0.08] hover:border-white/20"
                )}
                style={{
                    width: `calc(var(--orbit-radius, ${planet.radiusDesktop * 2}px))`,
                    height: `calc(var(--orbit-radius, ${planet.radiusDesktop * 2}px))`
                }}
            >
                <style jsx>{`
                    div {
                        --orbit-radius: ${planet.radiusMobile * 2}px;
                    }
                    @media (min-width: 768px) {
                        div {
                            --orbit-radius: ${planet.radiusDesktop * 2}px;
                        }
                    }
                `}</style>
            </div>

            {/* Rotating Orbit Plane */}
            <motion.div
                style={{ rotate }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none will-change-transform transform-gpu"
            >
                {/* Planet Placement at specific radius */}
                <div
                    className="absolute flex items-center justify-center pointer-events-auto cursor-pointer"
                    style={{
                        transform: `translateX(var(--orbit-offset, ${planet.radiusDesktop}px))`
                    }}
                    onMouseEnter={() => setActivePlanet(planet)}
                    onMouseLeave={() => setActivePlanet(null)}
                    onClick={() => setActivePlanet(activePlanet?.id === planet.id ? null : planet)}
                >
                    <style jsx>{`
                        div {
                            --orbit-offset: ${planet.radiusMobile}px;
                        }
                        @media (min-width: 768px) {
                            div {
                                --orbit-offset: ${planet.radiusDesktop}px;
                            }
                        }
                    `}</style>

                    {/* Counter-Rotated Container so all labels & sub-systems remain upright */}
                    <motion.div
                        style={{ rotate: counterRotate }}
                        className="relative flex items-center justify-center group/planet"
                    >
                        {/* Planet Halo / Atmosphere */}
                        <div
                            className={cn(
                                "rounded-full transition-all duration-300 relative flex items-center justify-center",
                                isHovered ? "scale-125" : "group-hover/planet:scale-110"
                            )}
                            style={{
                                width: planet.size + 14,
                                height: planet.size + 14,
                                backgroundColor: isHovered ? planet.glowColor : 'transparent'
                            }}
                        >
                            {/* Planet Sphere */}
                            <div
                                className="rounded-full shadow-lg transition-transform"
                                style={{
                                    width: planet.size,
                                    height: planet.size,
                                    backgroundColor: planet.color,
                                    boxShadow: `0 0 16px ${planet.glowColor}, inset -2px -2px 4px rgba(0,0,0,0.6)`
                                }}
                            />
                        </div>

                        {/* Orbiting Moon Sub-system (Earth's Luna or Jupiter's 4 Moons) */}
                        {planet.moons && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                {planet.moons.map((moon, mIdx) => (
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
                                            width: moon.distance * 2,
                                            height: moon.distance * 2
                                        }}
                                    >
                                        <div
                                            className="w-1.5 h-1.5 rounded-full shadow-sm"
                                            style={{
                                                backgroundColor: moon.color,
                                                transform: `translateX(${moon.distance}px)`,
                                                boxShadow: `0 0 6px ${moon.color}`
                                            }}
                                            title={moon.name}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Planet Label Floating Upright */}
                        <div
                            className={cn(
                                "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 pointer-events-none",
                                isHovered ? "opacity-100 translate-y-0" : "opacity-0 md:opacity-40 group-hover/planet:opacity-100"
                            )}
                        >
                            <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest text-zinc-300 px-1.5 py-0.5 rounded bg-black/60 border border-white/10">
                                {planet.name.split(' ')[0]}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}

export default HeliocentricDiscovery;
