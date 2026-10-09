import { ImageResponse } from 'next/og';

export const alt = 'Galileo & Duke — Design & Development Studio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#090a10',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '80px',
                    fontFamily: 'sans-serif',
                    color: '#ffffff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '-150px',
                        right: '-150px',
                        width: '500px',
                        height: '500px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(120, 119, 198, 0.25) 0%, rgba(0,0,0,0) 70%)',
                    }}
                />
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    <div
                        style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: '#ffffff',
                            color: '#000000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 900,
                            fontSize: '20px',
                            letterSpacing: '-1px',
                        }}
                    >
                        G&amp;D
                    </div>
                    <span
                        style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: '#a1a1aa',
                        }}
                    >
                        GALILEO &amp; DUKE
                    </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h1
                        style={{
                            fontSize: '68px',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.1,
                            margin: 0,
                            color: '#ffffff',
                        }}
                    >
                        Design &amp; Bespoke Engineering Studio
                    </h1>
                    <p
                        style={{
                            fontSize: '26px',
                            color: '#94a3b8',
                            lineHeight: 1.4,
                            margin: 0,
                            maxWidth: '900px',
                        }}
                    >
                        Scroll-driven storytelling, cinematic motion, and mathematical web systems.
                    </p>
                </div>

                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
                        paddingTop: '28px',
                    }}
                >
                    <span style={{ fontSize: '20px', color: '#64748b' }}>
                        galileoandduke.com
                    </span>
                    <span style={{ fontSize: '18px', color: '#64748b', letterSpacing: '0.1em' }}>
                        MOKSH &amp; VARUL
                    </span>
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
