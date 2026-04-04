import React from "react";
import { WeddingData } from "../types";
import { IconAcara, OrnamenJawa } from "./Icons";

interface EventsProps {
  events: WeddingData["events"];
  basics: WeddingData["basics"];
  currentLang: "id" | "en";
  trans: Record<string, string>;
}

const RingsIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="14" r="5" />
    <circle cx="15" cy="14" r="5" />
    <path d="M12 9c0-1.5 1-2.5 2-2.5s2 1 2 2.5-1 2.5-2 2.5-2-1-2-2.5z" />
    <path d="M12 9c0-1.5-1-2.5-2-2.5s-2 1-2 2.5 1 2.5 2 2.5 2-1 2.5-2.5" />
  </svg>
);

export default function Events({ events, basics, currentLang, trans }: EventsProps) {
  return (
    <section id="section-events">
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.1 }}></div>
      <div className="events-bg-glow">
        <img src="/effects/light-glow.png" alt="" />
      </div>

      <div className="section-inner">
        <header className="events-header reveal-item">
          <p className="events-subtitle-vivid">{trans["events-label"]}</p>
          <h2 className="events-title-vivid">{trans["events-title"]}</h2>
          <div className="events-header-ornament">
             <img src="/ornaments/ornamen-jawa.png" alt="" />
          </div>
        </header>

        <div className="events-card-wrapper">
          {events.map((event, i) => (
            <div key={event.id} className="std-arch-card reveal-item" style={{ "--reveal-delay": `${0.3 + i * 0.2}s` } as React.CSSProperties}>
              <div className="std-card-inner">
                {/* Top Floral Accent */}
                <div className="std-floral-top">
                  <img src="/florals/floral-accent-1.png" alt="" />
                </div>

                {/* Event Heading */}
                <div className="std-icon-top">
                  <RingsIcon />
                </div>
                <h3 className="std-event-type">{event.type[currentLang]}</h3>

                {/* Date Grid */}
                <div className="std-date-grid">
                  <div className="std-month">MEI</div>
                  <div className="std-main-row">
                    <div className="std-day-name">{i === 0 ? "SABTU" : "MINGGU"}</div>
                    <div className="std-day-big">{i === 0 ? "09" : "10"}</div>
                    <div className="std-year">2026</div>
                  </div>
                  <div className="std-time">PUKUL {event.time[currentLang]}</div>
                </div>

                {/* Location */}
                <div className="std-loc-divider">
                  <div className="std-pin">📍</div>
                </div>
                
                <div className="std-location-info">
                  <h4 className="std-loc-title">{event.location}</h4>
                  <p className="std-loc-addr">{event.address}</p>
                </div>

                {/* Maps Button */}
                <a href={event.mapsLink} target="_blank" className="std-maps-btn-pill">
                  <span>GOOGLE MAPS</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
