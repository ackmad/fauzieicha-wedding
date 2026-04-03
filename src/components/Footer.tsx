"use client";

import React from "react";

import { WeddingData } from "../types";

interface FooterProps {
  basics: WeddingData["basics"];
  trans: Record<string, string>;
}

export default function Footer({ basics, trans }: FooterProps) {
  return (
    <footer>
      <div className="footer-ornamen">
        <img src="/top-ornament.png" alt="" style={{ height: "50px", objectFit: "contain", opacity: 0.4 }} />
      </div>
      <div className="footer-divider-img">
        <img src="/divider-section.png" alt="" style={{ width: "200px", opacity: 0.5 }} />
      </div>
      <p className="footer-label-text">{trans["footer-label"]}</p>
      <p className="footer-names">{`${basics.groomName.split(' ')[0]} & ${basics.brideName.split(' ')[0]}`}</p>
      <p className="footer-date">{basics.footerDate}</p>
      <div className="footer-divider-img" style={{ marginTop: "20px" }}>
        <img src="/divider-section.png" alt="" style={{ width: "200px", opacity: 0.3 }} />
      </div>
      <p className="footer-made">{trans["footer-made"]}</p>
    </footer>
  );
}
