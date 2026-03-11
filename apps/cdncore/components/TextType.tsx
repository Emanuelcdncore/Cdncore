'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './css/TextType.css';

interface TextTypeProps {
  sentences: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

const TextType: React.FC<TextTypeProps> = ({
  sentences,
  className = '',
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseTime = 2000
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }
  }, []);

  useEffect(() => {
    let currentSentenceIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentSentence = sentences[currentSentenceIndex];

      if (!isDeleting) {
        currentCharIndex++;
        setDisplayText(currentSentence.substring(0, currentCharIndex));

        if (currentCharIndex === currentSentence.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            type();
          }, pauseTime);
          return;
        }
        timeoutId = setTimeout(type, typingSpeed);
      } else {
        currentCharIndex--;
        setDisplayText(currentSentence.substring(0, currentCharIndex));

        if (currentCharIndex === 0) {
          isDeleting = false;
          currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
          timeoutId = setTimeout(type, typingSpeed);
          return;
        }
        timeoutId = setTimeout(type, deletingSpeed);
      }
    };

    type();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [sentences, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={`text-type-wrapper ${className}`}>
      <span ref={textRef}>{displayText}</span>
      <span ref={cursorRef} className="text-type-cursor" />
    </span>
  );
};

export default TextType;
