import React from 'react';
import { CategoryId } from '../../types';

interface IllustrationProps {
  className?: string;
}

export const EquipmentIllustration: React.FC<IllustrationProps> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Background subtle gear */}
    <path d="M125 90 L128 85 L133 87 L137 83 L135 78 L140 76 L139 70 L144 67 L141 62 L145 57 L140 55 L139 50" stroke="#11363D" strokeWidth="2.5" fill="#15424B" />
    <circle cx="132" cy="72" r="8" fill="#1C525B" stroke="#11363D" strokeWidth="2" />
    <circle cx="110" cy="98" r="6" fill="#1C525B" stroke="#11363D" strokeWidth="1.5" />

    {/* Cracked Desktop Monitor */}
    <rect x="18" y="24" width="62" height="48" rx="4" fill="#6A8F99" stroke="#141E1B" strokeWidth="3" />
    <rect x="23" y="29" width="52" height="38" rx="2" fill="#3D6872" stroke="#141E1B" strokeWidth="2" />
    {/* Screen crack lines */}
    <path d="M49 48 L35 32 M49 48 L65 35 M49 48 L38 60 M49 48 L60 63 M49 48 L46 30 M49 48 L28 45" stroke="#E6BE3C" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M49 48 L56 42 L68 46 M38 60 L30 55" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    {/* Monitor stand & base */}
    <path d="M45 72 L42 84 L56 84 L53 72 Z" fill="#6A8F99" stroke="#141E1B" strokeWidth="2.5" />
    <rect x="34" y="84" width="30" height="5" rx="2" fill="#4B6E76" stroke="#141E1B" strokeWidth="2" />

    {/* Connecting cables */}
    <path d="M28 84 Q35 105 58 100 T95 102" stroke="#E6BE3C" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M38 86 Q50 110 75 106 T115 104" stroke="#4A90E2" strokeWidth="2.5" fill="none" strokeLinecap="round" />

    {/* Yellow Cordless Drill */}
    <g transform="translate(100, 28)">
      {/* Drill Chuck & Bit */}
      <rect x="-18" y="16" width="18" height="4" fill="#333" stroke="#141E1B" strokeWidth="1.5" />
      <path d="M-28 18 L-18 17 L-18 19 Z" fill="#888" stroke="#141E1B" strokeWidth="1.5" />
      {/* Body */}
      <path d="M0 8 L32 8 C36 8 38 12 38 18 L38 24 C38 28 35 30 30 30 L10 30 L4 24 L0 24 Z" fill="#E6BE3C" stroke="#141E1B" strokeWidth="2.5" />
      <rect x="6" y="12" width="14" height="12" fill="#141E1B" rx="1" />
      {/* Handle & Battery Pack */}
      <path d="M20 30 L22 52 L36 52 L32 30 Z" fill="#D97724" stroke="#141E1B" strokeWidth="2.5" />
      <rect x="18" y="52" width="22" height="12" rx="2" fill="#141E1B" stroke="#141E1B" strokeWidth="2" />
    </g>
  </svg>
);

