'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import CTASection from "@/components/CTASection";
import { motion, AnimatePresence } from "framer-motion";
import Threads from "@/components/ui/threads";
import { FloatingNav } from "@/components/ui/floating-nav";
import { Button } from "@/components/ui/button";
import Orb from "@/components/Orb";
import Image from "next/image";

const navItems = [
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Services",
    link: "/services",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export default function ServicesPage() {
  const [isTeamOverlayOpen, setIsTeamOverlayOpen] = useState(false);

  const teamMembers = [
    { role: "Creative Director", department: "LEADERSHIP" },
    { role: "Technical Lead", department: "ENGINEERING" },
    { role: "Producer", department: "PRODUCTION" },
    { role: "Camera Op", department: "PRODUCTION" },
    { role: "Editor", department: "POST" },
    { role: "VFX Artist", department: "POST" },
    { role: "Sound Designer", department: "POST" },
    { role: "3D Artist", department: "DESIGN" },
    { role: "Motion Designer", department: "DESIGN" }
  ];

  const services = [
    {
      category: "Institutional",
      items: [
        "Official cameraman and photographs. From briefing to final editing. Simultaneous translation and sound media assistance management.",
        "Official photography",
        "Event coverage",
        "Media management",
        "Sound assistance"
      ]
    },
    {
      category: "Corporate",
      items: [
        "From briefing to product launch. Professional coverage for corporations with full production capabilities.",
        "Product launches",
        "Training videos",
        "Corporate events",
        "Public presentations"
      ]
    },
    {
      category: "Social Media",
      items: [
        "Empowerment of social media accounts. Social media training and content creation.",
        "Content creation",
        "Social media training",
        "Account management",
        "Engagement strategies"
      ]
    },
    {
      category: "Live Events",
      items: [
        "Multi-camera setups, streaming services, and broadcast quality productions for events of any scale.",
        "Multi-camera production",
        "Live streaming",
        "Broadcast quality",
        "Remote production"
      ]
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We begin by understanding your vision, objectives, and target audience to create a strategic approach."
    },
    {
      number: "02",
      title: "Pre-Production",
      description: "Detailed planning, scripting, storyboarding, and resource allocation for seamless execution."
    },
    {
      number: "03",
      title: "Production",
      description: "Professional execution with our expert team and state-of-the-art equipment."
    },
    {
      number: "04",
      title: "Post-Production & Delivery",
      description: "Editing, color grading, sound design, and final delivery optimized for all platforms."
    }
    ,
    {
      number: "05",
      title: "Support",
      description: "We provide ongoing support for updates, optimizations, and any adjustments needed to keep your content performing at its best."
    }
  ];

  const capabilities = [
    {
      title: "Production",
      description: "Multi-camera setups, 4K/8K recording, professional crews"
    },
    {
      title: "Post-Production",
      description: "Editing, color grading, motion graphics, audio mastering"
    },
    {
      title: "Broadcasting",
      description: "Live streaming, satellite uplink, remote production"
    },
    {
      title: "Technology",
      description: "VR production, 360° video, drone operations"
    },
    {
      title: "Creative",
      description: "Streamlined workflows, cloud solutions, 5G"
    },
    {
      title: "Support",
      description: "24/7 availability, technical consulting, training"
    }
  ];

  return (
    <main className="relative bg-black min-h-screen">
      <FloatingNav navItems={navItems} />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="py-24 relative overflow-hidden min-h-screen flex items-center">
          {/* Dark background */}
          <div className="absolute inset-0 bg-black" />

          {/* LightRays Effect Background - igual ao About */}
          <div className="absolute inset-0 z-5" style={{ width: '100%', height: '100%' }}>
            <Threads
              amplitude={1.4}
              distance={0.5}
              enableMouseInteraction={false}
              color={[0.29, 0.56, 0.89]}
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
                <span className="text-sm font-medium tracking-widest uppercase" style={{
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
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-semibold text-white mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Services
              </motion.h1>

              <motion.p
                className="text-xl text-white/80 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Creating exceptional audiovisual experiences with our comprehensive range of professional services,
                from corporate communications to live events and everything in between.
              </motion.p>

              <motion.div
                className="flex flex-col items-center mx-auto"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={{ opacity: 1, scaleY: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="w-0.5 h-16 bg-gradient-to-b from-orange-400 to-pink-400"></div>
                <div className="w-2 h-2 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full mt-1"></div>
              </motion.div>
            </div>
          </div>
        </section>

  {/* Our Services Section */}
  <section id="services" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light mb-2">
                <span style={{ color: '#fff', fontWeight: 600 }}>Our </span>
                <span style={{ color: 'rgba(218, 29, 93, 1)', fontWeight: 600 }}>Services</span>
              </h2>
              <div className="mb-4">
                <span className="text-gray-400 text-sm font-medium tracking-widest uppercase">WHAT WE OFFER</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black border-t border-l border-r border-gray-700/50 border-b-0 p-0 min-h-[460px] rounded-lg flex overflow-hidden shadow-lg relative"
                >
                  {/* Left: Text */}
                  <div className="flex-1 flex flex-col justify-between p-8">
                    <h3 className="text-2xl font-bold mb-3 text-left" style={{ color: '#FFD7A0' }}>{service.category}</h3>
                    <p className="text-white text-sm leading-relaxed mb-4 text-left" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>{service.items[0]}</p>
                    <div className="flex flex-col gap-2 mt-2 mb-4">
                      {service.items.slice(1).map((item, itemIndex) => {
                        return (
                          <div key={itemIndex} className="text-left text-sm" style={{
                            background: 'linear-gradient(90deg, #F6C9A0 0%, #FF814B 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontFamily: 'Inter, Arial, sans-serif'
                          }}>
                            {item}
                          </div>
                        );
                      })}
                    </div>
                    <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-orange-400 to-pink-400"></div>
                  </div>
                  {/* Right: Image placeholder */}
                  <div className="w-1/2 flex items-center justify-center bg-black">
                    <Image
                      src={
                        index === 0 ? '/institutional.jpg' :
                        index === 1 ? '/corporate.jpg' :
                        index === 2 ? '/socialmedia.jpg' :
                        index === 3 ? '/liveevents.jpg' :
                        '/default.jpg'
                      }
                      alt={service.category}
                      width={220}
                      height={220}
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

  {/* Our Process Section */}
  <section id="process" className="py-24 bg-black">
          <div className="container mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-light mb-8" style={{ textAlign: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 600 }}>Our </span>
                <span style={{ color: 'rgba(242, 142, 18, 1)', fontWeight: 600 }}>Process</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto md:ml-32">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative flex items-start mb-17 last:mb-0"
                >
                  {/* Linha conectora vertical */}
                  {(index < processSteps.length - 1 || index === processSteps.length - 1) && (
                    <div
                      className="absolute left-6 top-12 w-0.5 h-12"
                      style={{
                        borderLeft: '3px solid',
                        borderImageSource: 'linear-gradient(90deg, #DA1D5D 0%, #FF814B 100%)',
                        borderImageSlice: 1
                      }}
                    ></div>
                  )}
                  {/* Círculo com número do step */}
                  <div className="flex-shrink-0 mr-8 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center relative">
                      <span className="font-light text-base z-10" style={{ color: 'rgba(221, 221, 221, 1)' }}>0{index + 1}</span>
                      <span
                        className="absolute inset-0 rounded-full pointer-events-none"
                        style={{
                          padding: 0,
                          border: '3px solid transparent',
                          background: 'linear-gradient(90deg, #DA1D5D 0%, #FF814B 100%)',
                          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                          WebkitMaskComposite: 'xor',
                          maskComposite: 'exclude'
                        }}
                      ></span>
                    </div>
                  </div>
                  {/* Conteúdo do step */}
                  <div className="flex-1 mt-[-8px]">
                    <div className="mb-2 text-left md:text-left">
                      <span className="text-sm font-light" style={{ color: 'rgba(246, 201, 160, 1)' }}>STEP 0{index + 1}</span>
                    </div>
                    <h3 className="text-2xl font-light mb-3 text-left md:text-left" style={{ color: 'rgba(221, 221, 221, 1)' }}>{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed font-light text-left md:text-left">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* Ready to Create Section - Same as About page */}
        <section className="py-24 relative overflow-hidden min-h-screen flex items-center">
          {/* Dark background */}
          <div className="absolute inset-0 bg-black" />

          {/* Custom background box - behind everything */}
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 z-0"
            style={{ 
              backgroundColor: 'rgb(7, 0, 16)',
              top: '6rem',
              bottom: '5rem',
              width: '80%',
              maxWidth: '1200px'
            }}
          />

          {/* Decorative L elements - igual ao About */}
          <div className="absolute" style={{ top: 'calc(6rem + 2px)', left: 'calc(10% + 2px)', width: '5rem', height: '5rem', zIndex: 10 }}>
            <div className="w-full h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
            <div className="w-0.5 h-full bg-gradient-to-b from-orange-500 to-pink-500"></div>
          </div>
          <div className="absolute" style={{ bottom: '5rem', right: '10%', width: '5rem', height: '5rem', zIndex: 10 }}>
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

        {/* Footer section - Same as About */}
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
                  <a href="/services#process" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Process</a>
                  <a href="https://github.com/cdnCore-Pt?tab=repositories" target='_blank' className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Portfolio</a>
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
                  <a href="/about#history" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Journey</a>
                  <a href="/about#mission" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Mission</a>
                  <a href="/about#team" className="text-white hover:text-orange-400 transition-colors text-sm" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Team</a>
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
                    <a href="/services#process" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Process</a>
                    <a href="https://github.com/cdnCore-Pt?tab=repositories" target='_blank' className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Portfolio</a>
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
                    <a href="/about#history" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Journey</a>
                    <a href="/about#mission" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Mission</a>
                    <a href="/about#team" className="text-white text-base" style={{ fontFamily: 'Inter, Arial, sans-serif' }}>Team</a>
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

        {/* Team Overlay */}
        <AnimatePresence>
          {isTeamOverlayOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-6"
              onClick={() => setIsTeamOverlayOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-black">Our Complete Team</h2>
                  <button
                    onClick={() => setIsTeamOverlayOpen(false)}
                    className="text-gray-500 hover:text-black text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Team Grid - 3x3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="bg-gray-200 p-4"
                    >
                      <div className="bg-white border border-gray-300">
                        <div className="aspect-square bg-gray-100 overflow-hidden">
                          <Image
                            src={`/av${index + 1}.${index === 1 || index === 4 ? 'png' : 'jpg'}`}
                            alt={member.role}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="bg-white p-4 text-left">
                          <h3 className="text-sm font-semibold text-black mb-1">{member.role}</h3>
                          <p className="text-xs text-gray-400 tracking-wider uppercase">{member.department}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
    
  );
}
