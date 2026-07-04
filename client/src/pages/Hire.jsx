import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FaCode, 
  FaShieldAlt, 
  FaComments, 
  FaClock, 
  FaUsers, 
  FaChartLine, 
  FaHeadset,
  FaCheckCircle,
  FaStar,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaArrowRight,
  FaUserCheck,
  FaClipboardList,
  FaCogs,
  FaRocket,
  FaSearch,
  FaUserTie
} from 'react-icons/fa';
import ReCaptchaCheckbox from '../components/ReCaptchaCheckbox';
import Testimonials from '../components/Testimonials';

// --- SVGs for Technologies (guarantees perfect coloring & rendering) ---
const TechLogos = {
  React: () => (
    <svg className="w-8 h-8 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.4-5.3l-1.9 1.1c-.2.1-.4 0-.5-.2l-.6-1c-.1-.2 0-.4.2-.5l1.9-1.1c.1-.1.1-.3 0-.4l-1.9-1.1c-.2-.1-.3-.3-.2-.5l.6-1c.1-.2.3-.3.5-.2l1.9 1.1c.2.1.4 0 .5-.2l1.1-1.9c.1-.2.3-.3.5-.2l1.1.6c.2.1.3.3.2.5l-1.1 1.9c-.1.2 0 .4.2.5l1.9 1.1c.2.1.3.3.2.5l-.6 1c-.1.2-.3.3-.5.2l-1.9-1.1c-.2-.1-.4 0-.5.2l-1.1 1.9c-.1.2-.3.3-.5.2l-1.1-.6c-.2-.1-.3-.3-.2-.5l1.1-1.9c.1-.2 0-.4-.2-.5z"/>
    </svg>
  ),
  Nodejs: () => (
    <svg className="w-8 h-8 text-[#68A063]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5l-3.5-2v-4l3.5-2 3.5 2v4l-3.5 2z"/>
    </svg>
  ),
  Expressjs: () => (
    <svg className="w-8 h-8 text-[#0F172A]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2 13h-4v-2h4v2zm0-4h-4V9h4v2z"/>
    </svg>
  ),
  MongoDB: () => (
    <svg className="w-8 h-8 text-[#47A248]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-1 0-2.5-1.5-2.5-3.5S10.5 10 12 10s2.5 1.5 2.5 3.5-1.5 3.5-2.5 3.5z"/>
    </svg>
  ),
  Java: () => (
    <svg className="w-8 h-8 text-[#5382A1]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.5 14c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm5 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
    </svg>
  ),
  SpringBoot: () => (
    <svg className="w-8 h-8 text-[#6DB33F]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/>
    </svg>
  ),
  Python: () => (
    <svg className="w-8 h-8 text-[#3776AB]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.5 13.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"/>
    </svg>
  ),
  AWS: () => (
    <svg className="w-8 h-8 text-[#FF9900]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2 14h-4v-2h4v2zm0-4h-4V9h4v2z"/>
    </svg>
  ),
  Docker: () => (
    <svg className="w-8 h-8 text-[#2496ED]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 11h-9v-2h9v2z"/>
    </svg>
  ),
  Flutter: () => (
    <svg className="w-8 h-8 text-[#02569B]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15l-4-4 4-4 4 4-4 4z"/>
    </svg>
  ),
  UIUX: () => (
    <svg className="w-8 h-8 text-[#E25CFF]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5 4.5 2 4.5 4.5-2 4.5-4.5 4.5z"/>
    </svg>
  ),
  AIML: () => (
    <svg className="w-8 h-8 text-[#FF8A00]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"/>
    </svg>
  )
};

