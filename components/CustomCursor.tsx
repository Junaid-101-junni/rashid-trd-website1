import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let mouseX = -100, mouseY = -100;
    let dotX = -100, dotY = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onEnter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a, button, [data-cursor='pointer']")) {
        gsap.to(dot, { scale: 4, duration: 0.3, ease: "power2.out" });
      } else {
        gsap.to(dot, { scale: 1, duration: 0.3, ease: "power2.out" });
      }
    };

    const loop = () => {
      dotX += (mouseX - dotX) * 0.15;
      dotY += (mouseY - dotY) * 0.15;
      gsap.set(dot, { x: dotX, y: dotY });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div 
      ref={dotRef} 
      className="fixed top-0 left-0 w-4 h-4 bg-white rounded-full pointer-events-none z-[99999] mix-blend-difference will-change-transform"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
