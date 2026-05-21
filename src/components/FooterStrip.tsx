"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import avatarChatgpt from "@/img/ChatGPT Image 20 mai 2026, 14_12_06.png";

export default function FooterStrip() {
  return (
    <div className="w-full bg-[#f0f0ee] flex items-end justify-center overflow-hidden border-t border-black/5" style={{ height: "10rem" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
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
