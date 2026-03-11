"use client";
import React, { JSX, useState } from "react";
import {
    motion,
    AnimatePresence,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./search-bar";
import { useIsMobile } from "@/hooks/use-mobile";

const bp = process.env.BASE_PATH || '';

export const FloatingNav = ({
    navItems,
    className,
}: {
    navItems: {
        name: string;
        link: string;
        icon?: JSX.Element;
    }[];
    className?: string;
}) => {
    const isMobile = useIsMobile();

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    if (isMobile) {
        return (
            <nav className="fixed top-6 left-0 z-[5000] px-2">
                <button
                    aria-label="Open menu"
                    className="text-white text-2xl bg-gradient-to-r from-orange-500/15 to-pink-500/15 rounded-xl p-2 shadow-lg"
                    onClick={() => setMenuOpen(true)}
                >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect y="7" width="32" height="3" rx="1.5" fill="#F28E12"/><rect y="15" width="32" height="3" rx="1.5" fill="#DA1D5D"/><rect y="23" width="32" height="3" rx="1.5" fill="#F28E12"/></svg>
                </button>
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ x: -320, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -320, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 h-screen w-[80vw] max-w-xs z-[6000] flex flex-col"
                            style={{ background: 'linear-gradient(120deg, #18181b 80%, #F28E12 120%)', backdropFilter: 'blur(16px)', borderRight: '2px solid #F28E12', boxShadow: '0 8px 32px 0 rgba(218,29,93,0.18)' }}
                        >
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center h-10 justify-center" style={{ width: '48px' }}>
                                    <button
                                        aria-label="Close menu"
                                        className="bg-black border border-orange-500 rounded-xl p-2 flex items-center h-10 mx-auto hover:scale-110 transition-transform duration-200 shadow-md"
                                        style={{ minHeight: '40px', marginLeft: 'auto', marginRight: 'auto' }}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ display: 'block' }}><rect x="7" y="15" width="18" height="3" rx="1.5" transform="rotate(-45 16 16)" fill="#F28E12"/><rect x="7" y="15" width="18" height="3" rx="1.5" transform="rotate(45 16 16)" fill="#DA1D5D"/></svg>
                                    </button>
                                </div>
                                <div className="flex items-center h-10">
                                    <img src={`${bp}/3.png`} alt="CDNTV" className="w-10 h-8 object-contain ml-2 rounded shadow-lg" style={{ minHeight: '32px' }} />
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-8 px-8 pt-4">
                                <Link href="/" className="flex items-center gap-3 text-white text-lg font-semibold py-2 group">
                                    <svg width="28" height="28" fill="none" stroke="#F28E12" strokeWidth="2" viewBox="0 0 24 24" className="drop-shadow-md group-hover:scale-110 transition-transform duration-200"><path d="M3 9.5L12 3l9 6.5V21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 22V12h6v10"/></svg>
                                    <span className="group-hover:text-orange-400 transition-colors duration-200">Home</span>
                                </Link>
                                <Link href="/about/" className="flex items-center gap-3 text-white text-lg font-semibold py-2 group">
                                    <svg width="28" height="28" fill="none" stroke="#DA1D5D" strokeWidth="2" viewBox="0 0 24 24" className="drop-shadow-md group-hover:scale-110 transition-transform duration-200"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-4 8-4s8 0 8 4"/></svg>
                                    <span className="group-hover:text-pink-400 transition-colors duration-200">About</span>
                                </Link>
                                <Link href="/services/" className="flex items-center gap-3 text-white text-lg font-semibold py-2 group">
                                    <svg width="28" height="28" fill="none" stroke="#F28E12" strokeWidth="2" viewBox="0 0 24 24" className="drop-shadow-md group-hover:scale-110 transition-transform duration-200"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/></svg>
                                    <span className="group-hover:text-orange-400 transition-colors duration-200">Services</span>
                                </Link>
                                <Link href="/news/" className="flex items-center gap-3 text-white text-lg font-semibold py-2 group">
                                    <svg width="28" height="28" fill="none" stroke="#DA1D5D" strokeWidth="2" viewBox="0 0 24 24" className="drop-shadow-md group-hover:scale-110 transition-transform duration-200"><path d="M4 4h16v16H4z"/><path d="M4 8h16"/><path d="M8 4v4"/><path d="M7 12h4"/><path d="M7 15h10"/><path d="M7 18h6"/><path d="M14 11h3v4h-3z"/></svg>
                                    <span className="group-hover:text-pink-400 transition-colors duration-200">News</span>
                                </Link>
                                <Link href="/contact/" className="flex items-center gap-3 text-white text-lg font-semibold py-2 group">
                                    <svg width="28" height="28" fill="none" stroke="#DA1D5D" strokeWidth="2" viewBox="0 0 24 24" className="drop-shadow-md group-hover:scale-110 transition-transform duration-200"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>
                                    <span className="group-hover:text-pink-400 transition-colors duration-200">Contact</span>
                                </Link>
                            </div>
                            <div className="mt-auto pb-8 px-8 text-center">
                                <span className="text-white font-bold text-lg font-sans tracking-wide" style={{ letterSpacing: '0.08em' }}>CDNTV</span>
                                <div className="text-gray-400 text-sm font-light mt-1">Empowering Creative Connections</div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        );
    }
    // Desktop nav (original)
    return (
        <AnimatePresence>
            <motion.div
                initial={{
                    opacity: 0,
                    y: -20,
                }}
                animate={{
                    y: 0,
                    opacity: 1,
                }}
                transition={{
                    duration: 0.4,
                }}
                className="fixed top-10 inset-x-0 mx-auto max-w-xl w-full z-[5000] p-[1px] rounded-full bg-gradient-to-r from-red-500/35 via-orange-500/45 to-red-500/35"
            >
                <div
                    className={cn(
                        "flex w-full rounded-full backdrop-blur-sm pr-4 pl-6 py-0.5 items-center relative",
                        "shadow-lg shadow-black/20",
                        className
                    )}
                    style={{
                        background: 'linear-gradient(90deg, rgba(242,142,18,0.15) 0%, rgba(218,29,93,0.15) 100%)',
                        backdropFilter: 'blur(12px)',
                        boxShadow: '0 2px 16px 0 rgba(218,29,93,0.10)',
                    }}
                >
                {/* Logo left */}
                <div className="flex items-center relative z-10">
                    <Link href="/" className="flex items-center">
                        <Image src={`${bp}/3.png`} alt="CDNTV" width={30} height={20} unoptimized className="object-contain" />
                    </Link>
                </div>
                {/* Nav items centered */}
                <div className="flex items-center space-x-10 absolute left-1/2 transform -translate-x-1/2 z-10">
                    {navItems.map((navItem, idx) => (
                        <Link
                            key={`link=${idx}`}
                            href={navItem.link}
                            className={cn(
                                "relative text-white items-center flex space-x-1 hover:text-orange-400 transition-all duration-300 group py-1 text-base font-semibold"
                            )}
                            style={{ fontFamily: 'Inter', letterSpacing: '0.04em' }}
                        >
                            <span className="relative">
                                {navItem.name}
                                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
                            </span>
                        </Link>
                    ))}
                </div>
                {/* Search Icon right */}
                <button
                    onClick={() => setIsSearchOpen(true)}
                    className="text-white hover:text-white/80 p-2 rounded-full ml-auto transition-colors"
                >
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                    </svg>
                </button>
                </div>
            </motion.div>
            <SearchBar
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />
        </AnimatePresence>
    );
};
