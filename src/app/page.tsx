'use client';

import dynamic from 'next/dynamic';
import ExpertiseSection from '@/components/sections/ExpertiseSection';
import { HeroVisual } from '@/components/sections/HeroVisual';

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), {
    loading: () => <div className="min-h-[100vh] bg-background" />
});

const StatsSection = dynamic(() => import('@/components/sections/StatsSection'), {
    loading: () => <div className="min-h-[100vh] bg-background" />
});

const CTASection = dynamic(() => import('@/components/sections/CTASection'), {
    loading: () => <div className="min-h-[40vh] bg-background" />
});

export default function HomePage() {
    return (
        <main className="relative overflow-x-clip">
            <HeroVisual isExiting />
            <ExpertiseSection />
            <AboutSection />
            <StatsSection showOnly="top" />
            <div className="relative z-20 bg-background dark:bg-black py-20">
                <CTASection />
            </div>
        </main>
    );
}
