"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrubVideo({ src, className }: { src: string, className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // We must wait for the metadata to load to know the duration
    const onLoadedMetadata = () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
        onUpdate: (self) => {
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }
        }
      });
    };

    if (video.readyState >= 1) {
      onLoadedMetadata();
    } else {
      video.addEventListener("loadedmetadata", onLoadedMetadata);
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full h-full overflow-hidden ${className || ""}`}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      />
    </div>
  );
}
