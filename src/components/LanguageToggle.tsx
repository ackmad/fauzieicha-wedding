"use client";

import { IconLanguage } from "./Icons";
import { motion } from "framer-motion";

interface LanguageToggleProps {
  currentLang: "id" | "en";
  toggleLang: () => void;
}

export default function LanguageToggle({ currentLang, toggleLang }: LanguageToggleProps) {
  return (
    <motion.div 
      id="lang-toggle" 
      className={currentLang === 'id' ? "active-id" : "active-en"} 
      onClick={toggleLang} 
      title="Switch Language"
      initial={{ opacity: 0, scale: 0.8, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <IconLanguage className="lang-icon" color="var(--accent-gold)" />
      <div className="lang-labels">
        <span className="lang-label lang-id">ID</span>
        <span className="lang-sep">/</span>
        <span className="lang-label lang-en">EN</span>
      </div>
    </motion.div>
  );
}
