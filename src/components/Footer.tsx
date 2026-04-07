import React from "react";
import { WeddingData } from "../types";
import { OrnamenJawa, SectionDivider } from "./Icons";
import GoldMonogram from "./GoldMonogram";

interface FooterProps {
  basics: WeddingData["basics"];
  trans: Record<string, string>;
}

export default function Footer({ basics, trans }: FooterProps) {
  const shareUndangan = () => {
    const shareData = {
      title: `Undangan Pernikahan ${basics.brideName.split(' ')[0]} & ${basics.groomName.split(' ')[0]}`,
      text: `Mari merayakan kebahagiaan kami ${basics.brideName.split(' ')[0]} & ${basics.groomName.split(' ')[0]}`,
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText(window.location.href);
      const btn = document.querySelector('.premium-share-btn');
      if(btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span>Tersalin ✓</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
      }
    }
  };

  return (
    <footer id="section-footer-premium">
      {/* ── Background Layer ── */}
      <div className="footer-premium-bg">
        <div className="footer-grain-overlay"></div>
        <div className="ambient-glow d-1"></div>
        <div className="ambient-glow d-2"></div>
        <div className="floating-particles">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className={`particle p-${i}`}></div>
          ))}
        </div>
      </div>

      {/* ── Main Content Container ── */}
      <div className="footer-premium-content">
        
        {/* Top Ornament */}
        <div className="footer-ornament-top reveal-item">
          <OrnamenJawa color="var(--accent-gold)" style={{ height: "40px", opacity: 0.5 }} />
        </div>

        {/* Closing Monogram */}
        <div className="footer-monogram-small reveal-scale" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          <GoldMonogram variant="secondary" className="footer-monogram-svg" />
        </div>

        {/* Main Text Content */}
        <div className="footer-main-text reveal-up" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          <h2 className="footer-thanks-title shimmer-text-gold">Terima Kasih</h2>
          
          <p className="footer-doa-text">
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada pernikahan kami."
          </p>

          <div className="footer-divider-center">
            <SectionDivider color="var(--accent-gold)" style={{ width: "140px", opacity: 0.4 }} />
          </div>

          <div className="footer-couple-names-v">
            <div className="footer-name-bride">{basics.brideNickname}</div>
            <div className="footer-name-amp">&</div>
            <div className="footer-name-groom">{basics.groomNickname}</div>
          </div>
          <p className="footer-full-date">{basics.footerDate}</p>
        </div>

        {/* Premium Share Button */}
        <div className="footer-actions reveal-up" style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}>
          <button className="premium-share-btn" onClick={shareUndangan}>
            <svg className="share-icon-svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
            <span className="share-label">Bagikan Undangan</span>
            <div className="btn-shimmer"></div>
          </button>
        </div>

        {/* Professional Credit Watermark */}
        <div className="footer-professional-credit reveal-up" style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}>
          <a 
            href="https://ackmad.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="pro-credit-link"
          >
             <span className="credit-label">DESIGNED & CRAFTED BY</span>
             <span className="credit-name">ACKMAD ELFAN PURNAMA</span>
             <span className="credit-glow-line"></span>
          </a>
        </div>
      </div>

      {/* ── Symmetrical Floral Borders ── */}
      <div className="footer-floral-border-wrap">
        <div className="floral-left parallax-floral" data-speed="0.05">
          <img src="/florals/floral-accent-1.png" alt="Floral decoration" />
        </div>
        <div className="floral-right parallax-floral" data-speed="0.05">
          <img src="/florals/floral-accent-1.png" alt="Floral decoration" style={{ transform: "scaleX(-1)" }} />
        </div>
      </div>
    </footer>
  );
}
