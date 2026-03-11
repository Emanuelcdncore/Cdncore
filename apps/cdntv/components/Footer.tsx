'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MAP_CENTER = "40.228786022037426,-7.4992470004079435";
const MIN_MAP_ZOOM = 14;
const MAX_MAP_ZOOM = 19;
const DEFAULT_MAP_ZOOM = 16;

const bp = process.env.BASE_PATH || '';

const Footer: React.FC = () => {
    const [mapZoom, setMapZoom] = useState(DEFAULT_MAP_ZOOM);
    const mapIframeRef = useRef<HTMLIFrameElement | null>(null);

    const buildMapSrc = (zoom: number) =>
        `https://maps.google.com/maps?ll=${MAP_CENTER}&z=${zoom}&t=m&hl=pt&gl=pt&mapclient=embed&output=embed`;

    const handleZoomChange = (direction: 'in' | 'out') => {
        setMapZoom((prevZoom) => {
            const nextZoom = direction === 'in'
                ? Math.min(MAX_MAP_ZOOM, prevZoom + 1)
                : Math.max(MIN_MAP_ZOOM, prevZoom - 1);

            if (mapIframeRef.current) {
                mapIframeRef.current.src = buildMapSrc(nextZoom);
            }

            return nextZoom;
        });
    };

    const recenterMap = () => {
        setMapZoom(() => {
            if (mapIframeRef.current) {
                mapIframeRef.current.src = buildMapSrc(DEFAULT_MAP_ZOOM);
            }
            return DEFAULT_MAP_ZOOM;
        });
    };

    return (
        <>
            <section className="bg-black">
                <div className="container mx-auto px-6 pt-8 pb-0">
                    {/* Gradient bar aligned and sized to map */}
                    <div className="w-full max-w-7xl mx-auto px-5 lg:px-20" style={{ marginTop: '0.1rem', marginBottom: '1.7rem' }}>
                        <div style={{ width: '100%', height: '0', borderTop: '1px solid', borderImage: 'linear-gradient(90deg, #F28E12 9.13%, #DA1D5D 84.13%) 1' }}></div>
                    </div>
                    <div className="w-full max-w-7xl mx-auto px-5 lg:px-20 mb-16">
                        {/* Mobile: centralized, Desktop: grid */}
                        <div className="hidden md:grid grid-cols-4 gap-8 text-left">
                            {/* Services Section */}
                            <div className="flex flex-col items-start gap-2">
                                <h4 className="font-bold mb-2 text-sm" style={{
                                    background: 'linear-gradient(270deg, #FF814B 0%, #DA1D5D 70.13%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}>SERVICES</h4>
                                <Link href="/#services" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Projects</Link>
                                <Link href="/services/#process" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Process</Link>
                                <a href="https://github.com/cdnCore-Pt?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Portfolio</a>
                            </div>
                            {/* Company Section */}
                            <div className="flex flex-col items-start gap-2 ml-8">
                                <h4 className="font-bold mb-2 text-sm" style={{
                                    background: 'linear-gradient(270deg, #FF814B 0%, #DA1D5D 70.13%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}>COMPANY</h4>
                                <Link href="/about/#history" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Journey</Link>
                                <Link href="/about/#mission" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Mission</Link>
                                <Link href="/about/#team" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Team</Link>
                            </div>
                            {/* Legal Section */}
                            <div className="flex flex-col items-start gap-2 ml-18">
                                <h4 className="font-bold mb-2 text-sm" style={{
                                    background: 'linear-gradient(270deg, #FF814B 0%, #DA1D5D 70.13%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}>LEGAL</h4>
                                <Link href="/privacy-policy" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Privacy Policy</Link>
                                <Link href="/terms-of-service" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Terms of Service</Link>
                                <Link href="/cookies-policy" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Cookies Policy</Link>
                            </div>
                            {/* Contacts Section */}
                            <div className="flex flex-col items-start gap-2 ml-auto">
                                <h4 className="font-bold mb-2 text-sm" style={{
                                    background: 'linear-gradient(270deg, #FF814B 0%, #DA1D5D 70.13%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    fontFamily: 'Inter, Arial, sans-serif',
                                }}>CONTACTS</h4>
                                <p className="text-white text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Parkurbis</p>
                                <p className="text-white text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>6200-865 Covilha</p>
                                <a href="tel:+351275959168" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>+351 275 959 168</a>
                            </div>
                        </div>
                        {/* Mobile: centralized */}
                        <div className="md:hidden flex flex-col items-center justify-center gap-8 text-center">
                            {/* Services Section */}
                            <div>
                                <h4 className="font-bold mb-2 text-lg" style={{
                                    background: 'linear-gradient(270deg, #FF814B 0%, #DA1D5D 70.13%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}>SERVICES</h4>
                                <div className="flex flex-col gap-1">
                                    <Link href="/#services" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Projects</Link>
                                    <Link href="/services#process" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Process</Link>
                                    <a href="https://github.com/cdnCore-Pt?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Portfolio</a>
                                </div>
                            </div>
                            {/* Company Section */}
                            <div>
                                <h4 className="font-bold mb-2 text-lg" style={{
                                    background: 'linear-gradient(270deg, #FF814B 0%, #DA1D5D 70.13%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}>COMPANY</h4>
                                <div className="flex flex-col gap-1">
                                    <Link href="/about/#history" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Journey</Link>
                                    <Link href="/about/#mission" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Mission</Link>
                                    <Link href="/about/#team" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Team</Link>
                                </div>
                            </div>
                            {/* Legal Section */}
                            <div>
                                <h4 className="font-bold mb-2 text-lg" style={{
                                    background: 'linear-gradient(270deg, #FF814B 0%, #DA1D5D 70.13%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}>LEGAL</h4>
                                <div className="flex flex-col gap-1">
                                    <Link href="/privacy-policy" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Privacy Policy</Link>
                                    <Link href="/terms-of-service" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Terms of Service</Link>
                                    <Link href="/cookies-policy" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Cookies Policy</Link>
                                </div>
                            </div>
                            {/* Contacts Section */}
                            <div>
                                <h4 className="font-bold mb-2 text-lg" style={{
                                    background: 'linear-gradient(270deg, #FF814B 0%, #DA1D5D 70.13%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    fontFamily: 'Inter, Arial, sans-serif',
                                }}>CONTACTS</h4>
                                <div className="flex flex-col gap-1">
                                    <p className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Parkurbis</p>
                                    <p className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>6200-865 Covilha</p>
                                    <a href="tel:+351275959168" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>+351 275 959 168</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Map Section */}
                    <div className="w-full max-w-7xl mx-auto mt-1.5 mb-0 px-5 lg:px-20 pt-1 flex justify-center items-center">
                        <div className="relative w-full overflow-hidden bg-transparent">
                            {/* Map embed */}
                            <iframe
                                ref={mapIframeRef}
                                src={buildMapSrc(mapZoom)}
                                className="relative z-10 w-full h-[200px] lg:h-[250px] md:h-[220px] sm:h-[180px] border-0 shadow-2xl block transition-all duration-500"
                                style={{
                                    filter: 'grayscale(100%) brightness(0.4) contrast(1.8)',
                                    borderRadius: '0px',
                                    transformOrigin: 'center',
                                    pointerEvents: 'none'
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                            {/* Zoom controls */}
                            <div className="absolute top-16 left-6 z-30 flex flex-col gap-2 pointer-events-auto">
                                <button
                                    type="button"
                                    onClick={() => handleZoomChange('in')}
                                    className="h-9 w-9 rounded-full bg-black/70 text-white text-lg font-semibold flex items-center justify-center border border-white/15 shadow-lg hover:bg-black/85 transition-colors"
                                    aria-label="Zoom in"
                                >
                                    +
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleZoomChange('out')}
                                    className="h-9 w-9 rounded-full bg-black/70 text-white text-lg font-semibold flex items-center justify-center border border-white/15 shadow-lg hover:bg-black/85 transition-colors"
                                    aria-label="Zoom out"
                                >
                                    -
                                </button>
                            </div>

                            {/* Pin */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full pointer-events-none z-30">
                                <div className="relative">
                                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1 w-24 h-24 rounded-full bg-orange-400/45 blur-xl animate-pulse"></div>
                                    <div
                                        className="relative z-40 cursor-pointer pointer-events-auto hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_12px_rgba(255,140,0,0.8)]"
                                        onClick={recenterMap}
                                        title="Click to recenter on CDNTV HQ"
                                    >
                                        <Image
                                            src={`${bp}/tv_map.png`}
                                            alt="CDNTV Location"
                                            width={44}
                                            height={44}
                                            unoptimized
                                            className="filter drop-shadow-lg select-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-6 right-6 flex items-center space-x-2 z-20 pointer-events-none">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 font-mono text-xs">ONLINE</span>
                            </div>
                        </div>
                    </div>
                    {/* Logo section */}
                    <div className="text-center flex justify-center items-center mt-5 mb-0 min-h-[80px]" style={{ marginBottom: '0.9rem' }}>
                        <Image
                            src={`${bp}/logo-with-text.png`}
                            alt="CDNTV Logo"
                            width={200}
                            height={120}
                            unoptimized
                            className="mx-auto"
                        />
                    </div>
                </div>
            </section>

            {/* Final Footer Section with Copyright and Scroll to Top */}
            <section className="bg-black -mt-6">
                <div className="w-full max-w-7xl mx-auto px-8 lg:px-24 pb-6">
                    {/* Gradient Line */}
                    <div className="w-full h-px bg-gradient-to-r from-orange-400/60 to-pink-400/60 mb-3"></div>

                    {/* Copyright and Scroll to Top */}
                    <div className="flex items-center justify-between py-2">
                        <div className="flex-1 text-center">
                            <p className="text-gray-300 text-sm">
                                Copyright &copy; CDNTV - Empowering Creativity 2025. All rights reserved.
                            </p>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="transition-transform hover:-translate-y-1 hover:scale-110 p-2 ml-4"
                            aria-label="Scroll to top"
                        >
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <defs>
                                    <linearGradient
                                        id="scrollArrowGradient"
                                        x1="0"
                                        y1="0"
                                        x2="32"
                                        y2="0"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="#fb923c" stopOpacity="0.8" />
                                        <stop offset="1" stopColor="#f472b6" stopOpacity="0.8" />
                                    </linearGradient>
                                </defs>
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="15"
                                    stroke="url(#scrollArrowGradient)"
                                    strokeWidth="2"
                                    fill="#000000"
                                />
                                <polyline
                                    points="10,18 16,12 22,18"
                                    stroke="url(#scrollArrowGradient)"
                                    strokeWidth="2.5"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Footer;
