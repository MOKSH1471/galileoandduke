'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring, useMotionValue } from 'framer-motion';
import { cn } from "@/lib/utils";
import { ChevronDown } from 'lucide-react';
import Loader from './Loader';

const pages = [
    {
        leftBgImage: null,
        rightBgImage: null,
        leftLoaderType: 'leads' as const,
        leftComponent: null,
        leftContent: null,
        rightContent: {
            tag: "PART 01 — CLIENT ACQUISITION",
            heading: 'Bringing In Leads',
            description: 'Transforming digital touchpoints into high-intent inbound client pipelines. We engineer bespoke conversion funnels, strategic positioning, and tactile capture mechanisms designed to attract, qualify, and convert premium opportunities.',
            skills: ["Inbound Pipelines", "High-Intent Capture", "Conversion Funnels", "Audience Targeting", "Positioning Strategy", "Lead Qualification"],
            hoverColor: "bg-amber-600/10"
        },
    },
    {
        leftBgImage: null,
        rightBgImage: null,
        leftComponent: null,
        rightLoaderType: 'execution' as const,
        rightComponent: null,
        leftContent: {
            tag: "PART 02 — BESPOKE CRAFT & PRODUCTION",
            heading: 'Execution & Website Building',
            description: 'Translating ambitious vision into flawless, production-grade digital flagships. We build with architectural rigor, custom motion choreography, strict TypeScript, and uncompromising 60fps performance structured to endure.',
            skills: ["Custom Web Builds", "Next.js App Router", "Strict TypeScript", "60fps Motion", "Modular Architecture", "Production Deployment"],
            hoverColor: "bg-indigo-600/10"
        },
        rightContent: null,
    },
    {
        isBridge: true,
        heading: 'Discover our commissioned works \nand bespoke digital flagships',
        subheading: 'SCROLL TO EXPLORE',
    }
];