export const PowerIllustration: React.FC<IllustrationProps> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Yellow background lightning bolts */}
    <path d="M30 15 L22 38 L32 38 L24 62 L42 34 L32 34 Z" fill="#F4D03F" stroke="#141E1B" strokeWidth="2" />
    <path d="M135 20 L128 40 L136 40 L130 58 L145 36 L137 36 Z" fill="#F4D03F" stroke="#141E1B" strokeWidth="2" />

    {/* Breaker box conduits */}
    <path d="M68 6 L68 25 M74 6 L74 25 M80 6 L80 25" stroke="#333" strokeWidth="3" />
    <path d="M70 95 L70 115 M76 95 L76 115 M82 95 L82 115" stroke="#333" strokeWidth="3" />

    {/* Electrical Breaker Panel */}
    <rect x="52" y="24" width="46" height="72" rx="4" fill="#8C9CA6" stroke="#141E1B" strokeWidth="3" />
    <rect x="58" y="32" width="34" height="24" rx="2" fill="#475661" stroke="#141E1B" strokeWidth="2" />
    {/* Breaker switches */}
    <rect x="62" y="37" width="5" height="14" fill="#F4D03F" stroke="#141E1B" strokeWidth="1.5" />
    <rect x="69" y="37" width="5" height="14" fill="#E74C3C" stroke="#141E1B" strokeWidth="1.5" />
    <rect x="76" y="37" width="5" height="14" fill="#F4D03F" stroke="#141E1B" strokeWidth="1.5" />
    <rect x="83" y="37" width="5" height="14" fill="#2ECC71" stroke="#141E1B" strokeWidth="1.5" />
    {/* Warning wave plate */}
    <rect x="60" y="66" width="30" height="18" fill="#F4EEDC" stroke="#141E1B" strokeWidth="2" />
    <path d="M64 75 Q68 70 72 75 T80 75 T86 75" stroke="#E74C3C" strokeWidth="2" fill="none" />

    {/* Broken Lightbulb with Glass Shards */}
    <g transform="translate(108, 62)">
      <path d="M18 10 C24 10 32 18 30 26 C28 32 24 36 24 42 L14 42 C14 36 10 32 8 26 C6 18 12 10 18 10 Z" fill="#F4EEDC" stroke="#141E1B" strokeWidth="2.5" />
      <path d="M14 42 L24 42 L22 48 L16 48 Z" fill="#C59B27" stroke="#141E1B" strokeWidth="2" />
      {/* Broken filament sparks & glass cracks */}
      <path d="M18 20 L21 28 L15 28 Z" stroke="#E74C3C" strokeWidth="1.5" fill="none" />
      <path d="M22 18 L28 22 M12 20 L8 24 M26 30 L32 34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      {/* Shards on floor */}
      <path d="M-6 46 L0 42 L2 48 Z" fill="#F4EEDC" stroke="#141E1B" strokeWidth="1.5" />
      <path d="M34 44 L40 46 L36 50 Z" fill="#F4EEDC" stroke="#141E1B" strokeWidth="1.5" />
    </g>
  </svg>
);

export const WaterIllustration: React.FC<IllustrationProps> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Tropical foliage background flourishes */}
    <path d="M20 12 C30 18 25 35 15 40 M28 8 C38 18 32 32 25 38 M140 15 C130 22 135 38 145 42 M132 10 C122 20 128 34 135 40" stroke="#1B4D5C" strokeWidth="2" fill="none" />

    {/* Pipe with rushing gushing water */}
    <g transform="translate(10, 42)">
      {/* Industrial pipe */}
      <rect x="0" y="8" width="45" height="24" fill="#758A99" stroke="#141E1B" strokeWidth="3" />
      <rect x="42" y="4" width="8" height="32" rx="2" fill="#526470" stroke="#141E1B" strokeWidth="2.5" />
      {/* Gushing Water Stream */}
      <path d="M48 14 Q70 16 78 45 Q82 65 88 68 L68 68 Q64 45 48 26 Z" fill="#64B5F6" stroke="#141E1B" strokeWidth="2.5" />
      <path d="M52 18 Q68 22 74 48 Q76 60 78 68" stroke="#FFFFFF" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M56 24 Q65 30 70 52" stroke="#E1F5FE" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>

    {/* Brass Faucet Tap */}
    <g transform="translate(110, 30)">
      <path d="M12 28 L32 28 C34 28 36 26 36 22 L36 12 C36 8 32 4 24 4 L14 4" fill="#E67E22" stroke="#141E1B" strokeWidth="2.5" />
      <rect x="20" y="0" width="8" height="6" rx="1" fill="#D35400" stroke="#141E1B" strokeWidth="2" />
      <path d="M30 28 L38 36 L30 36 Z" fill="#E67E22" stroke="#141E1B" strokeWidth="2" />
      {/* Dripping Water Drops */}
      <path d="M34 46 C34 44 32 40 34 38 C36 40 34 44 34 46 Z" fill="#64B5F6" stroke="#141E1B" strokeWidth="1.5" />
      <circle cx="34" cy="54" r="3" fill="#64B5F6" stroke="#141E1B" strokeWidth="1.5" />
    </g>

    {/* Metal Bucket Collecting Water */}
    <g transform="translate(100, 70)">
      <path d="M8 8 L14 38 L38 38 L44 8 Z" fill="#D5D8DC" stroke="#141E1B" strokeWidth="3" />
      <ellipse cx="26" cy="8" rx="18" ry="4" fill="#BDC3C7" stroke="#141E1B" strokeWidth="2.5" />
      <ellipse cx="26" cy="14" rx="14" ry="3" fill="#64B5F6" />
      {/* Bucket Handle */}
      <path d="M8 8 C8 -4 44 -4 44 8" stroke="#7F8C8D" strokeWidth="2" fill="none" />
      {/* Splash Ring */}
      <ellipse cx="26" cy="38" rx="24" ry="4" fill="#64B5F6" fillOpacity="0.4" stroke="#141E1B" strokeWidth="1.5" />
    </g>
  </svg>
);

