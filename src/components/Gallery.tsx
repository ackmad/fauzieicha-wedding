"use client";

import React, { useState } from "react";

interface GalleryProps {
  trans: Record<string, string>;
}

// Wedding gallery photos — using florals/decorations as placeholder
// In production, replace these with actual couple photos
const galleryItems = [
  { src: "/florals/floral-frame.png", caption: "Momen Bersama", aspect: "portrait" },
  { src: "/decorations/dekor-main.png", caption: "Dekorasi Pernikahan", aspect: "landscape" },
  { src: "/florals/floral-accent-1.png", caption: "Bunga-Bunga Cinta", aspect: "portrait" },
  { src: "/florals/floral-hanging.png", caption: "Keindahan Alam", aspect: "landscape" },
  { src: "/ornaments/gunungan-jawa.png", caption: "Budaya Jawa", aspect: "portrait" },
  { src: "/florals/floral-accent-2.png", caption: "Kenangan Indah", aspect: "landscape" },
];

export default function Gallery({ trans }: GalleryProps) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxCaption, setLightboxCaption] = useState<string>("");

  const openLightbox = (src: string, caption: string) => {
    setLightboxSrc(src);
    setLightboxCaption(caption);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxSrc(null);
    document.body.style.overflow = "";
  };

  return (
    <section id="section-gallery">
      {/* Background layers */}
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.1 }}></div>
      <div className="gallery-glow">
        <img src="/effects/light-glow.png" alt="" />
      </div>

      {/* Floating leaf */}
      <div className="parallax-leaf gallery-leaf">
        <img src="/effects/parallax-leaves.png" alt="" />
      </div>

      <div className="section-inner">
        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          {trans["gallery-label"] || "Galeri"}
        </p>
        <h2 className="section-title reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {trans["gallery-title"] || "Momen Indah"}
        </h2>
        <p className="gallery-subtitle reveal-item" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
          Kenangan berharga yang kami abadikan bersama
        </p>

        {/* Photography note */}
        <div className="gallery-coming-soon reveal-item" style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}>
          <div className="gallery-coming-inner">
            <div className="gallery-coming-icon">📸</div>
            <p className="gallery-coming-text">
              Foto-foto kenangan kami akan segera hadir di sini.<br />
              <em>Coming soon...</em>
            </p>
          </div>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div
              key={i}
              className={`gallery-item reveal-item gallery-item--${item.aspect}`}
              style={{ "--reveal-delay": `${0.4 + i * 0.1}s` } as React.CSSProperties}
              onClick={() => openLightbox(item.src, item.caption)}
            >
              <div className="gallery-img-frame">
                <img
                  src={item.src}
                  alt={item.caption}
                  className="gallery-img"
                />
                <div className="gallery-overlay">
                  <div className="gallery-zoom-icon">🔍</div>
                  <p className="gallery-caption">{item.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <div className="lightbox-backdrop" onClick={closeLightbox}>
          <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={closeLightbox}>✕</button>
            <img src={lightboxSrc} alt={lightboxCaption} className="lightbox-img" />
            <p className="lightbox-caption">{lightboxCaption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