export default function ScrollAdventure() {
    const [currentPage, setCurrentPage] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        mass: 0.1,
        restDelta: 0.001
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const totalPages = pages.length;
        const step = 1 / totalPages;
        const index = Math.min(Math.floor(latest / step) + 1, totalPages);
        if (currentPage !== index) setCurrentPage(index);
    });
    const { scrollYProgress: enterProgressRaw } = useScroll({
        target: containerRef,
        offset: ["start end", "start start"]
    });

    const enterScale = useTransform(enterProgressRaw, [0, 1], [0.85, 1]);
    const enterOpacity = useTransform(enterProgressRaw, [0, 1], [0, 1]);
    const enterBorderRadius = useTransform(enterProgressRaw, [0, 1], ["40px", "0px"]);

    return (
        <div ref={containerRef} className="relative h-[600vh] w-full pointer-events-none">
            <motion.div
                style={{ scale: enterScale, opacity: enterOpacity, borderRadius: enterBorderRadius }}
                className="sticky top-0 h-screen w-full overflow-hidden bg-background dark:bg-black pointer-events-auto origin-center"
            >
                {pages.map((page, i) => {
                    if ('isBridge' in page) {
                        return (
                            <BridgeSlide
                                key={i}
                                page={page}
                                isActive={currentPage === i + 1}
                                scrollProgress={smoothProgress}
                                index={i}
                            />
                        );
                    }
                    return (
                        <PageSlide
                            key={i}
                            page={page}
                            isActive={currentPage === i + 1}
                            scrollProgress={smoothProgress}
                            index={i}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
}

function PageSlide({ page, isActive, scrollProgress, index }: { page: any, isActive: boolean, scrollProgress: any, index: number }) {
    const leftHasVisual = !!page.leftBgImage || !!page.leftComponent || !!page.leftLoaderType;
    const rightHasVisual = !!page.rightBgImage || !!page.rightComponent || !!page.rightLoaderType;

    const totalPages = pages.length;
    const step = 1 / totalPages;

    const enterStart = index === 0 ? -0.1 : (index - 0.45) * step;
    const enterEnd = index === 0 ? -0.01 : (index + 0.1) * step;
    const exitStart = (index + 0.55) * step;
    const exitEnd = (index + 1.1) * step;

    const leftY = useTransform(
        scrollProgress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [leftHasVisual ? "-120%" : "120%", "0%", "0%", leftHasVisual ? "-120%" : "120%"]
    );

    const rightY = useTransform(
        scrollProgress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [rightHasVisual ? "-120%" : "120%", "0%", "0%", rightHasVisual ? "-120%" : "120%"]
    );

    const zIndex = useTransform(
        scrollProgress,
        [enterStart, enterEnd, exitStart, exitEnd],
        [10, 20, 20, 10]
    );

    return (
        <motion.div style={{ zIndex }} className="absolute inset-0 flex items-center justify-center pointer-events-none p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Unified Card Container */}
            <div className="relative w-full h-full max-w-[1600px] flex flex-col md:flex-row pointer-events-auto overflow-hidden rounded-2xl md:rounded-3xl border border-border/10 dark:border-white/10">

                {/* LEFT HALF OF THE SPLIT CARD */}
                <motion.div
                    style={{ y: leftY }}
                    className="relative w-full md:w-1/2 h-1/2 md:h-full bg-background dark:bg-black z-10 overflow-hidden"
                >
                    <div className="w-full h-full relative overflow-hidden">
                        {page.leftLoaderType ? (
                            <BlendedVisual component={<Loader type={page.leftLoaderType} active={isActive} />} side="left" />
                        ) : page.leftComponent ? (
                            <BlendedVisual component={page.leftComponent} side="left" />
                        ) : page.leftBgImage ? (
                            <BlendedVisual src={page.leftBgImage} side="left" />
                        ) : (
                            <div className="w-full h-full flex flex-col justify-center items-start p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 relative group overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:none">
                                <motion.div
                                    className={cn("absolute inset-0 z-0", page.leftContent?.hoverColor || "bg-primary/5")}
                                    initial={{ height: 0 }}
                                    whileHover={{ height: '100%' }}
                                    transition={{ duration: 0.4 }}
                                />
                                {page.leftContent && <EditorialContent content={page.leftContent} index={index} />}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* RIGHT HALF OF THE SPLIT CARD */}
                <motion.div
                    style={{ y: rightY }}
                    className="relative w-full md:w-1/2 h-1/2 md:h-full bg-background dark:bg-black z-10 overflow-hidden"
                >
                    <div className="w-full h-full relative overflow-hidden">
                        {page.rightLoaderType ? (
                            <BlendedVisual component={<Loader type={page.rightLoaderType} active={isActive} />} side="right" />
                        ) : page.rightComponent ? (
                            <BlendedVisual component={page.rightComponent} side="right" />
                        ) : page.rightBgImage ? (
                            <BlendedVisual src={page.rightBgImage} side="right" />
                        ) : (
                            <div className="w-full h-full flex flex-col justify-center items-start p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 relative group overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:none">
                                <motion.div
                                    className={cn("absolute inset-0 z-0", page.rightContent?.hoverColor || "bg-primary/5")}
                                    initial={{ height: 0 }}
                                    whileHover={{ height: '100%' }}
                                    transition={{ duration: 0.4 }}
                                />
                                {page.rightContent && <EditorialContent content={page.rightContent} index={index} />}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

function BridgeSlide({ page, isActive, scrollProgress, index }: { page: any, isActive: boolean, scrollProgress: any, index: number }) {
    const totalPages = pages.length;
    const step = 1 / totalPages;
    const enterStart = (index - 0.5) * step;
    const enterEnd = index * step;

    // Adjusted exit to be ZERO-GAP: text stays visible until the very end of the scroll
    const opacity = useTransform(scrollProgress, [enterStart, enterEnd, 0.98, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollProgress, [enterStart, enterEnd, 0.98, 1], [50, 0, 0, -50]);

    return (
        <motion.div
            style={{ opacity, zIndex: 30 }}
            className={cn(
                "absolute inset-0 bg-background dark:bg-black flex flex-col items-center justify-center p-12 text-center",
                isActive ? "pointer-events-auto" : "pointer-events-none"
            )}
        >
            <motion.div style={{ y }} className="space-y-16 max-w-[1200px] w-full px-[5%]">
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-foreground dark:text-white leading-[1.1] font-sans">
                    {(page.heading || "Discover our commissioned works \nand bespoke digital flagships")
                        .split('\n')
                        .map((line: string, i: number, arr: string[]) => (
                            <React.Fragment key={i}>
                                {line}
                                {i !== arr.length - 1 && <br className="hidden md:block" />}
                            </React.Fragment>
                        ))}
                </h2>
                <div className="flex flex-col items-center gap-6 opacity-30 pt-10">
                    <span className="text-[11px] font-mono font-bold tracking-[0.5em] uppercase text-foreground dark:text-white">
                        {page.subheading}
                    </span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ChevronDown className="w-6 h-6 text-foreground dark:text-white" />
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function BlendedVisual({ src, component, side }: { src?: string, component?: React.ReactNode, side: 'left' | 'right' }) {
    return (
        <div className="relative w-full h-full overflow-hidden bg-background dark:bg-black flex items-center justify-center">
            {src ? (
                <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform grayscale hover:grayscale-0 transition-[filter] duration-1000"
                    style={{ backgroundImage: `url(${src})` }}
                />
            ) : component ? (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <div className="w-full h-full flex items-center justify-center transform scale-[1.4] sm:scale-[1.7] lg:scale-[2.0]">
                        {component}
                    </div>
                </motion.div>
            ) : null}
            {/* Horizontal Blend (Masked to avoid WebKit transparent color interpolation bug) */}
            <div
                className="absolute inset-0 pointer-events-none z-10 bg-background dark:bg-black hidden md:block"
                style={{
                    WebkitMaskImage: side === 'left'
                        ? 'linear-gradient(to right, transparent, black)'
                        : 'linear-gradient(to left, transparent, black)',
                    maskImage: side === 'left'
                        ? 'linear-gradient(to right, transparent, black)'
                        : 'linear-gradient(to left, transparent, black)'
                }}
            />
            {/* Vertical Blend (Masked to avoid WebKit transparent color interpolation bug) */}
            <div
                className="absolute inset-0 pointer-events-none z-10 bg-background dark:bg-black opacity-40 hidden md:block"
                style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, black, transparent, black)',
                    maskImage: 'linear-gradient(to bottom, black, transparent, black)'
                }}
            />
        </div>
    );
}

function EditorialContent({ content, index }: { content: any, index: number }) {
    return (
        <div className="flex flex-col items-start text-left space-y-6 md:space-y-8 max-w-xl xl:max-w-2xl w-full relative z-10">
            <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-4 sm:gap-6">
                    <span className="text-[10px] sm:text-[11px] font-mono font-black tracking-[0.3em] sm:tracking-[0.4em] text-primary uppercase opacity-75">
                        {content.tag || `FEATURE — 0${index + 1}`}
                    </span>
                    <div className="h-[1px] w-8 sm:w-12 bg-primary/20" />
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-bold uppercase tracking-tighter leading-[1.08] text-foreground font-sans transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-4 sm:hover:translate-x-6 hover:text-foreground/50 pointer-events-auto cursor-default origin-left">
                    {content.heading}
                </h2>
                <p className="text-sm sm:text-base lg:text-lg text-muted-foreground font-medium leading-relaxed max-w-lg">
                    {content.description}
                </p>
            </div>
            {content.skills && (
                <div className="flex flex-wrap gap-2 sm:gap-3 pt-2 sm:pt-4">
                    {content.skills.map((skill: string, idx: number) => (
                        <MagneticTag key={skill} text={skill} index={idx} />
                    ))}
                </div>
            )}
        </div>
    );
}

function MagneticTag({ text, index }: { text: string, index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const colors = [
        { main: "bg-emerald-500", textHover: "group-hover/badge:text-white" },
        { main: "bg-blue-500", textHover: "group-hover/badge:text-white" },
        { main: "bg-violet-500", textHover: "group-hover/badge:text-white" },
        { main: "bg-rose-500", textHover: "group-hover/badge:text-white" },
        { main: "bg-amber-500", textHover: "group-hover/badge:text-black" },
        { main: "bg-cyan-500", textHover: "group-hover/badge:text-black" }
    ];
    const color = colors[index % colors.length];

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative cursor-pointer p-1 -m-1 pointer-events-auto"
        >
            <motion.div
                style={{ x: springX, y: springY }}
                className="group/badge relative overflow-hidden text-[9px] sm:text-[10px] md:text-[11px] font-extrabold uppercase tracking-wider sm:tracking-widest text-black dark:text-white border border-foreground/10 px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg sm:rounded-xl bg-foreground/[0.02] backdrop-blur-xl hover:border-transparent transition-colors duration-300"
            >
                <div className={cn("absolute inset-0 translate-y-[101%] group-hover/badge:translate-y-0 transition-transform duration-300 ease-out z-0", color.main)} />
                <span className={cn("relative z-10 transition-colors duration-300", color.textHover)}>{text}</span>
            </motion.div>
        </div>
    );
}

