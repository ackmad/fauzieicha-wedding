"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);

  useEffect(() => {
    setIsMounted(true);
    // Generate particles ONLY on client to avoid hydration mismatch
    const p = [...Array(6)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${8 + Math.random() * 10}s`
    }));
    setParticles(p);

    // Simulate natural loading progress — faster = better perceived performance
    const duration = 1800; // 1.8s total
    const interval = 20;
    const step = 100 / (duration / interval);
    
    let current = 0;
    const timer = setInterval(() => {
      current += step + (Math.random() * 0.5); // Add slight variability for natural feel
      if (current >= 100) {
        current = 100;
        setPercent(100);
        clearInterval(timer);
        
        // Brief pause at 100% before transition
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
          // Remove from DOM after transition finishes
          setTimeout(() => setShouldRender(false), 800);
        }, 400);
      } else {
        setPercent(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <div className={`preloader-overlay ${isVisible ? "visible" : "exit"}`}>
      {/* Background Textures */}
      <div className="preloader-bg-pattern"></div>
      <div className="preloader-bg-vignette"></div>
      
      {/* Subtle Dust Particles */}
      <div className="gold-dust-container">
        {isMounted && particles.map((p, i) => (
          <div key={i} className="gold-dust-particle" style={{
            left: p.left,
            top: p.top,
            animationDelay: p.delay,
            animationDuration: p.duration
          } as React.CSSProperties}></div>
        ))}
      </div>

      <div className="preloader-content">
        {/* Monogram Section */}
        <div className="preloader-monogram-wrap reveal-zoom revealed">
          <div className="monogram-glow"></div>
          <img 
            src="/icons/monogram-CF.svg" 
            alt="CF Monogram" 
            className="monogram-svg idle-float-slow"
          />
          {/* Circular Progress surrounding monogram */}
          <svg className="circular-progress-svg" viewBox="0 0 100 100">
            <circle className="circle-bg" cx="50" cy="50" r="48" />
            <circle 
              className="circle-bar" 
              cx="50" cy="50" r="48" 
              style={{ strokeDashoffset: 301.59 - (301.59 * percent) / 100 } as React.CSSProperties}
            />
          </svg>
        </div>

        {/* Text & Percentage */}
        <div className="preloader-info">
          <div className="preloader-percent">{percent}%</div>
          <div className="preloader-bar-container">
            <div className="preloader-bar-fill" style={{ width: `${percent}%` }}>
              <div className="bar-shimmer"></div>
            </div>
          </div>
          <div className="preloader-text">Dipersiapkan dengan Cinta</div>
        </div>
      </div>
      
      {/* Decorative Ornaments */}
      <div className="preloader-ornament top-left">
        <img src="/florals/floral-accent-1.webp" alt="" />
      </div>
      <div className="preloader-ornament bottom-right">
        <img src="/florals/floral-accent-1.webp" alt="" />
      </div>
    </div>
  );
}
