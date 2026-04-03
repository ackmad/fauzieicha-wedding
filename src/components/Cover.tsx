"use client";

import { WeddingData } from "../types";

interface CoverProps {
  isCoverRemoved: boolean;
  invitationOpened: boolean;
  openInvitation: () => void;
  basics: WeddingData["basics"];
  trans: Record<string, string>;
}

export default function Cover({ isCoverRemoved, invitationOpened, openInvitation, basics, trans }: CoverProps) {
  if (isCoverRemoved) return null;
  
  return (
    <div id="cover" className={invitationOpened ? 'opening' : ''}>
      <div id="cover-bg">
        <img id="cover-hero-img" src="/hero-background.png" alt="Wedding Background" />
      </div>
      <div id="cover-batik">
        <img src="/batik-pattern.png" alt="" />
      </div>
      <div id="cover-overlay"></div>
      <div id="cover-leaves">
        <img src="/parallax-leaves.png" alt="" id="parallax-leaves-img" />
      </div>
      <div id="cover-glow">
        <img src="/light-glow.png" alt="" />
      </div>
      <div id="cover-floral-left">
        <img src="/floral-frame.png" alt="" />
      </div>
      <div id="cover-floral-right">
        <img src="/floral-frame.png" alt="" />
      </div>
      <div id="cover-content">
        <div id="cover-top-ornament">
          <img src="/top-ornament.png" alt="Javanese Ornament" />
        </div>
        <div id="cover-text-block">
          <p className="cover-subtitle">{trans["the-wedding-of"]}</p>
          <div className="cover-divider-line"></div>
          <div className="cover-groom">{basics.groomName}</div>
          <div className="cover-and">&amp;</div>
          <div className="cover-bride">{basics.brideName}</div>
          <p className="cover-date">{basics.weddingDate}</p>
        </div>
        <div id="cover-btn-wrap">
          <div className="cover-btn-divider"></div>
          <button id="open-btn" onClick={openInvitation}>{trans["open-btn-text"]}</button>
        </div>
      </div>
      <div id="cover-foreground">
        <img src="/hero-foreground.png" alt="" />
      </div>
    </div>
  );
}
