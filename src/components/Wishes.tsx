"use client";

import React, { useState } from "react";
import { OrnamenJawa } from "./Icons";

interface WishesProps {
  wishes: { name: string; text: string }[];
  submitWish: (e: React.FormEvent) => void;
  trans: Record<string, string>;
}

export default function Wishes({ wishes, submitWish, trans }: WishesProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    submitWish(e);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section id="section-wishes">
      {/* Background layers */}
      <div className="wishes-glow">
        <img src="/effects/light-glow.png" alt="" />
      </div>
      <div className="section-bg-dark-soft"></div>

      {/* Top floral */}
      <div className="wishes-floral-top reveal-item">
        <img src="/florals/floral-accent-1.png" alt="" />
      </div>

      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <div className="wishes-ornamen reveal-item">
          <OrnamenJawa color="var(--gold)" style={{ height: "36px", opacity: 0.4 }} />
        </div>

        <p className="section-label reveal-item" style={{ "--reveal-delay": "0.1s" } as React.CSSProperties}>
          {trans["wishes-label"]}
        </p>
        <h2 className="section-title reveal-item" style={{ "--reveal-delay": "0.2s" } as React.CSSProperties}>
          {trans["wishes-title"]}
        </h2>

        {/* Form */}
        <form
          className="wish-form reveal-item"
          id="wish-form"
          onSubmit={handleSubmit}
          style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}
        >
          <div className="form-row">
            <label className="form-label">{trans["name-label"]}</label>
            <input
              className="form-input"
              id="wish-name"
              type="text"
              placeholder={trans["wish-placeholder"]}
              autoComplete="off"
            />
          </div>
          <div className="form-row">
            <label className="form-label">{trans["wish-label-text"]}</label>
            <textarea
              className="form-input"
              id="wish-text"
              placeholder={trans["message-placeholder"]}
              rows={4}
            />
          </div>
          <button className={`submit-btn ${submitted ? "submitted" : ""}`} type="submit">
            {submitted ? "✓ Terkirim!" : trans["submit-btn"]}
          </button>
        </form>

        {/* Wish cards */}
        <div className="wish-list">
          {wishes.map((wish, i) => (
            <div key={i} className="wish-card revealed">
              <div className="wish-card-header">
                <div className="wish-avatar">
                  {wish.name.charAt(0).toUpperCase()}
                </div>
                <div className="wish-author">{wish.name}</div>
              </div>
              <div className="wish-quote-mark">"</div>
              <div className="wish-text">{wish.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
