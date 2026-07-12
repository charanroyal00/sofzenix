import { memo } from 'react';

// ─── RazorpayX — lightning bolt icon + "RazorpayX" navy text + orange X ───────
export const RazorpayXLogo = () => (
  <svg viewBox="0 0 200 52" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Lightning bolt / arrow-up icon (light blue) */}
    <polygon points="14,6 20,6 16,20 22,20 10,42 13,28 7,28" fill="#3B82F6" />
    <polygon points="10,8 14,6 9,22 14,22 4,40 7,26 2,26" fill="#1E40AF" opacity="0.5" />
    {/* RazorpayX text */}
    <text x="30" y="24" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="900" fill="#1E2D5E">Razorpay</text>
    <text x="118" y="24" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="900" fill="#F97316">X</text>
    <text x="30" y="40" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="600" fill="#6B7280" letterSpacing="0.5">BUSINESS BANKING</text>
  </svg>
);

// ─── Razorpay (standard) — same bolt, dark navy text ──────────────────────────
const RazorpayLogo = () => (
  <svg viewBox="0 0 180 52" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="14,6 20,6 16,20 22,20 10,42 13,28 7,28" fill="#3B82F6" />
    <polygon points="10,8 14,6 9,22 14,22 4,40 7,26 2,26" fill="#1E40AF" opacity="0.5" />
    <text x="30" y="32" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fill="#1E2D5E" fontStyle="italic">Razorpay</text>
  </svg>
);

// ─── iBirds Services — stylized bird (orange+grey wings), red bold text ────────
const IBirdsLogo = () => (
  <svg viewBox="0 0 190 60" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Bird head/body */}
    <ellipse cx="28" cy="24" rx="10" ry="8" fill="#1A1A1A" />
    <circle cx="24" cy="20" r="5" fill="#1A1A1A" />
    <circle cx="22" cy="19" r="1.5" fill="#555" />
    {/* Orange upper wing */}
    <path d="M30 18 Q50 4 62 8 Q52 14 42 18 Q36 16 30 18Z" fill="#F97316" />
    {/* Grey mid wing layers */}
    <path d="M32 22 Q52 10 64 14 Q54 20 44 22 Q38 20 32 22Z" fill="#9CA3AF" />
    <path d="M30 26 Q50 16 60 20 Q50 26 40 26 Q35 24 30 26Z" fill="#D1D5DB" />
    <path d="M28 30 Q44 22 54 26 Q45 30 36 30Z" fill="#F3F4F6" />
    {/* Lower orange accent */}
    <path d="M34 32 Q28 38 22 34 Q28 34 34 32Z" fill="#F97316" />
    {/* i dot curve */}
    <path d="M10 28 Q8 36 10 40" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" />
    <circle cx="9" cy="26" r="2" fill="#666" />
    {/* Text */}
    <text x="70" y="30" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="900" fill="#E53E3E">iBirds'</text>
    <text x="70" y="46" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="600" fill="#9CA3AF">Services</text>
    <text x="70" y="56" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="500" fill="#6B7280" fontStyle="italic">Implement Thinking...</text>
  </svg>
);

// ─── DigiLocker — purple document+cloud+lock icon, "DigiLocker" purple text ───
const DigiLockerLogo = () => (
  <svg viewBox="0 0 200 56" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Document with folded corner */}
    <rect x="2" y="6" width="34" height="44" rx="4" fill="#7C3AED" />
    <polygon points="26,6 36,16 26,16" fill="#5B21B6" />
    {/* Cloud shape on document */}
    <circle cx="14" cy="28" r="6" fill="white" opacity="0.9" />
    <circle cx="20" cy="26" r="5" fill="white" opacity="0.9" />
    <circle cx="26" cy="28" r="5" fill="white" opacity="0.9" />
    <rect x="10" y="28" width="20" height="8" rx="0" fill="white" opacity="0.9" />
    {/* Lock on cloud */}
    <rect x="15" y="27" width="8" height="7" rx="1.5" fill="#7C3AED" />
    <path d="M17 27 Q19 23 21 27" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" />
    <circle cx="19" cy="30" r="1.2" fill="white" />
    {/* Text */}
    <text x="42" y="26" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="900" fill="#7C3AED">DigiLocker</text>
    <text x="42" y="40" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="500" fill="#6B7280">Your documents anytime, anywhere</text>
  </svg>
);

