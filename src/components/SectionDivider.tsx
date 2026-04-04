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
    <div className="sd sd-couple-events reveal-up">
      {/* Floral left accent */}
      <div className="sd-floral-left idle-sway" style={{ transformOrigin: "top left" }}>
        <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.6">
            <ellipse cx="40" cy="80" rx="22" ry="38" fill="#4a7c59" transform="rotate(-30 40 80)"/>
            <ellipse cx="70" cy="60" rx="18" ry="30" fill="#3d6b4a" transform="rotate(15 70 60)"/>
            <ellipse cx="25" cy="130" rx="15" ry="25" fill="#5a8c6a" transform="rotate(-45 25 130)"/>
            <circle cx="55" cy="45" r="8" fill="#c0392b" opacity="0.7"/>
            <circle cx="85" cy="75" r="6" fill="#e74c3c" opacity="0.5"/>
            <circle cx="30" cy="100" r="5" fill="#c0392b" opacity="0.6"/>
          </g>
        </svg>
      </div>
      {/* Floral right accent */}
      <div className="sd-floral-right idle-sway" style={{ transformOrigin: "top right", animationDelay: "1s" }}>
        <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
          <g opacity="0.6">
            <ellipse cx="40" cy="80" rx="22" ry="38" fill="#4a7c59" transform="rotate(-30 40 80)"/>
            <ellipse cx="70" cy="60" rx="18" ry="30" fill="#3d6b4a" transform="rotate(15 70 60)"/>
            <ellipse cx="25" cy="130" rx="15" ry="25" fill="#5a8c6a" transform="rotate(-45 25 130)"/>
            <circle cx="55" cy="45" r="8" fill="#c0392b" opacity="0.7"/>
            <circle cx="85" cy="75" r="6" fill="#e74c3c" opacity="0.5"/>
            <circle cx="30" cy="100" r="5" fill="#c0392b" opacity="0.6"/>
          </g>
        </svg>
      </div>

      {/* Main torn-paper SVG wave */}
      <svg
        className="sd-svg"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sd1-shadow">
            <feDropShadow dx="0" dy="-6" stdDeviation="8" floodColor="rgba(36,59,45,0.4)" />
          </filter>
          <linearGradient id="sd1-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8EFEA" />
            <stop offset="100%" stopColor="#d4edd6" />
          </linearGradient>
        </defs>
        {/* Torn organic path — bottom stays at 130, top is irregular */}
        <path
          d="M0,70 C60,50 100,90 180,65 C240,45 290,85 380,60 C450,40 510,80 600,55 C680,35 730,75 820,50 C900,30 960,72 1060,48 C1150,28 1220,70 1320,45 C1380,30 1420,60 1440,50 L1440,130 L0,130 Z"
          fill="url(#sd1-fill)"
          filter="url(#sd1-shadow)"
        />
        {/* Second subtle layer */}
        <path
          d="M0,95 C80,80 160,105 280,85 C380,68 470,100 580,82 C680,66 780,95 900,78 C1000,64 1100,90 1200,72 C1300,56 1380,85 1440,75 L1440,130 L0,130 Z"
          fill="#E8EFEA"
          opacity="0.4"
        />
        {/* Gold ornament line in center */}
        <line x1="680" y1="58" x2="760" y2="58" stroke="#C9A84C" strokeWidth="1.5" opacity="0.7"/>
        <polygon points="720,48 726,58 720,68 714,58" fill="#C9A84C" opacity="0.6"/>
        <line x1="680" y1="58" x2="640" y2="58" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4"/>
        <line x1="760" y1="58" x2="800" y2="58" stroke="#C9A84C" strokeWidth="0.8" opacity="0.4"/>
      </svg>
    </div>
  );
}

/* ─── 2. Events → Story ──────────────────────────────────────────
   Double-layer wave with parallax feel
   from: green events → cream story
─────────────────────────────────────────────────────────────── */
function DividerEventsStory() {
  return (
    <div className="sd sd-events-story reveal-up">
      <svg
        className="sd-svg"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sd2-shadow">
            <feDropShadow dx="0" dy="-5" stdDeviation="10" floodColor="rgba(0,0,0,0.25)" />
          </filter>
        </defs>
        {/* Back layer — deep green */}
        <path
          className="sd-layer-back"
          d="M0,30 C200,80 400,10 600,50 C800,90 1000,15 1200,55 C1320,75 1400,35 1440,45 L1440,140 L0,140 Z"
          fill="#243B2D"
          opacity="0.85"
          filter="url(#sd2-shadow)"
        />
        {/* Front layer — cream */}
        <path
          className="sd-layer-front"
          d="M0,65 C150,100 350,45 550,80 C720,108 920,50 1100,85 C1250,110 1380,65 1440,80 L1440,140 L0,140 Z"
          fill="#F5EFE0"
        />
        {/* Batik-like decorative dots */}
        {[200, 400, 600, 800, 1000, 1200].map((x, i) => (
          <circle key={i} cx={x} cy={90 + (i % 2) * 10} r="2.5" fill="#C9A84C" opacity="0.45" />
        ))}
        {/* Center floral ornament */}
        <g transform="translate(720, 72)" opacity="0.65">
          <circle cx="0" cy="0" r="6" fill="none" stroke="#C9A84C" strokeWidth="1.2"/>
          <circle cx="0" cy="0" r="2" fill="#C9A84C"/>
          <line x1="-40" y1="0" x2="-12" y2="0" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="12" y1="0" x2="40" y2="0" stroke="#C9A84C" strokeWidth="1"/>
          <line x1="-60" y1="0" x2="-45" y2="0" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
          <line x1="45" y1="0" x2="60" y2="0" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5"/>
        </g>
      </svg>
    </div>
  );
}