export const SanitationIllustration: React.FC<IllustrationProps> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wooden table surface */}
    <rect x="15" y="70" width="70" height="8" rx="2" fill="#9C6644" stroke="#141E1B" strokeWidth="2.5" />
    <path d="M22 78 L20 95 M78 78 L80 95" stroke="#7F4F24" strokeWidth="3" strokeLinecap="round" />

    {/* Dirty stacked plates */}
    <ellipse cx="48" cy="68" rx="22" ry="5" fill="#EAE0D5" stroke="#141E1B" strokeWidth="2.5" />
    <ellipse cx="48" cy="63" rx="20" ry="4.5" fill="#FAF0CA" stroke="#141E1B" strokeWidth="2" />
    <ellipse cx="48" cy="58" rx="18" ry="4" fill="#EAE0D5" stroke="#141E1B" strokeWidth="2" />
    {/* Food crumbs on plate */}
    <circle cx="44" cy="57" r="1.5" fill="#E76F51" />
    <circle cx="52" cy="59" r="2" fill="#2A9D8F" />
    <circle cx="48" cy="56" r="1.5" fill="#F4A261" />
    {/* Cup & fork */}
    <rect x="68" y="52" width="10" height="16" rx="2" fill="#FFFFFF" stroke="#141E1B" strokeWidth="2" />
    <path d="M28 50 L34 68" stroke="#6C757D" strokeWidth="2" strokeLinecap="round" />

    {/* Overflowing Trash Can */}
    <g transform="translate(95, 48)">
      {/* Waste Bin */}
      <path d="M8 18 L12 56 L38 56 L42 18 Z" fill="#6C757D" stroke="#141E1B" strokeWidth="3" />
      {/* Ribs on bin */}
      <path d="M16 22 L18 52 M25 22 L25 52 M34 22 L32 52" stroke="#495057" strokeWidth="1.5" />
      <ellipse cx="25" cy="18" rx="17" ry="4" fill="#495057" stroke="#141E1B" strokeWidth="2.5" />

      {/* Overflowing garbage: banana peel, apple core, wrapper */}
      <path d="M14 16 Q20 4 28 8 Q34 2 40 14" fill="#2A9D8F" stroke="#141E1B" strokeWidth="2" />
      <path d="M22 6 Q28 -4 36 6 L30 14 Z" fill="#F4A261" stroke="#141E1B" strokeWidth="2" />
      <path d="M10 14 Q6 8 16 8 Z" fill="#E76F51" stroke="#141E1B" strokeWidth="1.5" />
    </g>

    {/* Yellow cleaning sponge on floor */}
    <g transform="translate(110, 92)">
      <rect x="0" y="0" width="22" height="12" rx="4" fill="#F4D03F" stroke="#141E1B" strokeWidth="2" />
      <circle cx="5" cy="4" r="1.5" fill="#D4AC0D" />
      <circle cx="12" cy="7" r="1.5" fill="#D4AC0D" />
      <circle cx="17" cy="4" r="1.5" fill="#D4AC0D" />
    </g>
  </svg>
);

