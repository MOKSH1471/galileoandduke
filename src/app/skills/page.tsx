'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, CheckCircle2, Sparkles, Layers, ShieldCheck } from 'lucide-react';
import { HardSkills } from '@/components/sections/skills/HardSkills';
import { KineticTechGrid } from '@/components/ui/KineticTechGrid';
import FeatureSection from '@/components/ui/stack-feature-section';
import { curatedTechnologies } from '@/data/capabilities';
import MagneticEffect from '@/components/ui/MagneticEffect';
import { Button } from '@/components/ui/button';

export default function SkillsPage() {
    return (
        <div className="min-h-screen bg-background relative selection:bg-primary/20">
            {/* 1. HERO — LIGHTWEIGHT & PURPOSEFUL (NO SPLINE 3D LAG) */}
            <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
                {/* Atmospheric Static Glow & Grid Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

                <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                    {/* Eyebrow Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 text-primary text-[11px] font-mono uppercase tracking-[0.3em] mb-6"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Capabilities</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-7xl lg:text-[76px] font-bold tracking-tight text-foreground leading-[1.08] mb-6 text-balance"
                    >
                        Websites, interactions, <br className="hidden sm:block" />
                        and tools built around <br className="hidden sm:block" />
                        your business.
                    </motion.h1>

                    {/* Supporting Text */}
                    <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-10 text-balance"
                    >
                        We bring design and engineering together to create distinctive web flagships, kinetic scroll experiences, and useful operational workflows.
                    </motion.p>

                    {/* Action CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4 relative z-20"
                    >
                        <MagneticEffect strength={0.6} stiffness={120} damping={10}>
                            <Button asChild className="rounded-full px-8 py-6 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                                <a href="#services">Explore Services</a>
                            </Button>
                        </MagneticEffect>

                        <MagneticEffect strength={0.6} stiffness={120} damping={10}>
                            <Button variant="outline" asChild className="rounded-full px-8 py-6 text-sm font-semibold bg-transparent border-border/80 text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                                <Link href="/contact" className="flex items-center gap-2">
                                    <span>Start a Project</span>
                                    <ArrowUpRight className="w-4 h-4" />
                                </Link>
                            </Button>
                        </MagneticEffect>
                    </motion.div>
                </div>
            </section>

            {/* 2. THREE CORE SERVICES & DELIVERABLES */}
            <HardSkills />

            {/* 3. CAPABILITIES IN PRACTICE (EVIDENCE & CASE STUDIES) */}
            <section id="evidence" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto relative z-10 border-t border-border/30">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-mono uppercase tracking-[0.25em] mb-4">
                        Evidence
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        Capabilities in Practice
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                        Verified production work and internal tooling that demonstrate our design, interaction, and automation standards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Case Study 1: NX Elit */}
                    <div className="group rounded-3xl border border-border/60 bg-card/50 overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-500 shadow-sm">
                        <div className="relative h-60 w-full overflow-hidden bg-muted">
                            <Image
                                src="/project/nx-elit/hero.jpg"
                                alt="NX Elit Case Study"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                    Website &amp; Motion
                                </span>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                NX Elit
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                                Boutique hospitality digital flagship with custom room curation, atmospheric dining presentation, and a direct reservation inquiry workflow.
                            </p>
                            <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-auto">
                                <span className="text-[11px] font-mono text-muted-foreground">Demo &amp; Code Ready</span>
                                <Link
                                    href="/projects/nx-elit"
                                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                                >
                                    <span>Case Study</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 2: Lead B */}
                    <div className="group rounded-3xl border border-border/60 bg-card/50 overflow-hidden flex flex-col hover:border-primary/40 transition-all duration-500 shadow-sm">
                        <div className="relative h-60 w-full overflow-hidden bg-muted">
                            <Image
                                src="/project/lead-b/hero.jpg"
                                alt="Lead B Case Study"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-white/90 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                                    Custom Tools &amp; Automation
                                </span>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                Lead B
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
                                Internal sales intelligence and automated prospecting pipeline orchestrating headless Playwright extraction and real-time Telegram alerts.
                            </p>
                            <div className="pt-4 border-t border-border/40 flex items-center justify-between mt-auto">
                                <span className="text-[11px] font-mono text-muted-foreground">Internal Pipeline</span>
                                <Link
                                    href="/projects/lead-b"
                                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:text-primary/80 group-hover:translate-x-1 transition-transform"
                                >
                                    <span>Case Study</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Case Study 3: Reserved for Private Application (MPL) */}
                    <div className="rounded-3xl border border-dashed border-border/70 bg-card/30 p-6 flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-[10px] font-mono uppercase tracking-wider mb-6">
                                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                                <span>Private Application</span>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                Client Application (MPL)
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                Full-stack private client application undergoing architecture review. Specific capabilities, technical scope, and outcomes will be documented post-verification.
                            </p>
                        </div>
                        <div className="pt-4 border-t border-border/40 mt-8">
                            <span className="text-[11px] font-mono text-muted-foreground block">
                                Verification in Progress
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. TECHNOLOGY BEHIND THE WORK (COMPACT CURATED GRID) */}
            <section id="stack" className="py-20 md:py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto relative z-10 border-t border-border/30">
                <div className="text-center mb-14 max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-mono uppercase tracking-[0.25em] mb-4">
                        Curated Stack
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
                        Technology Behind the Work
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground font-light leading-relaxed">
                        A focused, production-proven stack selected for responsiveness, architectural stability, and fluid motion.
                    </p>
                </div>

                <KineticTechGrid items={curatedTechnologies} />
            </section>

            {/* 5. CLOSING INVITATION CTA */}
            <FeatureSection />
        </div>
    );
}
