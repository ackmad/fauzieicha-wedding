"use client";

import React from "react";
import { WeddingData } from "../types";

interface StoryProps {
  timeline: WeddingData["timeline"];
  currentLang: "id" | "en";
  trans: Record<string, string>;
}

export default function Story({ timeline, currentLang, trans }: StoryProps) {
  return (
    <section id="section-story">
      {/* RICH LAYERING */}
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.12 }}></div>
      <div className="story-glow">
        <img src="/light-glow.png" alt="" />
      </div>
      
      <div className="floral-hanging-wrap">
        <img src="/floral-hanging.png" alt="" className="floral-hanging-img" />
      </div>

      <div className="parallax-leaf story-leaf-1">
        <img src="/parallax-leaves.png" alt="" />
      </div>

      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>{trans["story-label"]}</p>
        <h2 className="section-title reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>{trans["story-title"]}</h2>
        
        <div className="ornamen-jawa-divider reveal-item">
          <img src="/ornamen-jawa.png" alt="" style={{ height: "45px", objectFit: "contain", opacity: 0.6 }} />
        </div>

        <div className="timeline">
          {timeline.map((item, i) => (
            <div key={i} className="timeline-item reveal-item" style={{ "--reveal-delay": `${0.4 + i * 0.25}s` } as React.CSSProperties}>
              <div className="tl-content-wrap">
                <div className="tl-dot">
                  <img src="/icon-love-story.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div className="tl-content">
                  <div className="tl-year">{item.year}</div>
                  <div className="tl-title">{item.title[currentLang]}</div>
                  <p className="tl-text">{item.text[currentLang]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
