import type { Metadata } from "next";
import { Inter, Archivo_Black, Caveat } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Chatbot from "@/components/Chatbot";
import { LangProvider } from "@/components/LanguageContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivoBlack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O'ldev — Othmane · Développeur Web Freelance",
  description:
    "O'ldev, le portfolio de Othmane — développeur web freelance spécialisé en React, Next.js, WordPress et création de sites sur-mesure, apps web et e-commerce.",
  keywords: [
    "développeur web freelance",
    "création site web",
    "React",
    "Next.js",
    "WordPress",
    "e-commerce",
    "portfolio",
    "O'ldev",
    "Othmane",
  ],
  openGraph: {
    title: "O'ldev — Othmane · Développeur Web Freelance",
    description:
      "Sites sur-mesure, apps web, e-commerce — du code qui convertit.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${archivoBlack.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-black">
        <LangProvider>
          <CustomCursor />
          <Preloader />
          <LenisProvider>
            <Navbar />
            <div className="flex-1 flex flex-col">{children}</div>
            <Footer />
            <Chatbot />
          </LenisProvider>
        </LangProvider>
      </body>
    </html>
  );
}
