"use client";

import { WeddingData } from "../types";
import { OrnamenJawa } from "./Icons";
import GoldMonogram from "./GoldMonogram";

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
        <img id="cover-hero-img" src="/backgrounds/hero-background.png" alt="Wedding Background" />
      </div>
      <div id="cover-batik">
        <img src="/backgrounds/batik-pattern.png" alt="" />
      </div>
      <div id="cover-overlay"></div>
      <div id="cover-leaves" className="idle-float-slow">
        <img src="/effects/parallax-leaves.png" alt="" id="parallax-leaves-img" />
      </div>
      <div id="cover-glow" className="idle-pulse">
        <img src="/effects/light-glow.png" alt="" />
      </div>
      <div id="cover-floral-left" className="idle-sway" style={{ transformOrigin: 'top left' }}>
        <img src="/florals/floral-frame.png" alt="" />
      </div>
      <div id="cover-floral-right" className="idle-sway" style={{ transformOrigin: 'top right' }}>
        <img src="/florals/floral-frame.png" alt="" />
      </div>
      <div id="cover-content">
        <div id="cover-top-ornament">
          <OrnamenJawa color="var(--gold)" className="ornament-svg" />
        </div>
        <div id="cover-text-block">
          <GoldMonogram variant="hero" style={{ margin: "0 auto 18px" }} />
          <p className="cover-subtitle">{trans["the-wedding-of"]}</p>
          <div className="cover-divider-line"></div>
          <div className="cover-groom">{basics.groomNickname}</div>
          <div className="cover-and">&amp;</div>
          <div className="cover-bride">{basics.brideNickname}</div>
          <p className="cover-date">{basics.weddingDate}</p>
        </div>
        <div id="cover-btn-wrap">
          <div className="cover-btn-divider"></div>
          <button id="open-btn" onClick={openInvitation}>{trans["open-btn-text"]}</button>
        </div>
      </div>
      <div id="cover-foreground">
        <img src="/effects/hero-foreground.png" alt="" />
      </div>
    </div>
  );
}
