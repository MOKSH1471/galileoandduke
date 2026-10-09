'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { portfolioData } from '@/data/portfolio';
import { ArrowUpRight, Compass, Shield, Sparkles, Box, Code2, Globe, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import CTASection from '@/components/sections/CTASection';

export default function StudioPage() {
    const t = useTranslations('about');
    const founders = portfolioData.founders ?? [];

    const values = [
        {
            title: "Beyond The Template",
            tag: "Philosophy",
            description: "Templates commoditize brands. We reject pre-packaged components in favor of bespoke spatial canvases, customized typography systems, and unique physics-based interactions."
        },
        {
            title: "Performance Without Compromise",
            tag: "Engineering",
            description: "Sensory richness shouldn't penalize loading speeds. We engineer with strict performance budgets, lightweight render loops, zero layout shift, and instant responsiveness on every device."
        },
        {
            title: "Founders on the Canvas",
            tag: "Collaboration",
            description: "Direct collaboration with Moksh and Varul at every phase. Zero layers of account management, zero dilution of vision, and rapid iteration from creative concept to production launch."
        }
    ];

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* 1. HERO SECTION */}
            <section className="relative pt-44 pb-28 md:pt-56 md:pb-36 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
                <div className="flex flex-col gap-6 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-mono uppercase tracking-[0.25em] w-fit"
                    >
                        <Compass className="w-3.5 h-3.5" /> Studio Ethos & Leadership
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.95]"
                    >
                        Engineering digital experiences that command attention.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mt-4"
                    >
                        Galileo & Duke is an independent design and development studio founded by Moksh and Varul. 
                        We build web flagships that transcend templates through cinematic motion, spatial depth, and architectural rigor.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs text-muted-foreground"
                    >
                        <span className="flex items-center gap-1.5 bg-secondary/30 px-3 py-1.5 rounded-lg border border-border">
                            <MapPin className="w-3.5 h-3.5 text-primary" /> Kolkata, India — Operating Globally
                        </span>
                        <span className="flex items-center gap-1.5 bg-secondary/30 px-3 py-1.5 rounded-lg border border-border">
                            <Globe className="w-3.5 h-3.5 text-primary" /> UTC+5:30 (IST)
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* 2. THE HERITAGE: GALILEO & DUKE */}
            <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    <div className="lg:col-span-4">
                        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary font-bold block mb-3">
                            Heritage Dualism
                        </span>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                            The Science of Wonder & The Rigor of Craft.
                        </h2>
                        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                            Our studio identity reflects the complementary forces that drive exceptional digital products: fearless celestial curiosity balanced by unyielding classical discipline.
                        </p>
                    </div>

                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Galileo Pillar */}
                        <div className="p-8 rounded-3xl bg-card/60 border border-border/60 backdrop-blur-sm relative overflow-hidden group hover:border-primary/40 transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                                Studio Archetype // 01
                            </span>
                            <h3 className="text-2xl font-black tracking-tight mt-1 mb-3">
                                Galileo — Visionary Motion
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Inspired by celestial mechanics and the spirit of discovery, we bring the web to life with organic physics, dynamic light play, and choreographies that invite exploration.
                            </p>
                            <div className="mt-8 pt-4 border-t border-border/40 font-mono text-[11px] text-muted-foreground/70">
                                Spatial Direction • Interactive Canvas • Sensory UI • Kinetic Form
                            </div>
                        </div>

                        {/* Duke Pillar */}
                        <div className="p-8 rounded-3xl bg-card/60 border border-border/60 backdrop-blur-sm relative overflow-hidden group hover:border-primary/40 transition-colors">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                                <Shield className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                                Studio Archetype // 02
                            </span>
                            <h3 className="text-2xl font-black tracking-tight mt-1 mb-3">
                                Duke — Architectural Pedigree
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Embodying structural permanence and dignified restraint: timeless typography, disciplined frontend architecture, and resilient code built to sustain enterprise growth.
                            </p>
                            <div className="mt-8 pt-4 border-t border-border/40 font-mono text-[11px] text-muted-foreground/70">
                                Scalable Architecture • Design Systems • Zero Layout Shift • Code Health
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. THE FOUNDERS */}
            <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
                <div className="mb-16 text-center max-w-2xl mx-auto">
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary font-bold block mb-3">
                        Studio Leadership
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                        Direct Founder Access.
                    </h2>
                    <p className="text-sm md:text-base text-muted-foreground mt-4 font-light">
                        Every engagement is spearheaded directly by Moksh and Varul. We design, prototype, and build alongside our clients.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {founders.map((founder) => (
                        <div
                            key={founder.id}
                            className="p-8 md:p-10 rounded-3xl bg-card/60 border border-border/60 backdrop-blur-sm flex flex-col justify-between group hover:border-primary/40 transition-all duration-300"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border border-border">
                                        <Image
                                            src={founder.image}
                                            alt={founder.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                        {founder.heritageSymbol}
                                    </span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                                    {founder.name}
                                </h3>
                                <p className="text-xs font-mono text-primary font-bold uppercase tracking-wider mt-1 mb-4">
                                    {founder.role}
                                </p>
                                <p className="text-sm text-foreground/80 font-medium mb-3">
                                    {founder.focus}
                                </p>
                                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                                    {founder.bio}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                                    Connect
                                </span>
                                <div className="flex items-center gap-4">
                                    {founder.social?.github && (
                                        <a href={founder.social.github} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                            GitHub <ArrowUpRight className="w-3 h-3" />
                                        </a>
                                    )}
                                    {founder.social?.instagram && (
                                        <a href={founder.social.instagram} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                                            Instagram <ArrowUpRight className="w-3 h-3" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. CORE VALUES & PHILOSOPHY */}
            <section className="py-24 md:py-36 px-6 md:px-12 max-w-[1400px] mx-auto border-b border-border/40">
                <div className="mb-16">
                    <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-primary font-bold block mb-3">
                        Principles of Operation
                    </span>
                    <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                        How We Work With Ambitious Brands.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((v, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-secondary/10 border border-border/40 flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                                    0{i + 1} // {v.tag}
                                </span>
                                <h3 className="text-xl font-bold tracking-tight text-foreground mt-2 mb-4">
                                    {v.title}
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {v.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. CTA SECTION */}
            <div className="py-20">
                <CTASection />
            </div>
        </main>
    );
}
