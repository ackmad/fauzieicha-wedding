"use client";

import { useEffect, useState, useRef } from "react";

// Reduce count on mobile — detected via matchMedia
const FLOWER_COUNT_DESKTOP = 8;
const FLOWER_COUNT_MOBILE = 4;

const FLOWER_IMAGES = Array.from({ length: 11 }, (_, i) => `/rain/bunga-rain-${i + 1}.webp`);

interface Flower {
  id: number;
  image: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  sway: number;
  isBehind: boolean;
  // Blur removed — filter:blur() on each petal is very expensive on mobile
}

export default function FlowerRain() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect mobile to reduce petal count
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const count = isMobile ? FLOWER_COUNT_MOBILE : FLOWER_COUNT_DESKTOP;

    const newFlowers = Array.from({ length: count }).map((_, i) => ({
      id: i,
      image: FLOWER_IMAGES[i % FLOWER_IMAGES.length], // Deterministic selection avoids random rerender
      left: `${(i / count) * 100 + Math.random() * 10}%`,
      size: isMobile ? 12 + Math.random() * 16 : 15 + Math.random() * 25,
      duration: 18 + Math.random() * 18,
      delay: Math.random() * -40,
      sway: 60 + Math.random() * 100,
      isBehind: i % 2 === 0,
    }));
    setFlowers(newFlowers);

    // NOTE: Removed scroll listener — FlowerRain component had a scroll
    // listener that set state on every scroll event, causing re-renders
    // on every scroll. scrollY was not actually used in rendering.
  }, []);

  const renderFlowers = (behind: boolean) => (
    <div
      style={{
        position: "absolute",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: behind ? 1 : 2,
        overflow: "hidden",
      }}
    >
      {flowers.filter(f => f.isBehind === behind).map((flower) => (
        <img
          key={flower.id}
          src={flower.image}
          alt=""
          aria-hidden="true"
          className="flower-petal"
          style={{
            left: flower.left,
            width: `${flower.size}px`,
            height: "auto",
            animationDuration: `${flower.duration}s`,
            animationDelay: `${flower.delay}s`,
            opacity: behind ? 0.2 : 0.4,
            "--sway-amount": `${flower.sway}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );

  return (
    <div ref={containerRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3 }}>
      {renderFlowers(true)}
      {renderFlowers(false)}
    </div>
  );
}
