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
      <div className="section-bg-texture batik-layer"></div>
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
        <p className="section-label reveal-item">{trans["story-label"]}</p>
        <h2 className="section-title reveal-item">{trans["story-title"]}</h2>
        <div className="ornamen-jawa-divider reveal-item">
          <img src="/ornamen-jawa.png" alt="" style={{ height: "40px", objectFit: "contain", opacity: 0.5 }} />
        </div>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div key={i} className="timeline-item reveal-item" style={{ "--reveal-delay": `${i * 0.18}s` } as React.CSSProperties}>
              <div className="tl-content-wrap">
                <div className="tl-dot">
                  <img src="/icon-love-story.png" alt="" />
                </div>
                <div className="tl-content">
                  <div className="tl-year">{item.year}</div>
                  <div className="tl-title">{item.title[currentLang]}</div>
                  <div className="tl-text">{item.text[currentLang]}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
