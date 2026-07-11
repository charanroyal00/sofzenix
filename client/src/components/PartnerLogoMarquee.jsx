import { memo } from 'react';

// ─── Inline SVG / JSX logo components ─────────────────────────────────────────
// Using inline logos guarantees rendering regardless of CORS / hotlink restrictions.

export const RazorpayXLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 27" className="h-7 w-auto max-w-full select-none">
    <path d="M8.085 7.03 7.046 10.868 12.99 7.008 9.103 21.571 13.05 21.575 18.793.064" fill="rgb(51,149,255)" />
    <path d="M1.688 15.452.053 21.574h8.091l3.311-12.454ZM29.794 10.062c-.198.738-.579 1.28-1.147 1.627-.567.345-1.363.519-2.39.519h-3.263l1.146-4.29h3.263c1.026 0 1.731.172 2.113.523.382.351.475.887.278 1.628Zm3.379-.085c.415-1.549.244-2.741-.515-3.575-.759-.828-2.089-1.245-3.988-1.245h-7.283l-4.384 16.425h3.538l1.767-6.62h2.321c.521 0 .931.086 1.23.251.3.172.476.47.53.9l.632 5.469h3.791l-.615-5.098c-.125-1.138-.644-1.807-1.556-2.006 1.162-.337 2.136-.9 2.921-1.681.779-.776 1.335-1.747 1.611-2.814ZM41.774 15.703c-.297 1.112-.752 1.953-1.367 2.542-.615.589-1.351.881-2.21.881-.874 0-1.466-.285-1.78-.861-.313-.576-.324-1.41-.033-2.502.292-1.093.757-1.947 1.396-2.562.64-.616 1.387-.924 2.246-.924.857 0 1.443.298 1.74.889.303.594.31 1.443.013 2.549Zm1.551-5.812-0.443 1.661c-.191-.596-.563-1.072-1.111-1.43-.55-.351-1.23-.529-2.042-.529-.995 0-1.951.258-2.868.774-.916.517-1.721 1.245-2.406 2.185-.686.94-1.187 2.006-1.51 3.204-.316 1.205-.382 2.258-.191 3.171.198.92.613 1.622 1.253 2.112.646.496 1.47.741 2.478.741.802.004 1.594-.17 2.321-.509.719-.326 1.358-.805 1.872-1.404l-.461 1.732h3.422l3.124-11.702h-3.428ZM59.059 9.891h-9.951l-.696 2.608h5.79l-7.654 6.64-.654 2.449h10.272l.695-2.608H50.657l7.772-6.739ZM67.817 15.683c-.308 1.152-.765 2.018-1.368 2.582-.603.569-1.334.854-2.191.854-1.794 0-2.383-1.145-1.771-3.436.303-1.138.762-1.994 1.375-2.571.613-.579 1.356-.867 2.23-.867.857 0 1.436.286 1.734.864.298.576.295 1.434-.009 2.573Zm2.003-5.352c-.788-.493-1.793-.739-3.02-.739-1.241 0-2.39.245-3.448.735-1.053.487-1.978 1.213-2.703 2.122-.745.921-1.281 2-1.61 3.231-.323 1.227-.362 2.304-.112 3.226.251.92.778 1.628 1.569 2.118.798.494 1.813.74 3.059.74 1.227 0 2.367-.248 3.416-.74 1.048-.495 1.944-1.199 2.689-2.125.745-.923 1.279-2 1.609-3.231.33-1.231.369-2.306.119-3.231-.251-.92-.772-1.628-1.556-2.121ZM82.035 13.017l.877-3.185c-.297-.152-.686-.231-1.173-.231-.785 0-1.537.194-2.262.589-.623.335-1.154.807-1.602 1.399l.455-1.714-1.993.004-2.44-.004-3.145 11.697h3.47l1.632-6.115c.237-.889.665-1.588 1.281-2.085.613-.498 1.378-.748 2.301-.748.567 0 1.094.13 1.595.391ZM91.69 15.74c-.297 1.092-.745 1.926-1.358 2.502-.613.579-1.352.867-2.209.867-.857 0-1.444-.291-1.754-.874-.316-.586-.323-1.43-.026-2.539.297-1.109.752-1.96 1.378-2.549.626-.594 1.365-.89 2.222-.89.844 0 1.411.304 1.714.92.303.616.31 1.47.018 2.562Zm2.411-5.39c-.642-.516-1.463-.775-2.459-.775-.872 0-1.703.199-2.492.6-.788.401-1.427.947-1.918 1.638l.012-.079.582-1.861h-3.389l-.864 3.238-.026.112-3.56 13.336h3.474l1.794-6.713c.178.597.54 1.066 1.094 1.405.554.337 1.237.505 2.05.505 1.009 0 1.972-.245 2.885-.735.916-.491 1.707-1.198 2.38-2.122.672-.903 1.171-1.963 1.49-3.161.323-1.2.389-2.271.204-3.207-.188-.938-.604-1.665-1.246-2.178ZM124.968 9.88h-2.101c-.068 0-.127.003-.188.004h-1.091l-.561.782-.138.185-.06.093-4.433 6.201-.917-7.262h-3.631l1.839 11.036-4.061 5.647h3.62l.982-1.399c.028-.041.053-.076.086-.119l1.147-1.635.033-.047 5.138-7.315 4.331-6.157.007-.004z" fill="rgb(51,149,255)" />
  </svg>
);

