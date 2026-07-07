// @ts-nocheck
"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, ArrowUpRight, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { RevealUp } from "@/components/Animations";

import LiquidImage from "@/components/LiquidImage";

const PROJECTS = [
  { id:"01", titleKey:"proj1", loc:"loc1", year:"2023", catKey:"filterRes", area:"850 m²", img:"/assets/images/user_villa_night.jpg", colSpan: "lg:col-span-8" },
  { id:"02", titleKey:"proj2", loc:"loc2", year:"2022", catKey:"filterRes", area:"1,200 m²", img:"/assets/images/user_villa_pajero.jpg", colSpan: "lg:col-span-4" },
  { id:"03", titleKey:"proj3", loc:"loc3", year:"2022", catKey:"filterRes", area:"600 m²", img:"/assets/images/user_villa_symmetry.jpg", colSpan: "lg:col-span-4" },
  { id:"04", titleKey:"proj4", loc:"loc4", year:"2021", catKey:"filterRes", area:"3 Units", img:"/assets/images/user_villa_scaffold.jpg", colSpan: "lg:col-span-4" },
  { id:"05", titleKey:"proj5", loc:"loc5", year:"2024", catKey:"filterInfra", area:"1,400 m²", img:"/assets/images/user_foundation.jpg", colSpan: "lg:col-span-4" },
  { id:"06", titleKey:"proj6", loc:"loc6", year:"2023", catKey:"filterInfra", area:"Reinforced", img:"/assets/images/user_rebar_stairs.jpg", colSpan: "lg:col-span-12" }
];

function ProjectCard({ p, i }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { language, t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const yPos = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-[2rem] overflow-hidden cursor-pointer bg-[#050505] border border-white/5 h-[450px] lg:h-[550px] flex flex-col justify-end isolate ${p.colSpan}`}
    >
      {/* Inner Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196,162,101,0.08), transparent 40%)` }}
      />
      {/* Border Glow */}
      <div 
        className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem] border border-transparent"
        style={{ 
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(196,162,101,0.6), transparent 40%) border-box`,
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Photo inside Bento container */}
      <div className="absolute inset-3 rounded-[1.5rem] overflow-hidden">
        <motion.div
          style={{ y: yPos }}
          className="absolute inset-[-20%] w-[140%] h-[140%]"
        >
          <LiquidImage 
            img={p.img} 
            className="opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-opacity duration-1000" 
          />
        </motion.div>
        {/* Halftone dot overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50 mix-blend-overlay pointer-events-none" />
        {/* Vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 p-10 text-left rtl:text-right h-full flex flex-col justify-between pointer-events-none">
        
        {/* Top Header */}
        <div className="flex justify-between items-start w-full">
          <p className="font-display italic text-7xl text-white/10 select-none">{p.id}</p>
          <div className="bg-black/50 backdrop-blur-md rounded-full px-4 py-2 text-[10px] tracking-widest uppercase text-accent font-mono border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
            {t(p.catKey)}
          </div>
        </div>

        {/* Bottom Details */}
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div className="flex flex-wrap gap-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 justify-start">
            <div className="flex items-center gap-1.5 text-muted text-[10px] font-mono"><Calendar size={10}/> {p.year}</div>
            <div className="text-accent text-[10px] font-mono font-bold">{p.area}</div>
          </div>
          
          <div className="flex items-end justify-end gap-4">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-muted -rotate-45 group-hover:rotate-0 group-hover:border-accent group-hover:text-accent transition-all duration-500 flex-shrink-0 bg-black/50 backdrop-blur-md pointer-events-auto">
              <ArrowUpRight size={18}/>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const { language, t } = useLanguage();

  return (
    <section id="projects" className="relative py-28 md:py-40 bg-bg overflow-hidden text-text-primary">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20 text-left rtl:text-right">
          <RevealUp>
            <div className="flex items-center gap-3 mb-6 justify-start">
              <span className="w-12 h-px bg-accent"></span>
              <span className="text-[11px] font-bold tracking-[0.3em] text-accent font-mono uppercase">
                {t("projectsSubtitle")}
              </span>
            </div>
            <h2 className="font-display italic text-7xl md:text-8xl lg:text-[9rem] text-text-primary tracking-tight leading-none">
              {t("projectsTitle")}
            </h2>
          </RevealUp>
          
          <RevealUp delay={0.1}>
            <p className="text-muted text-sm md:text-base leading-relaxed max-w-md pb-4 font-mono">
              {language === "en" 
                ? "A curated collection of our most prestigious architecture and structural engineering completions across Musandam, Oman."
                : "مجموعة مختارة من أرقى منجزاتنا المعمارية والهندسية الإنشائية في محافظة مسندم بسلطنة عمان."}
            </p>
          </RevealUp>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}
        </div>

        {/* Bottom Call to Action */}
        <div className="mt-20 flex justify-center">
          <a 
            href="#contact" 
            className="group relative px-10 py-5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[11px] uppercase tracking-widest font-mono font-bold overflow-hidden inline-flex items-center gap-3 hover:border-accent transition-colors text-text-primary"
          >
            <span className="relative z-10 flex items-center gap-2">{language === "en" ? "Request Feasibility Study" : "طلب دراسة جدوى هندسية"} <ArrowRight size={14} className="text-accent group-hover:translate-x-1 transition-transform" /></span>
          </a>
        </div>

      </div>
    </section>
  );
}
