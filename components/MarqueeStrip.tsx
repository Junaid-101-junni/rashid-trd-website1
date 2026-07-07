"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useLanguage } from "@/lib/LanguageContext";

export default function MarqueeStrip() {
  const { language } = useLanguage();
  const marqueeRef = useRef<HTMLDivElement>(null);

  const TEXTS_EN = ["GRADE-A LICENSE", "ISO 9001:2015", "ISO 45001", "25+ YEARS MASTERY", "STRUCTURAL RIGOR"];
  const TEXTS_AR = ["درجة ممتازة", "آيزو 9001:2015", "آيزو 45001", "خبرة تفوق ٢٥ عاماً", "دقة إنشائية"];

  const texts = language === "en" ? TEXTS_EN : TEXTS_AR;

  // Double the array for seamless looping
  const duplicatedTexts = [...texts, ...texts, ...texts, ...texts];

  useEffect(() => {
    if (marqueeRef.current) {
      const isRtl = language === "ar";
      // We want continuous panning
      const totalWidth = marqueeRef.current.scrollWidth / 4; 
      
      gsap.fromTo(
        marqueeRef.current,
        { x: isRtl ? totalWidth : 0 },
        {
          x: isRtl ? 0 : -totalWidth,
          ease: "none",
          duration: 30,
          repeat: -1,
        }
      );
    }
  }, [language]);

  return (
    <div className="w-full bg-accent text-[#000] py-3 overflow-hidden border-y border-[#8B6F3E]">
      <div className="flex whitespace-nowrap" ref={marqueeRef}>
        {duplicatedTexts.map((text, i) => (
          <div key={i} className="flex items-center">
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.25em] uppercase mx-8">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/40" />
          </div>
        ))}
      </div>
    </div>
  );
}
