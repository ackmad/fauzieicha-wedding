import React from "react";
import { WeddingData } from "../types";
import { OrnamenJawa, SectionDivider } from "./Icons";
import GoldMonogram from "./GoldMonogram";

interface FooterProps {
  basics: WeddingData["basics"];
  trans: Record<string, string>;
}

export default function Footer({ basics, trans }: FooterProps) {
  return (
    <footer id="section-footer">
      {/* Background Texture */}
      <div className="footer-bg-texture"></div>
      
      {/* Glow Ambient Light */}
      <div className="footer-glow idle-pulse">
        <img src="/effects/light-glow.png" alt="" />
      </div>

      {/* Golden Dust Particles */}
      <div className="golden-dust">
        <div className="dust-particle d-1"></div>
        <div className="dust-particle d-2"></div>
        <div className="dust-particle d-3"></div>
        <div className="dust-particle d-4"></div>
        <div className="dust-particle d-5"></div>
      </div>

      {/* Floral Accents */}
      <div className="footer-floral footer-floral-left idle-float-slow">
        <img src="/florals/floral-accent-1.png" alt="" />
      </div>
      <div className="footer-floral footer-floral-right idle-sway" style={{ transformOrigin: "bottom right" }}>
        <img src="/florals/floral-accent-1.png" alt="" style={{ transform: "scaleX(-1)" }} />
      </div>

      <div className="footer-content-wrapper">
        {/* Ornamen Atas */}
        <div className="footer-ornamen reveal-item">
          <OrnamenJawa color="var(--gold-pale)" style={{ height: "45px", opacity: 0.6 }} />
        </div>

        {/* Monogram */}
        <div className="footer-monogram-container reveal-item">
          <GoldMonogram variant="secondary" className="footer-grand-monogram hover-glow" />
        </div>

        {/* Closing Prayer / Text */}
        <div className="footer-text-block reveal-up">
          <p className="footer-doa">
            "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada pernikahan kami."
          </p>
          <div className="footer-divider-img">
            <SectionDivider color="var(--gold)" style={{ width: "120px", opacity: 0.3 }} />
          </div>
          <p className="footer-names">{`${basics.groomName.split(' ')[0]} & ${basics.brideName.split(' ')[0]}`}</p>
          <p className="footer-date">{basics.footerDate}</p>
        </div>

        {/* Terima Kasih */}
        <p className="footer-terima-kasih reveal-item">Terima Kasih</p>
      </div>

      {/* Credit Watermark */}
      <div className="footer-watermark">
        <a 
          href="https://ackmad.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="developer-credit-link"
        >
          <span className="credit-text">Website by Ackmad Elfan Purnama</span>
          <span className="sparkle-fx"></span>
        </a>
      </div>
    </footer>
  );
}
