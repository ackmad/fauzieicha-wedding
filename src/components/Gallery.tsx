"use client";

import React from "react";

interface GalleryProps {
  trans: Record<string, string>;
}

export default function Gallery({ trans }: GalleryProps) {
  return (
    <section id="section-gallery">
      {/* Background layers */}
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.1 }}></div>
      <div className="gallery-glow idle-pulse">
        <img src="/effects/light-glow.webp" alt="" />
      </div>

      {/* Floating leaf */}
      <div className="parallax-leaf gallery-leaf idle-float">
        <img src="/effects/parallax-leaves.png" alt="" />
      </div>

      <div className="section-inner">
        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          {trans["gallery-label"] || "Kenangan Indah"}
        </p>
        <h2 className="section-title reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {trans["gallery-title"] || "Galeri Foto"}
        </h2>

        {/* Coming soon card */}
        <div className="gallery-coming-soon reveal-blur" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
          <div className="gallery-coming-inner">
            <div className="gallery-coming-icon idle-sway" style={{ display: 'inline-block' }}>📸</div>
            <h3 className="gallery-coming-title">Coming Soon</h3>
            <p className="gallery-coming-text">
              Foto-foto kenangan perjalanan cinta kami akan segera hadir di sini.<br />
              Nantikan momen-momen berharga kami bersama.
            </p>
            <div className="gallery-coming-divider">
              <span></span>
              <span className="gallery-coming-diamond">◆</span>
              <span></span>
            </div>
            <p className="gallery-coming-date">10 Mei 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}
