import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaGlobe, 
  FaLaptopCode, 
  FaCloud, 
  FaBrain, 
  FaGraduationCap, 
  FaShieldAlt, 
  FaSearch, 
  FaPalette, 
  FaCode, 
  FaRocket, 
  FaLifeRing, 
  FaEye, 
  FaBullseye, 
  FaAward, 
  FaLinkedin, 
  FaCheckCircle,
  FaChevronRight,
  FaQuoteLeft,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaFacebook
} from 'react-icons/fa';

import ReCaptchaCheckbox from '../components/ReCaptchaCheckbox';
import Testimonials from '../components/Testimonials';

import founderImg from '../assets/founder.png';
const founderPublicImg = '/founder.png';
const officeAboutImg = '/office_about.jpg';
const iso27001Img = '/iso_27001.png';
const iso27701Img = '/iso_27701.png';
const iso9001Img  = '/iso_9001.png';

// --- MERN Verification Databases ---
const mockInternships = {
  "SFZ-INT-2023-908": {
    dob: "2001-08-15",
    name: "Jane Doe",
    type: "Web Development Internship",
    id: "SFZ-INT-2023-908",
    issueDate: "September 10, 2023",
    status: "Verified & Active",
    issuedBy: "Sofzenix IT Solutions LLP",
    downloadUrl: "#"
  },
  "SFZ-INT-2023-112": {
    dob: "1999-12-05",
    name: "Alex Smith",
    type: "UI/UX Design Internship",
    id: "SFZ-INT-2023-112",
    issueDate: "October 01, 2023",
    status: "Verified & Active",
    issuedBy: "Sofzenix IT Solutions LLP",
    downloadUrl: "#"
  }
};

const mockEmployees = {
  "SFZ-EMP-2042": {
    name: "Upputuri Sathish",
    type: "Founder & CEO",
    id: "SFZ-EMP-2042",
    issueDate: "January 01, 2023",
    status: "Active Employee",
    issuedBy: "Sofzenix IT Solutions LLP"
  },
  "SFZ-EMP-2043": {
    name: "John Smith",
    type: "Senior Software Engineer",
    id: "SFZ-EMP-2043",
    issueDate: "June 15, 2023",
    status: "Active Employee",
    issuedBy: "Sofzenix IT Solutions LLP"
  }
};

const whyChooseUs = [
  { title: 'Experienced Engineers', desc: 'A senior-focused development team versed in large scale deployments.' },
  { title: 'Enterprise Architecture', desc: 'Highly structured topologies built for data integrity and load scaling.' },
  { title: 'Scalable Solutions', desc: 'Modular microservices frameworks prepared for continuous updates.' },
  { title: 'Secure Development', desc: 'HIPAA and ISO aligned coding checkpoints guaranteeing database protection.' },
  { title: 'Modern Technology Stack', desc: 'Deploying robust systems using Java, Spring Boot, and MERN stacks.' },
  { title: 'Cloud Ready', desc: 'Containerized configurations prepared for instant AWS scale.' },
  { title: '24/7 Support', desc: 'Active server monitoring and post-launch SLA maintenance.' },
  { title: 'On-Time Delivery', desc: 'Rigid sprint milestones and clear communication cycles.' }
];

const certificates = [
  {
    id: 'iso-9001',
    title: 'ISO 9001:2015',
    subtitle: 'Quality Management System',
    img: iso9001Img
  },
  {
    id: 'iso-27001',
    title: 'ISO/IEC 27001:2022',
    subtitle: 'Information Security Management System',
    img: iso27001Img
  },
  {
    id: 'iso-27701',
    title: 'ISO/IEC 27701:2019',
    subtitle: 'Privacy Information Management System',
    img: iso27701Img
  }
];

// --- Custom SVGs ---
const TechIcons = {
  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-6 h-6 text-[#61DAFB]" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  Nodejs: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#339933]" fill="currentColor">
      <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm-1 15.5l-3.5-2v-4l3.5-2 3.5 2v4l-3.5 2z" />
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#47A248]" fill="currentColor">
      <path d="M12 1.5c-.3 0-.6.1-.8.3-2.5 2.1-4.7 5.1-4.7 8.7 0 4.1 2.2 7 4.7 8.5v3h1.6v-3c2.5-1.5 4.7-4.4 4.7-8.5 0-3.6-2.2-6.6-4.7-8.7-.2-.2-.5-.3-.8-.3zm0 15.2c-1.2 0-2.2-1.3-2.2-3.2 0-1.8 1-3.2 2.2-3.2s2.2 1.3 2.2 3.2c0 1.9-1 3.2-2.2 3.2z" />
    </svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#FF9900]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11c-2.1 1.2-5 1.5-7.5.8-.8-.2-1.5-.6-2-1.1L8.8 14c.8.8 2 1.3 3.2 1.5 2.6.4 5.5.1 7.7-.9l-.7-1.6zm.5-3.8c-.8.8-2 1.3-3.2 1.5-2.6.4-5.5.1-7.7-.9l.7-1.6c2.1 1.2 5 1.5 7.5.8 .8-.2 1.5-.6 2-1.1l1.7 1.3z" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#2496ED]" fill="currentColor">
      <path d="M13.9 11h2.2v2.2h-2.2V11zm-2.8 0h2.2v2.2h-2.2V11zm-2.8 0h2.2v2.2H8.3V11zm-2.8 0h2.2v2.2H5.5V11z" />
    </svg>
  )
};

