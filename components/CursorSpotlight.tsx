"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CursorSpotlight() {
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  const smoothX = useSpring(mouseX, { damping: 30, stiffness: 200, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 30, stiffness: 200, mass: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, isVisible]);

  return (
    // @ts-ignore
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-1000"
      style={{
        opacity: isVisible ? 0.4 : 0,
        background: "transparent",
      }}
    >
      {/* @ts-ignore */}
      <motion.div
        className="absolute inset-[-50%] w-[200%] h-[200%] pointer-events-none mix-blend-soft-light"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle 600px at center, rgba(196,162,101,0.15) 0%, transparent 80%)"
        }}
      />
    </motion.div>
  );
}
