"use client";

import React from "react";

import { WeddingData } from "../types";

interface GiftProps {
  bankAccounts: WeddingData["bankAccounts"];
  copyAcc: (num: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  trans: Record<string, string>;
}

export default function Gift({ bankAccounts, copyAcc, trans }: GiftProps) {
  return (
    <section id="section-amplop">
      <div className="section-bg-texture batik-layer"></div>
      <div className="amplop-floral-top reveal-item">
        <img src="/floral-accent-1.png" alt="" style={{ height: "80px", objectFit: "contain", opacity: 0.6 }} />
      </div>
      <div className="section-inner" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <p className="section-label reveal-item">{trans["amplop-label"]}</p>
        <h2 className="section-title reveal-item">{trans["amplop-title"]}</h2>
        <p className="amplop-desc reveal-item">{trans["amplop-desc"]}</p>
        <div className="amplop-cards">
          {bankAccounts.map((acc, i) => (
            <div key={acc.id} className="amplop-card reveal-item" style={{ "--reveal-delay": `${i * 0.18}s` } as React.CSSProperties}>
              <div className="amplop-bank">{acc.bank}</div>
              <div className="amplop-name">{acc.name}</div>
              <div className="amplop-number">{acc.number}</div>
              <button className="copy-btn" onClick={(e) => copyAcc(acc.number, e)}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                <span>{trans["copy-btn"]}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