// ─── HostingRaja — "HOSTING" bold black + "RAJA" bold red, taglines ───────────
const HostingRajaLogo = () => (
  <svg viewBox="0 0 210 56" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <text x="2" y="24" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="900" fill="#1A1A1A" letterSpacing="-0.5">HOSTING</text>
    <text x="107" y="24" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="900" fill="#E53E3E" letterSpacing="-0.5">RAJA</text>
    <text x="155" y="16" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="700" fill="#1A1A1A">®</text>
    <text x="2" y="37" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="600" fill="#444">No.1 Web Hosting Company</text>
    <text x="2" y="49" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="500" fill="#888">ISO 9001:2015 Certified Company</text>
  </svg>
);

// ─── SkillOrbit — purple/blue double-slash chevrons + gradient text ────────────
const SkillOrbitLogo = () => (
  <svg viewBox="0 0 190 52" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="soIconGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      <linearGradient id="soTextGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7C3AED" />
        <stop offset="50%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#06B6D4" />
      </linearGradient>
    </defs>
    {/* Double slash chevron icon */}
    <polygon points="8,6 14,6 6,46 0,46" fill="url(#soIconGrad)" />
    <polygon points="18,6 24,6 16,46 10,46" fill="url(#soIconGrad)" opacity="0.7" />
    {/* Chevron right arrows */}
    <polyline points="4,18 12,26 4,34" fill="none" stroke="url(#soIconGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="14,18 22,26 14,34" fill="none" stroke="url(#soIconGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
    {/* Text */}
    <text x="34" y="32" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="800" fill="url(#soTextGrad)">SkillOrbit</text>
  </svg>
);

// ─── SkilStation — open book + rocket + grad cap, navy + orange ───────────────
const SkillStationLogo = () => (
  <svg viewBox="0 0 200 60" className="h-10 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Open book left page (navy) */}
    <path d="M4 42 Q26 34 52 38 L51 50 Q28 46 5 52 Z" fill="#1B3A6B" />
    {/* Open book right page (orange) */}
    <path d="M100 42 Q78 34 52 38 L53 50 Q76 46 99 52 Z" fill="#F97316" />
    <line x1="52" y1="38" x2="52" y2="51" stroke="#0F172A" strokeWidth="1.5" />
    <path d="M5 52 Q52 58 99 52" fill="none" stroke="#1B3A6B" strokeWidth="2" strokeLinecap="round" />
    {/* Rocket */}
    <path d="M48 37 Q52 16 56 37 L55 42 L49 42 Z" fill="#F97316" />
    <path d="M49 41 L46 49 L52 45 L58 49 L55 41 Z" fill="#1B3A6B" />
    <ellipse cx="52" cy="51" rx="3" ry="4" fill="#FCD34D" opacity="0.9" />
    <circle cx="52" cy="28" r="3" fill="white" opacity="0.85" />
    {/* Graduation cap */}
    <rect x="46" y="10" width="12" height="3" rx="1.5" fill="#1B3A6B" />
    <polygon points="52,6 62,11 52,16 42,11" fill="#0F172A" />
    <line x1="62" y1="11" x2="65" y2="18" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="65" cy="20" r="2.5" fill="#F97316" />
    {/* Sparkles */}
    <circle cx="34" cy="24" r="1.8" fill="#F97316" opacity="0.7" />
    <circle cx="70" cy="22" r="1.8" fill="#FCD34D" opacity="0.8" />
    {/* Text */}
    <text x="108" y="34" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="900" fill="#1B3A6B">Skil</text>
    <text x="133" y="34" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="900" fill="#F97316">Station</text>
    <text x="108" y="46" fontFamily="Arial,sans-serif" fontSize="6.5" fontWeight="600" fill="#9CA3AF" letterSpacing="1.2">LEARN. GROW. SUCCEED.</text>
  </svg>
);

// ─── Ben8X Digi Marketing — rainbow color-wheel circle + navy bold text ───────
const Ben8XLogo = () => (
  <svg viewBox="0 0 210 56" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Rainbow color-wheel ring — 12 segments */}
    {[
      { color: '#FF0000', r: 0 },   { color: '#FF4500', r: 30 },
      { color: '#FF8C00', r: 60 },  { color: '#FFD700', r: 90 },
      { color: '#ADFF2F', r: 120 }, { color: '#00FF7F', r: 150 },
      { color: '#00CED1', r: 180 }, { color: '#1E90FF', r: 210 },
      { color: '#4169E1', r: 240 }, { color: '#8A2BE2', r: 270 },
      { color: '#FF1493', r: 300 }, { color: '#FF69B4', r: 330 },
    ].map(({ color, r }) => {
      const a1 = (r * Math.PI) / 180;
      const a2 = ((r + 28) * Math.PI) / 180;
      const cx = 26, cy = 28, ro = 22, ri = 12;
      const x1 = cx + ro * Math.cos(a1), y1 = cy + ro * Math.sin(a1);
      const x2 = cx + ro * Math.cos(a2), y2 = cy + ro * Math.sin(a2);
      const x3 = cx + ri * Math.cos(a2), y3 = cy + ri * Math.sin(a2);
      const x4 = cx + ri * Math.cos(a1), y4 = cy + ri * Math.sin(a1);
      return <path key={r} d={`M${x1},${y1} A${ro},${ro} 0 0,1 ${x2},${y2} L${x3},${y3} A${ri},${ri} 0 0,0 ${x4},${y4} Z`} fill={color} />;
    })}
    {/* White center circle */}
    <circle cx="26" cy="28" r="10" fill="white" />
    {/* Text */}
    <text x="56" y="28" fontFamily="Arial,sans-serif" fontSize="18" fontWeight="900" fill="#1E2D5E">Ben8X</text>
    <text x="56" y="46" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#1E2D5E">Digi Marketing</text>
  </svg>
);

