// @ts-nocheck
"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { SplitText } from "@/components/Animations";

function Count({ end, sfx }: { end: number; sfx: string }) {
  const [n, set] = useState(0);
  const ref = useRef(null);
  const in_ = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!in_) return;
    let cur = 0;
    const id = setInterval(() => {
      cur = Math.min(cur + end / (1500 / 16), end);
      set(Math.round(cur));
      if (cur >= end) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [in_, end]);
  return <span ref={ref}>{n}{sfx}</span>;
}

const fade = (d = 0, x = 0) => ({
  initial: { opacity: 0, y: 30, x, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, x: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 1.0, delay: d, ease: [0.22, 1, 0.36, 1] },
});

export default function AboutSection() {
  const sec = useRef(null);
  const { scrollYProgress } = useScroll({ target: sec, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const { language, t } = useLanguage();

  const STATS = [
    { val: 250, sfx: "+", key: "completed" },
    { val: 26,  sfx: "+", key: "years" },
    { val: 98,  sfx: "%", key: "satisfaction" },
  ];

  const CERTS = ["iso9001", "iso45001", "gradeA"];

  return (
    <section id="about" ref={sec} className="relative py-28 md:py-36 bg-bg overflow-hidden text-text-primary">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* LEFT — story */}
        <motion.div {...fade(0, -30)} className="text-left rtl:text-right">
          <div className="flex items-center gap-3 mb-4 justify-start">
            <span className="w-8 h-px bg-accent"></span>
            <span className="text-[10px] font-bold tracking-[0.25em] text-accent font-mono uppercase">
              {t("aboutSubtitle")}
            </span>
          </div>

          <h2 className="font-display italic text-[clamp(2.5rem,5vw,5rem)] text-text-primary tracking-tight mb-8 leading-[1.05]">
            {language === "en" ? (
              <>
                <span className="whitespace-nowrap"><SplitText text="Building Musandam's Skylines" stagger={0.03} delay={0.1} splitBy="char" /></span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 whitespace-nowrap">
                  <SplitText text="With Structural Rigor" stagger={0.03} delay={0.4} splitBy="char" />
                </span>
              </>
            ) : (
              <>
                <span className="whitespace-nowrap"><SplitText text="نشكّل آفاق البناء بمسندم" stagger={0.03} delay={0.1} splitBy="char" /></span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 whitespace-nowrap">
                  <SplitText text="بأساليب هندسية راسخة" stagger={0.03} delay={0.4} splitBy="char" />
                </span>
              </>
            )}
          </h2>

          <p className="text-muted text-lg mb-6 leading-relaxed">
            {t("aboutDesc")}
          </p>
          <p className="text-muted text-sm mb-10 leading-relaxed opacity-70">
            {t("aboutMore")}
          </p>

          <div className="flex flex-wrap gap-4 mb-12 justify-start">
            <a href="#projects" className="group relative px-8 py-3.5 rounded-full bg-text-primary text-bg text-[11px] uppercase tracking-widest font-mono font-bold overflow-hidden inline-flex items-center gap-3">
              <div className="absolute inset-0 bg-accent translate-y-[100%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2">{t("heroWork")} <ArrowRight size={13} /></span>
            </a>
            <a href="#contact" className="px-8 py-3.5 rounded-full border border-stroke text-[11px] uppercase tracking-widest font-mono font-bold hover:bg-white/5 transition-colors">
              {t("heroCta")}
            </a>
          </div>

          {/* Divider + certs */}
          <div className="w-full h-[1px] bg-stroke mb-6" />
          <div className="flex flex-wrap gap-8 justify-start">
            {CERTS.map(c => (
              <div key={c} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span className="text-[10px] tracking-widest uppercase text-muted font-bold font-mono">{t(c)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="space-y-6">
          {/* Parallax image */}
          <motion.div
            {...fade(0.1, 30)}
            className="relative h-[380px] overflow-hidden rounded-2xl border border-stroke shadow-2xl bg-surface group"
          >
            <motion.div
              className="absolute inset-[-15%] w-[130%] h-[130%] bg-cover bg-center mix-blend-luminosity opacity-70 transition-transform duration-1000 ease-[0.22,1,0.36,1] group-hover:scale-105 group-hover:mix-blend-normal group-hover:opacity-100"
              style={{ y: imgY, backgroundImage: "url('/assets/images/user_engineers.jpg')" }}
            />
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 text-left rtl:text-right">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                {...fade(0.12 * i + 0.15)}
                className="bg-surface rounded-2xl p-6 group cursor-default border border-stroke hover:border-accent transition-colors duration-300"
              >
                <p className="font-display italic text-4xl text-text-primary group-hover:text-accent transition-colors"><Count end={s.val} sfx={s.sfx} /></p>
                <p className="text-muted font-bold uppercase mt-2 tracking-widest font-mono text-[9px]">{t(s.key)}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
