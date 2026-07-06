// @ts-nocheck
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const PLANS = [
  {
    name: "Architectural Concept",
    desc: "Perfect for initial zoning, layout designs, and luxury villa concept render packages.",
    price: { monthly: 150, yearly: 120 }, // OMR
    features: [
      "2D Space Planning & Layouts",
      "Standard 3D Exterior Renderings",
      "Material Board Consultation",
      "Local Authority Pre-check (Musandam)",
      "2 Major Revision Rounds"
    ],
    cta: "Start Concept Plan",
    popular: false
  },
  {
    name: "Premium Turnkey Design",
    desc: "Full detailed engineering & interior fit-out plans ready for structural submission.",
    price: { monthly: 450, yearly: 380 },
    features: [
      "Everything in Concept Package",
      "Full MEP & Structural Drawings",
      "Complete Photorealistic 3D Walkthroughs",
      "BIM Model Coordination",
      "Municipality Submission Documents",
      "Site Inspection Visits (2 per month)"
    ],
    cta: "Select Premium Plan",
    popular: true
  },
  {
    name: "EPC Project Management",
    desc: "Complete architectural, structural, procurement and dedicated project management retainer.",
    price: { monthly: 990, yearly: 850 },
    features: [
      "Everything in Premium Package",
      "Dedicated Project Engineering Lead",
      "Material Procurement Oversight",
      "Daily Construction Logs & Cam Access",
      "Strict QA/QC Inspections (ISO standards)",
      "Unlimited Revisions & VIP Support"
    ],
    cta: "Contact Executive Lead",
    popular: false
  }
];

export default function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section id="pricing" className="relative py-32 md:py-48 bg-[#0a0a0a] overflow-hidden">
      {/* Background ambient light */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)"
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="section-tag justify-center"><span>Flexible Packages</span></div>
            <h2 className="display heading-lg font-black text-white tracking-tighter">
              Project <span className="gold-text">Plans</span>
            </h2>
            <p className="body-sm mt-5 max-w-md mx-auto">
              Transparent, professional packaging tailored for architectural planning, structural design, and EPC engineering management.
            </p>
          </motion.div>

          {/* Toggle */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex items-center gap-3 mt-10 bg-white/[0.03] border border-white/[0.07] p-1 rounded-full relative"
          >
            <button
              onClick={() => setBilling("monthly")}
              className={`relative z-10 px-6 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 ${
                billing === "monthly" ? "text-[#0a0a0a]" : "text-white/40 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling("yearly")}
              className={`relative z-10 px-6 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors duration-300 ${
                billing === "yearly" ? "text-[#0a0a0a]" : "text-white/40 hover:text-white"
              }`}
            >
              Yearly
            </button>
            
            {/* Slider pill */}
            <motion.div
              layout
              className="absolute top-1 bottom-1 left-1 bg-gradient-to-r from-[#d4af37] to-[#e8c670] rounded-full"
              style={{
                width: billing === "monthly" ? "92px" : "80px",
                x: billing === "monthly" ? 0 : 95
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((plan, i) => {
            const currentPrice = billing === "monthly" ? plan.price.monthly : plan.price.yearly;
            const savings = billing === "yearly" ? (plan.price.monthly - plan.price.yearly) * 12 : 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.9, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col rounded-sm p-8 md:p-10 cursor-default card-hover ${
                  plan.popular 
                    ? "bg-[#141414] border-2 border-[#d4af37]/60 shadow-[0_30px_60px_rgba(212,175,55,0.05)]" 
                    : "surface"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#d4af37] to-[#e8c670] text-[#0a0a0a] text-[9px] uppercase tracking-widest font-black px-4 py-1.5 rounded-sm shadow-md">
                    Most Selected
                  </span>
                )}

                {/* Plan Metadata */}
                <div className="mb-8">
                  <h3 className="font-bold text-white text-xl mb-3">{plan.name}</h3>
                  <p className="text-white/40 text-xs leading-relaxed min-h-[48px]">{plan.desc}</p>
                </div>

                {/* Price Display */}
                <div className="mb-8 pb-8 border-b border-white/[0.05]">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[12px] font-bold text-white/40 uppercase tracking-widest">OMR</span>
                    <span className="display font-black text-5xl md:text-6xl text-white tracking-tighter">
                      {currentPrice}
                    </span>
                    <span className="text-xs text-white/30 lowercase">/ month</span>
                  </div>
                  {billing === "yearly" && (
                    <p className="text-[#d4af37] text-[10px] uppercase tracking-wider font-semibold mt-3">
                      Save OMR {savings} annually
                    </p>
                  )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={10} className="text-[#d4af37]" />
                      </div>
                      <span className="text-white/60 text-sm leading-tight">{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action button */}
                <a
                  href="#contact"
                  className={`w-full justify-center ${
                    plan.popular ? "btn-gold" : "btn-ghost"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={14} className="ml-1" />
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
