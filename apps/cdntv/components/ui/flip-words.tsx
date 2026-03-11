"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const FlipWords = ({
    words,
    duration = 3000,
    className,
}: {
    words: string[];
    duration?: number;
    className?: string;
}) => {
    const sanitizedWords = useMemo(
        () => words.filter((word) => word && word.trim().length > 0),
        [words]
    );
    const [currentWord, setCurrentWord] = useState(sanitizedWords[0] ?? "");
    const [isAnimating, setIsAnimating] = useState<boolean>(false);

    const startAnimation = useCallback(() => {
        const currentIndex = sanitizedWords.indexOf(currentWord);
        const nextIndex = currentIndex === -1 || currentIndex === sanitizedWords.length - 1 ? 0 : currentIndex + 1;
        const word = sanitizedWords[nextIndex] ?? "";
        setCurrentWord(word);
        setIsAnimating(true);
    }, [currentWord, sanitizedWords]);

    useEffect(() => {
        if (!isAnimating && sanitizedWords.length > 0)
            setTimeout(() => {
                startAnimation();
            }, duration);
    }, [isAnimating, duration, startAnimation, sanitizedWords.length]);

    return (
        <AnimatePresence
            onExitComplete={() => {
                setIsAnimating(false);
            }}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 10,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                }}
                exit={{
                    opacity: 0,
                    y: -40,
                    x: 40,
                    filter: "blur(8px)",
                    scale: 2,
                    position: "absolute",
                }}
                className={cn(
                    "z-10 inline-flex items-center justify-center relative text-center px-2 rounded-xl max-w-full overflow-hidden",
                    className
                )}
                key={`${currentWord}-${sanitizedWords.indexOf(currentWord)}`}
            >
                {currentWord
                    .split(" ")
                    .filter((segment) => segment.trim().length > 0)
                    .map((word, wordIndex) => (
                    <motion.span
                        key={`${word}-${wordIndex}`}
                        initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{
                            delay: wordIndex * 0.3,
                            duration: 0.3,
                        }}
                        className={cn("inline-block whitespace-nowrap", className)}
                    >
                        {Array.from(word).map((letter, letterIndex) => (
                            <motion.span
                                key={`${word}-${wordIndex}-${letterIndex}`}
                                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{
                                    delay: wordIndex * 0.3 + letterIndex * 0.05,
                                    duration: 0.2,
                                }}
                                className={cn("inline-block", className)}
                            >
                                {letter}
                            </motion.span>
                        ))}
                        <span className="inline-block">&nbsp;</span>
                    </motion.span>
                ))}
            </motion.div>
        </AnimatePresence>
    );
};
