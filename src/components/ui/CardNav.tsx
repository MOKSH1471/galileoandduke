'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, Trophy, Navigation, Briefcase, Rocket, ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLink {
    label: string;
    href: string;
    description?: string;
}

interface NavItem {
    label: string;
    links: NavLink[];
}

interface CardNavProps {
    items: NavItem[];
    theme?: 'light' | 'dark';
    pathname?: string;
}

function GridSnake({ theme }: { theme: string }) {
    const [pathX, setPathX] = useState<number[]>([]);
    const [pathY, setPathY] = useState<number[]>([]);
    
    useEffect(() => {
        const cols = 11; // ~264px max width
        const rows = 6;  // ~144px max height
        const gridSize = 24;
        
        let x = Math.floor(Math.random() * cols) * gridSize;
        let y = Math.floor(Math.random() * rows) * gridSize;
        
        const px = [x];
        const py = [y];
        
        for (let i = 0; i < 40; i++) {
            const isHorizontal = Math.random() > 0.5;
            const step = (Math.random() > 0.5 ? 1 : -1) * gridSize;
            
            if (isHorizontal) {
                x += step;
                if (x < 0) x = (cols - 1) * gridSize;
                else if (x >= cols * gridSize) x = 0;
            } else {
                y += step;
                if (y < 0) y = (rows - 1) * gridSize;
                else if (y >= rows * gridSize) y = 0;
            }
            
            px.push(x);
            py.push(y);
        }
        setPathX(px);
        setPathY(py);
    }, []);

    if (pathX.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-700">
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className={cn(
                        "absolute top-0 left-0 w-[24px] h-[24px]",
                        theme === 'dark' ? (i === 0 ? "bg-white/20" : "bg-white/10") : (i === 0 ? "bg-black/20" : "bg-black/10")
                    )}
                    animate={{
                        x: pathX,
                        y: pathY,
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.15
                    }}
                />
            ))}
        </div>
    )
}

function ActiveDot({ theme }: { theme: string }) {
    return (
        <span className="inline-flex ml-2 -translate-y-px align-middle">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#D1FF4D]"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D1FF4D] shadow-[0_0_5px_rgba(209,255,77,0.8)]"></span>
            </span>
        </span>
    );
}

function MegaBoxBig({ href, icon: Icon, title, desc, theme, pathname }: any) {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
    
    return (
        <Link href={href} className={cn(
            "group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 h-40 overflow-hidden",
            theme === 'dark'
                ? cn("bg-[#161616] hover:bg-[#1f1f1f] hover:shadow-xl hover:shadow-black/50", isActive ? "border-[#D1FF4D]/50 shadow-[0_0_15px_rgba(209,255,77,0.05)]" : "border-white/10 hover:border-white/20")
                : cn("hover:bg-white hover:shadow-xl hover:shadow-black/10", isActive ? "bg-white border-[#D1FF4D]/80 shadow-md shadow-[#D1FF4D]/10" : "bg-black/[0.02] border-black/10 hover:border-black/20")
        )}>
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            {/* Random Snake Animation */}
            <GridSnake theme={theme} />

            <Icon className={cn("w-6 h-6 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3", theme === 'dark' ? (isActive ? "text-[#D1FF4D]" : "text-white/70 group-hover:text-white") : (isActive ? "text-[#8cb815]" : "text-black/70 group-hover:text-black"))} />

            <div className="relative z-10 mt-auto">
                <h4 className={cn("font-bold text-[15px] mb-1.5 transition-colors duration-300 flex items-center", theme === 'dark' ? (isActive ? "text-[#D1FF4D]" : "text-white") : (isActive ? "text-[#8cb815]" : "text-black"))}>
                    {title}
                    {isActive && <ActiveDot theme={theme} />}
                </h4>
                <p className={cn("text-xs font-medium leading-relaxed transition-colors duration-300", theme === 'dark' ? "text-white/60 group-hover:text-white/80" : "text-black/60 group-hover:text-black/80")}>{desc}</p>
            </div>
            
            {/* Soft Glow overlay on hover */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                theme === 'dark' ? "bg-gradient-to-tr from-transparent via-white/5 to-transparent" : "bg-gradient-to-tr from-transparent via-black/5 to-transparent"
            )} />
        </Link>
    )
}

