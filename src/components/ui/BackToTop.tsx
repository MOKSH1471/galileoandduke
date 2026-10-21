'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const isVisibleRef = useRef(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Magnetic Logic
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 120, damping: 14, mass: 0.1 });
    const mouseY = useSpring(y, { stiffness: 120, damping: 14, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const { height, width, left, top } = rect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            x.set(middleX);
            y.set(middleY);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Scroll Logic: Only show after scrolling past the first screenfold, hidden during rapid scroll
    useEffect(() => {
        const handleScroll = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            if (isVisibleRef.current) {
                setIsVisible(false);
                isVisibleRef.current = false;
            }

            timeoutRef.current = setTimeout(() => {
                const scrolledEnough = window.scrollY > 450;

                if (scrolledEnough && !isVisibleRef.current) {
                    setIsVisible(true);
                    isVisibleRef.current = true;
                } else if (!scrolledEnough && isVisibleRef.current) {
                    setIsVisible(false);
                    isVisibleRef.current = false;
                }
            }, 120);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <div
                    ref={ref}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[90] w-12 h-12 md:w-20 md:h-20 flex items-center justify-center pointer-events-none hide-on-modal transition-all duration-300"
                >
                    <motion.button
                        aria-label="Scroll to top"
                        title="Scroll to top"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.2 }}
                        onClick={scrollToTop}
                        style={{ x: mouseX, y: mouseY }}
                        className="relative h-10 w-10 md:h-12 md:w-12 rounded-full bg-foreground/90 hover:bg-foreground text-background shadow-xl flex items-center justify-center border border-background/20 backdrop-blur-md cursor-pointer group pointer-events-auto"
                    >
                        <ArrowUp className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />

                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-full bg-foreground/10 blur-md -z-10 group-hover:blur-xl transition-all" />
                    </motion.button>
                </div>
            )}
        </AnimatePresence>
    );
}
