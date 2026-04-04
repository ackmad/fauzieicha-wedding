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
      <div className={`couple-gunungan-bg-vivid ${revealed ? "revealed" : ""}`}>
        <img src="/ornaments/gunungan-jawa.png" alt="" className="gunungan-png-vivid" />
      </div>

      {/* 🌿 TOP DECORATIONS (Symmetrical Balance) */}
      <div className="couple-floral-top-left idle-sway parallax-element-slow" style={{ transformOrigin: 'top left' }}>
        <img src="/florals/floral-frame.png" alt="" />
      </div>
      <div className="couple-floral-top-right idle-sway parallax-element-slow" style={{ transformOrigin: 'top right' }}>
        <img src="/florals/floral-frame.png" alt="" />
      </div>

      {/* 🏛 MAIN CONTENT: TYPOGRAPHY */}
      <div className={`section-inner couple-content-wrap ${revealed ? "revealed" : ""}`}>
        <div className="top-ornament-wrap reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          <img src="/ornaments/top-ornament.png" alt="" className="jawa-top-ornament" />
        </div>
        
        <p className="couple-inviting reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {trans["inviting-text"]}
        </p>
        
        <p className="bismillah-text-vivid reveal-item" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
        
        <div className="couple-names-block">
          <div className="couple-person">
            <div className="name-main-couple reveal-right" style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}>
              {basics.groomName}
            </div>
            <p className="parent-text-couple reveal-up" style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}>
              {families[currentLang].groom}
            </p>
          </div>
          
          <div className="couple-center-divider-vivid reveal-item" style={{ "--reveal-delay": "0.6s" } as React.CSSProperties}>
            <img src="/ornaments/divider-section.png" alt="" className="divider-jawa-png" />
            <div className="center-ampersand">&amp;</div>
            <img src="/ornaments/divider-section.png" alt="" className="divider-jawa-png rotated" />
          </div>
          
          <div className="couple-person">
            <div className="name-main-couple reveal-left" style={{ "--reveal-delay": "0.7s" } as React.CSSProperties}>
              {basics.brideName}
            </div>
            <p className="parent-text-couple reveal-up" style={{ "--reveal-delay": "0.8s" } as React.CSSProperties}>
              {families[currentLang].bride}
            </p>
          </div>
        </div>

        <div className="opening-verse-container reveal-item" style={{ "--reveal-delay": "1.0s" } as React.CSSProperties}>
          <div className="verse-bg-shield"></div>
          <p className="opening-verse-vivid">{trans["verse-text"]}</p>
        </div>
      </div>

      {/* 🌿 BOTTOM DECORATIONS (MASSIVE & SYMMETRICAL) */}
      <div className={`couple-floral-bottom left ${revealed ? "revealed" : ""}`}>
        <img src="/florals/floral-accent-1.png" alt="" />
      </div>
      <div className={`couple-floral-bottom right ${revealed ? "revealed" : ""}`}>
        <img src="/florals/floral-accent-1.png" alt="" />
      </div>
      <div className={`couple-floral-bottom center-back ${revealed ? "revealed" : ""}`}>
        <img src="/florals/floral-accent-2.png" alt="" />
      </div>
    </section>
  );
}