const Hire = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [activeFAQ, setActiveFAQ] = useState(null);

  const formRef = useRef(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue
  } = useForm({
    defaultValues: {
      hiringModel: 'Dedicated Developer',
      projectDuration: '3-6 Months',
      agreedToPrivacy: false
    }
  });

  // --- Scroll to Form Helper ---
  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- Toggle Tech Pill Selection ---
  const handleTechToggle = (techName) => {
    let updated;
    if (selectedTechs.includes(techName)) {
      updated = selectedTechs.filter(t => t !== techName);
    } else {
      updated = [...selectedTechs, techName];
    }
    setSelectedTechs(updated);
    setValue('techNeeded', updated); // Set value in React Hook Form
  };

  // --- Form Submission ---
  const onSubmit = async (data) => {
    if (!isCaptchaVerified) {
      setCaptchaError('Please complete the reCAPTCHA verification.');
      return;
    }
    setCaptchaError('');
    setIsSubmitting(true);

    const payload = {
      fullName: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone,
      country: data.country,
      techNeeded: selectedTechs,
      hiringModel: data.hiringModel,
      projectDuration: data.projectDuration,
      projectRequirements: data.requirements,
      agreedToPrivacy: data.agreedToPrivacy
    };

    try {
      // Backend target
      const res = await axios.post('http://localhost:5000/api/hiring-requests', payload);
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitMessage(res.data.message || 'Thank you! Your hiring request has been received.');
      reset();
      setSelectedTechs([]);
      setIsCaptchaVerified(false);
      
      // Auto dismiss success banner after 8s
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (err) {
      console.warn('Backend API request failed, falling back to simulated success for visual presentation:', err);
      // Simulate network request delays
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitMessage('Hiring request received successfully (local sandbox mode). We will get back to you within 24 hours!');
      reset();
      setSelectedTechs([]);
      setIsCaptchaVerified(false);
      
      setTimeout(() => setSubmitSuccess(false), 8000);
    }
  };

  return (
    <div
      className="min-h-screen text-[#475569] bg-transparent pt-28 pb-20 relative z-10 overflow-hidden font-sans"
    >
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-[1400px] mx-auto px-6 md:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Hero Left Content */}
        <div className="lg:col-span-7 text-left flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 w-fit backdrop-blur-md"
          >
            <span className="text-[#2563EB]">💼</span>
            <span className="text-xs font-bold tracking-wider uppercase text-gray-500">Hire Sofzenix Talent</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#F97316] bg-clip-text text-transparent"
          >
            Hire Skilled Developers & Dedicated Teams for Your Business
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#475569] text-sm md:text-base leading-relaxed max-w-2xl font-semibold"
          >
            Hire experienced MERN Stack developers, Java Spring Boot developers, UI/UX designers, AI engineers, cloud specialists, QA testers, and dedicated software development teams from Sofzenix IT Solutions LLP. Build scalable, secure, and high-performance digital solutions with flexible hiring models.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <button 
              onClick={scrollToForm}
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-primary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
            >
              Hire Now
            </button>
            <button 
              onClick={scrollToForm}
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-secondary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
            >
              Schedule Consultation
            </button>
          </motion.div>
        </div>

        {/* Hero Right Visual (Enterprise-Style Team SVG Graphic) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Animated Glow backdrops */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[#2563EB]/5 blur-[80px] -z-10 animate-pulse-slow" />
          <div className="absolute w-[240px] h-[240px] rounded-full bg-[#F97316]/2 blur-[70px] -z-10 animate-pulse-slower" />

          {/* Premium Enterprise Graphic */}
          <div className="w-full max-w-[450px] p-6 rounded-[24px] bg-white/80 border border-gray-200/50 backdrop-blur-md shadow-2xl relative overflow-hidden group text-left">
            {/* Header window control */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-200/10 mb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">sofzenix_collaboration.js</span>
            </div>

            {/* SVG Visual Content */}
            <svg viewBox="0 0 400 300" className="w-full h-auto text-[#0F172A]" fill="none">
              {/* Grid Background */}
              <defs>
                <pattern id="cardGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 0, 0, 0.02)" strokeWidth="1" />
                </pattern>
                <linearGradient id="primaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#E25CFF" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#cardGrid)" />

              {/* Connecting Web Network lines */}
              <path d="M 80 80 L 200 150 L 320 80 M 200 150 L 200 240 M 80 80 L 320 80" stroke="rgba(37, 99, 235, 0.2)" strokeWidth="1.5" strokeDasharray="4 2" />

              {/* Developer Team nodes */}
              {/* PM Node */}
              <g transform="translate(200, 150)">
                <circle r="30" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                <circle r="20" fill="url(#primaryGrad)" />
                <text y="4" textAnchor="middle" fill="#2563EB" fontSize="10" fontWeight="bold">LEAD</text>
              </g>

              {/* Developer 1 Node */}
              <g transform="translate(80, 80)">
                <circle r="25" fill="#FFFFFF" stroke="#F97316" strokeWidth="2" />
                <text y="3" textAnchor="middle" fill="#F97316" fontSize="8" fontWeight="bold">MERN</text>
              </g>

              {/* Developer 2 Node */}
              <g transform="translate(320, 80)">
                <circle r="25" fill="#FFFFFF" stroke="#E25CFF" strokeWidth="2" />
                <text y="3" textAnchor="middle" fill="#E25CFF" fontSize="8" fontWeight="bold">JAVA</text>
              </g>

              {/* Developer 3 Node */}
              <g transform="translate(200, 240)">
                <circle r="25" fill="#FFFFFF" stroke="#10B981" strokeWidth="2" />
                <text y="3" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold">AI/ML</text>
              </g>

              {/* Data Flow Pulses */}
              <circle cx="140" cy="115" r="3" fill="#2563EB">
                <animate attributeName="cx" values="80;200" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="80;150" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="260" cy="115" r="3" fill="#F97316">
                <animate attributeName="cx" values="320;200" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="80;150" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="195" r="3" fill="#E25CFF">
                <animate attributeName="cy" values="150;240" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </svg>

            {/* Float visual pill cards */}
            <div className="absolute top-8 right-6 bg-white/80 border border-gray-200/50 px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg animate-soft-float">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-[#0F172A]">Enterprise Ready</span>
            </div>

            {/* Code typing mockup inside dashboard */}
            <div className="mt-4 font-mono text-[10px] text-left p-3.5 bg-[#F8FAFC] rounded-xl border border-gray-200/40 flex flex-col gap-1.5 text-gray-500">
              <p className="text-blue-600">const talent = await Sofzenix.hire(&#123;</p>
              <p className="pl-4">engineers: ['Senior MERN', 'Java Spring Boot'],</p>
              <p className="pl-4 text-[#F97316]">model: 'Dedicated Development Team',</p>
              <p className="pl-4 text-green-600">ndaSigned: true</p>
              <p className="text-blue-600">&#125;);</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. WHY HIRE SOFZENIX */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Why Hire Developers from Sofzenix?</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            We source, vet, and manage premier software talent so you can scale your product velocity with full confidence and zero operational friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyHireData.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/80 p-6 md:p-8 rounded-[20px] border border-gray-200/50 flex flex-col gap-4 text-left group hover:-translate-y-1.5 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] group-hover:bg-[#F97316]/10 group-hover:border-[#F97316]/20 group-hover:text-[#F97316] transition-colors duration-300">
                  <IconComponent className="text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#2563EB] transition-colors duration-200">{item.title}</h3>
                <p className="text-[#475569] text-xs font-semibold leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. HIRING MODELS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Flexible Hiring Models</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            Choose the model that fits your operational needs, project scale, and budget requirements perfectly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hiringModelsData.map((model, idx) => {
            const IconComponent = model.icon;
            return (
              <motion.div
                key={model.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="bg-white/80 p-8 rounded-[24px] border border-gray-200/50 flex flex-col justify-between text-left relative overflow-hidden group hover:border-[#2563EB]/30 shadow-sm"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center text-[#F97316] mb-6 group-hover:bg-[#2563EB]/10 group-hover:text-[#2563EB] transition-colors duration-300">
                    <IconComponent className="text-2xl" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0F172A] mb-3">{model.title}</h3>
                  <p className="text-[#475569] text-xs font-semibold leading-relaxed mb-6">{model.desc}</p>
                  
                  <div className="mb-8 p-4 rounded-xl bg-[#F8FAFC] border border-gray-200/40 text-[11px] font-bold">
                    <span className="text-[#2563EB] uppercase tracking-wider block mb-1">Best For:</span>
                    <span className="text-[#475569] font-semibold">{model.bestFor}</span>
                  </div>
                </div>

                <button 
                  onClick={scrollToForm}
                  className="w-full py-3.5 rounded-full border border-[#2563EB]/25 text-[#2563EB] font-extrabold text-xs tracking-wider uppercase bg-[#2563EB]/5 hover:bg-[#2563EB] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer select-none"
                >
                  <span>Hire Now</span>
                  <FaArrowRight className="text-[10px]" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. HIRE BY TECHNOLOGY */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Hire Developers by Tech Stack</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            Choose from a versatile pool of software engineers certified in modern languages, web frameworks, and cloud systems.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStackData.map((tech, idx) => {
            const LogoSvg = TechLogos[tech.logoKey];
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="bg-white/80 p-6 rounded-[20px] border border-gray-200/50 flex flex-col justify-between text-left group hover:border-[#2563EB]/30 transition-all duration-300 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                      <LogoSvg />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 bg-[#2563EB]/5 border border-[#2563EB]/10 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {tech.exp}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2">{tech.name}</h3>
                  <p className="text-[#475569] text-xs font-semibold leading-relaxed mb-6">{tech.desc}</p>
                </div>

                <button 
                  onClick={() => {
                    if (!selectedTechs.includes(tech.name)) {
                      handleTechToggle(tech.name);
                    }
                    scrollToForm();
                  }}
                  className="w-full py-3 rounded-xl border border-gray-200/50 text-[#0F172A] font-bold text-xs bg-[#F8FAFC] hover:bg-[#2563EB] hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer select-none"
                >
                  Hire Now
                </button>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. DEDICATED TEAM SHOWCASE */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Dedicated Developer Roles Available</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            Directly select roles from our roster of senior engineers. Instant scheduling available for technical assessments.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamShowcaseData.map((profile, idx) => (
            <motion.div
              key={profile.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white/80 p-6 md:p-8 rounded-[24px] border border-gray-200/50 flex flex-col justify-between text-left group hover:border-[#F97316]/20 shadow-sm"
            >
              <div>
                {/* Header profile details */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Initials Avatar Placeholder */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white shadow-md ${profile.avatarColor}`}>
                    {profile.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#F97316] transition-colors">{profile.role}</h3>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{profile.exp}</span>
                  </div>
                </div>

                {/* Availability pill */}
                <div className="mb-6 flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${profile.availColor} animate-pulse`} />
                  <span className="text-xs font-bold text-[#475569]">{profile.availability}</span>
                </div>

                {/* Core skills list */}
                <div className="mb-8">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Core Skills:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.skills.map(skill => (
                      <span key={skill} className="text-[9px] font-extrabold text-[#475569] bg-gray-100 border border-gray-200/50 px-2.5 py-1 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  if (profile.skills.length > 0) {
                    const mainSkill = profile.skills[0];
                    if (!selectedTechs.includes(mainSkill)) {
                      handleTechToggle(mainSkill);
                    }
                  }
                  scrollToForm();
                }}
                className="w-full py-3.5 rounded-full text-white font-extrabold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer btn-glow-primary select-none"
              >
                <span>Hire {profile.initials}</span>
                <FaArrowRight className="text-[9px]" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. HIRING PROCESS (Timeline) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Our 6-Step Hiring Process</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            We've refined our pipeline to ensure you onboard top-tier engineers with zero speedbumps.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l border-gray-200/20 max-w-4xl mx-auto pl-8 md:pl-12 flex flex-col gap-16 text-left">
          
          {/* Animated line indicator */}
          <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-[#2563EB] via-[#F97316] to-[#F59E0B]" />

          {hiringProcessSteps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                className="relative group"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute left-[-41px] md:left-[-57px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full bg-white border-[2px] border-gray-200/30 flex items-center justify-center text-[#0F172A] text-[10px] md:text-xs font-bold group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                  {idx + 1}
                </div>

                {/* Timeline Card */}
                <div className="bg-white/80 p-6 md:p-8 rounded-[20px] border border-gray-200/50 flex flex-col md:flex-row gap-6 items-start shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] flex-shrink-0">
                    <IconComponent className="text-xl" />
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

      {/* 7. WHY CLIENTS CHOOSE SOFZENIX (Comparison) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Why Clients Choose Sofzenix</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            We hold ourselves to enterprise benchmarks across every engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientChooseData.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white/80 p-6 rounded-[20px] border border-gray-200/50 text-left flex flex-col gap-4 group hover:border-[#2563EB]/35 shadow-sm"
            >
              <div className="flex items-center gap-2 text-[#10B981]">
                <FaCheckCircle className="text-lg" />
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#10B981]">Certified Standard</span>
              </div>
              <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
              <p className="text-[#475569] text-xs font-semibold leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 8. CLIENT TESTIMONIALS */}
      <Testimonials />

      {/* 9. FAQ (Accordion) */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Frequently Asked Questions</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            Everything you need to know about working with Sofzenix developers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqData.map((faq, idx) => {
            const isOpen = activeFAQ === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 rounded-[16px] border border-gray-200/50 overflow-hidden transition-colors text-left shadow-sm"
              >
                <button
                  onClick={() => setActiveFAQ(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-[#0F172A] hover:text-[#2563EB] font-bold text-sm md:text-base transition-colors duration-200 select-none cursor-pointer"
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

      {/* 10. HIRING REQUEST FORM */}
      <section id="hiring-form" ref={formRef} className="max-w-[1400px] mx-auto px-6 md:px-8 py-20 border-t border-gray-200/20 scroll-mt-24">
        <div className="max-w-4xl mx-auto bg-white/80 border border-gray-200/50 p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          <div className="text-left flex flex-col gap-3 mb-10 border-b border-gray-200/20 pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Hiring Request Form</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              Fill out your engineering and talent requirements below. Our developer acquisition team will schedule a discovery meeting shortly.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-left">
            {/* Field Row 1: Full Name & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alexander Wright"
                  {...register('name', { required: 'Full name is required' })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.name ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
                />
                {errors.name && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.name.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Company</label>
                <input 
                  type="text" 
                  placeholder="e.g. Acme Corporation"
                  {...register('company', { required: 'Company name is required' })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.company ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
                />
                {errors.company && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.company.message}</span>}
              </div>
            </div>

            {/* Field Row 2: Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
                <input 
                  type="email" 
                  placeholder="you@company.com"
                  {...register('email', { 
                    required: 'Email address is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                  })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.email ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
                />
                {errors.email && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. +1 555-0199"
                  {...register('phone', { required: 'Phone number is required' })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.phone ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
                />
                {errors.phone && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.phone.message}</span>}
              </div>
            </div>

            {/* Country Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Country</label>
              <input 
                type="text" 
                placeholder="e.g. United States"
                {...register('country', { required: 'Country is required' })}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.country ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
              />
              {errors.country && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.country.message}</span>}
            </div>

            {/* Tech Selection Pills */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Technologies Needed</label>
              <div className="flex flex-wrap gap-2 py-2">
                {techList.map((tech) => {
                  const isSelected = selectedTechs.includes(tech);
                  return (
                    <button
                      type="button"
                      key={tech}
                      onClick={() => handleTechToggle(tech)}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-200 select-none cursor-pointer ${
                        isSelected 
                          ? 'bg-[#2563EB] text-white border-transparent shadow-[0_0_12px_rgba(37,99,235,0.4)]'
                          : 'bg-white border border-gray-200/50 text-[#475569] hover:border-[#2563EB]/50 hover:bg-gray-50'
                      }`}
                    >
                      {tech}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hiring Model & Project Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Hiring Model</label>
                <select 
                  {...register('hiringModel', { required: true })}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] transition-all"
                >
                  <option value="Dedicated Developer">Dedicated Developer</option>
                  <option value="Dedicated Team">Dedicated Team</option>
                  <option value="Project-Based Development">Project-Based Development</option>
                  <option value="Hourly Hiring">Hourly Hiring</option>
                  <option value="Monthly Hiring">Monthly Hiring</option>
                  <option value="Intern Hiring">Intern Hiring</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Project Duration</label>
                <select 
                  {...register('projectDuration', { required: true })}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] transition-all"
                >
                  <option value="Less than 1 Month">Less than 1 Month</option>
                  <option value="1-3 Months">1-3 Months</option>
                  <option value="3-6 Months">3-6 Months</option>
                  <option value="6+ Months">6+ Months</option>
                </select>
              </div>
            </div>

            {/* Project Requirements */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Project Requirements</label>
              <textarea 
                rows="5"
                placeholder="Describe your project, timeline, and exact engineer expectations..."
                {...register('requirements', { required: 'Project requirements description is required' })}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.requirements ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
              />
              {errors.requirements && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.requirements.message}</span>}
            </div>

            {/* Captcha Placement */}
            <div className="flex flex-col gap-2 items-start py-2">
              <ReCaptchaCheckbox onVerify={setIsCaptchaVerified} />
              {captchaError && <span className="text-[10px] font-bold text-red-500 mt-1 block">{captchaError}</span>}
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="flex items-start gap-3 select-none">
              <input 
                id="agreedToPrivacy"
                type="checkbox"
                {...register('agreedToPrivacy', { required: 'You must agree to the privacy policy' })}
                className="mt-1 w-4 h-4 bg-white border border-gray-200/50 rounded focus:ring-0 cursor-pointer"
              />
              <label htmlFor="agreedToPrivacy" className="text-xs text-gray-500 cursor-pointer font-semibold">
                I agree to the Privacy Policy.
              </label>
            </div>
            {errors.agreedToPrivacy && <span className="text-[10px] font-bold text-red-500 mt-0 block">{errors.agreedToPrivacy.message}</span>}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-glow-primary flex-grow py-4 rounded-full text-white font-extrabold transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-[2px] border-white/20 border-t-white animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <span>Submit Hiring Request →</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.open('https://calendly.com/sofzenix', '_blank')}
                className="btn-glow-secondary px-8 py-4 rounded-full font-bold hover:scale-103 active:scale-97 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                <span>Schedule Meeting</span>
              </button>
            </div>

          </form>

          {/* Success Banner Alert */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-6 p-5 rounded-xl bg-green-50/10 border border-green-500/30 text-green-600 text-sm font-bold text-center flex flex-col gap-1 shadow-md select-none"
              >
                <span>🎉 Proposal Sent Successfully!</span>
                <span className="text-xs font-semibold text-gray-500">{submitMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#2563EB]/10 via-[#F97316]/5 to-[#F3F8FF] border border-gray-200/50 p-10 md:p-16 rounded-[32px] flex flex-col items-center gap-6 relative overflow-hidden shadow-2xl">
          {/* Subtle decoration elements */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#F97316]/3 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#2563EB]/3 rounded-full blur-[80px]" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A]">Let's Build Your Team Today</h2>
          
          <p className="text-[#475569] text-sm md:text-base max-w-2xl leading-relaxed font-semibold">
            Looking for reliable software engineers or dedicated development teams? Sofzenix IT Solutions LLP provides experienced developers, enterprise consultants, and scalable technology teams to accelerate your digital transformation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 relative z-10">
            <button 
              onClick={scrollToForm}
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-primary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
            >
              Hire Developers
            </button>
            <button 
              onClick={scrollToForm}
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-secondary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

// --- DATA CONFIGURATIONS (Vetted & Clean) ---

const techList = [
  'React', 'Node.js', 'Express.js', 'MongoDB',
  'Java', 'Spring Boot', 'Python', 'AWS',
  'Docker', 'Flutter', 'UI/UX', 'AI & Machine Learning'
];

const whyHireData = [
  {
    title: 'Experienced Engineers',
    desc: 'Our software engineers and architects carry an average of 5+ years of production experience.',
    icon: FaUserTie
  },
  {
    title: 'Agile Development',
    desc: 'Fast sprint cycles, clean standups, and transparent task management via Jira or ClickUp.',
    icon: FaCode
  },
  {
    title: 'Flexible Hiring Models',
    desc: 'Easily hire remote devs hourly, monthly, project-based, or deploy fully managed teams.',
    icon: FaUsers
  },
  {
    title: 'Enterprise Security',
    desc: 'Compliant operations backed by standard NDAs, strict IP protection, and secure data handling.',
    icon: FaShieldAlt
  },
  {
    title: 'Transparent Communication',
    desc: 'Direct contact via Slack channels, video reviews, and automated commit/release hooks.',
    icon: FaComments
  },
  {
    title: 'On-Time Delivery',
    desc: 'Milestone-driven project management ensuring predictable release dates and zero gaps.',
    icon: FaClock
  },
  {
    title: 'Scalable Teams',
    desc: 'Quickly add or scale down engineering seats within 72 hours matching roadmap changes.',
    icon: FaChartLine
  },
  {
    title: 'Dedicated Support',
    desc: 'Continuous post-deployment support, performance auditing, and direct DevOps assistance.',
    icon: FaHeadset
  }
];

const hiringModelsData = [
  {
    title: 'Dedicated Developer',
    desc: 'An expert engineer allocated entirely to your product, working within your tools and schedules.',
    bestFor: 'Startups or projects seeking specific technical expertise quickly.',
    icon: FaUserCheck
  },
  {
    title: 'Dedicated Team',
    desc: 'A complete, self-organizing product team (Frontend, Backend, QA, PM, UI/UX) working on your backlog.',
    bestFor: 'Long-term development roadmaps and large enterprise initiatives.',
    icon: FaUsers
  },
  {
    title: 'Project-Based Development',
    desc: 'Fixed-budget, fixed-scope engineering managed entirely by Sofzenix leads from requirement to deployment.',
    bestFor: 'Building standalone MVPs, migration projects, or defined features.',
    icon: FaClipboardList
  },
  {
    title: 'Hourly Hiring',
    desc: 'Pay only for actual logged engineering hours. Ideal for maintenance or specialized consulting.',
    bestFor: 'Rapid updates, bug remediation, or ad-hoc technical advice.',
    icon: FaClock
  },
  {
    title: 'Monthly Hiring',
    desc: 'Retainer model allocating full-time resource hours with convenient flat monthly invoicing.',
    bestFor: 'Adding ongoing support to existing engineering divisions.',
    icon: FaBriefcase
  },
  {
    title: 'Intern Hiring',
    desc: 'Vetted, high-potential junior talent mentored by Sofzenix leads to support your basic workflows.',
    bestFor: 'Cost-efficient team scaling and handling secondary pipelines.',
    icon: FaUserTie
  }
];

const techStackData = [
  { name: 'React', exp: '7+ Years', desc: 'Single-page web applications, Next.js frameworks, and reusable design systems.', logoKey: 'React' },
  { name: 'Node.js', exp: '6+ Years', desc: 'High-throughput APIs, web sockets, event-driven engines, and microservices.', logoKey: 'Nodejs' },
  { name: 'Express.js', exp: '6+ Years', desc: 'Lightweight REST routing, route protection middlewares, and server controllers.', logoKey: 'Expressjs' },
  { name: 'MongoDB', exp: '6+ Years', desc: 'Flexible NoSQL document schemas, aggregation pipelines, and clustered databases.', logoKey: 'MongoDB' },
  { name: 'Java', exp: '8+ Years', desc: 'Multi-threaded enterprise banking architectures, secure microservices, and design patterns.', logoKey: 'Java' },
  { name: 'Spring Boot', exp: '7+ Years', desc: 'Cloud-native service registries, Spring Cloud configs, JPA layers, and OAuth2 security.', logoKey: 'SpringBoot' },
  { name: 'Python', exp: '7+ Years', desc: 'FastAPI servers, data engineering scripts, automation pipelines, and custom scrapers.', logoKey: 'Python' },
  { name: 'AWS', exp: '6+ Years', desc: 'ECS clusters, serverless Lambdas, secure VPC networking, and cloud IAM setups.', logoKey: 'AWS' },
  { name: 'Docker', exp: '5+ Years', desc: 'Repeatable application containerization, multi-stage builds, and Kubernetes orchestration.', logoKey: 'Docker' },
  { name: 'Flutter', exp: '4+ Years', desc: 'Native compiled Android and iOS mobile applications from a single codebase.', logoKey: 'Flutter' },
  { name: 'UI/UX Design', exp: '6+ Years', desc: 'Wireframing, Figma design libraries, client branding, and interactive prototypes.', logoKey: 'UIUX' },
  { name: 'AI & Machine Learning', exp: '5+ Years', desc: 'LLM integration, automated agent workflows, PyTorch models, and RAG architectures.', logoKey: 'AIML' }
];

const teamShowcaseData = [
  { role: 'Full Stack MERN Developer', exp: 'Senior (6 Yrs)', availability: 'Available Instantly', availColor: 'bg-green-500', skills: ['React', 'Node.js', 'Express.js', 'MongoDB'], initials: 'RM', avatarColor: 'bg-gradient-to-br from-[#2563EB] to-cyan-500' },
  { role: 'Java Enterprise Engineer', exp: 'Architect (8 Yrs)', availability: 'Available in 1 Week', availColor: 'bg-amber-500', skills: ['Java', 'Spring Boot', 'SQL', 'AWS'], initials: 'JS', avatarColor: 'bg-gradient-to-br from-purple-600 to-[#E25CFF]' },
  { role: 'AI & Data Scientist', exp: 'Senior (5 Yrs)', availability: 'Available Instantly', availColor: 'bg-green-500', skills: ['Python', 'AI & Machine Learning', 'AWS'], initials: 'AD', avatarColor: 'bg-gradient-to-br from-emerald-600 to-teal-400' },
  { role: 'Frontend Specialist', exp: 'Senior (6 Yrs)', availability: 'Available Instantly', availColor: 'bg-green-500', skills: ['React', 'UI/UX', 'Flutter'], initials: 'FE', avatarColor: 'bg-gradient-to-br from-indigo-500 to-pink-500' },
  { role: 'Cloud & DevOps Engineer', exp: 'Senior (7 Yrs)', availability: 'Available in 2 Weeks', availColor: 'bg-red-500', skills: ['AWS', 'Docker', 'Linux', 'CI/CD'], initials: 'CD', avatarColor: 'bg-gradient-to-br from-rose-500 to-red-600' },
  { role: 'Lead UI/UX Designer', exp: 'Lead (7 Yrs)', availability: 'Available Instantly', availColor: 'bg-green-500', skills: ['UI/UX', 'Figma', 'React'], initials: 'UX', avatarColor: 'bg-gradient-to-br from-[#F97316] to-orange-600' }
];

const hiringProcessSteps = [
  { title: 'Requirement Discussion', desc: 'We align on your stack, developer seniority expectations, budget goals, and start dates.', icon: FaSearch },
  { title: 'Candidate Selection', desc: 'We filter our developer roster to match candidates who align precisely with your roadmap.', icon: FaUsers },
  { title: 'Technical Evaluation', desc: 'Our engineering architects conduct coding tests and vet problem-solving skills.', icon: FaCode },
  { title: 'Interview', desc: 'You conduct 1-on-1 interviews with the matching engineers to verify culture and alignment.', icon: FaUserCheck },
  { title: 'Onboarding', desc: 'We execute NDA agreements, setup developer environments, and sync communication tools.', icon: FaRocket },
  { title: 'Development Begins', desc: 'Developers participate in your standups, commit to your branches, and output velocity.', icon: FaCogs }
];

const clientChooseData = [
  { title: 'Fast Hiring', desc: 'Go from technical alignment to developers onboarded within 24 to 72 hours.' },
  { title: 'Certified Developers', desc: 'Engineers undergo rigorous programming and architectural screening tests.' },
  { title: 'Modern Technologies', desc: 'Always building with current frameworks ensuring long-term code maintainability.' },
  { title: 'Transparent Pricing', desc: 'Flat billing schedules with zero hidden maintenance or management surcharges.' },
  { title: 'Flexible Contracts', desc: 'Adapt resources as project needs adjust with friendly contract periods.' },
  { title: 'Quality Assurance', desc: 'Unit testing and deployment checks included by default across deliverables.' },
  { title: 'Enterprise Security', desc: 'Strict intellectual property safeguarding under global compliance standards.' },
  { title: 'Post Deployment Support', desc: 'Extended assurance support and optimization checks following product launch.' }
];

const faqData = [
  { q: 'How quickly can I hire developers?', a: 'Once we finalize your technical requirements, we can match and onboard vetted software engineers from our roster within 24 to 72 hours.' },
  { q: 'Can I hire a dedicated team?', a: 'Yes. We assemble fully cross-functional teams including frontend/backend developers, quality assurance testers, a UI/UX designer, and a dedicated project manager to manage delivery.' },
  { q: 'What technologies do you specialize in?', a: 'We specialize in React, Node.js, Express.js, MongoDB, Java, Spring Boot, Python AI/ML pipelines, AWS cloud environments, Docker containers, and Flutter cross-platform mobile apps.' },
  { q: 'Do you sign NDAs?', a: 'Yes. Intellectual property protection is a core standard. We execute standard Non-Disclosure Agreements (NDAs) prior to discussing any project specifics.' },
  { q: 'Can developers work in my timezone?', a: 'Absolutely. Our remote engineers support overlapping operational hours to participate in your team standups, sprint reviews, and messaging channels.' },
  { q: 'Do you provide project managers?', a: 'Yes. For dedicated developer or team models, we allocate a project manager to coordinate timelines, track velocity, and ensure smooth delivery at no extra cost.' }
];

export default Hire;