/* ─── 3. Story → Gallery ─────────────────────────────────────────
   Torn paper dramatic with rich floral overhang
   from: cream story → dark gallery
─────────────────────────────────────────────────────────────── */
function DividerStoryGallery() {
  return (
    <div className="sd sd-story-gallery reveal-blur">
      {/* Heavy floral hanging from top */}
      <div className="sd-floral-center idle-float-slow">
        <svg viewBox="0 0 280 160" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.75">
            {/* large leaves */}
            <ellipse cx="140" cy="50" rx="35" ry="60" fill="#2d5a3d" transform="rotate(0 140 50)"/>
            <ellipse cx="100" cy="70" rx="28" ry="48" fill="#3d6b4a" transform="rotate(-25 100 70)"/>
            <ellipse cx="180" cy="70" rx="28" ry="48" fill="#3d6b4a" transform="rotate(25 180 70)"/>
            <ellipse cx="70" cy="100" rx="20" ry="35" fill="#4a7c59" transform="rotate(-40 70 100)"/>
            <ellipse cx="210" cy="100" rx="20" ry="35" fill="#4a7c59" transform="rotate(40 210 100)"/>
            {/* Flowers */}
            <circle cx="140" cy="25" r="14" fill="#8B3A3A" opacity="0.9"/>
            <circle cx="140" cy="25" r="8" fill="#c0392b"/>
            <circle cx="110" cy="55" r="10" fill="#e8a090" opacity="0.8"/>
            <circle cx="170" cy="55" r="10" fill="#e8a090" opacity="0.8"/>
            <circle cx="90" cy="85" r="7" fill="#c0392b" opacity="0.7"/>
            <circle cx="190" cy="85" r="7" fill="#c0392b" opacity="0.7"/>
            {/* Gold pollen dots */}
            {[130,140,150].map((x, i) => (
              <circle key={i} cx={x} cy={22 + i * 3} r="2" fill="#F5D073" opacity="0.8"/>
            ))}
          </g>
        </svg>
      </div>

      <svg
        className="sd-svg"
        viewBox="0 0 1440 150"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sd3-shadow">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.5)" />
          </filter>
          <linearGradient id="sd3-dark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#172318"/>
            <stop offset="100%" stopColor="#1e2f22"/>
          </linearGradient>
        </defs>
        {/* Dramatic torn top edge */}
        <path
          d="M0,0 L0,45 C50,65 90,30 150,55 C200,75 230,35 300,60 C360,80 390,40 460,62 C520,80 555,42 630,60 C700,76 735,38 810,58 C880,76 915,40 990,62 C1060,80 1100,45 1180,65 C1250,82 1290,45 1360,62 C1400,72 1430,50 1440,55 L1440,0 Z"
          fill="#F5EFE0"
          filter="url(#sd3-shadow)"
        />
        {/* Dark fill below */}
        <path
          d="M0,45 C50,65 90,30 150,55 C200,75 230,35 300,60 C360,80 390,40 460,62 C520,80 555,42 630,60 C700,76 735,38 810,58 C880,76 915,40 990,62 C1060,80 1100,45 1180,65 C1250,82 1290,45 1360,62 C1400,72 1430,50 1440,55 L1440,150 L0,150 Z"
          fill="url(#sd3-dark)"
        />
      </svg>
    </div>
  );
}

/* ─── 4. Gallery → Wishes ────────────────────────────────────────
   Soft wave with glow bokeh — intimate transition
   from: dark/cream gallery → dark-green wishes
─────────────────────────────────────────────────────────────── */
function DividerGalleryWishes() {
  return (
    <div className="sd sd-gallery-wishes reveal-up">
      {/* Bokeh glow circles */}
      <div className="sd-bokeh-wrap" aria-hidden="true">
        {[
          { left: "15%", size: 80, delay: 0, color: "rgba(201,168,76,0.12)" },
          { left: "35%", size: 50, delay: 1.2, color: "rgba(201,168,76,0.08)" },
          { left: "60%", size: 100, delay: 0.6, color: "rgba(201,168,76,0.1)" },
          { left: "80%", size: 60, delay: 1.8, color: "rgba(201,168,76,0.09)" },
        ].map((b, i) => (
          <div
            key={i}
            className="sd-bokeh idle-pulse"
            style={{
              left: b.left,
              width: b.size,
              height: b.size,
              background: b.color,
              animationDelay: `${b.delay}s`,
            }}
          />
        ))}
      </div>

      <svg
        className="sd-svg"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sd4-glow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <linearGradient id="sd4-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E8EFEA"/>
            <stop offset="100%" stopColor="#1e3326"/>
          </linearGradient>
        </defs>
        {/* Soft organic wave */}
        <path
          d="M0,40 Q180,80 360,40 Q540,0 720,45 Q900,88 1080,42 Q1260,0 1440,38 L1440,100 L0,100 Z"
          fill="url(#sd4-fill)"
          filter="url(#sd4-glow)"
        />
        {/* Gold shimmer pulse line */}
        <path
          d="M0,40 Q180,80 360,40 Q540,0 720,45 Q900,88 1080,42 Q1260,0 1440,38"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1"
          opacity="0.35"
          className="sd-gold-line"
        />
      </svg>
    </div>
  );
}

