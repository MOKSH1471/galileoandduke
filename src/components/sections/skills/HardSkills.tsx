"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Layout, Sparkles, Cpu, ArrowRight, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { capabilityOfferings, CapabilityOffering } from "@/data/capabilities";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'website-design': Layout,
  'motion-interaction': Sparkles,
  'custom-tools': Cpu
};

export const HardSkills = () => {
  const [expandedScope, setExpandedScope] = useState<Record<string, boolean>>({
    'website-design': false,
    'motion-interaction': false,
    'custom-tools': false
  });

  const toggleScope = (id: string) => {
    setExpandedScope(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="services" className="w-full bg-background pt-16 md:pt-24 pb-20 relative overflow-hidden">
      {/* Ambient background light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1400px] px-4 md:px-8 mx-auto relative z-10 flex flex-col items-center">
        {/* Title Section */}
        <div className="text-center mb-16 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-[11px] font-mono uppercase tracking-[0.25em] mb-4"
          >
            Studio Services
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="tracking-tight text-balance text-4xl font-bold md:text-5xl lg:text-6xl text-foreground mb-4"
          >
            Capabilities & Deliverables
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-muted-foreground font-light leading-relaxed"
          >
            Bespoke web experiences, interaction choreography, and operational automation engineered to endure.
          </motion.p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full relative z-10 items-stretch">
          {capabilityOfferings.map((offering, colIdx) => {
            const Icon = iconMap[offering.id] || Sparkles;
            const isScopeExpanded = expandedScope[offering.id];

            return (
              <motion.div
                key={offering.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + colIdx * 0.1 }}
                className="flex flex-col bg-card/60 backdrop-blur-md border border-border/60 hover:border-primary/40 rounded-3xl p-6 sm:p-7 shadow-sm transition-all duration-300 h-full group"
              >
                {/* Pillar Header */}
                <div className="flex items-start justify-between pb-6 mb-6 border-b border-border/40">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground tracking-tight leading-snug">
                        {offering.title}
                      </h3>
                      <p className="text-xs text-primary font-mono font-medium uppercase tracking-wider mt-0.5">
                        {offering.tag}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Purpose / Subtitle */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-normal">
                  {offering.subtitle}
                </p>

                {/* Deliverables Section */}
                <div className="space-y-3 mb-6 flex-grow">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-foreground/80 block mb-2">
                    Key Deliverables
                  </span>
                  <ul className="space-y-2.5">
                    {offering.deliverables.map((item, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-muted-foreground leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Technical Scope */}
                <div className="pt-4 border-t border-border/40 mb-6">
                  <button
                    onClick={() => toggleScope(offering.id)}
                    aria-expanded={isScopeExpanded}
                    className="w-full flex items-center justify-between text-xs font-mono font-medium text-muted-foreground hover:text-foreground py-1 transition-colors"
                  >
                    <span>Scope Details ({offering.scope.length})</span>
                    {isScopeExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <AnimatePresence>
                    {isScopeExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden pt-3"
                      >
                        <div className="flex flex-wrap gap-1.5">
                          {offering.scope.map((s, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-secondary/60 text-secondary-foreground border border-border/50"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer: Related Work Link & CTA */}
                <div className="mt-auto pt-4 border-t border-border/40 flex flex-col gap-3">
                  <Link
                    href={`/projects/${offering.relatedProjectSlug}`}
                    className="inline-flex items-center justify-between text-xs font-mono text-foreground/80 hover:text-primary transition-colors py-1 group/link"
                  >
                    <span className="truncate">Evidence: {offering.relatedProjectTitle.split('—')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href="/contact"
                    className="w-full py-2.5 px-4 rounded-xl text-center text-xs font-semibold bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 hover:border-primary transition-all duration-300"
                  >
                    Start an Inquiry
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HardSkills;
