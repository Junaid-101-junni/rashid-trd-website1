// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { RevealUp } from "@/components/Animations";

const SERVICES = [
  { n:"01", icon:"📋", key:"service1", img: "/assets/images/villa_garden_pathway.png", colSpan: "lg:col-span-8" },
  { n:"02", icon:"🏗️", key:"service2", img: "/assets/images/about_site.png", colSpan: "lg:col-span-4" },
  { n:"03", icon:"🤝", key:"service3", img: "/assets/images/arabic_villa_pool.png", colSpan: "lg:col-span-4" },
  { n:"04", icon:"🛋️", key:"service4", img: "/assets/images/arabic_majlis_interior.png", colSpan: "lg:col-span-4" },
  { n:"05", icon:"🏛️", key:"service5", img: "/assets/images/arabic_villa_golden.png", colSpan: "lg:col-span-4" },
  { n:"06", icon:"✨", key:"service6", img: "/assets/images/arabic_kitchen_luxury.png", colSpan: "lg:col-span-12" },
];

function ServiceCard({ s, i }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[2rem] cursor-default transition-all duration-300 ease-out text-left rtl:text-right bg-[#050505] border border-white/5 isolate ${s.colSpan}`}
    >
      {/* Inner Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196,162,101,0.06), transparent 40%)` }}
      />
      {/* Border Glow */}
      <div 
        className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem] border border-transparent"
        style={{ 
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196,162,101,0.5), transparent 40%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      <div className="flex flex-col h-full relative z-10">
        {/* Content */}
        <div className="p-8 lg:p-10 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-12">
            <span className="text-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0">{s.icon}</span>
            <span className="font-display italic text-5xl text-white/10 group-hover:text-accent/30 transition-colors duration-500">{s.n}</span>
          </div>
          
          <div className="mt-auto">
            <h3 className="font-display italic text-text-primary text-3xl md:text-4xl mb-4 group-hover:text-accent transition-colors duration-300">
              {t(s.key)}
            </h3>
            <p className="text-muted text-sm leading-relaxed max-w-md">{t(`${s.key}Desc`)}</p>
          </div>
        </div>

        {/* Image reveal on hover (Bento styling) */}
        <div className="relative h-48 md:h-64 overflow-hidden shrink-0 mt-4 mx-4 mb-4 rounded-3xl border border-white/5 opacity-80 group-hover:opacity-100 transition-all duration-700">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 mix-blend-luminosity group-hover:mix-blend-normal"
            style={{ backgroundImage: `url(${s.img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
          <div className="absolute bottom-4 right-4 w-10 h-10 border border-white/10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-muted group-hover:border-accent group-hover:text-accent transition-all duration-500 rtl:right-auto rtl:left-4">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExpertiseSection() {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative py-28 md:py-40 bg-bg overflow-hidden text-text-primary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 text-left rtl:text-right">
          <RevealUp>
            <div className="flex items-center gap-3 mb-6 justify-start">
              <span className="w-12 h-px bg-accent"></span>
              <span className="text-[11px] font-bold tracking-[0.3em] text-accent font-mono uppercase">
                {t("servicesSubtitle")}
              </span>
            </div>
            <h2 className="font-display italic text-7xl md:text-8xl lg:text-[9rem] text-text-primary tracking-tight leading-none">
              {t("servicesTitle")}
            </h2>
          </RevealUp>
          <RevealUp delay={0.1}>
            <p className="text-muted text-sm md:text-base leading-relaxed max-w-md pb-4 font-mono">
              {t("servicesDesc")}
            </p>
          </RevealUp>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {SERVICES.map((s, i) => <ServiceCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
