'use client'

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Orb from "@/components/Orb";
import dynamic from "next/dynamic";
import Image from "next/image";
import LightRays from "@/components/ui/LightRays";
import { Orbitron } from "next/font/google";
import TeamSection from "@/components/Team/TeamSection";
import Footer from "@/components/Footer";

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

    interface HistoryItem {
        year: string;
        title: string;
        description: string;
    }

    const historyData: HistoryItem[] = [
        {
            year: "2009",
            title: "The Beginning",
            description: "Founded in Lisbon with the mission of crafting meaningful audiovisual stories, the company has grown and evolved over time. Today, while our origins remain in Lisbon, our creative base operates from Covilhã, where we continue to develop our work."
        },
        {
            year: "2015",
            title: "European Expansion",
            description: "Strong collaborations with European institutions expanded our reach, including work as an official cameraman in high-level governmental contexts. This period marked our consolidation beyond national borders."
        },
        {
            year: "2020",
            title: "Technological Innovation",
            description: "From diplomatic events to broadcast productions, our work captured key moments and audiences. By combining technical innovation with established craft, we continued to refine our visual language."
        },
        {
            year: "2024",
            title: "Global Leadership",
            description: "As our journey evolves, our commitment to innovation remains constant. Today, our work extends globally, supported by professionalism, creative exploration and a continuous desire to grow."
        }
    ];

    interface MissionItem {
        number: string;
        title: string;
        description: string;
    }

    const missionData: MissionItem[] = [
        {
            number: "01",
            title: "A Team of Visionaries",
            description: "Our strength is our team. Formed by experienced creatives and technicians, we develop both independent productions and commissioned projects, always driven by collaboration, curiosity and craft."
        },
        {
            number: "02",
            title: "Comprehensive Solutions",
            description: "We don't just produce video, we design complete audiovisual solutions. From concept and production to post-production and delivery, we cover every step of the process with clarity and creative focus."
        },
        {
            number: "03",
            title: "Technological Evolution",
            description: "With advanced tools and deep technical expertise, we embrace new challenges and continually explore emerging techniques. Our commitment to innovation fuels the evolution of our visual storytelling."
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
                            className="text-xl text-white/80 max-w-4xl mx-auto mb-6 font-inter"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{ textAlign: 'center', lineHeight: '1.6' }}
                        >
                            We believe every story has a pulse, a rhythm, an emotion, a truth worth capturing.
                        </motion.p>

                        <motion.p
                            className="text-lg text-white/80 max-w-4xl mx-auto mb-8 font-inter"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            style={{ textAlign: 'center', lineHeight: '1.7' }}
                        >
                            With nearly two decades of work behind us and over 30 years of combined experience in audiovisual production, our team has shaped moving images for clients around the world, guided by curiosity, precision and respect for the craft.
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
                                Located in the heart of Covilhã and expanding its expertise globally, CDNTV stands as a beacon of excellence in audiovisual production.
                            </p>
                        </motion.div>
                    </div>

                    {/* Mission Points */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
                        {missionData.map((item, index) => (
                            <motion.div
                                key={`mission-${index}-${item.number}`}
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
                            <blockquote className="text-xl md:text-2xl lg:text-xl text-[#f5d6bd] italic leading-relaxed md:leading-tight max-w-3xl mx-auto" style={{ fontWeight: 400 }}>
                                <span style={{ fontFamily: 'Inter, Arial, sans-serif' }}>
                                    “ Whatever you want to do, if you want to be great at it, you to love it and<br className='hidden md:block' /> be able to make sacrifices for it. “
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
                            <span className="text-xl font-semibold" style={{ color: '#EDEDED', fontFamily: 'Inter, Arial, sans-serif' }}>COMMITMENT</span>
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
                            <span className="text-xl font-semibold" style={{ color: '#EDEDED', fontFamily: 'Inter, Arial, sans-serif' }}>INTEGRITY</span>
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
                                        asChild
                                        className="bg-white text-black hover:bg-white/90 px-6 py-3 text-base font-semibold rounded-lg"
                                    >
                                        <Link href="/contact">START A PROJECT</Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </>
    );
};

export default AboutSection;