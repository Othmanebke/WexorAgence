"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useContactModal } from '@/components/ContactModalProvider';

interface ContactButtonProps {
  className?: string;
  onClick?: () => void;
  href?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  className = '',
  onClick,
  href,
  label = 'Démarrer un projet',
}) => {
  const { openModal } = useContactModal();

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else if (!href) {
      e.preventDefault();
      openModal();
    }
  };

  const content = (
    <motion.button
      type="button"
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className={`relative inline-flex items-center justify-center font-bold uppercase tracking-widest text-white rounded-full px-8 py-3.5 sm:px-10 sm:py-4 md:px-12 md:py-4.5 text-xs sm:text-sm md:text-base cursor-pointer select-none overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,59,0,0.5)] ${className}`}
      style={{
        background: 'linear-gradient(135deg, #111111 0%, #FF3B00 60%, #FF5500 100%)',
        boxShadow: '0px 4px 15px rgba(255, 59, 0, 0.3), inset 0px 1px 3px rgba(255, 255, 255, 0.4)',
        outline: '2px solid rgba(255, 255, 255, 0.9)',
        outlineOffset: '-3px',
      }}
    >
      <span className="flex items-center gap-2">
        <span>{label}</span>
        <span className="text-base">↗</span>
      </span>
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
export default ContactButton;
