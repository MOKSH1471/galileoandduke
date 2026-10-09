"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Compass, ShieldCheck } from "lucide-react";
import MagneticEffect from "@/components/ui/MagneticEffect";

export default function FeatureSection() {
  return (
    <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 my-16 md:my-28 z-10">
      <div className="group flex flex-col lg:flex-row items-center justify-between border border-border/60 bg-card/60 backdrop-blur-xl overflow-hidden rounded-[2.5rem] shadow-sm relative transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)]">
        
        {/* Shine overlay that triggers on hover */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden rounded-[2.5rem]">
          <div className="absolute inset-0 -translate-x-[150%] w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:shine-effect" />
        </div>

        {/* Left side: Heading and Invitation Text */}
        <div className="w-full lg:w-[60%] z-20 p-8 sm:p-12 md:p-16 lg:p-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[10px] font-mono uppercase tracking-[0.25em] mb-6">
            Direct Studio Commission
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-foreground tracking-tight leading-[1.1]">
            Tell us what you <br className="hidden sm:block" /> want to build.
          </h2>
          
          <p className="text-muted-foreground mb-8 md:mb-10 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Share your project, priorities, and timeline. We will discuss the scope, technical architecture, and how Galileo &amp; Duke can engineer your digital presence.
          </p>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 relative z-30">
            <MagneticEffect strength={0.8} stiffness={120} damping={10}>
              <Button asChild className="rounded-full px-7 py-6 font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300">
                <Link href="/contact" className="flex items-center gap-2">
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Button>
            </MagneticEffect>

            <MagneticEffect strength={0.8} stiffness={120} damping={10}>
              <Button variant="outline" asChild className="rounded-full px-7 py-6 font-semibold text-sm bg-transparent border-border/80 text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                <Link href="/projects">Explore Our Work</Link>
              </Button>
            </MagneticEffect>
          </div>
        </div>

        {/* Right side: Dignified Studio Plaque / Details */}
        <div className="w-full lg:w-[40%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-border/40 bg-foreground/[0.01]">
          <div className="space-y-6 max-w-sm">
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary block">
                Studio Heritage
              </span>
              <h3 className="text-xl font-bold text-foreground">
                Galileo &amp; Duke
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Independent design and development practice. Direct communication with founders Moksh &amp; Varul from initial briefing through delivery.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-border/40">
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Scope-guaranteed delivery</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>60fps motion &amp; bespoke engineering</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                <Compass className="w-4 h-4 text-primary" />
                <span>Open for select commissions</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
