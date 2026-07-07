// @ts-nocheck
"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Magnetic from "@/components/Magnetic";
import { SplitText } from "@/components/Animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const { language, t } = useLanguage();
  const isRtl = language === "ar";
  const containerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  useEffect(() => {
    // Kinetic Marquee Effect
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: isRtl ? 50 : -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, [isRtl]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-[110vh] w-full bg-[#000000] text-[#F2F2F2] overflow-hidden flex items-center pt-32 pb-20"
    >
      {/* ── Background Kinetic Typography ── */}
      <div className="absolute top-[20%] left-0 w-[200vw] overflow-hidden pointer-events-none opacity-[0.03] select-none z-0 mix-blend-screen">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {Array(4).fill(0).map((_, i) => (
            <h1 key={i} className="text-[15rem] md:text-[22rem] font-display italic leading-none tracking-tighter uppercase mr-12">
              {language === "en" ? "RASHID AL KHANZORI · " : "راشد الخنزوري · "}
            </h1>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10 h-full flex flex-col justify-center">
        <div className={`flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 h-full ${isRtl ? "lg:flex-row-reverse" : ""}`}>
          
          {/* ── LEFT: Massive Editorial Text ── */}
          <motion.div 
            className="flex-1 w-full relative z-20 text-left rtl:text-right mt-10 lg:mt-0"
            style={{ y: y1 }}
          >
            <div className="overflow-hidden mb-6">
              <motion.div 
                initial={{ y: "100%" }} 
                animate={{ y: 0 }} 
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-[1px] bg-accent" />
                <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-mono text-accent font-bold">
                  {t("location")}
                </span>
              </motion.div>
            </div>

            <h1 className="font-display italic text-[4.5rem] md:text-[7rem] lg:text-[8.5rem] xl:text-[10rem] leading-[0.85] tracking-[-0.03em] relative z-10 mix-blend-difference">
              {language === "en" ? (
                <>
                  <SplitText text="Creating" stagger={0.03} delay={0.1} splitBy="char" />
                  <br />
                  <span className="text-accent ml-12 md:ml-24">
                    <SplitText text="Spaces" stagger={0.03} delay={0.4} splitBy="char" />
                  </span>
                  <br />
                  <SplitText text="That Inspire" stagger={0.03} delay={0.7} splitBy="char" />
                </>
              ) : (
                <>
                  مساحات<br />
                  <span className="text-accent ml-12 md:ml-24">ملهمة</span><br />
                  <span className="stroke-text opacity-50">تنبض بالحياة</span>
                </>
              )}
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-neutral-400 text-sm md:text-lg leading-relaxed max-w-md mt-12 font-light"
            >
              {t("heroDesc")}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="flex items-center gap-6 mt-12"
            >
              <Magnetic strength={0.4}>
                <a href="#projects" className="group relative px-8 py-5 rounded-full bg-[#F2F2F2] text-[#000000] text-[10px] uppercase tracking-[0.2em] font-mono font-bold overflow-hidden inline-flex items-center gap-3">
                  <div className="absolute inset-0 bg-accent translate-y-[101%] transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-y-0" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">{t("heroCta")} <ArrowRight size={14} /></span>
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a href="#services" className="px-4 py-4 text-[10px] uppercase tracking-[0.2em] font-mono font-bold text-neutral-400 hover:text-accent transition-colors inline-flex items-center gap-2">
                  {t("heroWork")}
                </a>
              </Magnetic>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Architectural Parallax Image ── */}
          <motion.div 
            className="flex-1 w-full lg:w-auto relative h-[60vh] lg:h-[85vh] overflow-hidden rounded-[2rem] lg:rounded-[3rem] z-10"
            style={{ y: y2 }}
          >
            <motion.div
              initial={{ scale: 1.2, filter: "blur(20px)" }}
              animate={{ scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full relative"
            >
              <motion.div
                ref={imageRef}
                style={{ scale, backgroundImage: "url('/assets/images/hero_interior.png')" }}
                className="absolute inset-[-10%] w-[120%] h-[120%] bg-cover bg-center mix-blend-luminosity opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/40 to-transparent z-10" />
            </motion.div>

            {/* Premium Badge Overlay */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 left-8 glass-premium backdrop-blur-xl border border-white/10 rounded-2xl p-5 w-64 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] uppercase tracking-[0.2em] text-accent font-bold font-mono">Premium Portfolio</span>
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              </div>
              <p className="text-[#F2F2F2] font-display italic text-2xl leading-none mb-1">
                {language === "en" ? "Khasab Royal" : "قصر الخصب الملكي"}
              </p>
              <p className="text-neutral-400 text-[10px] font-mono uppercase tracking-widest">Musandam</p>
            </motion.div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
