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

// Official inline SVG logo for RazorpayX formatted for dark mode support.
const RazorpayXLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 125 27" className="h-[18px] md:h-[24px] w-auto max-w-full select-none">
    <path d="M 8.085 7.03 L 7.046 10.868 L 12.99 7.008 L 9.103 21.571 L 13.05 21.575 L 18.793 0.064" fill="rgb(51,149,255)"></path>
    <path d="M 1.688 15.452 L 0.053 21.574 L 8.144 21.574 L 11.455 9.12 Z M 29.794 10.062 C 29.596 10.8 29.215 11.342 28.647 11.689 C 28.08 12.034 27.284 12.208 26.257 12.208 L 22.994 12.208 L 24.14 7.918 L 27.403 7.918 C 28.429 7.918 29.134 8.09 29.516 8.441 C 29.898 8.792 29.991 9.328 29.794 10.069 Z M 33.173 9.977 C 33.588 8.428 33.417 7.236 32.658 6.402 C 31.899 5.574 30.569 5.157 28.67 5.157 L 21.387 5.157 L 17.003 21.582 L 20.541 21.582 L 22.308 14.962 L 24.629 14.962 C 25.15 14.962 25.56 15.048 25.859 15.213 C 26.159 15.385 26.335 15.683 26.389 16.113 L 27.021 21.582 L 30.812 21.582 L 30.197 16.484 C 30.072 15.346 29.553 14.677 28.641 14.478 C 29.803 14.141 30.777 13.578 31.562 12.797 C 32.341 12.021 32.897 11.05 33.173 9.983 Z M 41.774 15.703 C 41.477 16.815 41.022 17.656 40.407 18.245 C 39.792 18.834 39.056 19.126 38.197 19.126 C 37.323 19.126 36.731 18.841 36.417 18.265 C 36.104 17.689 36.093 16.855 36.384 15.763 C 36.676 14.67 37.141 13.816 37.78 13.201 C 38.42 12.585 39.167 12.277 40.026 12.277 C 40.883 12.277 41.469 12.575 41.766 13.166 C 42.069 13.76 42.076 14.609 41.779 15.715 Z M 43.325 9.891 L 42.882 11.552 C 42.691 10.956 42.319 10.48 41.771 10.122 C 41.221 9.771 40.541 9.593 39.729 9.593 C 38.734 9.593 37.778 9.851 36.861 10.367 C 35.945 10.884 35.14 11.612 34.455 12.552 C 33.769 13.492 33.268 14.558 32.945 15.756 C 32.629 16.961 32.563 18.014 32.754 18.927 C 32.952 19.847 33.367 20.549 34.007 21.039 C 34.653 21.535 35.477 21.78 36.485 21.78 C 37.287 21.784 38.079 21.61 38.806 21.271 C 39.525 20.945 40.164 20.466 40.678 19.867 L 40.217 21.599 L 43.639 21.599 L 46.763 9.897 L 43.335 9.897 Z M 59.059 9.891 L 49.108 9.891 L 48.412 12.499 L 54.202 12.499 L 46.548 19.139 L 45.894 21.588 L 56.166 21.588 L 56.861 18.98 L 50.657 18.98 L 58.429 12.241 Z M 67.817 15.683 C 67.509 16.835 67.052 17.701 66.449 18.265 C 65.846 18.834 65.115 19.119 64.258 19.119 C 62.464 19.119 61.875 17.974 62.487 15.683 C 62.79 14.545 63.249 13.689 63.862 13.112 C 64.475 12.533 65.218 12.245 66.092 12.245 C 66.949 12.245 67.528 12.531 67.826 13.109 C 68.124 13.685 68.121 14.543 67.817 15.682 Z M 69.82 10.331 C 69.032 9.838 68.027 9.592 66.8 9.592 C 65.559 9.592 64.41 9.837 63.352 10.327 C 62.299 10.814 61.374 11.54 60.649 12.449 C 59.904 13.37 59.368 14.449 59.039 15.68 C 58.716 16.907 58.677 17.984 58.927 18.906 C 59.178 19.826 59.705 20.534 60.496 21.024 C 61.294 21.518 62.309 21.764 63.555 21.764 C 64.782 21.764 65.922 21.516 66.971 21.024 C 68.019 20.529 68.915 19.825 69.66 18.899 C 70.405 17.976 70.939 16.899 71.269 15.668 C 71.599 14.437 71.638 13.362 71.388 12.437 C 71.137 11.517 70.616 10.809 69.832 10.316 Z M 82.035 13.017 L 82.912 9.832 C 82.615 9.68 82.226 9.601 81.739 9.601 C 80.954 9.601 80.202 9.795 79.477 10.19 C 78.854 10.525 78.323 10.997 77.875 11.589 L 78.33 9.875 L 77.337 9.879 L 74.897 9.879 L 71.752 21.576 L 75.222 21.576 L 76.854 15.461 C 77.091 14.572 77.519 13.873 78.135 13.376 C 78.748 12.878 79.513 12.628 80.436 12.628 C 81.003 12.628 81.53 12.758 82.031 13.019 Z M 91.69 15.74 C 91.393 16.832 90.945 17.666 90.332 18.242 C 89.719 18.821 88.98 19.109 88.123 19.109 C 87.266 19.109 86.679 18.818 86.369 18.235 C 86.053 17.649 86.046 16.805 86.343 15.696 C 86.64 14.587 87.095 13.736 87.721 13.147 C 88.347 12.553 89.086 12.257 89.943 12.257 C 90.787 12.257 91.354 12.561 91.657 13.177 C 91.96 13.793 91.967 14.647 91.675 15.739 Z M 94.101 10.35 C 93.459 9.834 92.638 9.575 91.642 9.575 C 90.77 9.575 89.939 9.774 89.15 10.175 C 88.362 10.576 87.723 11.122 87.232 11.813 L 87.244 11.734 L 87.826 9.873 L 84.437 9.873 L 83.573 13.111 L 83.547 13.223 L 79.987 26.559 L 83.461 26.559 L 85.255 19.846 C 85.433 20.443 85.795 20.912 86.349 21.251 C 86.903 21.588 87.586 21.756 88.399 21.756 C 89.408 21.756 90.371 21.511 91.284 21.021 C 92.2 20.53 92.991 19.823 93.664 18.899 C 94.336 17.996 94.835 16.936 95.154 15.738 C 95.477 14.538 95.543 13.467 95.358 12.531 C 95.17 11.593 94.754 10.866 94.112 10.353 Z M 105.626 15.692 C 105.33 16.797 104.875 17.645 104.262 18.227 C 103.648 18.814 102.91 19.106 102.053 19.106 C 101.176 19.106 100.583 18.821 100.273 18.245 C 99.957 17.669 99.95 16.835 100.24 15.743 C 100.53 14.65 100.993 13.796 101.632 13.181 C 102.272 12.565 103.02 12.258 103.879 12.258 C 104.736 12.258 105.316 12.556 105.619 13.145 C 105.922 13.736 105.924 14.586 105.629 15.694 Z M 107.176 9.876 L 106.732 11.538 C 106.541 10.939 106.172 10.462 105.624 10.108 C 105.071 9.754 104.391 9.578 103.581 9.578 C 102.585 9.578 101.624 9.836 100.706 10.353 C 99.79 10.869 98.985 11.593 98.3 12.531 C 97.614 13.468 97.113 14.537 96.79 15.735 C 96.47 16.938 96.408 17.992 96.599 18.91 C 96.792 19.823 97.208 20.529 97.851 21.022 C 98.493 21.511 99.322 21.759 100.33 21.759 C 101.141 21.759 101.916 21.59 102.651 21.249 C 103.368 20.922 104.005 20.443 104.057 21.577 L 107.479 21.577 L 110.603 9.879 L 107.181 9.879 Z M 124.968 9.88 L 124.97 9.877 L 122.867 9.877 C 122.799 9.877 122.74 9.88 122.679 9.881 L 121.588 9.881 L 121.027 10.663 L 120.889 10.848 L 120.829 10.941 L 116.396 17.142 L 115.479 9.88 L 111.848 9.88 L 113.687 20.916 L 109.626 26.563 L 113.246 26.563 L 114.228 25.164 C 114.256 25.123 114.281 25.088 114.314 25.045 L 115.461 23.41 L 115.494 23.363 L 120.632 16.048 L 124.963 9.891 L 124.97 9.887 L 124.968 9.887 Z" fill="#FFFFFF"></path>
  </svg>
);

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

  const partnersList = [
    // Government & Regulatory Body
    {
      name: 'AICTE',
      cat: 'skills',
      logo: null,
      desc: 'Officially recognized by AICTE as an approved internship provider, empowering students with free, quality tech internships.',
      url: 'https://aicte-india.org'
    },
    // Learning & Skill Development
    { 
      name: 'SkillStation', 
      cat: 'skills', 
      logo: null, 
      desc: 'Joint professional lab frameworks, vocational training, and placement pipelines.', 
      url: '#' 
    },
    { 
      name: 'iBirds Services', 
      cat: 'business', 
      logo: 'https://www.ibirdsservices.com/wp-content/uploads/2024/01/ibirds-logo1-852x1024-1-1.png', 
      desc: 'Optimizing customer experience workflows and Salesforce cloud development.', 
      url: 'https://www.ibirdsservices.com' 
    },
    { 
      name: 'BensxDigi Marketing Pvt. Ltd.', 
      cat: 'business', 
      logo: null, 
      desc: 'Enterprise marketing automation, lead aggregation, and brand placement.', 
      url: '#' 
    },
    { 
      name: 'Razorpay', 
      cat: 'finance', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg', 
      desc: 'Powering seamless checkout gateways and client payment flows.', 
      url: 'https://razorpay.com' 
    },
    { 
      name: 'RazorpayX', 
      cat: 'finance', 
      logo: RazorpayXLogo, 
      desc: 'Providing secure business payouts, ledger tools, and banking nodes.', 
      url: 'https://razorpay.com/x/' 
    },
    { 
      name: 'SB-S3 Hirewise Solutions', 
      cat: 'business', 
      logo: null, 
      desc: 'Strategic recruitment services and high-scale talent placement networks.', 
      url: '#' 
    },
    { 
      name: 'Maranatha Innovations', 
      cat: 'tech', 
      logo: null, 
      desc: 'Delivering smart business analytics engines and cloud products.', 
      url: '#' 
    },
    { 
      name: 'Modern Tek', 
      cat: 'tech', 
      logo: 'https://catalog.wlimg.com/1/11319636/other-images/12577-comp-image.png', 
      desc: 'Pioneering bespoke microservices integrations and data pipelines.', 
      url: 'https://www.modern-tek.co.in' 
    },
    { 
      name: 'Unlox', 
      cat: 'tech', 
      logo: 'https://unlox.com/_next/static/media/Logo.60437b6e.png', 
      desc: 'Providing unified data access control keys and authorization gates.', 
      url: 'https://unlox.com' 
    },
    { 
      name: 'Vetrix', 
      cat: 'tech', 
      logo: 'https://vetrixdigital.com/wp-content/uploads/2025/06/Vetrix-Logo-Color-Web-min.png', 
      desc: 'Advanced virtualization platforms and secure DevOps paradigms.', 
      url: 'https://vetrixdigital.com' 
    },
    { 
      name: 'Launched Global', 
      cat: 'business', 
      logo: 'https://launchedglobal.in/logo.png', 
      desc: 'Global market expansion strategies and startup incubation support.', 
      url: 'https://launchedglobal.in' 
    },
    { 
      name: 'ET Supercom', 
      cat: 'tech', 
      logo: null, 
      desc: 'Engineering telecommunication networks and secure routing gateways.', 
      url: '#' 
    },
    { 
      name: 'Learn2Gain', 
      cat: 'skills', 
      logo: null, 
      desc: 'E-learning portals delivering containerized sandbox developer courses.', 
      url: '#' 
    },
    { 
      name: 'Learnstract', 
      cat: 'skills', 
      logo: null, 
      desc: 'Corporate skill development bootcamps and structural certifications.', 
      url: '#' 
    },
    { 
      name: 'SkillOrbit', 
      cat: 'skills', 
      logo: 'https://skillorbit.com/assets/img/logo/sko-logo-v2-blue.png', 
      desc: 'Competency management systems and custom learning pathways.', 
      url: 'https://skillorbit.com' 
    },
    { 
      name: 'DigiLocker', 
      cat: 'infra', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/DigiLocker.svg', 
      desc: 'National digital documentation vault APIs for safe credential storage.', 
      url: 'https://digilocker.gov.in' 
    },
    { 
      name: 'Apex Skill Technologies', 
      cat: 'skills', 
      logo: null, 
      desc: 'Engineering assessment portals and coding skill verification tools.', 
      url: 'https://apexskilltech.com' 
    },
    { 
      name: 'Zennise Digitech', 
      cat: 'tech', 
      logo: null, 
      desc: 'Mastering IoT sensor ecosystems and real-time dashboard telemetry.', 
      url: '#' 
    },
    { 
      name: 'HostingRaja', 
      cat: 'infra', 
      logo: 'https://image.hostingraja.in/images/logo/mobile-menu-logo.webp', 
      desc: 'High-performance cloud servers, managed hosting, and SSD nodes.', 
      url: 'https://hostingraja.in' 
    },
    { 
      name: 'Vedxlence Innovation', 
      cat: 'business', 
      logo: null, 
      desc: 'Business strategy consulting and operational governance modeling.', 
      url: '#' 
    }
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
      <section className="py-12 bg-gray-100/[0.02] border-b border-gray-200/10 overflow-hidden select-none relative z-10">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
        
        <div className="flex w-[200%] animate-marquee">
          {/* First loop */}
          <div className="flex justify-around items-center min-w-full gap-8">
            {partnersList.map((partner, idx) => {
              return (
                <div key={`m1-${idx}`} className="opacity-30 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer px-6 flex items-center h-10 select-none">
                  {typeof partner.logo === 'function' ? (
                    <partner.logo />
                  ) : partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="h-full w-auto object-contain max-w-[120px] select-none filter brightness-105" 
                    />
                  ) : (
                    <span className="text-xs font-black uppercase tracking-widest text-[#2563EB]">{partner.name}</span>
                  )}
                </div>
              );
            })}
          </div>
          {/* Second identical loop for seamless scroll */}
          <div className="flex justify-around items-center min-w-full gap-8">
            {partnersList.map((partner, idx) => {
              return (
                <div key={`m2-${idx}`} className="opacity-30 hover:opacity-90 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer px-6 flex items-center h-10 select-none">
                  {typeof partner.logo === 'function' ? (
                    <partner.logo />
                  ) : partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="h-full w-auto object-contain max-w-[120px] select-none filter brightness-105" 
                    />
                  ) : (
                    <span className="text-xs font-black uppercase tracking-widest text-[#2563EB]">{partner.name}</span>
                  )}
                </div>
              );
            })}
          </div>
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
                  <div className="px-6 py-3 bg-[#F3F8FF] border border-[#2563EB]/10 rounded-xl select-none">
                    <span className="text-lg font-black uppercase tracking-widest text-[#2563EB]">SKILLSTATION</span>
                  </div>
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
