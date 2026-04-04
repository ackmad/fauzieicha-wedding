"use client";

import React, { useState } from "react";
import { OrnamenJawa } from "./Icons";

interface Wish {
  name: string; 
  text: string;
  isAttending?: boolean;
}

interface WishesProps {
  wishes: Wish[];
  submitWish: (e: React.FormEvent) => void;
  trans: Record<string, string>;
}

export default function Wishes({ wishes, submitWish, trans }: WishesProps) {
  const [toast, setToast] = useState<{ show: boolean, msg: string, type: 'success' | 'error' }>({ show: false, msg: '', type: 'success' });
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false); // To simulate refresh on pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Stats calculation
  const totalWishes = wishes.length;
  const totalAttending = wishes.filter(w => w.isAttending).length;
  const totalAbsent = wishes.filter(w => w.isAttending === false).length;

  // Pagination calculation
  const totalPages = Math.ceil(totalWishes / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWishes = wishes.slice(indexOfFirstItem, indexOfLastItem);

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
      submitWish(e);
      setToast({ show: true, msg: "Pesan Anda telah terkirim. Terima kasih!", type: 'success' });
      (e.target as HTMLFormElement).reset();
      setCurrentPage(1); // Back to first page to see new wish
    } catch (err) {
      setToast({ show: true, msg: "Terjadi kesalahan. Silakan coba lagi.", type: 'error' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 4000);
    }
  };

  const paginate = (pageNumber: number) => {
    setIsRefreshing(true);
    
    // Simulate a brief "refresh" or fetch delay for better feel
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsRefreshing(false);
      
      // Smooth scroll back to stats for better UX
      const statsEl = document.querySelector('.wish-stats-container');
      if (statsEl) statsEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 600);
  };

  return (
    <section id="section-wishes">
      <div className="wishes-glow idle-pulse"><img src="/effects/light-glow.png" alt="" /></div>
      <div className="section-bg-dark-soft"></div>

      <div className="wishes-floral-top idle-sway" style={{ transformOrigin: 'bottom right' }}>
        <img src="/florals/floral-accent-1.png" alt="" style={{ opacity: 0.15 }} />
      </div>

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

        <div className="wish-stats-container reveal-item">
          <div className="stat-item"><span className="stat-num">{totalWishes}</span><span className="stat-lbl">Ucapan</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-num">{totalAttending}</span><span className="stat-lbl">Hadir</span></div>
          <div className="stat-divider"></div>
          <div className="stat-item"><span className="stat-num">{totalAbsent}</span><span className="stat-lbl">Berhalangan</span></div>
        </div>

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

        {/* Compact List Style Guestbook */}
        <div className="wish-list-container" style={{ position: 'relative' }}>
          {/* Simulated Refresh Overlay */}
          {isRefreshing && (
            <div className="list-refresh-overlay">
              <div className="refresh-spinner"></div>
            </div>
          )}

          <div className={`wish-list-compact ${isRefreshing ? 'refreshing' : ''}`}>

            {currentWishes.map((wish, i) => (
              <div key={indexOfFirstItem + i} className="wish-item-compact reveal-up">
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
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-wrap reveal-item">
              <button 
                onClick={() => paginate(currentPage - 1)} 
                disabled={currentPage === 1}
                className="pag-btn"
              >
                &larr;
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button 
                  key={num} 
                  onClick={() => paginate(num)}
                  className={`pag-btn ${currentPage === num ? 'active' : ''}`}
                >
                  {num}
                </button>
              ))}
              <button 
                onClick={() => paginate(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="pag-btn"
              >
                &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
