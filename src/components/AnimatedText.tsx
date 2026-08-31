"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

type TextTag = 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: TextTag;
  activeColor?: string;
  baseColor?: string;
  justify?: 'center' | 'start' | 'end';
}

interface CharProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
  activeColor: string;
}

const Character: React.FC<CharProps> = ({ char, progress, range, activeColor }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [4, 0]);

  return (
    <span className="relative inline-block">
      <span className="opacity-20 select-none pointer-events-none">{char}</span>
      <motion.span
        style={{ opacity, y, color: activeColor }}
        className="absolute left-0 top-0"
      >
        {char}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  style = {},
  as: Component = 'p',
  activeColor = '#D7E2EA',
  justify = 'center',
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.25'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;

  const wordStartIndices = words.reduce<number[]>((acc, word, idx) => {
    if (idx === 0) return [0];
    return [...acc, acc[idx - 1] + words[idx - 1].length + 1];
  }, []);

  const justifyClass =
    justify === 'start'
      ? 'justify-start'
      : justify === 'end'
      ? 'justify-end'
      : 'justify-center';

  return (
    <Component
      ref={containerRef as React.Ref<HTMLParagraphElement> & React.Ref<HTMLHeadingElement>}
      style={style}
      className={`flex flex-wrap items-center ${justifyClass} ${className}`}
    >

      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        const currentWordStartIdx = wordStartIndices[wordIndex];
        return (
          <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap mr-[0.28em]">
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
                  activeColor={activeColor}
                />
              );
            })}
          </span>
        );
      })}
    </Component>
  );
};

export default AnimatedText;
