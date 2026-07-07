// @ts-nocheck
"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import QuickConnectHub from "@/components/QuickConnectHub";
import AmbientOrbs from "@/components/AmbientOrbs";
import LoadingScreen from "@/components/LoadingScreen";
import CursorSpotlight from "@/components/CursorSpotlight";
import HeroSection from "@/components/Sections/HeroSection";
import MarqueeStrip from "@/components/MarqueeStrip";
import AboutSection from "@/components/Sections/AboutSection";
import ExpertiseSection from "@/components/Sections/ExpertiseSection";
import ProjectsSection from "@/components/Sections/ProjectsSection";
import ProcessSection from "@/components/Sections/ProcessSection";
import WhyUsSection from "@/components/Sections/WhyUsSection";
import ContactSection from "@/components/Sections/ContactSection";
import Footer from "@/components/Sections/Footer";

const SmoothScroll = dynamic(() => import("@/components/SmoothScrollProvider"), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLoadingComplete = useCallback(() => {
    setIsLoaded(true);
    import("@/lib/audio").then((m) => m.playWhoosh());
  }, []);

  useEffect(() => {
    const unlockAudio = () => {
      import("@/lib/audio").then((m) => m.initAudio());
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && <LoadingScreen onComplete={handleLoadingComplete} />}
      </AnimatePresence>

      <CustomCursor />
      <CursorSpotlight />
      
      <SmoothScroll>
        {/* @ts-ignore */}
        <motion.div
          ref={containerRef as any}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isLoaded ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ transformOrigin: "top" }}
          {...{ className: "relative min-h-screen bg-surface" }}
        >
          <AmbientOrbs />
          <Navbar />

          <main className="relative z-10">
            <HeroSection />
            <MarqueeStrip />
            
            <AboutSection />
            
            <div className="section-divider" />
            <ExpertiseSection />
            
            <div className="section-divider" />
            <ProjectsSection />
            
            <div className="section-divider" />
            <ProcessSection />
            
            <div className="section-divider" />
            <WhyUsSection />
            
            <div className="section-divider" />
            <ContactSection />
          </main>

          <Footer />
        </motion.div>
        <QuickConnectHub />
      </SmoothScroll>
    </>
  );
}
