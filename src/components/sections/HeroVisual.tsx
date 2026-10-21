import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Instagram, ArrowDownRight } from 'lucide-react';
import { portfolioData } from "@/data/portfolio";
import Link from 'next/link';
import gsap from "gsap";
import { Spotlight } from "@/components/ui/spotlight-new";

export function HeroVisual({ isExiting = false }: { isExiting?: boolean }) {
  const { personal } = portfolioData;

  const githubRef = useRef<HTMLDivElement>(null);
  const linkedinRef = useRef<HTMLDivElement>(null);
  const instagramRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isExiting) return;

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([githubRef.current, linkedinRef.current, instagramRef.current], { opacity: 1, y: 0 });
        return;
      }

      // Reveal + Loop for GitHub
      gsap.fromTo(githubRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(githubRef.current, {
              y: -8,
              duration: 2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true
            });
          }
        }
      );

      // Reveal + Loop for LinkedIn
      gsap.fromTo(linkedinRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(linkedinRef.current, {
              y: -8,
              duration: 2.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true
            });
          }
        }
      );

      // Reveal + Loop for Instagram
      gsap.fromTo(instagramRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
          onComplete: () => {
            gsap.to(instagramRef.current, {
              y: -8,
              duration: 1.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              force3D: true
            });
          }
        }
      );
    });

    // Pause floating loops when hero scrolls out of viewport (saves GPU/CPU)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          [githubRef.current, linkedinRef.current, instagramRef.current].forEach((el) => {
            if (el) gsap.getTweensOf(el).forEach((t) => t.resume());
          });
        } else {
          [githubRef.current, linkedinRef.current, instagramRef.current].forEach((el) => {
            if (el) gsap.getTweensOf(el).forEach((t) => { if (t.isActive()) t.pause(); });
          });
        }
      },
      { threshold: 0.01 }
    );
    if (heroSectionRef.current) observer.observe(heroSectionRef.current);

    // Pause when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        [githubRef.current, linkedinRef.current, instagramRef.current].forEach((el) => {
          if (el) gsap.getTweensOf(el).forEach((t) => t.pause());
        });
      } else {
        [githubRef.current, linkedinRef.current, instagramRef.current].forEach((el) => {
          if (el) gsap.getTweensOf(el).forEach((t) => t.resume());
        });
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      ctx.revert();
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isExiting]);

  return (
    <motion.div
      ref={heroSectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-background"
    >
      {/* Background Spotlight */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Spotlight
          translateY={-300}
          width={800}
          height={1600}
          smallWidth={400}
          duration={10}
          xOffset={120}
          gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 100%, .15) 0, hsla(0, 0%, 100%, .05) 50%, transparent 80%)"
          gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .1) 0, hsla(0, 0%, 100%, .02) 80%, transparent 100%)"
          gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 100%, .08) 0, hsla(0, 0%, 100%, 0) 80%, transparent 100%)"
        />
      </div>

      <section aria-label="Studio Introduction" className="relative flex-1 flex flex-col justify-center pt-32 sm:pt-36 md:pt-40 pb-16 z-10 max-w-[105rem] w-full mx-auto">
        <h1 className="sr-only">Galileo &amp; Duke — Design &amp; Development Studio</h1>
        <div className="flex relative gap-2 sm:gap-3 md:gap-4 px-6 items-center w-full flex-col justify-center">

          {/* Line 1: GALILEO */}
          <div className="flex flex-col items-center md:flex-row md:gap-8 md:items-center relative">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[10px] md:text-xs text-muted-foreground text-center md:text-right leading-relaxed max-w-[240px] font-medium uppercase tracking-[0.2em] mb-2 sm:mb-3 md:mb-0"
            >
              Galileo &amp; Duke — Design &amp; Development Studio by Moksh &amp; Varul.
            </motion.p>
            <div className="relative inline-block w-fit">
              {/* GitHub Floating Icon */}
              <div
                ref={githubRef}
                className="absolute -top-3 -right-3 sm:-right-4 md:-top-5 md:right-2 text-primary/70 hover:text-primary z-20 opacity-0"
              >
                <a
                  href={personal.socialLinks.find(s => s.platform === 'GitHub')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Galileo & Duke on GitHub"
                  className="block p-1 hover:scale-110 active:scale-95 transition-transform"
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </a>
              </div>
              <motion.div
                role="presentation"
                aria-hidden="true"
                initial={{ opacity: 0, y: 30 }}
                animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.2rem,11vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-3 md:px-4 select-none text-center"
              >
                GALILEO
              </motion.div>
            </div>
          </div>

          {/* Line 2: & DUKE */}
          <div className="flex flex-col items-center md:flex-row md:gap-8 md:items-center relative">
            <div className="relative inline-block w-fit">
              {/* LinkedIn Floating Icon:
                  On mobile: Centered vertically on the right flank of "& DUKE".
                  On desktop: Positioned at md:-top-8 md:left-4.
              */}
              <div
                ref={linkedinRef}
                className="absolute top-1/2 -translate-y-1/2 -right-7 sm:-right-8 md:translate-y-0 md:top-auto md:-top-8 md:left-4 md:right-auto text-primary/70 hover:text-primary z-20 opacity-0"
              >
                <a
                  href={personal.socialLinks.find(s => s.platform === 'LinkedIn')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Galileo & Duke on LinkedIn"
                  className="block p-1 hover:scale-110 active:scale-95 transition-transform"
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </a>
              </div>

              {/* Instagram Floating Icon:
                  On mobile: Positioned at the bottom-right of "& DUKE" in the open pocket above subtitle.
                  On desktop: md:-bottom-10 md:right-24.
              */}
              <div
                ref={instagramRef}
                className="absolute -bottom-5 right-0 sm:right-2 md:-bottom-10 md:right-24 text-primary/70 hover:text-primary z-20 opacity-0"
              >
                <a
                  href={personal.socialLinks.find(s => s.platform === 'Instagram')?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Galileo & Duke on Instagram"
                  className="block p-1 hover:scale-110 active:scale-95 transition-transform"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
                </a>
              </div>

              <motion.div
                role="presentation"
                aria-hidden="true"
                initial={{ opacity: 0, y: 30 }}
                animate={isExiting ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(3.2rem,11vw,13rem)] font-black leading-[0.85] tracking-tighter text-shiny will-change-transform px-3 md:px-4 select-none text-center"
              >
                &amp; DUKE
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-[10px] md:text-xs text-muted-foreground text-center md:text-left pt-6 sm:pt-7 md:pt-8 leading-relaxed max-w-[260px] md:max-w-[200px] font-medium uppercase tracking-widest"
            >
              Cinematic Motion • Spatial 3D • Bespoke Engineering
            </motion.p>
          </div>

          {/* Core Agency Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 md:mt-10 max-w-3xl px-4 text-center mx-auto"
          >
            <p className="text-base sm:text-lg md:text-2xl font-medium text-foreground/90 leading-relaxed text-balance">
              We engineer digital flagships for ambitious brands — uniting cinematic art direction, tactile interaction, and bespoke systems that transcend the template.
            </p>
          </motion.div>
        </div>

        {/* Separator Section with Dual Permanently Visible CTAs */}
        <div className="mx-auto max-w-[105rem] w-full px-6 sm:px-8 md:px-20 mt-12 md:mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-[10px] md:text-xs whitespace-nowrap font-bold tracking-[0.3em] text-muted-foreground uppercase text-center sm:text-left">
              KOLKATA, INDIA — 2026
            </div>
            <Separator className="flex-1 h-[1px] bg-foreground/10 hidden md:block" />
            <div className="flex items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3.5 rounded-full bg-foreground text-background font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                <span>Start a Project</span>
                <ArrowDownRight className="w-4 h-4" />
              </Link>
              <Link
                href="#capabilities"
                className="inline-flex items-center gap-2 px-5 md:px-7 py-3.5 rounded-full border border-foreground/20 text-foreground font-bold text-xs uppercase tracking-widest hover:bg-foreground/5 hover:border-foreground/40 transition-all"
              >
                <span>View Work</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
