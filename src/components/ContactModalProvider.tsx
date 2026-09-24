"use client";

import { createContext, useContext, useState } from "react";
import dynamic from "next/dynamic";

// Loaded on first open only — keeps it out of the initial bundle
const ContactModal = dynamic(() => import("./ContactModal"), { ssr: false });

export interface ContactFormData {
  name?: string;
  email?: string;
  phone?: string;
  type?: string;
  budget?: string;
  message?: string;
}

interface ContactModalCtx {
  openModal: (data?: ContactFormData) => void;
}

const ContactModalContext = createContext<ContactModalCtx>({ openModal: () => {} });

export const useContactModal = () => useContext(ContactModalContext);

export default function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialData, setInitialData] = useState<ContactFormData | undefined>();
  const [mounted, setMounted] = useState(false);

  const openModal = (data?: ContactFormData) => {
    setInitialData(data);
    setMounted(true);
    setIsOpen(true);
  };

  return (
    <ContactModalContext.Provider value={{ openModal }}>
      {children}
      {mounted && <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialData={initialData} />}
    </ContactModalContext.Provider>
  );
}
