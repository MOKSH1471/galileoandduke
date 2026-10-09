'use client';

import React, { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------
interface BondCoupon {
    id: string;
    number: string;
    category: string;
    yieldRate: string;
    metricLabel: string;
    title: string;
    summary: string;
    specifications: { label: string; value: string }[];
    underwritingNote: string;
}

// ---------------------------------------------------------------------------
// MATHEMATICAL GUILLOCHE VECTOR ROSETTE
// Generates parametric guilloche curves (hypotrochoid / rose security linework)
// ---------------------------------------------------------------------------
function GuillocheRosette({ size = 200, className }: { size?: number; className?: string }) {
    const pathData = useMemo(() => {
        const R = 80;
        const r = 24;
        const d = 50;
        const points: string[] = [];
        const steps = 360;

        for (let i = 0; i <= steps; i++) {
            const theta = (i * Math.PI * 4) / steps;
            const x = (R - r) * Math.cos(theta) + d * Math.cos(((R - r) * theta) / r);
            const y = (R - r) * Math.sin(theta) - d * Math.sin(((R - r) * theta) / r);
            points.push(`${i === 0 ? 'M' : 'L'} ${(x + 100).toFixed(2)} ${(y + 100).toFixed(2)}`);
        }
        return points.join(' ') + ' Z';
    }, []);

    const innerRing = useMemo(() => {
        const points: string[] = [];
        const steps = 180;
        for (let i = 0; i <= steps; i++) {
            const theta = (i * Math.PI * 2) / steps;
            const r = 45 + 5 * Math.cos(12 * theta);
            const x = 100 + r * Math.cos(theta);
            const y = 100 + r * Math.sin(theta);
            points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
        }
        return points.join(' ') + ' Z';
    }, []);

    return (
        <svg
            viewBox="0 0 200 200"
            width={size}
            height={size}
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path d={pathData} stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
            <path d={innerRing} stroke="currentColor" strokeWidth="0.75" opacity="0.45" />
            <circle cx="100" cy="100" r="28" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
            <circle cx="100" cy="100" r="18" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
            <circle cx="100" cy="100" r="6" fill="currentColor" opacity="0.3" />
        </svg>
    );
}

// ---------------------------------------------------------------------------
// BANKNOTE SECURITY CORNER BRACKET
// ---------------------------------------------------------------------------
function GuillocheCorner({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 48 48"
            width="48"
            height="48"
            fill="none"
            className={className}
            aria-hidden="true"
        >
            <path d="M2 2 H46 V12 H12 V46 H2 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
            <path d="M6 6 H40 V10 H10 V40 H6 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
            <path d="M2 2 L14 14" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
            <circle cx="14" cy="14" r="2" fill="currentColor" opacity="0.4" />
            <path d="M10 20 C10 14.477 14.477 10 20 10" stroke="currentColor" strokeWidth="0.6" strokeDasharray="1.5 1.5" opacity="0.35" />
            <path d="M10 28 C10 18.059 18.059 10 28 10" stroke="currentColor" strokeWidth="0.5" opacity="0.25" />
        </svg>
    );
}

// ---------------------------------------------------------------------------
// MAIN SOVEREIGN BOND COMPONENT
// ---------------------------------------------------------------------------
export function SovereignBondSection() {
    const bondRef = useRef<HTMLDivElement>(null);
    const [activeCouponId, setActiveCouponId] = useState<string>('c1');
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!bondRef.current) return;
        const rect = bondRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const coupons: BondCoupon[] = useMemo(() => [
        {
            id: 'c1',
            number: 'COUPON NO. 01',
            category: 'COMMERCIAL YIELD',
            yieldRate: '+42.8%',
            metricLabel: 'Average Conversion Alpha',
            title: 'Sensory Staging & Rapid Inquiry Pathways',
            summary: 'Bespoke digital flagships eliminate template friction through sensory visual staging, rapid micro-interactions, and instant conversion pathways.',
            specifications: [
                { label: 'Template Conversion', value: '1.8% Benchmark' },
                { label: 'Duke Flagship Alpha', value: '3.4% Proven Lift' },
                { label: 'Inquiry Path Friction', value: '0 Intermediate Layers' },
                { label: 'Visual Retention', value: '+68% Dwell Time' }
            ],
            underwritingNote: 'Directly converts visual prestige into measurable commercial growth and qualified client inquiries.'
        },
        {
            id: 'c2',
            number: 'COUPON NO. 02',
            category: 'TECHNICAL EXECUTION',
            yieldRate: '0.0ms',
            metricLabel: 'Cumulative Layout Shift',
            title: 'Zero-Latency Execution & 60fps Frame Budget',
            summary: 'Every animation, script, and web asset is rigorously budgeted. Uncompromising 60fps GPU compositing and sub-100ms global edge delivery.',
            specifications: [
                { label: 'Lighthouse Score', value: '98–100 Target' },
                { label: 'Frame Budget', value: 'Continuous 60fps' },
                { label: 'Global Edge TTFB', value: '< 100ms Vercel/AWS' },
                { label: 'Layout Shift (CLS)', value: '0.000 Fixed' }
            ],
            underwritingNote: 'Eliminates revenue leakage caused by sluggish mobile rendering and unpredictable layout shifts.'
        },
        {
            id: 'c3',
            number: 'COUPON NO. 03',
            category: 'ARCHITECTURAL TENOR',
            yieldRate: '5+ YRS',
            metricLabel: 'Architectural Durability',
            title: 'Resilient Modern Stack & Zero Technical Debt',
            summary: 'Built strictly on typed Next.js 15, native CSS, and pristine module boundaries. Completely free from fragile plugins and third-party theme decay.',
            specifications: [
                { label: 'Core Language', value: 'Strict TypeScript' },
                { label: 'Plugin Footprint', value: '0 External Bloat' },
                { label: 'Redesign Interval', value: '5+ Years Longevity' },
                { label: 'Maintenance Drag', value: 'Near Zero Overhead' }
            ],
            underwritingNote: 'Shields client capital by breaking the standard 18-month agency rebuild and obsolescence cycle.'
        },
        {
            id: 'c4',
            number: 'COUPON NO. 04',
            category: 'CATEGORY DOMINANCE',
            yieldRate: '3x–5x',
            metricLabel: 'Pricing Power Multiple',
            title: 'Museum-Grade Authority & Sovereign Positioning',
            summary: 'Dignified classical restraint and haute-couture typography command instant respect, empowering luxury brands to justify category-leading price points.',
            specifications: [
                { label: 'Typographic Standard', value: 'Golden Ratio Baseline' },
                { label: 'Brand Perception', value: 'Sovereign Leader' },
                { label: 'Market Position', value: 'Premium Defensibility' },
                { label: 'Aesthetic Tenor', value: 'Architectural Restraint' }
            ],
            underwritingNote: 'Transforms a company digital presence from an operational expense into an appreciating capital asset.'
        }
    ], []);

    const selectedCoupon = coupons.find((c) => c.id === activeCouponId) || coupons[0];

    return (
        <section
            id="sovereign-bond"
            className="relative bg-black text-white py-16 sm:py-24 px-4 sm:px-8 md:px-12 rounded-3xl border border-white/10 overflow-hidden selection:bg-white/20 my-8 shadow-2xl"
        >
            {/* 1. BACKGROUND MONOCHROME WATERMARK GRID */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle,_#ffffff08_1px,_transparent_1px)] bg-[size:32px_32px] opacity-40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-white/[0.015] rounded-full blur-[140px]" />
                {/* Horizontal & Vertical Rule Accents */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* 2. SECTION HEADER */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2.5 mb-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">
                                02 // The Duke Archetype • Monte Comune 1347
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]">
                            The Sovereign Bond of Craft.
                        </h2>
                    </div>

                    <div className="max-w-md text-left md:text-right">
                        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                            In 1347, the Florentine Republic created the world’s first sovereign public debt fund. We embody that pedigree: a Galileo & Duke flagship is not an agency cost, but an underwritten capital asset engineered for compounding commercial yield.
                        </p>
                    </div>
                </div>

                {/* 3. THE SOVEREIGN TREASURY BOND CERTIFICATE */}
                <div
                    ref={bondRef}
                    onMouseMove={handleMouseMove}
                    className="relative rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/15 p-6 sm:p-10 md:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300 group"
                    style={{
                        backgroundImage: `radial-gradient(circle 500px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.04), transparent 80%)`
                    }}
                >
                    {/* Guilloche Corner Brackets */}
                    <div className="absolute top-4 left-4 text-white pointer-events-none">
                        <GuillocheCorner />
                    </div>
                    <div className="absolute top-4 right-4 text-white pointer-events-none rotate-90">
                        <GuillocheCorner />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white pointer-events-none -rotate-90">
                        <GuillocheCorner />
                    </div>
                    <div className="absolute bottom-4 right-4 text-white pointer-events-none rotate-180">
                        <GuillocheCorner />
                    </div>

                    {/* Central Rosette Watermark (Subtle Background) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none opacity-25">
                        <GuillocheRosette size={420} />
                    </div>

                    {/* Inner Security Border Frame */}
                    <div className="relative border border-white/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 z-10">
                        {/* Certificate Header Bar */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-white/10 font-mono text-[9px] sm:text-[10px] text-zinc-500 uppercase tracking-widest">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full border border-white/40 flex items-center justify-center">
                                    <span className="w-1 h-1 rounded-full bg-white" />
                                </span>
                                <span>SERIES: MMXXVI // CUSIP: GD-1347-DUKE</span>
                            </div>

                            <div className="text-left sm:text-center">
                                <span className="text-zinc-400 font-semibold tracking-[0.25em]">
                                    GALILEO & DUKE SOVEREIGN TREASURY
                                </span>
                            </div>

                            <div className="text-left sm:text-right text-zinc-400">
                                <span>STATUS: UNDERWRITTEN & SECURED</span>
                            </div>
                        </div>

                        {/* Certificate Title & Decree */}
                        <div className="text-center py-10 md:py-14 max-w-3xl mx-auto">
                            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-[0.35em] block mb-3">
                                Official Digital Underwriting
                            </span>
                            <h3 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                                Sovereign Digital Equity & Performance Bond
                            </h3>
                            <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
                                Be it known that the bearer of this digital flagship is entitled to uncompromised architectural execution, absolute layout stability, zero template debt, and enduring category dominance.
                            </p>
                        </div>

                        {/* 4. FOUR DETACHABLE YIELD COUPONS (CIDOLE) */}
                        <div className="pt-8 border-t border-dashed border-white/15">
                            <div className="flex items-center justify-between mb-4">
                                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                                    Coupons of Yield // Select Coupon to Inspect Specifications
                                </span>
                                <span className="font-mono text-[9px] text-zinc-600 uppercase tracking-widest hidden sm:inline-block">
                                    Perforated Instrument • Non-Fungible Craft
                                </span>
                            </div>

                            {/* Coupon Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                                {coupons.map((coupon) => {
                                    const isSelected = coupon.id === activeCouponId;
                                    return (
                                        <button
                                            key={coupon.id}
                                            onClick={() => setActiveCouponId(coupon.id)}
                                            className={cn(
                                                "relative p-5 rounded-xl text-left transition-all duration-300 flex flex-col justify-between group/card",
                                                isSelected
                                                    ? "bg-white/[0.08] border border-white text-white shadow-[0_0_30px_rgba(255,255,255,0.06)]"
                                                    : "bg-black/50 border border-white/10 hover:border-white/25 text-zinc-300 hover:text-white"
                                            )}
                                        >
                                            {/* Scissor / Perforation Indicator */}
                                            <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-widest text-zinc-500 mb-4 pb-2 border-b border-dashed border-white/10">
                                                <span>{coupon.number}</span>
                                                <span className={cn(
                                                    "transition-colors",
                                                    isSelected ? "text-white" : "text-zinc-600"
                                                )}>
                                                    {coupon.category}
                                                </span>
                                            </div>

                                            {/* Yield Number */}
                                            <div className="my-2">
                                                <span className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-white block">
                                                    {coupon.yieldRate}
                                                </span>
                                                <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 block mt-0.5">
                                                    {coupon.metricLabel}
                                                </span>
                                            </div>

                                            {/* Title & Preview */}
                                            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                                                <span className="text-xs font-medium line-clamp-1 text-zinc-200">
                                                    {coupon.title}
                                                </span>
                                                <ChevronRight className={cn(
                                                    "w-3.5 h-3.5 transition-transform flex-shrink-0 ml-1 text-zinc-400",
                                                    isSelected ? "rotate-90 text-white" : "group-hover/card:translate-x-0.5"
                                                )} />
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* 5. EXPANDED COUPON SPECIFICATION INSPECTOR */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedCoupon.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-4 p-6 sm:p-8 rounded-xl bg-black/70 border border-white/15 backdrop-blur-sm"
                                >
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
                                        <div>
                                            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-zinc-500 mb-1">
                                                <span>{selectedCoupon.number}</span>
                                                <span>•</span>
                                                <span>{selectedCoupon.category}</span>
                                            </div>
                                            <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                                                {selectedCoupon.title}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-zinc-400 font-light mt-1.5 max-w-2xl leading-relaxed">
                                                {selectedCoupon.summary}
                                            </p>
                                        </div>

                                        <div className="flex-shrink-0 text-left lg:text-right">
                                            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-500 block">
                                                Certified Standard
                                            </span>
                                            <span className="font-sans text-3xl font-black tracking-tight text-white block mt-0.5">
                                                {selectedCoupon.yieldRate}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Specifications Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
                                        {selectedCoupon.specifications.map((spec, i) => (
                                            <div key={i} className="p-3.5 rounded-lg bg-zinc-950/80 border border-white/10">
                                                <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-500 block">
                                                    {spec.label}
                                                </span>
                                                <span className="font-mono text-xs sm:text-sm text-white font-semibold block mt-1">
                                                    {spec.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-zinc-500 font-mono text-[9px] uppercase tracking-wider">
                                        <span>Underwriting Guarantee: {selectedCoupon.underwritingNote}</span>
                                        <span className="hidden sm:inline-block">Verified by Duke Architecture</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* 6. FOUNDERS UNDERWRITING ENDORSEMENT & CTA */}
                        <div className="mt-10 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                            {/* Signatures */}
                            <div className="flex items-center gap-8 text-left">
                                <div>
                                    <div className="font-signature text-2xl sm:text-3xl text-white/95 pb-1 border-b border-white/25 w-32 tracking-wider leading-none">
                                        Moksh
                                    </div>
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block mt-1">
                                        Creative Technologist // Co-Founder
                                    </span>
                                </div>

                                <div>
                                    <div className="font-signature text-2xl sm:text-3xl text-white/95 pb-1 border-b border-white/25 w-32 tracking-wider leading-none">
                                        Varul
                                    </div>
                                    <span className="font-mono text-[8px] uppercase tracking-widest text-zinc-500 block mt-1">
                                        Studio Director // Co-Founder
                                    </span>
                                </div>
                            </div>

                            {/* Underwrite CTA Button */}
                            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
                                <a
                                    href="#contact-form"
                                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)] group/btn cursor-pointer"
                                >
                                    <span>Begin Sovereign Inquiry</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 7. FOOTNOTE / PEDIGREE GUARANTEE */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-widest text-zinc-500 text-center sm:text-left">
                    <span>
                        Archival Ref: Monte Comune FI-1347 • Sovereign Digital Standard
                    </span>
                    <span>
                        Guaranteed by Direct Founder Execution • Zero Junior Delegation
                    </span>
                </div>
            </div>
        </section>
    );
}

export default SovereignBondSection;
