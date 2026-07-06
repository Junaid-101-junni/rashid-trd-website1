// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function MagneticCursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useMotionValue(-100);
  const ry = useMotionValue(-100);
  const sx = useSpring(rx, { stiffness: 200, damping: 22, mass: 0.5 });
  const sy = useSpring(ry, { stiffness: 200, damping: 22, mass: 0.5 });

  const [cursorState, setCursorState] = useState<"default"|"hover"|"text">("default");

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX - 2.5);
      my.set(e.clientY - 2.5);
      rx.set(e.clientX - 18);
      ry.set(e.clientY - 18);
    };

    const enter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='hover']")) setCursorState("hover");
      else if (t.closest("p, h1, h2, h3, h4, span, [data-cursor='text']")) setCursorState("text");
      else setCursorState("default");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", enter);
    };
  }, []);

  return (
    <>
      {/* Dot — follows exactly */}
      <motion.div
        style={{ x: mx, y: my }}
        className="cursor-dot fixed top-0 left-0 z-[99999] pointer-events-none hidden lg:block"
        animate={{
          scale: cursorState === "hover" ? 0 : 1,
          opacity: cursorState === "hover" ? 0 : 1,
        }}
        transition={{ duration: 0.18 }}
      />

      {/* Ring — spring-follows */}
      <motion.div
        style={{ x: sx, y: sy }}
        className={`cursor-ring fixed top-0 left-0 z-[99998] pointer-events-none hidden lg:block transition-[transform,background,border-color] duration-300 ${
          cursorState === "hover" ? "cursor-hover" : cursorState === "text" ? "cursor-text" : ""
        }`}
      />

      {/* Gold glow trail — ultra subtle magic effect */}
      <motion.div
        style={{ x: sx, y: sy }}
        className="fixed top-0 left-0 z-[99996] pointer-events-none hidden lg:block"
        animate={{ opacity: cursorState === "hover" ? 0.6 : 0.2 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="w-16 h-16 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)",
            filter: "blur(8px)"
          }}
        />
      </motion.div>
    </>
  );
}
