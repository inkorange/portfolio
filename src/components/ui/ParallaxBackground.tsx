"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/layout.module.scss";

export default function ParallaxBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      rafId = requestAnimationFrame(() => {
        if (backgroundRef.current) {
          const scrollY = window.scrollY;
          // Move background at 40% speed in same direction as scroll for parallax effect
          const parallaxSpeed = 0.4;
          const translateY = -(scrollY * parallaxSpeed);

          backgroundRef.current.style.transform = `translate3d(0, ${translateY}px, 0)`;
        }
      });
    };

    // Initial position
    handleScroll();

    // Add scroll listener with passive option for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return <div ref={backgroundRef} className={styles.backgroundImage} />;
}
