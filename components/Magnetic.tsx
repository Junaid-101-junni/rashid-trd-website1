// @ts-nocheck
import type { ReactNode, CSSProperties } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Magnetic({ children, strength = 0.3, className = "", style }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 200, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 200, damping: 18, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set((e.clientX - cx) * strength);
    rawY.set((e.clientY - cy) * strength);
  };

  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  const onMouseEnter = () => {
    import("@/lib/audio").then(m => m.playTick());
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, ...style }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </motion.div>
  );
}