// iBirds Services – Salesforce consulting firm (Ajmer, India)
const IBirdsLogo = () => (
  <svg viewBox="0 0 160 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="24" r="18" fill="#1E3A5F" />
    <path d="M12 18 c0-2 2-3 4-2 l8 4 c2 1 2 3 0 4 l-8 4 c-2 1-4 0-4-2 z" fill="white" />
    <circle cx="28" cy="20" r="2.5" fill="#4A90D9" />
    <text x="44" y="20" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="700" fill="#1E3A5F">iBirds</text>
    <text x="44" y="35" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="500" fill="#4A90D9">Software Services</text>
  </svg>
);

// DigiLocker – India's official digital document wallet (NIC / Govt. of India)
const DigiLockerLogo = () => (
  <svg viewBox="0 0 160 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="30" height="36" rx="4" fill="#FF6B00" />
    <rect x="7" y="12" width="20" height="5" rx="1.5" fill="white" />
    <rect x="7" y="20" width="20" height="5" rx="1.5" fill="white" />
    <rect x="7" y="28" width="14" height="5" rx="1.5" fill="white" />
    <text x="38" y="21" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="800" fill="#FF6B00">Digi</text>
    <text x="68" y="21" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="800" fill="#1A1A2E">Locker</text>
    <text x="38" y="35" fontFamily="Arial,sans-serif" fontSize="8" fontWeight="600" fill="#666">Govt. of India Initiative</text>
  </svg>
);

// HostingRaja – India's No.1 hosting provider
const HostingRajaLogo = () => (
  <svg viewBox="0 0 160 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="28" height="28" rx="6" fill="#E84C3D" />
    <text x="16" y="30" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="900" fill="white">H</text>
    <text x="36" y="21" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800" fill="#E84C3D">Hosting</text>
    <text x="36" y="37" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="800" fill="#1A1A2E">Raja</text>
    <text x="108" y="21" fontFamily="Arial,sans-serif" fontSize="7" fontWeight="600" fill="#999">®</text>
  </svg>
);

// Unlox
const UnloxLogo = () => (
  <svg viewBox="0 0 140 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="28" height="28" rx="6" fill="#0F172A" />
    <rect x="9" y="17" width="14" height="10" rx="3" fill="none" stroke="#60A5FA" strokeWidth="2.5" />
    <rect x="11" y="25" width="10" height="10" rx="2" fill="#3B82F6" />
    <circle cx="16" cy="30" r="1.5" fill="white" />
    <text x="36" y="30" fontFamily="Arial,sans-serif" fontSize="17" fontWeight="900" fill="#0F172A">Unlox</text>
  </svg>
);

// SkillOrbit
const SkillOrbitLogo = () => (
  <svg viewBox="0 0 160 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="24" r="16" fill="#2563EB" />
    <ellipse cx="20" cy="24" rx="16" ry="6" fill="none" stroke="white" strokeWidth="1.5" />
    <circle cx="20" cy="24" r="3.5" fill="white" />
    <text x="42" y="21" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#2563EB">Skill</text>
    <text x="42" y="36" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#0F172A">Orbit</text>
  </svg>
);

