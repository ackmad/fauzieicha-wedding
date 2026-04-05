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
  | "story-to-gallery"      // 3. Story  → Gallery (ornamental)
  | "gallery-to-wishes"     // 4. Gallery → Wishes
  | "wishes-to-gift"        // 5. Wishes → Gift
  | "gift-to-footer";       // 6. Gift → Footer

interface SectionDividerProps {
  type: DividerType;
}

const TornPaperFilter = ({ id, scale = 10 }: { id: string; scale?: number }) => (
  <filter id={id} x="-10%" y="-20%" width="120%" height="140%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="4" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
  </filter>
);

/* ─── 1. Couple → Events ─────────────────────────────────────────
   Color vars: --divider-1-bg (wrapper), --divider-1-tear (paper)
   Default: dark green wrapper, mid-green tear from couple section
──────────────────────────────────────────────────────────────── */
function DividerCoupleEvents() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--divider-1-bg)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ minHeight: "60px", display: "block" }}>
        <defs><TornPaperFilter id="couple-torn" scale={12} /></defs>
        <path d="M-50,-50 L1490,-50 L1490,35 C1000,5 400,55 -50,25 Z" fill="var(--divider-1-tear)" filter="url(#couple-torn)" />
        <path d="M-50,25 C400,55 1000,5 1490,35" fill="none" stroke="var(--gold-pale)" strokeWidth="1" opacity="0.4" filter="url(#couple-torn)" />
        <g transform="translate(720, 25)">
          <polygon points="-8,0 0,-4 8,0 0,4" fill="var(--gold)" opacity="0.9"/>
        </g>
      </svg>
    </div>
  );
}

/* ─── 2. Events → Story ──────────────────────────────────────────
   Color vars: --divider-2-bg (wrapper), --divider-2-tear (dark green)
   Default: cream wrapper, dark green tear paper leaving Events
──────────────────────────────────────────────────────────────── */
function DividerEventsStory() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--divider-2-bg)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ minHeight: "100px" }}>
        <defs>
          <filter id="events-torn" x="-10%" y="-20%" width="120%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04 0.08" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="16" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
        {/* Subtle shadow for depth */}
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z"
          fill="rgba(0,0,0,0.08)" filter="url(#events-torn)" transform="translate(0, 6)"/>
        {/* Main tear fill */}
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z"
          fill="var(--divider-2-tear)" filter="url(#events-torn)"/>
      </svg>
    </div>
  );
}

/* ─── 3. Story → Gallery ──────────────────────────────────────────
   No CSS color variable — purely an ornamental gold line separator.
   Background stays cream (continuous from Story and Gallery).
──────────────────────────────────────────────────────────────── */
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

/* ─── 4. Gallery → Wishes ─────────────────────────────────────────
   Color vars: --divider-4-bg (dark green wrapper)
   Tear fill = var(--cream) — cream paper landing on dark green
──────────────────────────────────────────────────────────────── */
function DividerGalleryWishes() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--divider-4-bg)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 100" preserveAspectRatio="none" style={{ minHeight: "100px" }}>
        <defs><TornPaperFilter id="gallery-torn" scale={16} /></defs>
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z"
          fill="rgba(36,59,45,0.05)" filter="url(#gallery-torn)" transform="translate(0, 6)"/>
        <path d="M-50,-50 L1490,-50 L1490,40 C1100,80 800,0 300,50 C100,70 -50,30 -50,30 Z"
          fill="var(--cream)" filter="url(#gallery-torn)"/>
      </svg>
    </div>
  );
}

/* ─── 5. Wishes → Gift ────────────────────────────────────────────
   Color vars: --divider-5-bg (cream wrapper), --divider-5-tear (dark green)
   Torn dark green paper departing downward over cream
──────────────────────────────────────────────────────────────── */
function DividerWishesGift() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--divider-5-bg)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 120" preserveAspectRatio="none" style={{ minHeight: "120px" }}>
        <defs><TornPaperFilter id="wishes-torn" scale={22} /></defs>
        <path d="M-50,-50 L1490,-50 L1490,60 C1200,20 600,120 -50,40 Z"
          fill="rgba(36,59,45,0.2)" filter="url(#wishes-torn)" transform="translate(0, 8)"/>
        <path d="M-50,-50 L1490,-50 L1490,60 C1200,20 600,120 -50,40 Z"
          fill="var(--divider-5-tear)" filter="url(#wishes-torn)"/>
        <path d="M-50,-50 L1490,-50 L1490,40 C1200,0 600,100 -50,20 Z"
          fill="rgba(255,255,255,0.05)" filter="url(#wishes-torn)"/>
      </svg>
    </div>
  );
}

/* ─── 6. Gift → Footer ────────────────────────────────────────────
   Color vars: --divider-6-bg (dark green wrapper)
   Tear fill = var(--cream) — cream paper landing on dark footer
──────────────────────────────────────────────────────────────── */
function DividerGiftFooter() {
  return (
    <div className="sd reveal-up" style={{ background: "var(--divider-6-bg)", marginTop: "-2px" }}>
      <svg className="sd-svg" viewBox="0 0 1440 140" preserveAspectRatio="none" style={{ minHeight: "140px" }}>
        <defs><TornPaperFilter id="gift-torn" scale={14} /></defs>
        <path d="M-50,-50 L1490,-50 L1490,80 C1100,-10 300,-10 -50,80 Z"
          fill="var(--gold-pale)" opacity="0.4" filter="url(#gift-torn)" transform="translate(0, 6)"/>
        <path d="M-50,-50 L1490,-50 L1490,80 C1100,-10 300,-10 -50,80 Z"
          fill="var(--cream)" filter="url(#gift-torn)"/>
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
    case "couple-to-events":  return <DividerCoupleEvents />;
    case "events-to-story":   return <DividerEventsStory />;
    case "story-to-gallery":  return <DividerStoryGallery />;
    case "gallery-to-wishes": return <DividerGalleryWishes />;
    case "wishes-to-gift":    return <DividerWishesGift />;
    case "gift-to-footer":    return <DividerGiftFooter />;
    default:                  return null;
  }
}
