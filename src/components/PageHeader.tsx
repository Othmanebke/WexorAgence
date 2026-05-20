"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageHeaderProps {
  number?: string;
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}

export default function PageHeader({ number = "00", title = "", subtitle, children }: PageHeaderProps) {
  return (
    <section className="w-full pt-20 md:pt-24 pb-0 px-6 md:px-8 bg-[#f0f0ee]">

      {/* ─── Orange numbered banner ─── */}
      <div className="flex items-center justify-between bg-abcs-red text-white px-4 md:px-6 py-3 mb-8 md:mb-12">
        <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{subtitle ?? "O'ldev"}</span>
        <span className="font-heading text-2xl">{number}</span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="overflow-hidden pb-12 md:pb-16">
          <motion.h1
            className="font-heading text-6xl md:text-9xl lg:text-[12rem] uppercase leading-[0.82] tracking-tighter"
            initial={{ y: "102%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            {title}
          </motion.h1>
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="hidden md:block shrink-0 pb-12 md:pb-16"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
