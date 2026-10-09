'use client';

import React from 'react';
import OrbitalWorkSection from '@/components/sections/OrbitalWorkSection';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
            {/* The Full-Page Celestial Work Orrery */}
            <OrbitalWorkSection isFullPage={true} />
        </main>
    );
}
