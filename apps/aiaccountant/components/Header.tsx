"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const basePath = process.env.BASE_PATH || "";

const navLinks = [
  { name: "Features" },
  { name: "Investors" },
  { name: "Beta Program" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={`${basePath}/images/logo.png`}
            alt="Ai-Accountant"
            style={{ height: 32, width: "auto" }}
          />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <span
              key={link.name}
              className="text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors cursor-default"
            >
              {link.name}
            </span>
          ))}
          <a
            href="https://cdnglobal.eu/request-demo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-emerald-600 transition-all shadow-lg shadow-gray-200 hover:shadow-emerald-200"
          >
            Get Demo
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <span
                  key={link.name}
                  className="text-lg font-medium text-gray-800 cursor-default"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </span>
              ))}
              <a
                href="https://cdnglobal.eu/request-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full text-center px-5 py-3 bg-emerald-600 text-white font-medium rounded-lg block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Demo
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
