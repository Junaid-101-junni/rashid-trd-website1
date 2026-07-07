// @ts-nocheck
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [pct, setPct]   = useState(0);
  const [done, setDone] = useState(false);
  const t = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    t.current = setInterval(() => {
      setPct(p => {
        const next = p + Math.random() * 14 + 3;
        if (next >= 100) {
          clearInterval(t.current!);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 650); }, 250);
          return 100;
        }
        return next;
      });
    }, 60);
    return () => clearInterval(t.current!);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#0f0f0f] flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="mb-16 relative h-20 w-auto flex items-center justify-center"
          >
            {/* Premium Glowing Aura */}
            <div className="absolute inset-0 bg-white/50 blur-[30px] rounded-full scale-[1.5] z-0"></div>
            <img 
              src="/assets/images/logo.png" 
              alt="Rashid Al Khanzori Logo" 
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
            />
          </motion.div>

          {/* Progress */}
          <div className="w-56 h-[1px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 loader-bar"
              style={{ width: `${pct}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <p className="eyebrow mt-4 text-white/25">{Math.round(pct)}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