// ─── Hirewise Solutions (SB3) — interlocked S+B3 monogram, cyan tagline ───────
const HirewiseLogo = () => (
  <svg viewBox="0 0 190 60" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* S letter - serif style */}
    <path d="M28 12 Q16 12 16 22 Q16 30 28 30 Q40 30 40 40 Q40 50 28 50 Q16 50 14 42" fill="none" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
    {/* B3 letter overlapping */}
    <path d="M32 14 L32 48 M32 14 Q46 14 46 22 Q46 30 32 30 M32 30 Q48 30 48 40 Q48 50 32 50" fill="none" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Text */}
    <text x="60" y="28" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="900" fill="#0F172A" letterSpacing="1">HIREWISE</text>
    <text x="60" y="46" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="700" fill="#22D3EE" letterSpacing="1">SOLUTIONS</text>
  </svg>
);

// ─── LT Supercom — blue globe with LT + orange "LT SUPERCOM" text ─────────────
const LTSupercomLogo = () => (
  <svg viewBox="0 0 220 56" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Globe outer ring */}
    <circle cx="26" cy="28" r="22" fill="#1E40AF" />
    <circle cx="26" cy="28" r="22" fill="none" stroke="#3B82F6" strokeWidth="1.5" />
    {/* Globe equator lines */}
    <ellipse cx="26" cy="28" rx="22" ry="8" fill="none" stroke="#3B82F6" strokeWidth="1" />
    <line x1="4" y1="28" x2="48" y2="28" stroke="#3B82F6" strokeWidth="0.8" />
    {/* Orange inner circle with LT */}
    <circle cx="26" cy="28" r="14" fill="#F97316" />
    {/* Bar chart icon inside */}
    <rect x="20" y="32" width="3" height="6" fill="white" opacity="0.9" />
    <rect x="24" y="28" width="3" height="10" fill="white" opacity="0.9" />
    <rect x="28" y="24" width="3" height="14" fill="white" opacity="0.9" />
    {/* LT text */}
    <text x="18" y="26" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="900" fill="white">LT</text>
    {/* Orbit arc */}
    <ellipse cx="26" cy="28" rx="26" ry="8" fill="none" stroke="#3B82F6" strokeWidth="1.5" transform="rotate(-20 26 28)" strokeDasharray="5,3" />
    {/* Text */}
    <text x="56" y="24" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="900" fill="#1E40AF">LT </text>
    <text x="78" y="24" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="900" fill="#F97316">SUPERCOM</text>
    <text x="56" y="38" fontFamily="Arial,sans-serif" fontSize="7.5" fontWeight="600" fill="#6B7280" letterSpacing="0.5">— RECRUITING &amp; CONSULTING —</text>
  </svg>
);

