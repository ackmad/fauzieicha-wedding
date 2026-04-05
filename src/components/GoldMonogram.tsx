"use client";

import React from "react";

type MonogramVariant = "hero" | "secondary" | "divider" | "footer" | "watermark";

interface MonogramProps {
  variant?: MonogramVariant;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * GoldMonogram — The premium identity mark for Fauzie & Icha
 *
 * Variants:
 *  - hero       : Full gold metallic, glow + shimmer (Cover section)
 *  - secondary  : Softer gold, reduced glow (Events / Save the Date)
 *  - divider    : Clean gold, no glow (Section ornaments)
 *  - footer     : Small, clean signature
 *  - watermark  : Ultra-transparent background texture
 */
export default function GoldMonogram({ variant = "hero", className = "", style }: MonogramProps) {
  const baseClass = `monogram-base monogram-${variant}`;

  return (
    <span className={`${baseClass} ${className}`} style={style} aria-hidden="true">
      <img
        src="/icons/monogram-CF.svg"
        alt="Monogram CF"
        className="monogram-img"
        draggable={false}
      />
    </span>
  );
}
