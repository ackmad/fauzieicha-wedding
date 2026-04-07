"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageSelectorScreenProps {
  onSelect: (lang: "id" | "en") => void;
}

export default function LanguageSelectorScreen({ onSelect }: LanguageSelectorScreenProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div 
      className="lang-selector-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background Decor */}
      <div className="preloader-bg-pattern" style={{ opacity: 0.1, mixBlendMode: 'overlay' }}></div>
      <div className="preloader-bg-vignette" style={{ opacity: 0.8 }}></div>

      <div className="lang-selector-content">
        <motion.div 
          className="lang-monogram-wrap"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        >
          <img src="/icons/monogram-CF.svg" alt="CF" className="lang-monogram" />
        </motion.div>

        <motion.h2 
          className="lang-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Pilih Bahasa <span style={{ opacity: 0.5, fontStyle: 'normal', margin: '0 10px' }}>|</span> Select Language
        </motion.h2>

        <motion.div 
          className="lang-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <button 
            className="lang-btn" 
            onClick={() => onSelect("id")}
            aria-label="Bahasa Indonesia"
          >
            <span className="lang-name">Bahasa Indonesia</span>
            <div className="lang-code-wrap">
              <span className="lang-code">ID</span>
              <div className="btn-shine"></div>
            </div>
          </button>
          
          <div className="lang-divider"></div>

          <button 
            className="lang-btn" 
            onClick={() => onSelect("en")}
            aria-label="English Language"
          >
            <span className="lang-name">English</span>
            <div className="lang-code-wrap">
              <span className="lang-code">EN</span>
              <div className="btn-shine"></div>
            </div>
          </button>
        </motion.div>

        <motion.p 
          className="lang-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.2, duration: 1.2 }}
        >
          Chairunissa & Fauzie Wedding • 2026
        </motion.p>
      </div>

      {/* Floating Petals for premium feel */}
      <div className="lang-petals" style={{ pointerEvents: 'none' }}>
        <div className="petal p1"></div>
        <div className="petal p2"></div>
        <div className="petal p3"></div>
      </div>
    </motion.div>
  );
}
