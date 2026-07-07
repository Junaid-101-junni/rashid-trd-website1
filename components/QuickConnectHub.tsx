// @ts-nocheck
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Phone, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import Magnetic from "@/components/Magnetic";

export default function QuickConnectHub() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, t } = useLanguage();
  const isRtl = language === "ar";

  const contacts = [
    {
      role: t("chairman"),
      name: "Rashid Al Khanzori",
      wa: "https://wa.me/96898939598",
      tel: "tel:+96898939598",
      num: "+968 9893 9598",
      email: "mailto:sadiali@gmail.com",
    },
    {
      role: t("md"),
      name: "Mohammad Saddique",
      wa: "https://wa.me/96899205961",
      tel: "tel:+96899205961",
      num: "+968 9920 5961",
      email: "mailto:sadiali@gmail.com",
    },
  ];

  return (
    <div className={`fixed bottom-8 ${isRtl ? "left-8" : "right-8"} z-[997] hidden sm:flex flex-col items-end gap-3`}>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0,  scale: 1,    filter: "blur(0px)" }}
            exit={{   opacity: 0, y: 16,  scale: 0.94, filter: "blur(4px)" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-[320px] rounded-2xl overflow-hidden shadow-2xl border border-black/[0.08] bg-white"
            style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.04)" }}
          >
            {/* Header */}
            <div className="bg-[#0a0908] px-5 py-4 flex items-center justify-between">
              <div className="text-left rtl:text-right">
                <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#d4af37] font-mono mb-0.5">
                  {language === "en" ? "Rashid Al Khanzori HQ · Musandam" : "المكتب الرئيسي · مسندم"}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                  <p className="text-white/50 text-[9.5px] font-mono">
                    {language === "en" ? "Engineers available now" : "المهندسون متاحون الآن"}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.22 }}
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all"
              >
                <X size={13} />
              </motion.button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-neutral-500 text-[11px] leading-relaxed px-1 text-left rtl:text-right">
                {language === "en"
                  ? "Connect directly with our executive office in Khasab for project proposals and consultations."
                  : "تواصل مباشرة مع مكتبنا التنفيذي في خصب لمقترحات المشاريع والاستشارات."}
              </p>

              {contacts.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.15 }}
                  className="p-4 rounded-xl border border-black/[0.05] bg-[#f6f5f3]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-left rtl:text-right">
                      <p className="text-[7.5px] font-bold uppercase tracking-widest text-[#d4af37] font-mono">{c.role}</p>
                      <p className="text-[#110f0e] font-bold text-sm mt-0.5">{c.name}</p>
                      <p className="text-neutral-400 text-[10px] font-mono">{c.num}</p>
                    </div>
                    <ArrowUpRight size={13} className="text-neutral-300 mt-0.5 flex-shrink-0" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <a href={c.wa} target="_blank" rel="noopener noreferrer" className="btn-whatsapp justify-center text-[8.5px] px-2">
                      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      {language === "en" ? "Chat" : "دردشة"}
                    </a>
                    <a href={c.tel} className="btn-call justify-center text-[8.5px] px-2">
                      <Phone size={11} />
                      {language === "en" ? "Call" : "اتصال"}
                    </a>
                    <a href={c.email} className="btn-ghost justify-center text-[8.5px] px-2 bg-black/[0.03] hover:bg-black/[0.08] text-black">
                      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      {language === "en" ? "Email" : "بريد"}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 pb-4">
              <Magnetic strength={0.15}>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0a0908] text-[#d4af37] text-[8.5px] font-bold tracking-[0.2em] uppercase font-mono border border-[#d4af37]/15 hover:border-[#d4af37]/35 transition-colors"
                >
                  {language === "en" ? "Open Full Enquiry Form" : "فتح نموذج الاستفسار الكامل"}
                  <ArrowUpRight size={11} />
                </a>
              </Magnetic>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB Toggle button */}
      <Magnetic strength={0.4}>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-2xl bg-[#0a0908] flex items-center justify-center shadow-2xl border border-[#d4af37]/20 hover:border-[#d4af37]/45 transition-all group"
          style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.28), 0 0 0 1px rgba(212,175,55,0.12)" }}
        >
          {/* Gold glow */}
          <motion.span
            animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-2xl bg-[#d4af37]/10"
          />
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.22 }}>
                <X size={20} className="text-[#d4af37]" />
              </motion.div>
            ) : (
              <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.22 }}>
                <MessageSquare size={20} className="text-[#d4af37]" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Green online dot */}
          <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#0a0908]">
            <span className="absolute inset-0 rounded-full bg-[#22c55e] animate-ping opacity-70" />
          </span>
        </motion.button>
      </Magnetic>
    </div>
  );
}
