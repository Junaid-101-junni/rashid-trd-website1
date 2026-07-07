// @ts-nocheck
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState<string | null>(null);
  const { language, toggleLanguage, t } = useLanguage();

  const LINKS = [
    { id: "home", label: t("home") },
    { id: "services", label: t("services") },
    { id: "projects", label: t("projects") },
    { id: "contact", label: t("contact") },
  ];

  const scrollTo = (id: string) => {
    setActive(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center justify-between p-2 rounded-full border border-stroke bg-surface/80 backdrop-blur-xl shadow-2xl w-[90%] max-w-6xl">
        
        {/* LOGO */}
        <div className="pl-3 pr-6 flex items-center gap-4 cursor-pointer group" onClick={() => scrollTo("home")}>
          <div className="relative w-24 h-10 md:w-32 md:h-12 overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105">
             <img src="/assets/images/logo_transparent.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-text-primary font-bold tracking-widest text-[12px] md:text-[14px] uppercase font-mono group-hover:text-accent transition-colors">
              {language === "en" ? "Rashid Al Khanzori" : "راشد الخنزوري"}
            </span>
            <span className="text-muted text-[8px] md:text-[10px] tracking-[0.2em] uppercase font-mono hidden md:block mt-0.5">
              {language === "en" ? "Trading & Contracting L.L.C" : "للتجارة والمقاولات ذ.م.م"}
            </span>
          </div>
        </div>

        {/* LINKS */}
        <div className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onMouseEnter={() => setHovered(link.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => scrollTo(link.id)}
              className="relative px-5 py-2.5 text-[11px] uppercase tracking-widest font-mono text-muted transition-colors hover:text-text-primary"
            >
              {hovered === link.id && (
                <motion.div
                  layoutId="nav-hover"
                  className="absolute inset-0 bg-white/5 rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              {active === link.id && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 border border-stroke rounded-full z-0"
                  transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>

        {/* CTA & LANG TOGGLE */}
        <div className="flex items-center gap-2 pr-2">
          <button
            onClick={toggleLanguage}
            className="group relative px-4 py-3 rounded-full border border-stroke bg-surface hover:border-accent hover:text-accent text-[10px] uppercase tracking-[0.2em] font-mono font-bold transition-all flex items-center gap-2"
          >
            <Globe size={13} />
            <span className="hidden sm:inline">{language === "en" ? "العربية" : "EN"}</span>
          </button>
        </div>

      </div>
    </motion.nav>
  );
}
