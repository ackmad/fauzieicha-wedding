import React from "react";

// Premium Javanese-style Icons as SVG components

export const IconAcara = ({ className = "", color = "currentColor", style = {} }: { className?: string, color?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" />
    <circle cx="50" cy="50" r="38" stroke={color} strokeWidth="0.5" strokeDasharray="2 4" />
    <path d="M50 25V50L65 60" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="35" y="15" width="30" height="8" rx="2" fill={color} opacity="0.2" />
    <path d="M40 70H60M45 75H55" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const IconStory = ({ className = "", color = "currentColor", style = {} }: { className?: string, color?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 100 100" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 85C50 85 15 65 15 40C15 25 25 15 40 15C45 15 48 18 50 20C52 18 55 15 60 15C75 15 85 25 85 40C85 65 50 85 50 85Z" stroke={color} strokeWidth="2" />
    <path d="M50 30V70" stroke={color} strokeWidth="0.5" strokeDasharray="4 4" />
    <path d="M35 45L50 60L65 45" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="85" r="3" fill={color} />
  </svg>
);

export const OrnamenJawa = ({ className = "", color = "currentColor", style = {} }: { className?: string, color?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 200 60" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 30C100 30 80 10 60 10C40 10 30 25 30 30C30 35 40 50 60 50C80 50 100 30 100 30ZM100 30C100 30 120 10 140 10C160 10 170 25 170 30C170 35 160 50 140 50C120 50 100 30 100 30Z" stroke={color} strokeWidth="1.5" />
    <circle cx="100" cy="30" r="5" fill={color} />
    <path d="M10 30H30M170 30H190" stroke={color} strokeWidth="1" strokeLinecap="round" />
    <path d="M60 30C60 30 55 25 50 25C45 25 40 30 40 30C40 30 45 35 50 35C55 35 60 30 60 30Z" fill={color} opacity="0.4" />
    <path d="M140 30C140 30 145 25 150 25C155 25 160 30 160 30C160 30 155 35 150 35C145 35 140 30 140 30Z" fill={color} opacity="0.4" />
  </svg>
);

export const GununganSVG = ({ className = "", color = "currentColor", style = {} }: { className?: string, color?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 400 600" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized Kayon/Gunungan */}
    <path d="M200 50L50 550H350L200 50Z" stroke={color} strokeWidth="2" />
    <path d="M200 50C200 50 120 200 120 300C120 400 200 550 200 550C200 550 280 400 280 300C280 200 200 50 200 50Z" stroke={color} strokeWidth="1" opacity="0.6" />
    {/* Tree of Life internal detail */}
    <path d="M200 550V250M200 300L150 250M200 300L250 250M200 400L130 350M200 400L270 350" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="200" cy="400" r="40" stroke={color} strokeWidth="1" strokeDasharray="5 5" />
    {/* Bottom Gateway */}
    <rect x="170" y="500" width="60" height="50" stroke={color} strokeWidth="2" rx="2" />
    <path d="M200 500V550" stroke={color} strokeWidth="1" />
  </svg>
);

export const SectionDivider = ({ className = "", color = "currentColor", style = {} }: { className?: string, color?: string, style?: React.CSSProperties }) => (
  <svg viewBox="0 0 400 40" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 20H150M250 20H380" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
    <path d="M200 10L210 20L200 30L190 20L200 10Z" fill={color} />
    <path d="M170 20L180 15V25L170 20Z" fill={color} opacity="0.6" />
    <path d="M230 20L220 15V25L230 20Z" fill={color} opacity="0.6" />
  </svg>
);