// ─── Learners Track — yellow circle + navy grad cap ────────────────────────────
const LearnersTrackLogo = () => (
  <svg viewBox="0 0 180 60" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Yellow circle */}
    <circle cx="28" cy="24" r="22" fill="#FBBF24" />
    <circle cx="28" cy="24" r="19" fill="#FCD34D" />
    {/* Graduation cap */}
    <polygon points="28,10 42,18 28,26 14,18" fill="#1E3A8A" />
    <rect x="22" y="18" width="12" height="10" rx="2" fill="#1E3A8A" />
    <line x1="42" y1="18" x2="42" y2="28" stroke="#1E3A8A" strokeWidth="2" />
    <circle cx="42" cy="29" r="2" fill="#1E3A8A" />
    {/* Cap top flat board */}
    <rect x="20" y="9" width="16" height="3" rx="1" fill="#1E3A8A" />
    {/* Text */}
    <text x="58" y="26" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="900" fill="#1E3A8A" letterSpacing="0.5">LEARNERS</text>
    <text x="58" y="42" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="600" fill="#6B7280" letterSpacing="2">TRACK</text>
  </svg>
);

// ─── Zenrise Digitech — orange sun with mountain peak inside, black text ───────
const ZenriseDigitechLogo = () => (
  <svg viewBox="0 0 180 60" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Sun circle */}
    <circle cx="28" cy="24" r="14" fill="#F4501A" />
    {/* Mountain/chevron inside circle */}
    <path d="M18 30 L28 18 L38 30 Z" fill="white" />
    <path d="M20 30 L28 21 L36 30 Z" fill="#F4501A" />
    {/* Sun rays */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const x1 = 28 + 16 * Math.cos(rad), y1 = 24 + 16 * Math.sin(rad);
      const x2 = 28 + 20 * Math.cos(rad), y2 = 24 + 20 * Math.sin(rad);
      return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F4501A" strokeWidth="3" strokeLinecap="round" />;
    })}
    {/* Text */}
    <text x="6" y="50" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="900" fill="#1A1A1A" letterSpacing="2">ZENRISE</text>
    <text x="8" y="60" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="600" fill="#1A1A1A" letterSpacing="3">DIGITECH</text>
  </svg>
);

// ─── VedXlence Innovations — "Ved" teal + "X" orange slash + "lence" teal ─────
const VedXlenceLogo = () => (
  <svg viewBox="0 0 230 52" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* V chevron on Ved */}
    <polyline points="4,10 10,34 16,10" fill="none" stroke="#2B6CB0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* ed */}
    <text x="20" y="32" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="800" fill="#2B6CB0" fontStyle="italic">ed</text>
    {/* X with diagonal slashes in orange */}
    <line x1="52" y1="10" x2="68" y2="36" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
    <line x1="68" y1="10" x2="52" y2="36" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
    {/* lence */}
    <text x="72" y="32" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="800" fill="#2B6CB0" fontStyle="italic">lence</text>
    {/* Innovations subtitle */}
    <text x="20" y="46" fontFamily="Arial,sans-serif" fontSize="8.5" fontWeight="500" fill="#9CA3AF" letterSpacing="1">innovations</text>
  </svg>
);

// ─── Maranatha Innovations — blue rounded square + white dove ─────────────────
const MaranathaLogo = () => (
  <svg viewBox="0 0 200 52" className="h-9 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="50" height="50" rx="10" fill="#2B8FE0" />
    <ellipse cx="30" cy="28" rx="11" ry="7" fill="white" transform="rotate(-20 30 28)" />
    <circle cx="40" cy="20" r="5" fill="white" />
    <polygon points="45,19 50,21 45,23" fill="#2B8FE0" />
    <path d="M18 30 Q12 24 10 32 Q14 28 18 32 Z" fill="white" />
    <path d="M26 22 Q18 8 10 12 Q16 16 20 22 Q22 18 26 22 Z" fill="white" />
    <path d="M34 20 Q38 14 44 16 Q40 18 36 22 Z" fill="white" opacity="0.7" />
    <path d="M45 22 Q50 28 48 34" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    <ellipse cx="47" cy="29" rx="2.5" ry="1.5" fill="white" transform="rotate(-30 47 29)" />
    <ellipse cx="48" cy="33" rx="2.5" ry="1.5" fill="white" transform="rotate(-10 48 33)" />
    <text x="58" y="24" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="900" fill="#1A1A1A">Maranatha</text>
    <text x="58" y="40" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="700" fill="#444">Innovations</text>
  </svg>
);

