'use client'

import { motion } from "framer-motion";
import Squares from "@/components/Squares";
import Image from "next/image";

const bp = process.env.BASE_PATH || '';

const HeroSection = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                        {/* Squares Background */}
                        <div className="absolute inset-0">
                                                                <Squares
                                                                    direction="right"
                                                                    speed={1}
                                                                    borderColor="rgba(191, 167, 106, 0.35)"
                                                                    squareSize={40}
                                                                    hoverFillColor="#222"
                                                                    className="w-full h-full" />
                        </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col justify-center items-center text-center">
                    <Image
                        src={`${bp}/logo_first.png`}
                        alt="CDNTV Logo"
                        width={550}
                        height={550}
                        quality={100}
                        priority={true}
                        unoptimized
                        className="select-none"
                        style={{
                            imageRendering: 'crisp-edges'
                        }}
                    />
                </div>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <div className="relative w-8 h-14 flex justify-center items-start">
                    {/* filled background */}
                    <div className="absolute inset-0 bg-transparent rounded-full" />
                    {/* gradient border orange-pink */}
                    <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-orange-400/60 to-pink-400/60 p-0.5">
                        <div className="w-full h-full bg-black rounded-full"></div>
                    </div>

                    {/* animated scroll wheel */}
                    <motion.div
                        className="relative w-2 h-3 rounded-full mt-3 bg-gradient-to-b from-orange-400/80 to-pink-400/80"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />

                </div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
