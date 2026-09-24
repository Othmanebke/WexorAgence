import SectionHeader from "@/components/fx/SectionHeader";
import Watermark from "@/components/fx/Watermark";

const STATS = [
  { v: "10+",   l: "Projets livrés" },
  { v: "20+",   l: "Technologies" },
  { v: "Bac+5", l: "Diplômé · 2026" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      data-stack
      className="relative z-[13] -mt-16 overflow-hidden rounded-t-[64px] bg-abcs-deep text-white shadow-[0_-30px_70px_rgba(0,0,0,0.6)]"
      style={{ padding: "clamp(64px,9vw,120px) clamp(20px,5vw,72px) clamp(96px,10vw,140px)" }}
    >
      <Watermark text="Othmane · O'ldev · Othmane · O'ldev · Othmane ·" stroke="rgba(255,255,255,0.08)" />
      <Watermark variant="2" text="Freelance · Bac+5 · 5 ans · Freelance · Bac+5 ·" stroke="rgba(255,59,0,0.22)" />

      <div className="relative z-[1] mx-auto flex max-w-[1200px] flex-col" style={{ gap: "clamp(40px,5vw,64px)" }}>
        <SectionHeader tone="dark" label="04 · Qui je suis" title="Othmane, c'est qui ?">
          <p
            className="mt-2 max-w-[680px] leading-[1.6] text-[#D7E2EA] text-pretty"
            style={{ fontSize: "clamp(17px,1.5vw,20px)" }}
          >
            Développeur web freelance avec 5 ans d&apos;expérience (Inetum, Fujitsu, AJC) et diplômé d&apos;un Bac+5
            Expert Informatique Web. J&apos;allie rigueur technique et sens du design pour faire des sites qui convertissent.
          </p>
          <p className="m-0 max-w-[560px] text-[16px] leading-[1.6] text-white/65 text-pretty">
            Pas de templates, pas de copier-coller : un interlocuteur unique, du brief à la mise en ligne.
          </p>
        </SectionHeader>

        <div
          className="grid border-t border-white/12"
          style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,180px),1fr))" }}
        >
          {STATS.map((s) => (
            <div key={s.l} className="flex flex-col gap-1.5 px-1 py-6">
              <span className="font-heading leading-none" style={{ fontSize: "clamp(2.4rem,4vw,3.4rem)" }}>
                {s.v}
              </span>
              <span className="text-[13px] font-bold uppercase tracking-[0.14em] text-white/65">{s.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