// ─── AICTE — gold gear, yellow circle, red AICTE, Sanskrit text ───────────────
const AICTELogo = () => (
  <svg viewBox="0 0 56 56" className="h-10 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    {/* Gear teeth */}
    {[0,24,48,72,96,120,144,168,192,216,240,264,288,312,336].map((deg, i) => {
      const rad = (deg * Math.PI) / 180;
      const cx = 28, cy = 28, r1 = 25, r2 = 22;
      const w = 5 * Math.PI / 180;
      const x1 = cx + r2 * Math.cos(rad - w), y1 = cy + r2 * Math.sin(rad - w);
      const x2 = cx + r1 * Math.cos(rad - w), y2 = cy + r1 * Math.sin(rad - w);
      const x3 = cx + r1 * Math.cos(rad + w), y3 = cy + r1 * Math.sin(rad + w);
      const x4 = cx + r2 * Math.cos(rad + w), y4 = cy + r2 * Math.sin(rad + w);
      return <polygon key={i} points={`${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}`} fill="#F59E0B" stroke="#D97706" strokeWidth="0.3" />;
    })}
    {/* Gear base circle */}
    <circle cx="28" cy="28" r="22" fill="#FBBF24" stroke="#D97706" strokeWidth="0.5" />
    {/* Inner yellow circle */}
    <circle cx="28" cy="28" r="19" fill="#FEF08A" />
    {/* AICTE text */}
    <text x="28" y="22" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="900" fill="#DC2626">AICTE</text>
    {/* Sanskrit text */}
    <text x="28" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="4.5" fontWeight="600" fill="#374151">योगः कर्मेंषु कौशलम्</text>
    {/* Flame/diya icon */}
    <circle cx="28" cy="40" r="5" fill="#1D4ED8" />
    <ellipse cx="28" cy="38" rx="2" ry="3" fill="#DC2626" />
    <ellipse cx="26" cy="40" rx="1.5" ry="2" fill="#FCD34D" />
    <ellipse cx="30" cy="40" rx="1.5" ry="2" fill="#10B981" />
  </svg>
);

// ─── Unlox ────────────────────────────────────────────────────────────────────
const UnloxLogo = () => (
  <svg viewBox="0 0 140 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="28" height="28" rx="6" fill="#0F172A" />
    <rect x="9" y="17" width="14" height="10" rx="3" fill="none" stroke="#60A5FA" strokeWidth="2.5" />
    <rect x="11" y="25" width="10" height="10" rx="2" fill="#3B82F6" />
    <circle cx="16" cy="30" r="1.5" fill="white" />
    <text x="36" y="30" fontFamily="Arial,sans-serif" fontSize="17" fontWeight="900" fill="#0F172A">Unlox</text>
  </svg>
);

// ─── LaunchedGlobal ───────────────────────────────────────────────────────────
const LaunchedGlobalLogo = () => (
  <svg viewBox="0 0 180 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="24" r="16" fill="#0EA5E9" />
    <path d="M14 30 l4-12 8-2 -2 8 z" fill="white" />
    <circle cx="26" cy="18" r="2" fill="#FCD34D" />
    <text x="42" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0EA5E9">Launched</text>
    <text x="42" y="36" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0F172A">Global</text>
  </svg>
);

// ─── Modern-Tek ───────────────────────────────────────────────────────────────
const ModernTekLogo = () => (
  <svg viewBox="0 0 160 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="28" height="28" rx="4" fill="#0F172A" />
    <polyline points="8,30 14,20 20,26 26,16" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="36" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0F172A">Modern</text>
    <text x="36" y="36" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#06B6D4">-Tek</text>
  </svg>
);

// ─── Apex Skill Technologies ──────────────────────────────────────────────────
const ApexSkillLogo = () => (
  <svg viewBox="0 0 220 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,8 36,40 4,40" fill="none" stroke="#F97316" strokeWidth="2.5" />
    <text x="10" y="32" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="900" fill="#F97316">A</text>
    <text x="44" y="21" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="800" fill="#F97316">Apex Skill</text>
    <text x="44" y="36" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="800" fill="#0F172A">Technologies</text>
  </svg>
);

