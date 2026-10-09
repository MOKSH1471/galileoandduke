export interface CapabilityOffering {
    id: string;
    title: string;
    tag: string;
    subtitle: string;
    purpose: string;
    scope: string[];
    deliverables: string[];
    relatedProjectSlug: string;
    relatedProjectTitle: string;
    technologies: string[];
    contactSubject: string;
}

export const capabilityOfferings: CapabilityOffering[] = [
    {
        id: 'website-design',
        title: 'Website Design & Development',
        tag: 'Web Architecture',
        subtitle: 'Coherent web flagships that present your business clearly and guide visitors to action.',
        purpose: 'A coherent website that presents a business clearly and helps visitors take the next step without friction.',
        scope: [
            'Information architecture & layout strategy',
            'Responsive editorial interface design',
            'Reusable, modular UI component library',
            'Full-stack Next.js implementation',
            'Direct inquiry & engagement workflows'
        ],
        deliverables: [
            'Agreed responsive page layouts & wireframes',
            'Modular frontend implementation in Next.js & TypeScript',
            'Documented design system & accessible components',
            'Scoped production handover with performance verification'
        ],
        relatedProjectSlug: 'nx-elit',
        relatedProjectTitle: 'NX Elit — Boutique Hospitality Web Flagship',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
        contactSubject: 'Website Design & Development'
    },
    {
        id: 'motion-interaction',
        title: 'Motion & Interactive Experiences',
        tag: 'Kinetic Direction',
        subtitle: 'Distinctive movement and scroll choreography that elevate brand identity and page narrative.',
        purpose: 'Distinctive movement and interaction that support the brand and the page narrative without sacrificing performance.',
        scope: [
            'Scroll-driven choreography & timeline sequences',
            'Page and component enter/exit transitions',
            'Tactile micro-interactions & magnetic states',
            'Fluid spring physics & kinetic typography',
            'Accessible reduced-motion fallback policies'
        ],
        deliverables: [
            'Interaction specifications & scroll choreography curves',
            'Implemented 60fps motion sequences with GSAP & Motion',
            'Responsive touch, trackpad, and mouse interaction handlers',
            'Reduced-motion alternatives for complete accessibility'
        ],
        relatedProjectSlug: 'nx-elit',
        relatedProjectTitle: 'NX Elit — Cinematic Interaction System',
        technologies: ['GSAP', 'Framer Motion', 'WebGL', 'Lenis'],
        contactSubject: 'Motion & Interactive Experiences'
    },
    {
        id: 'custom-tools',
        title: 'Custom Tools & Automation',
        tag: 'Workflow Automation',
        subtitle: 'Software that connects operational steps, extracts intelligence, and eliminates repetitive manual work.',
        purpose: 'Software that connects steps in a business workflow and reduces repetitive manual work with measurable reliability.',
        scope: [
            'Workflow design & bottleneck elimination',
            'Headless data extraction & parsing pipelines',
            'Third-party API & webhook integrations',
            'Scoped internal dashboards & CLI monitors',
            'Real-time notification dispatch systems'
        ],
        deliverables: [
            'Implemented asynchronous data extraction pipeline',
            'Configuration guide & environment setup documentation',
            'Selected third-party API & webhook integrations',
            'Operational error-handling & resilient fallback pipeline'
        ],
        relatedProjectSlug: 'lead-b',
        relatedProjectTitle: 'Lead B — Sales Intelligence & Prospecting Pipeline',
        technologies: ['Python', 'Playwright', 'Node.js', 'AsyncIO'],
        contactSubject: 'Custom Tools & Automation'
    }
];

export interface CuratedTechnology {
    name: string;
    role: string;
    icon: string;
}

export const curatedTechnologies: CuratedTechnology[] = [
    {
        name: 'Next.js',
        role: 'Production App Router framework for high-performance server-rendered flagships',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    },
    {
        name: 'TypeScript',
        role: 'Strict type safety and architectural predictability across frontend and backend logic',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
    {
        name: 'React',
        role: 'Component-driven interactive user interfaces with optimized render boundaries',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    {
        name: 'Tailwind CSS',
        role: 'Utility-first styling structured around consistent studio tokens and responsive breakpoints',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'
    },
    {
        name: 'GSAP',
        role: 'Hardware-accelerated timeline choreography and scroll-triggered sequence orchestration',
        icon: 'https://cdn.simpleicons.org/greensock/88CE02'
    },
    {
        name: 'Motion',
        role: 'Spring-physics UI micro-interactions, layout morphing, and gesture dynamics',
        icon: 'https://cdn.simpleicons.org/framer/0055FF'
    },
    {
        name: 'Python',
        role: 'Resilient backend automation, data transformation pipelines, and asynchronous runners',
        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
    },
    {
        name: 'Playwright',
        role: 'Reliable headless browser automation for web data extraction and validation',
        icon: 'https://cdn.simpleicons.org/playwright/2EAD33'
    }
];
