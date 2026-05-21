"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import avatarChatgpt from "@/img/ChatGPT Image 20 mai 2026, 14_12_06.png";

const stack = [
  { abbr: "Re",  name: "React",       color: "#61DAFB", bg: "#0d1117" },
  { abbr: "Nx",  name: "Next.js",     color: "#fff",    bg: "#000000" },
  { abbr: "Ts",  name: "TypeScript",  color: "#fff",    bg: "#3178C6" },
  { abbr: "Tw",  name: "Tailwind",    color: "#fff",    bg: "#38BDF8" },
  { abbr: "No",  name: "Node.js",     color: "#fff",    bg: "#339933" },
  { abbr: "Wp",  name: "WordPress",   color: "#fff",    bg: "#21759B" },
  { abbr: "Fi",  name: "Figma",       color: "#fff",    bg: "#F24E1E" },
  { abbr: "Fr",  name: "Framer",      color: "#fff",    bg: "#0055FF" },
  { abbr: "Ve",  name: "Vercel",      color: "#fff",    bg: "#111111" },
  { abbr: "Sb",  name: "Supabase",    color: "#fff",    bg: "#3FCF8E" },
  { abbr: "Ad",  name: "Adobe CC",    color: "#fff",    bg: "#FF0000" },
  { abbr: "Se",  name: "SEO",         color: "#fff",    bg: "#FF3B00" },
];

export default function FooterStrip() {
  return (
    <div className="w-full bg-[#f0f0ee] border-t border-black/5 px-6 md:px-8 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">

        {/* Logo grid */}
        <div className="flex-1 grid grid-cols-4 sm:grid-cols-6 gap-3">
          {stack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.08, y: -3 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-1.5 group"
            >
              {/* Logo badge */}
              <div
                className="w-11 h-11 flex items-center justify-center font-heading text-sm font-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)] transition-shadow group-hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]"
                style={{ background: tech.bg, color: tech.color }}
              >
                {tech.abbr}
              </div>
              <span className="font-bold text-[8px] uppercase tracking-wider text-abcs-black/40 group-hover:text-abcs-black/70 transition-colors text-center leading-tight">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="shrink-0 flex flex-col items-center gap-2"
        >
          <div className="overflow-hidden" style={{ width: 120, height: 150 }}>
            <Image
              src={avatarChatgpt}
              alt="Othmane"
              width={120}
              height={155}
              className="object-cover object-top scale-[1.5] translate-y-3"
              unoptimized
            />
          </div>
          <span className="font-bold text-[8px] uppercase tracking-[0.25em] text-abcs-black/25">
            O&apos;ldev · Othmane
          </span>
        </motion.div>

      </div>
    </div>
  );
}
