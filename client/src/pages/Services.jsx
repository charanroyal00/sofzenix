import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaCode, 
  FaLaptopCode, 
  FaMobileAlt, 
  FaDatabase, 
  FaCloud, 
  FaBrain, 
  FaPaintBrush, 
  FaCogs, 
  FaChevronDown, 
  FaChevronUp, 
  FaArrowRight, 
  FaCheckCircle, 
  FaStar,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
  FaHeadset,
  FaSearch,
  FaClipboardList,
  FaRocket,
  FaHospital,
  FaGraduationCap,
  FaCoins,
  FaShoppingBag,
  FaIndustry,
  FaTruck,
  FaBuilding,
  FaUniversity,
  FaFileUpload,
  FaJava,
  FaAws
} from 'react-icons/fa';
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiSpringboot,
  SiDocker,
  SiPython,
  SiFlutter,
  SiFigma,
  SiGit,
} from 'react-icons/si';
import Testimonials from '../components/Testimonials';

// Project screenshot images — served from /public for reliable loading
const imgSwadzo    = '/project_swadzo.png';
const imgHotel     = '/project_hotel.png';
const imgAnalytics = '/project_analytics.png';

// --- Tech Brand Icons using react-icons/si (official brand icons) ---
const TechLogos = {
  React:      () => <SiReact      className="w-8 h-8" style={{ color: '#61DAFB' }} />,
  Nodejs:     () => <SiNodedotjs  className="w-8 h-8" style={{ color: '#339933' }} />,
  Expressjs:  () => <SiExpress    className="w-8 h-8" style={{ color: '#404040' }} />,
  MongoDB:    () => <SiMongodb    className="w-8 h-8" style={{ color: '#47A248' }} />,
  Java:       () => <FaJava       className="w-8 h-8" style={{ color: '#5382A1' }} />,
  SpringBoot: () => <SiSpringboot className="w-8 h-8" style={{ color: '#6DB33F' }} />,
  AWS:        () => <FaAws         className="w-8 h-8" style={{ color: '#FF9900' }} />,
  Docker:     () => <SiDocker     className="w-8 h-8" style={{ color: '#2496ED' }} />,
  Python:     () => <SiPython     className="w-8 h-8" style={{ color: '#3776AB' }} />,
  Flutter:    () => <SiFlutter    className="w-8 h-8" style={{ color: '#02569B' }} />,
  Figma:      () => <SiFigma      className="w-8 h-8" style={{ color: '#F24E1E' }} />,
  Git:        () => <SiGit        className="w-8 h-8" style={{ color: '#F05032' }} />,
};

// Canvas particle system specifically for Services Page background
const ServicesBackgroundParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      if (!canvas || !canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 2 + 0.8
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.12)';
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

const ServicePageCard = ({ service, idx }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const IconComp = service.icon;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = -(e.clientY - rect.top - rect.height / 2) / 15;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: idx * 0.04 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: 'preserve-3d' }}
      className="group relative bg-white/75 backdrop-blur-xl border border-gray-200/50 rounded-[24px] card-top-gradient-border p-8 flex flex-col justify-between text-left shadow-sm hover:shadow-xl transition-all duration-300 cursor-default"
    >
      <div>
        {/* Category Label */}
        <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-widest block mb-2">
          {service.category}
        </span>

        {/* Icon with float & gradient glow */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#38BDF8]/10 border border-[#2563EB]/15 flex items-center justify-center text-[#2563EB] mb-6 group-hover:scale-108 group-hover:rotate-6 transition-all duration-300 relative overflow-hidden shadow-sm">
          <IconComp className="text-2xl relative z-10" />
          <div className="absolute inset-0 bg-[#2563EB]/5 blur-[6px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-extrabold text-[#0F172A] mb-3 group-hover:text-[#2563EB] transition-colors leading-tight">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-[#475569] text-xs font-semibold leading-relaxed mb-6">
          {service.desc}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {service.features.map((feat) => (
            <span 
              key={feat}
              className="px-2.5 py-1 rounded-full bg-white/85 border border-[#2563EB]/15 text-[9px] font-extrabold text-[#2563EB] tracking-wider uppercase hover:bg-[#2563EB] hover:text-white transition-all duration-300 cursor-default"
            >
              {feat}
            </span>
          ))}
        </div>
      </div>

      {/* CTA Trigger */}
      <Link 
        to="/contact"
        className="w-full pt-4 mt-auto border-t border-gray-100 flex items-center justify-between select-none cursor-pointer"
      >
        <span className="text-xs font-extrabold text-[#2563EB] uppercase tracking-widest group-hover:translate-x-1.5 transition-transform duration-300">
          Request Quote
        </span>
        <motion.span 
          animate={{ x: isHovered ? 4 : 0 }} 
          className="text-[#2563EB] flex items-center"
        >
          <FaArrowRight className="text-[10px]" />
        </motion.span>
      </Link>
    </motion.div>
  );
};

