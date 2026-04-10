"use client";

import React from "react";

/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           SECTION DIVIDER — COLOR VARIABLE SYSTEM           ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  All colors are controlled by CSS variables in globals.css  ║
 * ║  under the ":root" block. Edit them there to change colors. ║
 * ║                                                             ║
 * ║  --divider-1-bg      Background wrapper for divider 1       ║
 * ║  --divider-1-tear    Tear color for divider 1               ║
 * ║  --divider-2-bg      Background wrapper for divider 2       ║
 * ║  --divider-2-tear    Tear color for divider 2               ║
 * ║  --divider-4-bg      Background wrapper for divider 4       ║
 * ║  --divider-5-bg      Background wrapper for divider 5       ║
 * ║  --divider-5-tear    Tear color for divider 5               ║
 * ║  --divider-6-bg      Background wrapper for divider 6       ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

type DividerType =
  | "couple-to-events"      // 1. Couple → Events
  | "events-to-story"       // 2. Events → Story
  | "story-to-gallery"      // 3. Story  → Gallery
  | "gallery-to-gift"       // 4. Gallery → Gift
  | "gift-to-wishes"        // 5. Gift → Wishes
  | "wishes-to-footer";     // 6. Wishes → Footer

interface SectionDividerProps {
  type: DividerType;
}

const TornPaperFilter = ({ id, scale = 10 }: { id: string; scale?: number }) => (
  <filter id={id} x="-10%" y="-20%" width="120%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="4" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
  </filter>
);

/* ─── 1. Couple → Events ───────────────────────────────────────── */
function DividerCoupleEvents() {
  return (
    <div className="sd-minimal" style={{ background: "var(--bg-primary)", position: "relative", zIndex: 10, marginTop: "-1px" }}>
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" style={{ width: "100%", height: "40px", display: "block" }}>
        <path d="M0,0 L1440,0 L1440,25 Q720,40 0,25 Z" fill="var(--bg-secondary)" />
        <path d="M0,25 Q720,40 1440,25" fill="none" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.5" />
      </svg>
      <div style={{ 
        position: "absolute", 
        top: "25px", 
        left: "50%", 
        transform: "translateX(-50%) translateY(3px) rotate(45deg)",
        width: "8px",
        height: "8px",
        background: "var(--accent-gold)",
        boxShadow: "0 0 10px rgba(212, 175, 55, 0.5)",
        border: "1px solid rgba(255,255,255,0.4)"
      }} />
    </div>
  );
}

/* ─── 2. Events → Story ────────────────────────────────────────── */
function DividerEventsStory() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--divider-2-bg)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ minHeight: "60px" }}>
        <defs>
          <filter id="events-torn" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z"
          fill="rgba(0,0,0,0.08)" filter="url(#events-torn)" transform="translate(0, 6)"/>
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z"
          fill="var(--divider-2-tear)" filter="url(#events-torn)"/>
      </svg>
    </div>
  );
}

/* ─── 3. Story → Gallery ────────────────────────────────────────── */
function DividerStoryGallery() {
  return (
    <div className="sd reveal-blur" style={{ background: "var(--cream)", minHeight: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
          <defs><TornPaperFilter id="story-brush" scale={8} /></defs>
          <path d="M 200 30 Q 720 10 1240 30" fill="none" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.3" filter="url(#story-brush)" />
          <path d="M 300 40 Q 720 20 1140 40" fill="none" stroke="var(--accent-gold)" strokeWidth="0.5" opacity="0.2" filter="url(#story-brush)" />
          <g transform="translate(720, 25)">
            <path d="M0,0 C-10,-10 -20,0 0,15 C20,0 10,-10 0,0 Z" fill="var(--accent-gold)" opacity="0.7"/>
            <circle cx="-35" cy="5" r="1.5" fill="var(--accent-gold)" opacity="0.5"/>
            <circle cx="35" cy="5" r="1.5" fill="var(--accent-gold)" opacity="0.5"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ─── 4. Gallery → Gift (Cream to Cream) ────────────────────────── */
function DividerGalleryGift() {
  return (
    <div className="sd reveal-blur" style={{ background: "var(--cream)", minHeight: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "relative", width: "100%" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
          <defs><TornPaperFilter id="gallery-gift-brush" scale={6} /></defs>
          <path d="M 100 20 Q 720 40 1340 20" fill="none" stroke="var(--accent-gold)" strokeWidth="1" opacity="0.25" filter="url(#gallery-gift-brush)" />
          <g transform="translate(720, 30)">
            <circle cx="0" cy="0" r="4" fill="none" stroke="var(--accent-gold)" opacity="0.6"/>
            <circle cx="-20" cy="0" r="2" fill="var(--accent-gold)" opacity="0.4"/>
            <circle cx="20" cy="0" r="2" fill="var(--accent-gold)" opacity="0.4"/>
          </g>
        </svg>
      </div>
    </div>
  );
}

/* ─── 5. Gift → Wishes (Cream to Dark Green) ────────────────────── */
function DividerGiftWishes() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--divider-4-bg)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ minHeight: "100px" }}>
        <defs><TornPaperFilter id="gift-torn" scale={16} /></defs>
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z"
          fill="rgba(36,59,45,0.05)" filter="url(#gift-torn)" transform="translate(0, 6)"/>
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z"
          fill="var(--cream)" filter="url(#gift-torn)"/>
      </svg>
    </div>
  );
}

/* ─── 6. Wishes → Footer (seamless gradient blend) ──────────────── */
function DividerWishesFooter() {
  return (
    <div 
      className="sd" 
      style={{ 
        background: "linear-gradient(to bottom, #1F3D36 0%, #172D27 40%, #11261D 100%)",
        marginTop: "-2px",
        height: "120px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Subtle gold line accent */}
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}>
        <defs>
          <linearGradient id="gold-fade-h" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="rgba(212,175,55,0.25)" />
            <stop offset="70%" stopColor="rgba(212,175,55,0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path d="M0,60 Q360,45 720,55 Q1080,65 1440,50" 
          fill="none" stroke="url(#gold-fade-h)" strokeWidth="1" />
      </svg>
    </div>
  );
}

export default function SectionDivider({ type }: SectionDividerProps) {
  switch (type) {
    case "couple-to-events":  return <DividerCoupleEvents />;
    case "events-to-story":   return <DividerEventsStory />;
    case "story-to-gallery":  return <DividerStoryGallery />;
    case "gallery-to-gift":   return <DividerGalleryGift />;
    case "gift-to-wishes":    return <DividerGiftWishes />;
    case "wishes-to-footer":  return <DividerWishesFooter />;
    default:                  return null;
  }
}

