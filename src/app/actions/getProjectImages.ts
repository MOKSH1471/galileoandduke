'use server';

import fs from 'fs';
import path from 'path';

export async function getProjectImages(slug: string, title?: string): Promise<string[]> {
    const publicDir = path.join(process.cwd(), 'public');
    const projectDir = path.join(publicDir, 'project');
    const subfolderPath = path.join(projectDir, slug);
    const validImages: string[] = [];

    // Strategy 0: Direct project subfolder (public/project/[slug]/)
    try {
        if (fs.existsSync(subfolderPath) && fs.statSync(subfolderPath).isDirectory()) {
            const files = fs.readdirSync(subfolderPath);
            const imageExts = ['.webp', '.png', '.jpg', '.jpeg', '.svg'];
            const projectImages = files
                .filter(file => imageExts.includes(path.extname(file).toLowerCase()))
                .sort((a, b) => {
                    // Always put hero/main first
                    if (a.toLowerCase().startsWith('hero')) return -1;
                    if (b.toLowerCase().startsWith('hero')) return 1;
                    return a.localeCompare(b);
                })
                .map(file => `/project/${slug}/${file}`);
            
            if (projectImages.length > 0) {
                return projectImages;
            }
        }
    } catch (e) {
        // Fallback to legacy
    }

    // Strategy 1: Slug-based (terraflow-platform -> terraflowplatform)
    const sanitizedSlug = slug.replace(/-/g, '');

    // Strategy 2: Title-based (SNBTIn - Platform... -> snbtinplatformpersiapansnbt2025)
    const sanitizedTitle = title ? title.toLowerCase().replace(/[^a-z0-9]/g, '') : '';

    const searchBases = sanitizedTitle ? [sanitizedTitle, sanitizedSlug] : [sanitizedSlug];
    const uniqueBases = [...new Set(searchBases)];

    for (const baseName of uniqueBases) {
        if (!baseName) continue;

        for (let i = 1; i <= 10; i++) {
            const extensions = ['webp', 'png', 'jpg', 'jpeg'];

            for (const ext of extensions) {
                const filename = `${baseName}${i}.${ext}`;
                const filePath = path.join(projectDir, filename);

                try {
                    if (fs.existsSync(filePath)) {
                        const imagePath = `/project/${filename}`;
                        if (!validImages.includes(imagePath)) {
                            validImages.push(imagePath);
                        }
                        break;
                    }
                } catch (error) {
                    // Ignore errors
                }
            }
        }

        if (validImages.length > 0) break;
    }

    return validImages;
}