// ─── Partners data list ────────────────────────────────────────────────────────
export const partnersList = [
  { name: 'iBirds Services',          logo: IBirdsLogo,          cat: 'tech',     desc: 'Salesforce consulting firm delivering CRM and enterprise solutions across 30+ countries.', url: 'https://www.ibirdsservices.com/' },
  { name: 'RazorpayX',                logo: RazorpayXLogo,       cat: 'finance',  desc: 'Business banking and payment gateway integrations for secure online transactions.',          url: 'https://razorpay.com/x/' },
  { name: 'Razorpay',                 logo: RazorpayLogo,        cat: 'finance',  desc: 'India\'s leading payment gateway powering millions of businesses with fast, secure payments.', url: 'https://razorpay.com/' },
  { name: 'DigiLocker',               logo: DigiLockerLogo,      cat: 'infra',    desc: 'Government-backed digital document storage and verification platform by Govt. of India.',   url: 'https://digilocker.gov.in/' },
  { name: 'HostingRaja',              logo: HostingRajaLogo,     cat: 'infra',    desc: 'India\'s No.1 ISO-certified web hosting provider for reliable, high-performance deployments.', url: 'https://www.hostingraja.in/' },
  { name: 'Unlox',                    logo: UnloxLogo,           cat: 'tech',     desc: 'Digital solutions and tech innovation partner driving modern product development.',           url: 'https://www.unlox.com/' },
  { name: 'SkillOrbit',               logo: SkillOrbitLogo,      cat: 'skills',   desc: 'Professional training and skill development platform for tech careers.',                     url: 'https://www.skillorbit.com/' },
  { name: 'SkillStation',             logo: SkillStationLogo,    cat: 'skills',   desc: 'Academic partner offering internship bootcamps, MERN stack training, and placement support.', url: '#' },
  { name: 'Ben8X Digi Marketing',     logo: Ben8XLogo,           cat: 'business', desc: 'Full-spectrum digital marketing agency driving brand growth through data-driven strategies.', url: '#' },
  { name: 'Hirewise Solutions',       logo: HirewiseLogo,        cat: 'business', desc: 'Talent acquisition and HR solutions connecting businesses with certified engineering talent.', url: '#' },
  { name: 'LT Supercom',              logo: LTSupercomLogo,      cat: 'business', desc: 'Recruiting & consulting firm specializing in talent placement and business advisory.',        url: '#' },
  { name: 'Learners Track',           logo: LearnersTrackLogo,   cat: 'skills',   desc: 'Education platform providing structured learning paths and career-focused training programs.', url: '#' },
  { name: 'LaunchedGlobal',           logo: LaunchedGlobalLogo,  cat: 'business', desc: 'Business consulting and global launch strategies for startups and enterprises.',              url: 'https://launchedglobal.in/' },
  { name: 'Modern-Tek',               logo: ModernTekLogo,       cat: 'tech',     desc: 'Modern technology solutions and digital transformation services.',                            url: 'https://modern-tek.co.in/' },
  { name: 'VedXlence Innovations',    logo: VedXlenceLogo,       cat: 'business', desc: 'Innovation-driven digital solutions and technology consulting services.',                     url: '#' },
  { name: 'Apex Skill Technologies',  logo: ApexSkillLogo,       cat: 'skills',   desc: 'Technical training and skill development provider for engineering talent.',                   url: '#' },
  { name: 'Maranatha Innovations',    logo: MaranathaLogo,       cat: 'business', desc: 'Business innovation and strategic partnership solutions for growth.',                         url: '#' },
  { name: 'Zenrise Digitech',         logo: ZenriseDigitechLogo, cat: 'tech',     desc: 'Digital technology and software solutions provider for the modern web.',                     url: '#' },
  { name: 'AICTE',                    logo: AICTELogo,           cat: 'infra',    desc: 'All India Council for Technical Education — officially approving Sofzenix as an internship provider.', url: 'https://www.aicte-india.org/' },
];

// ─── Marquee component ─────────────────────────────────────────────────────────
const PartnerLogoMarquee = memo(() => {
  const doubled = [...partnersList, ...partnersList];
  return (
    <div className="relative w-full overflow-hidden select-none">
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FAFBFF] to-transparent" />
      <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-[#FAFBFF] to-transparent" />
      <div
        className="flex items-center gap-6"
        style={{ animation: 'marqueeScroll 55s linear infinite', width: 'max-content' }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {doubled.map((partner, idx) => {
          const Logo = partner.logo;
          return (
            <div
              key={`${partner.name}-${idx}`}
              className="flex-shrink-0 flex items-center justify-center px-5 py-3 bg-white border border-gray-200/50 rounded-2xl shadow-sm hover:shadow-md hover:border-[#2563EB]/20 transition-all duration-300 cursor-default"
              style={{ minWidth: '150px', height: '68px' }}
            >
              {typeof Logo === 'function' ? <Logo /> : (
                <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">{partner.name}</span>
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
});

PartnerLogoMarquee.displayName = 'PartnerLogoMarquee';
export default PartnerLogoMarquee;
