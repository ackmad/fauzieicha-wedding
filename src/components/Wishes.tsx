"use client";

import React, { useState } from "react";
import { OrnamenJawa } from "./Icons";

interface Wish {
  name: string; 
  text: string;
  isAttending?: boolean; // New field for attendance
}

interface WishesProps {
  wishes: Wish[];
  submitWish: (e: React.FormEvent) => void;
  trans: Record<string, string>;
}

export default function Wishes({ wishes, submitWish, trans }: WishesProps) {
  const [toast, setToast] = useState<{ show: boolean, msg: string, type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);

  // Stats calculation
  const totalWishes = wishes.length;
  const totalAttending = wishes.filter(w => w.isAttending).length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const nameInput = (document.getElementById('wish-name') as HTMLInputElement);
    const textInput = (document.getElementById('wish-text') as HTMLTextAreaElement);

    if (!nameInput.value.trim() || !textInput.value.trim()) {
      setToast({ show: true, msg: "Harap isi nama dan pesan doa Anda", type: 'error' });
      setIsLoading(false);
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      return;
    }

    try {
      // In a real app, the prop submitWish would call an API
      // Since we're mimicking local state for now
      submitWish(e);
      
      setToast({ show: true, msg: "Terima kasih! Pesan dan konfrontasi kehadiran Anda telah terkirim.", type: 'success' });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setToast({ show: true, msg: "Oops! Terjadi kesalahan saat mengirim pesan.", type: 'error' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
    }
  };

  return (
    <section id="section-wishes">
      {/* Background layers */}
      <div className="wishes-glow idle-pulse">
        <img src="/effects/light-glow.png" alt="" />
      </div>
      <div className="section-bg-dark-soft"></div>

      {/* Top floral ornament decoration */}
      <div className="wishes-floral-top idle-sway" style={{ transformOrigin: 'bottom right' }}>
        <img src="/florals/floral-accent-1.png" alt="" style={{ opacity: 0.15 }} />
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`wish-toast ${toast.type} reveal-up`}>
          <div className="toast-icon">{toast.type === 'success' ? '✓' : '⚠'}</div>
          <p className="toast-msg">{toast.msg}</p>
        </div>
      )}

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

        {/* Counter Stats Summary */}
        <div className="wish-stats-container reveal-item">
          <div className="stat-item">
            <span className="stat-num">{totalWishes}</span>
            <span className="stat-lbl">Ucapan</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-num">{totalAttending}</span>
            <span className="stat-lbl">Telah Konfirmasi Hadir</span>
          </div>
        </div>

        {/* Form */}
        <form
          className="wish-form reveal-up"
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
              name="name"
              placeholder={trans["wish-placeholder"]}
              autoComplete="off"
              required
            />
          </div>

          <div className="form-row">
            <label className="form-label">Konfirmasi Kehadiran</label>
            <select className="form-input form-select" id="wish-attendance" name="isAttending" required>
              <option value="true">Sangat Ingin Datang (Hadir)</option>
              <option value="false">Tidak Bisa Datang</option>
            </select>
          </div>

          <div className="form-row">
            <label className="form-label">{trans["wish-label-text"]}</label>
            <textarea
              className="form-input"
              id="wish-text"
              name="text"
              placeholder={trans["message-placeholder"]}
              rows={3}
              required
            />
          </div>

          <button className={`submit-btn ${isLoading ? 'loading' : ''}`} type="submit" disabled={isLoading}>
            {isLoading ? "Mengirim..." : trans["submit-btn"]}
          </button>
        </form>

        {/* Wish cards list with attendance badge */}
        <div className="wish-list">
          {wishes.map((wish, i) => (
            <div key={i} className="wish-card reveal-up" style={{ "--reveal-delay": `${0.1 + i * 0.1}s` } as React.CSSProperties}>
              <div className="wish-card-header">
                <div className="wish-avatar">
                  {wish.name ? wish.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="wish-author-wrap">
                  <div className="wish-author">{wish.name}</div>
                  <div className={`attendance-badge ${wish.isAttending ? 'attending' : 'absent'}`}>
                    {wish.isAttending ? "✓ Hadir" : "✕ Berhalangan"}
                  </div>
                </div>
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
