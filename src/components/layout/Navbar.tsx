'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, Moon, Sun, Globe, ChevronDown } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useLenis } from 'lenis/react';
import { cn } from '@/lib/utils';

import CardNav from '@/components/ui/CardNav';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';
import { usePreloadState } from '@/components/ui/arc-preloader-hero';

function Clock() {
    const [time, setTime] = useState<string>('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const updateTime = () => {
            const now = new Date();
            const h = String(now.getHours()).padStart(2, '0');
            const m = String(now.getMinutes()).padStart(2, '0');
            const s = String(now.getSeconds()).padStart(2, '0');
            setTime(`${h}:${m}:${s}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!mounted) return <span className="font-mono text-xl md:text-2xl font-black opacity-0">00:00:00</span>;

    return (
        <span className="font-mono text-xl md:text-2xl font-black text-gradient tracking-widest hover:tracking-[0.2em] transition-all duration-300">
            {time}
        </span>
    );
}

// Sub-links for the "About" dropdown
// Sub-links for the "Explore" dropdown
const useNavItems = () => {
    return [
        {
            label: "Explore",
            links: [
                { label: "Work", href: "/projects", description: "Selected flagship builds & case studies" },
                { label: "Capabilities", href: "/skills", description: "Interactive design, creative code & systems" },
                { label: "Approach", href: "/experience", description: "Our 4-phase engagement process" },
                { label: "Studio", href: "/about", description: "Dual heritage, atelier ethos & leadership" },
                { label: "Gallery", href: "/gallery", description: "Curated visual archive & motion studies" },
            ]
        }
    ];
};

export function Navbar() {
    const t = useTranslations('navigation');
    const navItems = useNavItems();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const pathname = usePathname();
    const { scrollY } = useScroll();

    const lenis = useLenis();
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const lastScrollYRef = useRef(0);
    const [mounted, setMounted] = useState(false);
    
    // Consume preload state directly from context
    const { isPreloading: isPreloadActive } = usePreloadState();

    const isDark = mounted ? resolvedTheme === 'dark' : true;

    useEffect(() => {
        setMounted(true);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    // Lock body scroll and Lenis when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
            lenis?.stop();
        } else {
            document.body.style.overflow = '';
            lenis?.start();
        }
        return () => {
            document.body.style.overflow = '';
            lenis?.start();
        };
    }, [isMenuOpen, lenis]);

    // Close menu on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMenuOpen]);

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Track scroll for sticky/floating behavior with hysteresis
    useEffect(() => {
        return scrollY.on('change', (latest) => {
            const currentScrollY = latest;
            setIsScrolled(currentScrollY > 50);

            const diff = currentScrollY - lastScrollYRef.current;
            if (currentScrollY < 10) {
                setIsVisible(true);
            } else if (diff > 8 && currentScrollY > 100) {
                if (!isMenuOpen) {
                    setIsVisible(false);
                }
            } else if (diff < -8) {
                setIsVisible(true);
            }
            lastScrollYRef.current = currentScrollY;
        });
    }, [scrollY, isMenuOpen]);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const handleHomeClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    }, [pathname]);

    // Animation variants
    const navVariants = {
        visible: { y: 0, opacity: 1 },
        hidden: { y: -100, opacity: 0 }
    };

    const menuVariants = {
        closed: { opacity: 0 },
        open: { opacity: 1 }
    };

    return (
        <>
            <motion.nav
                variants={navVariants}
                initial="hidden"
                animate={isVisible || isMenuOpen ? 'visible' : 'hidden'}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="fixed top-0 left-0 right-0 z-[100]"
            >
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-4 md:py-6">
                    <motion.div
                        className={cn(
                            'flex items-center justify-between transition-all duration-500 rounded-full',
                            isScrolled ? 'glass-strong px-6 py-3' : 'py-2'
                        )}
                        layout
                    >
                        {/* Wordmark linking to Home */}
                        <Link href="/" className="relative group flex items-center gap-2 pl-3" onClick={handleHomeClick}>
                            <span className="font-mono text-xs font-black tracking-[0.25em] uppercase text-foreground group-hover:text-primary transition-colors">
                                GALILEO &amp; DUKE
                            </span>
                        </Link>

                        {/* Desktop Navigation with CardNav */}
                        <div className="hidden lg:flex items-center gap-4">
                            {/* HOME */}
                            <Link
                                href="/"
                                onClick={handleHomeClick}
                                className={cn(
                                    'relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full group',
                                    pathname === '/' ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span className="relative z-10">{t('home')}</span>
                            </Link>

                            {/* WORK */}
                            <Link
                                href="/projects"
                                className={cn(
                                    'relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full group',
                                    pathname.startsWith('/projects') ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span className="relative z-10">Work</span>
                            </Link>

                            {/* EXPLORE MEGAMENU */}
                            <CardNav
                                items={navItems}
                                theme={isDark ? 'dark' : 'light'}
                                pathname={pathname}
                            />

                            {/* CONTACT (Direct Link) */}
                            <Link
                                href="/contact"
                                className={cn(
                                    'relative px-4 py-2 text-sm font-bold transition-all duration-300 rounded-full group',
                                    pathname === '/contact' ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'
                                )}
                            >
                                <span className="relative z-10">{t('contact')}</span>
                            </Link>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-2 md:gap-3">
                            <motion.a
                                href="https://loopanishad.vercel.app"
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors inline-flex items-center justify-center text-foreground"
                                aria-label="Loopanishad"
                                title="Loopanishad"
                            >
                                <Globe className="w-4 h-4" />
                            </motion.a>

                            {mounted && (
                                <AnimatedThemeToggler />
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={toggleMenu}
                                className="p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors lg:hidden"
                                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                                aria-expanded={isMenuOpen}
                                aria-controls="mobile-navigation-menu"
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={isMenuOpen ? 'close' : 'menu'}
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.nav >

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {
                    isMenuOpen && (
                        <motion.div
                            id="mobile-navigation-menu"
                            role="dialog"
                            aria-modal="true"
                            aria-label="Mobile navigation"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[90] lg:hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-background"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            />

                            <div className="relative flex flex-col items-center justify-center h-full overflow-y-auto py-20">
                                <nav className="flex flex-col items-center gap-6">
                                    {/* Mobile Home */}
                                    <Link
                                        href="/"
                                        onClick={handleHomeClick}
                                        className="text-3xl font-black text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {t('home')}
                                    </Link>

                                    <Link
                                        href="/contact"
                                        onClick={closeMenu}
                                        className="text-3xl font-black text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {t('contact')}
                                    </Link>

                                    {/* Mobile Links grouped by Categories */}
                                    {navItems.map((category) => (
                                        <div key={category.label} className="flex flex-col items-center gap-4 py-4 border-b border-white/5 w-full last:border-0 text-center">
                                            <span className="text-[10px] font-black font-mono text-primary tracking-[0.3em] uppercase opacity-50">
                                                {category.label}
                                            </span>
                                            {category.links.map((link) => (
                                                <Link
                                                    key={link.label}
                                                    href={link.href}
                                                    onClick={closeMenu}
                                                    className={cn(
                                                        'text-2xl font-bold transition-all hover:scale-110 active:scale-95 duration-200',
                                                        pathname === link.href ? 'text-foreground' : 'text-muted-foreground/60 hover:text-foreground'
                                                    )}
                                                >
                                                    {link.label}
                                                </Link>
                                            ))}
                                        </div>
                                    ))}
                                </nav>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.5 }}
                                    className="flex items-center gap-4 mt-12"
                                >
                                    <a
                                        href="https://loopanishad.vercel.app"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-full glass-card text-sm font-medium hover:bg-muted/50 transition-colors flex items-center gap-2"
                                    >
                                        <Globe className="w-4 h-4" />
                                        <span>Loopanishad</span>
                                    </a>
                                    {mounted && (
                                        <AnimatedThemeToggler
                                            className="px-6 py-6 glass-card text-sm font-medium hover:bg-muted/50 flex items-center gap-2"
                                        />
                                    )}
                                </motion.div>
                            </div>
                        </motion.div >
                    )
                }
            </AnimatePresence >
        </>
    );
}
