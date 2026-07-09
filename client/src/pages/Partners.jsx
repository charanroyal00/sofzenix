import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaHandshake, 
  FaCode, 
  FaGraduationCap, 
  FaServer, 
  FaCreditCard, 
  FaBriefcase, 
  FaLightbulb, 
  FaRocket,
  FaArrowUpRightFromSquare,
  FaShieldHalved,
  FaCircleCheck
} from 'react-icons/fa6';

import PartnerLogoMarquee, { RazorpayXLogo, partnersList } from '../components/PartnerLogoMarquee';

// Particles component rendering slow-moving network dots and connecting web lines.
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50 z-0 select-none">
      {/* Subtle network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <line x1="15%" y1="18%" x2="35%" y2="42%" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="5,5" className="animate-dash" />
        <line x1="35%" y1="42%" x2="58%" y2="22%" stroke="url(#line-gradient)" strokeWidth="1" />
        <line x1="58%" y1="22%" x2="85%" y2="48%" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="8,4" className="animate-dash" />
        <line x1="85%" y1="48%" x2="42%" y2="78%" stroke="url(#line-gradient)" strokeWidth="1" />
        <line x1="42%" y1="78%" x2="15%" y2="18%" stroke="url(#line-gradient)" strokeWidth="1" />
        <line x1="30%" y1="65%" x2="70%" y2="85%" stroke="url(#line-gradient)" strokeWidth="1" strokeDasharray="4,4" className="animate-dash" />
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F6FFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FF8A00" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 3 + 1.5;
        const delay = Math.random() * 8;
        const duration = Math.random() * 15 + 12;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        return (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/15 blur-[0.5px] animate-float"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
};

const Partners = () => {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', name: 'All Partners' },
    { id: 'tech', name: 'Technology' },
    { id: 'skills', name: 'Learning & Skills' },
    { id: 'business', name: 'Business' },
    { id: 'finance', name: 'Financial' },
    { id: 'infra', name: 'Infrastructure' }
  ];

  const whyChoosePartners = [
    { title: 'Technology Collaboration', icon: FaCode, desc: 'Co-engineering modules to launch robust microservices frameworks.' },
    { title: 'Skill Development', icon: FaGraduationCap, desc: 'Structuring custom learning paths, sandboxes, and developer pipelines.' },
    { title: 'Enterprise Innovation', icon: FaLightbulb, desc: 'Aggregating resources to launch cutting-edge SaaS products.' },
    { title: 'Cloud Infrastructure', icon: FaServer, desc: 'Deploying dockerized applications on distributed, low-latency servers.' },
    { title: 'Secure Payments', icon: FaCreditCard, desc: 'Integrating encrypted payment gateways to guarantee safe transactions.' },
    { title: 'Recruitment & Hiring', icon: FaBriefcase, desc: 'Bridging technical gaps by supplying certified engineering talent.' },
    { title: 'Digital Transformation', icon: FaRocket, desc: 'Accelerating migration of legacy workflows to unified cloud models.' },
    { title: 'Business Growth', icon: FaHandshake, desc: 'Establishing strategic nodes to drive shared market expansions.' }
  ];

  const filteredPartners = activeTab === 'all' 
    ? partnersList 
    : partnersList.filter(p => p.cat === activeTab);

  return (
    <div className="bg-transparent min-h-screen text-[#475569] select-none relative overflow-hidden">
      
      {/* Inject custom CSS keyframes */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
          50% { transform: translateY(-30px) translateX(15px); opacity: 0.7; }
          100% { transform: translateY(0px) translateX(0px); opacity: 0.15; }
        }
        .animate-float {
          animation: float 25s infinite ease-in-out;
        }
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-dash {
          animation: dash 12s linear infinite;
        }
      `}</style>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[75vh] flex items-center justify-center pt-32 pb-16 px-6 md:px-8 border-b border-gray-200/20">
        {/* Ambient background light */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#2563EB]/3 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1000px] mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#F97316] mb-6">
            🤝 Trusted Partnerships
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#0F172A] mb-6 leading-[1.2]"
          >
            Growing Together With <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">
              Industry Leaders
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.1 }}
            className="text-[#475569] text-sm sm:text-base md:text-lg max-w-2xl mb-8 leading-[1.65] font-semibold"
          >
            Sofzenix collaborates with leading technology developers, training academies, infrastructure hubs, and financial nodes to compile and deploy secure enterprise solutions worldwide.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <a 
              href="#contact-partners" 
              className="btn-glow-primary px-8 py-3.5 rounded-full text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              Become a Partner
            </a>
            <a 
              href="#directory" 
              className="btn-glow-secondary px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Partners</span>
              <FaArrowRight className="text-xs text-[#2563EB] group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 1.5 AICTE APPROVED BANNER */}
      <section className="py-16 px-6 md:px-8 relative border-b border-gray-200/20 bg-gradient-to-br from-[#EEF4FF] via-white to-[#FFF7ED] overflow-hidden">
        {/* Decorative blur blobs */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#2563EB]/8 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#F97316]/8 rounded-full blur-[100px] pointer-events-none translate-x-1/2 translate-y-1/2" />

        <div className="max-w-[1100px] mx-auto relative z-10">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/8 border border-[#2563EB]/15 text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-4">
              <FaShieldHalved className="text-sm" />
              Government Recognition
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-3">
              Officially{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#F97316]">
                AICTE Approved
              </span>{' '}
              Internship Provider
            </h2>
            <p className="text-[#475569] text-sm md:text-base font-semibold max-w-2xl leading-relaxed">
              We are proud to be recognized by the <strong>All India Council for Technical Education (AICTE)</strong> — empowering students across India with 100% free, high-quality internship opportunities.
            </p>
          </motion.div>

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative p-[1.5px] rounded-[28px] bg-gradient-to-tr from-[#2563EB]/30 via-white/20 to-[#F97316]/30 shadow-2xl"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-[27px] p-8 md:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border border-white/60">

              {/* Left — AICTE logo + badge */}
              <div className="flex flex-col items-center justify-center gap-6">
                <div className="flex items-center gap-5 p-6 bg-[#F8FAFC] rounded-2xl border border-gray-200/60 w-full max-w-sm mx-auto">
                  {/* AICTE Logo — inline SVG always renders, no hotlink dependency */}
                  <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center bg-white rounded-xl border border-gray-200/60 p-1.5 select-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="50" cy="50" r="48" fill="#1a3a6b" stroke="#f0a500" strokeWidth="3"/>
                      <text x="50" y="38" textAnchor="middle" fill="#f0a500" fontSize="18" fontWeight="bold" fontFamily="Arial">AICTE</text>
                      <text x="50" y="56" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="Arial">ALL INDIA COUNCIL FOR</text>
                      <text x="50" y="66" textAnchor="middle" fill="white" fontSize="6.5" fontFamily="Arial">TECHNICAL EDUCATION</text>
                      <circle cx="50" cy="78" r="6" fill="#f0a500"/>
                      <text x="50" y="81" textAnchor="middle" fill="#1a3a6b" fontSize="7" fontWeight="bold" fontFamily="Arial">✓</text>
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-[#64748B] mb-0.5">Approved by</div>
                    <div className="text-base font-extrabold text-[#0F172A] leading-tight">AICTE</div>
                    <div className="text-[11px] font-semibold text-[#475569] leading-snug">All India Council for<br/>Technical Education</div>
                  </div>
                </div>

                {/* Approved pill */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white text-xs font-extrabold uppercase tracking-widest shadow-lg shadow-[#2563EB]/30">
                  <FaCircleCheck className="text-sm text-green-300" />
                  AICTE Approved Internship Provider
                </div>
              </div>

              {/* Right — feature grid */}
              <div>
                <p className="text-[#475569] text-sm font-semibold leading-relaxed mb-6">
                  As an AICTE-recognized organization, Sofzenix is committed to bridging the gap between education and industry — offering students real-world exposure at absolutely zero cost.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'AICTE Approved Organization', desc: 'Officially certified to offer internship opportunities.' },
                    { label: '100% Free Internships', desc: 'No fees of any kind — completely free for all students.' },
                    { label: 'No Registration Fee', desc: 'Zero charges at any stage of the process.' },
                    { label: 'No Training Fee', desc: 'All training programs provided at no cost.' },
                    { label: 'No Certificate Fee', desc: 'Certificates issued free under all circumstances.' },
                    { label: 'Strict AICTE Compliance', desc: 'We strictly follow all AICTE guidelines and regulations.' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-gray-200/50">
                      <FaCircleCheck className="text-[#2563EB] text-sm mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-extrabold text-[#0F172A]">{item.label}</div>
                        <div className="text-[11px] font-semibold text-[#64748B] leading-snug">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-[#EEF4FF] to-[#FFF7ED] border border-[#2563EB]/10 text-sm font-semibold text-[#475569] leading-relaxed">
                  🎓 <span className="font-extrabold text-[#0F172A]">Our Commitment:</span> We are dedicated to providing quality learning experiences, real-world exposure, and career growth opportunities to students across India.
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. INFINITE LOGO MARQUEE */}
      <section className="py-12 border-b border-gray-200/10 overflow-hidden relative z-10 bg-[#FAFBFF]">
        <div className="max-w-[1400px] mx-auto px-6">
          <PartnerLogoMarquee />
        </div>
      </section>

      {/* 3. FEATURED STRATEGIC PARTNER */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-wider block mb-3">Featured Alliance</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Strategic Academic Partner</h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative p-[1px] rounded-[32px] bg-gradient-to-tr from-[#2563EB]/15 via-white/5 to-[#F97316]/15 overflow-hidden shadow-2xl"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-[31px] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-gray-200/50">
              
              {/* Left visual box */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-[#F8FAFC] border border-gray-200/40 rounded-2xl relative overflow-hidden group min-h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-center"
                >
                  <svg viewBox="0 0 200 50" className="h-16 w-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0" y="8" width="34" height="34" rx="7" fill="#2563EB"/>
                    <text x="17" y="32" textAnchor="middle" fill="white" fontSize="20" fontWeight="900" fontFamily="Arial,sans-serif">S</text>
                    <text x="44" y="34" fill="#0F172A" fontSize="18" fontWeight="700" fontFamily="Arial,sans-serif">Skill</text>
                    <text x="94" y="34" fill="#2563EB" fontSize="18" fontWeight="700" fontFamily="Arial,sans-serif">Station</text>
                  </svg>
                  <div className="mt-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">SkillStation Learning Unit</div>
                </motion.div>
              </div>

              {/* Right content box */}
              <div className="lg:col-span-7 text-left">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316] block mb-2">Sofzenix Partners + SkillStation</span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-4">Empowering the Next Generation of Engineers</h3>
                
                <p className="text-[#475569] text-sm md:text-base leading-relaxed mb-6 font-semibold">
                  Through our core training and placement alliance with **SkillStation**, we bridge the gap between academic theory and high-scale production systems. We coordinate joint lab sandboxes, MERN stack internship bootcamps, and professional software certifications. 
                </p>

                <p className="text-[#475569] text-sm md:text-base leading-relaxed mb-6 font-semibold">
                  This partnership secures a direct talent flow: qualified interns and entry-level developers trained directly on Sofzenix security and architectural guidelines, backed by guaranteed placement options and resume assessments.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6 border-t border-gray-200/10 pt-6 text-xs md:text-sm font-semibold">
                  <div className="flex items-center gap-2 text-[#475569]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    <span>Internship Certifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#475569]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    <span>Placement Support</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#475569]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    <span>Joint Tech Bootcamps</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#475569]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                    <span>Real-world Case Labs</span>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. PARTNER DIRECTORY (Categorized Sections) */}
      <section id="directory" className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        
        {/* Animated network lines and floating particles background */}
        <Particles />

        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              Our Partner Ecosystem
            </h2>
            <p className="text-[#64748B] text-xs md:text-sm font-semibold">
              Filter by operational categories to discover the organizations we work alongside.
            </p>
          </div>

          {/* Tab Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12 max-w-3xl mx-auto relative z-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all duration-300 cursor-pointer ${
                  activeTab === cat.id 
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/25' 
                    : 'bg-[#F8FAFC] border-gray-200/60 text-[#475569] hover:text-[#0F172A] hover:border-gray-200/80'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Directory Grid */}
          <motion.div 
            layout 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left"
          >
            <AnimatePresence mode="popLayout">
              {filteredPartners.map((partner) => {
                const catInfo = categories.find(c => c.id === partner.cat);
                return (
                  <motion.div
                    layout
                    key={partner.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white/80 border border-gray-200/50 rounded-2xl p-6 hover:border-[#2563EB]/35 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(37,99,235,0.06)] transition-all duration-300 flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      {/* Logo and Badge */}
                      <div className="flex flex-col gap-4 mb-4 pb-4 border-b border-gray-200/20">
                        <div className="h-[42px] md:h-[60px] w-full flex items-center justify-center p-3 bg-[#F8FAFC] border border-gray-200/60 rounded-xl relative overflow-hidden">
                          {typeof partner.logo === 'function' ? (
                            <partner.logo />
                          ) : partner.logo ? (
                            <img 
                              src={partner.logo} 
                              loading="lazy"
                              decoding="async"
                              onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; }}
                              alt={`${partner.name} logo`} 
                              className="h-full w-auto object-contain max-w-full select-none"
                            />
                          ) : (
                            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-[#2563EB] text-center px-1 truncate">
                              {partner.name}
                            </span>
                          )}
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-[#F8FAFC] border border-gray-200/40 px-2 py-0.5 rounded text-[#64748B] w-fit">
                          {catInfo ? catInfo.name : 'Partner'}
                        </span>
                      </div>

                      {/* Info */}
                      <h3 className="text-sm md:text-base font-extrabold text-[#0F172A] mb-2">{partner.name}</h3>
                      <p className="text-[#475569] text-xs font-semibold leading-relaxed mb-6">
                        {partner.desc}
                      </p>
                    </div>

                    {/* Action link */}
                    {partner.url && partner.url !== '#' ? (
                      <a 
                        href={partner.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-bold text-[#2563EB] hover:text-[#F97316] transition-colors flex items-center gap-1.5 w-fit"
                      >
                        <span>Visit Website</span>
                        <FaArrowUpRightFromSquare className="text-[10px]" />
                      </a>
                    ) : (
                      <div className="h-4" />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* 5. WHY OUR PARTNERSHIPS MATTER */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto text-center">
          
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              Why Our Partnerships Matter
            </h2>
            <p className="text-[#64748B] text-xs md:text-sm font-semibold">
              Delivering secure, optimized software architectures with a focus on code velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {whyChoosePartners.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="bg-white/80 border border-gray-200/40 rounded-[24px] p-6 hover:border-gray-200/80 transition-all shadow-sm"
                >
                  <div className="p-3 rounded-xl bg-[#2563EB]/10 text-[#2563EB] w-fit mb-4">
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] mb-2 tracking-wide">{item.title}</h3>
                  <p className="text-[#475569] text-xs font-semibold leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. BECOME A PARTNER CTA */}
      <section id="contact-partners" className="py-24 px-6 md:px-8 relative z-10 overflow-hidden">
        <div className="max-w-[1000px] mx-auto bg-gradient-to-r from-[#2563EB]/10 via-white to-[#F97316]/10 border border-gray-200/50 p-12 md:p-16 rounded-[28px] text-center relative overflow-hidden shadow-2xl">
          
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-6">
            Become a Sofzenix Partner
          </h2>
          
          <p className="text-[#475569] text-sm md:text-base font-semibold leading-relaxed mb-8 max-w-2xl mx-auto">
            Collaborate with our engineering team to construct robust software, structural placements, and secure payment integrations.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <a 
              href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm"
              target="_blank"
              rel="noreferrer"
              className="btn-glow-primary px-8 py-3.5 rounded-full text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer"
            >
              Partner With Us
            </a>
            <Link 
              to="/contact" 
              className="btn-glow-secondary px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Contact Team</span>
              <FaArrowRight className="text-xs text-[#2563EB] group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Partners;
