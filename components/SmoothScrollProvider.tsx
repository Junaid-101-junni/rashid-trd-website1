// @ts-nocheck
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 1.6, 
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10*t)), 
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5
    });
    const raf = (t: number) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
  return <>{children}</>;
}
