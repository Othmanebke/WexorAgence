"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Magnetic from "@/components/Magnetic";
import { useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

const projectTypes = [
  "Site Vitrine (Présence)", 
  "Pack WordPress (Autonomie)", 
  "Application Web / SaaS", 
  "Refonte de site existant", 
  "Branding / Identité Visuelle", 
  "Pack Flyers & Print", 
  "Community Management",
  "Autre projet sur-mesure"
];

function ContactForm() {
  const containerRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const phone = searchParams.get("phone");
    const type = searchParams.get("type");
    const budget = searchParams.get("budget");
    const message = searchParams.get("message");

    if (name || email || phone || type || budget || message) {
      setForm((prev) => ({
        ...prev,
        name: name || prev.name,
        email: email || prev.email,
        phone: phone || prev.phone,
        // Map short values to full labels if needed
        type: projectTypes.find(t => t.toLowerCase().includes(type?.toLowerCase() || "")) || type || prev.type,
        budget: budget === "low" ? "<1000" : budget === "mid" ? "1000-3000" : budget === "high" ? ">5000" : budget || prev.budget,
        message: message || prev.message
      }));
    }
  }, [searchParams]);

  useGSAP(() => {

    const boxes = gsap.utils.toArray('.contact-box');
    gsap.from(boxes, {
      y: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });

    if (!sent) {
      const formFields = gsap.utils.toArray('.form-field');
      gsap.from(formFields, {
        x: -50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4
      });
    }
  }, { scope: containerRef, dependencies: [sent] });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main ref={containerRef} className="flex-1 flex flex-col items-center px-0 pb-32 bg-white">
      <PageHeader />
      <div className="w-full flex flex-col items-center px-8 pt-16">
      
      {/* ─── HEADER ─── */}
      <div className="w-full max-w-7xl mb-24">
        <div className="inline-block bg-abcs-red text-white font-bold text-xs uppercase tracking-widest px-4 py-2 mb-6">On t&apos;écoute</div>
        <motion.h1
          className="font-heading text-5xl md:text-[9rem] text-abcs-black uppercase leading-[0.8] mb-6"
          initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
        >
          PARLONS<br/>DE TON <span className="text-abcs-red">PROJET</span>
        </motion.h1>
        <p className="font-bold text-xl opacity-70">Devis gratuit & sans engagement — réponse sous 48h.</p>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-16">

        {/* Left — Infos */}
        <div className="lg:w-1/3 flex flex-col gap-8">
          <div className="contact-box border-8 border-abcs-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]">
            <h2 className="font-heading text-4xl uppercase mb-8">INFOS</h2>
            <div className="flex flex-col gap-6">
              <div>
                <div className="font-bold text-xs uppercase tracking-widest opacity-50 mb-1">Email</div>
                <a href="mailto:othmane.bouakline.pro@gmail.com" className="font-bold text-lg hover:text-abcs-red transition-colors break-all">othmane.bouakline.pro@gmail.com</a>
              </div>
              <div>
                <div className="font-bold text-xs uppercase tracking-widest opacity-50 mb-1">Téléphone</div>
                <a href="tel:+33660805337" className="font-bold text-lg hover:text-abcs-red transition-colors">06 60 80 53 37</a>
              </div>
              <div>
                <div className="font-bold text-xs uppercase tracking-widest opacity-50 mb-1">Disponibilité</div>
                <span className="font-bold text-lg">France & remote</span>
              </div>
            </div>
          </div>

          <div className="contact-box border-8 border-abcs-black p-8 bg-abcs-black text-white shadow-[12px_12px_0px_0px_rgba(255,59,0,1)]">
            <h2 className="font-heading text-4xl uppercase mb-8">RÉSEAUX</h2>
            <div className="flex flex-col gap-4">
              <Magnetic>
                <a href="https://tiktok.com/@wexo_agence" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 font-bold hover:text-abcs-red transition-colors group w-fit">
                  <span className="font-heading text-2xl">TikTok</span>
                  <span className="opacity-50 group-hover:opacity-100">@wexo_agence ↗</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://instagram.com/wexor_agence" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 font-bold hover:text-abcs-red transition-colors group w-fit">
                  <span className="font-heading text-2xl">Instagram</span>
                  <span className="opacity-50 group-hover:opacity-100">@wexor_agence ↗</span>
                </a>
              </Magnetic>
            </div>
          </div>

          <div className="contact-box border-8 border-abcs-red p-8 bg-abcs-red text-white shadow-[12px_12px_0px_0px_rgba(17,17,17,1)]">
            <div className="font-heading text-6xl mb-4">48h</div>
            <div className="font-bold uppercase tracking-widest text-sm">Délai de réponse maximum garanti</div>
          </div>
        </div>

        {/* Right — Form */}
        <div className="lg:w-2/3 contact-box">
          {sent ? (
            <div className="border-8 border-abcs-black p-16 flex flex-col items-center justify-center text-center shadow-[16px_16px_0px_0px_rgba(255,59,0,1)] min-h-[500px]">
              <div className="font-script text-abcs-red text-8xl mb-6 -rotate-3">Reçu !</div>
              <h2 className="font-heading text-5xl uppercase mb-4">MERCI POUR TON MESSAGE</h2>
              <p className="font-bold opacity-70 text-xl">Je te réponds sous 48h maximum pour discuter de ton projet.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-8 border-abcs-black p-8 bg-white shadow-[16px_16px_0px_0px_rgba(17,17,17,1)]">
              <h2 className="form-field font-heading text-4xl uppercase mb-8">DÉCRIS TON PROJET</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-field flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest opacity-60">Nom *</label>
                  <input required name="name" value={form.name} onChange={handleChange} placeholder="Jean Dupont" className="border-4 border-abcs-black p-4 font-bold focus:outline-none focus:border-abcs-red transition-colors" />
                </div>
                <div className="form-field flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest opacity-60">Email *</label>
                  <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="jean@exemple.com" className="border-4 border-abcs-black p-4 font-bold focus:outline-none focus:border-abcs-red transition-colors" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-field flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest opacity-60">Téléphone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="06 XX XX XX XX" className="border-4 border-abcs-black p-4 font-bold focus:outline-none focus:border-abcs-red transition-colors" />
                </div>
                <div className="form-field flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest opacity-60">Type de projet *</label>
                  <select required name="type" value={form.type} onChange={handleChange} className="border-4 border-abcs-black p-4 font-bold focus:outline-none focus:border-abcs-red transition-colors bg-white appearance-none">
                    <option value="">Choisir...</option>
                    {projectTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="form-field flex flex-col gap-2">
                  <label className="font-bold text-xs uppercase tracking-widest opacity-60">Budget estimé *</label>
                  <select required name="budget" value={form.budget} onChange={handleChange} className="border-4 border-abcs-black p-4 font-bold focus:outline-none focus:border-abcs-red transition-colors bg-white appearance-none">
                    <option value="">Choisir un budget...</option>
                    <option value="<1000">Moins de 1000€</option>
                    <option value="1000-3000">1000€ - 3000€</option>
                    <option value="3000-5000">3000€ - 5000€</option>
                    <option value=">5000">Plus de 5000€</option>
                  </select>
                </div>
              </div>
              <div className="form-field flex flex-col gap-2 mb-8">
                <label className="font-bold text-xs uppercase tracking-widest opacity-60">Message *</label>
                <textarea required name="message" value={form.message} onChange={handleChange} rows={6} placeholder="Décris ton projet en quelques lignes..." className="border-4 border-abcs-black p-4 font-bold focus:outline-none focus:border-abcs-red transition-colors resize-none" />
              </div>
              <Magnetic>
                <button type="submit" className="form-field w-full bg-abcs-black text-white py-6 font-bold text-xl uppercase tracking-widest hover:bg-abcs-red transition-colors flex items-center justify-center gap-4">
                  ENVOYER MON PROJET <span className="text-2xl leading-none">→</span>
                </button>
              </Magnetic>
            </form>
          )}
        </div>
      </div>
      </div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center font-heading text-4xl animate-pulse">Chargement...</div>}>
      <ContactForm />
    </Suspense>
  );
}
