import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCheckCircle, FaStar, FaGlobe, FaMobileAlt, FaDatabase, FaShieldAlt } from 'react-icons/fa';

// Import project screenshots — served from /public for reliable loading
const imgHotel      = '/project_hotel.png';
const imgSwadzo     = '/project_swadzo.png';
const imgAnalytics  = '/project_analytics.png';
const imgAccounting = '/project_accounting.png';

const projects = [
  {
    title: 'Hotel Desk Web App',
    status: 'Live',
    description: 'Enterprise hotel management platform with reservation automation, billing, room management, analytics, and guest-relation pipelines.',
    tech: ['React.js', 'Node.js', 'Tailwind'],
    image: imgHotel,
    client: 'Enterprise',
    industry: 'Hospitality',
    platform: 'Web Application',
    metrics: '50K+ Users • 99.9% Uptime',
    metricsIcon: FaGlobe
  },
  {
    title: 'Swadzo Mobile App',
    status: 'Featured',
    description: 'Secure mobile banking platform providing instant peer-to-peer payments, biometric authentication, and automated KYC verification flows.',
    tech: ['Flutter', 'Payments', 'Security'],
    image: imgSwadzo,
    client: 'Fintech',
    industry: 'Finance',
    platform: 'iOS / Android',
    metrics: '1M+ Transactions • Bank-Grade',
    metricsIcon: FaMobileAlt
  },
  {
    title: 'Analytics Dashboard',
    status: 'Production',
    description: 'Real-time business intelligence console providing customized KPIs, dynamic reporting, anomaly alerts, and executive insights.',
    tech: ['Next.js', 'D3', 'Multi-Tenant'],
    image: imgAnalytics,
    client: 'SaaS Corp',
    industry: 'Data Science',
    platform: 'Cloud Console',
    metrics: 'Sub-second API • 10M+ Points',
    metricsIcon: FaDatabase
  },
  {
    title: 'Accounting Pro Suite',
    status: 'Completed',
    description: 'Cloud accounting suite featuring automated ledgers, instant invoicing, multi-bank reconciliation, and tax compliance reporting.',
    tech: ['React', 'Node.js', 'Finance'],
    image: imgAccounting,
    client: 'SMB Partner',
    industry: 'Finance / ERP',
    platform: 'Web Portal',
    metrics: '100% Secure • Audit-Ready',
    metricsIcon: FaShieldAlt
  }
];

const TechBadgeStyles = {
  'React.js': { bg: 'bg-[#E6F4FF]', text: 'text-[#2563EB]' },
  'React': { bg: 'bg-[#E6F4FF]', text: 'text-[#2563EB]' },
  'Node.js': { bg: 'bg-[#F0FDF4]', text: 'text-[#16A34A]' },
  'Tailwind': { bg: 'bg-[#F0FDFA]', text: 'text-[#0D9488]' },
  'Flutter': { bg: 'bg-[#F0F9FF]', text: 'text-[#0284C7]' },
  'Payments': { bg: 'bg-[#F5F3FF]', text: 'text-[#7C3AED]' },
  'Security': { bg: 'bg-[#FEF2F2]', text: 'text-[#DC2626]' },
  'Next.js': { bg: 'bg-[#F8FAFC]', text: 'text-[#0F172A]' },
  'D3': { bg: 'bg-[#FFF1F2]', text: 'text-[#E11D48]' },
  'Multi-Tenant': { bg: 'bg-[#FAF5FF]', text: 'text-[#9333EA]' },
  'Finance': { bg: 'bg-[#ECFDF5]', text: 'text-[#059669]' }
};

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
  const [isHovered, setIsHovered] = useState(false);
  const MetricIcon = proj.metricsIcon;

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative premium-card bg-white border border-gray-200/50 rounded-[24px] flex flex-col justify-between h-full overflow-hidden cursor-default"
    >
      <div className="w-full">
        {/* Project Screenshot area */}
        <div className="w-full aspect-[4/3] overflow-hidden bg-gray-50 relative border-b border-gray-100">
          <img 
            src={proj.image} 
            alt={proj.title} 
            className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500 [image-rendering:-webkit-optimize-contrast]"
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent pointer-events-none" />

          {/* Status Badge */}
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest text-[#2563EB] bg-white/90 border border-[#2563EB]/15 shadow-sm backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            {proj.status}
          </span>
        </div>

        {/* Card Content Area */}
        <div className="p-6 flex flex-col gap-4 text-left">
          
          {/* Client & Industry Metadata Pills Row */}
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-[8px] font-bold text-gray-500 uppercase tracking-wider">
              {proj.client}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-[8px] font-bold text-gray-500 uppercase tracking-wider">
              {proj.industry}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-[#2563EB]/5 text-[8px] font-bold text-[#2563EB] uppercase tracking-wider">
              {proj.platform}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-base font-extrabold text-[#0F172A] mb-1.5 group-hover:text-[#2563EB] transition-colors leading-tight">
              {proj.title}
            </h3>
            <p className="text-gray-500 text-[11px] font-medium leading-relaxed min-h-[52px]">
              {proj.description}
            </p>
          </div>

          {/* Color Tech Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {proj.tech.map((tag) => {
              const style = TechBadgeStyles[tag] || { bg: 'bg-gray-100', text: 'text-gray-500' };
              return (
                <span 
                  key={tag}
                  className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-tight border border-transparent shadow-sm hover:scale-105 hover:shadow-md transition-all select-none ${style.bg} ${style.text}`}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          {/* Metrics row */}
          <div className="flex items-center gap-1.5 border-t border-gray-100 pt-3 mt-1 text-gray-400">
            <MetricIcon className="text-[10px] text-[#FF8A00]" />
            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
              {proj.metrics}
            </span>
          </div>

        </div>
      </div>

      {/* Card Actions Bottom Area */}
      <div className="p-6 pt-0 mt-auto w-full">
        <Link 
          to="/portfolio"
          className="w-full pt-3 border-t border-gray-100 flex items-center justify-between overflow-hidden select-none cursor-pointer"
        >
          <span className="text-[10px] font-extrabold text-[#2563EB] uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
            View Details
          </span>
          <motion.span 
            animate={{ x: isHovered ? 4 : 0 }} 
            className="text-[#2563EB] flex items-center"
          >
            <FaArrowRight className="text-[9px]" />
          </motion.span>
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
            A snapshot of enterprise platforms, cloud products, and growth initiatives we've delivered with structural craftsmanship and measurable impact.
          </motion.p>
        </div>

        {/* Portfolio Staggered 4-Column Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
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
