'use client';

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

interface ParallaxImage {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 7 images */
	images: ParallaxImage[];
	children?: React.ReactNode;
}

export function ZoomParallax({ images, children }: ZoomParallaxProps) {
	const container = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	// Balanced scaling factors that provide cinematic depth without creating 17,000px DOM surfaces
	const scaleCenter = useTransform(scrollYProgress, [0, 1], [1, 3.5]);
	const scaleOuter1 = useTransform(scrollYProgress, [0, 1], [1, 4.2]);
	const scaleOuter2 = useTransform(scrollYProgress, [0, 1], [1, 4.8]);
	const scaleOuter3 = useTransform(scrollYProgress, [0, 1], [1, 5.2]);

	// Smoothly fade out outer cards as they disperse past the screen edges to free GPU fill rate
	const outerOpacity = useTransform(scrollYProgress, [0, 0.45, 0.72], [1, 0.85, 0]);

	// Counter-scale child button so text/vectors stay crisp and constant size
	const buttonScale = useTransform(scaleCenter, (s) => 1 / s);

	const scales: MotionValue<number>[] = [
		scaleCenter,
		scaleOuter1,
		scaleOuter2,
		scaleOuter1,
		scaleOuter2,
		scaleOuter3,
		scaleOuter2,
	];

	return (
		<div ref={container} className="relative h-[300vh] z-[1]">
			<div className="sticky top-0 h-screen overflow-hidden [contain:paint]">
				{images.slice(0, 7).map(({ src, alt }, index) => {
					const scale = scales[index % scales.length];
					const isCenter = index === 0;

					return (
						<motion.div
							key={index}
							style={{ 
								scale, 
								opacity: isCenter ? 1 : outerOpacity,
								willChange: 'transform' 
							}}
							className={`absolute top-0 flex h-full w-full items-center justify-center pointer-events-none ${
                                index === 1 ? '[&>div]:!-top-[30vh] [&>div]:!left-[5vw] [&>div]:!h-[30vh] [&>div]:!w-[35vw]' : 
                                index === 2 ? '[&>div]:!-top-[10vh] [&>div]:!-left-[25vw] [&>div]:!h-[45vh] [&>div]:!w-[20vw]' : 
                                index === 3 ? '[&>div]:!left-[27.5vw] [&>div]:!h-[25vh] [&>div]:!w-[25vw]' : 
                                index === 4 ? '[&>div]:!top-[27.5vh] [&>div]:!left-[5vw] [&>div]:!h-[25vh] [&>div]:!w-[20vw]' : 
                                index === 5 ? '[&>div]:!top-[27.5vh] [&>div]:!-left-[22.5vw] [&>div]:!h-[25vh] [&>div]:!w-[30vw]' : 
                                index === 6 ? '[&>div]:!top-[22.5vh] [&>div]:!left-[25vw] [&>div]:!h-[15vh] [&>div]:!w-[15vw]' : ''
                            } `}
						>
							<div className="relative h-[25vh] w-[25vw] rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.35)] border border-white/10 bg-muted/20 flex items-center justify-center pointer-events-auto [transform:translate3d(0,0,0)] [backface-visibility:hidden]">
								{isCenter && children ? (
									<div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden group">
										<Image
											src={src || '/placeholder.svg'}
											alt={alt || `Parallax image ${index + 1}`}
											fill
											sizes="(max-width: 768px) 100vw, 50vw"
											className="object-cover transition-transform duration-700 group-hover:scale-105"
											priority
										/>
										<div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-500 pointer-events-none" />
										
										<motion.div 
											style={{ scale: buttonScale }}
											className="relative z-10 flex flex-col items-center justify-center pointer-events-auto antialiased [text-rendering:optimizeLegibility]"
										>
											{children}
										</motion.div>
									</div>
								) : (
									<Image
										src={src || '/placeholder.svg'}
										alt={alt || `Parallax image ${index + 1}`}
										fill
										sizes="(max-width: 768px) 50vw, 35vw"
										className="object-cover"
										loading="lazy"
									/>
								)}
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}