export const HousingIllustration: React.FC<IllustrationProps> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wooden Wardrobe with Open Doors */}
    <g transform="translate(78, 16)">
      {/* Main Closet Cabinet */}
      <rect x="0" y="0" width="36" height="66" fill="#8B5E3C" stroke="#141E1B" strokeWidth="3" />
      {/* Interior hanging bar & clothes */}
      <rect x="4" y="4" width="28" height="58" fill="#5C3D2E" />
      <line x1="6" y1="12" x2="30" y2="12" stroke="#DDD" strokeWidth="2" />
      {/* Hanging shirt */}
      <path d="M12 14 L18 18 L24 14 L26 36 L10 36 Z" fill="#48CAE4" stroke="#141E1B" strokeWidth="1.5" />
      <path d="M16 14 L20 18 L24 14 L25 40 L15 40 Z" fill="#E76F51" stroke="#141E1B" strokeWidth="1.5" />
      {/* Open Doors */}
      <path d="M0 0 L-10 10 L-10 66 L0 66 Z" fill="#A06A42" stroke="#141E1B" strokeWidth="2" />
      <path d="M36 0 L46 10 L46 66 L36 66 Z" fill="#A06A42" stroke="#141E1B" strokeWidth="2" />
    </g>

    {/* Broken Window with Cracked Glass Panes */}
    <g transform="translate(122, 14)">
      <rect x="0" y="0" width="32" height="42" fill="#E8F8F5" stroke="#141E1B" strokeWidth="3" />
      <line x1="16" y1="0" x2="16" y2="42" stroke="#141E1B" strokeWidth="2" />
      <line x1="0" y1="21" x2="32" y2="21" stroke="#141E1B" strokeWidth="2" />
      {/* Crack Lines */}
      <path d="M4 6 L12 16 L6 18 M20 28 L28 34 L24 38" stroke="#E74C3C" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Dorm Single Bed with Rumpled Blanket */}
    <g transform="translate(10, 52)">
      {/* Headboard & Bedframe */}
      <rect x="0" y="0" width="8" height="42" rx="2" fill="#6F4E37" stroke="#141E1B" strokeWidth="3" />
      <rect x="62" y="16" width="6" height="26" rx="2" fill="#6F4E37" stroke="#141E1B" strokeWidth="2.5" />
      <rect x="6" y="24" width="58" height="12" fill="#8B5E3C" stroke="#141E1B" strokeWidth="2.5" />
      {/* Mattress */}
      <rect x="8" y="14" width="54" height="12" rx="2" fill="#FFFFFF" stroke="#141E1B" strokeWidth="2" />
      {/* Pillow */}
      <rect x="10" y="10" width="16" height="8" rx="2" fill="#F8EDEB" stroke="#141E1B" strokeWidth="1.5" />
      {/* Messy crumpled blanket */}
      <path d="M22 14 C30 10 38 18 46 12 C52 16 60 14 62 26 L8 26 C8 20 16 18 22 14 Z" fill="#9D4EDD" stroke="#141E1B" strokeWidth="2" />
    </g>
  </svg>
);

