"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

type Step = {
  id: string;
  question: string;
  type?: 'options' | 'input';
  inputType?: string;
  options?: { label: string; value: string; nextStep?: string }[];
  nextStep?: string;
};

// Mapping for Contact Form consistency
const VALUE_TO_LABEL: Record<string, string> = {
  "site": "Site Vitrine (Présence)",
  "vitrine": "Site Vitrine (Présence)",
  "ecommerce": "Application Web / SaaS", // Or add e-commerce specifically
  "saas": "Application Web / SaaS",
  "refonte": "Refonte de site existant",
  "design": "Branding / Identité Visuelle",
  "social": "Community Management",
  "low": "<1000",
  "mid": "1000-3000",
  "high": "3000-5000"
};

const CHAT_LOGIC: Record<string, Step> = {
  start: {
    id: "start",
    question: "Salut ! Ravi de te voir ici. Prêt à transformer ton projet en une machine à conversion ? Dis-moi, on part sur quoi ?",
    type: 'options',
    options: [
      { label: "Créer un Site Web", value: "site", nextStep: "site_type" },
      { label: "Une Refonte Totale", value: "refonte", nextStep: "refonte_type" },
      { label: "Branding & Print", value: "design", nextStep: "design_type" },
      { label: "Social Media", value: "social", nextStep: "social_type" },
    ],
  },
  site_type: {
    id: "site_type",
    question: "Excellent choix. Le web, c'est notre terrain de jeu. Quel type d'expérience on va construire ?",
    type: 'options',
    options: [
      { label: "Site Vitrine (Impact)", value: "vitrine", nextStep: "budget" },
      { label: "E-commerce (Vente)", value: "ecommerce", nextStep: "budget" },
      { label: "SaaS / App Complexe", value: "saas", nextStep: "budget" },
    ],
  },
  refonte_type: {
    id: "refonte_type",
    question: "Ton site actuel freine ta croissance ? On va lui donner un second souffle. Quelle est l'urgence ?",
    type: 'options',
    options: [
      { label: "Look & Design UX", value: "design_refresh", nextStep: "budget" },
      { label: "Vitesse & SEO", value: "perf_seo", nextStep: "budget" },
      { label: "Nouvelles Fonctions", value: "features", nextStep: "budget" },
    ],
  },
  design_type: {
    id: "design_type",
    question: "L'image, c'est 90% de la confiance client. On s'attaque à quoi ?",
    type: 'options',
    options: [
      { label: "Logo & Identité", value: "branding", nextStep: "budget" },
      { label: "Flyers & Supports Print", value: "print", nextStep: "budget" },
    ],
  },
  social_type: {
    id: "social_type",
    question: "On va rendre ton feed irrésistible. Quel niveau d'accompagnement tu vises ?",
    type: 'options',
    options: [
      { label: "Starter (Démarrage)", value: "social_starter", nextStep: "budget" },
      { label: "Growth (Visibilité)", value: "social_growth", nextStep: "budget" },
      { label: "Pro (Domination)", value: "social_pro", nextStep: "budget" },
    ],
  },
  budget: {
    id: "budget",
    question: "Parlons chiffres (sans tabou). Pour donner vie à tout ça, t'as prévu quel budget ?",
    type: 'options',
    options: [
      { label: "Budget < 1000€", value: "low", nextStep: "validate" },
      { label: "Entre 1000€ et 3000€", value: "mid", nextStep: "validate" },
      { label: "Plus de 3000€", value: "high", nextStep: "validate" },
    ],
  },
  ask_name: {
    id: "ask_name",
    question: "Ok ! On arrive à la fin. C'est quoi ton petit nom (ou celui de ta marque) ?",
    type: 'input',
    inputType: 'text',
    nextStep: 'ask_email'
  },
  ask_email: {
    id: "ask_email",
    question: "Enchanté [NAME] ! Et ton mail pour que je puisse t'envoyer le devis ?",
    type: 'input',
    inputType: 'email',
    nextStep: 'ask_phone'
  },
  ask_phone: {
    id: "ask_phone",
    question: "Presque fini ! Un numéro de téléphone pour discuter du projet de vive voix ?",
    type: 'input',
    inputType: 'tel',
    nextStep: 'finish'
  }
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
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
    
    if (option.nextStep === "validate") {
      const service = newAnswers.site_type || newAnswers.start;
      const budget = option.value;
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        if ((service === "saas" || service === "ecommerce") && budget === "low") {
          setHistory((prev) => [...prev, { type: 'bot', text: "Soyons honnêtes : un projet SaaS ou E-commerce à moins de 1000€, c'est du bricolage, pas du Wexor. On part sur une Vitrine ?" }]);
          setCurrentStepId("redirect_choice");
        } else {
          goToNextStep("ask_name");
        }
      }, 800);
    } else if (option.nextStep) {
      goToNextStep(option.nextStep);
    }
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
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
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
      { type: 'bot', text: "Parfait ! Tout est prêt. Je te redirige pour que tu n'aies plus qu'à cliquer sur envoyer." }
    ]);

    setTimeout(() => {
      // Map logic for URL params
      const projectTypeRaw = finalAnswers.site_type || finalAnswers.start || "";
      const mappedType = VALUE_TO_LABEL[projectTypeRaw] || projectTypeRaw;
      const mappedBudget = VALUE_TO_LABEL[finalAnswers.budget] || finalAnswers.budget || "";

      const params = new URLSearchParams({
        name: finalAnswers.ask_name || "",
        email: finalAnswers.ask_email || "",
        phone: finalAnswers.ask_phone || "",
        type: mappedType,
        budget: mappedBudget,
        message: `Audit Chatbot Complet.`
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
      <motion.button
        whileHover={{ scale: 1.05, rotate: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] bg-abcs-red text-white w-16 h-16 md:w-20 md:h-20 rounded-none shadow-[8px_8px_0px_0px_rgba(17,17,17,1)] border-[4px] border-abcs-black flex items-center justify-center overflow-hidden group"
      >
        <div className="absolute inset-0 bg-abcs-black translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        {isOpen ? (
          <span className="font-heading text-4xl md:text-5xl relative z-10 group-hover:text-abcs-red transition-colors">X</span>
        ) : (
          <span className="font-heading text-4xl md:text-5xl relative z-10 group-hover:text-white transition-colors">W</span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-6 md:bottom-32 md:right-8 z-[100] w-[calc(100vw-48px)] md:w-[450px] h-[70vh] md:h-[600px] max-h-[800px] bg-[#f0f0ee] border-[4px] border-abcs-black shadow-[16px_16px_0px_0px_rgba(255,59,0,1)] flex flex-col overflow-hidden"
          >
            <div className="bg-abcs-black text-white px-6 py-5 flex justify-between items-center border-b-[4px] border-abcs-red">
              <div className="flex flex-col">
                <span className="font-heading text-2xl tracking-[0.1em] uppercase">Assistant Wexor</span>
                <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">En ligne</span>
              </div>
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_#22c55e]"></div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-4 bg-[#f0f0ee] scrollbar-hide">
              {history.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.type === 'bot' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`max-w-[85%] p-4 text-sm font-bold border-[3px] shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] ${
                    msg.type === 'bot' 
                    ? 'bg-white border-abcs-black text-abcs-black self-start' 
                    : 'bg-abcs-red border-abcs-black text-white self-end'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              {isTyping && <div className="p-4 bg-white border-4 border-black self-start rounded-tr-xl rounded-br-xl rounded-bl-xl flex gap-1"><div className="w-1.5 h-1.5 bg-abcs-red rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-abcs-red rounded-full animate-bounce delay-100"></div><div className="w-1.5 h-1.5 bg-abcs-red rounded-full animate-bounce delay-200"></div></div>}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 md:p-6 bg-white border-t-[4px] border-abcs-black flex flex-col gap-3">
              {error && <div className="text-[10px] font-bold text-abcs-red uppercase tracking-widest mb-1 ml-1">{error}</div>}
              
              {CHAT_LOGIC[currentStepId]?.type === 'input' ? (
                <form onSubmit={handleInputSubmit} className="flex gap-2">
                  <input
                    autoFocus
                    type={CHAT_LOGIC[currentStepId].inputType}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Tape ici..."
                    className="flex-1 border-[3px] border-abcs-black p-3 font-bold text-sm focus:outline-none focus:border-abcs-red bg-[#f0f0ee]"
                  />
                  <button type="submit" className="bg-abcs-black text-white px-5 border-[3px] border-abcs-black font-bold text-xl hover:bg-abcs-red transition-colors">→</button>
                </form>
              ) : currentStepId === "redirect_choice" ? (
                <div className="flex gap-2 w-full">
                  <button onClick={() => router.push('/tarifs')} className="flex-1 bg-abcs-black text-white border-[3px] border-abcs-black py-3 text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(255,59,0,1)] hover:bg-abcs-red transition-colors">Tarifs</button>
                  <button onClick={() => { setAnswers({...answers, site_type: 'vitrine'}); handleOptionClick({label: "Site Vitrine", value: "vitrine", nextStep: "ask_name"}); }} className="flex-1 bg-white border-[3px] border-abcs-black py-3 text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:bg-[#f0f0ee] transition-colors">Ok Vitrine</button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {CHAT_LOGIC[currentStepId]?.options?.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="bg-[#f0f0ee] border-[3px] border-abcs-black px-4 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-abcs-red hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(17,17,17,1)] hover:shadow-[4px_4px_0px_0px_rgba(17,17,17,1)]"
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
