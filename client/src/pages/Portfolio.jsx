import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaGithub, 
  FaRegClock, 
  FaUsers, 
  FaChevronDown, 
  FaXmark, 
  FaCircleCheck, 
  FaBuilding, 
  FaBriefcase, 
  FaGraduationCap, 
  FaServer, 
  FaGear, 
  FaLaptopCode, 
  FaLock, 
  FaUserShield,
  FaArrowUpRightFromSquare,
  FaLightbulb,
  FaAws
} from 'react-icons/fa6';
import { 
  SiReact, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiSpringboot, 
  SiDocker, 
  SiFirebase, 
  SiPostgresql, 
  SiFigma 
} from 'react-icons/si';
import Testimonials from '../components/Testimonials';

// Parallax/Aurora background overlay
const BackgroundDecorations = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
    <div className="absolute top-[10%] left-1/4 w-[450px] h-[450px] bg-[#2563EB]/3 rounded-full blur-[130px] animate-pulse-slow" />
    <div className="absolute bottom-[20%] right-10 w-[500px] h-[500px] bg-[#F97316]/2 rounded-full blur-[150px] animate-pulse-slower" />
  </div>
);

// Pure CSS Device Mockups
const LaptopMockup = ({ screenshot, title }) => (
  <div className="relative w-full max-w-[480px] mx-auto select-none" style={{ perspective: '1000px' }}>
    {/* Screen Outer Frame */}
    <div className="bg-[#1f2937] border-[10px] border-[#111827] rounded-t-2xl shadow-[0_15px_35px_rgba(0,0,0,0.06)] overflow-hidden aspect-[16/10] flex flex-col relative">
      <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-black/80 z-20" /> {/* Camera */}
      {/* Screen Display */}
      <div className="w-full h-full bg-[#F8FAFC] relative flex items-center justify-center p-1">
        {screenshot ? (
          <img src={screenshot} alt={title} className="w-full h-full object-cover rounded-[6px]" />
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

const PhoneMockup = ({ screenshot, title }) => (
  <div className="relative w-full max-w-[190px] mx-auto select-none">
    <div className="bg-[#111827] rounded-[36px] p-2.5 shadow-[0_20px_45px_rgba(0,0,0,0.12)] border-[3px] border-gray-800 aspect-[9/19] flex flex-col relative overflow-hidden">
      {/* Notch */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3 bg-black rounded-full z-20 flex items-center justify-center">
        <span className="w-1 h-1 rounded-full bg-gray-900" />
      </div>
      {/* Screen Display */}
      <div className="w-full h-full bg-white rounded-[26px] overflow-hidden relative border border-black/5">
        <img src={screenshot} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
);

const DesktopMonitorMockup = ({ screenshot, title }) => (
  <div className="relative w-full max-w-[480px] mx-auto select-none flex flex-col items-center">
    {/* Screen Frame */}
    <div className="bg-[#111827] p-2 rounded-t-2xl border border-gray-800 shadow-[0_20px_45px_rgba(0,0,0,0.08)] w-full aspect-[16/10] overflow-hidden relative">
      <div className="w-full h-full bg-white rounded-lg overflow-hidden relative">
        <img src={screenshot} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
    {/* Monitor Stand */}
    <div className="w-16 h-8 bg-[#374151] border-l border-r border-gray-700 shadow-sm" />
    <div className="w-36 h-2 bg-[#1f2937] rounded-full shadow-md" />
  </div>
);

const BrowserMockup = ({ screenshot, title }) => (
  <div className="relative w-full max-w-[480px] mx-auto select-none bg-[#111827] rounded-2xl border border-gray-800 shadow-[0_20px_45px_rgba(0,0,0,0.08)] overflow-hidden aspect-[16/10] flex flex-col">
    {/* Window Controls Header */}
    <div className="h-7 px-3 bg-gray-950 border-b border-gray-800 flex items-center gap-1.5 shrink-0">
      <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444] opacity-80" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] opacity-80" />
      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] opacity-80" />
      <div className="h-4.5 w-44 bg-gray-900 text-[8px] text-gray-500 flex items-center justify-center font-bold truncate px-2 ml-4 rounded border border-gray-800">
        https://sofzenix.com/portal
      </div>
    </div>
    {/* Display Screen */}
    <div className="w-full h-full bg-white overflow-hidden relative">
      <img src={screenshot} alt={title} className="w-full h-full object-cover" />
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

const renderProjectMockup = (project) => {
  switch (project.id) {
    case 1:
      return <DesktopMonitorMockup screenshot={project.screenshot} title={project.title} />;
    case 2:
      return <PhoneMockup screenshot={project.screenshot} title={project.title} />;
    case 3:
      return <LaptopMockup screenshot={project.screenshot} title={project.title} />;
    case 4:
      return <BrowserMockup screenshot={project.screenshot} title={project.title} />;
    default:
      return <LaptopMockup screenshot={project.screenshot} title={project.title} />;
  }
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'hospitality', name: 'Hospitality' },
    { id: 'mobile', name: 'Mobile Application' },
    { id: 'bi', name: 'Business Intelligence' },
    { id: 'finance', name: 'Finance' }
  ];

  const projectsData = [
    {
      id: 1,
      title: 'Hotel Desk Web Application',
      category: ['hospitality'],
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
      industry: 'Hospitality',
      description: 'A modern hotel management platform that streamlines room booking, customer management, reservations, billing, and staff operations through a responsive web dashboard.',
      clientType: 'Boutique Hotel Chain',
      year: 2025,
      screenshot: '/project_hotel.png',
      challenge: 'The client struggled with manual spreadsheet bookings, leading to overbooking errors and inefficient billing processes.',
      solution: 'Developed a centralized room booking system with automated email confirmations, integrated Stripe billing, and a dynamic staff dashboard.',
      features: ['Real-time room status', 'Automated billing', 'Guest profiles', 'Analytics dashboard'],
      timeline: '4 Months',
      teamSize: 4,
      benefits: ['95% reduction in booking errors', '40% faster guest check-in', '100% automated invoicing'],
      primaryBtnText: 'Live Demo',
      primaryBtnLink: '#contact-footer'
    },
    {
      id: 2,
      title: 'Swaldo Mobile Application',
      category: ['mobile'],
      tags: ['Flutter', 'Firebase', 'Node.js', 'MongoDB', 'REST API'],
      industry: 'Mobile Application',
      description: 'A secure digital wallet and payment application enabling fast transactions, QR payments, account management, and financial tracking with an intuitive mobile experience.',
      clientType: 'Fintech Startup',
      year: 2025,
      screenshot: '/project_swadzo.png',
      challenge: 'Existing local payment systems lacked user-friendly mobile interfaces, resulting in high transaction drop-off rates.',
      solution: 'Built a high-performance Flutter mobile application with bank-grade encryption, instant QR scanning, and push notifications.',
      features: ['Secure QR payments', 'Biometric login', 'Real-time transaction history', 'Expense analytics'],
      timeline: '6 Months',
      teamSize: 5,
      benefits: ['Over 100k active users in first month', '99.99% transaction success rate', 'Slashed payment latency to sub-seconds'],
      primaryBtnText: 'Case Study',
      primaryBtnLink: '#contact-footer'
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      category: ['bi'],
      tags: ['React', 'Node.js', 'MongoDB', 'Chart.js', 'Express.js'],
      industry: 'Business Intelligence',
      description: 'A real-time analytics dashboard providing interactive charts, KPI monitoring, sales reports, user analytics, and business insights for enterprise decision making.',
      clientType: 'Enterprise SaaS Provider',
      year: 2025,
      screenshot: '/project_analytics.png',
      challenge: 'Executives were unable to get consolidated business analytics in real time, causing delays in strategic decision-making.',
      solution: 'Constructed a real-time data sync pipeline rendering key sales and user growth metrics via beautiful charts.',
      features: ['Interactive charts', 'KPI monitoring', 'Automated weekly reports', 'Role-based access control'],
      timeline: '5 Months',
      teamSize: 3,
      benefits: ['Slashed report generation time by 90%', '25% increase in operational efficiency', 'Real-time tracking of 50+ critical metrics'],
      primaryBtnText: 'Live Dashboard',
      primaryBtnLink: '#contact-footer'
    },
    {
      id: 4,
      title: 'Accounting Pro Suite',
      category: ['finance'],
      tags: ['React', 'Java', 'Spring Boot', 'MySQL', 'REST API'],
      industry: 'Finance',
      description: 'An enterprise accounting platform designed for invoicing, expense management, taxation, financial reporting, payroll, and business accounting workflows.',
      clientType: 'Global Logistics Firm',
      year: 2025,
      screenshot: '/project_accounting.png',
      challenge: 'Multi-currency billing and compliance reporting was manual and prone to errors.',
      solution: 'Developed an enterprise-grade web application featuring automated tax calculation, multi-currency ledger management, and automated payroll processes.',
      features: ['Multi-currency ledger', 'Automated tax calculation', 'Payroll automation', 'Comprehensive financial reports'],
      timeline: '8 Months',
      teamSize: 6,
      benefits: ['Saved $120k annually in accounting overhead', 'Zero compliance reporting delays', 'Fully audit-ready system'],
      primaryBtnText: 'Case Study',
      primaryBtnLink: '#contact-footer'
    }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category.includes(activeFilter));

  const processes = [
    { title: 'Requirement Analysis', desc: 'Understanding product scopes, user flows, and detailing engineering backlogs.' },
    { title: 'Planning', desc: 'Building sprint plans, setting milestones, and organizing system database schemas.' },
    { title: 'UI/UX Design', desc: 'Drafting high-fidelity, user-centered wireframes and design systems.' },
    { title: 'Development', desc: 'Writing clean, test-driven React/Spring Boot code on modular architectures.' },
    { title: 'Testing', desc: 'Running unit tests, integration test scripts, and security scanning.' },
    { title: 'Deployment', desc: 'Launching automated CI/CD pipelines to secure cloud instances.' },
    { title: 'Maintenance', desc: 'SLA monitoring, system updates, and database indexing support.' }
  ];

  const faqs = [
    { q: 'How long does development take?', a: 'Development timelines vary by scope: small MVPs typically take 2–4 months, whereas complex enterprise dashboards or custom ERP software require 6–10 months of iterative sprints.' },
    { q: 'Do you provide maintenance?', a: 'Yes, Sofzenix offers post-deployment SLA support, server uptime monitoring, and active package updates to keep your product secure and optimized.' },
    { q: 'Can you redesign existing software?', a: 'Yes. We analyze legacy systems, refactor heavy logic, map API endpoints, and design custom responsive front-ends utilizing modern frameworks.' },
    { q: 'Do you work internationally?', a: 'Absolutely. We manage remote teams and sync schedules to serve clients across the US, Europe, Middle East, and Asia.' },
    { q: 'Which technologies do you use?', a: 'We specialize in Java, Spring Boot, React, Node.js, Express, MongoDB, PostgreSQL, AWS, Docker, React Native, and custom AI/automation tools.' },
    { q: 'Is source code provided?', a: 'Yes. All intellectual property, code repositories, design Figma assets, and deployment keys are transferred to the client upon milestone completions.' }
  ];

  const industries = [
    { title: 'Healthcare', desc: 'Engineering secure HIPAA-compliant records, client portals, and clinic workflow software.' },
    { title: 'Education', desc: 'LMS platforms, virtual coding rooms, sandbox sandboxes, and student database management.' },
    { title: 'Finance', desc: 'Risk evaluation portals, predictive AI, secure Ledgers, and ledger integrations.' },
    { title: 'E-Commerce', desc: 'High-speed web catalogs, background sync mobile apps, checkout streams.' },
    { title: 'Manufacturing', desc: 'Supply tracking ERP systems, stock monitoring dashboards, factory controllers.' },
    { title: 'Real Estate', desc: 'Virtual property dashboards, secure billing platforms, leasing management.' },
    { title: 'Logistics', desc: 'Fleet telemetry routing, dispatch management portals, sensor data caches.' },
    { title: 'Government', desc: 'Municipal grid telemetry, public data access APIs, city service platforms.' }
  ];

  const technologies = [
    { name: 'React', icon: SiReact, desc: 'Responsive web applications.', color: 'hover:text-[#61DAFB] hover:border-[#61DAFB]/30' },
    { name: 'Node.js', icon: SiNodedotjs, desc: 'Highly concurrent async backends.', color: 'hover:text-[#339933] hover:border-[#339933]/30' },
    { name: 'Express', icon: SiExpress, desc: 'Lightweight REST API routers.', color: 'hover:text-[#0F172A] hover:border-gray-200/20' },
    { name: 'MongoDB', icon: SiMongodb, desc: 'Flexible, high-scale database systems.', color: 'hover:text-[#47A248] hover:border-[#47A248]/30' },
    { name: 'Java', icon: FaLaptopCode, desc: 'Type-safe enterprise logic structures.', color: 'hover:text-[#5382A1] hover:border-[#5382A1]/30' },
    { name: 'Spring Boot', icon: SiSpringboot, desc: 'Robust microservice configurations.', color: 'hover:text-[#6DB33F] hover:border-[#6DB33F]/30' },
    { name: 'AWS', icon: FaAws, desc: 'Elastic cloud computing and servers.', color: 'hover:text-[#FF9900] hover:border-[#FF9900]/30' },
    { name: 'Docker', icon: SiDocker, desc: 'Consistent container packaging.', color: 'hover:text-[#2496ED] hover:border-[#2496ED]/30' },
    { name: 'Firebase', icon: SiFirebase, desc: 'Rapid database storage & functions.', color: 'hover:text-[#FFCA28] hover:border-[#FFCA28]/30' },
    { name: 'SQL DBs', icon: SiPostgresql, desc: 'Structured write-heavy data warehouses.', color: 'hover:text-[#4169E1] hover:border-[#4169E1]/30' },
    { name: 'Figma', icon: SiFigma, desc: 'Enterprise layout design systems.', color: 'hover:text-[#F24E1E] hover:border-[#F24E1E]/30' },
    { name: 'GitHub', icon: FaGithub, desc: 'Secure CI/CD code orchestration.', color: 'hover:text-[#0F172A] hover:border-gray-200/20' }
  ];

  const testimonials = [
    { name: 'K. Patel', company: 'Grande Hotel Group', review: 'The Hotel Desk Web App has automated our room booking and billing. Guest check-ins are much faster and booking errors have been eliminated.', rating: 5 },
    { name: 'J. Patterson', company: 'Swaldo Pay', review: 'Swaldo Mobile App transaction times are incredibly fast and users love the biometric security feature. Excellent security standard.', rating: 5 },
    { name: 'S. K. Mehta', company: 'SaaS Corp', review: 'The Analytics Dashboard integrated all our KPIs seamlessly. Slashed weekly report generation time by 90%. Exceptional work!', rating: 5 },
    { name: 'T. Wagner', company: 'Globex Logistics', review: 'Accounting Pro Suite automated our multi-currency ledgers. We saved over $120k in operational overhead in less than a year.', rating: 5 }
  ];



  const whyChooseUs = [
    { title: 'Experienced Engineers', icon: FaLaptopCode, desc: 'A senior-focused development team versed in large scale deployments.' },
    { title: 'Enterprise Architecture', icon: FaServer, desc: 'Highly structured topologies built for data integrity and load scaling.' },
    { title: 'Scalable Solutions', icon: FaGear, desc: 'Modular microservices frameworks prepared for continuous updates.' },
    { title: 'Secure Development', icon: FaLock, desc: 'HIPAA and ISO aligned coding checkpoints guaranteeing database protection.' },
    { title: 'Modern Technology Stack', icon: SiReact, desc: 'Deploying robust systems using Java, Spring Boot, and MERN stacks.' },
    { title: 'Cloud Ready', icon: FaAws, desc: 'Containerized configurations prepared for instant AWS scale.' },
    { title: '24/7 Support', icon: FaUserShield, desc: 'Active server monitoring and post-launch SLA maintenance.' },
    { title: 'On-Time Delivery', icon: FaCircleCheck, desc: 'Rigid sprint milestones and clear communication cycles.' }
  ];

  return (
    <div className="bg-transparent min-h-screen text-[#475569] relative overflow-hidden select-none">
      <BackgroundDecorations />

      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center pt-24 pb-8 px-6 md:px-8">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="lg:col-span-6 text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#F97316] mb-6">
              🚀 Our Portfolio
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-[50px] font-extrabold tracking-tight text-[#0F172A] mb-6 leading-[1.25]">
              Building Digital Solutions That <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#3B82F6]">
                Deliver Real Business Results
              </span>
            </h1>
            <p className="text-[#475569] text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-semibold">
              Explore Sofzenix IT Solutions LLP's portfolio of custom software development, enterprise applications, AI solutions, cloud infrastructure, and modern web applications developed for startups, businesses, and organizations.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a href="#projects-section" className="btn-glow-primary px-8 py-3.5 rounded-full text-sm font-bold text-white flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                Explore Projects
              </a>
              <Link to="/contact" className="btn-glow-secondary px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
                <span>Book Free Consultation</span>
                <FaArrowRight className="text-xs text-[#2563EB] group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Right Side: Multi-device Overlapping Premium Showcase */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] md:min-h-[500px]"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-gradient-to-tr from-[#2563EB]/15 to-[#F97316]/10 rounded-full blur-[80px] pointer-events-none z-0" />
            
            {/* Project 1: Desktop Monitor (Hotel Desk) - Back Layer left */}
            <div className="absolute left-0 top-12 z-10 w-[240px] md:w-[320px] opacity-75 hover:opacity-100 hover:z-30 transition-all duration-300 transform -rotate-2 select-none">
              <DesktopMonitorMockup screenshot="/project_hotel.png" title="Hotel Desk Dashboard" />
            </div>

            {/* Project 3: Laptop (Analytics) - Center Layer main */}
            <div className="absolute left-[15%] md:left-[20%] top-24 z-20 w-[260px] md:w-[360px] shadow-2xl hover:scale-105 transition-transform duration-300 select-none">
              <LaptopMockup screenshot="/project_analytics.png" title="Analytics Dashboard" />
            </div>

            {/* Project 2: Phone (Swaldo Mobile) - Front Layer right */}
            <div className="absolute right-[-10px] md:right-4 top-16 z-30 w-[100px] md:w-[130px] shadow-xl hover:scale-110 transition-transform duration-300 select-none">
              <PhoneMockup screenshot="/project_swadzo.png" title="Swaldo Mobile App" />
            </div>

            {/* Floating Glassmorphism Metric Card 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-4 left-1/4 z-40 bg-white/80 backdrop-blur-md border border-gray-200/50 p-2.5 rounded-xl shadow-lg flex items-center gap-2 select-none"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
              <div className="flex flex-col text-[8px] md:text-[9px] font-bold text-left">
                <span className="text-gray-400 uppercase tracking-widest">System Status</span>
                <span className="text-[#0F172A]">99.99% Uptime Scale</span>
              </div>
            </motion.div>

            {/* Floating Glassmorphism Metric Card 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="absolute bottom-8 right-1/4 z-40 bg-white/80 backdrop-blur-md border border-gray-200/50 p-2.5 rounded-xl shadow-lg flex items-center gap-2 select-none"
            >
              <span className="text-[12px] text-[#F97316]">🚀</span>
              <div className="flex flex-col text-[8px] md:text-[9px] font-bold text-left">
                <span className="text-gray-400 uppercase tracking-widest">Performance</span>
                <span className="text-[#0F172A]">Sub-second latency API</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. PROJECT FILTERS */}
      <section id="projects-section" className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Case Studies & Projects</h2>
            <p className="text-gray-500 text-xs md:text-sm font-semibold">
              Filter by operational categories to discover the systems we have deployed.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-16 max-w-4xl mx-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold border transition-all duration-300 cursor-pointer ${
                  activeFilter === filter.id 
                    ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md shadow-[#2563EB]/25' 
                    : 'bg-[#F8FAFC] border-gray-200/60 text-[#475569] hover:text-[#0F172A] hover:border-gray-200/80'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>

          {/* 4. FEATURED PROJECTS GRID */}
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: '0 20px 40px rgba(37, 99, 235, 0.12), 0 0 25px rgba(37, 99, 235, 0.06)'
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="premium-card bg-white border border-gray-200/50 hover:border-[#2563EB]/40 rounded-[24px] p-6 flex flex-col justify-between h-full transition-all duration-300 relative overflow-hidden group"
                >
                  <div>
                    {/* Mockup Frame inside Card */}
                    <div className="mb-6 bg-[#F8FAFC] border border-gray-200/40 rounded-xl p-4 overflow-hidden flex items-center justify-center h-[220px] transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#2563EB]/5 group-hover:to-[#F97316]/5">
                      <div className="w-full h-full flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        {renderProjectMockup(project)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3 text-[10px] font-bold uppercase tracking-wider text-[#F97316]">
                      <span>{project.industry}</span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="text-lg font-extrabold text-[#0F172A] mb-3 transition-colors duration-350 group-hover:text-[#2563EB]">{project.title}</h3>
                    <p className="text-[#475569] text-xs font-semibold leading-relaxed mb-6 line-clamp-3">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className={`px-2 py-0.5 rounded border text-[9px] font-bold transition-all duration-300 hover:scale-110 hover:shadow-sm ${getTagStyle(tag)}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200/10">
                    <button 
                      onClick={() => setSelectedProject(project)}
                      className="premium-secondary-btn px-4 py-2 text-xs font-bold cursor-pointer w-full text-center transition-all duration-300"
                    >
                      View Details
                    </button>
                    <a 
                      href={project.primaryBtnLink} 
                      className="premium-primary-btn px-4 py-2 text-xs font-bold cursor-pointer w-full text-center flex items-center justify-center gap-1.5 transition-all duration-300"
                    >
                      <span>{project.primaryBtnText}</span>
                      <FaArrowUpRightFromSquare className="text-[10px]" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 5. PORTFOLIO SHOWCASE (Interactive Mockups Layout) */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto text-left">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest block mb-3">Enterprise Showcase</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">High-Fidelity Product Console</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Devices layout */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center p-8 bg-[#F8FAFC] border border-gray-200/50 rounded-3xl h-[420px] overflow-hidden shadow-sm">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/5 to-transparent pointer-events-none" />
              <LaptopMockup title="Accounting Pro Suite" screenshot="/project_accounting.png" />
              {/* Overlapping mobile mockup */}
              <div className="absolute bottom-4 right-8 w-[100px] z-20">
                <PhoneMockup title="Swaldo Mobile App" screenshot="/project_swadzo.png" />
              </div>
            </div>

            {/* Overview Detail */}
            <div className="lg:col-span-6">
              <span className="text-xs font-bold text-[#F97316] uppercase tracking-widest block mb-2">Featured Case Study</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-4">Accounting Pro Suite</h3>
              
              <div className="space-y-4 font-semibold text-xs md:text-sm text-[#475569]">
                <p>
                  <strong>Business Problem:</strong> Legacy multi-currency billing and compliance reporting was manual, slow, and highly prone to accounting errors.
                </p>
                <p>
                  <strong>Solution Provided:</strong> Developed an enterprise-grade accounting web application featuring automated tax calculation, multi-currency ledger management, and payroll processes.
                </p>
                <p>
                  <strong>Results:</strong> Saved $120k annually in accounting overhead, eliminated compliance reporting delays, and created a fully audit-ready system.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-200/20 py-4 my-6 text-[10px] md:text-xs font-bold uppercase tracking-wider text-gray-500">
                <div>
                  <div className="text-[#0F172A] text-base md:text-lg mb-1">99.99%</div>
                  <div>Uptime Scale</div>
                </div>
                <div>
                  <div className="text-[#0F172A] text-base md:text-lg mb-1">8 Months</div>
                  <div>Build Cycle</div>
                </div>
                <div>
                  <div className="text-[#0F172A] text-base md:text-lg mb-1">6 Engineers</div>
                  <div>Team Size</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link to="/contact" className="btn-glow-primary px-6 py-2.5 rounded-full text-xs font-bold text-white cursor-pointer">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROJECT DETAILS MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#0F172A]/20 backdrop-blur-md"
            />
            {/* Modal Box */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              className="bg-white border border-gray-200/60 w-full max-w-[800px] h-[85vh] rounded-3xl overflow-y-auto relative z-10 shadow-2xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-gray-200/20 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
                  <div>
                    <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-wider block mb-1">{selectedProject.industry}</span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-[#0F172A]">{selectedProject.title}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full bg-[#F8FAFC] border border-gray-200/60 text-gray-500 hover:text-[#0F172A] hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <FaXmark className="text-sm" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 space-y-8 text-left">
                  {/* Overview Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#F8FAFC] border border-gray-200/40 p-4 rounded-2xl text-xs md:text-sm font-semibold text-[#475569]">
                    <div>
                      <div className="text-gray-500 mb-1 text-[10px] uppercase">Client Type</div>
                      <div className="text-[#0F172A] font-extrabold">{selectedProject.clientType}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1 text-[10px] uppercase">Year</div>
                      <div className="text-[#0F172A] font-extrabold">{selectedProject.year}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1 text-[10px] uppercase">Timeline</div>
                      <div className="text-[#0F172A] font-extrabold">{selectedProject.timeline}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1 text-[10px] uppercase">Team Size</div>
                      <div className="text-[#0F172A] font-extrabold">{selectedProject.teamSize} Engineers</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] mb-2">Business Challenge</h4>
                    <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed">{selectedProject.challenge}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] mb-2">Solution Provided</h4>
                    <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed">{selectedProject.solution}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] mb-3">Key Features</h4>
                      <ul className="space-y-2 text-xs md:text-sm font-semibold text-[#475569]">
                        {selectedProject.features.map((feat) => (
                          <li key={feat} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] mb-3">Client Benefits</h4>
                      <ul className="space-y-2 text-xs md:text-sm font-semibold text-[#475569]">
                        {selectedProject.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#0F172A] mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded bg-[#F8FAFC] border border-gray-200/60 text-xs font-semibold text-[#475569]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200/20 flex items-center justify-end gap-4 bg-[#F8FAFC]/50">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 rounded-full bg-white border border-gray-200/60 text-xs font-bold text-[#475569] hover:bg-gray-50 cursor-pointer"
                >
                  Close
                </button>
                <Link 
                  to="/contact" 
                  onClick={() => setSelectedProject(null)}
                  className="btn-glow-primary px-6 py-2.5 rounded-full text-xs font-bold text-white cursor-pointer"
                >
                  Start Project Like This
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 7. TECHNOLOGIES SECTION */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest block mb-3">Tech Stacks</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Core Technology Integration</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              We leverage reliable and scalable modern development frameworks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
            {technologies.map((tech) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.name}
                  whileHover={{ rotate: 1, scale: 1.02 }}
                  className={`bg-white/80 border border-gray-200/50 rounded-[20px] p-6 transition-all duration-300 shadow-sm ${tech.color}`}
                >
                  <div className="p-3 rounded-xl bg-[#2563EB]/10 w-fit mb-4 text-[#2563EB]">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] mb-2">{tech.name}</h3>
                  <p className="text-[#475569] text-xs font-semibold leading-relaxed">{tech.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. INDUSTRIES SERVED */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block mb-3">Industries</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Domains & Industries Served</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              Delivering specialized, SEO-friendly custom software and digital transformation pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {industries.map((ind) => (
              <div key={ind.title} className="bg-white/80 border border-gray-200/50 rounded-[24px] p-6 hover:border-[#2563EB]/25 transition-all shadow-sm">
                <div className="w-1.5 h-6 bg-[#2563EB] rounded-full mb-4" />
                <h3 className="text-sm font-bold text-[#0F172A] mb-2">{ind.title}</h3>
                <p className="text-[#475569] text-xs font-semibold leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DEVELOPMENT PROCESS (Interactive Timeline) */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-20">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest block mb-3">Engineering Workflow</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Our Development Process</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              How we construct custom software systems from concept to maintenance.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative pl-0 text-left space-y-12 max-w-2xl mx-auto">
            {/* Full gradient line */}
            <div className="absolute left-[4px] top-2 w-[2px] h-full bg-gradient-to-b from-[#2563EB] via-[#F97316] to-[#F59E0B] rounded-full" />

            {processes.map((proc, idx) => (
              <motion.div
                key={proc.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative pl-8"
              >
                {/* Dot sitting on the vertical line */}
                <div className="absolute left-[-4px] top-0.5 w-[18px] h-[18px] rounded-full bg-white border-[3px] border-[#2563EB] z-10 shadow-sm flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
                </div>
                
                <span className="text-[#F97316] text-[10px] font-extrabold uppercase tracking-widest block mb-1">Step {idx + 1}</span>
                <h3 className="text-sm font-bold text-[#0F172A] mb-2">{proc.title}</h3>
                <p className="text-[#475569] text-xs font-semibold leading-relaxed max-w-md">{proc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. CLIENT TESTIMONIALS (Carousel) */}
      <Testimonials />

      {/* 12. WHY CHOOSE SOFZENIX */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block mb-3">Capabilities</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Why Choose Sofzenix</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              High-end web design meets production scale software reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {whyChooseUs.map((feat) => {
              const Icon = feat.icon;
              return (
                <div key={feat.title} className="bg-white/80 border border-gray-200/40 rounded-[24px] p-6 hover:border-gray-200/80 transition-all shadow-sm">
                  <div className="p-3 rounded-xl bg-[#2563EB]/10 w-fit mb-4 text-[#2563EB]">
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0F172A] mb-2">{feat.title}</h3>
                  <p className="text-[#475569] text-xs font-semibold leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 13. FAQ SECTION */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[800px] mx-auto text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest block mb-3">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Frequently Asked Questions</h2>
          </div>

          {/* Accordion */}
          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white/80 border border-gray-200/50 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm"
              >
                <button
                  onClick={() => setActiveFAQ(activeFAQ === idx ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between font-extrabold text-xs md:text-sm text-[#0F172A] hover:text-[#2563EB] transition-colors text-left cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span className="text-xs text-gray-500">
                    {activeFAQ === idx ? <FaChevronDown className="rotate-180 transition-transform duration-300" /> : <FaChevronDown className="transition-transform duration-300" />}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {activeFAQ === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 text-[#475569] text-xs md:text-sm font-semibold leading-relaxed border-t border-gray-200/20 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FINAL CTA SECTION */}
      <section id="contact-footer" className="py-24 px-6 md:px-8 relative z-10 overflow-hidden">
        <div className="max-w-[1000px] mx-auto bg-gradient-to-r from-[#2563EB]/10 via-white to-[#F97316]/10 border border-gray-200/50 p-12 md:p-16 rounded-[28px] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-6">
            Let's Build Your Next Digital Product Together
          </h2>
          <p className="text-[#475569] text-sm md:text-base font-semibold leading-relaxed mb-8 max-w-2xl mx-auto">
            Looking for a trusted software development partner? Sofzenix IT Solutions LLP specializes in custom software development, web applications, enterprise systems, AI solutions, cloud platforms, and digital transformation services. Contact our experts today.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            <Link to="/contact" className="btn-glow-primary px-8 py-3.5 rounded-full text-sm font-bold text-white shadow-lg cursor-pointer">
              Start Your Project
            </Link>
            <Link to="/contact" className="btn-glow-secondary px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
              <span>Book Consultation</span>
            </Link>
            <Link to="/contact" className="btn-glow-secondary px-8 py-3.5 rounded-full text-sm font-bold flex items-center justify-center gap-2 cursor-pointer">
              <span>Contact Team</span>
              <FaArrowRight className="text-xs text-[#2563EB] group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;
