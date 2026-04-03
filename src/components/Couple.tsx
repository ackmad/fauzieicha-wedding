"use client";

import React, { useEffect, useRef, useState } from "react";
import { WeddingData } from "../types";

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
      {/* BASE LAYERS */}
      <div className="couple-bg-pattern"></div>
      
      {/* WOW MOMENT: MASSIVE GUNUNGAN (Behind content) */}
      <div className={`couple-gunungan-wow ${revealed ? "revealed" : ""}`} style={{ zIndex: 1 }}>
        <img src="/gunungan-jawa.png" alt="" className="gunungan-reveal-img" />
      </div>

      {/* AMBIENT GLOW */}
      <div className="couple-glow-center" style={{ zIndex: 2 }}>
        <img src="/light-glow.png" alt="" />
      </div>

      {/* PARALLAX ELEMENTS */}
      <div className="parallax-leaves-wrap" style={{ zIndex: 5 }}>
        <img src="/parallax-leaves.png" alt="" className="parallax-leaf-item" style={{ top: "5%", left: "0", opacity: 0.3, width: "150px" }} />
        <img src="/parallax-leaves.png" alt="" className="parallax-leaf-item" style={{ top: "40%", right: "-20px", opacity: 0.2, width: "120px", transform: "scaleX(-1)" }} />
      </div>

      {/* MAIN CONTENT (On top) */}
      <div className={`section-inner couple-content-wrap ${revealed ? "revealed" : ""}`} style={{ zIndex: 10 }}>
        <p className="couple-inviting reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>{trans["inviting-text"]}</p>
        <p className="bismillah-text reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</p>
        
        <div className="couple-main-names">
          <div className="name-main reveal-item" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>{basics.groomName}</div>
          <div className="couple-and-divider reveal-item" style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}>
            <img src="/ornamen-jawa.png" alt="&" className="name-divider-img" style={{ maxWidth: "120px" }} />
          </div>
          <div className="name-main reveal-item" style={{ "--reveal-delay": "0.7s" } as React.CSSProperties}>{basics.brideName}</div>
        </div>

        <div className="couple-parents-wrap">
          <p className="parent-text reveal-item" style={{ "--reveal-delay": "0.9s" } as React.CSSProperties}>{families[currentLang].groom}</p>
          <p className="parent-text reveal-item" style={{ "--reveal-delay": "1.1s" } as React.CSSProperties}>{families[currentLang].bride}</p>
        </div>

        <p className="opening-verse reveal-item" style={{ "--reveal-delay": "1.3s" } as React.CSSProperties}>{trans["verse-text"]}</p>
      </div>

      {/* FLORAL OVERLAYS (Foreground) */}
      <div className={`couple-floral-accent left ${revealed ? "revealed" : ""}`} style={{ zIndex: 20 }}>
        <img src="/floral-accent-1.png" alt="" />
      </div>
      <div className={`couple-floral-accent right ${revealed ? "revealed" : ""}`} style={{ zIndex: 20 }}>
        <img src="/floral-accent-2.png" alt="" />
      </div>
    </section>
  );
}