export const NetworkIllustration: React.FC<IllustrationProps> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Wi-Fi Router with Dual Antennas */}
    <g transform="translate(80, 54)">
      {/* Antennas */}
      <line x1="8" y1="12" x2="8" y2="-18" stroke="#141E1B" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="48" y1="12" x2="48" y2="-18" stroke="#141E1B" strokeWidth="3.5" strokeLinecap="round" />
      {/* Main Body */}
      <rect x="0" y="12" width="56" height="26" rx="4" fill="#CBD5E1" stroke="#141E1B" strokeWidth="3" />
      <rect x="4" y="20" width="48" height="12" rx="2" fill="#334155" />
      {/* LED indicators (Red failing light) */}
      <circle cx="10" cy="26" r="2.5" fill="#EF4444" stroke="#141E1B" strokeWidth="1" />
      <circle cx="18" cy="26" r="2" fill="#F59E0B" />
      <circle cx="26" cy="26" r="2" fill="#10B981" />
      <circle cx="34" cy="26" r="2" fill="#10B981" />
    </g>

    {/* Flying Email Envelopes */}
    <g transform="translate(75, 18)">
      <path d="M0 8 L18 8 L18 20 L0 20 Z" fill="#FFFFFF" stroke="#141E1B" strokeWidth="2" />
      <path d="M0 8 L9 14 L18 8" stroke="#141E1B" strokeWidth="1.5" />
      {/* Speed trail */}
      <line x1="-12" y1="14" x2="-3" y2="14" stroke="#718355" strokeWidth="2" strokeDasharray="2 2" />
    </g>
    <g transform="translate(108, 28)">
      <path d="M0 6 L14 6 L14 16 L0 16 Z" fill="#FFFFFF" stroke="#141E1B" strokeWidth="1.5" />
      <path d="M0 6 L7 11 L14 6" stroke="#141E1B" strokeWidth="1.5" />
    </g>

    {/* Hot Coffee Mug with Saucer */}
    <g transform="translate(18, 56)">
      {/* Saucer */}
      <ellipse cx="26" cy="36" rx="20" ry="5" fill="#E2E8F0" stroke="#141E1B" strokeWidth="2.5" />
      {/* Cup */}
      <path d="M12 16 L14 34 C14 36 38 36 38 34 L40 16 Z" fill="#F8FAFC" stroke="#141E1B" strokeWidth="2.5" />
      {/* Handle */}
      <path d="M40 20 C48 20 48 30 40 30" stroke="#141E1B" strokeWidth="2.5" fill="none" />
      {/* Coffee inside */}
      <ellipse cx="26" cy="16" rx="13" ry="3" fill="#6F4E37" />
      {/* Steam lines */}
      <path d="M22 10 Q20 4 24 0 M28 10 Q30 4 26 0" stroke="#87986A" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>

    {/* Scattered Coffee Beans */}
    <ellipse cx="68" cy="94" rx="4" ry="3" fill="#582F0E" stroke="#141E1B" strokeWidth="1.5" transform="rotate(25 68 94)" />
    <ellipse cx="138" cy="96" rx="4" ry="3" fill="#582F0E" stroke="#141E1B" strokeWidth="1.5" transform="rotate(-15 138 96)" />
  </svg>
);

export const SecurityIllustration: React.FC<IllustrationProps> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Cosmic Saturn-like Ringed Planet & Stars */}
    <g transform="translate(112, 10)">
      <circle cx="20" cy="18" r="14" fill="#F4A261" stroke="#141E1B" strokeWidth="2" />
      <ellipse cx="20" cy="18" rx="26" ry="6" stroke="#E76F51" strokeWidth="2.5" fill="none" transform="rotate(-20 20 18)" />
      {/* Stars */}
      <circle cx="-15" cy="10" r="1.5" fill="#FFF" />
      <circle cx="-5" cy="24" r="1" fill="#FFF" />
      <circle cx="38" cy="38" r="1.5" fill="#FFF" />
    </g>

    {/* CCTV Surveillance Camera */}
    <g transform="translate(68, 32)">
      {/* Wall Bracket */}
      <path d="M0 0 L14 12 L14 24" stroke="#141E1B" strokeWidth="3.5" strokeLinecap="round" />
      {/* Camera Body */}
      <path d="M10 12 L44 8 L48 24 L14 28 Z" fill="#CBD5E1" stroke="#141E1B" strokeWidth="3" />
      {/* Camera Sunshade & Lens */}
      <path d="M44 8 L54 10 L54 22 L48 24 Z" fill="#475569" stroke="#141E1B" strokeWidth="2.5" />
      {/* Red Recording Sensor */}
      <circle cx="50" cy="16" r="3" fill="#EF4444" className="animate-ping" />
      <circle cx="50" cy="16" r="2" fill="#EF4444" />
    </g>

    {/* Student Magnetic ID Smart Card */}
    <g transform="translate(14, 48)">
      <rect x="0" y="0" width="38" height="26" rx="3" fill="#F1F5F9" stroke="#141E1B" strokeWidth="2.5" />
      <rect x="0" y="5" width="38" height="5" fill="#1E293B" />
      <circle cx="8" cy="18" r="3" fill="#F59E0B" />
      <circle cx="14" cy="18" r="3" fill="#EF4444" fillOpacity="0.8" />
    </g>

    {/* Cracked Steel Padlock */}
    <g transform="translate(100, 52)">
      {/* Shackle */}
      <path d="M10 16 L10 10 C10 2 26 2 26 10 L26 16" stroke="#94A3B8" strokeWidth="4" fill="none" strokeLinecap="round" />
      {/* Body */}
      <rect x="2" y="16" width="32" height="28" rx="4" fill="#64748B" stroke="#141E1B" strokeWidth="3" />
      {/* Keyhole */}
      <circle cx="18" cy="28" r="3" fill="#0F172A" />
      <path d="M17 28 L19 28 L20 36 L16 36 Z" fill="#0F172A" />
      {/* Fracture Crack */}
      <path d="M6 22 L14 30 L8 38" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </g>
  </svg>
);

