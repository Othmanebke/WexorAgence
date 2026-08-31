"use client";

import { LineReveal, FadeUp } from "@/components/ui/Reveal";
import { useContactModal } from "@/components/ContactModalProvider";
import { useLang } from "@/components/LanguageContext";

export default function CTASection() {
  const { openModal } = useContactModal();
  const { t } = useLang();

  return (
    <section className="relative z-20 -mt-10 sm:-mt-14 md:-mt-20 w-full bg-abcs-black text-white py-24 md:py-32 px-6 md:px-8 flex flex-col items-center text-center rounded-t-[36px] sm:rounded-t-[50px] md:rounded-t-[64px] shadow-[0_-30px_70px_rgba(0,0,0,0.9)] border-t border-white/10">

      <LineReveal className="mb-4 md:mb-6">
        <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] uppercase leading-[0.85] tracking-tighter">
          {t("cta_line1")}
        </h2>
      </LineReveal>
      <LineReveal delay={0.1} className="mb-8 md:mb-6">
        <h2 className="font-heading text-4xl sm:text-5xl md:text-8xl lg:text-[10rem] uppercase leading-[0.85] tracking-tighter text-abcs-red">
          {t("cta_line2")}
        </h2>
      </LineReveal>
      <FadeUp delay={0.4} className="mt-12">
        <button
          onClick={openModal}
          className="inline-flex items-center gap-4 bg-white text-abcs-black px-10 py-5 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors duration-300 group"
        >
          <span>{t("cta_btn")}</span>
          <span className="text-xl leading-none group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200">↗</span>
        </button>
      </FadeUp>
    </section>
  );
}
