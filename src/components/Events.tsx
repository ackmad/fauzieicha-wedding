"use client";

import React, { useEffect, useState } from "react";
import { WeddingData } from "../types";

interface EventsProps {
  events: WeddingData["events"];
  basics: WeddingData["basics"];
  currentLang: "id" | "en";
  trans: Record<string, string>;
}

const RingsIcon = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8.5" cy="14" r="5" />
    <circle cx="15.5" cy="14" r="5" />
    <path d="M12 9.5c0-2 1.2-3.5 2.5-3.5" />
    <path d="M12 9.5c0-2-1.2-3.5-2.5-3.5" />
    <circle cx="12" cy="6" r="0.8" fill="currentColor" />
  </svg>
);

const LocationIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Countdown({ targetDate, lang }: { targetDate: string; lang: "id" | "en" }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const target = new Date(targetDate).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!mounted) return null;

  const labels = lang === "id"
    ? ["Hari", "Jam", "Menit", "Detik"]
    : ["Days", "Hours", "Minutes", "Seconds"];

  const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];

  return (
    <div className="countdown-wrap">
      {values.map((val, i) => (
        <div key={i} className="countdown-unit">
          <div className="countdown-num">{String(val).padStart(2, "0")}</div>
          <div className="countdown-label">{labels[i]}</div>
        </div>
      ))}
    </div>
  );
}

export default function Events({ events, basics, currentLang, trans }: EventsProps) {
  // Wedding date: 10 May 2026
  const weddingDateISO = "2026-05-10T08:00:00+07:00";

  return (
    <section id="section-events">
      {/* Background Layers */}
      <div className="section-bg-texture batik-layer" style={{ opacity: 0.08 }}></div>
      <div className="events-bg-glow idle-pulse">
        <img src="/effects/light-glow.png" alt="" />
      </div>
      <div className="events-floral-br idle-sway parallax-element-slow" style={{ transformOrigin: 'bottom right' }}>
        <img src="/florals/floral-accent-2.png" alt="" />
      </div>

      <div className="section-inner">
        {/* Header */}
        <header className="events-header reveal-up" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          <p className="events-subtitle-vivid">{trans["events-label"]}</p>
          <h2 className="events-title-vivid">{trans["events-title"]}</h2>
          <div className="events-header-divider">
            <span className="events-header-line"></span>
            <span className="events-header-diamond">◆</span>
            <span className="events-header-line"></span>
          </div>
        </header>

        {/* Countdown Timer */}
        <div className="countdown-section reveal-zoom" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          <p className="countdown-label-text">
            {currentLang === "id" ? "Menuju Hari Bahagia" : "Counting Down to the Big Day"}
          </p>
          <Countdown targetDate={weddingDateISO} lang={currentLang} />
          
          <a 
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${basics.groomNickname}+%26+${basics.brideNickname}&dates=20260510T010000Z/20260510T070000Z&details=Hari+Bahagia+${basics.groomNickname}+%26+${basics.brideNickname}`}
            target="_blank" 
            rel="noopener noreferrer" 
            className="calendar-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}>
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {currentLang === "id" ? "Simpan ke Kalender" : "Save to Calendar"}
          </a>
        </div>

        {/* Event Cards */}
        <div className="events-card-wrapper">
          {events.map((event, i) => (
            <div
              key={event.id}
              className="std-arch-card reveal-up"
              style={{ "--reveal-delay": `${0.3 + i * 0.2}s` } as React.CSSProperties}
            >
              <div className="std-card-inner">
                {/* Floral corner */}
                <div className="std-floral-top">
                  <img src="/florals/floral-accent-1.png" alt="" />
                </div>

                {/* Icon */}
                <div className="std-icon-top">
                  <RingsIcon />
                </div>

                {/* Event name */}
                <h3 className="std-event-type">{event.type[currentLang]}</h3>

                {/* Date Grid */}
                <div className="std-date-grid">
                  <div className="std-month">MEI</div>
                  <div className="std-main-row">
                    <div className="std-day-name">{i === 0 ? "AHAD" : "AHAD"}</div>
                    <div className="std-day-big">10</div>
                    <div className="std-year">2026</div>
                  </div>
                  <div className="std-time">{event.time[currentLang]}</div>
                </div>

                {/* Divider + Pin */}
                <div className="std-loc-divider">
                  <div className="std-pin">
                    <LocationIcon />
                  </div>
                </div>

                {/* Location */}
                <div className="std-location-info">
                  <h4 className="std-loc-title">{event.location}</h4>
                  <p className="std-loc-addr">{event.address}</p>
                </div>

                {/* Maps Button */}
                <a href={event.mapsLink} target="_blank" rel="noopener noreferrer" className="std-maps-btn-pill">
                  <LocationIcon />
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
