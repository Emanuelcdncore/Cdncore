'use client'

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import CTASection from "@/components/CTASection";
import { motion, AnimatePresence } from "framer-motion";
import Threads from "@/components/ui/threads";
import { FloatingNav } from "@/components/ui/floating-nav";
import { Button } from "@/components/ui/button";
import Orb from "@/components/Orb";
import Image from "next/image";
import Footer from "@/components/Footer";

const navItems = [
  {
    name: "About",
    link: "/about/",
  },
  {
    name: "Services",
    link: "/services/",
  },
  {
    name: "Contact",
    link: "/contact/",
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
      imageSrc: "/services/institutional.webp",
      items: [
        "Official coverage of institutional events and photographic sessions. Comprehensive technical support, including simultaneous interpretation, media management and sound assistance.",
        "Official Photography",
        "Event Coverage",
        "Media Management",
        "Sound Assistance"
      ]
    },
    {
      category: "Corporate",
      imageSrc: "/services/corporate.webp",
      items: [
        "From preparation to launch, we provide full audiovisual production for corporations, ensuring clear, professional communication aligned with brand identity.",
        "Product Launches",
        "Training Videos",
        "Corporate Events",
        "Public Presentations"
      ]
    },
    {
      category: "Social Media",
      imageSrc: "/services/socialmedia.webp",
      items: [
        "Enhancing digital presence through strategic content creation and specialized training, tailored for brands, teams and creators.",
        "Content Creation",
        "Social Media Training",
        "Account Management",
        "Engagement Strategies"
      ]
    },
    {
      category: "Live Events",
      imageSrc: "/services/liveevents.jpg",
      items: [
        "Multi-camera setups and live broadcast production with high-quality streaming, for events of any scale, on-site or remote.",
        "Multi-Camera",
        "Live Streaming",
        "Broadcast Quality",
        "Remote Production"
      ]
    }
  ];

  const processSteps = [
    {
      number: "01",
      title: "Discovery & Planning",
      description: "We begin by understanding your vision, objectives and audience, establishing a strategic and creative foundation for the project."
    },
    {
      number: "02",
      title: "Pre-Production",
      description: "Detailed planning, scripting, storyboarding and resource coordination to ensure a smooth and efficient execution"
    },
    {
      number: "03",
      title: "Production",
      description: "Professional on-site execution with our experienced team and state-of-the-art equipment, capturing every element with precision."
    },
    {
      number: "04",
      title: "Post-Production & Delivery",
      description: "Editing, color grading, sound design and final mastering, delivered in formats optimized for all distribution platforms."
    },
    {
      number: "05",
      title: "Support",
      description: "We continue to accompany your project after delivery, offering updates, adjustments and technical support whenever needed."
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
                We create high-end audiovisual work with clarity, precision and refined visual identity. From concept to delivery, every project is crafted to elevate the message and the brand behind it.
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
                <span className="font-inter" style={{ color: '#fff', letterSpacing: '0.04em' }}>Our </span>
                <span className="font-depot" style={{ color: 'rgba(218, 29, 93, 1)' }}>Services</span>
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
                      src={service.imageSrc}
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
                <span className="font-inter" style={{ color: '#fff', letterSpacing: '0.04em' }}>Our </span>
                <span className="font-depot" style={{ color: 'rgba(242, 142, 18, 1)' }}>Process</span>
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
                      asChild
                      className="bg-white text-black hover:bg-white/90 px-6 py-3 text-base font-semibold rounded-lg"
                    >
                      <Link href="/contact/">START A PROJECT</Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />

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
