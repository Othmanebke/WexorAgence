"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Magnetic from "@/components/Magnetic";

const links = [
  { label: "Tarifs", href: "/tarifs" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Qui je suis", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function PageHeader() {
  const pathname = usePathname();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full flex flex-col lg:flex-row justify-between items-start pt-8 px-8 pb-0"
    >
      {/* Logo */}
      <Magnetic>
        <Link href="/" className="font-heading text-abcs-red text-[5rem] md:text-[8rem] leading-[0.8] tracking-tighter hover:opacity-80 transition-opacity block">
          WEX
        </Link>
      </Magnetic>

      {/* Nav links — same style as home hero */}
      <nav className="flex flex-wrap gap-4 md:gap-6 font-bold text-xl md:text-3xl tracking-tight items-start pt-4 lg:pt-6">
        {links.map((link, i) => {
          const active = pathname === link.href;
          return (
            <Magnetic key={link.href}>
              <Link
                href={link.href}
                className={`relative group overflow-hidden transition-colors block ${active ? "text-abcs-red" : "hover:text-abcs-red"}`}
              >
                {link.label}{i < links.length - 1 ? "," : ""}
                <span className={`absolute bottom-0 left-0 h-[2px] bg-abcs-red transition-all duration-300 ${active ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            </Magnetic>
          );
        })}
      </nav>
    </motion.header>
  );
}