function MegaBoxSmall({ href, icon: Icon, title, desc, theme, pathname }: any) {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
    
    return (
        <Link href={href} className={cn(
            "group relative flex flex-col justify-center rounded-2xl border p-4 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden",
            theme === 'dark'
                ? cn("bg-[#161616] hover:bg-[#1f1f1f] hover:shadow-xl hover:shadow-black/50", isActive ? "border-[#D1FF4D]/50 shadow-[0_0_15px_rgba(209,255,77,0.05)]" : "border-white/10 hover:border-white/20")
                : cn("hover:bg-white hover:shadow-xl hover:shadow-black/10", isActive ? "bg-white border-[#D1FF4D]/80 shadow-md shadow-[#D1FF4D]/10" : "bg-black/[0.02] border-black/10 hover:border-black/20")
        )}>
            <div className="flex items-start justify-between relative z-10">
                <div>
                    <h4 className={cn("font-bold text-sm mb-1.5 transition-colors duration-300 flex items-center", theme === 'dark' ? (isActive ? "text-[#D1FF4D]" : "text-white") : (isActive ? "text-[#8cb815]" : "text-black"))}>
                        {title}
                        {isActive && <ActiveDot theme={theme} />}
                    </h4>
                    <p className={cn("text-[11px] font-medium leading-relaxed transition-colors duration-300", theme === 'dark' ? "text-white/60 group-hover:text-white/80" : "text-black/60 group-hover:text-black/80")}>{desc}</p>
                </div>
                <div className={cn("p-1.5 rounded-xl transition-colors duration-300", theme === 'dark' ? "group-hover:bg-white/10" : "group-hover:bg-black/5")}>
                    <Icon className={cn("w-4 h-4 mt-0.5 flex-shrink-0 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12", theme === 'dark' ? (isActive ? "text-[#D1FF4D]" : "text-white/40 group-hover:text-white/80") : (isActive ? "text-[#8cb815]" : "text-black/40 group-hover:text-black/80"))} />
                </div>
            </div>
        </Link>
    )
}

function GalleryFeatureCard({ theme, pathname }: { theme: string; pathname?: string }) {
    const isActive = pathname === '/gallery' || pathname?.startsWith('/gallery/');
    
    return (
        <Link
            href="/gallery"
            className={cn(
                "group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 h-full min-h-[200px] overflow-hidden",
                theme === 'dark'
                    ? cn("bg-[#161616] hover:bg-[#1f1f1f] hover:shadow-xl hover:shadow-black/50", isActive ? "border-[#D1FF4D]/50 shadow-[0_0_15px_rgba(209,255,77,0.05)]" : "border-white/10 hover:border-white/20")
                    : cn("hover:bg-white hover:shadow-xl hover:shadow-black/10", isActive ? "bg-white border-[#D1FF4D]/80 shadow-md shadow-[#D1FF4D]/10" : "bg-black/[0.02] border-black/10 hover:border-black/20")
            )}
        >
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <GridSnake theme={theme} />
            <div className="flex items-center justify-between relative z-10">
                <div className={cn("p-2.5 rounded-xl transition-colors", theme === 'dark' ? "bg-white/5 text-[#D1FF4D]" : "bg-black/5 text-[#8cb815]")}>
                    <ImageIcon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-foreground/5 text-muted-foreground">Archive</span>
            </div>
            <div className="relative z-10 mt-auto">
                <h4 className={cn("font-bold text-base mb-1.5 transition-colors duration-300 flex items-center", theme === 'dark' ? (isActive ? "text-[#D1FF4D]" : "text-white") : (isActive ? "text-[#8cb815]" : "text-black"))}>
                    Gallery
                    {isActive && <ActiveDot theme={theme} />}
                </h4>
                <p className={cn("text-xs font-medium leading-relaxed transition-colors duration-300", theme === 'dark' ? "text-white/60 group-hover:text-white/80" : "text-black/60 group-hover:text-black/80")}>
                    Visual portfolio & artifacts — creative captures, experimental renders, and design systems.
                </p>
            </div>
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none",
                theme === 'dark' ? "bg-gradient-to-tr from-transparent via-white/5 to-transparent" : "bg-gradient-to-tr from-transparent via-black/5 to-transparent"
            )} />
        </Link>
    );
}