// LaunchedGlobal
const LaunchedGlobalLogo = () => (
  <svg viewBox="0 0 180 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="24" r="16" fill="#0EA5E9" />
    <path d="M14 30 l4-12 8-2 -2 8 z" fill="white" />
    <circle cx="26" cy="18" r="2" fill="#FCD34D" />
    <text x="42" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0EA5E9">Launched</text>
    <text x="42" y="36" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0F172A">Global</text>
  </svg>
);

// Modern-Tek
const ModernTekLogo = () => (
  <svg viewBox="0 0 160 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="28" height="28" rx="4" fill="#0F172A" />
    <polyline points="8,30 14,20 20,26 26,16" fill="none" stroke="#22D3EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="36" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0F172A">Modern</text>
    <text x="36" y="36" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#06B6D4">-Tek</text>
  </svg>
);

// Vetrix Digital
const VetrixDigitalLogo = () => (
  <svg viewBox="0 0 180 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,8 34,38 6,38" fill="#7C3AED" />
    <polygon points="20,14 30,34 10,34" fill="#A78BFA" />
    <text x="40" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#7C3AED">Vetrix</text>
    <text x="40" y="36" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0F172A">Digital</text>
  </svg>
);

// Apex Skill Technologies
const ApexSkillLogo = () => (
  <svg viewBox="0 0 220 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="20,8 36,40 4,40" fill="none" stroke="#F97316" strokeWidth="2.5" />
    <text x="10" y="32" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="900" fill="#F97316">A</text>
    <text x="44" y="21" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="800" fill="#F97316">Apex Skill</text>
    <text x="44" y="36" fontFamily="Arial,sans-serif" fontSize="10" fontWeight="800" fill="#0F172A">Technologies</text>
  </svg>
);

// BensxDigi
const BensxDigiLogo = () => (
  <svg viewBox="0 0 160 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="28" height="32" rx="5" fill="#1D4ED8" />
    <text x="16" y="29" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="14" fontWeight="900" fill="white">B</text>
    <text x="36" y="21" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#1D4ED8">Bensx</text>
    <text x="36" y="36" fontFamily="Arial,sans-serif" fontSize="12" fontWeight="800" fill="#0F172A">Digi</text>
  </svg>
);

// SB-S3
const SBS3Logo = () => (
  <svg viewBox="0 0 120 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="30" height="28" rx="5" fill="#059669" />
    <text x="17" y="29" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="900" fill="white">SB</text>
    <text x="38" y="30" fontFamily="Arial,sans-serif" fontSize="16" fontWeight="900" fill="#059669">S3</text>
    <line x1="36" y1="14" x2="36" y2="38" stroke="#059669" strokeWidth="1.5" />
  </svg>
);

// Maranatha
const MaranathaLogo = () => (
  <svg viewBox="0 0 170 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="28" height="28" rx="14" fill="#BE185D" />
    <text x="16" y="29" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="13" fontWeight="900" fill="white">M</text>
    <text x="36" y="30" fontFamily="Arial,sans-serif" fontSize="15" fontWeight="800" fill="#BE185D">Maranatha</text>
  </svg>
);

// ET Supercom
const ETSupercomLogo = () => (
  <svg viewBox="0 0 180 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="8" width="28" height="32" rx="4" fill="#0369A1" />
    <text x="16" y="20" textAnchor="middle" fontFamily="Arial,sans-serif" fontSize="9" fontWeight="900" fill="white">ET</text>
    <path d="M8 24 h16 M8 30 h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
    <text x="36" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0369A1">ET</text>
    <text x="36" y="36" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0F172A">Supercom</text>
  </svg>
);

// Zennise Digitech
const ZenniseDigitechLogo = () => (
  <svg viewBox="0 0 200 48" className="h-8 w-auto max-w-full select-none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="10" width="28" height="28" rx="5" fill="#4F46E5" />
    <path d="M8 16 h16 L8 32 h16" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="36" y="21" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#4F46E5">Zennise</text>
    <text x="36" y="36" fontFamily="Arial,sans-serif" fontSize="11" fontWeight="800" fill="#0F172A">Digitech</text>
  </svg>
);

