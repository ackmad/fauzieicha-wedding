"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";

interface GalleryProps {
  trans: Record<string, string>;
}

const images: string[] = [
  "/photo-galeri/photo1.webp",
  "/photo-galeri/photo2.webp",
  "/photo-galeri/photo3.webp",
  "/photo-galeri/photo4.webp",
  "/photo-galeri/photo5.webp",
  "/photo-galeri/photo6.webp",
  "/photo-galeri/photo7.webp",
  "/photo-galeri/photo8.webp",
  "/photo-galeri/photo9.webp",
  "/photo-galeri/photo10.webp",
];

const leftImages  = images.filter((_, i) => i % 2 === 0);
const rightImages = images.filter((_, i) => i % 2 !== 0);

export default function Gallery({ trans }: GalleryProps) {
  const [selected, setSelected]   = useState<number | null>(null);
  const [mounted, setMounted]     = useState(false);
  const selectedRef               = useRef<number | null>(null);

  // Client-only: enable portal
  useEffect(() => setMounted(true), []);

  // Sync ref
  useEffect(() => { selectedRef.current = selected; }, [selected]);

  // Scroll lock
  useEffect(() => {
    document.body.style.overflow = selected !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  // Keyboard navigation — stable empty-deps hook
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const s = selectedRef.current;
      if (s === null) return;
      if (e.key === "Escape")     setSelected(null);
      if (e.key === "ArrowLeft")  setSelected((s - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") setSelected((s + 1) % images.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const close = useCallback(() => setSelected(null), []);
  const prev  = useCallback(() => {
    setSelected(i => i !== null ? (i - 1 + images.length) % images.length : 0);
  }, []);
  const next  = useCallback(() => {
    setSelected(i => i !== null ? (i + 1) % images.length : 0);
  }, []);

  // ─── Card Styles ────────────────────────────────────────────────────────
  const cardBase: React.CSSProperties = {
    position: "relative",
    borderRadius: "18px",
    overflow: "hidden",
    cursor: "pointer",
    border: "1.5px solid rgba(212,175,55,0.3)",
    backgroundColor: "#1c2b22",
    marginBottom: "10px",
    display: "block",
    boxShadow: "0 4px 18px rgba(0,0,0,0.18)",
    transition: "border-color .35s, box-shadow .35s",
  };

  // ─── Lightbox (via Portal — renders directly on document.body) ──────────
  const lightbox = mounted && selected !== null ? createPortal(
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 2147483647, // max z-index
        background: "rgba(4, 7, 5, 0.97)",
        isolation: "isolate",
      }}
      onClick={close}
    >
      {/* ── Top bar ── */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, zIndex: 1,
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)",
        }}
      >
        {/* Close ✕ */}
        <button
          onClick={close}
          style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
            border: "1.5px solid rgba(255,255,255,0.22)",
            color: "#fff", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Counter */}
        <span style={{
          color: "rgba(255,255,255,0.45)", fontSize: 13,
          fontFamily: "sans-serif", letterSpacing: "0.08em",
        }}>
          {selected + 1} / {images.length}
        </span>
      </div>

      {/* ── Photo — always perfectly centered ── */}
      <img
        key={selected}
        src={images[selected]}
        alt="Preview"
        onClick={e => e.stopPropagation()}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "block",
          maxWidth: "min(90vw, 500px)",
          maxHeight: "78vh",
          width: "auto",
          height: "auto",
          objectFit: "contain",
          borderRadius: "14px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
          border: "1px solid rgba(212,175,55,0.12)",
          zIndex: 1,
        }}
      />

      {/* ── Prev / Next ── */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        style={{
          position: "absolute", left: 12, top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      <button
        onClick={e => { e.stopPropagation(); next(); }}
        style={{
          position: "absolute", right: 12, top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          width: 48, height: 48, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* ── Caption ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0, zIndex: 1,
          padding: "24px",
          textAlign: "center",
          background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          pointerEvents: "none",
        }}
      >
        <p style={{
          margin: 0,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: 19,
          color: "rgba(212,175,55,0.8)",
        }}>
          Fauzi & Icha
        </p>
        <p style={{
          margin: "5px 0 0",
          fontSize: 10,
          color: "rgba(255,255,255,0.28)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}>
          Ketuk di mana saja untuk menutup
        </p>
      </div>
    </div>,
    document.body
  ) : null;

  // ─── Render ─────────────────────────────────────────────────────────────
  return (
    <>
      <style>{`
        .g-card:hover img        { transform: scale(1.06); }
        .g-card img              { transition: transform .65s ease; }
        .g-card:hover .g-hover  { background: rgba(0,0,0,0.30) !important; }
        .g-card:hover .g-icon   { opacity: 1 !important; transform: scale(1) !important; }
        .g-card:hover           { border-color: rgba(212,175,55,0.7) !important;
                                  box-shadow: 0 8px 28px rgba(0,0,0,0.28) !important; }
      `}</style>

      <section id="section-gallery">
        <div className="section-bg-texture batik-layer" style={{ opacity: 0.1 }}></div>
        <div className="gallery-glow idle-pulse">
          <img src="/effects/light-glow.webp" alt="" />
        </div>
        <div className="parallax-leaf gallery-leaf idle-float">
          <img src="/effects/parallax-leaves.png" alt="" />
        </div>

        <div className="section-inner">
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p className="section-label" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
              {trans["gallery-label"] || "Kenangan Indah"}
            </p>
            <h2 className="section-title" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
              {trans["gallery-title"] || "Galeri Foto"}
            </h2>
          </div>

          {/* 2-Column Masonry */}
          <div style={{
            display: "flex",
            gap: "10px",
            maxWidth: "500px",
            margin: "0 auto",
            alignItems: "flex-start",
          }}>
            {/* Left column */}
            <div style={{ flex: 1 }}>
              {leftImages.map((src, i) => (
                <motion.div
                  key={src}
                  className="g-card"
                  style={cardBase}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                  onClick={() => setSelected(i * 2)}
                >
                  <img src={src} alt="" style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" />
                  <div className="g-hover" style={{
                    position: "absolute", inset: 0, background: "rgba(0,0,0,0)",
                    display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none",
                    transition: "background .35s",
                  }}>
                    <span className="g-icon" style={{
                      width: 46, height: 46, borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                      opacity: 0, transform: "scale(.75)", transition: "opacity .3s, transform .3s",
                    }}>
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right column */}
            <div style={{ flex: 1 }}>
              {rightImages.map((src, i) => (
                <motion.div
                  key={src}
                  className="g-card"
                  style={cardBase}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.07 + 0.04 }}
                  onClick={() => setSelected(i * 2 + 1)}
                >
                  <img src={src} alt="" style={{ width: "100%", height: "auto", display: "block" }} loading="lazy" />
                  <div className="g-hover" style={{
                    position: "absolute", inset: 0, background: "rgba(0,0,0,0)",
                    display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none",
                    transition: "background .35s",
                  }}>
                    <span className="g-icon" style={{
                      width: 46, height: 46, borderRadius: "50%",
                      background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
                      opacity: 0, transform: "scale(.75)", transition: "opacity .3s, transform .3s",
                    }}>
                      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                      </svg>
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox rendered via portal directly onto document.body */}
      {lightbox}
    </>
  );
}
