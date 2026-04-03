"use client";

import React from "react";

interface GalleryProps {
  trans: Record<string, string>;
}

export default function Gallery({ trans }: GalleryProps) {
  // Use a richer set of images to make it look "crowded" (ramai) and "heboh"
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
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.12 }}></div>
      <div className="gallery-dekor reveal-item">
        <img src="/dekor-main.png" alt="" />
      </div>
      <div className="parallax-leaf gallery-leaf reveal-item" style={{ "--reveal-delay": "0.4s" } as React.CSSProperties}>
        <img src="/parallax-leaves.png" alt="" />
      </div>
      
      <div className="section-inner">
        <p className="section-label reveal-item">{trans["gallery-label"]}</p>
        <h2 className="section-title reveal-item">{trans["gallery-title"]}</h2>
        
        <div className="gallery-grid">
          {galleryItems.map((item, i) => (
            <div 
              key={i} 
              className="gallery-item reveal-item" 
              style={{ "--reveal-delay": item.delay } as React.CSSProperties}
            >
              <div className="gallery-img-wrap">
                <img 
                  src={item.src} 
                  alt={`Galeri ${i + 1}`} 
                  style={{ objectFit: "contain", width: "100%", height: "100%", padding: "20px", background: "white" }} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
