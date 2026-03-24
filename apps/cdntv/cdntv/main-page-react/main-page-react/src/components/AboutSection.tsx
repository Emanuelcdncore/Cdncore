'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Orb from "@/components/Orb";
import dynamic from "next/dynamic";
import Image from "next/image";
import LightRays from "@/components/ui/LightRays";
import { Orbitron } from "next/font/google";
import TeamSection from "@/components/Team/TeamSection";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

const AboutSection = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hash = window.location.hash;
            if (hash) {
                const el = document.getElementById(hash.replace('#', ''));
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, []);
    const router = useRouter();
    const historyData = [
        {
            year: "2009",
            title: "The Beginning",
            description: "In the heart of Lisbon, Portugal, a pioneering company was born quietly, shaping the world of audiovisuals for over a decade. We are about to deliver an experience over a decade."
        },
        {
            year: "2015",
            title: "European Expansion",
            description: "With a profound connection to European institutions and a track record of serving as an official cameraman for multiple Presidents, this company's journey is nothing short of remarkable."
        },
        {
            year: "2020",
            title: "Technological Innovation",
            description: "From diplomatic events to speeches, our company's lens captures the essence of occasions, crafting narratives, including all people. Balancing tradition with innovation, we carry our legacy forward."
        },
        {
            year: "2024",
            title: "Global Leadership",
            description: "As our journey unfolds, our commitment to redefining audiovisuals remains unwavering. This company is an ode to the purpose of innovation and professionalism and future linguistics."
        }
    ];

    const coreValues = [
        {
            title: "COMMITMENT",
            description: ""
        },
        {
            title: "COMPLIANCE",
            description: ""
        },
        {
            title: "PUNCTUALITY",
            description: ""
        },
        {
            title: "CONFIDENTIALITY",
            description: ""
        }
    ];


    return (
        <>
            {/* Hero Section */}
            <section className="py-24 relative overflow-hidden min-h-screen flex items-center overflow-x-hidden">
                {/* Dark background */}
                <div className="absolute inset-0 bg-black" />
                
                {/* LightRays Effect Background */}
                <div className="absolute inset-0 z-5" style={{ width: '100%', height: '100%' }}>
                    <LightRays
                        raysOrigin="top-center"
                        raysColor="#E6F3FF"
                        raysSpeed={1.5}
                        lightSpread={0.8}
                        rayLength={1.2}
                        followMouse={true}
                        mouseInfluence={0.1}
                        noiseAmount={0.1}
                        distortion={0.05}
                        className="custom-rays"
                    />
                </div>
                
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/15 to-transparent z-5" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8"
                        >
                            <span className="text-base md:text-lg font-medium tracking-widest uppercase font-inter">
                                <span style={{
                                    background: 'linear-gradient(90deg, #F18B13 40.3%, #DA205B 55.8%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                    boxShadow: '0px 4px 0px 0px rgba(0, 0, 0, 0.25)',
                                    fontFamily: 'Inter, Arial, sans-serif',
                                    fontWeight: 300,
                                    fontStyle: 'Light',
                                    fontSize: '1rem',
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                    textAlign: 'center',
                                }}>EST. 2009</span>
                            </span>
                        </motion.div>
                        
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold text-white mb-8 font-inter"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            About Us
                        </motion.h1>

                        <motion.p
                            className="text-xl text-white/80 max-w-3xl mx-auto mb-8 font-inter"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Crafting visual stories and bringing visions to life. With over a decade of experience
                            in audiovisual production, we are a global team doing what we love in an amazing
                            creative team.
                        </motion.p>

                        <motion.div
                            className="flex flex-col items-center mx-auto"
                            initial={{ opacity: 0, scaleY: 0 }}
                            animate={{ opacity: 1, scaleY: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            {/* Linha mais fina */}
                            <div className="w-0.5 h-16 bg-gradient-to-b from-orange-400 to-pink-400"></div>
                            {/* Círculo na parte inferior com gradiente */}
                            <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full mt-1"></div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section id="mission" className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center h-full"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                                <span style={{ fontFamily: 'Inter, Arial, sans-serif' }}>OUR</span><br />
                                <span style={{ fontFamily: 'Depot, Ethnocentric, Orbitron, Arial, sans-serif', color: 'rgba(218, 29, 93, 1)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase' }}>MISSION</span>
                            </h2>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="flex flex-col justify-center h-full"
                        >
                            <p className="text-lg text-gray-300 leading-relaxed text-left md:text-right">
                                Located in the heart of Lisbon and expanding its expertise globally, CDNTV
                                stands as a beacon of excellence in audiovisual production.
                            </p>
                        </motion.div>
                    </div>

                    {/* Mission Points */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                        {[
                            {
                                number: "01",
                                title: "A Team of Visionaries",
                                description: "Our strength lies in our team. Comprising seasoned professionals, we pride ourselves on producing both self-published and contracted projects."
                            },
                            {
                                number: "02", 
                                title: "Comprehensive Solutions",
                                description: "We don't just produce videos; we offer a holistic suite of video services, covering every facet of content production and distribution."
                            },
                            {
                                number: "03",
                                title: "Technological Evolution",
                                description: "Armed with cutting-edge tools and deep-rooted expertise, we're poised to tackle new challenges and shape the future of visual storytelling."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={`history-${index}-${item.year || index}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                {/* Line above the number with significant spacing */}
                                <div className="w-full h-0.5 bg-gradient-to-r from-orange-400/60 to-pink-400/60 mb-8"></div>
                                
                                <div className="text-6xl font-bold text-white mb-6">{item.number}</div>
                                <h3 className="text-xl font-bold mb-4" style={{ color: 'rgb(239, 195, 155)' }}>{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed" style={{ fontSize: '21px' }}>{item.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our History Section */}
            <section id="history" className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16 max-w-3xl mx-auto"
                    >
                                                                                    <h2
                                                                                        className="text-center"
                                                                                        style={{
                                                                                            fontSize: '40px',
                                                                                            lineHeight: '100%',
                                                                                            fontWeight: 700,
                                                                                        }}
                                                                                    >
                                                                                        <span style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#fff', marginRight: '8px' }}>OUR</span>
                                                                                        <span style={{ fontFamily: 'Depot, Ethnocentric, Orbitron, Arial, sans-serif', color: '#F28E12', letterSpacing: '0.04em', textTransform: 'uppercase' }}>HISTORY</span>
                                                                                    </h2>
                    </motion.div>

                    <div className="max-w-3xl mx-auto relative">
                        {/* Vertical line */}
                        <div className="absolute left-10 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#F28E12] via-[#F28E12] to-[#E9408A]"></div>
                        
                        {historyData.map((item, index) => (
                            <motion.div
                                key={`history-${index}-${item.year || index}`}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="relative flex items-start mb-16 last:mb-0"
                            >
                                {/* Circle and year */}
                                <div className="flex-shrink-0 mr-3 relative flex items-center">
                                    <div className="text-sm font-medium pr-4" style={{ color: 'rgb(239, 195, 155)' }}>{item.year}</div>
                                    <div className="w-3 h-3 rounded-full ml-1 bg-gradient-to-br from-[#F28E12] to-[#E9408A] border-2 border-[#F28E12] shadow-md"></div>
                                </div>
                                
                                {/* Content */}
                                <div className="flex-1 pt-0">
                                    <h3 className="text-x3 font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed text-sm">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                            className="text-center mt-40 max-w-4xl mx-auto"
                    >
                            <div
                                className="relative px-4 md:px-12 py-8 md:py-10 mx-auto"
                                style={{
                                    background: 'transparent',
                                    border: '3px solid',
                                    borderImage: 'linear-gradient(121.73deg, #0B0A0A 29.7%, #F28E12 39.03%, #DA1D5D 59.7%, #0B0A0A 70.3%) 1',
                                    boxShadow: '0 0 10px 0 rgba(242,142,18,0.08), 0 0 10px 0 rgba(233,64,138,0.07)'
                                }}
                            >
                            <blockquote className="text-xl md:text-2xl lg:text-xl text-[#f5d6bd] italic leading-relaxed md:leading-tight max-w-3xl mx-auto" style={{fontWeight: 400}}>
                                                                                                <span style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
                                                                                                    “ Whatever you want to do, if you want to be great at it, you to love it and<br className='hidden md:block'/> be able to make sacrifices for it. “
                                                                                                </span>
                            </blockquote>
                            <div className="mt-6">
                                <span className="text-base md:text-lg font-bold text-white tracking-wide uppercase">MAYA ANGELOU</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Core Values Section */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-wide" style={{ fontWeight: 700 }}>
                            <span style={{ fontFamily: 'Inter, Arial, sans-serif', color: '#fff', letterSpacing: '0.04em' }}>OUR CORE </span>
                            <span style={{ fontFamily: 'Depot, Ethnocentric, Orbitron, Arial, sans-serif', color: '#E9408A', letterSpacing: '0.04em', textTransform: 'uppercase' }}>VALUES</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-end mb-12">
                        {/* Commitments - Losango */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 mb-6 flex items-center justify-center">
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'linear-gradient(135deg, #F28E12 0%, #E9408A 100%)',
                                    transform: 'rotate(45deg)'
                                }} />
                            </div>
                            <span className="text-xl font-semibold" style={{ color: '#EDEDED', fontFamily: 'Inter, Arial, sans-serif' }}>Journey</span>
                        </div>
                        {/* Compliance - Triângulo */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 mb-6 flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
                                    <defs>
                                        <linearGradient id="triangleGradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                                            <stop stopColor="#F28E12" />
                                            <stop offset="1" stopColor="#E9408A" />
                                        </linearGradient>
                                    </defs>
                                    <polygon points="16,2 32,32 0,32" fill="url(#triangleGradient)" />
                                </svg>
                            </div>
                            <span className="text-xl font-semibold" style={{ color: '#EDEDED', fontFamily: 'Inter, Arial, sans-serif' }}>COMPLIANCE</span>
                        </div>
                        {/* Punctuality - Quadrado */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 mb-6 flex items-center justify-center">
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    background: 'linear-gradient(135deg, #F28E12 0%, #E9408A 100%)'
                                }} />
                            </div>
                            <span className="text-xl font-semibold" style={{ color: '#EDEDED', fontFamily: 'Inter, Arial, sans-serif' }}>PUNCTUALITY</span>
                        </div>
                        {/* Confidentiality - Círculo */}
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 mb-6 flex items-center justify-center">
                                <div style={{
                                    width: '32px',
                                    height: '32px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #F28E12 0%, #E9408A 100%)'
                                }} />
                            </div>
                            <span className="text-xl font-semibold" style={{ color: '#EDEDED', fontFamily: 'Inter, Arial, sans-serif' }}>CONFIDENTIALITY</span>
                        </div>
                    </div>
                    {/* Linha horizontal gradiente */}
                    <div className="w-full h-0.5" style={{ background: 'linear-gradient(90deg, #F28E12 0%, #E9408A 100%)' }}></div>
                </div>
            </section>

            {/* Team Section */}
            <TeamSection />

            {/* Ready to Create Section - Same as home */}
            <section className="py-24 relative overflow-hidden min-h-screen flex items-center">
                {/* Dark background */}
                <div className="absolute inset-0 bg-black" />
                
                {/* Custom background box - behind everything */}
                <div 
                    className="absolute left-1/2 transform -translate-x-1/2 z-0"
                    style={{ 
                        backgroundColor: 'rgb(7, 0, 16)',
                        top: '6rem', // Mais próximo dos elementos L
                        bottom: '5rem', // Menos extensão para baixo
                        width: '80%',
                        maxWidth: '1200px'
                    }}
                />

                {/* Decorative corner lines with softer orange to magenta gradient */}
                <div className="absolute" style={{ top: 'calc(6rem + 2px)', left: 'calc(10% + 2px)', width: '5rem', height: '5rem', zIndex: 20 }}>
                    <div className="w-full h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
                    <div className="w-0.5 h-full bg-gradient-to-b from-orange-500 to-pink-500"></div>
                </div>
                <div className="absolute" style={{ bottom: '5rem', right: '10%', width: '5rem', height: '5rem', zIndex: 20 }}>
                    <div className="w-full h-0.5 absolute bottom-0 left-0 bg-gradient-to-l from-pink-500 to-orange-500"></div>
                    <div className="w-0.5 h-full absolute right-0 top-0 bg-gradient-to-b from-orange-500 to-pink-500"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex items-center justify-center">
                        {/* Orb with content inside */}
                        <div style={{ width: '100%', height: '600px', position: 'relative' }}>
                            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                                <Orb
                                    hue={235}
                                    hoverIntensity={0}
                                    rotateOnHover={false}
                                    forceHoverState={false}
                                />
                            </div>

                            {/* Content centered inside orb */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ zIndex: 2 }}>
                                <motion.h2
                                    className="text-4xl md:text-5xl font-bold text-white mb-4"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    Ready to Create?
                                </motion.h2>

                                <motion.p
                                    className="text-lg text-white/80 mb-6"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    Let&apos;s bring your vision to life.
                                </motion.p>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <Button
                                        size="lg"
                                        className="bg-white text-black hover:bg-white/90 px-6 py-3 text-base font-semibold rounded-lg"
                                    >
                                        START A PROJECT
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer section - Same as home */}
            <section className="bg-black">
                <div className="container mx-auto px-6 py-8">
                    {/* Logo section */}
                    <div className="text-center mb-8">
                        <Image
                            src="/logo-with-text.png"
                            alt="CDNTV Logo"
                            width={200}
                            height={120}
                            className="mx-auto mb-2"
                        />
                    </div>
                    {/* Gradient bar aligned and sized to map */}
                    <div className="w-full max-w-7xl mx-auto px-5 lg:px-20" style={{marginTop: '0.1rem', marginBottom: '3.5rem'}}>
                        <div style={{ width: '100%', height: '0', borderTop: '1px solid', borderImage: 'linear-gradient(90deg, #F28E12 9.13%, #DA1D5D 84.13%) 1' }}></div>
                    </div>
                    {/* Footer Links */}
                    <div className="w-full max-w-7xl mx-auto px-5 lg:px-20 mb-16">
                        {/* Desktop: grid, Mobile: centralizado */}
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
                                <Link href="/services#process" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Process</Link>
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
                                <Link href="/about#history" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Journey</Link>
                                <a href="#mission" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Mission</a>
                                <Link
                                    href="/about#team"
                                    onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                        e.preventDefault();
                                        router.push('/about#team');
                                    }}
                                    className="text-white hover:text-orange-400 transition-colors text-sm"
                                    style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                                >
                                    Team
                                </Link>
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
                                <a href="#" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Privacy Policy</a>
                                <a href="#" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Terms of Service</a>
                                <a href="#" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Cookies Policy</a>
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
                                <p className="text-white text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>6200-865 Covilhã</p>
                                <a href="tel:+351275959168" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>+351 275 959 168</a>
                            </div>
                        </div>
                        {/* Mobile: centralizado */}
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
                                    <Link href="/about#history" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Journey</Link>
                                    <a href="#mission" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Mission</a>
                                    <Link
                                        href="/about#team"
                                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                            e.preventDefault();
                                            router.push('/about#team');
                                        }}
                                        className="text-white text-base"
                                        style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                                    >
                                        Team
                                    </Link>
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
                                    <a href="#" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Privacy Policy</a>
                                    <a href="#" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Terms of Service</a>
                                    <a href="#" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Cookies Policy</a>
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
                                    <p className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>6200-865 Covilhã</p>
                                    <a href="tel:+351275959168" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>+351 275 959 168</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="w-full max-w-7xl mx-auto mt-2 mb-2.5 px-5 lg:px-20 pt-2 flex justify-center items-center">
                        <div className="relative w-full overflow-hidden bg-transparent">
                            {/* Mapa Principal */}
                            <iframe
                                src="https://maps.google.com/maps?q=Parkurbis,+Covilhã,+Portugal&hl=pt&z=16&output=embed"
                                className="relative z-10 w-full h-[200px] lg:h-[250px] md:h-[220px] sm:h-[180px] border-0 shadow-2xl block transition-all duration-500"
                                style={{
                                    filter: 'grayscale(100%) brightness(0.4) contrast(1.8)',
                                    borderRadius: '0px',
                                    transformOrigin: 'center',
                                    pointerEvents: 'auto'
                                }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            
                            {/* Pin Simples da Localização */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
                                <div className="relative">
                                    {/* Círculo pulsante maior */}
                                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-orange-400/20 to-pink-400/20 animate-ping"></div>
                                    
                                    {/* Pin da Empresa */}
                                    <div 
                                        className="relative z-30 cursor-pointer pointer-events-auto hover:scale-110 transition-transform duration-300"
                                        onClick={() => {
                                            const iframe = document.querySelector('iframe') as HTMLIFrameElement;
                                            if (iframe) {
                                                iframe.src = "https://maps.google.com/maps?q=Parkurbis,+Covilhã,+Portugal&hl=pt&z=16&output=embed";
                                                iframe.style.transform = 'scale(1)';
                                            }
                                        }}
                                        title="Clique para recentralizar no CDNTV HQ"
                                    >
                                        <Image
                                            src="/tv_map.png"
                                            alt="CDNTV Location"
                                            width={40}
                                            height={40}
                                            className="filter drop-shadow-lg"
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            <div className="absolute top-6 right-6 flex items-center space-x-2 z-20">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span className="text-green-400 font-mono text-xs">ONLINE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Footer Section with Copyright and Scroll to Top */}
            <section className="bg-black">
                <div className="w-full max-w-7xl mx-auto px-8 lg:px-24">
                    {/* Gradient Line */}
                    <div className="w-full h-px bg-gradient-to-r from-orange-400/60 to-pink-400/60 mb-6"></div>
                    
                    {/* Copyright and Scroll to Top */}
                    <div className="flex items-center justify-between py-4">
                        <div className="flex-1 text-center">
                            <p className="text-gray-300 text-sm">
                                Copyright © CDNTV - Empowering Creativity 2025. All rights reserved.
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

export default AboutSection;