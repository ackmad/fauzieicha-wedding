"use client";

import React, { useRef, useState } from "react";
import { WeddingData } from "../types";

interface GiftProps {
  bankAccounts: WeddingData["bankAccounts"];
  copyAcc: (num: string, e: React.MouseEvent<any>) => void;
  trans: Record<string, string>;
}

// SVG Components for the Bank Card
const ChipIcon = () => (
  <svg width="45" height="34" viewBox="0 0 40 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="bank-chip">
    <rect width="40" height="30" rx="6" fill="url(#chip-gradient)" />
    <path d="M12 0V30M28 0V30M0 10H12M28 10H40M0 20H12M28 20H40M12 15H28" stroke="#5D4339" strokeWidth="1" strokeOpacity="0.6" />
    <defs>
      <linearGradient id="chip-gradient" x1="0" y1="0" x2="40" y2="30" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FAD961" />
        <stop offset="1" stopColor="#B38728" />
      </linearGradient>
    </defs>
  </svg>
);

const ContactlessIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="bank-contactless">
    <defs>
      <linearGradient id="gold-grad" x1="0" y1="0" x2="24" y2="24">
        <stop stopColor="#F5D061" />
        <stop offset="1" stopColor="#D4AF37" />
      </linearGradient>
    </defs>
    <path d="M5 8.5a13 13 0 0 1 14 0" stroke="url(#gold-grad)" />
    <path d="M7 11.5a9 9 0 0 1 10 0" stroke="url(#gold-grad)"/>
    <path d="M9.5 15a5 5 0 0 1 5 0" stroke="url(#gold-grad)"/>
    <circle cx="12" cy="18.5" r="1.5" fill="url(#gold-grad)" stroke="none"/>
  </svg>
);

const PremiumBankCard = ({ acc, index, trans, copyAcc }: { acc: WeddingData["bankAccounts"][0], index: number, trans: Record<string, string>, copyAcc: any }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Gentle 3D tilt effect
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.setProperty('--rx', `${rotateX}deg`);
    cardRef.current.style.setProperty('--ry', `${rotateY}deg`);
    cardRef.current.style.setProperty('--tx', `${x}px`);
    cardRef.current.style.setProperty('--ty', `${y}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--rx', `0deg`);
    cardRef.current.style.setProperty('--ry', `0deg`);
    cardRef.current.style.setProperty('--tx', `-100px`);
    cardRef.current.style.setProperty('--ty', `-100px`);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Trigger existing logic
    copyAcc(acc.number, e);

    const rect = cardRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);

    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="premium-card-wrapper reveal-up" style={{ "--reveal-delay": `${index * 0.15}s` } as React.CSSProperties}>
      <div
        ref={cardRef}
        className={`premium-bank-card ${copied ? 'is-copied' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {/* Visual Premium Layers */}
        <div className="card-gloss"></div>
        <div className="card-pattern"></div>
        <div className="card-noise"></div>
        <div className="card-shimmer"></div>

        <div className="card-content">
          <div className="card-top">
            <span className="card-bank-name">{acc.bank}</span>
            <ContactlessIcon />
          </div>

          <div className="card-chip-row">
            <ChipIcon />
            {copied && <span className="card-pulse-indicator"></span>}
          </div>

          <div className="card-number-wrapper">
            <div className="card-number">{acc.number}</div>
          </div>

          <div className="card-bottom">
            <div className="card-owner">
              <span className="card-label">CARDHOLDER NAME</span>
              <span className="card-name">{acc.name}</span>
            </div>
            <div className="card-brand-logo">
              <span className="brand-circle left"></span>
              <span className="brand-circle right"></span>
            </div>
          </div>
        </div>

        {/* Ripple Effects Container */}
        {ripples.map(r => (
          <span key={r.id} className="card-ripple" style={{ left: r.x, top: r.y }}></span>
        ))}

        {/* Interactive Feedback */}
        <div className={`card-feedback ${copied ? 'show' : ''}`}>
          <div className="feedback-inner">
            <span className="feedback-check">✔</span>
            <span className="feedback-text">Nomor rekening berhasil disalin</span>
          </div>
        </div>
      </div>
      
      {/* Click Hint under card */}
      <div className="card-hint">Ketuk kartu untuk salin</div>
    </div>
  );
};

export default function Gift({ bankAccounts, copyAcc, trans }: GiftProps) {
  return (
    <section id="section-amplop">
      <div className="premium-batik-bg"></div>
      <div className="amplop-glow">
        <img src="/effects/light-glow.png" alt="" />
      </div>

      <div className="section-inner" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          {trans["amplop-label"]}
        </p>
        <h2 className="section-title reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {trans["amplop-title"]}
        </h2>

        <p className="amplop-desc reveal-up" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
          {trans["amplop-desc"]}
        </p>

        {/* Premium Bank Cards Container */}
        <div className="premium-cards-container">
          {bankAccounts.map((acc, i) => (
            <PremiumBankCard key={acc.id} acc={acc} index={i} trans={trans} copyAcc={copyAcc} />
          ))}
        </div>
      </div>
    </section>
  );
}
