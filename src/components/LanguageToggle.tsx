"use client";

interface LanguageToggleProps {
  currentLang: "id" | "en";
  toggleLang: () => void;
}

export default function LanguageToggle({ currentLang, toggleLang }: LanguageToggleProps) {
  return (
    <div 
      id="lang-toggle" 
      className={currentLang === 'id' ? "active-id" : "active-en"} 
      onClick={toggleLang} 
      title="Switch Language"
    >
      <span>ID</span>
      <span className="lang-sep"> | </span>
      <span>EN</span>
    </div>
  );
}
