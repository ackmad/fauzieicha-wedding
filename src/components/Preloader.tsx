"use client";

import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [percent, setPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Simulate natural loading progress
    const duration = 2400; // 2.4s total for a premium feel
    const interval = 20;   // Update every 20ms
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
          // Remove from DOM after transition finishes
          setTimeout(() => setShouldRender(false), 1200);
        }, 600);
      } else {
        setPercent(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className={`preloader-overlay ${isVisible ? "visible" : "exit"}`}>
      {/* Background Textures */}
      <div className="preloader-bg-pattern"></div>
      <div className="preloader-bg-vignette"></div>
      
      {/* Subtle Dust Particles */}
      <div className="gold-dust-container">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="gold-dust-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${10 + Math.random() * 15}s`
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
        <img src="/florals/floral-accent-1.png" alt="" />
      </div>
      <div className="preloader-ornament bottom-right">
        <img src="/florals/floral-accent-1.png" alt="" />
      </div>
    </div>
  );
}
