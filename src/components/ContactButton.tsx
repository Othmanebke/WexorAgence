"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  onClick,
  href = '#contact',
  label = 'Contact Me',
}) => {
  const content = (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative inline-flex items-center justify-center font-medium uppercase tracking-widest text-white rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer select-none overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(182,0,168,0.6)] ${className}`}
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      {label}
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block no-underline">
        {content}
      </a>
    );
  }

  return content;
};
