"use client";

import React from "react";

interface GalleryProps {
  trans: Record<string, string>;
}

export default function Gallery({ trans }: GalleryProps) {
  // Enhanced items to create "density" and "wow moment"
  const galleryItems = [
    { src: "/dekor-main.png", delay: "0.1s" },
    { src: "/floral-accent-1.png", delay: "0.2s" },
    { src: "/floral-hanging.png", delay: "0.3s" },
    { src: "/floral-accent-2.png", delay: "0.4s" },
    { src: "/floral-frame.png", delay: "0.5s" },
    { src: "/gunungan-jawa.png", delay: "0.6s" },
    { src: "/ornamen-jawa.png", delay: "0.7s" },
    { src: "/divider-section.png", delay: "0.8s" },
  ];

  return (
    <section id="section-gallery">
      {/* RICH LAYERING */}
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.15 }}></div>
      <div className="gallery-glow">
        <img src="/light-glow.png" alt="" />
      </div>

      <div className="gallery-dekor reveal-item">
        <img src="/dekor-main.png" alt="" />
      </div>

      <div className="parallax-leaf gallery-leaf reveal-item" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
        <img src="/parallax-leaves.png" alt="" />
      </div>
      
      <div className="section-inner">
        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>{trans["gallery-label"]}</p>
        <h2 className="section-title reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>{trans["gallery-title"]}</h2>
        
        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div 
              key={i} 
              className="gallery-item reveal-item" 
              style={{ "--reveal-delay": item.delay } as React.CSSProperties}
            >
              {/* GOLD FRAME FOR EVERY PHOTO */}
              <div className="gallery-img-wrap" style={{ border: "3px solid var(--gold)", borderRadius: "30px", overflow: "hidden" }}>
                <img 
                  src={item.src} 
                  alt={`Galeri ${i + 1}`} 
                  style={{ 
                    objectFit: "contain", 
                    width: "100%", 
                    height: "100%", 
                    padding: "25px", 
                    background: "rgba(255,255,255,0.05)",
                    transition: "transform 0.8s var(--ease-out)"
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
