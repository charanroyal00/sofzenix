import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaGlobe, 
  FaMobileAlt, 
  FaDatabase, 
  FaShieldAlt 
} from 'react-icons/fa';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

// Pure CSS Device Mockup
const LaptopMockup = ({ screenshot, title }) => (
  <div className="relative w-full max-w-[480px] mx-auto select-none" style={{ perspective: '1000px' }}>
    {/* Screen Outer Frame */}
    <div className="bg-[#1f2937] border-[10px] border-[#111827] rounded-t-2xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] overflow-hidden aspect-[16/10] flex flex-col relative">
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/80 z-20" /> {/* Camera */}
      {/* Screen Display */}
      <div className="w-full h-full bg-[#F8FAFC] relative flex items-center justify-center p-2">
        {screenshot ? (
          <img src={screenshot} alt={title} className="w-full h-full object-cover rounded" />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#2563EB] mb-2">{title}</span>
            <span className="text-[9px] text-[#64748B] font-bold uppercase tracking-wider">Enterprise Console // Active</span>
          </div>
        )}
      </div>
    </div>
    {/* Base Plate */}
    <div className="w-[108%] h-3 bg-[#374151] rounded-b-xl border-t border-white/10 -ml-[4%] relative shadow-[0_6px_10px_rgba(0,0,0,0.04)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-[#111827] rounded-b" /> {/* Notch */}
    </div>
  </div>
);

const getTagStyle = (tag) => {
  const brandColors = [
    'bg-[#2563EB]/5 text-[#2563EB] border-[#2563EB]/15',
    'bg-[#F97316]/5 text-[#F97316] border-[#F97316]/15',
    'bg-[#3B82F6]/5 text-[#3B82F6] border-[#3B82F6]/15'
  ];
  const hash = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return brandColors[hash % brandColors.length];
};

const projects = [
  {
    title: 'Hotel Desk Web Application',
    category: 'Hospitality',
    year: 2025,
    description: 'A modern hotel management platform that streamlines room booking, customer management, reservations, billing, and staff operations through a responsive web dashboard.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    screenshot: '/project_hotel.png',
    primaryBtnText: 'Live Demo',
    primaryBtnLink: '/portfolio'
  },
  {
    title: 'Swaldo Mobile Application',
    category: 'Mobile Application',
    year: 2025,
    description: 'A secure digital wallet and payment application enabling fast transactions, QR payments, account management, and financial tracking with an intuitive mobile experience.',
    tech: ['Flutter', 'Firebase', 'Node.js', 'MongoDB', 'REST API'],
    screenshot: '/project_swadzo.png',
    primaryBtnText: 'Case Study',
    primaryBtnLink: '/portfolio'
  },
  {
    title: 'Analytics Dashboard',
    category: 'Business Intelligence',
    year: 2025,
    description: 'A real-time analytics dashboard providing interactive charts, KPI monitoring, sales reports, user analytics, and business insights for enterprise decision making.',
    tech: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Express.js'],
    screenshot: '/project_analytics.png',
    primaryBtnText: 'Live Dashboard',
    primaryBtnLink: '/portfolio'
  },
  {
    title: 'Accounting Pro Suite',
    category: 'Finance',
    year: 2025,
    description: 'An enterprise accounting platform designed for invoicing, expense management, taxation, financial reporting, payroll, and business accounting workflows.',
    tech: ['React', 'Java', 'Spring Boot', 'MySQL', 'REST API'],
    screenshot: '/project_accounting.png',
    primaryBtnText: 'Case Study',
    primaryBtnLink: '/portfolio'
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.98 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const ProjectCard = ({ proj }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -10,
        boxShadow: '0 20px 40px rgba(37, 99, 235, 0.12), 0 0 25px rgba(37, 99, 235, 0.06)'
      }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative premium-card bg-white border border-gray-200/50 rounded-[20px] flex flex-col justify-between h-full overflow-hidden cursor-default transition-shadow duration-300 p-4"
    >
      <div>
        {/* Mockup Frame inside Card */}
        <div className="mb-4 bg-[#F8FAFC] border border-gray-200/40 rounded-xl p-3 overflow-hidden flex items-center justify-center">
          <LaptopMockup title={proj.title} screenshot={proj.screenshot} />
        </div>

        <div className="flex items-center justify-between mb-2 text-[9px] font-bold uppercase tracking-wider text-[#F97316]">
          <span>{proj.category}</span>
          <span>{proj.year}</span>
        </div>

        <h3 className="text-[13px] font-extrabold text-[#0F172A] mb-1 group-hover:text-[#2563EB] transition-colors leading-tight">
          {proj.title}
        </h3>
        <p className="text-gray-500 text-[10px] font-medium leading-relaxed mb-4 line-clamp-3">
          {proj.description}
        </p>

        {/* Color Tech Badges */}
        <div className="flex flex-wrap gap-1 pt-1 mb-4">
          {proj.tech.map((tag) => (
            <span 
              key={tag}
              className={`px-2 py-0.5 rounded-full text-[8px] font-bold tracking-tight border border-transparent shadow-sm hover:scale-105 hover:shadow-md transition-all select-none ${getTagStyle(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Actions Bottom Area */}
      <div className="flex items-center gap-2 pt-3 border-t border-gray-100 mt-auto w-full">
        <Link 
          to="/portfolio"
          className="premium-secondary-btn px-3 py-1.5 text-[10px] font-bold cursor-pointer w-full text-center transition-all duration-300"
        >
          View Details
        </Link>
        <Link 
          to={proj.primaryBtnLink}
          className="premium-primary-btn px-3 py-1.5 text-[10px] font-bold cursor-pointer w-full text-center flex items-center justify-center gap-1 transition-all duration-300"
        >
          <span>{proj.primaryBtnText}</span>
          <FaArrowUpRightFromSquare className="text-[9px]" />
        </Link>
      </div>
    </motion.div>
  );
};

const PortfolioPreview = () => {
  return (
    <section id="portfolio-preview" className="w-full bg-[#FFFFFF] py-24 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/10">
      
      {/* Background ambient lighting decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#2563EB]/4 rounded-full blur-[130px] pointer-events-none z-0" />
      <div className="absolute top-[10%] right-[5%] w-1.5 h-1.5 rounded-full bg-[#2563EB]/40 animate-ping pointer-events-none" />
      <div className="absolute bottom-[20%] left-[8%] w-1.5 h-1.5 rounded-full bg-[#FF8A00]/40 animate-pulse pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 max-w-3xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-xs font-bold uppercase tracking-widest text-[#FF8A00] mb-4 select-none"
          >
            Our Work
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4 relative pb-2"
          >
            Selected Work
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[3px] bg-gradient-to-r from-[#2563EB] to-[#FF8A00] rounded-full" />
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base font-semibold leading-relaxed"
          >
            A snapshot of enterprise platforms, hospitality dashboard applications, financial technologies, and real-time business intelligence engines we've delivered with structural craftsmanship and measurable impact.
          </motion.p>
        </div>

        {/* Portfolio 4-Column Grid — all four projects in one row */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full"
        >
          {projects.map((proj) => (
            <ProjectCard key={proj.title} proj={proj} />
          ))}
        </motion.div>

        {/* Section CTAs */}
        <div className="flex items-center justify-center gap-4 mt-16">
          <Link 
            to="/portfolio" 
            className="premium-primary-btn px-8 py-3.5 rounded-full text-xs font-black uppercase tracking-widest text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Full Portfolio</span>
            <FaArrowRight className="text-[10px] text-white" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default PortfolioPreview;