export const AdminIllustration: React.FC<IllustrationProps> = ({ className = 'w-24 h-24' }) => (
  <svg viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Tall Stack of Paper Documents */}
    <g transform="translate(24, 40)">
      {/* Bottom sheets */}
      <rect x="4" y="24" width="46" height="28" rx="2" fill="#E2E8F0" stroke="#141E1B" strokeWidth="2" />
      <rect x="2" y="18" width="46" height="28" rx="2" fill="#F1F5F9" stroke="#141E1B" strokeWidth="2" />
      <rect x="0" y="12" width="46" height="28" rx="2" fill="#FFFFFF" stroke="#141E1B" strokeWidth="2" />
      {/* Top sheet with red urgent banner */}
      <rect x="0" y="4" width="44" height="28" rx="2" fill="#FFFFFF" stroke="#141E1B" strokeWidth="2.5" />
      <rect x="4" y="8" width="36" height="4" fill="#EF4444" />
      <line x1="4" y1="16" x2="32" y2="16" stroke="#94A3B8" strokeWidth="2" />
      <line x1="4" y1="22" x2="26" y2="22" stroke="#94A3B8" strokeWidth="2" />
    </g>

    {/* Wooden Judge's Gavel / Mallet hitting Sound Block */}
    <g transform="translate(86, 26)">
      {/* Sound Block */}
      <ellipse cx="44" cy="62" rx="20" ry="6" fill="#8B5E3C" stroke="#141E1B" strokeWidth="2.5" />
      {/* Mallet Handle */}
      <line x1="38" y1="52" x2="68" y2="22" stroke="#6F4E37" strokeWidth="4.5" strokeLinecap="round" />
      {/* Mallet Head */}
      <g transform="translate(34, 48) rotate(-45)">
        <rect x="-10" y="-8" width="20" height="16" rx="3" fill="#A06A42" stroke="#141E1B" strokeWidth="2.5" />
        <rect x="-12" y="-9" width="4" height="18" fill="#C59B27" stroke="#141E1B" strokeWidth="1.5" />
        <rect x="8" y="-9" width="4" height="18" fill="#C59B27" stroke="#141E1B" strokeWidth="1.5" />
      </g>
      {/* Impact Shockwaves */}
      <path d="M26 48 Q22 56 30 62 M56 48 Q62 54 54 60" stroke="#C59B27" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
  </svg>
);

export const CategoryIllustration: React.FC<{ category: CategoryId; className?: string }> = ({
  category,
  className = 'w-24 h-24',
}) => {
  switch (category) {
    case 'equipment':
      return <EquipmentIllustration className={className} />;
    case 'power':
      return <PowerIllustration className={className} />;
    case 'water':
      return <WaterIllustration className={className} />;
    case 'sanitation':
      return <SanitationIllustration className={className} />;
    case 'housing':
      return <HousingIllustration className={className} />;
    case 'network':
      return <NetworkIllustration className={className} />;
    case 'security':
      return <SecurityIllustration className={className} />;
    case 'admin':
      return <AdminIllustration className={className} />;
    default:
      return <EquipmentIllustration className={className} />;
  }
};
