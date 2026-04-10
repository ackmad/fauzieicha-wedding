import React, { useEffect, useRef, useState } from "react";
import { WeddingData } from "../types";
import { GununganSVG, OrnamenJawa } from "./Icons";

interface CoupleProps {
  basics: WeddingData["basics"];
  families: WeddingData["families"];
  currentLang: "id" | "en";
  trans: Record<string, string>;
}

export default function Couple({ basics, families, currentLang, trans }: CoupleProps) {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setRevealed(true);
    }, { threshold: 0.2 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="section-couple" ref={sectionRef}>
      {/* 🔴 BACKGROUND LAYERS & DEPTH */}
      <div className="couple-bg-depth"></div>
      <div className="couple-bg-pattern"></div>
      <div className="couple-noise-overlay"></div>
      
      {/* 🟡 AMBIENT FLOW: RADIAL GLOW & GUNUNGAN */}
      <div className="couple-radial-glow idle-pulse"></div>
      <div className="parallax-bg" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <div className={`couple-gunungan-bg-vivid ${revealed ? "revealed" : ""}`}>
          <img src="/ornaments/gunungan-jawa.webp" alt="" className="gunungan-png-vivid" />
        </div>
      </div>

      {/* 🌿 TOP DECORATIONS (Symmetrical Balance) */}
      <div className="parallax-element-slow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
        <div className="couple-floral-top-left idle-sway" style={{ transformOrigin: 'top left' }}>
          <img src="/decorations/dekor-main-kiri.webp" alt="" />
        </div>
        <div className="couple-floral-top-right idle-sway-opposite" style={{ transformOrigin: 'top right' }}>
          <img src="/decorations/dekor-main-kanan.webp" alt="" />
        </div>
      </div>

      {/* 🏛 MAIN CONTENT: TYPOGRAPHY */}
      <div className={`section-inner couple-content-wrap ${revealed ? "revealed" : ""}`}>
        <div className="top-ornament-wrap reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          <img src="/ornaments/top-ornament.webp" alt="" className="jawa-top-ornament" />
        </div>
        
        <p className="couple-inviting reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {trans["inviting-text"]}
        </p>
        
        <p className="bismillah-text-vivid reveal-item" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        
        <div className="couple-names-block" style={{ willChange: 'transform, opacity' }}>
          {/* BRIDE BLOCK FIRST */}
          <div className="couple-person">
            <div className="name-main-couple reveal-right" style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}>
              {basics.brideName.includes(',') ? (
                <div className="name-with-title-row">
                  <span className="main-name">{basics.brideName.split(',')[0].trim()}</span>
                  <span className="name-comma">,</span>
                  <span className="name-title">{basics.brideName.split(',').slice(1).join(',').trim()}</span>
                </div>
              ) : basics.brideName}
            </div>
            <p className="parent-text-couple reveal-up" style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}>
              {families[currentLang].bride}
            </p>
          </div>
          
          <div className="couple-center-divider-vivid reveal-item" style={{ "--reveal-delay": "0.6s", willChange: 'transform' } as React.CSSProperties}>
            <img src="/ornaments/divider-section.png" alt="" className="divider-jawa-png" loading="lazy" />
            <div className="center-ampersand">&amp;</div>
            <img src="/ornaments/divider-section.png" alt="" className="divider-jawa-png rotated" loading="lazy" />
          </div>
          
          {/* GROOM BLOCK SECOND */}
          <div className="couple-person">
            <div className="name-main-couple reveal-left" style={{ "--reveal-delay": "0.7s" } as React.CSSProperties}>
              {basics.groomName.includes(',') ? (
                <div className="name-with-title-row">
                  <span className="main-name">{basics.groomName.split(',')[0].trim()}</span>
                  <span className="name-comma">,</span>
                  <span className="name-title">{basics.groomName.split(',').slice(1).join(',').trim()}</span>
                </div>
              ) : basics.groomName}
            </div>
            <p className="parent-text-couple reveal-up" style={{ "--reveal-delay": "0.8s" } as React.CSSProperties}>
              {families[currentLang].groom}
            </p>
          </div>
        </div>

        <div className="opening-verse-container reveal-item" style={{ "--reveal-delay": "1.0s" } as React.CSSProperties}>
          <div className="verse-bg-shield"></div>
          <p className="opening-verse-vivid">{trans["verse-text"]}</p>
        </div>
      </div>

      {/* 🌿 BOTTOM DECORATIONS (MASSIVE & SYMMETRICAL) */}
      <div className="parallax-element-fast" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
        <div className={`couple-floral-bottom left ${revealed ? "revealed" : ""}`}>
          <img src="/florals/floral-accent-1.webp" alt="" />
        </div>
        <div className={`couple-floral-bottom right ${revealed ? "revealed" : ""}`}>
          <img src="/florals/floral-accent-1.webp" alt="" />
        </div>
      </div>
      <div className="parallax-element-slow" style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 4 }}>
        <div className={`couple-floral-bottom center-back ${revealed ? "revealed" : ""}`}>
          <img src="/florals/floral-accent-2.webp" alt="" />
        </div>
      </div>
    </section>
  );
}
