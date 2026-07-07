// @ts-nocheck
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealProps { children: ReactNode; delay?: number; className?: string; y?: number; }

export function RevealUp({ children, delay = 0, className = "", y = 30 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      {...{ className }}
    >
      {children}
    </motion.div>
  );
}

export function RevealClip({ children, delay = 0, className = "" }: RevealProps) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      {...{ className }}
    >
      {children}
    </motion.div>
  );
}

interface SplitTextProps { text: string; className?: string; delay?: number; stagger?: number; splitBy?: "word" | "char"; }
export function SplitText({ text, className = "", delay = 0, stagger = 0.03, splitBy = "word" }: SplitTextProps) {
  const elements = splitBy === "word" ? text.split(" ") : text.split("");
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      }
    }
  };

  const item = {
    hidden: { y: "120%", opacity: 0, rotateZ: splitBy === "char" ? 5 : 2, filter: "blur(8px)" },
    show: { 
      y: "0%", 
      opacity: 1, 
      rotateZ: 0, 
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <motion.span 
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className={`inline-flex flex-wrap overflow-hidden ${className} ${splitBy === "word" ? "gap-x-[0.25em]" : ""}`}
    >
      {elements.map((el, i) => (
        <span key={i} className="inline-block overflow-hidden relative">
          <motion.span
            variants={item}
            className="inline-block"
            style={{ paddingBottom: "0.1em" }}
          >
            {el === " " && splitBy === "char" ? "\u00A0" : el}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

interface CounterProps { to: number; duration?: number; suffix?: string; className?: string; }
export function AnimCounter({ to, duration = 1800, suffix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as any, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    const el = ref.current;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = `${Math.round(eased * to)}${suffix}`;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, to, duration, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
