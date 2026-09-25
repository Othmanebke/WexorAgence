import Image from "next/image";
import SectionHeader from "@/components/fx/SectionHeader";
import Watermark from "@/components/fx/Watermark";
import avatarPointing from "@/img/avatar-pointing.webp";

export function AboutSection() {
  return (
    <section
      id="about"
      data-stack
      className="relative z-[13] -mt-9 md:-mt-16 overflow-hidden rounded-t-[36px] md:rounded-t-[64px] bg-abcs-deep text-white shadow-[0_-30px_70px_rgba(0,0,0,0.6)]"
      style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,72px) clamp(96px,10vw,140px)" }}
    >
      <Watermark text="Othmane · O'ldev · Othmane · O'ldev · Othmane ·" stroke="rgba(255,255,255,0.08)" />
      <Watermark variant="2" text="Freelance · Bac+5 · 5 ans · Freelance · Bac+5 ·" stroke="rgba(255,59,0,0.22)" />

      <div className="relative z-[1] mx-auto flex max-w-[1200px] flex-col">
        <SectionHeader tone="dark" label="04 · Qui je suis" title="Othmane, c'est qui ?">
          <p
            className="mt-2 max-w-[680px] leading-[1.6] text-[#D7E2EA] text-pretty"
            style={{ fontSize: "clamp(17px,1.5vw,20px)" }}
          >
            Développeur web freelance avec 5 ans d&apos;expérience (Inetum, Fujitsu, AJC) et diplômé d&apos;un Bac+5
            Expert Informatique Web. J&apos;allie rigueur technique et sens du design pour faire des sites qui convertissent.
          </p>
          <p className="m-0 max-w-[560px] text-[16px] leading-[1.6] text-white/65 text-pretty">
            Je travaille en freelance avec des clients partout en France. Pas de templates, pas de copier-coller : un
            interlocuteur unique, du brief à la mise en ligne.
            <span className="sr-only"> Basé à Brie-Comte-Robert, en Seine-et-Marne (Île-de-France).</span>
          </p>
        </SectionHeader>
      </div>

      {/* Avatar in the bottom-right corner, pointing at the text (wide screens only) */}
      <Image
        src={avatarPointing}
        alt=""
        aria-hidden
        sizes="200px"
        className="pointer-events-none absolute bottom-16 right-[clamp(20px,5vw,72px)] z-[1] hidden h-[clamp(220px,17vw,300px)] w-auto select-none xl:block"
      />
    </section>
  );
}
