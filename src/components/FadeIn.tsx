"use client";

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type ElementType = 'div' | 'section' | 'article' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'nav' | 'header' | 'footer' | 'li' | 'ul';

interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.8,
  x = 0,
  y = 40,
  as = 'div',
  className = '',
  style = {},
  ...props
}) => {
  const Component = (motion[as as keyof typeof motion] || motion.div) as React.ComponentType<FadeInProps>;

  return (
    <Component
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.1 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </Component>
  );
};
export default FadeIn;
