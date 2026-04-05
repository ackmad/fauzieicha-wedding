"use client";

import React from "react";

interface ThemeToggleProps {
  theme: "elegant-jungle" | "royal-java";
  toggleTheme: () => void;
  invitationOpened: boolean;
}

export default function ThemeToggle({ theme, toggleTheme, invitationOpened }: ThemeToggleProps) {
  if (!invitationOpened) return null;

  return (
    <div 
      id="theme-toggle" 
      onClick={toggleTheme}
      title="Switch Theme"
    >
      {theme === "elegant-jungle" ? (
        /* Leaf Icon for Jungle Theme */
        <svg viewBox="0 0 24 24">
          <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,11 17,8 17,8Z" />
        </svg>
      ) : (
        /* Flame/Royal Ornament Icon for Java Theme */
        <svg viewBox="0 0 24 24">
          <path d="M12,2C12,2 12,5.5 12,8C12,10.5 10.5,12 8,12C5.5,12 4,10.5 4,8C4,5.5 4,2 4,2C4,2 1,5.5 1,8C1,12.42 4.58,16 9,16C13.42,16 17,12.42 17,8C17,5.5 14,2 14,2M16,6C16,6 16,8.5 16,10C16,11.5 15,12.5 13.5,12.5C12,12.5 11,11.5 11,10C11,8.5 11,6 11,6C11,6 8,8.5 8,10C8,13.31 10.69,16 14,16C17.31,16 20,13.31 20,10C20,8.5 18,6 18,6" />
        </svg>
      )}
    </div>
  );
}
