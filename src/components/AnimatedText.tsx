"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span className="opacity-20 select-none pointer-events-none">{char}</span>
      <motion.span
        style={{ opacity }}
        className="absolute left-0 top-0 text-[#D7E2EA]"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '' }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;

  const wordStartIndices = words.reduce<number[]>((acc, word, idx) => {
    if (idx === 0) return [0];
    return [...acc, acc[idx - 1] + words[idx - 1].length + 1];
  }, []);

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap justify-center items-center ${className}`}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const currentWordStartIdx = wordStartIndices[wordIndex];
        return (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.3em]">
            {wordChars.map((char, charIndex) => {
              const globalIndex = currentWordStartIdx + charIndex;
              const start = globalIndex / totalCharacters;
              const end = (globalIndex + 1) / totalCharacters;
              return (
                <Character
                  key={`char-${wordIndex}-${charIndex}`}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

