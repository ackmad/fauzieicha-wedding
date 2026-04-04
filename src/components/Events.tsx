import React from "react";
import { WeddingData } from "../types";
import { IconAcara, OrnamenJawa, SectionDivider } from "./Icons";

interface EventsProps {
  events: WeddingData["events"];
  basics: WeddingData["basics"];
  currentLang: "id" | "en";
  trans: Record<string, string>;
}

export default function Events({ events, basics, currentLang, trans }: EventsProps) {
  return (
    <section id="section-events">
      {/* RICH LAYERING */}
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.15 }}></div>
      <div className="events-bg-glow">
        <img src="/effects/light-glow.png" alt="" />
      </div>

      <div className="events-floating-ornament">
        <OrnamenJawa color="var(--gold)" className="ornament-svg" />
      </div>

      {/* FIXED FLORAL WRAPPERS */}
      <div className="floral-accent-left reveal-item">
        <img src="/florals/floral-accent-1.png" alt="" />
      </div>
      <div className="floral-accent-right reveal-item">
        <img src="/florals/floral-accent-2.png" alt="" />
      </div>

      <div className="section-inner">
        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>{trans["events-label"]}</p>
        <h2 className="section-title reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>{trans["events-title"]}</h2>
        
        <div className="events-grid">
          {events.map((event, i) => (
            <div key={event.id} className="event-card reveal-item" style={{ "--reveal-delay": `${0.4 + i * 0.3}s` } as React.CSSProperties}>
              {/* Internal Card Decor */}
              <div className="card-corner-floral top-left">
                <img src="/florals/floral-accent-1.png" alt="" style={{ width: "80px", opacity: 0.3 }} />
              </div>

              <div className="event-icon">
                <IconAcara color="var(--gold)" className="icon-svg" />
              </div>

              <div className="event-type">{event.type[currentLang]}</div>
              <div className="event-name">{event.name[currentLang]}</div>
              
              <div className="event-card-divider">
                <SectionDivider color="var(--gold)" className="divider-svg" />
              </div>

              <div className="event-detail">
                <span className="event-date-main">{basics.weddingDate}</span><br />
                <span className="event-time-main">{event.time[currentLang]}</span><br /><br />
                
                <div className="event-loc-wrap">
                  <strong className="event-loc-name">{event.location}</strong>
                  <p className="event-loc-addr">{event.address}</p>
                </div>
              </div>

              <a href={event.mapsLink} target="_blank" className="maps-btn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{trans["maps-btn"]}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
