// @ts-nocheck
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { RevealUp } from "@/components/Animations";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [f, setF] = useState({ name: "", email: "", type: "", msg: "" });
  const { language, t } = useLanguage();
  const isRtl = language === "ar";

  const set = (k: string) => (e: any) => setF(p => ({ ...p, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f)
      });
      if (res.ok) {
        setSent(true);
      } else {
        alert(language === 'en' ? 'Failed to send message.' : 'فشل إرسال الرسالة.');
      }
    } catch (error) {
      alert(language === 'en' ? 'Failed to send message.' : 'فشل إرسال الرسالة.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    {
      role:  t("chairman"),
      name:  "Rashid Al Khanzori",
      num:   "+968 9893 9598",
      wa:    "https://wa.me/96898939598",
      tel:   "tel:+96898939598",
    },
    {
      role:  t("md"),
      name:  "Mohammad Saddique",
      num:   "+968 9920 5961",
      wa:    "https://wa.me/96899205961",
      tel:   "tel:+96899205961",
    },
  ];

  return (
    <section id="contact" className="relative py-32 md:py-44 bg-bg overflow-hidden text-text-primary">

      {/* BG blobs */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50 mix-blend-overlay pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className={`mb-16 text-left rtl:text-right max-w-xl`}>
          <RevealUp>
            <div className="flex items-center gap-3 mb-4 justify-start">
              <span className="w-8 h-px bg-accent"></span>
              <span className="text-[10px] font-bold tracking-[0.25em] text-accent font-mono uppercase">
                {t("contactSubtitle")}
              </span>
            </div>
            <h2 className="font-display italic text-6xl md:text-[5rem] text-text-primary tracking-tight mb-4 leading-none">
              {t("contactTitle")}
            </h2>
          </RevealUp>
          <RevealUp delay={0.1}>
            <p className="text-muted text-lg max-w-lg">{t("contactDesc")}</p>
          </RevealUp>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 items-start">

          {/* ─── LEFT COLUMN ─── */}
          <motion.div {...fadeUp(0.1)} className="space-y-6 text-left rtl:text-right">

            {/* Office info cards */}
            {[
              {
                icon: <MapPin size={14} className="text-accent" />,
                label: t("office"),
                value: t("officeLoc"),
              },
              {
                icon: <Mail size={14} className="text-accent" />,
                label: t("email"),
                value: "sadiali@gmail.com",
              },
            ].map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-stroke bg-surface hover:border-accent transition-colors cursor-default"
              >
                <div className="w-9 h-9 rounded-full bg-surface/50 border border-stroke flex items-center justify-center flex-shrink-0 shadow-sm backdrop-blur-md">
                  {row.icon}
                </div>
                <div>
                  <p className="text-[8.5px] uppercase tracking-widest text-muted font-bold font-mono mb-1">{row.label}</p>
                  <p className="text-text-primary font-semibold text-sm leading-snug">{row.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Contact person cards */}
            <div>
              <p className="text-[8.5px] uppercase tracking-widest text-muted font-bold font-mono mb-3">
                {language === "en" ? "Direct Channels" : "قنوات الاتصال المباشر"}
              </p>
              <div className="grid grid-cols-1 gap-4">
                {contacts.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.25 + i * 0.1 }}
                    className="p-5 rounded-2xl border border-stroke bg-surface shadow-sm"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-[7.5px] uppercase tracking-widest text-accent font-bold font-mono">{c.role}</span>
                        <p className="text-text-primary font-bold text-base mt-0.5">{c.name}</p>
                        <p className="text-muted text-xs font-mono mt-0.5">{c.num}</p>
                      </div>
                      {/* Status dot */}
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                        <span className="text-[7.5px] font-bold text-[#22c55e] uppercase tracking-wider font-mono">Online</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2">
                      <a href={c.wa} target="_blank" rel="noopener noreferrer" className="group relative rounded-lg bg-text-primary text-bg text-[10px] uppercase tracking-widest font-mono font-bold overflow-hidden inline-flex items-center gap-2 justify-center py-2.5">
                        <div className="absolute inset-0 bg-accent translate-y-[100%] transition-transform duration-300 ease-out group-hover:translate-y-0" />
                        <span className="relative z-10 flex items-center gap-2">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                          </svg>
                          WhatsApp
                        </span>
                      </a>
                      <a href={c.tel} className="flex items-center gap-2 justify-center py-2.5 rounded-lg border border-stroke text-[10px] uppercase tracking-widest font-mono font-bold hover:bg-white/5 transition-colors">
                        <Phone size={12} /> {t("directCall")}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ─── RIGHT: Form ─── */}
          <motion.div
            {...fadeUp(0.2)}
            className="bg-surface rounded-2xl border border-stroke overflow-hidden shadow-sm"
          >
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  exit={{ opacity: 0, scale: 0.98 }}
                  onSubmit={handleSubmit}
                  className="p-8 md:p-12 space-y-5"
                >
                  {/* Form header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="text-[8.5px] font-bold tracking-[0.25em] uppercase text-accent font-mono">
                        {language === "en" ? "Project Brief" : "ملخص المشروع"}
                      </span>
                    </div>
                    <h3 className="font-display italic text-text-primary text-3xl tracking-tight mb-1">
                      {language === "en" ? "Submit Parameters" : "تقديم بيانات المشروع"}
                    </h3>
                    <p className="text-muted text-sm">
                      {language === "en" ? "Our engineering team responds within 24 hours." : "يرد فريقنا الهندسي في غضون ٢٤ ساعة."}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[8.5px] uppercase tracking-widest text-muted font-bold font-mono mb-2">{t("cName")}</label>
                      <input
                        required
                        type="text"
                        placeholder={language === "en" ? "Full name" : "الاسم الكامل"}
                        className="w-full bg-bg border border-stroke rounded-lg px-4 py-3 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors"
                        value={f.name}
                        onChange={set("name")}
                      />
                    </div>
                    <div>
                      <label className="block text-[8.5px] uppercase tracking-widest text-muted font-bold font-mono mb-2">{t("cEmail")}</label>
                      <input
                        required
                        type="email"
                        placeholder="name@company.com"
                        className="w-full bg-bg border border-stroke rounded-lg px-4 py-3 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors"
                        value={f.email}
                        onChange={set("email")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8.5px] uppercase tracking-widest text-muted font-bold font-mono mb-2">{t("cCategory")}</label>
                    <select className="w-full bg-bg border border-stroke rounded-lg px-4 py-3 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors" value={f.type} onChange={set("type")}>
                      <option value="">{language === "en" ? "Select category…" : "اختر التصنيف…"}</option>
                      <option value="residential">{t("service1")}</option>
                      <option value="commercial">{t("service2")}</option>
                      <option value="infrastructure">{t("service3")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[8.5px] uppercase tracking-widest text-muted font-bold font-mono mb-2">{t("cScope")}</label>
                    <textarea
                      required
                      rows={5}
                      placeholder={language === "en" ? "Describe dimensions, location, materials, and special requirements…" : "اوصف المساحة والموقع والمواد والمتطلبات الخاصة…"}
                      className="w-full bg-bg border border-stroke rounded-lg px-4 py-3 text-sm text-text-primary focus:border-accent focus:outline-none transition-colors resize-none"
                      value={f.msg}
                      onChange={set("msg")}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group relative w-full rounded-lg bg-text-primary text-bg text-[11px] uppercase tracking-widest font-mono font-bold overflow-hidden inline-flex items-center justify-center gap-2 py-4 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {!isSubmitting && <div className="absolute inset-0 bg-accent translate-y-[100%] transition-transform duration-300 ease-out group-hover:translate-y-0" />}
                    <span className="relative z-10 flex items-center gap-2">
                      {isSubmitting 
                        ? (language === "en" ? "Submitting..." : "جاري الإرسال...") 
                        : <>{t("cSubmit")} <ArrowRight size={13} /></>
                      }
                    </span>
                  </motion.button>

                  <p className="text-muted text-[10px] text-center font-mono mt-4">
                    {language === "en" ? "Protected under strict NDA — zero spam." : "جميع البيانات محمية بموجب اتفاقية سرية صارمة."}
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center py-24 px-8 gap-5"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full bg-surface/50 border border-stroke flex items-center justify-center shadow-sm"
                  >
                    <CheckCircle2 size={32} className="text-accent" />
                  </motion.div>
                  <h3 className="font-display italic text-text-primary text-3xl tracking-tight">
                    {language === "en" ? "Enquiry Received" : "تم استلام طلبكم"}
                  </h3>
                  <p className="text-muted max-w-xs text-sm leading-relaxed">
                    {language === "en"
                      ? "Our structural team will review your brief and reach out within 24 hours."
                      : "سيراجع فريقنا الهندسي ملخص مشروعكم ويتواصل خلال ٢٤ ساعة."}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="px-6 py-2.5 rounded-lg border border-stroke text-[11px] uppercase tracking-widest font-mono font-bold hover:bg-white/5 transition-colors mt-2"
                  >
                    {language === "en" ? "Submit another enquiry" : "تقديم طلب جديد"}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
