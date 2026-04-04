"use client";

import React from "react";
import { WeddingData } from "../types";

interface GiftProps {
  bankAccounts: WeddingData["bankAccounts"];
  copyAcc: (num: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  trans: Record<string, string>;
}

const BankIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.5 1L2 6v2h19V6L11.5 1zM2 16v2h19v-2H2zM4 8v7h2V8H4zm4 0v7h2V8H8zm5 0v7h2V8h-2zm4 0v7h2V8h-2z" />
  </svg>
);

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
);

const bankColors: Record<string, string> = {
  "Bank BCA": "#1A6FBB",
  "Bank BNI": "#FF6600",
  "Bank Mandiri": "#00A651",
  "Bank BRI": "#003087",
};

export default function Gift({ bankAccounts, copyAcc, trans }: GiftProps) {
  return (
    <section id="section-amplop">
      {/* Background layers */}
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.08 }}></div>
      <div className="amplop-glow idle-pulse">
        <img src="/effects/light-glow.png" alt="" />
      </div>

      {/* Top floral */}
      <div className="amplop-floral-top idle-sway parallax-element-slow" style={{ transformOrigin: 'bottom right' }}>
        <img src="/florals/floral-accent-1.png" alt="" />
      </div>

      <div className="section-inner" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          {trans["amplop-label"]}
        </p>
        <h2 className="section-title reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {trans["amplop-title"]}
        </h2>

        {/* Envelope illustration */}
        <div className="amplop-envelope reveal-zoom" style={{ "--reveal-delay": "0.25s" } as React.CSSProperties}>
          <div className="amplop-envelope-inner">
            <span className="amplop-envelope-icon idle-sway" style={{ display: 'inline-block' }}>💌</span>
          </div>
        </div>

        <p className="amplop-desc reveal-up" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
          {trans["amplop-desc"]}
        </p>

        {/* Bank Cards */}
        <div className="amplop-cards">
          {bankAccounts.map((acc, i) => {
            const accentColor = bankColors[acc.bank] || "#C9A84C";
            return (
              <div
                key={acc.id}
                className="amplop-card reveal-up shimmer-effect"
                style={{ "--reveal-delay": `${0.4 + i * 0.15}s`, "--bank-color": accentColor } as React.CSSProperties}
              >
                {/* Card top accent bar */}
                <div className="amplop-card-bar" style={{ background: accentColor }}></div>

                {/* Bank Header */}
                <div className="amplop-card-header">
                  <div className="amplop-bank-icon" style={{ color: accentColor }}>
                    <BankIcon />
                  </div>
                  <div className="amplop-bank">{acc.bank}</div>
                </div>

                <div className="amplop-card-divider"></div>

                {/* Account Info */}
                <div className="amplop-name">{acc.name}</div>
                <div className="amplop-number">{acc.number}</div>

                {/* Copy button */}
                <button
                  className="copy-btn"
                  onClick={(e) => copyAcc(acc.number, e)}
                >
                  <CopyIcon />
                  <span>{trans["copy-btn"]}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
