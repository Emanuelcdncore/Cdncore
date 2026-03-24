'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const ProjectsSection = () => {
    const projects = [
        {
            title: "Broadcast Corporate Events",
            category: "Corporate",
            description: "Professional broadcasting solutions for corporate events and conferences",
            image: "/broadcast.jpg"
        },
        {
            title: "EU Parliament Coverage",
            category: "Political",
            description: "Comprehensive coverage of European Parliament sessions",
            image: "/ppolitic.jpg"
        },
        {
            title: "Annual Report 2024",
            category: "Business",
            description: "Creative visual representation of annual business reports",
            image: "/business.jpg"
        },
        {
            title: "Global Summit",
            category: "Events",
            description: "International summit coverage with multi-language support",
            image: "/event.jpg"
        },
        {
            title: "Broadcast Corporate Events",
            category: "Corporate",
            description: "Professional broadcasting solutions for corporate events and conferences",
            image: "/broadcast1.jpg"
        },
        {
            title: "EU Parliament Coverage",
            category: "Political",
            description: "Comprehensive coverage of European Parliament sessions",
            image: "/politic1.jpg"
        },
        {
            title: "Annual Report 2024",
            category: "Business",
            description: "Creative visual representation of annual business reports",
            image: "/busness1.jpg"
        },
        {
            title: "Global Summit",
            category: "Events",
            description: "International summit coverage with multi-language support",
            image: "/event1.jpg"
        }
    ];

    return (
        <section className="py-24 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Our <span style={{ color: 'rgba(242, 142, 18, 1)' }}>Projects</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        Showcasing our expertise across diverse industries and creative challenges
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-20">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.6,
                                delay: index * 0.1,
                                ease: "easeOut"
                            }}
                            viewport={{ once: true }}
                            className="group relative glass overflow-hidden hover-lift border border-white/20 shadow-2xl bg-gradient-to-br from-slate-900/80 via-gray-800/70 to-slate-900/80 backdrop-blur-md hover:shadow-orange-500/10 transition-all duration-500"
                        >
                            {/* Project image with tag overlay */}
                            <div className="aspect-video bg-gradient-glow relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }}>
                                <div className="absolute inset-0 bg-gradient-brand opacity-20" />

                                {/* Tag in top-left corner */}
                                <div className="absolute top-3 left-3">
                                    <span className="bg-gradient-to-r from-orange-500/95 to-pink-500/95 text-white px-3 py-1.5 text-xs font-semibold backdrop-blur-md border border-orange-300/30 shadow-2xl drop-shadow-lg hover:from-orange-400 hover:to-pink-400 transition-all duration-300 group-hover:scale-105">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content area */}
                                <div className="p-6 border-t border-white/10" style={{ background: 'rgb(26, 26, 26)' }}>
                                    <motion.h3
                                        className="text-lg font-bold mb-8 text-white"
                                        initial={{ opacity: 0, filter: "blur(10px)" }}
                                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                                        transition={{ duration: 0.8, delay: index * 0.05 }}
                                        viewport={{ once: true }}
                                        style={{ color: 'rgba(246, 201, 160, 1)' }}
                                    >
                                        {project.title}
                                    </motion.h3>
                                <p className="text-sm text-white/80">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;