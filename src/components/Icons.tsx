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
  <svg viewBox="0 0 240 80" className={className} style={style} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Complex Javanese-inspired vector ornament */}
    <path className="ornament-path" d="M120 40C120 40 105 5 70 5C35 5 20 30 20 40C20 50 35 75 70 75C105 75 120 40 120 40ZM120 40C120 40 135 5 170 5C205 5 220 30 220 40C220 50 205 75 170 75C135 75 120 40 120 40Z" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <path className="ornament-path" d="M70 40C70 40 65 30 55 30C45 30 40 40 40 40C40 40 45 50 55 50C65 50 70 40 70 40Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.5" />
    <path className="ornament-path" d="M170 40C170 40 175 30 185 30C195 30 200 40 200 40C200 40 195 50 185 50C175 50 170 40 170 40Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.5" />
    <circle cx="120" cy="40" r="4" fill={color} />
    <circle cx="120" cy="40" r="8" stroke={color} strokeWidth="0.8" strokeDasharray="2 4" />
    <path className="ornament-path" d="M5 40H30M210 40H235" stroke={color} strokeWidth="0.8" strokeLinecap="round" />
    <path className="ornament-path" d="M70 5C70 5 60 15 50 15M170 5C170 5 180 15 190 15" stroke={color} strokeWidth="0.5" opacity="0.5" />
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
