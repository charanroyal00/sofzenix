import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCloud, FaBrain } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiMongodb, SiSpringboot, SiPostgresql } from 'react-icons/si';

// SkillStation inline SVG logo — based on official brand identity
// Colors: navy #1B3A6B, orange #F97316, tagline gray #6B7280
const SkillStationLogo = () => (
  <svg viewBox="0 0 120 52" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    {/* Open book base */}
    <path d="M10 34 Q30 28 60 32 Q90 28 110 34 L108 42 Q90 36 60 40 Q30 36 12 42 Z" fill="#1B3A6B" />
    <path d="M12 42 Q30 36 60 40 L60 32 Q30 28 12 34 Z" fill="#2563EB" />
    <path d="M108 42 Q90 36 60 40 L60 32 Q90 28 108 34 Z" fill="#F97316" />
    {/* Spine crease */}
    <line x1="60" y1="32" x2="60" y2="42" stroke="#0F172A" strokeWidth="1" />
    {/* Rocket */}
    <path d="M57 30 Q60 10 63 30 L62 34 L58 34 Z" fill="#F97316" />
    <path d="M58 34 L56 38 L60 36 L64 38 L62 34 Z" fill="#1B3A6B" />
    <path d="M59 36 Q60 40 61 36" fill="#FCD34D" opacity="0.9" />
    {/* Graduation cap */}
    <rect x="52" y="8" width="16" height="3" rx="1" fill="#1B3A6B" />
    <polygon points="60,5 68,9 60,13 52,9" fill="#0F172A" />
    <line x1="68" y1="9" x2="70" y2="14" stroke="#F97316" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="70" cy="15" r="1.5" fill="#F97316" />
    {/* Text: Skil (navy) + Station (orange) */}
    <text x="10" y="50" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="900" fill="#1B3A6B">Skil</text>
    <text x="32" y="50" fontFamily="Arial,sans-serif" fontSize="9.5" fontWeight="900" fill="#F97316">Station</text>
  </svg>
);

const ecosystem = [
  // Cloud
  { name: 'AWS Cloud', category: 'Cloud', type: 'tech', icon: FaCloud, color: 'text-orange-500 bg-orange-50' },
  { name: 'HostingRaja', category: 'Cloud', type: 'partner', logo: 'https://image.hostingraja.in/images/logo/mobile-menu-logo.webp', color: 'bg-blue-50' },
  
  // Development
  { name: 'React', category: 'Development', type: 'tech', icon: SiReact, color: 'text-cyan-500 bg-cyan-50' },
  { name: 'Node.js', category: 'Development', type: 'tech', icon: SiNodedotjs, color: 'text-green-500 bg-green-50' },
  { name: 'Spring Boot', category: 'Development', type: 'tech', icon: SiSpringboot, color: 'text-green-600 bg-emerald-50' },

  // Database
  { name: 'MongoDB', category: 'Database', type: 'tech', icon: SiMongodb, color: 'text-green-500 bg-green-50' },
  { name: 'PostgreSQL', category: 'Database', type: 'tech', icon: SiPostgresql, color: 'text-indigo-500 bg-indigo-50' },

  // Enterprise
  { name: 'iBirds Services', category: 'Enterprise', type: 'partner', logo: 'https://www.ibirdsservices.com/wp-content/uploads/2024/01/ibirds-logo1-852x1024-1-1.png', color: 'bg-indigo-50' },
  { name: 'RazorpayX', category: 'Enterprise', type: 'partner', textLogo: 'RazorpayX', color: 'bg-blue-50' },

  // AI
  { name: 'Cognitive AI', category: 'AI', type: 'tech', icon: FaBrain, color: 'text-purple-500 bg-purple-50' },

  // Education
  { name: 'SkillStation', category: 'Education', type: 'partner', InlineLogo: SkillStationLogo, color: 'bg-white' }];

const categories = ['All', 'Cloud', 'Development', 'Database', 'Enterprise', 'AI', 'Education'];

const PartnersSection = memo(() => {
  const [activeTab, setActiveTab] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredItems = activeTab === 'All' 
    ? ecosystem 
    : ecosystem.filter(item => item.category === activeTab);

  return (
    <section id="partners-ecosystem" className="w-full bg-[#FFFFFF] py-20 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/10">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-radial from-[#2563EB]/5 to-transparent pointer-events-none z-0" />
      
      <div className="max-w-[1400px] mx-auto relative z-10 text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-4"
          >
            Technology Ecosystem
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
            Technologies We Work With
          </h2>
          <p className="text-[#475569] text-sm md:text-base font-semibold">
            Partner integrations and production-grade technologies we leverage to construct secure, scalable applications.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-4xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold border transition-all duration-300 cursor-pointer ${
                activeTab === cat 
                  ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/25' 
                  : 'bg-[#F8FAFC] border-gray-200/60 text-[#475569] hover:text-[#0F172A] hover:border-gray-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ecosystem Grid */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  layout
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative premium-card bg-white border border-gray-200/50 rounded-2xl p-6 flex flex-col items-center justify-center h-40 transition-all duration-300 cursor-default"
                >
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${item.color}`}>
                    {IconComponent ? (
                      <IconComponent className="text-3xl" />
                    ) : item.InlineLogo ? (
                      <item.InlineLogo />
                    ) : item.logo ? (
                      <img src={item.logo} loading="lazy" decoding="async" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }} alt={item.name} className="max-h-8 max-w-[80%] object-contain" />
                    ) : (
                      <span className="text-[10px] font-black uppercase text-[#2563EB] text-center px-1 truncate">
                        {item.textLogo}
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-[#0F172A] text-center mb-1 group-hover:text-[#2563EB] transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                    {item.category}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* View partners button */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <Link 
            to="/partners" 
            className="premium-secondary-btn flex items-center gap-2"
          >
            <span>Explore All Partners</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>

      </div>
    </section>
  );
});

export default PartnersSection;
