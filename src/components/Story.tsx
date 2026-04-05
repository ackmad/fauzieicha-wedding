import React from "react";
import { WeddingData } from "../types";
import { OrnamenJawa } from "./Icons";

interface StoryProps {
  timeline: WeddingData["timeline"];
  currentLang: "id" | "en";
  trans: Record<string, string>;
}

const HeartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const StarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const RingIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="14" r="7" />
    <path d="M9 7l1.5-4h3L15 7" />
  </svg>
);

const icons = [HeartIcon, StarIcon, RingIcon];

export default function Story({ timeline, currentLang, trans }: StoryProps) {
  return (
    <section id="section-story">
      {/* Background layers */}
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.1 }}></div>
      <div className="story-glow idle-pulse">
        <img src="/effects/light-glow.png" alt="" />
      </div>
      <div className="floral-hanging-wrap idle-sway" style={{ transformOrigin: 'top center' }}>
        <img src="/florals/floral-hanging.png" alt="" className="floral-hanging-img parallax-element-slow" />
      </div>
      <div className="parallax-leaf story-leaf-1 idle-float">
        <img src="/effects/parallax-leaves.png" alt="" />
      </div>

      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          {trans["story-label"]}
        </p>
        <h2 className="section-title reveal-up" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {trans["story-title"]}
        </h2>

        <div className="story-ornament reveal-item" style={{ "--reveal-delay": "0.25s" } as React.CSSProperties}>
          <OrnamenJawa color="var(--gold)" className="ornament-svg" style={{ height: "40px", opacity: 0.5 }} />
        </div>

        {/* Timeline */}
        <div className="timeline-vivid">
          {timeline.map((item, i) => {
            const Icon = icons[i % icons.length];
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                className={`tl-vivid-item ${isLeft ? "tl-left reveal-right" : "tl-right reveal-left"}`}
                style={{ "--reveal-delay": `${(i % 3) * 0.15}s` } as React.CSSProperties}
              >
                {/* Content */}
                <div className="tl-vivid-content">
                  <div className="tl-vivid-year">{item.year}</div>
                  <h3 className="tl-vivid-title">{item.title[currentLang]}</h3>
                  <p className="tl-vivid-text">{item.text[currentLang]}</p>
                </div>

                {/* Center dot */}
                <div className="tl-vivid-center">
                  <div className="tl-vivid-dot">
                    <Icon />
                  </div>
                  <div className="tl-vivid-connector"></div>
                </div>

                {/* Spacer */}
                <div className="tl-vivid-spacer"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