export default function CardNav({
    items,
    theme = "dark",
    pathname = "/"
}: CardNavProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside or Escape
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
            }
        };
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isExpanded) {
                setIsExpanded(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isExpanded]);

    const aboutItem = items.find(i => i.label === "Explore" || i.label === "About") || items[0];
    const allHrefs = ['/projects', '/experience', '/skills', '/about', '/gallery'];
    const isActive = useMemo(() => {
        return allHrefs.some(href => pathname === href || pathname.startsWith(`${href}/`));
    }, [pathname]);

    return (
        <div ref={containerRef} className="relative">
            <motion.button
                suppressHydrationWarning
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-haspopup="true"
                aria-controls="card-nav-megamenu"
                aria-label="Explore navigation links"
                className={cn(
                    "relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-2 group",
                    isActive
                        ? "text-black dark:text-white bg-black/5 dark:bg-white/10"
                        : "text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white"
                )}
            >
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                <span className="relative z-10 flex items-center gap-2">
                    {isActive && isExpanded && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center justify-center"
                        >
                            <motion.span
                                animate={{ opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="w-1.5 h-1.5 rounded-full bg-[#D1FF4D] shadow-[0_0_8px_rgba(209,255,77,0.6)]"
                            />
                        </motion.div>
                    )}
                    {aboutItem.label}
                </span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                >
                    <ChevronDown className="w-4 h-4 opacity-50" />
                </motion.div>
            </motion.button>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        id="card-nav-megamenu"
                        role="region"
                        aria-label="Explore menu"
                        onClick={() => setIsExpanded(false)}
                        initial={{ opacity: 0, y: 10, scale: 0.98, x: "-50%" }}
                        animate={{ opacity: 1, y: 20, scale: 1, x: "-50%" }}
                        exit={{ opacity: 0, y: 10, scale: 0.98, x: "-50%" }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute top-full left-1/2 z-[100] pointer-events-auto"
                    >
                        <div className={cn(
                            "relative w-[800px] rounded-[1.5rem] border shadow-2xl flex backdrop-blur-2xl transition-all overflow-hidden",
                            theme === 'dark'
                                ? "bg-[#0a0a0a]/95 border-white/10 shadow-black/80"
                                : "bg-white/95 border-black/10 shadow-black/5"
                        )}>
                            {/* Left Main Area: Balanced 2x2 Grid */}
                            <div className="flex-1 p-5 flex flex-col gap-4">
                                {/* Top 2 big boxes */}
                                <div className="grid grid-cols-2 gap-4">
                                    <MegaBoxBig href="/projects" icon={Rocket} title="Work" desc="Selected flagship case studies" theme={theme} pathname={pathname} />
                                    <MegaBoxBig href="/experience" icon={Briefcase} title="Approach" desc="Our 4-phase engagement process" theme={theme} pathname={pathname} />
                                </div>
                                {/* Bottom 2 boxes */}
                                <div className="grid grid-cols-2 gap-4">
                                    <MegaBoxSmall href="/skills" icon={Navigation} title="Capabilities" desc="Interactive design & frontend systems" theme={theme} pathname={pathname} />
                                    <MegaBoxSmall href="/about" icon={Trophy} title="Studio" desc="Atelier ethos, dual heritage & team" theme={theme} pathname={pathname} />
                                </div>
                            </div>

                            {/* Right Sidebar: Dedicated Gallery Showcase */}
                            <div className={cn(
                                "w-[270px] p-5 flex flex-col border-l",
                                theme === 'dark' ? "border-white/5" : "border-black/5"
                            )}>
                                <GalleryFeatureCard theme={theme} pathname={pathname} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
