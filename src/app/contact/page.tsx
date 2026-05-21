"use client";

import { useRef, useState, Suspense } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLang } from "@/components/LanguageContext";
import { SERVICES, SERVICE_GROUPS, getBudgets } from "@/lib/services";

function LineReveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div initial={{ y: "102%" }} animate={inView ? { y: 0 } : {}} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}>
        {children}
      </motion.div>
    </div>
  );
}

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}>
      {children}
    </motion.div>
  );
}

const inputClass = "w-full bg-transparent border-b-2 border-black/20 focus:border-abcs-red py-4 font-bold text-lg placeholder:opacity-30 placeholder:font-bold outline-none transition-colors duration-200";

function ContactForm() {
  const containerRef = useRef<HTMLElement>(null);
  const { t } = useLang();
  const searchParams = useSearchParams();
  const [form, setForm] = useState(() => {
    const type = searchParams.get("type") || "";
    const matchedService = Object.values(SERVICES).find(s =>
      s.label.toLowerCase().includes(type.toLowerCase())
    );
    return {
      name:    searchParams.get("name")    || "",
      email:   searchParams.get("email")   || "",
      phone:   searchParams.get("phone")   || "",
      type:    matchedService?.label || type,
      budget:  searchParams.get("budget")  || "",
      message: searchParams.get("message") || "",
    };
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const budgetOptions = form.type ? getBudgets(form.type) : [];

  useGSAP(() => {
    gsap.from(".form-line", {
      y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: "power2.out", delay: 0.2,
    });
    gsap.from(".info-item", {
      x: -40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out",
      scrollTrigger: { trigger: ".info-section", start: "top 80%" },
    });
  }, { scope: containerRef, dependencies: [sent] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur inconnue");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite, réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main ref={containerRef} className="flex-1 flex flex-col bg-[#f0f0ee]">
      <PageHeader number="05" title="CONTACT" subtitle={t("page_contact_sub")} />

      {/* ─── INTRO ─── */}
      <section className="w-full px-6 md:px-8 pt-16 md:pt-20 pb-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-end">
          <LineReveal className="md:w-2/3">
            <h2 className="font-heading text-4xl sm:text-5xl md:text-7xl uppercase leading-[0.9]">
              Parlons de<br />ton projet.
            </h2>
          </LineReveal>
          <FadeUp delay={0.25} className="md:w-1/3">
            <p className="font-bold text-base opacity-55 leading-relaxed">
              Devis gratuit & sans engagement — réponse garantie sous 48h.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="w-full px-6 md:px-8 py-12 md:py-16">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 md:gap-24">

          {/* ─── FORM ─── */}
          <div className="lg:w-3/5">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                className="flex flex-col items-start justify-center min-h-[500px] gap-6"
              >
                <div className="font-heading text-abcs-red text-8xl md:text-[10rem] uppercase leading-none">Reçu !</div>
                <h2 className="font-heading text-4xl md:text-5xl uppercase">Merci pour ton message</h2>
                <p className="font-bold opacity-60 text-lg max-w-md leading-relaxed">Je te réponds sous 48h maximum pour discuter de ton projet en détail.</p>
                <Link href="/" className="inline-flex items-center gap-3 border border-black px-8 py-4 font-bold text-sm uppercase tracking-widest hover:bg-abcs-black hover:text-white transition-colors mt-4 group">
                  <span>Retour à l&apos;accueil</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="form-line flex flex-col gap-1">
                    <label className="font-bold text-[10px] uppercase tracking-widest opacity-40">Nom *</label>
                    <input required name="name" value={form.name} onChange={handleChange} placeholder="Jean Dupont" className={inputClass} />
                  </div>
                  <div className="form-line flex flex-col gap-1">
                    <label className="font-bold text-[10px] uppercase tracking-widest opacity-40">Email *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="jean@exemple.com" className={inputClass} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="form-line flex flex-col gap-1">
                    <label className="font-bold text-[10px] uppercase tracking-widest opacity-40">Téléphone</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="06 XX XX XX XX" className={inputClass} />
                  </div>
                  <div className="form-line flex flex-col gap-1">
                    <label className="font-bold text-[10px] uppercase tracking-widest opacity-40">Type de projet *</label>
                    <select
                      required
                      name="type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value, budget: "" })}
                      className={`${inputClass} bg-transparent appearance-none`}
                    >
                      <option value="">Choisir...</option>
                      {SERVICE_GROUPS.map((g) => (
                        <optgroup key={g.label} label={g.label}>
                          {g.keys.map((k) => (
                            <option key={k} value={SERVICES[k].label}>
                              {SERVICES[k].label} — {SERVICES[k].price}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {form.type && (
                    <motion.div
                      key={form.type}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="form-line flex flex-col gap-3"
                    >
                      <label className="font-bold text-[10px] uppercase tracking-widest opacity-40">Budget *</label>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {budgetOptions.map((b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => setForm({ ...form, budget: b })}
                            className={`px-5 py-3 font-bold text-sm border-2 transition-all duration-150 ${
                              form.budget === b
                                ? "bg-abcs-black text-white border-abcs-black"
                                : "bg-transparent border-black/20 hover:border-abcs-black"
                            }`}
                          >
                            {b}
                          </button>
                        ))}
                      </div>
                      <input type="hidden" name="budget" value={form.budget} required />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="form-line flex flex-col gap-1">
                  <label className="font-bold text-[10px] uppercase tracking-widest opacity-40">Message *</label>
                  <textarea required name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Décris ton projet en quelques lignes..." className={`${inputClass} resize-none`} />
                </div>

                {error && (
                  <div className="text-abcs-red font-bold text-sm border border-abcs-red/30 bg-abcs-red/5 px-4 py-3">
                    {error}
                  </div>
                )}

                <div className="form-line">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-abcs-black text-white py-6 font-bold text-sm uppercase tracking-widest hover:bg-abcs-red transition-colors duration-300 flex items-center justify-center gap-4 group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span>Envoi en cours</span>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      </>
                    ) : (
                      <>
                        <span>Envoyer mon projet</span>
                        <span className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ─── INFO ─── */}
          <div className="info-section lg:w-2/5 flex flex-col gap-16">

            <div className="info-item flex flex-col gap-2">
              <span className="font-bold text-[10px] uppercase tracking-widest opacity-30">Email principal</span>
              <a href="mailto:othmane.bouakline.pro@gmail.com" className="font-bold text-xl hover:text-abcs-red transition-colors break-all">
                othmane.bouakline.pro@gmail.com
              </a>
            </div>

            <div className="info-item flex flex-col gap-2">
              <span className="font-bold text-[10px] uppercase tracking-widest opacity-30">Téléphone</span>
              <a href="tel:+33660805337" className="font-bold text-xl hover:text-abcs-red transition-colors">
                06 60 80 53 37
              </a>
            </div>

            <div className="info-item flex flex-col gap-2">
              <span className="font-bold text-[10px] uppercase tracking-widest opacity-30">Disponibilité</span>
              <span className="font-bold text-xl">France & remote</span>
            </div>

            <div className="info-item border-t border-black/15 pt-10">
              <span className="font-bold text-[10px] uppercase tracking-widest opacity-30 block mb-6">Réseaux sociaux</span>
              <div className="flex flex-col gap-4">
                {[
                  { label: "Instagram", handle: "@o.ldev", href: "https://www.instagram.com/o.ldev/" },
                  { label: "LinkedIn", handle: "Othmane Bouakline", href: "https://www.linkedin.com/in/othmane-bouakline/" },
                  { label: "TikTok", handle: "@o.ldev", href: "https://www.tiktok.com/@o.ldev" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                    className="flex items-center justify-between py-4 border-b border-black/10 group hover:text-abcs-red transition-colors">
                    <span className="font-heading text-2xl uppercase">{s.label}</span>
                    <span className="font-bold text-sm opacity-40 group-hover:opacity-100 transition-opacity">{s.handle} ↗</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="info-item bg-abcs-red text-white p-8">
              <div className="font-heading text-6xl mb-3">48h</div>
              <div className="font-bold uppercase tracking-widest text-sm opacity-80">Délai de réponse maximum garanti</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f0f0ee] flex items-center justify-center">
        <div className="font-heading text-4xl animate-pulse">Chargement...</div>
      </div>
    }>
      <ContactForm />
    </Suspense>
  );
}
