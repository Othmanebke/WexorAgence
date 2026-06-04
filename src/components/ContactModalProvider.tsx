"use client";

import { createContext, useContext, useState } from "react";
import ContactModal from "./ContactModal";

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

  const openModal = (data?: ContactFormData) => {
    setInitialData(data);
    setIsOpen(true);
  };

  return (
    <ContactModalContext.Provider value={{ openModal }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} initialData={initialData} />
    </ContactModalContext.Provider>
  );
}