const Services = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const servicesGridRef = useRef(null);

  const scrollToServices = () => {
    servicesGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="min-h-screen text-[#475569] bg-transparent pt-28 pb-20 relative z-10 overflow-hidden font-sans"
    >
      {/* Moving background aurora mesh gradients */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="mesh-blob mesh-blob-1 -left-[10%] -top-[10%] opacity-30" />
        <div className="mesh-blob mesh-blob-2 -right-[15%] top-[25%] opacity-35" />
        <div className="mesh-blob mesh-blob-3 left-[20%] -bottom-[15%] opacity-30" />
      </div>

      {/* Grid Coordinates Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Background Particles Stream */}
      <ServicesBackgroundParticles />

      {/* 1. HERO SECTION (Background: #F8FAFC) */}
      <section className="relative max-w-[1400px] mx-auto px-6 md:px-8 py-10 md:py-16 text-center flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 backdrop-blur-md"
        >
          <span className="text-[#2563EB]">🚀</span>
          <span className="text-xs font-bold tracking-wider uppercase text-gray-500 font-mono">Our Capabilities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] max-w-4xl bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#F97316] bg-clip-text text-transparent"
        >
          Innovative Technology Services That Accelerate Business Growth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#475569] text-sm md:text-base leading-relaxed max-w-3xl font-semibold"
        >
          Sofzenix IT Solutions LLP provides custom software development, enterprise web applications, AI solutions, cloud consulting, mobile app development, UI/UX design, digital transformation, IT consulting, and scalable technology services tailored for startups, SMEs, and enterprises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <button 
            onClick={scrollToServices}
            className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-primary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
          >
            Explore Services
          </button>
          <Link 
            to="/contact"
            className="px-8 py-3.5 rounded-full font-extrabold btn-glow-secondary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm flex items-center justify-center"
          >
            Request Free Consultation
          </Link>
        </motion.div>
      </section>

      {/* 2. SERVICES GRID (Background: #FFFFFF) */}
      <section ref={servicesGridRef} className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20 scroll-mt-24 relative z-10 bg-white/60 backdrop-blur-md rounded-[32px] border border-gray-200/40 shadow-sm mt-8">
        {/* Faint network lines backdrop inside the grid */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] z-0" viewBox="0 0 1000 800" preserveAspectRatio="none">
          <path d="M 100 100 L 900 700 M 100 700 L 900 100" stroke="#2563EB" strokeWidth="2" />
          <path d="M 500 0 L 500 800" stroke="#2563EB" strokeWidth="2" />
        </svg>

        <div className="text-center flex flex-col items-center gap-4 mb-16 relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Our Engineering Portfolio</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl font-semibold">
            We deliver reliable solutions across the entire software development lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {servicesData.map((service, idx) => (
            <ServicePageCard key={service.title} service={service} idx={idx} />
          ))}
        </div>
      </section>

      {/* 3. FEATURED SERVICE (Background: #F5F9FF) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 mt-12">
        <div className="bg-white/80 p-8 md:p-12 rounded-[32px] border border-gray-200/50 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left backdrop-blur-md shadow-xl">
          {/* Featured Illustration Left */}
          <div className="lg:col-span-5 flex justify-center items-center relative">
            <div className="absolute w-[240px] h-[240px] rounded-full bg-[#2563EB]/5 blur-[80px]" />
            <div className="w-full max-w-[360px] p-4 bg-[#F8FAFC] rounded-2xl border border-gray-200/40 shadow-inner">
              {/* Immersive SVG dashboard mockup */}
              <svg viewBox="0 0 350 250" className="w-full h-auto" fill="none">
                <rect width="350" height="250" rx="12" fill="#FFFFFF" />
                {/* Control bar */}
                <rect width="350" height="24" rx="4" fill="#F8FAFC" />
                <circle cx="15" cy="12" r="3" fill="#EF4444" />
                <circle cx="27" cy="12" r="3" fill="#F59E0B" />
                <circle cx="39" cy="12" r="3" fill="#10B981" />
                
                {/* Charts mockup */}
                <rect x="20" y="45" width="140" height="80" rx="6" fill="#FFFFFF" stroke="rgba(0,0,0,0.05)" />
                <path d="M30 110 L60 80 L90 95 L120 60 L150 75" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                
                <rect x="180" y="45" width="150" height="80" rx="6" fill="#FFFFFF" stroke="rgba(0,0,0,0.05)" />
                <circle cx="255" cy="85" r="25" stroke="#F97316" strokeWidth="6" strokeDasharray="120 40" />

                {/* Lower grid panels */}
                <rect x="20" y="140" width="310" height="90" rx="6" fill="#FFFFFF" stroke="rgba(0,0,0,0.05)" />
                <circle cx="50" cy="185" r="18" fill="#2563EB" fillOpacity="0.1" />
                <path d="M45 185 L55 185 M50 180 L50 190" stroke="#2563EB" strokeWidth="2" />
                <rect x="85" y="170" width="120" height="8" rx="2" fill="rgba(15,23,42,0.2)" />
                <rect x="85" y="190" width="80" height="6" rx="2" fill="rgba(15,23,42,0.08)" />

                <rect x="240" y="165" width="70" height="24" rx="12" fill="#10B981" fillOpacity="0.15" />
                <text x="275" y="181" fill="#10B981" fontSize="9" fontWeight="bold" textAnchor="middle">Active SLA</text>
              </svg>
            </div>
          </div>

          {/* Featured Content Right */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-[10px] font-extrabold text-[#F97316] uppercase tracking-widest bg-[#F97316]/10 px-3 py-1 rounded-full w-fit">Featured Service</span>
            <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Enterprise Software Development</h3>
            <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed">
              We engineer custom, multi-layered enterprise software architectures that automate operations, scale seamlessly to millions of records, and protect mission-critical business data with bank-grade security protocols.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-[#2563EB] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">High Security</h4>
                  <p className="text-[#64748B] text-[11px] font-semibold leading-relaxed">End-to-end data encryption and strict ISO security practices.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-[#2563EB] mt-1 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">Cloud Integration</h4>
                  <p className="text-[#64748B] text-[11px] font-semibold leading-relaxed">Engineered native to AWS, GCP, and Kubernetes ecosystems.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Link 
                to="/contact"
                className="px-6 py-3 rounded-full text-white font-extrabold btn-glow-primary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-xs tracking-wider uppercase flex items-center gap-2 select-none"
              >
                <span>Request Quote</span>
                <FaArrowRight className="text-[9px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE SOFZENIX (Background: #FFFFFF) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Why Partners Choose Sofzenix</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl font-semibold">
            We hold ourselves to high corporate engineering and operations benchmarks to handle your digital objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/80 p-6 md:p-8 rounded-[20px] border border-gray-200/50 flex flex-col gap-4 text-left group hover:-translate-y-1 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] group-hover:bg-[#F97316]/10 group-hover:text-[#F97316] group-hover:border-[#F97316]/20 transition-all">
                  <IconComponent className="text-lg" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                <p className="text-[#475569] text-xs font-semibold leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. DEVELOPMENT PROCESS (Background: #EEF6FF) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Our SDLC Development Process</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl font-semibold">
            We follow a structured, milestone-driven framework to convert ideas into deployment.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto flex flex-col gap-12 text-left">
          {/* Vertical line */}
          <div className="absolute left-[10px] top-0 w-[2px] h-full bg-gradient-to-b from-[#2563EB] via-[#F97316] to-[#F59E0B] rounded-full" />

          {devSteps.map((step, idx) => {
            const StepIcon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="relative group pl-14 md:pl-16"
              >
                {/* Dot — centered on the line at left:10px, dot is 22px wide so left:0 */}
                <div className="absolute left-0 top-7 -translate-y-1/2 w-[22px] h-[22px] rounded-full bg-white border-2 border-gray-300 flex items-center justify-center text-[#0F172A] text-[9px] font-bold group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-all duration-300 shadow-sm z-10">
                  {idx + 1}
                </div>

                <div className="bg-white/80 p-6 md:p-8 rounded-[20px] border border-gray-200/50 flex flex-col md:flex-row gap-6 items-start shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] flex-shrink-0">
                    <StepIcon className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. TECHNOLOGY STACK (Background: #FFFFFF) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Our Engineering Stack</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl font-semibold">
            We build high-performance services using stable modern systems.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStackData.map((tech, idx) => {
            const LogoSvg = TechLogos[tech.logoKey];
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                className="bg-white/80 p-6 rounded-[20px] border border-gray-200/50 flex flex-col items-center justify-center gap-3 group hover:border-[#2563EB]/30 transition-all duration-300 cursor-default shadow-sm"
              >
                <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <LogoSvg />
                </div>
                <span className="text-xs font-bold text-[#475569] group-hover:text-[#2563EB] transition-colors">{tech.name}</span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 7. INDUSTRIES WE SERVE (Background: #F5F9FF) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Domain & Industry Verticals</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl font-semibold">
            We adapt custom architectures matching distinct compliance, workflow, and user-centric benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesData.map((ind, idx) => {
            const IndIcon = ind.icon;
            return (
              <motion.div
                key={ind.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/80 p-6 md:p-8 rounded-[20px] border border-gray-200/50 text-left flex flex-col gap-3 group hover:border-[#F97316]/25 transition-all duration-300 shadow-sm"
              >
                <div className="text-[#F97316] text-xl group-hover:scale-105 transition-transform duration-300">
                  <IndIcon />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{ind.name}</h3>
                <p className="text-[#475569] text-xs font-semibold leading-relaxed">{ind.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 8. CASE STUDIES / PROJECT HIGHLIGHTS (Background: #FFFFFF) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Software Product Highlights</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl font-semibold">
            Browse snapshots of software systems engineered by our division.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              className="bg-white/80 rounded-[24px] border border-gray-200/50 overflow-hidden text-left flex flex-col justify-between group hover:border-[#2563EB]/20 shadow-sm"
            >
              <div>
                {/* Real project screenshot */}
                <div className="h-48 w-full overflow-hidden relative rounded-t-[24px] bg-gray-50">
                  <img
                    src={project.img}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                  <span className="absolute bottom-3 left-4 text-white font-extrabold text-sm tracking-wide z-10 drop-shadow">
                    {project.name}
                  </span>
                </div>
                
                {/* Info details */}
                <div className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.stack.map(tag => (
                      <span key={tag} className="text-[9px] font-extrabold text-[#2563EB] bg-[#2563EB]/10 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[#475569] text-xs font-semibold leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link 
                  to="/portfolio"
                  className="w-full py-3 rounded-xl border border-gray-200/10 text-[#0F172A] font-bold text-xs bg-[#F8FAFC] hover:bg-[#2563EB] hover:text-white hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 select-none"
                >
                  <span>View Project</span>
                  <FaArrowRight className="text-[9px]" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. CLIENT TESTIMONIALS (Background: #EEF6FF) */}
      <Testimonials />

      {/* 10. FAQ (Background: #FFFFFF) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Frequently Asked Questions</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl font-semibold">
            Key questions answered regarding timeline, pricing, support, and technology pipelines.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqData.map((faq, idx) => {
            const isOpen = activeFAQ === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 rounded-[16px] border border-gray-200/50 overflow-hidden text-left shadow-sm"
              >
                <button
                  onClick={() => setActiveFAQ(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-[#0F172A] hover:text-[#2563EB] font-bold text-sm md:text-base cursor-pointer select-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[#475569] text-xs md:text-sm font-semibold leading-relaxed border-t border-gray-200/20 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. FINAL CTA (Soft Gradient) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#2563EB]/10 via-[#F97316]/5 to-[#F3F8FF] border border-gray-200/50 p-10 md:p-16 rounded-[32px] flex flex-col items-center gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#F97316]/3 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#2563EB]/3 rounded-full blur-[80px]" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A]">Ready to Build Your Next Digital Product?</h2>
          
          <p className="text-[#475569] text-sm md:text-base max-w-2xl leading-relaxed font-semibold">
            Partner with Sofzenix IT Solutions LLP to build secure, scalable, and modern software solutions tailored to your business goals.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 relative z-10">
            <Link 
              to="/contact"
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-primary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm flex items-center justify-center"
            >
              Start Your Project
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-3.5 rounded-full font-extrabold btn-glow-secondary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm flex items-center justify-center"
            >
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// --- DATA CONFIGURATIONS ---

const servicesData = [
  {
    title: 'Custom Software Development',
    category: 'Software Architecture',
    desc: 'Bespoke corporate tools, dashboard systems, and business process automation solutions.',
    icon: FaCode,
    features: ['Workflow Automation', 'Scalable Architectures', 'Tailored Business Logic']
  },
  {
    title: 'Web Development',
    category: 'Web Products',
    desc: 'High-speed single-page applications, SaaS portals, and secure e-commerce systems.',
    icon: FaLaptopCode,
    features: ['Vite & Next.js Performance', 'Highly Responsive Layouts', 'SEO & Semantics Optimized']
  },
  {
    title: 'Mobile Application Development',
    category: 'Mobile Products',
    desc: 'Native compiled Android and iOS applications built from modular cross-platform codebases.',
    icon: FaMobileAlt,
    features: ['Flutter Integration', 'Offline Data Storage', 'Interactive UX Flows']
  },
  {
    title: 'MERN Stack Development',
    category: 'Fullstack Systems',
    desc: 'Complete React frontend linked to secure Express routing, Node.js engines, and MongoDB databases.',
    icon: FaDatabase,
    features: ['JSON Web Tokens (JWT)', 'Fast Mongoose Pipelines', 'Real-time WebSocket support']
  },
  {
    title: 'Java Spring Boot Development',
    category: 'Enterprise Services',
    desc: 'High-volume enterprise microservices, secure database connectors, and cloud hosting.',
    icon: FaCogs,
    features: ['Spring Security & OAuth2', 'Spring Cloud Service Registry', 'Relational database mappings']
  },
  {
    title: 'Cloud Solutions',
    category: 'Cloud & DevOps',
    desc: 'Secure server setup, continuous deployment networks, and cloud scaling.',
    icon: FaCloud,
    features: ['AWS / ECS / Lambda setups', 'Docker Containerization', 'Automated CI/CD workflows']
  },
  {
    title: 'AI & Machine Learning',
    category: 'Cognitive AI',
    desc: 'Large language model fine-tuning, automated cognitive agents, and custom prediction models.',
    icon: FaBrain,
    features: ['OpenAI & Claude LLM Connectors', 'Python Scikit & PyTorch systems', 'Retrieval-Augmented Gen (RAG)']
  },
  {
    title: 'UI/UX Design',
    category: 'Product Design',
    desc: 'Product mockups, interactive prototypes, design systems, and client branding.',
    icon: FaPaintBrush,
    features: ['Figma Component Libraries', 'User Persona Wireframing', 'Interactive micro-animations']
  },
  {
    title: 'API Development',
    category: 'Integration Services',
    desc: 'Lightweight REST and GraphQL endpoints supporting secure authentication and CORS rules.',
    icon: FaLaptopCode,
    features: ['Rate Limiting Protection', 'Swagger & Postman schemas', 'JSON Schema validation']
  },
  {
    title: 'Database Design',
    category: 'Data Engineering',
    desc: 'Highly structured SQL normalization and performant NoSQL index configurations.',
    icon: FaDatabase,
    features: ['MongoDB Aggregations', 'MySQL & PostgreSQL indexes', 'Clustered backup storage']
  },
  {
    title: 'IT Consulting',
    category: 'Technology Advisory',
    desc: 'Corporate technology auditing, framework transition planning, and system migrations.',
    icon: FaSearch,
    features: ['Legacy Code Auditing', 'Vulnerability Assessments', 'Framework Feasibility Reports']
  },
  {
    title: 'Software Maintenance & Support',
    category: 'Operations & SLA',
    desc: 'Proactive software security patches, performance tuning, and 24/7 emergency support.',
    icon: FaHeadset,
    features: ['24/7 SLA availability', 'Proactive Server Audits', 'Continuous package upgrades']
  }
];

const whyChooseData = [
  { title: 'Enterprise Quality', desc: 'Rigorous linting, unit-testing, and compliance checks integrated by default.', icon: FaCheckCircle },
  { title: 'Secure Development', desc: 'Secure data transit and standard NDA safety guidelines.', icon: FaShieldAlt },
  { title: 'Agile Methodology', desc: 'Sprint iterations, clear task management, and weekly reviews.', icon: FaClipboardList },
  { title: 'Experienced Team', desc: 'Direct coordination with senior engineers averaging 5+ years of experience.', icon: FaUsers },
  { title: 'Transparent Process', desc: 'Real-time repository updates, direct Slack channels, and tracking.', icon: FaCogs },
  { title: 'Scalable Solutions', desc: 'Systems engineered to expand seamlessly matching your volume growth.', icon: FaChartLine },
  { title: 'Long-Term Support', desc: 'Post-deployment SLA maintenance and continuous optimizations.', icon: FaHeadset },
  { title: 'On-Time Delivery', desc: 'Rigid sprint milestones and clear communication cycles ensure timely releases.', icon: FaRocket }
];

const devSteps = [
  { title: 'Requirement Analysis', desc: 'We align on features, target users, compliance needs, and feasibility.', icon: FaSearch },
  { title: 'Planning', desc: 'We create data schemas, project checklists, sprint charts, and wireframe roadmaps.', icon: FaClipboardList },
  { title: 'UI/UX Design', desc: 'We create Figma mockups, prototypes, and typography guidelines.', icon: FaPaintBrush },
  { title: 'Development', desc: 'Our senior developers write modular, clean MERN/Java code under git controls.', icon: FaCode },
  { title: 'Testing', desc: 'We execute automated unit tests, security checking, and cross-browser reviews.', icon: FaCheckCircle },
  { title: 'Deployment', desc: 'We bundle production artifacts and launch to secure AWS, Docker, or serverless clouds.', icon: FaRocket },
  { title: 'Maintenance', desc: 'We monitor server load, perform database backups, and deploy patches.', icon: FaHeadset }
];

const techStackData = [
  { name: 'React', logoKey: 'React' },
  { name: 'Node.js', logoKey: 'Nodejs' },
  { name: 'Express', logoKey: 'Expressjs' },
  { name: 'MongoDB', logoKey: 'MongoDB' },
  { name: 'Java', logoKey: 'Java' },
  { name: 'Spring Boot', logoKey: 'SpringBoot' },
  { name: 'AWS', logoKey: 'AWS' },
  { name: 'Docker', logoKey: 'Docker' },
  { name: 'Python', logoKey: 'Python' },
  { name: 'Flutter', logoKey: 'Flutter' },
  { name: 'Figma', logoKey: 'Figma' },
  { name: 'Git', logoKey: 'Git' }
];

const industriesData = [
  { name: 'Healthcare', desc: 'Secure database storage matching medical tracking standards.', icon: FaHospital },
  { name: 'Education', desc: 'Interactive portals, course logs, and student performance metrics.', icon: FaGraduationCap },
  { name: 'Finance', desc: 'Highly secure microservices supporting API transactions and aggregations.', icon: FaCoins },
  { name: 'Retail', desc: 'Fast e-commerce storefronts, cart configurations, and payment flows.', icon: FaShoppingBag },
  { name: 'Manufacturing', desc: 'Workflow managers and inventory tracking systems.', icon: FaIndustry },
  { name: 'Logistics', desc: 'Real-time coordinate maps and delivery tracking frameworks.', icon: FaTruck },
  { name: 'Real Estate', desc: 'Responsive property directories and client scheduler cards.', icon: FaBuilding },
  { name: 'Government', desc: 'Compliant applications designed for accessibility, safety, and scale.', icon: FaUniversity }
];

const projectsData = [
  { name: 'Swadzo Food Platform',    img: imgSwadzo,    stack: ['React', 'Node.js', 'Express', 'MongoDB'], desc: 'A food delivery system supporting catalog filters, active map routes, and payment gateways.' },
  { name: 'Enterprise Hotel Portal', img: imgHotel,     stack: ['Java', 'Spring Boot', 'MySQL', 'AWS'],    desc: 'High-volume multi-tenant hotel room scheduler incorporating Spring Security rules.' },
  { name: 'Real-time Analytics Desk',img: imgAnalytics, stack: ['React', 'Python', 'Docker', 'D3.js'],    desc: 'Data visualization engine rendering thousands of server ticks per second.' }
];

const faqData = [
  { q: 'How quickly do you respond to service requests?', a: 'All service and scoping requests are reviewed and answered with feedback within 24 business hours.' },
  { q: 'Do you offer free technical consultation?', a: 'Yes. We provide a free 30-minute discovery call with our solutions architects to evaluate feasibility.' },
  { q: 'Can I request a custom project quotation?', a: 'Absolutely. Submit your requirements or documents on our Contact page and we will prepare a detailed breakdown.' },
  { q: 'Do you sign Non-Disclosure Agreements (NDAs)?', a: 'Yes. Protecting client intellectual property is our core practice. We sign NDAs before discussing any technical logic.' },
  { q: 'What post-deployment maintenance services do you provide?', a: 'We offer SLA-backed technical assistance including security patching, package upgrades, database backups, and server optimization.' },
  { q: 'Do you work with international clients?', a: 'Yes. We collaborate with companies globally across multiple overlapping timezones using clear communication channels.' }
];

export default Services;
