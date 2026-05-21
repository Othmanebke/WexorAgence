"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLang } from "@/components/LanguageContext";
import { SERVICES } from "@/lib/services";

type Step = {
  id: string;
  question: string;
  type?: 'options' | 'input';
  inputType?: string;
  options?: { label: string; value: string; nextStep?: string }[];
  nextStep?: string;
};

const CHAT_LOGIC: Record<string, Step> = {
  start: {
    id: "start",
    question: "Salut ! Je suis Othmane 👋 Prêt à transformer ton idée en réalité digitale ? On part sur quoi ?",
    type: 'options',
    options: [
      { label: "Créer un Site Web", value: "web", nextStep: "web_type" },
      { label: "Refonte Web",       value: "refonte", nextStep: "budget_refonte" },
      { label: "Branding & Print",  value: "branding", nextStep: "branding_type" },
      { label: "Social Media",      value: "social", nextStep: "social_type" },
    ],
  },
  web_type: {
    id: "web_type",
    question: "Top ! Quel type de site on construit ?",
    type: 'options',
    options: [
      { label: "Landing Page — 300€",             value: "landing",   nextStep: "budget_web_landing" },
      { label: "Site Vitrine — à partir de 750€",  value: "vitrine",   nextStep: "budget_web_vitrine" },
      { label: "Pack WordPress — à partir de 1 200€", value: "wordpress", nextStep: "budget_web_wordpress" },
      { label: "App Web / SaaS — à partir de 2 500€", value: "webapp",  nextStep: "budget_web_app" },
    ],
  },
  budget_web_landing: {
    id: "budget_web_landing",
    question: "Landing Page à 300€ — tu es dans quelle fourchette ?",
    type: 'options',
    options: SERVICES.landing.budgets.map(b => ({ label: b, value: b, nextStep: "ask_name" })),
  },
  budget_web_vitrine: {
    id: "budget_web_vitrine",
    question: "Site Vitrine à partir de 750€ — ton budget ?",
    type: 'options',
    options: SERVICES.vitrine.budgets.map(b => ({ label: b, value: b, nextStep: "ask_name" })),
  },
  budget_web_wordpress: {
    id: "budget_web_wordpress",
    question: "Pack WordPress à partir de 1 200€ — ton budget ?",
    type: 'options',
    options: SERVICES.wordpress.budgets.map(b => ({ label: b, value: b, nextStep: "ask_name" })),
  },
  budget_web_app: {
    id: "budget_web_app",
    question: "Application Web / SaaS à partir de 2 500€ — ton budget ?",
    type: 'options',
    options: SERVICES.webapp.budgets.map(b => ({ label: b, value: b, nextStep: "ask_name" })),
  },
  budget_refonte: {
    id: "budget_refonte",
    question: "Refonte Web — sur devis. Tu es dans quelle fourchette ?",
    type: 'options',
    options: SERVICES.refonte.budgets.map(b => ({ label: b, value: b, nextStep: "ask_name" })),
  },
  branding_type: {
    id: "branding_type",
    question: "L'identité visuelle, c'est la base. Quel niveau de production ?",
    type: 'options',
    options: [
      { label: "Pack Canva Pro — 150–350€",  value: "branding_canva", nextStep: "ask_name" },
      { label: "Pack Adobe CC — 600–1 200€", value: "branding_adobe", nextStep: "ask_name" },
    ],
  },
  social_type: {
    id: "social_type",
    question: "On rend ta présence sociale irrésistible. Quel plan ?",
    type: 'options',
    options: [
      { label: "Starter — 150€/mois",    value: "social_starter", nextStep: "ask_name" },
      { label: "Growth — 450€/mois",     value: "social_growth",  nextStep: "ask_name" },
      { label: "Pro — 1 500€/mois",      value: "social_pro",     nextStep: "ask_name" },
    ],
  },
  ask_name: {
    id: "ask_name",
    question: "Parfait ! C'est quoi ton nom (ou celui de ta marque) ?",
    type: 'input',
    inputType: 'text',
    nextStep: 'ask_email',
  },
  ask_email: {
    id: "ask_email",
    question: "Enchanté [NAME] ! Ton mail pour que je t'envoie une proposition ?",
    type: 'input',
    inputType: 'email',
    nextStep: 'ask_phone',
  },
  ask_phone: {
    id: "ask_phone",
    question: "Presque ! Un numéro pour qu'on puisse se parler si besoin ?",
    type: 'input',
    inputType: 'tel',
    nextStep: 'finish',
  },
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [currentStepId, setCurrentStepId] = useState("start");
  const [history, setHistory] = useState<{ type: 'bot' | 'user'; text: string }[]>([
    { type: 'bot', text: CHAT_LOGIC.start.question }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { t } = useLang();

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [history, isOpen, isTyping]);

  const handleOptionClick = (option: { label: string; value: string; nextStep?: string }) => {
    const newAnswers = { ...answers, [currentStepId]: option.value };
    setAnswers(newAnswers);
    setHistory((prev) => [...prev, { type: 'user', text: option.label }]);
    if (option.nextStep) goToNextStep(option.nextStep);
  };

  const goToNextStep = (nextStepId: string, customName?: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setCurrentStepId(nextStepId);
      let q = CHAT_LOGIC[nextStepId].question;
      if (customName) q = q.replace("[NAME]", customName);
      setHistory((prev) => [...prev, { type: 'bot', text: q }]);
    }, 800);
  };

  const validateEmail = (email: string) => {
    return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!inputValue.trim()) return;

    if (currentStepId === "ask_email" && !validateEmail(inputValue)) {
      setError("Oups, cet email ne semble pas valide.");
      return;
    }

    const currentStep = CHAT_LOGIC[currentStepId];
    const newAnswers = { ...answers, [currentStepId]: inputValue };
    setAnswers(newAnswers);
    setHistory((prev) => [...prev, { type: 'user', text: inputValue }]);
    setInputValue("");

    if (currentStep.nextStep === "finish") {
      finishChat(newAnswers);
    } else if (currentStep.nextStep) {
      goToNextStep(currentStep.nextStep, currentStepId === "ask_name" ? inputValue : (answers.ask_name || ""));
    }
  };

  const finishChat = (finalAnswers: Record<string, string>) => {
    setHistory((prev) => [
      ...prev,
      { type: 'bot', text: "Parfait ! Je te redirige vers le formulaire avec tout pré-rempli 🚀" }
    ]);

    setTimeout(() => {
      // Retrouver le service sélectionné
      const serviceKey = (
        finalAnswers.web_type ||
        finalAnswers.branding_type ||
        finalAnswers.social_type
      ) as keyof typeof SERVICES | undefined;

      const serviceLabel = serviceKey && SERVICES[serviceKey]
        ? SERVICES[serviceKey].label
        : "";

      // Budget = valeur sélectionnée dans l'étape budget_*
      const budget = Object.entries(finalAnswers).find(([k]) => k.startsWith("budget_"))?.[1] ||
        finalAnswers.social_type && SERVICES[finalAnswers.social_type as keyof typeof SERVICES]?.budgets[0] ||
        finalAnswers.branding_type && SERVICES[finalAnswers.branding_type as keyof typeof SERVICES]?.budgets[0] ||
        "";

      const params = new URLSearchParams({
        name:    finalAnswers.ask_name  || "",
        email:   finalAnswers.ask_email || "",
        phone:   finalAnswers.ask_phone || "",
        type:    serviceLabel,
        budget,
        message: "Demande via chatbot O'ldev.",
      });

      router.push(`/contact?${params.toString()}`);
      setIsOpen(false);
      setTimeout(() => {
        setCurrentStepId("start");
        setHistory([{ type: 'bot', text: CHAT_LOGIC.start.question }]);
        setAnswers({});
      }, 1000);
    }, 2000);
  };

  return (
    <>
      {/* Trigger button — visible seulement après le hero */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: pastHero ? 1 : 0, scale: pastHero ? 1 : 0.8, pointerEvents: pastHero ? "auto" : "none" } as never}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-4 md:bottom-28 md:right-8 z-[100] bg-abcs-black text-white w-12 h-12 md:w-20 md:h-20 rounded-none shadow-[-4px_4px_0px_0px_rgba(255,59,0,1)] md:shadow-[-6px_6px_0px_0px_rgba(255,59,0,1)] border-[2px] md:border-[3px] border-abcs-black flex items-center justify-center overflow-hidden group"
      >
        <div className="absolute inset-0 bg-abcs-red translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        {isOpen ? (
          <span className="font-heading text-3xl md:text-4xl relative z-10">✕</span>
        ) : (
          <span className="font-heading text-2xl md:text-3xl relative z-10 tracking-tight">O&apos;l</span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[9.5rem] right-4 md:bottom-[11rem] md:right-8 z-[100] w-[calc(100vw-32px)] md:w-[440px] h-[65vh] md:h-[580px] max-h-[800px] bg-[#f0f0ee] border-[2px] md:border-[3px] border-abcs-black shadow-[-8px_8px_0px_0px_rgba(255,59,0,1)] md:shadow-[-12px_12px_0px_0px_rgba(255,59,0,1)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-abcs-black text-white px-6 py-5 flex justify-between items-center border-b-[3px] border-abcs-red">
              <div className="flex flex-col">
                <span className="font-heading text-xl tracking-[0.08em] uppercase">{t("chatbot_name")}</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold opacity-60 uppercase tracking-widest">{t("chatbot_status")}</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="font-heading text-2xl hover:text-abcs-red transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col gap-3 bg-[#f0f0ee]">
              {history.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`max-w-[85%] p-3.5 text-sm font-bold border-[2px] shadow-[3px_3px_0px_0px_rgba(17,17,17,1)] ${
                    msg.type === 'bot'
                    ? 'bg-white border-abcs-black text-abcs-black self-start'
                    : 'bg-abcs-red border-abcs-black text-white self-end'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && (
                <div className="p-3.5 bg-white border-[2px] border-abcs-black self-start shadow-[3px_3px_0px_0px_rgba(17,17,17,1)] flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-abcs-red rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-abcs-red rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                  <div className="w-1.5 h-1.5 bg-abcs-red rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 bg-[#f0f0ee] border-t-[3px] border-abcs-black flex flex-col gap-2">
              {error && <div className="text-[10px] font-bold text-abcs-red uppercase tracking-widest mb-1 ml-1">{error}</div>}

              {CHAT_LOGIC[currentStepId]?.type === 'input' ? (
                <form onSubmit={handleInputSubmit} className="flex gap-2">
                  <input
                    autoFocus
                    type={CHAT_LOGIC[currentStepId].inputType}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tape ici..."
                    className="flex-1 border-[2px] border-abcs-black p-3 font-bold text-sm focus:outline-none focus:border-abcs-red bg-white"
                  />
                  <button type="submit" className="bg-abcs-black text-white px-5 border-[2px] border-abcs-black font-bold text-xl hover:bg-abcs-red transition-colors">→</button>
                </form>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {CHAT_LOGIC[currentStepId]?.options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-white border-[2px] border-abcs-black px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest hover:bg-abcs-red hover:text-white hover:border-abcs-red transition-colors shadow-[2px_2px_0px_0px_rgba(17,17,17,1)]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
