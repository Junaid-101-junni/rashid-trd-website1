// @ts-nocheck
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { RevealUp } from "@/components/Animations";

const fade = (d=0) => ({
  initial:{ opacity:0, y:30 },
  whileInView:{ opacity:1, y:0 },
  viewport:{ once:true, margin:"-60px" },
  transition:{ duration:0.9, delay:d, ease:[0.22,1,0.36,1] },
});

export default function WhyUsSection() {
  const [active, setActive] = useState(0);
  const { language, t } = useLanguage();

  const VALUES = [
    { 
      icon: "🏆", 
      title: language === "en" ? "Uncompromising Quality" : "جودة لا تضاهى",
      desc: language === "en" 
        ? "Every material, every joint, every finish held to exacting standards. We never cut corners."
        : "كل مادة، وكل وصلة، وكل تشطيب نهائي يخضع لأدق الفحوصات الهندسية لضمان سلامته واستدامته."
    },
    { 
      icon: "🛡️", 
      title: language === "en" ? "Safety First, Always" : "السلامة أولاً ودائماً",
      desc: language === "en" 
        ? "ISO-certified safety protocols and zero-tolerance enforcement on every site."
        : "تطبيق معايير أيزو العالمية للسلامة المهنية والصحة والبيئة بشكل صارم في جميع مواقع العمل."
    },
    { 
      icon: "💡", 
      title: language === "en" ? "Engineering Innovation" : "الابتكار الإنشائي",
      desc: language === "en" 
        ? "BIM modelling, structural analysis, and sustainable material integration."
        : "استخدام تقنيات نمذجة معلومات البناء وتكامل المواد المستدامة للإنشاءات الحديثة."
    }
  ];

  const TESTIMONIALS = [
    {
      stars: 5,
      q: language === "en" 
        ? "Rashid Al Khanzori transformed our vision into reality. The attention to detail in our villa was extraordinary — from the foundation to the finishing touches, every element exceeded our highest expectations."
        : "لقد حولت شركة راشد الخنزوري رؤيتنا إلى حقيقة واقعة. كان الاهتمام بالتفاصيل في قصرنا استثنائياً؛ فمن الأساسات إلى اللمسات النهائية تجاوز كل عنصر توقعاتنا.",
      name: language === "en" ? "Sheikh Ahmed Al Rashidi" : "الشيخ أحمد الرشيدي",
      role: language === "en" ? "Private Developer" : "مستثمر خاص",
      proj: language === "en" ? "Private Residential Project" : "مشروع سكني خاص",
      img: "/assets/images/about_site.png"
    },
    {
      stars: 5,
      q: language === "en"
        ? "We engaged Rashid Al Khanzori Trading & Contracting for a complex commercial development. Their engineering expertise and project management capabilities are truly exceptional. Delivered exactly on time."
        : "لقد تعاقدنا مع راشد الخنزوري للتجارة والمقاولات من أجل تطوير تجاري معقد. إن خبراتهم الهندسية وقدراتهم في إدارة المشاريع استثنائية حقاً. تم التسليم في الوقت المحدد تماماً.",
      name: language === "en" ? "Eng. Saif Al Hosni" : "المهندس سيف الحوسني",
      role: language === "en" ? "Director, Development Corp." : "مدير شركة التطوير الإنشائي",
      proj: language === "en" ? "Commercial Development" : "تطوير تجاري",
      img: "/assets/images/about_site.png"
    }
  ];

  return (
    <>
      {/* ── Values (The RAK Difference) ───────────────────────────── */}
      <section className="relative py-28 md:py-36 bg-bg overflow-hidden text-left rtl:text-right text-text-primary">
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-20">
            <RevealUp>
              <div className="flex items-center gap-3 mb-4 justify-center">
                <span className="w-8 h-px bg-accent"></span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-accent font-mono uppercase">
                  {language === "en" ? "Our Promise" : "التزامنا"}
                </span>
                <span className="w-8 h-px bg-accent"></span>
              </div>
              <h2 className="font-display italic text-5xl md:text-[4.5rem] text-text-primary tracking-tight">
                {language === "en" ? (
                  <>The Rashid Al Khanzori <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">Difference</span></>
                ) : (
                  <>ميزة <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">الخنزوري</span></>
                )}
              </h2>
            </RevealUp>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left rtl:text-right">
            {VALUES.map((v, i) => (
              <motion.div key={i} {...fade(i*0.07)}
                className="group bg-surface rounded-2xl p-7 border border-stroke hover:border-accent transition-colors duration-300 isolate"
              >
                <div className="w-11 h-11 rounded-full bg-surface/50 border border-stroke flex items-center justify-center text-xl mb-5 group-hover:scale-110 group-hover:border-accent transition-all duration-300">
                  {v.icon}
                </div>
                <h3 className="font-display italic text-2xl text-text-primary mb-2 group-hover:text-accent transition-colors">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials (What They Say) ──────────────────── */}
      <section className="relative py-28 md:py-36 bg-surface overflow-hidden text-left rtl:text-right text-text-primary">
        
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <RevealUp>
              <div className="flex items-center gap-3 mb-4 justify-center">
                <span className="w-8 h-px bg-accent"></span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-accent font-mono uppercase">
                  {t("testimonials")}
                </span>
                <span className="w-8 h-px bg-accent"></span>
              </div>
              <h2 className="font-display italic text-6xl md:text-[5rem] text-text-primary tracking-tight">
                {language === "en" ? (
                  <>What They <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">Say</span></>
                ) : (
                  <>آراء <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60">عملائنا</span></>
                )}
              </h2>
            </RevealUp>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity:0, y:24, filter:"blur(6px)" }}
              animate={{ opacity:1, y:0, filter:"blur(0px)" }}
              exit={{ opacity:0, y:-16, filter:"blur(4px)" }}
              transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
              className="max-w-4xl mx-auto bg-bg rounded-2xl p-10 md:p-14 mb-10 text-left rtl:text-right border border-stroke shadow-2xl relative"
            >
              <div className="flex gap-0.5 mb-8 justify-start">
                {[...Array(TESTIMONIALS[active].stars)].map((_,i) => (
                  <span key={i} className="text-accent text-xl">★</span>
                ))}
              </div>
              <blockquote className="text-muted text-lg md:text-xl leading-relaxed italic mb-10 font-light">
                "{TESTIMONIALS[active].q}"
              </blockquote>
              <div className="flex items-center gap-5 pt-8 border-t border-stroke justify-start">
                <div className="w-12 h-12 rounded-full bg-cover bg-center border border-stroke flex-shrink-0"
                  style={{ backgroundImage:`url(${TESTIMONIALS[active].img})` }}
                />
                <div>
                  <p className="font-bold text-text-primary">{TESTIMONIALS[active].name}</p>
                  <p className="text-muted text-sm">{TESTIMONIALS[active].role}</p>
                  <p className="text-accent text-xs mt-1 uppercase tracking-widest font-bold font-mono">{TESTIMONIALS[active].proj}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Selector */}
          <div className="flex justify-center gap-3">
            {TESTIMONIALS.map((t,i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ${i===active ? "w-10 bg-accent" : "w-4 bg-stroke hover:bg-muted"}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
