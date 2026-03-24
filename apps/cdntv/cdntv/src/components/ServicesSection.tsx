'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FlipWords } from "./ui/flip-words";
import Image from "next/image";

const ServicesSection = () => {
    const services = [
        {
            title: "3D & Virtual Reality",
            description: "Bring ideas to life with immersive 3D and VR experiences that engage and inspire.",
            filters: ["3D"],
            image: "3D.png"
        },
        {
            title: "Live Events",
            description: "We deliver flawless live event production with seamless streaming integration.",
            filters: ["Live", "Events"],
            image: "Live.png"
        },
        {
            title: "Streaming",
            description: "Professional streaming solutions to reach any audience, anywhere, with crystal-clear quality.",
            filters: ["Streaming"],
            image: "Streaming.png"
        },
        {
            title: "Corporate Events",
            description: "Tailored technical production for impactful corporate meetings, launches, and conferences.",
            filters: ["Corporate"],
            image: "Corporate Events.png"
        },
        {
            title: "Post Production",
            description: "From editing to color grading, we craft polished visuals that tell your story.",
            filters: ["Political"],
            image: "Post Production.png"
        },
        {
            title: "Hybrid Events",
            description: "Seamlessly blend in-person and online audiences for dynamic, interactive hybrid experiences.",
            filters: ["Business", "Reports"],
            image: "Hybrid Events.png"
        }
    ];

    const rotatingTexts = [
        "Creativity",
        "3D",
        "Industrial Design",
        "Web Design",
        "Graphic Design",
        "Audio/Visual",
        "Corporate Communication",
        "Political Communication",
        "Business Communication"
    ].map(text => text.toUpperCase());

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Gradient bar aligned and sized to main container */}
            <div className="container mx-auto px-6 max-w-7xl">
                <motion.h2
                    className="text-xl sm:text-2xl md:text-4xl font-bold mb-16 text-center break-words"
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="font-inter" style={{ color: '#fff', letterSpacing: '0.04em' }}>INNOVATION MEETS </span>
                    <FlipWords words={rotatingTexts} className="flipwords-orange" />
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 grid-rows-2 gap-6 max-w-7xl mx-auto">
                    {services.map((service, index) => {
                        // ...existing code...
                        const gridSpans = [
                            "col-span-full md:col-span-full lg:col-span-2",
                            "col-span-full md:col-span-2 lg:col-span-1",
                            "col-span-full md:col-span-2 lg:col-span-1",
                            "col-span-full md:col-span-full lg:col-span-1",
                            "col-span-full md:col-span-2 lg:col-span-1",
                            "col-span-full md:col-span-2 lg:col-span-2"
                        ];

                        // All service boxes use the same dark background, no borders
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    ease: "easeOut"
                                }}
                                viewport={{ once: true }}
                                className={`p-8 hover-lift group shadow-lg ${gridSpans[index] || 'col-span-1'}`}
                                style={{ background: 'rgba(26, 26, 26, 1)' }}
                            >
                                {/* Top row: Image placeholder (left) and Tags (right) */}
                                <div className="flex items-start justify-between mb-6">
                                    {/* Service Icon - sem fundo */}
                                    <div className="w-12 h-12 flex items-start justify-center mt-0">
                                        <Image
                                            src={`/${service.image}`}
                                            alt={service.title}
                                            width={48}
                                            height={48}
                                            className="object-contain max-w-12 max-h-12"
                                        />
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1">
                                        {service.filters.map((filter) => (
                                            <span
                                                key={filter}
                                                className="px-2 py-1 text-xs"
                                                style={{
                                                    background: 'rgba(41, 34, 34, 1)',
                                                    border: '1px solid rgba(207, 186, 186, 1)'
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        backgroundImage: 'linear-gradient(90deg, #FF814B 16.07%, #DA1D5D 100%)',
                                                        color: 'transparent',
                                                        backgroundClip: 'text',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent'
                                                    }}
                                                >
                                                    {filter}
                                                </span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-yellow transition-colors">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground">
                                    {service.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
