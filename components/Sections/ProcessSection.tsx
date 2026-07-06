// @ts-nocheck
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { RevealUp } from "@/components/Animations";

const STEPS = [
  { n:"01", key:"step1" },
  { n:"02", key:"step2" },
  { n:"03", key:"step3" },
];

function StepItem({ step, i }: { step: typeof STEPS[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLanguage();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.85, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-start gap-6 md:gap-10 pl-14 md:pl-24 rtl:pl-0 rtl:pr-14 rtl:md:pr-24 pb-14 group text-left rtl:text-right"
    >
      {/* Number badge */}
      <div className="absolute left-0 rtl:left-auto rtl:right-0 top-0 w-10 h-10 md:w-14 md:h-14 rounded-full bg-surface/50 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:border-accent transition-colors duration-300 border border-stroke z-10">
        <span className="font-display italic text-accent text-lg md:text-xl">{step.n}</span>
      </div>

      {/* Content */}
      <div className="flex-1 pt-1">
        <h3 className="font-display italic text-text-primary text-2xl md:text-3xl mb-3 group-hover:text-accent transition-colors duration-300">
          {t(`${step.key}Title`)}
        </h3>
        <p className="text-muted text-sm leading-relaxed max-w-xl">{t(`${step.key}Desc`)}</p>
        {i < STEPS.length - 1 && (
          <div className="mt-8 w-full h-[1px] bg-stroke group-hover:bg-accent/40 transition-colors duration-400" />
        )}
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const { language, t } = useLanguage();
  const isRtl = language === "ar";

  return (
    <section id="process" className="relative py-28 md:py-36 bg-surface overflow-hidden text-text-primary">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-2xl mb-20 text-left rtl:text-right">
          <RevealUp>
            <div className="flex items-center gap-3 mb-4 justify-start">
              <span className="w-8 h-px bg-accent"></span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-accent font-mono uppercase">
                {t("processSubtitle")}
              </span>
            </div>
            <h2 className="font-display italic text-6xl md:text-[5rem] text-text-primary tracking-tight leading-none">
              {t("processTitle")}
            </h2>
          </RevealUp>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical gold connector line */}
          <div
            className={`absolute top-2 bottom-0 w-[1px] ${isRtl ? 'right-5 md:right-7' : 'left-5 md:left-7'}`}
            style={{ background: "linear-gradient(to bottom, var(--accent) 0%, rgba(212,175,55,0.15) 75%, transparent 100%)" }}
          />

          <div className="space-y-0">
            {STEPS.map((step, i) => (
              <StepItem key={i} step={step} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
