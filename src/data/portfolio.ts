import { PortfolioData } from '@/types';

export const portfolioData: PortfolioData = {
    "personal": {
        "name": "Galileo & Duke",
        "title": "Design & Development Studio",
        "subtitle": "Web experiences beyond the template — cinematic motion, scroll-driven storytelling, and bespoke engineering.",
        "bio": "Galileo & Duke is an independent design and development studio founded by Moksh and Varul. We build web experiences that transcend templates — scroll-driven storytelling, cinematic motion, and interfaces engineered with as much care as the brands they represent.",
        "avatar": "/about/galileo.jpg",
        "location": "Kolkata, India",
        "email": "hello@galileoduke.com",
        "phone": "",
        "resumeUrl": "/contact",
        "website": "https://galileoduke.com",
        "languages": [
            {
                "name": "English",
                "level": "Native"
            }
        ],
        "socialLinks": [
            {
                "platform": "GitHub",
                "url": "https://github.com/MOKSH1471",
                "icon": "github",
                "username": "MOKSH1471"
            },
            {
                "platform": "LinkedIn",
                "url": "https://linkedin.com/company/galileo-duke",
                "icon": "linkedin",
                "username": "Galileo & Duke"
            },
            {
                "platform": "Instagram",
                "url": "https://www.instagram.com/galileoandduke/",
                "icon": "instagram",
                "username": "galileoandduke"
            },
            {
                "platform": "Twitter",
                "url": "https://twitter.com/galileoduke",
                "icon": "twitter",
                "username": "galileoduke"
            }
        ]
    },
    "founders": [
        {
            "id": "moksh",
            "name": "Moksh",
            "role": "Co-Founder & Creative Technologist",
            "focus": "Design, Creative Direction & Frontend Engineering",
            "bio": "Directs aesthetic strategy, motion choreography, and tactile frontend systems. Focuses on custom animation architectures, responsive physics simulations, and seamless user journeys.",
            "image": "/about/galileo.jpg",
            "heritageSymbol": "Galileo",
            "heritageTitle": "Visionary Exploration & Motion",
            "heritageDesc": "Like the astronomer training his lens on unseen skies, pushing the limits of the browser canvas with spatial depth and kinetic animation.",
            "social": {
                "github": "https://github.com/MOKSH1471",
                "instagram": "https://www.instagram.com/galileoandduke/",
                "twitter": "https://twitter.com/galileoduke",
                "linkedin": "https://linkedin.com/company/galileo-duke"
            }
        },
        {
            "id": "varul",
            "name": "Varul",
            "role": "Co-Founder & Studio Director",
            "focus": "Brand Strategy, Client Partnerships & Technical Architecture",
            "bio": "Guides studio operations, brand narratives, client partnerships, and foundational architecture. Ensures every digital flagship satisfies the highest standards of architectural rigor and commercial impact.",
            "image": "/about/duke.jpg",
            "heritageSymbol": "Duke",
            "heritageTitle": "Classical Craft & Architectural Pedigree",
            "heritageDesc": "Embodying classical pedigree and dignified restraint: timeless typography, uncompromising performance, and engineering built to endure.",
            "social": {
                "github": "https://github.com/MOKSH1471",
                "instagram": "https://www.instagram.com/galileoandduke/",
                "twitter": "https://twitter.com/galileoduke",
                "linkedin": "https://linkedin.com/company/galileo-duke"
            }
        }
    ],
    "projects": [
        {
            "id": "nx-elit",
            "slug": "nx-elit",
            "title": "NX Elit",
            "tagline": "Boutique Hospitality Web Flagship & Reservation Inquiry Architecture",
            "description": "Boutique hotel design MVP and frontend inquiry interface for luxury hospitality, showcasing sensory visual presentation and bespoke room curation.",
            "longDescription": "NX Elit was designed and engineered as a modern luxury hospitality digital showcase. The experience translates the physical serenity and architectural elegance of an upscale boutique hotel into a responsive web presence with bespoke room catalogs, dining lounge atmosphere, and a direct reservation inquiry pipeline.",
            "projectType": "Hospitality / Website Design & Development",
            "developmentStage": "Concept & Interactive Frontend MVP",
            "client": "Boutique Hospitality Showcase",
            "role": "Design Direction & Frontend Engineering",
            "customTimeline": "2024",
            "startDate": "2024-01-15",
            "status": "completed",
            "category": "Hospitality & Luxury",
            "techStack": [
                "Next.js 14",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Lucide React"
            ],
            "tools": [
                "Figma",
                "VS Code",
                "Git",
                "Vercel"
            ],
            "demoUrl": "#",
            "repoUrl": "https://github.com/MOKSH1471/NX_Elit_MVP",
            "image": "/project/nx-elit/hero.jpg",
            "galleryImages": [
                "/project/nx-elit/hero.jpg",
                "/project/nx-elit/room-premier.jpg",
                "/project/nx-elit/room-suite.jpg",
                "/project/nx-elit/lounge.jpg",
                "/project/nx-elit/restaurant.jpg",
                "/project/nx-elit/interior.jpg"
            ],
            "brief": "Design a high-touch digital flagship for an upscale boutique hotel that reflects the physical serenity of the property while eliminating reliance on cookie-cutter booking widgets.",
            "deliverables": [
                "Custom architectural design system & typography palette",
                "Immersive room & suite showcases with specifications",
                "Culinary & dining lounge visual storytelling",
                "Direct guest reservation inquiry workflow"
            ],
            "outcomes": [
                "Delivered a functional Next.js MVP with zero layout shifts and responsive perfection",
                "Established a bespoke, high-luxury aesthetic ready for production PMS integration"
            ],
            "highlights": [
                "Editorial Room Showcase",
                "Atmospheric Dining Storytelling",
                "Direct Guest Inquiry Pipeline",
                "Bespoke Luxury Visual Identity"
            ],
            "challengesAndSolutions": [
                {
                    "problem": "Balancing full-bleed high-res architectural imagery with sub-second page performance",
                    "solution": "Implemented Next.js Image optimization with responsive srcset, WebP compression, and progressive priority loading for hero views."
                },
                {
                    "problem": "Designing a frictionless booking inquiry that feels personal rather than transactional",
                    "solution": "Built a multi-step modal inquiry workflow that captures guest dates, party size, and room preferences directly without third-party iframe friction."
                }
            ]
        },
        {
            "id": "crystal4u",
            "slug": "crystal4u",
            "title": "Crystal4u",
            "tagline": "Luxury Gemstone & Mineral Decor E-Commerce Flagship",
            "description": "Luxury gemstone, healing crystal, and spiritual decor storefront designed in antique gold on warm ivory with curated product staging.",
            "longDescription": "Crystal4u is an e-commerce digital flagship crafted for an artisanal mineral and healing gemstone brand. Moving away from generic mass-market layouts, the design embraces an antique gold on ivory aesthetic, editorial product storytelling, astrological and energetic categorization, and direct WhatsApp and cart checkout flows.",
            "projectType": "E-Commerce / Brand Flagship & Storefront",
            "developmentStage": "Interactive Storefront & Product Showcase",
            "client": "Artisanal Mineral & Gemstone Atelier",
            "role": "Brand Identity, UI/UX Design & Frontend Engineering",
            "customTimeline": "2024",
            "startDate": "2024-03-01",
            "status": "completed",
            "category": "E-Commerce & Luxury",
            "techStack": [
                "React",
                "Next.js",
                "Tailwind CSS",
                "Framer Motion",
                "Lucide React"
            ],
            "tools": [
                "Figma",
                "VS Code",
                "Git",
                "Vercel"
            ],
            "demoUrl": "#",
            "repoUrl": "https://github.com/MOKSH1471",
            "image": "/project/crystal4u/hero.jpg",
            "galleryImages": [
                "/project/crystal4u/hero.jpg",
                "/project/crystal4u/amethyst.jpg",
                "/project/crystal4u/pyrite.jpg",
                "/project/crystal4u/jade.jpg",
                "/project/crystal4u/dhan-yog.jpg",
                "/project/crystal4u/pyramid.jpg"
            ],
            "brief": "Create a dignified, warm luxury digital storefront for curated healing gemstones and spiritual decor that builds authentic customer trust and showcases the natural elegance of each specimen.",
            "deliverables": [
                "Antique gold on ivory design system with custom typography",
                "Artisanal catalog architecture (Bracelets, Pyramids, Frames, Trees)",
                "Detailed product visual staging and energy profile attributes",
                "Direct consultation and instant purchase inquiry integration"
            ],
            "outcomes": [
                "Transformed raw mineral inventory into an editorial boutique experience",
                "Engineered instant product filtering by energy intent (Wealth, Healing, Protection)"
            ],
            "highlights": [
                "Antique Gold & Warm Ivory Palette",
                "Curated Gemstone Catalog Architecture",
                "Instant Energy & Intent Filtering",
                "Direct WhatsApp & Order Inquiries"
            ],
            "challengesAndSolutions": [
                {
                    "problem": "Conveying authentic gemstone clarity, cut, and color across diverse mobile screens",
                    "solution": "Designed clean high-contrast product photography cards with neutral warm ivory backgrounds and micro-zoom previews."
                },
                {
                    "problem": "Catering to both spiritual connoisseurs and casual luxury buyers",
                    "solution": "Implemented dual navigation paths: browse by physical category (bracelets, frames) or spiritual intent (wealth, tranquility, focus)."
                }
            ]
        },
        {
            "id": "lead-b",
            "slug": "lead-b",
            "title": "Lead B",
            "tagline": "Internal Sales Intelligence & Prospecting Automation Pipeline",
            "description": "Internal prospecting workflow automation pipeline combining headless browser crawling, contact data structuring, and instant Telegram notification alerts.",
            "longDescription": "Lead B is an internal engineering tool and automated sales intelligence pipeline. Designed to eliminate manual prospecting overhead, the pipeline orchestrates headless browser automation to discover prospective business leads, extracts and sanitizes contact metadata, and dispatches real-time structured lead summaries directly to team communication channels.",
            "projectType": "Internal Tool / Workflow Automation",
            "developmentStage": "Working Internal Automation Pipeline",
            "client": "Galileo & Duke Internal Tooling",
            "role": "Automation Architecture & Backend Pipeline Engineering",
            "customTimeline": "2024",
            "startDate": "2024-05-10",
            "status": "completed",
            "category": "Data Engineering & Automation",
            "techStack": [
                "Python 3.11",
                "Playwright",
                "BeautifulSoup4",
                "Telegram Bot API",
                "AsyncIO"
            ],
            "tools": [
                "VS Code",
                "CLI",
                "Git",
                "GitHub Actions"
            ],
            "demoUrl": "#",
            "repoUrl": "https://github.com/MOKSH1471/LEAD_B",
            "image": "/project/lead-b/hero.jpg",
            "galleryImages": [
                "/project/lead-b/hero.jpg",
                "/project/lead-b/pipeline.jpg"
            ],
            "brief": "Automate the agency prospecting workflow by replacing manual directory search and lead qualification with an autonomous, resilient data extraction and notification pipeline.",
            "deliverables": [
                "Async headless browser crawler with Playwright and anti-detection headers",
                "HTML parser and domain metadata sanitization engine",
                "Telegram webhook alert bot dispatching instant lead briefs",
                "CLI monitor and error-handling fallback pipeline"
            ],
            "outcomes": [
                "Reduced lead gathering time from hours of manual searching to automated scheduled runs",
                "Provided instant team notification with actionable verified contact points"
            ],
            "highlights": [
                "Async Headless Web Extraction",
                "Resilient Anti-Rate-Limit Architecture",
                "Real-Time Telegram Push Dispatch",
                "Zero-Friction CLI Execution"
            ],
            "challengesAndSolutions": [
                {
                    "problem": "Dynamic client-side rendered target directories failing standard HTTP scrapers",
                    "solution": "Architected async Playwright browser automation with headless Chromium to execute full JavaScript render before DOM extraction."
                },
                {
                    "problem": "Instant team accessibility without building a heavy custom web UI",
                    "solution": "Integrated Telegram Bot API webhooks to deliver clean, formatted markdown cards with one-tap dialing and email links straight to team phones."
                }
            ]
        }
    ],
    "experiences": [],
    "education": [],
    "achievements": [],
    "techStack": [
        {
            "name": "Python",
            "icon": "https://cdn.simpleicons.org/python",
            "category": "language"
        },
        {
            "name": "TypeScript",
            "icon": "https://cdn.simpleicons.org/typescript",
            "category": "language"
        },
        {
            "name": "JavaScript",
            "icon": "https://cdn.simpleicons.org/javascript",
            "category": "language"
        },
        {
            "name": "Solidity",
            "icon": "https://cdn.simpleicons.org/solidity",
            "category": "language"
        },
        {
            "name": "React",
            "icon": "https://cdn.simpleicons.org/react",
            "category": "framework"
        },
        {
            "name": "Next.js",
            "icon": "https://cdn.simpleicons.org/nextdotjs",
            "category": "framework"
        },
        {
            "name": "Node.js",
            "icon": "https://cdn.simpleicons.org/nodedotjs",
            "category": "framework"
        },
        {
            "name": "Pandas",
            "icon": "https://cdn.simpleicons.org/pandas",
            "category": "library"
        },
        {
            "name": "NumPy",
            "icon": "https://cdn.simpleicons.org/numpy",
            "category": "library"
        },
        {
            "name": "Matplotlib",
            "icon": "https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg",
            "category": "library"
        },
        {
            "name": "Tailwind CSS",
            "icon": "https://cdn.simpleicons.org/tailwindcss",
            "category": "library"
        },
        {
            "name": "Redis",
            "icon": "https://cdn.simpleicons.org/redis",
            "category": "database"
        },
        {
            "name": "PostgreSQL",
            "icon": "https://cdn.simpleicons.org/postgresql",
            "category": "database"
        },
        {
            "name": "Kubernetes",
            "icon": "https://cdn.simpleicons.org/kubernetes",
            "category": "tool"
        },
        {
            "name": "Terraform",
            "icon": "https://cdn.simpleicons.org/terraform",
            "category": "tool"
        },
        {
            "name": "Mistral AI",
            "icon": "https://cdn.simpleicons.org/mistralai",
            "category": "library"
        },
        {
            "name": "PyTorch",
            "icon": "https://cdn.simpleicons.org/pytorch",
            "category": "library"
        },
        {
            "name": "FastAPI",
            "icon": "https://cdn.simpleicons.org/fastapi",
            "category": "framework"
        },
        {
            "name": "Flask",
            "icon": "https://cdn.simpleicons.org/flask",
            "category": "framework"
        }
    ],
    "hardSkills": [
        {
            "name": "GSAP & ScrollTrigger Mastery",
            "level": "Core",
            "category": "motion",
            "description": "Choreographing multi-stage pin transitions, scrubbed animations, and velocity-linked interactions that feel weightless."
        },
        {
            "name": "Framer Motion & Kinetic Physics",
            "level": "Core",
            "category": "motion",
            "description": "Fluid spring physics, shared layout transitions, gesture tracking, and reactive UI state choreography."
        },
        {
            "name": "Micro-Interactions & Magnetic Elements",
            "level": "Specialist",
            "category": "motion",
            "description": "Tactile hover physics, custom cursor dynamics, and magnetic buttons engineered for haptic feedback."
        },
        {
            "name": "Scroll-Driven Storytelling & Video",
            "level": "Core",
            "category": "motion",
            "description": "Synchronizing canvas frame rendering and responsive video scrub pipelines with user scroll cadence."
        },
        {
            "name": "Velocity-Based Kinetic Typography",
            "level": "Specialist",
            "category": "motion",
            "description": "Custom text distortion, marquee ribbons, and variable-font animations synchronized to scroll acceleration."
        },
        {
            "name": "Three.js & React Three Fiber",
            "level": "Core",
            "category": "spatial",
            "description": "Architecting declarative spatial scenes, custom geometry buffers, and interactive real-time canvases."
        },
        {
            "name": "GLSL Shaders & Post-Processing",
            "level": "Specialist",
            "category": "spatial",
            "description": "Authoring custom vertex and fragment shaders, chromatic aberration passes, film grain, and bloom filters."
        },
        {
            "name": "Interactive Physics Simulation",
            "level": "Specialist",
            "category": "spatial",
            "description": "Integrating Rapier and Cannon physics engines for realistic rigid-body collisions, springs, and ropes."
        },
        {
            "name": "Spline 3D Integration & Optimization",
            "level": "Core",
            "category": "spatial",
            "description": "Seamlessly embedding interactive 3D assets with compressed geometry, Draco decoding, and touch optimization."
        },
        {
            "name": "Dynamic Camera Staging & Lighting",
            "level": "Core",
            "category": "spatial",
            "description": "Cinematic camera rigs with damping, environmental HDRI lighting, and dynamic shadows tailored to viewport depth."
        },
        {
            "name": "Next.js & React Architecture",
            "level": "Core",
            "category": "engineering",
            "description": "Enterprise-grade SSR, streaming server components, optimal bundle splitting, and robust routing infrastructure."
        },
        {
            "name": "TypeScript Rigor & Clean Code",
            "level": "Core",
            "category": "engineering",
            "description": "Strict type safety across complete UI and data layers to guarantee zero runtime surprises in production."
        },
        {
            "name": "Tailwind CSS & Design Systems",
            "level": "Core",
            "category": "engineering",
            "description": "Scalable design token architectures, dark-mode fluidity, and bespoke utility abstractions without bloat."
        },
        {
            "name": "60fps Performance & GPU Auditing",
            "level": "Specialist",
            "category": "engineering",
            "description": "Frame-rate profiling, compositing layer optimization, layout shift prevention, and sub-second load times."
        },
        {
            "name": "Creative Strategy & Technical Direction",
            "level": "Core",
            "category": "engineering",
            "description": "Aligning bold artistic vision with architectural feasibility, client roadmap, and commercial conversion."
        }
    ],
    "softSkills": [
        {
            "name": "Problem Solving",
            "description": "Innovative debugging and algorithmic optimization"
        },
        {
            "name": "Systemic Thinking",
            "description": "Designing robust, scalable end-to-end architectures"
        },
        {
            "name": "Critical Thinking",
            "description": "Analytical approach to solving complex engineering challenges"
        },
        {
            "name": "Continuous Learning",
            "description": "Staying updated with state-of-the-art AI research"
        },
        {
            "name": "Analytical Thinking",
            "description": "Breaking down complex data into actionable insights"
        },
        {
            "name": "Adaptability",
            "description": "Quickly mastering new frameworks and AI models"
        },
        {
            "name": "Leadership",
            "description": "Leading engineering teams and managing complex projects"
        },
        {
            "name": "Communication",
            "description": "Translating complex AI concepts for stakeholders"
        },
        {
            "name": "Teamwork",
            "description": "Collaborative development in cross-functional agile teams"
        },
        {
            "name": "Research Skills",
            "description": "In-depth literature review and academic contribution"
        }
    ],
    "tools": [
        {
            "name": "VS Code",
            "icon": "https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg",
            "category": "ide"
        },
        {
            "name": "Jupyter",
            "icon": "https://cdn.simpleicons.org/jupyter",
            "category": "ide"
        },
        {
            "name": "Google Colab",
            "icon": "https://cdn.simpleicons.org/googlecolab",
            "category": "ide"
        },
        {
            "name": "Figma",
            "icon": "https://cdn.simpleicons.org/figma",
            "category": "design"
        },
        {
            "name": "GitHub",
            "icon": "https://cdn.simpleicons.org/github",
            "category": "devops"
        },
        {
            "name": "Git",
            "icon": "https://cdn.simpleicons.org/git",
            "category": "devops"
        },
        {
            "name": "Vercel",
            "icon": "https://cdn.simpleicons.org/vercel",
            "category": "devops"
        },
        {
            "name": "Blender",
            "icon": "https://cdn.simpleicons.org/blender",
            "category": "design"
        },
        {
            "name": "Linux",
            "icon": "https://cdn.simpleicons.org/linux",
            "category": "devops"
        },
        {
            "name": "Postman",
            "icon": "https://cdn.simpleicons.org/postman",
            "category": "devops"
        }
    ],
    "faqs": [
        {
            "question": "What services does Galileo & Duke offer?",
            "answer": "We architect bespoke digital flagships — uniting deliberate art direction, kinetic interaction, robust frontend systems, and tailored brand narratives for discerning organizations."
        },
        {
            "question": "What technologies power your web experiences?",
            "answer": "We leverage modern web technologies — including Next.js, TypeScript, modern animation libraries, real-time physics engines, and GPU-accelerated graphics — selected strictly to serve the client's creative and commercial goals."
        },
        {
            "question": "Are you available for new client partnerships?",
            "answer": "Yes. We partner selectively with ambitious brands and visionary founders. Reach out to discuss your project via our contact page or directly at hello@galileoduke.com."
        }
    ],
    "blogs": [
        {
            "id": "blog-1",
            "slug": "future-of-ai-agents",
            "title": "The Future of AI Agents in Enterprise",
            "excerpt": "How autonomous agents are redefining software architecture and decision-making processes.",
            "content": "Detailed exploration of AI agents...",
            "image": "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-03-20",
            "category": "applied-ai",
            "tags": [
                "AI",
                "Agents",
                "Enterprise"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "5"
        },
        {
            "id": "blog-2",
            "slug": "web3-ux-challenges",
            "title": "Overcoming Web3 UX Challenges",
            "excerpt": "Strategies for building decentralized applications that feel as smooth as Web2.",
            "content": "UX in Web3 is critical...",
            "image": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-03-15",
            "category": "more",
            "tags": [
                "Web3",
                "Blockchain",
                "UX"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "4"
        },
        {
            "id": "blog-3",
            "slug": "mastering-nextjs-performance",
            "title": "Mastering Next.js Performance",
            "excerpt": "Advanced techniques for optimizing Core Web Vitals in modern React applications.",
            "content": "Performance optimization...",
            "image": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-03-05",
            "category": "software-development",
            "tags": [
                "Next.js",
                "React",
                "Performance"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "6"
        },
        {
            "id": "blog-4",
            "slug": "ai-driven-security",
            "title": "AI-Driven Cybersecurity",
            "excerpt": "Using deep learning to detect and prevent modern network intrusion.",
            "content": "Cybersecurity with AI...",
            "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-02-28",
            "category": "applied-ai",
            "tags": [
                "AI",
                "Security",
                "Deep Learning"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "7"
        },
        {
            "id": "blog-5",
            "slug": "llm-fine-tuning",
            "title": "Fine-Tuning LLMs locally",
            "excerpt": "A guide to optimizing open-source models using Ollama and LoRA techniques.",
            "content": "Local LLM fine-tuning...",
            "image": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-02-15",
            "category": "applied-ai",
            "tags": [
                "LLM",
                "Python",
                "Ollama"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "8"
        },
        {
            "id": "blog-6",
            "slug": "smart-contract-security",
            "title": "Smart Contract Audit Patterns",
            "excerpt": "Common vulnerabilities and how to prevent them in Solidity.",
            "content": "Audit patterns...",
            "image": "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-02-01",
            "category": "more",
            "tags": [
                "Solidity",
                "Ethereum",
                "Security"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "5"
        },
        {
            "id": "blog-7",
            "slug": "modern-state-management",
            "title": "Modern State Management in React",
            "excerpt": "Comparing Zustand, Redux Toolkit, and React Context for large-scale apps.",
            "content": "State management...",
            "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-01-25",
            "category": "software-development",
            "tags": [
                "React",
                "Zustand",
                "Architecture"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "4"
        },
        {
            "id": "blog-8",
            "slug": "iot-edge-computing",
            "title": "Edge Computing with ESP32",
            "excerpt": "Implementing real-time data processing at the edge for industrial IoT.",
            "content": "Edge computing...",
            "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-01-10",
            "category": "software-development",
            "tags": [
                "IoT",
                "ESP32",
                "Edge"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "6"
        },
        {
            "id": "blog-9",
            "slug": "ai-in-healthcare",
            "title": "AI Transformation in Healthcare",
            "excerpt": "How computer vision is assisting in medical diagnostics and data analysis.",
            "content": "Healthcare AI...",
            "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-01-05",
            "category": "applied-ai",
            "tags": [
                "Healthcare",
                "AI",
                "Ethics"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "7"
        },
        {
            "id": "blog-10",
            "slug": "the-architects-manifesto",
            "title": "Digital Garden: The Architect's Manifesto",
            "excerpt": "Reflecting on my journey as an AI Engineer and the philosophy behind building intelligent, scalable systems.",
            "content": "My journey into the world of technology hasn't been just about code...",
            "image": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "date": "2026-03-31",
            "category": "about-me",
            "tags": [
                "Philosophy",
                "Engineering",
                "About Me"
            ],
            "author": {
                "name": "Galileo & Duke",
                "avatar": "/about/galileo.jpg"
            },
            "readTime": "5"
        }
    ],
    "gallery": [
        {
            "id": "gal-1",
            "title": "CPS Lab Research",
            "description": "Deep Learning research workshop at Cyber Physical System Laboratory.",
            "date": "2025-01-20",
            "type": "image",
            "url": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "category": "research"
        },
        {
            "id": "gal-2",
            "title": "Smart City Symposium",
            "description": "Presenting AIoT solutions for sustainable urban development.",
            "date": "2024-12-15",
            "type": "video",
            "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "thumbnail": "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "category": "event"
        },
        {
            "id": "gal-3",
            "title": "Neural Network Visualization",
            "description": "Custom visualization of a Convolutional Neural Network architecture.",
            "date": "2024-11-30",
            "type": "image",
            "url": "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "category": "technical"
        },
        {
            "id": "gal-4",
            "title": "Blockchain Hackathon",
            "description": "Building decentralized finance solutions in 48 hours.",
            "date": "2024-10-25",
            "type": "image",
            "url": "https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "category": "event"
        },
        {
            "id": "gal-5",
            "title": "IoT Prototype Demo",
            "description": "Testing real-time sensor integration with cloud platforms.",
            "date": "2024-09-15",
            "type": "video",
            "url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
            "thumbnail": "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop&fm=webp",
            "category": "technical"
        }
    ]
};
