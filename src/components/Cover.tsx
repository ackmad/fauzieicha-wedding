"use client";

import React, { useEffect, useRef } from "react";
import { WeddingData } from "../types";
import { OrnamenJawa } from "./Icons";
import GoldMonogram from "./GoldMonogram";
import FlowerRain from "./FlowerRain";

interface CoverProps {
  isCoverRemoved: boolean;
  invitationOpened: boolean;
  openInvitation: () => void;
  basics: WeddingData["basics"];
  trans: Record<string, string>;
}

export default function Cover({ isCoverRemoved, invitationOpened, openInvitation, basics, trans }: CoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isCoverRemoved || invitationOpened) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      
      containerRef.current.style.setProperty('--mouse-x', x.toString());
      containerRef.current.style.setProperty('--mouse-y', y.toString());
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (!containerRef.current) return;
      
      // Beta (x-axis rotation) and Gamma (y-axis rotation) 
      const beta = e.beta ? Math.min(Math.max(e.beta, -45), 45) / 45 : 0;
      const gamma = e.gamma ? Math.min(Math.max(e.gamma, -45), 45) / 45 : 0;
      
      containerRef.current.style.setProperty('--mouse-y', (beta * 1.5).toString());
      containerRef.current.style.setProperty('--mouse-x', (gamma * 1.5).toString());
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation as EventListener);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation as EventListener);
    };
  }, [isCoverRemoved, invitationOpened]);

  if (isCoverRemoved) return null;
  
  return (
    <div id="cover" className={invitationOpened ? 'opening' : ''} ref={containerRef}>
      <FlowerRain />
      <div id="cover-bg">
        <img id="cover-hero-img" src="/backgrounds/hero-background.webp" alt="Wedding Background" />
      </div>
      <div id="cover-batik">
        <img src="/backgrounds/batik-pattern.webp" alt="" />
      </div>
      <div id="cover-overlay"></div>
      <div id="cover-leaves" className="idle-float-slow">
        <img src="/effects/parallax-leaves.webp" alt="" id="parallax-leaves-img" />
      </div>
      <div id="cover-glow" className="idle-pulse">
        <img src="/effects/light-glow.webp" alt="" />
      </div>
      <div id="cover-floral-left" className="idle-sway" style={{ transformOrigin: 'top left' }}>
        <img src="/decorations/dekor-main-kiri.webp" alt="Dekorasi Kiri" />
      </div>
      <div id="cover-floral-right" className="idle-sway" style={{ transformOrigin: 'top right' }}>
        <img src="/decorations/dekor-main-kanan.webp" alt="Dekorasi Kanan" />
      </div>
      <div id="cover-content">
        <div id="cover-top-ornament">
          <OrnamenJawa color="var(--gold)" className="ornament-svg" />
        </div>
        <div id="cover-text-block">
          <GoldMonogram variant="hero" style={{ margin: "0 auto 18px" }} />
          <p className="cover-subtitle">{trans["the-wedding-of"]}</p>
          <div className="cover-divider-line"></div>
          <div className="cover-bride">{basics.brideNickname}</div>
          <div className="cover-and">&amp;</div>
          <div className="cover-groom">{basics.groomNickname}</div>
          
          <div 
            className="cover-hashtag-wrap cover-hashtag-animate" 
            style={{ 
              marginTop: "25px", 
              marginBottom: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <span style={{ 
              fontFamily: "var(--font-script)", 
              fontSize: "1.2rem", 
              letterSpacing: "0.08em", 
              fontWeight: 400,
              fontStyle: "italic",
              color: "var(--gold-pale)",
              opacity: 0.85,
              textShadow: "0 2px 10px rgba(0,0,0,0.3)"
            }}>
              {basics.hashtag}
            </span>
          </div>

          <p className="cover-date">{basics.weddingDate}</p>
        </div>
        <div id="cover-btn-wrap">
          <div className="cover-btn-divider"></div>
          <button id="open-btn" onClick={openInvitation}>{trans["open-btn-text"]}</button>
        </div>
      </div>
    </div>
  );
}
