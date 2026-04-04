"use client";

import React from "react";

type DividerType =
  | "couple-to-events"      // 1. Couple → Events (floral romantic)
  | "events-to-story"       // 2. Events → Story (wave double layer)
  | "story-to-gallery"      // 3. Story → Gallery (torn paper dramatic)
  | "gallery-to-wishes"     // 4. Gallery → Wishes (soft wave + bokeh)
  | "wishes-to-gift"        // 5. Wishes → Gift (brush stroke + draw)
  | "gift-to-footer";       // 6. Gift → Footer (ornate symmetric close)

interface SectionDividerProps {
  type: DividerType;
}

/* ─── 1. Couple → Events ────────────────────────────────────────
   Torn paper organic + hanging florals left/right
   from: cream/sage → dark-green events bg
─────────────────────────────────────────────────────────────── */
function DividerCoupleEvents() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--deep-green)", marginTop: "-2px" }}>
      <div className="sd-floral-left idle-sway" style={{ transformOrigin: "top left", width: "140px" }}>
        <img src="/florals/floral-accent-1.png" alt="" style={{ transform: "rotate(-150deg) scaleX(-1)" }} />
      </div>
      <div className="sd-floral-right idle-sway" style={{ transformOrigin: "top right", animationDelay: "1s", width: "140px" }}>
        <img src="/florals/floral-accent-1.png" alt="" style={{ transform: "rotate(150deg)" }} />
      </div>

      <svg className="sd-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 L1440,0 L1440,40 Q1080,90 720,40 Q360,-10 0,60 Z" fill="var(--cream)" />
        <path d="M0,50 Q360,-20 720,30 Q1080,80 1440,30" fill="none" stroke="var(--gold-pale)" strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );
}

function DividerEventsStory() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--cream)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 L1440,0 L1440,80 C1100,20 900,100 720,70 C540,40 340,120 0,60 Z" fill="var(--deep-green)" />
        <path d="M0,5 C340,65 540,-15 720,15 C900,45 1100,-35 1440,25" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.3" />
        
        <g transform="translate(720, 60)" opacity="0.8">
          <circle cx="0" cy="0" r="4" fill="var(--gold)"/>
          <line x1="-30" y1="0" x2="-8" y2="0" stroke="var(--gold)" strokeWidth="1"/>
          <line x1="8" y1="0" x2="30" y2="0" stroke="var(--gold)" strokeWidth="1"/>
        </g>
      </svg>
    </div>
  );
}

function DividerStoryGallery() {
  return (
    <div className="sd reveal-blur" style={{ background: "var(--cream)", minHeight: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
          <line x1="10%" y1="30" x2="40%" y2="30" stroke="var(--gold)" strokeWidth="1" opacity="0.3" strokeDasharray="4 6" />
          <line x1="60%" y1="30" x2="90%" y2="30" stroke="var(--gold)" strokeWidth="1" opacity="0.3" strokeDasharray="4 6" />
          <g transform="translate(720, 30)">
            <polygon points="0,-12 8,0 0,12 -8,0" fill="var(--gold)" opacity="0.5"/>
            <polygon points="0,-6 4,0 0,6 -4,0" fill="var(--gold)"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

function DividerGalleryWishes() {
  return (
    <div className="sd reveal-up" style={{ background: "#E8EFEA", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 90" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 L1440,0 L1440,40 Q1080,90 720,40 Q360,-10 0,60 Z" fill="var(--cream)" />
      </svg>
    </div>
  );
}

function DividerWishesGift() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--cream)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 L1440,0 L1440,60 Q1080,-10 720,40 Q360,90 0,40 Z" fill="#E8EFEA" />
        <g transform="translate(720, 35)">
          <path d="M0,4 C-4,10 -12,10 -12,4 C-12,-4 0,-12 0,-12 C0,-12 12,-4 12,4 C12,10 4,10 0,4 Z" fill="var(--gold)" opacity="0.6" transform="rotate(180)"/>
        </g>
        <line x1="580" y1="35" x2="680" y2="35" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" className="sd-draw-left"/>
        <line x1="760" y1="35" x2="860" y2="35" stroke="var(--gold)" strokeWidth="0.8" opacity="0.4" className="sd-draw-right"/>
      </svg>
    </div>
  );
}

function DividerGiftFooter() {
  return (
    <div className="sd reveal-up" style={{ background: "#1a2e20", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 L1440,0 L1440,60 C1000,-20 440,-20 0,60 Z" fill="var(--cream)" />
        <path d="M300,50 C600,0 840,0 1140,50" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="5 5" opacity="0.5"/>
        <g transform="translate(720, 10)">
          <polygon points="0,-15 10,0 0,15 -10,0" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.8"/>
          <circle cx="0" cy="0" r="3" fill="var(--gold)"/>
        </g>
      </svg>
    </div>
  );
}

export default function SectionDivider({ type }: SectionDividerProps) {
  switch (type) {
    case "couple-to-events":    return <DividerCoupleEvents />;
    case "events-to-story":     return <DividerEventsStory />;
    case "story-to-gallery":    return <DividerStoryGallery />;
    case "gallery-to-wishes":   return <DividerGalleryWishes />;
    case "wishes-to-gift":      return <DividerWishesGift />;
    case "gift-to-footer":      return <DividerGiftFooter />;
    default:                    return null;
  }
}


