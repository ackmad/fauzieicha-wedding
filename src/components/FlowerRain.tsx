"use client";

import { useEffect, useState } from "react";

const FLOWER_COUNT = 10; // Even fewer for a subtle, elegant touch
const FLOWER_IMAGES = Array.from({ length: 11 }, (_, i) => `/rain/bunga-rain-${i + 1}.png`);

interface Flower {
  id: number;
  image: string;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotationX: number;
  rotationY: number;
  sway: number;
  isBehind: boolean;
  blur: number;
}

export default function FlowerRain() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const newFlowers = Array.from({ length: FLOWER_COUNT }).map((_, i) => ({
      id: i,
      image: FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)],
      left: `${Math.random() * 100}%`,
      size: 15 + Math.random() * 30, 
      duration: 15 + Math.random() * 20, 
      delay: Math.random() * -45,
      rotationX: Math.random() * 360,
      rotationY: Math.random() * 360,
      sway: 80 + Math.random() * 120,
      isBehind: Math.random() > 0.5,
      blur: Math.random() > 0.6 ? Math.random() * 2 + 1 : 0,
    }));
    setFlowers(newFlowers);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderFlowers = (behind: boolean) => (
    <div 
      className={`flower-rain-layer ${behind ? "behind" : "front"}`} 
      style={{ 
        position: "fixed", 
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        pointerEvents: "none", 
        zIndex: behind ? 1 : 2,
        overflow: "visible",
        perspective: "1200px",
        willChange: 'transform'
      }}
    >
      {flowers.filter(f => f.isBehind === behind).map((flower) => (
        <img
          key={flower.id}
          src={flower.image}
          alt=""
          className="flower-petal"
          style={{
            left: flower.left,
            width: `${flower.size}px`,
            height: "auto",
            animationDuration: `${flower.duration}s`,
            animationDelay: `${flower.delay}s`,
            filter: flower.blur ? `blur(${flower.blur}px)` : "none",
            opacity: flower.isBehind ? 0.2 + Math.random() * 0.2 : 0.4 + Math.random() * 0.3,
            "--sway-amount": `${flower.sway}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );

  return (
    <>
      {renderFlowers(true)}
      {renderFlowers(false)}
    </>
  );
}