// ─── Partners data ─────────────────────────────────────────────────────────────
export const partnersList = [
  {
    name: 'iBirds Services',
    logo: IBirdsLogo,
    cat: 'tech',
    desc: 'Premier Salesforce consulting firm delivering CRM and enterprise software solutions across 30+ countries.',
    url: 'https://www.ibirdsservices.com/'
  },
  {
    name: 'RazorpayX',
    logo: RazorpayXLogo,
    cat: 'finance',
    desc: 'Business banking and payment gateway integrations for secure online transactions.',
    url: 'https://razorpay.com/x/'
  },
  {
    name: 'DigiLocker',
    logo: DigiLockerLogo,
    cat: 'infra',
    desc: 'Government-backed digital document storage and verification platform by Govt. of India.',
    url: 'https://digilocker.gov.in/'
  },
  {
    name: 'HostingRaja',
    logo: HostingRajaLogo,
    cat: 'infra',
    desc: "India's No.1 cloud hosting and domain infrastructure provider for reliable deployments.",
    url: 'https://www.hostingraja.in/'
  },
  {
    name: 'Unlox',
    logo: UnloxLogo,
    cat: 'tech',
    desc: 'Digital solutions and tech innovation partner driving modern product development.',
    url: 'https://www.unlox.com/'
  },
  {
    name: 'SkillOrbit',
    logo: SkillOrbitLogo,
    cat: 'skills',
    desc: 'Professional training and skill development platform for tech careers.',
    url: 'https://www.skillorbit.com/'
  },
  {
    name: 'LaunchedGlobal',
    logo: LaunchedGlobalLogo,
    cat: 'business',
    desc: 'Business consulting and global launch strategies for startups and enterprises.',
    url: 'https://launchedglobal.in/'
  },
  {
    name: 'Modern-Tek',
    logo: ModernTekLogo,
    cat: 'tech',
    desc: 'Modern technology solutions and digital transformation services.',
    url: 'https://modern-tek.co.in/'
  },
  {
    name: 'Vetrix Digital',
    logo: VetrixDigitalLogo,
    cat: 'business',
    desc: 'Digital marketing and branding solutions empowering businesses online.',
    url: '#'
  },
  {
    name: 'Apex Skill Technologies',
    logo: ApexSkillLogo,
    cat: 'skills',
    desc: 'Technical training and skill development provider for engineering talent.',
    url: '#'
  },
  {
    name: 'BensxDigi',
    logo: BensxDigiLogo,
    cat: 'business',
    desc: 'Digital transformation and business solutions for next-generation enterprises.',
    url: '#'
  },
  {
    name: 'SB-S3',
    logo: SBS3Logo,
    cat: 'tech',
    desc: 'Technology and software development partner specializing in scalable solutions.',
    url: '#'
  },
  {
    name: 'Maranatha',
    logo: MaranathaLogo,
    cat: 'business',
    desc: 'Business consulting and strategic partnership solutions for growth.',
    url: '#'
  },
  {
    name: 'ET Supercom',
    logo: ETSupercomLogo,
    cat: 'infra',
    desc: 'Communications infrastructure and technology services provider.',
    url: '#'
  },
  {
    name: 'Zennise Digitech',
    logo: ZenniseDigitechLogo,
    cat: 'tech',
    desc: 'Digital technology and software solutions provider for the modern web.',
    url: '#'
  }
];

// ─── Marquee component ─────────────────────────────────────────────────────────
const PartnerLogoMarquee = memo(() => {
  const doubled = [...partnersList, ...partnersList];

  return (
    <div className="relative w-full overflow-hidden select-none">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FAFBFF] to-transparent" />
      <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-[#FAFBFF] to-transparent" />

      <div
        className="flex items-center gap-6"
        style={{
          animation: 'marqueeScroll 45s linear infinite',
          width: 'max-content',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {doubled.map((partner, idx) => {
          const Logo = partner.logo;
          return (
            <div
              key={`${partner.name}-${idx}`}
              className="flex-shrink-0 flex items-center justify-center px-5 py-3 bg-white border border-gray-200/50 rounded-2xl shadow-sm hover:shadow-md hover:border-[#2563EB]/20 transition-all duration-300 cursor-default"
              style={{ minWidth: '140px', height: '64px' }}
            >
              {typeof Logo === 'function' ? (
                <Logo />
              ) : (
                <span className="text-xs font-black uppercase tracking-wider text-[#2563EB]">
                  {partner.name}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
});

PartnerLogoMarquee.displayName = 'PartnerLogoMarquee';
export default PartnerLogoMarquee;
