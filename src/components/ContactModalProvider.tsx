"use client";

import { createContext, useContext, useState } from "react";
import ContactModal from "./ContactModal";

const ContactModalContext = createContext<{ openModal: () => void }>({ openModal: () => {} });

export const useContactModal = () => useContext(ContactModalContext);

export default function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ContactModalContext.Provider value={{ openModal: () => setIsOpen(true) }}>
      {children}
      <ContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </ContactModalContext.Provider>
  );
}
