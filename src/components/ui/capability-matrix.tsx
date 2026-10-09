"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  capabilities: string[];
  href: string;
  cta: string;
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: "sensory-interaction",
    number: "01",
    title: "Sensory Interaction",
    category: "Motion & Dynamics",
    tagline: "Tactile micro-choreography and reactive mechanics that make interfaces feel physical.",
    description:
      "We sculpt fluid scroll transitions, organic physics simulations, and micro-interactions that respond intuitively to user intent — elevating browsing from passive scrolling into a memorable sensory journey.",
    capabilities: [
      "Physics-Driven UI",
      "Scroll Choreography",
      "Spatial Depth",
      "Micro-Interactions",
    ],
    href: "/projects",
    cta: "Explore Work",
  },
  {
    id: "architectural-rigor",
    number: "02",
    title: "Architectural Rigor",
    category: "Frontend Engineering",
    tagline: "Production Next.js systems engineered for sub-second speeds, zero shift, and enterprise longevity.",
    description:
      "Bespoke frontend engineering adhering to strict performance budgets. Sub-second initial paint, pristine semantic markup, edge caching, and resilient component architecture structured to scale.",
    capabilities: [
      "Next.js App Router",
      "Sub-Second TTFB",
      "Zero Layout Shift",
      "Edge Infrastructure",
    ],
    href: "/experience",
    cta: "Our Approach",
  },
  {
    id: "bespoke-identity",
    number: "03",
    title: "Bespoke Identity",
    category: "Creative Direction",
    tagline: "Custom type scales, tailored color science, and flagships that refuse to look like anyone else.",
    description:
      "We reject commoditized templates. Every flagship receives a tailor-made design system, singular typographic voice, and an atmospheric art direction crafted to define its own category.",
    capabilities: [
      "Design Token Systems",
      "Singular Typography",
      "Atmospheric Art Direction",
      "Zero Templates",
    ],
    href: "/about",
    cta: "Studio Ethos",
  },
  {
    id: "founder-craft",
    number: "04",
    title: "Founder Craft",
    category: "Direct Partnership",
    tagline: "Direct collaboration with Moksh and Varul from initial concept to production deployment.",
    description:
      "No account managers, no junior handoffs, and zero dilution of creative vision. We prototype rapidly, communicate with absolute transparency, and launch with uncompromising attention to detail.",
    capabilities: [
      "Direct Senior Craft",
      "Rapid Prototyping",
      "Milestone Transparency",
      "Global Delivery",
    ],
    href: "/contact",
    cta: "Initiate Project",
  },
];

export default function CapabilityMatrix() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
      {/* Top Category Label - Minimalist typographic marker without boxed borders */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-neutral-400 dark:text-neutral-500">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          <span>Atelier Disciplines & Standards</span>
        </div>
      </div>

      {/* Pure GPU-Accelerated CSS Accordion Matrix (Zero JS layout reflows) */}
      <div className="divide-y divide-neutral-200 dark:divide-white/10 border-y border-neutral-200 dark:border-white/10">
        {CAPABILITIES.map((item, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={item.id}
              onMouseEnter={() => {
                if (activeIndex !== index) setActiveIndex(index);
              }}
              onClick={() => setActiveIndex((prev) => (prev === index ? -1 : index))}
              className={cn(
                "group relative cursor-pointer py-5 sm:py-6 select-none transition-colors duration-200",
                isActive
                  ? "bg-neutral-50/60 dark:bg-white/[0.025]"
                  : "hover:bg-neutral-50/30 dark:hover:bg-white/[0.01]"
              )}
            >
              {/* Active Indicator Accent Line */}
              <div
                className={cn(
                  "absolute left-0 top-0 bottom-0 w-1 bg-primary transition-all duration-300 ease-out origin-top",
                  isActive ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                )}
              />

              {/* Main Row Header */}
              <div className="flex items-center justify-between gap-4 px-3 sm:px-6">
                <div className="flex items-center gap-5 sm:gap-8 flex-1">
                  {/* Number Index */}
                  <span
                    className={cn(
                      "font-serif-elegant italic text-2xl sm:text-4xl transition-colors duration-200 w-8 sm:w-12 text-left shrink-0",
                      isActive
                        ? "text-primary"
                        : "text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-400 dark:group-hover:text-neutral-500"
                    )}
                  >
                    {item.number}
                  </span>

                  {/* Title & Editorial Category Subtitle */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 flex-1">
                    <h3
                      className={cn(
                        "text-xl sm:text-2xl lg:text-3xl font-black tracking-tight transition-colors duration-200",
                        isActive
                          ? "text-neutral-900 dark:text-white"
                          : "text-neutral-700 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white"
                      )}
                    >
                      {item.title}
                    </h3>

                    {/* Clean typographic category marker (no box/pill) */}
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 font-medium">
                      / {item.category}
                    </span>
                  </div>
                </div>

                {/* Hardware-Accelerated CSS Rotating Right Arrow */}
                <div
                  className={cn(
                    "p-2 sm:p-2.5 rounded-full border transition-all duration-300 ease-out flex items-center justify-center shrink-0",
                    isActive
                      ? "border-primary/40 bg-primary/10 text-primary rotate-45"
                      : "border-neutral-200 dark:border-white/10 text-neutral-400 group-hover:border-neutral-300 dark:group-hover:border-white/20 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 rotate-0"
                  )}
                >
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>

              {/* Native GPU-Accelerated CSS Grid Transition (Zero JS layout thrashing) */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "transition-all duration-300 ease-out pt-5 pb-2 px-3 sm:px-6 pl-13 sm:pl-26 pr-4 sm:pr-8",
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    )}
                  >
                    {/* Tagline / Subtitle */}
                    <p className="text-base sm:text-lg font-medium text-neutral-900 dark:text-white leading-snug mb-2.5">
                      {item.tagline}
                    </p>

                    {/* Detailed Description */}
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-3xl mb-5">
                      {item.description}
                    </p>

                    {/* Clean inline typographic deliverables (no box tags) */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-mono text-neutral-500 dark:text-neutral-400 mb-6">
                      {item.capabilities.map((cap, i) => (
                        <React.Fragment key={cap}>
                          {i > 0 && (
                            <span className="text-neutral-300 dark:text-neutral-700 select-none">
                              •
                            </span>
                          )}
                          <span>{cap}</span>
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Action CTA Button */}
                    <div className="pt-1 pb-2">
                      <Link
                        href={item.href}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-black text-xs font-bold uppercase tracking-wider hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-md"
                      >
                        <span>{item.cta}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
