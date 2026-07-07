"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar";

interface LanguageContextProps {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    brand: "R. Al Khanzori",
    subBrand: "Trading & Contracting L.L.C.",
    location: "KHASAB, MUSANDAM · EST. 1998",
    tagline: "Creating spaces that inspire",
    home: "Home",
    about: "About",
    services: "Services",
    projects: "Portfolio",
    process: "Our Process",
    testimonials: "Testimonials",
    contact: "Contact",
    quote: "Get a quote",
    heroDesc: "The best combination of modernity & simplicity. Our team of master planners, architects, and structural engineers design and construct world-class residential and commercial developments.",
    heroCta: "Get a quote",
    heroWork: "Browse services",
    explore: "Scroll to explore",
    aboutTitle: "The best combination of modernity & simplicity",
    aboutSubtitle: "About us",
    aboutDesc: "Established in Khasab, Musandam, Rashid Al Khanzori Trading & Contracting LLC has grown into a regional powerhouse. We serve premium private developers and corporate infrastructure entities alike.",
    aboutMore: "From complex structural excavation and deep concrete foundations to the final turnkey interior finish of luxury assets, our execution is defined by structural safety and ISO-certified processes.",
    gradeA: "Grade-A License",
    iso9001: "ISO 9001:2015 Certified",
    iso45001: "ISO 45001 Certified",
    completed: "Projects Completed",
    years: "Years of Mastery",
    workforce: "Total Workforce",
    satisfaction: "Client Satisfaction",
    servicesTitle: "A comprehensive set of services",
    servicesSubtitle: "Our Services",
    servicesDesc: "We maintain specialized mechanical, engineering, and architectural contracting wings, handling logistics from plan to key.",
    service1: "Project planning",
    service1Desc: "Detailed site assessment and feasibility studies to optimize layouts, schedules, and structural integrity.",
    service2: "Project management",
    service2Desc: "Full site management, scheduling, budgeting, and quality control from groundbreaking to final inspection.",
    service3: "General contracting",
    service3Desc: "Turnkey civil engineering, structural steel, foundation works, and premium fit-out works.",
    service4: "Interior design",
    service4Desc: "Custom spatial plans, material curation, and bespoke detailing for luxury estates and offices.",
    service5: "Exterior design",
    service5Desc: "Architectural facades, landscape planning, and structural envelopes matching strict GCC styles.",
    service6: "Decoration",
    service6Desc: "High-end finishes, stone cladding, custom woodworking, and bespoke lighting fixtures.",
    service7: "Heavy Machinery Rentals",
    service7Desc: "JCB, water tanker, and loader rental services.",
    projectsTitle: "Take a look at our recent projects",
    projectsSubtitle: "Our Portfolio",
    filterAll: "All",
    filterRes: "Residential",
    filterComm: "Commercial",
    filterInfra: "Infrastructure",
    proj1: "Al Khasab Royal Villa",
    proj2: "Musandam Coastal Estate",
    proj3: "The Grand Majlis Complex",
    proj4: "Mountain Ridge Villas",
    proj5: "Khasab Heights Estate",
    proj6: "Bukha Custom Staircase",
    loc1: "Khasab, Musandam",
    loc2: "Musandam Peninsula",
    loc3: "Khasab City",
    loc4: "Bukha, Musandam",
    loc5: "Khasab Heights",
    loc6: "Bukha, Musandam",
    processTitle: "Check how our process is done",
    processSubtitle: "Our Process",
    step1Title: "Planning",
    step1Desc: "Studying site blueprints, load requirements, local municipal clearances, and cost estimation.",
    step2Title: "Estimating",
    step2Desc: "Calculating material costs, labor logistics, schedules, and drafting formal transparent proposals.",
    step3Title: "Building",
    step3Desc: "Site excavation, civil works, structural erection, finishes, and final handover audits.",
    clientsTitle: "Trusted by",
    contactTitle: "Let’s work together. Get a quote today.",
    contactSubtitle: "Request a quote",
    contactDesc: "Submit your project parameters and our engineering team will get in touch with you within 24 hours.",
    cName: "Full Name *",
    cEmail: "Email Address *",
    cCategory: "Project Category",
    cScope: "Project Details *",
    cSubmit: "Send Enquiry",
    office: "HQ Office",
    phone: "Phone Desk",
    email: "Corporate Email",
    footerDesc: "Building Musandam's future with award-winning engineering, premium craftsmanship, and an uncompromising commitment to excellence since 1998.",
    footerLinks: "Navigation",
    footerReg: "Grade-A Registered Contractor | Oman Chamber of Commerce",
    chairman: "Chairman: Rashid Al Khanzori",
    md: "MD: Mohammad Saddique",
    officeLoc: "Khasab Industrial Area Saniya, Musandam, Oman",
    whatsappChat: "WhatsApp Chat",
    directCall: "Direct Call"
  },
  ar: {
    brand: "راشد الخنزوري",
    subBrand: "للتجارة والمقاولات ذ.م.م",
    location: "خصب، مسندم · تأسست عام ١٩٩٨",
    tagline: "نبتكر مساحات تلهمك",
    home: "الرئيسية",
    about: "من نحن",
    services: "خدماتنا",
    projects: "أعمالنا",
    process: "خطوات العمل",
    testimonials: "آراء عملائنا",
    contact: "اتصل بنا",
    quote: "طلب عرض سعر",
    heroDesc: "الدمج المثالي بين الحداثة والبساطة. يقوم فريقنا من المخططين والمهندسين المعماريين بتصميم وتشييد أرقى المشاريع السكنية والتجارية في المنطقة.",
    heroCta: "طلب تسعير",
    heroWork: "استعراض الخدمات",
    explore: "التمرير للاستكشاف",
    aboutTitle: "الدمج المثالي بين الحداثة والبساطة",
    aboutSubtitle: "من نحن",
    aboutDesc: "تأسست في خصب، مسندم، شركة راشد الخنزوري للتجارة والمقاولات ذ.م.م لتصبح قوة إقليمية في مجال المقاولات. نلبي تطلعات كبار المطورين العقاريين والجهات الحكومية.",
    aboutMore: "نصنع القيمة بدءًا من الحفريات الهيكلية المعقدة والأساسات الخرسانية العميقة، وصولاً إلى التسليم النهائي الفاخر وفق معايير الأيزو العالمية والبلديات المحلية.",
    gradeA: "رخصة فئة أولى",
    iso9001: "أيزو ٩٠٠١ معتمد",
    iso45001: "أيزو ٤٥٠٠١ معتمد",
    completed: "مشاريع منجزة",
    years: "سنوات من العطاء",
    workforce: "إجمالي القوة العاملة",
    satisfaction: "نسبة رضا العملاء",
    servicesTitle: "مجموعة متكاملة من الخدمات الإنشائية",
    servicesSubtitle: "خدماتنا",
    servicesDesc: "نمتلك خبرات متكاملة في التخطيط الهيكلي والإنشاء الميكانيكي والمعماري، مدعومة بأحدث الآليات والتقنيات الإنشائية.",
    service1: "تخطيط المشاريع",
    service1Desc: "تقييم شامل للموقع ودراسات الجدوى لتحسين المخططات والجدولة وتأمين السلامة الإنشائية.",
    service2: "إدارة المشاريع",
    service2Desc: "إدارة كاملة للموقع والجدول الزمني والميزانية ومراقبة الجودة من وضع الأساسات حتى الفحص النهائي.",
    service3: "المقاولات العامة",
    service3Desc: "أعمال الهندسة المدنية، الهياكل المعدنية، الأساسات الخرسانية، وأعمال التشطيبات الراقية المتكاملة.",
    service4: "التصميم الداخلي",
    service4Desc: "مخططات مساحية مخصصة، اختيار المواد، وتفاصيل فريدة للفيلات الفاخرة والمكاتب التجارية.",
    service5: "التصميم الخارجي",
    service5Desc: "تصميم واجهات معمارية مميزة، وتنسيق الحدائق بما يتماشى مع الطابع الخليجي الراقي.",
    service6: "التجهيزات والديكور",
    service6Desc: "أعمال التشطيبات الفاخرة، والكسوة الحجرية، وأعمال الخشب المخصصة، وتوزيع الإضاءة المعماري.",
    service7: "المعدات الثقيلة والتأجير",
    service7Desc: "تأجير جي سي بي (JCB)، صهاريج المياه، والرافعات (Loader).",
    projectsTitle: "استعرض أحدث مشاريعنا المنجزة",
    projectsSubtitle: "معرض الأعمال",
    filterAll: "الكل",
    filterRes: "سكني",
    filterComm: "تجاري",
    filterInfra: "البنية التحتية",
    proj1: "قصر الخصب الملكي",
    proj2: "قصر الواجهة البحرية بمسندم",
    proj3: "مجلس خصب الكبير",
    proj4: "فيلات بخاء الجبلية",
    proj5: "قصر مرتفعات خصب",
    proj6: "سلم بخاء الهندسي المخصص",
    loc1: "خصب، مسندم",
    loc2: "شبه جزيرة مسندم",
    loc3: "مدينة خصب",
    loc4: "بخاء، مسندم",
    loc5: "مرتفعات خصب",
    loc6: "بخاء، مسندم",
    processTitle: "خطوات سير العمل في مشاريعنا",
    processSubtitle: "مراحل العمل",
    step1Title: "التخطيط والتحليل",
    step1Desc: "دراسة مخططات الموقع، متطلبات الأحمال، الموافقات البلدية، وتقدير التكلفة الإجمالية.",
    step2Title: "التقدير والتسعير",
    step2Desc: "حساب تكاليف المواد، اللوجستيات، الجداول الزمنية، وصياغة عروض أسعار تفصيلية شفافة.",
    step3Title: "البناء والتسليم",
    step3Desc: "حفر الموقع، الأعمال المدنية، تشييد الهياكل الخرسانية، التشطيبات، والتدقيق النهائي للتسليم.",
    clientsTitle: "شركاء النجاح",
    contactTitle: "فلنعمل معاً. احصل على عرض سعر اليوم.",
    contactSubtitle: "طلب عرض سعر",
    contactDesc: "قدم تفاصيل مشروعك وسيتواصل معك فريقنا الهندسي في غضون ٢٤ ساعة.",
    cName: "الاسم الكريم *",
    cEmail: "البريد الإلكتروني *",
    cCategory: "تصنيف المشروع المطلوبة",
    cScope: "تفاصيل المساحة والمواصفات المطلوبة *",
    cSubmit: "إرسال طلب التسعير",
    office: "المكتب الرئيسي",
    phone: "هاتف المكتب",
    email: "البريد الإلكتروني",
    footerDesc: "بناء مستقبل مسندم بهندسة حائزة على جوائز وحرفية عالية والتزام راسخ بالتميز منذ عام ١٩٩٨.",
    footerLinks: "روابط سريعة",
    footerReg: "مقاول فئة أولى مسجل | غرفة تجارة وصناعة عمان",
    chairman: "رئيس مجلس الإدارة: راشد الخنزوري",
    md: "المدير التنفيذي: محمد صديق",
    officeLoc: "منطقة خصب الصناعية (الصناعية)، مسندم، سلطنة عمان",
    whatsappChat: "تواصل عبر واتساب",
    directCall: "اتصال مباشر"
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const next = prev === "en" ? "ar" : "en";
      document.documentElement.setAttribute("lang", next);
      document.documentElement.setAttribute("dir", next === "ar" ? "rtl" : "ltr");
      return next;
    });
  };

  const t = (key: string) => {
    return TRANSLATIONS[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