// Canvas background particles
const BackgroundParticles = () => {
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
    const count = 35;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 2 + 0.8
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.08)';
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

// Confetti Emitter Canvas for success credential verification
const ConfettiCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    if (canvas.parentElement) {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    const colors = ['#2563EB', '#38BDF8', '#F97316', '#10B981', '#F59E0B'];
    const count = 75;
    const items = [];

    for (let i = 0; i < count; i++) {
      items.push({
        x: canvas.width / 2,
        y: canvas.height / 3,
        vx: (Math.random() - 0.5) * 7,
        vy: (Math.random() - 0.85) * 7 - 3,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        gravity: 0.15,
        opacity: 1
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = false;

      items.forEach(p => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.009;

        if (p.opacity > 0) {
          active = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          ctx.restore();
        }
      });

      if (active) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };
    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-30" />;
};

// Animated Stats Counter component
const StatsCounter = ({ to, duration = 1.5, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !triggered) {
        setTriggered(true);
        let start = 0;
        const end = parseInt(to);
        if (start === end) return;
        let incrementTime = Math.abs(Math.floor((duration * 1000) / end));
        let timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start === end) clearInterval(timer);
        }, incrementTime);
      }
    }, { threshold: 0.1 });
    if (counterRef.current) observer.observe(counterRef.current);
    return () => {
      if (counterRef.current) observer.unobserve(counterRef.current);
    };
  }, [to, triggered]);

  return <span ref={counterRef}>{count}{suffix}</span>;
};

