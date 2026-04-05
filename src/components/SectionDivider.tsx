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

const TornPaperFilter = ({ id, scale = 10 }: { id: string, scale?: number }) => (
  <filter id={id} x="-10%" y="-20%" width="120%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="4" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
  </filter>
);

  /* ─── 1. Couple → Events ────────────────────────────────────────
   Deep Green (#2D5A3D) to Dark Sage (#19281b).
   Torn edge of Couple's base blending into Events top.
─────────────────────────────────────────────────────────────── */
function DividerCoupleEvents() {
  return (
    <div className="sd reveal-up" style={{ background: "#19281b", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ minHeight: "60px", display: "block" }}>
        <defs><TornPaperFilter id="couple-torn" scale={12} /></defs>
        
        {/* The torn overlap that matches EXACTLY the bottom gradient of Couple section */}
        <path d="M-50,-50 L1490,-50 L1490,35 C1000,5 400,55 -50,25 Z" fill="#2D5A3D" filter="url(#couple-torn)" />
        
        {/* Gold ornamental accent on the torn edge */}
        <path d="M-50,25 C400,55 1000,5 1490,35" fill="none" stroke="var(--gold-pale)" strokeWidth="1" opacity="0.4" filter="url(#couple-torn)" />
        
        <g transform="translate(720, 25)">
          <polygon points="-8,0 0,-4 8,0 0,4" fill="var(--gold)" opacity="0.9"/>
        </g>
      </svg>
    </div>
  );
}

/* ─── 2. Events → Story ──────────────────────────────────────────
   Dark Green to Cream. Realistic Torn Edge of dark green over cream.
─────────────────────────────────────────────────────────────── */
function DividerEventsStory() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--cream)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ minHeight: "100px" }}>
        <defs>
          <filter id="events-torn-user" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z" fill="rgba(53,73,59,0.1)" filter="url(#events-torn-user)" transform="translate(0, 6)"></path>
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z" fill="#19281b" filter="url(#events-torn-user)"></path>
      </svg>
    </div>
  );
}

/* ─── 3. Story → Gallery ─────────────────────────────────────────
   Cream to Cream. Elegant center ornamental separator.
─────────────────────────────────────────────────────────────── */
function DividerStoryGallery() {
  return (
    <div className="sd reveal-blur" style={{ background: "var(--cream)", minHeight: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
          <defs><TornPaperFilter id="story-brush" scale={8} /></defs>
          <path d="M 200 30 Q 720 10 1240 30" fill="none" stroke="var(--gold)" strokeWidth="1" opacity="0.3" filter="url(#story-brush)" />
          <path d="M 300 40 Q 720 20 1140 40" fill="none" stroke="var(--gold)" strokeWidth="0.5" opacity="0.2" filter="url(#story-brush)" />
          <g transform="translate(720, 25)">
            <path d="M0,0 C-10,-10 -20,0 0,15 C20,0 10,-10 0,0 Z" fill="var(--gold)" opacity="0.7"/>
            <circle cx="-35" cy="5" r="1.5" fill="var(--gold)" opacity="0.5"/>
            <circle cx="35" cy="5" r="1.5" fill="var(--gold)" opacity="0.5"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ─── 4. Gallery → Wishes ────────────────────────────────────────
   Cream to Sage (#E8EFEA). Torn paper of Cream overlapping Sage.
─────────────────────────────────────────────────────────────── */
function DividerGalleryWishes() {
  return (
    <div className="sd reveal-up" style={{ background: "#19281b", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ minHeight: "100px" }}>
        <defs><TornPaperFilter id="gallery-torn" scale={16} /></defs>
        
        {/* Subtle shadow layer */}
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z" fill="rgba(36,59,45,0.05)" filter="url(#gallery-torn)" transform="translate(0, 6)"/>
        
        {/* Main cream paper edge */}
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z" fill="var(--cream)" filter="url(#gallery-torn)" />
      </svg>
    </div>
  );
}

/* ─── 5. Wishes → Gift ───────────────────────────────────────────
   Dark Green (#19281b) to Cream. Torn paper of Dark Green over Cream.
─────────────────────────────────────────────────────────────── */
function DividerWishesGift() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--cream)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ minHeight: "120px" }}>
        <defs><TornPaperFilter id="wishes-torn" scale={22} /></defs>
        
        {/* Base shadow for depth */}
        <path d="M-50,-50 L1490,-50 L1490,60 C1200,20 600,120 -50,40 Z" fill="rgba(36,59,45,0.2)" filter="url(#wishes-torn)" transform="translate(0, 8)" />
        
        {/* Main Dark Green Brush/Paper */}
        <path d="M-50,-50 L1490,-50 L1490,60 C1200,20 600,120 -50,40 Z" fill="#19281b" filter="url(#wishes-torn)" />
        
        <path d="M-50,-50 L1490,-50 L1490,40 C1200,0 600,100 -50,20 Z" fill="rgba(255,255,255,0.05)" filter="url(#wishes-torn)" />
      </svg>
    </div>
  );
}

/* ─── 6. Gift → Footer ───────────────────────────────────────────
   Cream to Dark Footer (#1a2e20). Elegant torn cream falling over dark.
─────────────────────────────────────────────────────────────── */
function DividerGiftFooter() {
  return (
    <div className="sd reveal-up" style={{ background: "#1a2e20", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ minHeight: "140px" }}>
        <defs><TornPaperFilter id="gift-torn" scale={14} /></defs>
        
        <path d="M-50,-50 L1490,-50 L1490,80 C1100,-10 300,-10 -50,80 Z" fill="var(--gold-pale)" opacity="0.4" filter="url(#gift-torn)" transform="translate(0, 6)" />
        
        <path d="M-50,-50 L1490,-50 L1490,80 C1100,-10 300,-10 -50,80 Z" fill="var(--cream)" filter="url(#gift-torn)" />
        
        <g transform="translate(720, 20)">
          <circle cx="0" cy="0" r="3" fill="var(--gold)"/>
          <path d="M-40,30 Q0,5 40,30" fill="none" stroke="var(--gold)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6"/>
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


