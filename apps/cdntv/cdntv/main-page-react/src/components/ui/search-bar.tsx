'use client'

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}

export const SearchBar = ({ isOpen, onClose, className }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchHistory, setSearchHistory] = useState<string[]>([]);
    const [filteredHistory, setFilteredHistory] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Carregar histórico do localStorage
    useEffect(() => {
        const saved = localStorage.getItem('cdntv-search-history');
        if (saved) {
            setSearchHistory(JSON.parse(saved));
        }
    }, []);

    // Filtrar histórico baseado no termo de pesquisa
    useEffect(() => {
        if (searchTerm.trim()) {
            const filtered = searchHistory.filter(item =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredHistory(filtered);
        } else {
            setFilteredHistory(searchHistory.slice(0, 5)); // Mostrar últimas 5 pesquisas
        }
    }, [searchTerm, searchHistory]);

    // Focar no input quando abrir
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (term: string) => {
        if (term.trim()) {
            // Adicionar ao histórico
            const newHistory = [term, ...searchHistory.filter(item => item !== term)].slice(0, 10);
            setSearchHistory(newHistory);
            localStorage.setItem('cdntv-search-history', JSON.stringify(newHistory));
            
            // Aqui você pode implementar a lógica de pesquisa
            console.log('Searching for:', term);
            onClose();
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch(searchTerm);
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    const clearHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('cdntv-search-history');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
                        onClick={onClose}
                    />
                    
                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-xl mx-auto z-[9999]",
                            className
                        )}
                    >
                        {/* Search Input */}
                        <div className="relative">
                            <div className="flex items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-xl">
                                {/* Search Icon */}
                                <svg 
                                    className="w-5 h-5 text-white/60 mr-4"
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="11" cy="11" r="8"/>
                                    <path d="m21 21-4.35-4.35"/>
                                </svg>
                                
                                {/* Input */}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    placeholder="Pesquisar..."
                                    className="flex-1 bg-transparent text-white placeholder-white/60 outline-none text-lg"
                                />
                                
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="ml-4 p-2 text-white/60 hover:text-white transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Search History */}
                        {(filteredHistory.length > 0 || searchHistory.length > 0) && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mt-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-white/80 text-sm font-medium">
                                            {searchTerm.trim() ? 'Resultados relacionados' : 'Pesquisas recentes'}
                                        </h3>
                                        {searchHistory.length > 0 && (
                                            <button
                                                onClick={clearHistory}
                                                className="text-orange-400 hover:text-orange-300 text-sm transition-colors"
                                            >
                                                Limpar
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="space-y-1">
                                        {filteredHistory.length > 0 ? (
                                            filteredHistory.map((item, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => handleSearch(item)}
                                                    className="w-full text-left px-3 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors flex items-center"
                                                >
                                                    <svg className="w-4 h-4 mr-3 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {item}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="text-white/60 text-sm py-8 text-center">
                                                Nenhuma pesquisa encontrada
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};