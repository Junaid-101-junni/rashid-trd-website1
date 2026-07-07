// @ts-nocheck
"use client";

import { useLanguage } from "@/lib/LanguageContext";

const NAV_LINKS = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "services", href: "#services" },
  { key: "projects", href: "#projects" },
  { key: "process", href: "#process" },
  { key: "contact", href: "#contact" }
];

const SERVICES = ["service1", "service2", "service3", "service7"];
const SOCIAL = [{ l:"LinkedIn", h:"#" },{ l:"Instagram", h:"#" },{ l:"Twitter", h:"#" }];

export default function Footer() {
  const { language, t } = useLanguage();
  const isRtl = language === "ar";

  return (
    <footer className="relative bg-bg border-t border-stroke pt-20 pb-10 text-left rtl:text-right">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 pb-16 border-b border-stroke">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="relative h-28 md:h-40 w-auto mb-6 flex items-start justify-start">
              <img 
                src="/assets/images/logo.png" 
                alt="Rashid Al Khanzori Logo" 
                className="object-contain w-auto h-full opacity-90 hover:opacity-100 transition-opacity rounded-xl"
              />
            </div>
            <p className="text-muted text-sm max-w-xs mb-8">
              {t("footerDesc")}
            </p>
            <div className="flex gap-3 justify-start">
              {SOCIAL.map(s => (
                <a key={s.l} href={s.h}
                  className="text-[10px] uppercase tracking-widest text-muted border border-stroke rounded-lg px-4 py-2 hover:border-accent hover:text-accent transition-all hover:bg-white/5">
                  {s.l}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-primary font-bold font-mono mb-5">{t("footerLinks")}</p>
            <ul className="space-y-3">
              {NAV_LINKS.map(l => (
                <li key={l.key}>
                  <a href={l.href}
                    className="text-muted text-sm hover:text-accent transition-colors">{t(l.key)}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-text-primary font-bold font-mono mb-5">{t("servicesSubtitle")}</p>
            <ul className="space-y-3">
              {SERVICES.map(s => (
                <li key={s} className="text-muted text-sm hover:text-accent transition-colors cursor-default">{t(s)}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © 2026 {t("brand")} {t("subBrand")} {isRtl ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
          <div className="flex items-center gap-6">
            <span className="text-muted text-xs">{t("footerReg")}</span>
            <span className="text-muted text-xs">{isRtl ? "خصب، مسندم، سلطنة عمان" : "Khasab, Musandam, Oman"}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
