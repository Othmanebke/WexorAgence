"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  number?: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ number = "00", title, subtitle }: PageHeaderProps) {
  return (
    <section className="w-full pt-24 pb-0 px-8 bg-[#f0f0ee] border-b border-black/10">
      {/* Orange numbered banner */}
      <div className="flex items-center justify-between bg-abcs-red text-white px-6 py-3 mb-12">
        <span className="font-bold text-[10px] uppercase tracking-[0.2em]">{subtitle ?? "Wexor Agence"}</span>
        <span className="font-heading text-2xl">{number}</span>
      </div>

      {/* Title */}
      <div className="overflow-hidden pb-16">
        <motion.h1
          className="font-heading text-6xl md:text-9xl lg:text-[12rem] uppercase leading-[0.82] tracking-tighter"
          initial={{ y: "102%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
      </div>
    </section>
  );
}
