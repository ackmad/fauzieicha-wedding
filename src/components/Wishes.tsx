"use client";

import React, { useState, useRef } from "react";
import { OrnamenJawa } from "./Icons";
import { Wish } from "../types";

interface WishesProps {
  wishes: Wish[];
  submitWish: (e: React.FormEvent) => Promise<void>;
  trans: Record<string, string>;
}

// ─── Relative time helper ──────────────────────────────────────
function timeAgo(date?: Date): string {
  if (!date) return '';
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Baru saja';
  if (diffMins < 60) return `${diffMins} menit lalu`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} jam lalu`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} hari lalu`;
}
// ──────────────────────────────────────────────────────────────

export default function Wishes({ wishes, submitWish, trans }: WishesProps) {
  const [toast, setToast] = useState<{ show: boolean, msg: string, type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Key ref: points to the TOP of the wish list — we scroll here on page change
  const listTopRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 8;

  // Stats
  const totalWishes = wishes.length;
  const totalAttending = wishes.filter(w => w.isAttending).length;
  const totalAbsent = wishes.filter(w => w.isAttending === false).length;

  // Pagination
  const totalPages = Math.ceil(totalWishes / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWishes = wishes.slice(indexOfFirstItem, indexOfLastItem);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const nameInput  = document.getElementById('wish-name')       as HTMLInputElement;
    const textInput  = document.getElementById('wish-text')       as HTMLTextAreaElement;

    if (!nameInput.value.trim() || !textInput.value.trim()) {
      setToast({ show: true, msg: "Harap isi nama dan pesan doa Anda", type: 'error' });
      setIsLoading(false);
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
      return;
    }

    try {
      await submitWish(e);
      setToast({ show: true, msg: "Pesan Anda telah terkirim. Terima kasih!", type: 'success' });
      (e.target as HTMLFormElement).reset();

      // Refresh to page 1 and scroll to list top (no full-page scroll)
      setIsRefreshing(true);
      setTimeout(() => {
        setCurrentPage(1);
        setIsRefreshing(false);
        scrollToListTop();
      }, 500);
    } catch {
      setToast({ show: true, msg: "Terjadi kesalahan. Silakan coba lagi.", type: 'error' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
    }
  };

  // ── Scroll only to the list top, not the window top ──────────
  const scrollToListTop = () => {
    if (listTopRef.current) {
      listTopRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const paginate = (pageNumber: number) => {
    if (pageNumber === currentPage || pageNumber < 1 || pageNumber > totalPages) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsRefreshing(false);
      scrollToListTop();        // ← stays within the section, never jumps to top
    }, 450);
  };

  return (
    <section id="section-wishes">
      <div className="wishes-glow idle-pulse"><img src="/effects/light-glow.png" alt="" /></div>
      <div className="section-bg-dark-soft"></div>
      <div className="wishes-floral-top idle-sway" style={{ transformOrigin: 'bottom right' }}>
        <img src="/florals/floral-accent-1.png" alt="" style={{ opacity: 0.15 }} />
      </div>

      {/* Toast */}
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

        <p className="section-label reveal-item">{trans["wishes-label"]}</p>
        <h2 className="section-title reveal-item">{trans["wishes-title"]}</h2>

        {/* Stats bar */}
        <div className="wishes-stats-wrapper reveal-item">
          <div className="live-indicator-badge">
            <span className="live-dot"></span>
            <span>Live Updates</span>
          </div>
          <div className="wish-stats-container">
            <div className="stat-item"><span className="stat-num">{totalWishes}</span><span className="stat-lbl">Ucapan</span></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><span className="stat-num">{totalAttending}</span><span className="stat-lbl">Hadir</span></div>
            <div className="stat-divider"></div>
            <div className="stat-item"><span className="stat-num">{totalAbsent}</span><span className="stat-lbl">Berhalangan</span></div>
          </div>
        </div>

        {/* Form */}
        <form className="wish-form reveal-up" id="wish-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">{trans["name-label"]}</label>
            <input className="form-input" id="wish-name" type="text" name="name" placeholder={trans["wish-placeholder"]} required />
          </div>
          <div className="form-row">
            <label className="form-label">Konfirmasi Kehadiran</label>
            <select className="form-input form-select" id="wish-attendance" name="isAttending" required>
              <option value="true">Hadir / Sangat Ingin Datang</option>
              <option value="false">Maaf, Berhalangan Hadir</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">{trans["wish-label-text"]}</label>
            <textarea className="form-input" id="wish-text" name="text" placeholder={trans["message-placeholder"]} rows={3} required />
          </div>
          <button className={`submit-btn ${isLoading ? 'loading' : ''}`} type="submit" disabled={isLoading}>
            {isLoading ? "Mengirim..." : trans["submit-btn"]}
          </button>
        </form>

        {/* ── List anchor — scroll target stays inside the section ── */}
        <div ref={listTopRef} style={{ height: 0, marginTop: 40 }} />

        <div className="wish-list-container" style={{ position: 'relative' }}>
          {/* Loading overlay */}
          {isRefreshing && (
            <div className="list-refresh-overlay">
              <div className="refresh-spinner"></div>
            </div>
          )}

          {/* Wish list */}
          <div className={`wish-list-compact ${isRefreshing ? 'refreshing' : ''}`}>
            {currentWishes.map((wish, i) => (
              <div
                key={`${currentPage}-${i}`}
                className="wish-item-compact reveal-up revealed"
                style={{ "--reveal-delay": `${(i % 5) * 0.1}s` } as React.CSSProperties}
              >
                <div className="wish-avatar-compact">
                  {wish.name ? wish.name.charAt(0).toUpperCase() : '?'}
                </div>
                <div className="wish-body-compact">
                  <div className="wish-header-compact">
                    <span className="wish-author-compact">{wish.name}</span>
                    <span className={`attendance-tag ${wish.isAttending ? 'yes' : 'no'}`}>
                      {wish.isAttending ? "Hadir" : "Berhalangan"}
                    </span>
                  </div>
                  <p className="wish-text-compact">{wish.text}</p>
                  {/* Timestamp */}
                  {wish.createdAt && (
                    <span className="wish-timestamp">{timeAgo(wish.createdAt)}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination — shown only when more than 1 page */}
          {totalPages > 1 && (
            <div className="pagination-wrap">
              <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="pag-btn">&larr;</button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(num => num === 1 || num === totalPages || Math.abs(num - currentPage) <= 1)
                .map((num, i, arr) => (
                  <React.Fragment key={num}>
                    {i > 0 && arr[i - 1] !== num - 1 && <span className="pag-dots">...</span>}
                    <button
                      onClick={() => paginate(num)}
                      className={`pag-btn ${currentPage === num ? 'active' : ''}`}
                    >
                      {num}
                    </button>
                  </React.Fragment>
                ))}

              <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="pag-btn">&rarr;</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
