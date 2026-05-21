"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import avatarChatgpt from "@/img/ChatGPT Image 20 mai 2026, 14_12_06.png";

const stack = ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "WordPress", "Figma", "Framer", "Supabase", "Vercel", "Adobe CC", "SEO"];
const keywords = ["Full Stack", "France & Remote", "48h max", "Sur-mesure", "No templates", "SEO first", "5 ans XP", "Résultats"];

export default function FooterStrip() {
  return (
    <div className="w-full bg-[#f0f0ee] overflow-hidden border-t border-black/5">

      {/* Marquee stack */}
      <div className="relative w-full overflow-hidden py-3 border-b border-black/5">
        <motion.div
          className="flex gap-8 whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...stack, ...stack].map((s, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-bold text-[10px] uppercase tracking-[0.25em] text-abcs-black/30">{s}</span>
              <span className="text-abcs-red/40 font-bold text-xs">·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Avatar + keywords */}
      <div className="relative flex items-end justify-center" style={{ height: "10rem" }}>

        {/* Keywords gauche */}
        <div className="hidden md:flex flex-col items-end gap-2 absolute left-8 bottom-4">
          {keywords.slice(0, 4).map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="font-bold text-[9px] uppercase tracking-[0.2em] text-abcs-black/25 border border-black/10 px-3 py-1"
            >
              {kw}
            </motion.span>
          ))}
        </div>

        {/* Avatar centré */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <Image
            src={avatarChatgpt}
            alt="Othmane"
            width={150}
            height={195}
            className="object-cover object-top scale-[1.55] translate-y-4"
            unoptimized
          />
        </motion.div>

        {/* Keywords droite */}
        <div className="hidden md:flex flex-col items-start gap-2 absolute right-8 bottom-4">
          {keywords.slice(4).map((kw, i) => (
            <motion.span
              key={kw}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="font-bold text-[9px] uppercase tracking-[0.2em] text-abcs-black/25 border border-black/10 px-3 py-1"
            >
              {kw}
            </motion.span>
          ))}
        </div>

        {/* Label signature */}
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-heading text-[10px] uppercase tracking-[0.4em] text-abcs-black/15 whitespace-nowrap select-none">
          O&apos;ldev · Othmane Bouakline
        </span>
      </div>

      {/* Marquee keywords — bas */}
      <div className="relative w-full overflow-hidden py-3 border-t border-black/5">
        <motion.div
          className="flex gap-8 whitespace-nowrap w-max"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...keywords, ...keywords].map((kw, i) => (
            <span key={i} className="flex items-center gap-8">
              <span className="font-bold text-[9px] uppercase tracking-[0.3em] text-abcs-red/30">{kw}</span>
              <span className="text-abcs-black/20 font-bold text-xs">·</span>
            </span>
          ))}
        </motion.div>
      </div>

    </div>
  );
}
