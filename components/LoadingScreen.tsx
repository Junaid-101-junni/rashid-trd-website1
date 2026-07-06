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
          exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden select-none"
          style={{ background: "#0a0a0a" }}
        >
          {/* ── Fine grid ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px)," +
                "linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px)",
              backgroundSize: "80px 80px",
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
              {/* Logo mark */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#C4A265,#8B6F3E)",
                  padding: "1.5px",
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ background: "#0a0a0a" }}
                >
                  <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontSize: "12px", color: "#C4A265" }}>
                    S
                  </span>
                </div>
              </div>
              <span style={{ fontSize: "10px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(128,128,128,0.5)", fontFamily: "'Inter',sans-serif" }}>
                Studio — 2026
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span style={{ fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(128,128,128,0.3)", fontFamily: "'Inter',sans-serif" }}>
                Loading experience
              </span>
            </motion.div>
          </div>

          {/* ── Center: cycling word ── */}
          <div className="flex-1 flex items-center justify-center">
            <div className="relative text-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={wordIndex}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
                  exit={{   opacity: 0, y: -28, filter: "blur(8px)" }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: "'Instrument Serif',serif",
                    fontStyle: "italic",
                    fontSize: "clamp(3.5rem, 10vw, 8rem)",
                    color: "rgba(245,245,245,0.75)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {WORDS[wordIndex]}
                </motion.p>
              </AnimatePresence>

              {/* Subtle underline accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-px w-24 origin-center"
                style={{ background: "linear-gradient(90deg,transparent,#C4A265,transparent)" }}
              />
            </div>
          </div>

          {/* ── Bottom: counter + details ── */}
          <div className="relative px-6 pb-6">
            {/* Horizontal rule */}
            <div className="mb-5 h-px" style={{ background: "#1c1c1c" }} />

            <div className="flex items-end justify-between">
              {/* Left: status text */}
              <div>
                <p style={{ fontSize: "9px", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(128,128,128,0.25)", fontFamily: "'Inter',sans-serif", marginBottom: "4px" }}>
                  Initializing
                </p>
                <div className="flex items-center gap-2">
                  {["Design system", "Animations", "Assets"].map((label, i) => (
                    <span
                      key={i}
                      className="flex items-center gap-1"
                      style={{ fontSize: "9px", fontFamily: "'Inter',sans-serif" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: count > i * 33 ? "#C4A265" : "#1c1c1c", transition: "background 0.4s" }}
                      />
                      <span style={{ color: count > i * 33 ? "rgba(196,162,101,0.6)" : "rgba(128,128,128,0.2)", transition: "color 0.4s" }}>
                        {label}
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: giant counter */}
              <span
                style={{
                  fontFamily: "'Instrument Serif',serif",
                  fontSize: "clamp(4rem, 12vw, 9rem)",
                  color: "#f5f5f5",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {String(count).padStart(3, "0")}
              </span>
            </div>
          </div>

          {/* ── Progress bar ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: "#1c1c1c" }}>
            <motion.div
              className="h-full origin-left"
              style={{
                scaleX: count / 100,
                background: "linear-gradient(90deg,#C4A265,#8B6F3E)",
                boxShadow: "0 0 12px rgba(196,162,101,0.5), 0 0 24px rgba(196,162,101,0.2)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
