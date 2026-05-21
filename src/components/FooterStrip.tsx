"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import avatarChatgpt from "@/img/ChatGPT Image 20 mai 2026, 14_12_06.png";

const techs = ["JEUNE", "MAROCAIN", "BEAUGOSS", "AMBITIEUX", "CRÉATIF", "DISTINGUÉ", "FREELANCE", "DISPONIBLE", "SÉRIEUX", "DIFFÉRENT", "MOTIVÉ", "OMERTA 47"];

export default function FooterStrip() {
  return (
    <div className="w-full bg-[#f0f0ee] flex items-end justify-center overflow-hidden border-t border-black/5 relative" style={{ height: "10rem" }}>

      {/* Barre animée — centrée verticalement, derrière l'avatar */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-b border-black/10 py-3 overflow-hidden z-0">
        <motion.div
          className="flex whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(2)].map((_, r) => (
            <span key={r} className="flex items-center">
              {techs.map((tech, i) => (
                <span key={i} className="flex items-center">
                  <span className="font-heading text-abcs-black/20 text-sm uppercase tracking-[0.3em] px-6">{tech}</span>
                  <span className="text-abcs-red/60 font-bold text-sm">·</span>
                </span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Avatar — au premier plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
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

    </div>
  );
}