/* ─── 5. Wishes → Gift ───────────────────────────────────────────
   Horizontal brush stroke — storytelling vibe with draw effect
   from: dark-green wishes → cream gift
─────────────────────────────────────────────────────────────── */
function DividerWishesGift() {
  return (
    <div className="sd sd-wishes-gift reveal-up">
      <svg
        className="sd-svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sd5-brush">
            <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" seed="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
          </filter>
          <linearGradient id="sd5-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#243B2D"/>
            <stop offset="60%" stopColor="#2d5a3d"/>
            <stop offset="100%" stopColor="#F5EFE0"/>
          </linearGradient>
        </defs>
        {/* Brush stroke effect — main layer */}
        <path
          d="M0,0 L0,55 C120,45 240,70 400,52 C560,35 680,65 840,48 C1000,32 1140,60 1300,45 C1380,38 1420,55 1440,50 L1440,120 L0,120 Z"
          fill="url(#sd5-fill)"
          filter="url(#sd5-brush)"
        />
        {/* Cream front layer */}
        <path
          d="M0,80 C100,70 220,90 400,78 C560,68 700,85 880,74 C1040,64 1200,82 1360,72 C1410,68 1430,78 1440,75 L1440,120 L0,120 Z"
          fill="#F5EFE0"
        />
        {/* Center love icon */}
        <g transform="translate(720,52)" opacity="0.6">
          <path d="M0,-8 C-4,-12 -12,-12 -12,-4 C-12,2 0,12 0,12 C0,12 12,2 12,-4 C12,-12 4,-12 0,-8 Z" fill="#C9A84C"/>
        </g>
        {/* Animated draw line */}
        <line x1="580" y1="52" x2="660" y2="52" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" className="sd-draw-left"/>
        <line x1="780" y1="52" x2="860" y2="52" stroke="#C9A84C" strokeWidth="0.8" opacity="0.5" className="sd-draw-right"/>
      </svg>
    </div>
  );
}

/* ─── 6. Gift → Footer ───────────────────────────────────────────
   Ornate symmetric closure — elegant farewell
   from: cream gift → dark footer
─────────────────────────────────────────────────────────────── */
function DividerGiftFooter() {
  return (
    <div className="sd sd-gift-footer reveal-up">
      <svg
        className="sd-svg"
        viewBox="0 0 1440 130"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="sd6-shadow">
            <feDropShadow dx="0" dy="-4" stdDeviation="8" floodColor="rgba(36,59,45,0.5)" />
          </filter>
          <linearGradient id="sd6-fill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F5EFE0"/>
            <stop offset="100%" stopColor="#1a2e20"/>
          </linearGradient>
        </defs>
        {/* Symmetric arch shape */}
        <path
          d="M0,130 L0,70 C200,30 380,10 520,35 C620,52 680,30 720,22 C760,30 820,52 920,35 C1060,10 1240,30 1440,70 L1440,130 Z"
          fill="url(#sd6-fill)"
          filter="url(#sd6-shadow)"
        />
        {/* Decorative gold arch tracing */}
        <path
          d="M360,80 C480,45 620,28 720,22 C820,28 960,45 1080,80"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="1.5"
          opacity="0.55"
          strokeDasharray="6,4"
        />
        {/* Center ornament (gunungan-inspired diamond) */}
        <g transform="translate(720,55)" opacity="0.75">
          <polygon points="0,-18 10,0 0,18 -10,0" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
          <polygon points="0,-10 6,0 0,10 -6,0" fill="#C9A84C" opacity="0.5"/>
          <circle cx="0" cy="0" r="2.5" fill="#C9A84C"/>
          {/* Radiating lines */}
          {[0,60,120,180,240,300].map((deg, i) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <line
                key={i}
                x1={Number((Math.cos(rad) * 14).toFixed(4))}
                y1={Number((Math.sin(rad) * 14).toFixed(4))}
                x2={Number((Math.cos(rad) * 22).toFixed(4))}
                y2={Number((Math.sin(rad) * 22).toFixed(4))}
                stroke="#C9A84C"
                strokeWidth="1"
                opacity="0.4"
              />
            );
          })}
        </g>
        {/* Flanking dots */}
        {[-200,-140,-80,80,140,200].map((x, i) => (
          <circle key={i} cx={720 + x} cy={75} r="2" fill="#C9A84C" opacity="0.3"/>
        ))}
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
