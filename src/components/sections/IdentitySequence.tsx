"use client";

import React, { useRef } from "react";
import { motion, useTransform, useSpring, easeOut, easeInOut, circOut, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { portfolioData } from "@/data/portfolio";
import { InfiniteMarquee } from "@/components/ui/InfiniteMarquee";
import { BrandScroller, BrandScrollerReverse } from "@/components/ui/brand-scroller";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";

const BlurInUpText = ({ text, animate }: { text: string; animate: boolean }) => {
    const words = text.split(" ");
    return (
        <motion.span
            initial="hidden"
            animate={animate ? "visible" : "hidden"}
            transition={{ staggerChildren: 0.02 }}
            aria-label={text}
        >
            {words.map((word, wordIndex) => (
                <motion.span
                    key={wordIndex}
                    variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: { 
                            opacity: 1, 
                            y: 0, 
                            transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } 
                        }
                    }}
                    className="inline-block whitespace-pre"
                >
                    {word}{wordIndex < words.length - 1 ? "\u00A0" : ""}
                </motion.span>
            ))}
        </motion.span>
    );
};

interface IdentitySequenceProps {
    scrollYProgress: any; // Parent scroll progress [0, 1]
    isVisible: boolean;
}

export const IdentitySequence = ({ scrollYProgress, isVisible }: IdentitySequenceProps) => {
    const t = useTranslations("about");
    const [isHovered, setIsHovered] = React.useState(false);
    const [isTextAnimated, setIsTextAnimated] = React.useState(false);

    // Map the parent's scroll progress (0.32 to 0.95) to local progress (0 to 1).
    // With 350vh total section height, this provides generous, cinematic scroll travel.
    const localProgress = useTransform(scrollYProgress, [0.32, 0.95], [0, 1]);

    // 1. Card Transformation (Entrance & Scaling)
    const cardScale = useTransform(localProgress, [0, 0.22], [0.85, 1], { ease: easeInOut });
    const cardY = useTransform(localProgress, [0, 0.22], ["40vh", "0vh"], { ease: easeInOut });
    const cardBorderRadius = useTransform(localProgress, [0.05, 0.22], ["40px", "0px"], { ease: easeInOut });

    // 2. Internal Content Scroll - Marquee holds clearly before transitioning to the portrait
    // From 0.22 to 0.32: Marquee header is clearly visible and readable
    // From 0.32 to 0.72: Smooth vertical transition from Marquee to Galileo/Duke Portrait (centers at -100vh)
    // From 0.72 to 1.0: Portrait transitions gracefully to narrative and tech stack
    const contentY = useTransform(localProgress, [0.32, 0.72, 1], ["0vh", "-100vh", "-170vh"], { ease: easeInOut });
    const imageParallaxY = useTransform(localProgress, [0.32, 0.72], ["-3%", "3%"], { ease: easeInOut });

    // 3. Elements specific animations
    const phase0Opacity = useTransform(localProgress, [0, 0.1], [1, 0]);
    const cardContentOpacity = useTransform(localProgress, [0.08, 0.22], [0, 1]);
    const photoScale = useTransform(localProgress, [0.32, 0.72], [1.05, 1], { ease: easeInOut });
    const textOpacity = useTransform(localProgress, [0.75, 0.98], [0, 1]);

    useMotionValueEvent(localProgress, "change", (latest) => {
        if (latest > 0.82 && !isTextAnimated) {
            setIsTextAnimated(true);
        }
    });

    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);

    // 4. Background Color Transition (Smoothing the exit)
    const cardBg = useTransform(
        localProgress,
        [0.8, 1],
        ["#EBEBEB", "#FFFFFF"]
    );
    const cardBgDark = useTransform(
        localProgress,
        [0.8, 1],
        ["#18181b", "#000000"]
    );

    const { resolvedTheme } = useTheme();
    const isDark = mounted ? resolvedTheme === 'dark' : true;
    const cardBgValue = isDark ? cardBgDark : cardBg;

    // Dynamic vault frame gradients that always match the card's transitioning background
    const getGradient = (color: string, direction: 'to bottom' | 'to top') => {
        if (!color) return `linear-gradient(${direction}, #18181b, transparent)`;
        if (color.startsWith('#')) {
            const hex = color.replace('#', '');
            if (hex.length === 6) {
                const r = parseInt(hex.substring(0, 2), 16);
                const g = parseInt(hex.substring(2, 4), 16);
                const b = parseInt(hex.substring(4, 6), 16);
                return `linear-gradient(${direction}, rgba(${r}, ${g}, ${b}, 1), rgba(${r}, ${g}, ${b}, 0))`;
            }
        }
        const match = color.match(/\d+,\s*\d+,\s*\d+/);
        if (match) {
            return `linear-gradient(${direction}, rgba(${match[0]}, 1), rgba(${match[0]}, 0))`;
        }
        return `linear-gradient(${direction}, ${color}, transparent)`;
    };

    const vaultGradientDown = useTransform(cardBgValue, (color: string) => getGradient(color, 'to bottom'));
    const vaultGradientUp = useTransform(cardBgValue, (color: string) => getGradient(color, 'to top'));

    const marqueeItems = [
        <span key="1" className="text-[10rem] md:text-[16rem] font-black uppercase tracking-tighter mx-12 text-black dark:text-white leading-none">
            {portfolioData.personal.title}
        </span>,
        <div key="icon" className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#D1FF4D] flex items-center justify-center mx-12">
            <svg viewBox="0 0 100 100" className="w-20 h-20 md:w-32 md:h-32 fill-black dark:fill-zinc-900">
                <path d="M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0" />
            </svg>
        </div>
    ];

    return (
        <div className="relative w-screen h-full flex flex-col items-center justify-center overflow-hidden bg-background dark:bg-black">
            {/* Phase 0: The Lead-in UI (Visible before card scales) */}
            <motion.div
                style={{ opacity: phase0Opacity }}
                className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none -translate-y-12"
            >
                {/* Center Unified Action - Magnetic Group */}
                <div className="mb-16 pointer-events-auto">
                    <MagneticEffect>
                        <div className="group flex items-center gap-2 cursor-pointer">
                            <div className="relative px-10 py-5 rounded-full bg-black dark:bg-white group-hover:bg-[#c1e44a] dark:group-hover:bg-[#c1e44a] overflow-hidden transition-all duration-500 shadow-lg group-hover:shadow-[0_0_30px_rgba(193,228,74,0.3)]">
                                <div className="relative z-10 h-7 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <span className="text-white dark:text-black group-hover:text-black font-bold text-xl leading-7 transition-colors duration-500">
                                            {t("leadIn.aboutMe")}
                                        </span>
                                        <span className="text-black font-bold text-xl leading-7 transition-colors duration-500">
                                            {t("leadIn.aboutMe")}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative w-16 h-16 rounded-full bg-black dark:bg-white group-hover:bg-[#c1e44a] dark:group-hover:bg-[#c1e44a] overflow-hidden flex items-center justify-center transition-all duration-500 shadow-lg">
                                <div className="relative z-10 h-8 overflow-hidden">
                                    <div className="flex flex-col transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                                        <ArrowUpRight className="w-8 h-8 text-white dark:text-black group-hover:text-black transition-colors duration-500" />
                                        <ArrowUpRight className="w-8 h-8 text-black transition-colors duration-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </MagneticEffect>
                </div>

                {/* Unified Bottom Labels Layer */}
                <div className="w-full max-w-[1200px] flex items-center justify-between px-12">
                    <div className="flex items-center gap-3 text-zinc-500 dark:text-white/60 text-sm font-medium tracking-tight">
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-4 h-4 flex items-center justify-center"
                        >
                            ↓
                        </motion.span>
                        <span>{t("leadIn.scroll")}</span>
                    </div>

                    <div className="text-zinc-500 dark:text-white/60 text-sm font-medium tracking-tight">
                        {t("leadIn.shortStory")}
                    </div>
                </div>
            </motion.div>

            {/* The Main Card Container */}
            <motion.div
                suppressHydrationWarning
                style={{
                    scale: cardScale,
                    y: cardY,
                    borderRadius: cardBorderRadius,
                    backgroundColor: cardBgValue,
                    willChange: "transform, background-color",
                }}
                className="relative w-full h-full flex flex-col overflow-hidden origin-bottom z-10"
            >
                {/* Unified Scrolling Content Wrapper */}
                <motion.div
                    style={{ y: contentY }}
                    className="relative w-full flex flex-col items-center"
                >
                    {/* Phase 1: Marquee Header (Top of the long card) */}
                    <div className="w-full h-screen flex items-center justify-center flex-shrink-0">
                        <motion.div style={{ opacity: cardContentOpacity }} className="w-full">
                            <InfiniteMarquee
                                items={marqueeItems}
                                speed={18}
                                className="w-full"
                                itemClassName="py-12"
                            />
                        </motion.div>
                    </div>

                    {/* Phase 2: The Large Portrait (The "Explore" area) */}
                    <div className="relative w-full h-[100vh] flex flex-col items-center flex-shrink-0 px-4 md:px-10 lg:px-20">
                        {/* Sizing wrapper - not clipped */}
                        <div
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="relative w-full h-full max-w-[1500px] group/photo cursor-pointer"
                        >
                            {/* Image area - THIS is what clips. Vault frame is OUTSIDE this. */}
                            <div className="absolute inset-0 overflow-hidden">
                                <motion.div
                                    style={{
                                        scale: photoScale,
                                    }}
                                    animate={{
                                        filter: isHovered ? "grayscale(0%) contrast(1)" : "grayscale(100%) contrast(1.1)",
                                    }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    className="relative w-full h-full"
                                >
                                    <div className="absolute inset-0">
                                        {/* Parallax wrapper centered so head and face are always fully visible */}
                                        <div className="absolute inset-x-0 w-full h-[112%] -top-[6%]">
                                            <motion.div 
                                                className="relative h-full w-full" 
                                                style={{ y: imageParallaxY }}
                                            >
                                                <Image
                                                    src={isHovered ? "/about/duke.jpg" : portfolioData.personal.avatar}
                                                    alt={isHovered ? "Duke — Classical Pedigree" : "Galileo — Visionary Exploration"}
                                                    fill
                                                    className="object-cover object-[center_15%] grayscale-0 transition-opacity duration-700"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                                                    priority
                                                />
                                                <div className="absolute bottom-6 left-6 z-30 px-4 py-2 rounded-full glass-strong text-xs font-bold tracking-wider uppercase text-white shadow-lg pointer-events-none">
                                                    {isHovered ? "Duke — Classical Craft & Pedigree" : "Galileo — Visionary Wonder & Motion"}
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Vault frame - OUTSIDE overflow-hidden, extends 1px beyond clip edge to cover it */}
                            <div className="absolute inset-0 pointer-events-none z-20">
                                {/* Top bar: subtle frame that preserves head room */}
                                <motion.div suppressHydrationWarning style={{ backgroundColor: cardBgValue }} className="absolute -top-px left-0 w-full h-[24px]" />
                                <motion.div suppressHydrationWarning style={{ background: vaultGradientDown }} className="absolute top-[23px] left-0 w-full h-16" />
                                
                                {/* Bottom bar */}
                                <motion.div suppressHydrationWarning style={{ backgroundColor: cardBgValue }} className="absolute -bottom-px left-0 w-full h-[24px]" />
                                <motion.div suppressHydrationWarning style={{ background: vaultGradientUp }} className="absolute bottom-[23px] left-0 w-full h-16" />
                            </div>
                        </div>
                    </div>

                    {/* Phase 3: Final Layout Text */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto px-8 md:px-16 lg:px-24 pt-24 pb-8 md:pt-32 md:pb-12 flex-shrink-0"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
                            {/* Header Left */}
                            <div className="md:col-span-7">
                                <h3
                                    className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-snug text-black dark:text-white"
                                    dangerouslySetInnerHTML={{ __html: t.raw("profile.title") }}
                                />
                            </div>

                            {/* Paragraph Right */}
                            <div className="md:col-span-5 pt-1">
                                <p className="text-[13px] md:text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                                    <BlurInUpText 
                                        text={`${t("profile.narrative")} ${t("profile.narrative2")}`} 
                                        animate={isTextAnimated} 
                                    />
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Phase 4: Tech Stack & Tools Scrollers */}
                    <motion.div
                        style={{ opacity: textOpacity }}
                        className="w-full max-w-[1700px] mx-auto py-20 flex flex-col gap-8 flex-shrink-0"
                    >
                        <div className="px-8 md:px-16 lg:px-24 mb-6">
                            <h4 className="text-lg md:text-xl uppercase tracking-[0.15em] font-bold text-zinc-500 dark:text-zinc-400">
                                Tech Stack & Ecosystem
                            </h4>
                        </div>
                        <BrandScroller />
                        <BrandScrollerReverse />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
};
