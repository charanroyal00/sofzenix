import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCloud, FaCode, FaDatabase, FaCogs, FaBrain, FaGraduationCap } from 'react-icons/fa';
import { SiReact, SiNodedotjs, SiExpress, SiMongodb, SiSpringboot, SiDocker, SiPostgresql } from 'react-icons/si';

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
  { name: 'SkillStation', category: 'Education', type: 'partner', textLogo: 'SkillStation', color: 'bg-sky-50' }
];

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
