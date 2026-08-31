"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  const handleRefuse = () => {
    localStorage.setItem("cookie-consent", "refused");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 80, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 sm:bottom-8 right-4 sm:right-8 z-[99999] max-w-md w-[calc(100vw-2rem)] sm:w-auto bg-[#141414]/95 border border-white/15 backdrop-blur-md text-white p-5 sm:p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-4 select-none"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">🍪</span>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-xs uppercase tracking-widest text-white/90">
                Respect de votre vie privée & RGPD
              </h3>
              <p className="font-medium text-xs text-white/60 leading-relaxed">
                Ce site utilise uniquement des cookies essentiels à son bon fonctionnement et à l’analyse de performance. Aucun tracking intrusif.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
            <Link
              href="/legal"
              className="text-[11px] font-bold text-white/40 hover:text-white underline transition-colors"
            >
              En savoir plus
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefuse}
                className="px-3 py-1.5 rounded-lg border border-white/20 text-white/70 hover:text-white hover:border-white/40 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Refuser
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-1.5 rounded-lg bg-[#FF3B00] text-white hover:bg-[#ff5522] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(255,59,0,0.4)]"
              >
                Accepter
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