// Custom interactive 3D Founder Card
const FounderCard = ({ image, name, title, message, quoteAuthor, link }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 16;
    const y = -(e.clientY - rect.top - rect.height / 2) / 16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: 'preserve-3d' }}
      whileHover={{ scale: 1.02 }}
      className="relative group bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[28px] p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center text-left shadow-md hover:shadow-2xl transition-all duration-300 cursor-default overflow-hidden"
    >
      {/* Accent Orange top indicator line */}
      <div className="absolute top-0 left-0 w-full h-[3.5px] bg-[#F97316]" />

      {/* Profile Photo Left - Link to Founder LinkedIn */}
      <a 
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View Founder LinkedIn Profile"
        className="w-full lg:w-[35%] flex-shrink-0 relative rounded-[20px] border border-gray-200/40 p-2.5 bg-white block hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(10,102,194,0.12)] transition-all duration-300 cursor-pointer overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <img 
          src={image} 
          alt={name} 
          className="w-full aspect-[4/3] lg:aspect-square object-cover rounded-xl brightness-[1.02] group-hover:scale-[1.03] transition-transform duration-300"
          style={{ display: 'block', minHeight: '200px', width: '100%' }}
        />
        {/* Glow behind image on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </a>

      {/* Info Profile Details Right */}
      <div className="flex-grow flex flex-col items-start gap-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase text-[#2563EB] tracking-widest bg-[#2563EB]/5 border border-[#2563EB]/15 px-3 py-1 rounded-full">{title}</span>
          
          {/* Linked Name and Verified Badge row */}
          <div className="flex items-center gap-3.5 mt-3 flex-wrap">
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Founder LinkedIn Profile"
              className="focus:outline-none"
            >
              <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] hover:text-[#0A66C2] hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.15)] transition-all duration-300 hover:-translate-y-[2px] cursor-pointer">
                {name}
              </h3>
            </a>

            <div className="flex items-center gap-2 relative">
              <a 
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Founder LinkedIn Profile"
                className="relative group/ln flex items-center justify-center p-1 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] rounded-full"
              >
                <span className="absolute inset-0 rounded-full bg-[#0A66C2]/15 animate-ping scale-110 pointer-events-none" />
                <FaLinkedin className="text-[#0F6FFF] hover:text-[#0A66C2] transition-colors duration-300 text-2xl hover:scale-115 hover:-translate-y-[1px] cursor-pointer" />
                
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 scale-95 group-hover/ln:opacity-100 group-hover/ln:scale-100 transition-all duration-200 bg-gray-900 text-white text-[9px] px-2.5 py-1 rounded-md shadow-md whitespace-nowrap z-30 pointer-events-none font-bold">
                  Connect on LinkedIn
                </span>
              </a>

              <span className="flex items-center justify-center text-[7px] font-black text-white bg-blue-500 rounded-full w-3.5 h-3.5 shadow-sm select-none border border-white" title="LinkedIn Verified Profile">
                ✓
              </span>
            </div>
          </div>
        </div>

        {/* Message quote box */}
        <div className="bg-white/80 border border-gray-200/40 rounded-2xl p-5 relative shadow-inner w-full">
          <FaQuoteLeft className="text-[#F97316]/20 text-3xl absolute top-3 left-3 pointer-events-none" />
          <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed italic relative z-10 pl-6">
            "{message}"
          </p>
          <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest text-right mt-3">— {quoteAuthor}</span>
        </div>

        {/* Action Link Row */}
        <div className="flex flex-wrap items-center justify-between gap-4 w-full border-t border-gray-100 pt-4 mt-1">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="View Founder LinkedIn Profile"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F3F8FF] border border-[#2563EB]/15 text-[#2563EB] text-xs font-bold hover:bg-[#2563EB] hover:text-white hover:border-transparent transition-all shadow-sm cursor-pointer"
          >
            <FaLinkedin className="text-sm" />
            <span>Connect on LinkedIn</span>
          </a>

          <div className="flex items-center gap-2.5">
            <a href="https://x.com/SoftechITSol" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2563EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5 hover:scale-110 transition-all">
              <FaTwitter className="text-xs" />
            </a>
            <a href="https://github.com/softechitsolution" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2563EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5 hover:scale-110 transition-all">
              <FaGithub className="text-xs" />
            </a>
            <a href="https://www.instagram.com/sofzenix_it_solutionsllp/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2563EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5 hover:scale-110 transition-all">
              <FaInstagram className="text-xs" />
            </a>
            <a href="https://www.facebook.com/people/Sofzenix-It-Solution/100094780795333/?rdid=hIi9DWPGLPoC5FVI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B7FRzxjo9%2F" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2563EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5 hover:scale-110 transition-all">
              <FaFacebook className="text-xs" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EcosystemVisualization = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 25;
    const y = (e.clientY - rect.top - rect.height / 2) / 25;
    setCoords({ x, y });
  };

  const handleMouseLeave = () => {
    setCoords({ x: 0, y: 0 });
  };

  const nodes = [
    { name: 'React', x: -80, y: -70, color: '#61DAFB', icon: <TechIcons.React />, desc: 'Frontend UI Platform' },
    { name: 'NodeJS', x: 80, y: -70, color: '#339933', icon: <TechIcons.Nodejs />, desc: 'High-Concurrency Runtime' },
    { name: 'MongoDB', x: -90, y: 60, color: '#47A248', icon: <TechIcons.MongoDB />, desc: 'NoSQL Document Store' },
    { name: 'AWS Cloud', x: 90, y: 60, color: '#FF9900', icon: <TechIcons.AWS />, desc: 'Elastic Cloud Infrastructure' },
    { name: 'Spring Boot', x: 0, y: 95, color: '#6DB33F', icon: <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#6DB33F]" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>, desc: 'Enterprise Business Logic' }
  ];

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[420px] aspect-[4/3] bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[28px] shadow-2xl p-6 relative flex flex-col justify-between overflow-hidden select-none"
    >
      <div className="absolute top-3 left-4 bg-gray-100/80 border border-gray-200/25 px-2.5 py-0.5 rounded text-[8px] font-extrabold font-mono tracking-widest uppercase text-gray-500 z-20">Ecosystem Network</div>
      
      <div className="flex-grow flex items-center justify-center relative">
        {/* Connection Path Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 300">
          {nodes.map((node, i) => (
            <motion.line
              key={i}
              x1="200"
              y1="150"
              x2={200 + node.x}
              y2={150 + node.y}
              stroke="#2563EB"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          ))}
        </svg>

        {/* Center Node */}
        <motion.div 
          style={{ x: coords.x * 0.5, y: coords.y * 0.5 }}
          className="w-20 h-20 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/35 flex items-center justify-center shadow-lg relative z-10 cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-[#2563EB]/5 animate-ping opacity-75" />
          <FaLaptopCode className="text-[#2563EB] text-3xl" />
        </motion.div>

        {/* Floating tech nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.name}
            style={{ 
              x: coords.x * 1.2 + node.x, 
              y: coords.y * 1.2 + node.y 
            }}
            whileHover={{ scale: 1.15, zIndex: 30 }}
            className="absolute w-12 h-12 rounded-full bg-white border border-gray-200/40 shadow-lg flex items-center justify-center cursor-pointer group"
          >
            {node.icon}
            
            {/* Tooltip on Hover */}
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-extrabold px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 shadow-md transition-all duration-300 w-36 text-center z-50 border border-white/10">
              <div className="font-bold text-white mb-0.5">{node.name}</div>
              <div className="text-gray-400 font-semibold">{node.desc}</div>
              <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45 border-r border-b border-white/10" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const About = () => {
  const [activeCert, setActiveCert] = useState(null);
  const [activeTab, setActiveTab] = useState('internship');
  const [certNum, setCertNum] = useState('');
  const [dob, setDob] = useState('');
  const [empId, setEmpId] = useState('');
  const [empName, setEmpName] = useState('');
  const [captchaChecked, setCaptchaChecked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#verify-credentials') {
      const timer = setTimeout(() => {
        const element = document.getElementById('verify-credentials');
        if (element) {
          const offset = 90;
          const duration = 850;
          const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          let startTime = null;

          const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
          };

          const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutCubic(Math.min(timeElapsed / duration, 1));
            window.scrollTo(0, startPosition + distance * run);
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          };

          requestAnimationFrame(animation);
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  const handleVerify = (e) => {
    e.preventDefault();
    setFormError('');
    setResult(null);

    if (!captchaChecked) {
      setFormError('Please complete the reCAPTCHA verification.');
      return;
    }

    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      if (activeTab === 'internship') {
        const cert = mockInternships[certNum.trim().toUpperCase()];
        if (cert && cert.dob === dob) {
          setResult({ success: true, type: 'internship', data: cert });
        } else {
          setResult({ success: false });
        }
      } else {
        const emp = mockEmployees[empId.trim().toUpperCase()];
        if (emp) {
          if (empName.trim() && !emp.name.toLowerCase().includes(empName.trim().toLowerCase())) {
            setResult({ success: false });
          } else {
            setResult({ success: true, type: 'employee', data: emp });
          }
        } else {
          setResult({ success: false });
        }
      }
    }, 1500);
  };

  return (
    <div className="bg-transparent min-h-screen text-[#475569] select-none relative overflow-hidden">
      
      {/* Shifting background aurora mesh gradients */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="mesh-blob mesh-blob-1 -left-[10%] -top-[10%] opacity-25" />
        <div className="mesh-blob mesh-blob-2 -right-[15%] top-[25%] opacity-30" />
        <div className="mesh-blob mesh-blob-3 left-[20%] -bottom-[15%] opacity-25" />
      </div>

      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />
      <BackgroundParticles />

      {/* ==================================================
          1. HERO SECTION (Fade Up + Blur Staged)
          ================================================== */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-32 pb-16 px-6 md:px-8 border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Details */}
          <motion.div 
            initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className="lg:col-span-7 text-left flex flex-col items-start"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-6 backdrop-blur-md">
              ABOUT SOFZENIX
            </div>
            
            <h1 className="text-3.5xl sm:text-4.5xl md:text-5.5xl font-extrabold tracking-tight text-[#0F172A] mb-6 leading-[1.2] flex flex-col gap-1">
              <span>Engineering Innovation.</span>
              <span className="animate-brand-gradient">Building Digital Excellence.</span>
            </h1>
            
            <p className="text-[#475569] text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed font-semibold">
              Sofzenix IT Solutions LLP builds scalable software, enterprise solutions, cloud platforms, and AI-powered applications that help businesses innovate and grow.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2 w-full sm:w-auto">
              <Link 
                to="/contact" 
                className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#38BDF8] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto overflow-hidden group hover:scale-105"
              >
                <span>Book Consultation</span>
                <FaArrowRight className="text-xs text-white/80 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
              <Link 
                to="/portfolio" 
                className="group px-8 py-3.5 rounded-full text-sm font-bold text-[#2563EB] bg-white border border-[#2563EB]/15 hover:bg-[#2563EB] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto hover:scale-105 shadow-sm"
              >
                <span>Explore Portfolio</span>
                <FaArrowRight className="text-xs text-[#2563EB]/60 group-hover:translate-x-1.5 transition-transform duration-300 group-hover:text-white" />
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-5 flex justify-center relative min-h-[300px]"
          >
            <EcosystemVisualization />
          </motion.div>
        </div>
      </section>

      {/* ==================================================
          2. COMPANY STORY (Slide Left Staged)
          ================================================== */}
      <section id="story" className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Company Story Text */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.75 }}
            className="lg:col-span-7 text-left"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-6 leading-tight">
              A Culture Built to Rise, <br />
              Evolve, and Innovate
            </h2>
            
            <p className="text-[#475569] text-xs sm:text-sm md:text-base leading-relaxed mb-6 font-semibold">
              Founded on the pillars of technical precision and agile scalability, Sofzenix is engineered to bring balanced, smart, and innovative solutions to the technology ecosystem. The name itself reflects our foundational goal: to rise continuously above software complexities, to evolve alongside modern frameworks, and to build strategic cloud products that yield sustained digital growth.
            </p>
            
            <p className="text-[#475569] text-xs sm:text-sm md:text-base leading-relaxed mb-8 font-semibold">
              We collaborate closely with startups and corporate entities to construct bespoke backend structures, responsive design interfaces, and reliable data gateways. By maintaining strict ISO quality guidelines, we ensure that every system deployed is optimized for performance, accessibility, and high data security.
            </p>

            {/* Sub-quote block */}
            <div className="border-l-[3.5px] border-[#2563EB] pl-4 text-xs md:text-sm text-gray-500 font-extrabold italic max-w-xl bg-[#F3F8FF] py-3 pr-3 rounded-r-xl">
              "Sofzenix represents a balanced, smart corporate division structured to innovate, rise above engineering limitations, and build next-generation applications."
            </div>
          </motion.div>

          {/* Vertical scroll timeline story (5 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left relative pl-8 border-l border-gray-200/20">
            {/* Full-height gradient line */}
            <div className="absolute left-[-1.5px] top-0 w-[3px] h-full bg-gradient-to-b from-[#2563EB] via-[#F97316] to-[#38BDF8] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.3)]" />

            {[
              { year: "2020", title: "Company Started", desc: "Formed Sofzenix IT Solutions LLP to deliver structured client services." },
              { year: "2021", title: "Client Acquisition", desc: "Delivered first batch of MERN custom corporate platforms." },
              { year: "2022", title: "Operations Expansion", desc: "Added Java Spring Boot and AWS cloud engineering pipelines." },
              { year: "2023", title: "Enterprise Partnerships", desc: "Launched SLA monitoring and system migrations programs." },
              { year: "2024", title: "ISO Certifications", desc: "Secured global ISO 9001, 27001, and 27701 credentials." },
              { year: "2025+", title: "Cognitive Future Vision", desc: "Pioneering intelligent workflow integrations and predictive systems." }
            ].map((node, nIdx) => (
              <motion.div
                key={node.year}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: nIdx * 0.08 }}
                whileHover={{ x: 6 }}
                className="relative group bg-white/60 backdrop-blur-md border border-gray-200/30 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-[#2563EB]/20 transition-all duration-300"
              >
                {/* Timeline Dot — centered on the gradient line */}
                {/* Container pl-8 = 32px. Line at left:-1.5px. Dot w-4 = 16px, half = 8px. */}
                {/* Dot left from card = -(32 - 1.5 + 8) ≈ -38.5px */}
                <div className="absolute -left-[38px] top-5 w-4 h-4 rounded-full bg-white border-[3px] border-[#2563EB] group-hover:border-[#F97316] group-hover:scale-125 transition-all duration-300 shadow-md flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] group-hover:bg-[#F97316] transition-colors" />
                </div>
                
                <span className="text-[10px] font-extrabold text-[#2563EB] group-hover:text-[#F97316] transition-colors tracking-widest uppercase block">{node.year}</span>
                <h4 className="text-xs font-extrabold text-[#0F172A] mt-1">{node.title}</h4>
                <p className="text-[#64748B] text-[10px] leading-relaxed mt-1.5 font-semibold">{node.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          3. MISSION, VISION, VALUES (3 glass cards)
          ================================================== */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              Mission, Vision & Core Values
            </h2>
            <p className="text-[#475569] text-sm font-semibold">
              The foundational principles guiding our software engineering and lifecycle management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Vision',
                desc: 'To stand as a globally recognized symbol of software craftsmanship, empowering businesses through robust AI engines, cloud integrations, and clean architectural design.',
                icon: FaEye,
                color: 'from-[#2563EB]/10 to-[#38BDF8]/10',
                border: 'hover:border-[#2563EB]/25'
              },
              {
                title: 'Mission',
                desc: 'To deliver scalable, secure IT solutions that resolve workflow complexities. We bridge standard objectives with functional code to drive customer success.',
                icon: FaBullseye,
                color: 'from-[#F97316]/10 to-[#FFA048]/10',
                border: 'hover:border-[#F97316]/25'
              },
              {
                title: 'Core Values',
                desc: 'An operating culture grounded in Innovation, Quality code craftsmanship, Transparency, Customer-First workflows, Governance, and continuous skilling loops.',
                icon: FaAward,
                color: 'from-[#10B981]/10 to-[#34D399]/10',
                border: 'hover:border-[#10B981]/25'
              }
            ].map((card, idx) => {
              const CardIcon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`bg-white/75 backdrop-blur-xl border border-gray-200/50 rounded-[24px] p-8 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 cursor-default ${card.border}`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-[#2563EB] mb-6 shadow-sm border border-gray-200/30 group`}>
                      <CardIcon className="text-xl group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-extrabold text-[#0F172A] mb-3">{card.title}</h3>
                    <p className="text-[#475569] text-xs font-semibold leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ==================================================
          4. FOUNDER SECTION (Slide Right Staged)
          ================================================== */}
      <section id="founder" className="py-24 px-6 md:px-8 relative z-10 overflow-hidden border-b border-gray-200/20">
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-[#2563EB]/3 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-[1200px] mx-auto relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-4">
              Leadership Board
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              Executive Message
            </h2>
            <p className="text-[#475569] text-sm font-semibold">
              Evolving digital solutions with security, velocity, and strict corporate governance.
            </p>
          </div>

          <div className="flex flex-col gap-8 max-w-4xl mx-auto">
            {/* CEO founder Card */}
            <motion.div
              initial={{ opacity: 0, x: 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <FounderCard 
                image={founderPublicImg}
                name="Upputuri Sathish"
                title="Founder & CEO"
                message="Our report highlights key achievements, addresses challenges with transparency, and sets forth our future strategy with a strong focus on Innovation, customer satisfaction, and sustainable growth. We remain committed to creating lasting value."
                quoteAuthor="FOUNDER & CEO"
                link="https://www.linkedin.com/in/upputuri-sathish-9a37a7354/"
              />
            </motion.div>

            {/* Message from Co-Founder and Directors Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-left">
              {/* Co-Founder Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#F97316]/50 rounded-t-[24px]" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F97316] block mb-3">Message from Co-Founder</span>
                  <p className="text-[#475569] text-xs font-semibold italic leading-relaxed">
                    "Our company was built on a foundation of innovation, integrity, and collaboration—driven by an unwavering passion to create exceptional value for our clients and inspire growth for our people."
                  </p>
                </div>
                <span className="block text-[9px] font-bold text-gray-500 text-right mt-4 uppercase tracking-widest">— CO-FOUNDER</span>
              </motion.div>

              {/* Directors Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[24px] p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 relative"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#2563EB]/50 rounded-t-[24px]" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB] block mb-3">Message from Directors</span>
                  <p className="text-[#475569] text-xs font-semibold italic leading-relaxed">
                    "As Directors, our focus is on ensuring sustainable growth, sound governance, and long-term value creation. We are committed to guiding the company's strategic vision and excellence thrive."
                  </p>
                </div>
                <span className="block text-[9px] font-bold text-gray-500 text-right mt-4 uppercase tracking-widest">— ALL DIRECTORS</span>
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================
          5. WHY CHOOSE SOFZENIX (Feature Cards)
          ================================================== */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              Why Partners Choose Sofzenix
            </h2>
            <p className="text-[#475569] text-sm font-semibold">
              Delivering secure, optimized software architectures with a focus on code velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {whyChooseUs.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/75 backdrop-blur-xl border border-gray-200/40 rounded-[20px] p-6 shadow-sm hover:shadow-xl hover:shadow-[#2563EB]/5 hover:border-[#2563EB]/30 transition-all duration-300 relative group cursor-default flex flex-col justify-between"
              >
                <div>
                  {/* Thin top gradient border on hover */}
                  <div className="absolute top-0 left-0 w-full h-[2.5px] bg-[#2563EB]/10 group-hover:bg-[#F97316] transition-colors rounded-t-[20px]" />
                  
                  <h3 className="text-base font-extrabold text-[#0F172A] mb-2 flex items-center gap-2 mt-2 group-hover:text-[#2563EB] transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] group-hover:scale-125 transition-transform" />
                    {item.title}
                  </h3>
                  <p className="text-[#475569] text-xs font-semibold leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>
                <Link to="/contact" className="text-[10px] font-extrabold text-[#2563EB] group-hover:text-[#F97316] flex items-center gap-1 mt-auto hover:underline uppercase tracking-wider">
                  <span>Learn More</span>
                  <FaArrowRight className="text-[8px] group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================================================
          6. ISO CERTIFICATION (Zoom)
          ================================================== */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20">
        <div className="max-w-[1200px] mx-auto text-center relative z-10">
          
          <div className="max-w-2xl mx-auto mb-16">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-4 backdrop-blur-md">
              Verified ISO Certified Organization
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              Certified Quality Standards
            </h2>
            <p className="text-[#475569] text-sm font-semibold">
              Sofzenix adheres strictly to information security and quality management systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certificates.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                onClick={() => setActiveCert(cert)}
                className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-[24px] p-6 hover:border-[#F97316]/30 hover:scale-[1.03] hover:shadow-[0_0_20px_rgba(249,115,22,0.15)] transition-all cursor-pointer flex flex-col justify-between items-center group shadow-sm"
              >
                <div className="w-full aspect-[16/10] bg-white rounded-lg overflow-hidden flex items-center justify-center p-4 border border-gray-200/40 relative" style={{ minHeight: '120px' }}>
                  <img 
                    src={cert.img} 
                    alt={cert.title} 
                    className="max-w-full max-h-full object-contain group-hover:scale-[1.04] transition-transform duration-300"
                    style={{ display: 'block', maxHeight: '100px' }}
                  />
                  <div className="absolute bottom-2 right-2 bg-green-500 text-white text-[8px] font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span>✓</span> Verified Org
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <h3 className="text-sm font-extrabold text-[#0F172A] group-hover:text-[#F97316] transition-colors">{cert.title}</h3>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">{cert.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Zoom Modal overlay */}
        <AnimatePresence>
          {activeCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ scale: 0.9, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white border border-gray-200/50 max-w-3xl w-full p-6 rounded-2xl flex flex-col relative shadow-2xl"
              >
                <button 
                  onClick={() => setActiveCert(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-[#0F172A] text-xs font-bold transition-colors cursor-pointer border border-gray-200/25"
                >
                  ✕
                </button>

                <h3 className="text-base font-extrabold text-[#0F172A] text-left pl-1 mb-4">{activeCert.title}</h3>
                
                <div className="bg-white rounded-lg p-2 flex justify-center items-center overflow-hidden border border-gray-200/20 relative">
                  <img 
                    src={activeCert.img} 
                    alt={activeCert.title} 
                    className="max-h-[65vh] object-contain max-w-full"
                  />
                  {/* Glowing seal watermark */}
                  <div className="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-extrabold px-3 py-1.5 rounded-full shadow flex items-center gap-1 animate-pulse">
                    <span>✓</span> Valid ISO Certification
                  </div>
                </div>

                <span className="text-gray-500 text-[10px] font-extrabold uppercase tracking-widest text-center mt-3 block">{activeCert.subtitle}</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ==================================================
          7. CREDENTIAL VERIFICATION (Scale Up Staged)
          ================================================== */}
      <motion.section 
        id="verify-credentials" 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-24 px-6 md:px-8 relative border-b border-gray-200/20 z-10"
      >
        {result && result.success && <ConfettiCanvas />}

        <div className="max-w-[800px] mx-auto text-center relative z-10">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-4 backdrop-blur-md">
              🛡️ Verification Portal
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">
              Verify Credentials
            </h2>
            <p className="text-[#475569] text-sm font-semibold">
              Search and verify the authenticity of Internship Certificates and Employee Credentials.
            </p>
          </div>

          {/* Verification Box */}
          <motion.div 
            className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[28px] p-6 md:p-10 shadow-2xl relative"
          >
            {/* Toggle Tabs */}
            <div className="grid grid-cols-2 gap-3 bg-gray-100 p-1.5 rounded-2xl border border-gray-200/20 mb-8 max-w-md mx-auto">
              <button
                onClick={() => {
                  setActiveTab('internship');
                  setResult(null);
                  setFormError('');
                  setCertNum('');
                  setDob('');
                  setCaptchaChecked(false);
                }}
                className={`py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'internship' 
                    ? 'bg-[#2563EB] text-white shadow-md' 
                    : 'text-[#475569] hover:bg-gray-200/40'
                }`}
              >
                <span>🎓 Internship Certificate</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('employee');
                  setResult(null);
                  setFormError('');
                  setEmpId('');
                  setEmpName('');
                  setCaptchaChecked(false);
                }}
                className={`py-3 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  activeTab === 'employee' 
                    ? 'bg-[#2563EB] text-white shadow-md' 
                    : 'text-[#475569] hover:bg-gray-200/40'
                }`}
              >
                <span>👨‍💼 Employee Verification</span>
              </button>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleVerify} className="flex flex-col gap-5 text-left max-w-lg mx-auto">
              {activeTab === 'internship' ? (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Certificate Number</label>
                    <input
                      type="text"
                      placeholder="e.g. SFZ-INT-2023-908"
                      value={certNum}
                      onChange={(e) => setCertNum(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/10 transition-all placeholder-gray-400 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Date of Birth</label>
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/10 transition-all placeholder-gray-400 shadow-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Employee ID</label>
                    <input
                      type="text"
                      placeholder="e.g. SFZ-EMP-2042"
                      value={empId}
                      onChange={(e) => setEmpId(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/10 transition-all placeholder-gray-400 shadow-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Employee Name (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Upputuri Sathish"
                      value={empName}
                      onChange={(e) => setEmpName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] focus:ring-3 focus:ring-[#2563EB]/10 transition-all placeholder-gray-400 shadow-sm"
                    />
                  </div>
                </>
              )}

              {/* Captcha Verify */}
              <div className="flex flex-col gap-1 items-start py-1 select-none">
                <ReCaptchaCheckbox onVerify={setCaptchaChecked} key={activeTab} />
                {formError && <span className="text-[10px] font-bold text-red-500 mt-1 block">{formError}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-4 rounded-full text-white font-extrabold bg-[#2563EB] hover:bg-[#F97316] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2 select-none hover:scale-105 active:scale-97"
              >
                {isVerifying ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-[2px] border-white/20 border-t-white animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Verify Credentials</span>
                )}
              </button>
            </form>

            {/* Results Rendering */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="w-full overflow-hidden"
                >
                  {result.success ? (
                    <motion.div 
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="mt-8 p-6 md:p-8 bg-green-50/10 border border-green-500/25 rounded-2xl text-left flex flex-col gap-6 relative shadow-md overflow-hidden"
                    >
                      <div className="absolute inset-0 border border-green-500/10 rounded-2xl animate-pulse pointer-events-none" />

                      <div className="flex items-center gap-3 pb-4 border-b border-green-500/15">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-600 text-sm font-bold animate-bounce">
                          ✓
                        </div>
                        <div>
                          <h4 className="text-[#0F172A] text-base font-extrabold">Record Authenticated</h4>
                          <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Active & Valid Record</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs md:text-sm font-semibold text-[#475569]">
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Name</span>
                          <span className="text-[#0F172A] font-bold">{result.data.name}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Type</span>
                          <span className="text-[#0F172A] font-bold">{result.data.type}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Registry ID</span>
                          <span className="text-[#2563EB] font-bold font-mono">{result.data.id}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Issue Date</span>
                          <span className="text-[#0F172A] font-bold">{result.data.issueDate}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Status</span>
                          <span className="text-green-600 font-extrabold uppercase tracking-wide bg-green-500/5 border border-green-500/20 px-2 py-0.5 rounded text-[10px]">{result.data.status}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">Issued By</span>
                          <span className="text-[#0F172A] font-bold">{result.data.issuedBy}</span>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-green-500/10 pt-4 mt-2 text-[10px]">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                          Verified on {new Date().toLocaleString()}
                        </span>
                        {result.type === 'internship' && (
                          <a 
                            href={result.data.downloadUrl}
                            className="px-5 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 hover:bg-green-500/20 transition-all text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <span>Download PDF Certificate</span>
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      animate={{ x: [0, -10, 10, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                      className="mt-8 p-6 md:p-8 bg-red-500/5 border border-red-500/20 rounded-2xl text-left flex flex-col gap-5 relative shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-600 text-sm font-bold">
                          !
                        </div>
                        <div>
                          <h4 className="text-[#0F172A] text-base font-extrabold">Credential Not Found</h4>
                          <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">No matching records found</span>
                        </div>
                      </div>

                      <p className="text-[#475569] text-xs leading-relaxed font-semibold">
                        The Certificate Number, Date of Birth, or Employee ID you entered does not match our security registry. Please verify parameters and try again.
                      </p>

                      <div className="flex items-center justify-between border-t border-red-500/10 pt-4 mt-2">
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">
                          Failed on {new Date().toLocaleString()}
                        </span>
                        <a 
                          href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm"
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 hover:bg-red-500/20 transition-all text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <span>Contact Support</span>
                        </a>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </motion.section>

      {/* ==================================================
          7.8. TESTIMONIALS MODAL
          ================================================== */}
      <Testimonials />

      {/* ==================================================
          8. STATISTICS PANELS (Scrolled visibility countup)
          ================================================== */}
      <section className="py-24 px-6 md:px-8 relative border-b border-gray-200/20 z-10 bg-white/40">
        <div className="max-w-[1200px] mx-auto text-center">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { label: "Happy Clients", count: "100", suffix: "+" },
              { label: "Projects Delivered", count: "250", suffix: "+" },
              { label: "Success Rate", count: "98", suffix: "%" },
              { label: "Years Operations", count: "5", suffix: "+" }
            ].map((stat, sIdx) => (
              <div 
                key={sIdx}
                className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-1.5">
                  <StatsCounter to={stat.count} suffix={stat.suffix} />
                </span>
                <span className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================
          9. FINAL CTA SECTION (Staged Fade Up)
          ================================================== */}
      <motion.section 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.75 }}
        className="py-24 px-6 md:px-8 relative z-10 overflow-hidden"
      >
        <div className="max-w-[1000px] mx-auto bg-gradient-to-r from-[#2563EB]/10 via-[#F97316]/5 to-[#F3F8FF] border border-gray-200/50 p-12 md:p-16 rounded-[32px] text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#F97316]/3 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#2563EB]/3 rounded-full blur-[80px]" />
          
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-6">
            Ready to Build Something Amazing?
          </h2>
          
          <p className="text-[#475569] text-sm md:text-base font-semibold leading-relaxed mb-8 max-w-2xl mx-auto">
            Our engineering team is ready to scale your specification ideas into microservice architectures and high-fidelity interfaces.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 relative z-10">
            <Link 
              to="/contact" 
              className="px-8 py-3.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#2563EB] to-[#38BDF8] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-97"
            >
              <span>Start Project</span>
              <FaArrowRight className="text-xs" />
            </Link>
            <Link 
              to="/contact" 
              className="group px-8 py-3.5 rounded-full text-sm font-bold text-[#2563EB] bg-white border border-[#2563EB]/15 hover:bg-[#2563EB] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-97 shadow-sm"
            >
              <span>Book Consultation</span>
              <FaArrowRight className="text-xs text-[#2563EB]/60 group-hover:translate-x-1.5 transition-transform duration-300 group-hover:text-white" />
            </Link>
          </div>

        </div>
      </motion.section>

    </div>
  );
};

export default About;
