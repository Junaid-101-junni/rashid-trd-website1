// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WORDS = ["Design", "Build", "Elevate"];

interface Props { onComplete: () => void; }

export default function LoadingScreen({ onComplete }: Props) {
  const [count, setCount]       = useState(0);
  const [wordIndex, setWord]    = useState(0);
  const [phase, setPhase]       = useState<"counting" | "exit">("counting");
  const startRef                = useRef<number | null>(null);
  const rafRef                  = useRef<number>(0);
  const DURATION                = 2800;

  // Word cycling
  useEffect(() => {
    const iv = setInterval(() => setWord(i => (i + 1) % WORDS.length), 900);
    return () => clearInterval(iv);
  }, []);

  // RAF count 0→100
  useEffect(() => {
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const prog = Math.min((ts - startRef.current) / DURATION, 1);
      const eased = 1 - Math.pow(1 - prog, 2.5);
      setCount(Math.floor(eased * 100));
      if (prog < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(() => {
          setPhase("exit");
          setTimeout(onComplete, 900);
        }, 320);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === "counting" && (
        <motion.div
          key="loader"
          exit={{ y: "-100vh", opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden select-none origin-top"
          style={{ background: "#0a0a0a" }}
        >
          {/* ── Fine grid ── */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* ── Top bar ── */}
          <div className="flex items-center justify-between px-6 pt-6">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-[#C4A265] to-[#8B6F3E] p-[1.5px]">
                <div className="w-full h-full rounded-full flex items-center justify-center bg-[#0a0a0a]">
                  <span className="font-display italic text-[12px] text-accent">R</span>
                </div>
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-muted font-mono">
                Est. 1998
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C4A265] animate-pulse" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-muted/60 font-mono">
                Initiating sequence
              </span>
            </motion.div>
          </div>

          {/* ── Center: Cinematic Text ── */}
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="relative overflow-hidden px-4">
              <motion.h1
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-display italic text-[clamp(2.5rem,8vw,6rem)] text-transparent uppercase tracking-tight text-center leading-none"
                style={{
                  WebkitTextStroke: "1px rgba(196,162,101,0.3)",
                }}
              >
                Rashid Al Khanzori
              </motion.h1>
              
              <motion.h1
                initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                animate={{ clipPath: `inset(${100 - count}% 0% 0% 0%)` }}
                transition={{ duration: 0.1 }}
                className="font-display italic text-[clamp(2.5rem,8vw,6rem)] text-accent uppercase tracking-tight text-center leading-none absolute top-0 left-4 right-4"
                style={{
                  filter: "drop-shadow(0 0 20px rgba(196,162,101,0.4))"
                }}
              >
                Rashid Al Khanzori
              </motion.h1>
            </div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-muted font-mono text-[10px] uppercase tracking-[0.4em] mt-8"
            >
              Trading & Contracting L.L.C
            </motion.p>
          </div>

          {/* ── Bottom: counter + details ── */}
          <div className="relative px-6 pb-6">
            <div className="mb-5 h-px bg-white/5" />

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-muted/50 font-mono mb-2">
                  System Status
                </p>
                <div className="flex items-center gap-2">
                  {["Geometry", "Shaders", "Assets"].map((label, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-wider"
                    >
                      <span
                        className="w-1 h-1 rounded-full transition-colors duration-400"
                        style={{ background: count > i * 33 ? "#C4A265" : "rgba(255,255,255,0.1)" }}
                      />
                      <span className="transition-colors duration-400" style={{ color: count > i * 33 ? "rgba(196,162,101,0.8)" : "rgba(255,255,255,0.2)" }}>
                        {label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Giant counter */}
              <div className="flex items-start">
                <span className="font-display italic text-[clamp(3rem,10vw,7rem)] text-white leading-none tracking-tighter font-variant-numeric:tabular-nums">
                  {String(count).padStart(3, "0")}
                </span>
                <span className="text-accent text-sm md:text-xl font-mono mt-2 md:mt-4">%</span>
              </div>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
