import React from "react";
import { OrnamenJawa } from "./Icons";

interface WishesProps {
  wishes: { name: string; text: string }[];
  submitWish: (e: React.FormEvent) => void;
  trans: Record<string, string>;
}

export default function Wishes({ wishes, submitWish, trans }: WishesProps) {
  return (
    <section id="section-wishes">
      <div className="wishes-glow">
        <img src="/effects/light-glow.png" alt="" />
      </div>
      <div className="section-bg-dark-soft"></div>
      <div className="wishes-ornamen reveal-item">
        <OrnamenJawa color="var(--gold)" style={{ height: "36px", opacity: 0.3 }} />
      </div>
      <div className="section-inner" style={{ position: "relative", zIndex: 2 }}>
        <p className="section-label reveal-item">{trans["wishes-label"]}</p>
        <h2 className="section-title reveal-item">{trans["wishes-title"]}</h2>
        <form className="wish-form reveal-item" id="wish-form" onSubmit={submitWish}>
          <div className="form-row">
            <label className="form-label">{trans["name-label"]}</label>
            <input className="form-input" id="wish-name" type="text" placeholder={trans["wish-placeholder"]} />
          </div>
          <div className="form-row">
            <label className="form-label">{trans["wish-label-text"]}</label>
            <textarea className="form-input" id="wish-text" placeholder={trans["message-placeholder"]}></textarea>
          </div>
          <button className="submit-btn" type="submit">{trans["submit-btn"]}</button>
        </form>
        <div className="wish-list">
          {wishes.map((wish, i) => (
            <div key={i} className="wish-card revealed">
              <div className="wish-author">{wish.name}</div>
              <div className="wish-text">{wish.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
