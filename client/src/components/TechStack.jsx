import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaShieldAlt } from 'react-icons/fa';

// --- Vetted Official SVGs with Brand-Specific Colors ---
const BrandLogos = {
  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-9 h-9 text-[#61DAFB] drop-shadow-[0_0_8px_rgba(97,218,251,0.4)]" fill="none" stroke="currentColor" strokeWidth="1.2">
      <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  Nodejs: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#339933] drop-shadow-[0_0_8px_rgba(51,153,51,0.3)]" fill="currentColor">
      <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2zm-1 15.5l-3.5-2v-4l3.5-2 3.5 2v4l-3.5 2z" />
    </svg>
  ),
  Expressjs: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#64748B] drop-shadow-[0_0_8px_rgba(100,116,139,0.2)]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2 13h-4v-2h4v2zm0-4h-4V9h4v2z" />
    </svg>
  ),
  MongoDB: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#47A248] drop-shadow-[0_0_8px_rgba(71,162,72,0.3)]" fill="currentColor">
      <path d="M12 1.5c-.3 0-.6.1-.8.3-2.5 2.1-4.7 5.1-4.7 8.7 0 4.1 2.2 7 4.7 8.5v3h1.6v-3c2.5-1.5 4.7-4.4 4.7-8.5 0-3.6-2.2-6.6-4.7-8.7-.2-.2-.5-.3-.8-.3zm0 15.2c-1.2 0-2.2-1.3-2.2-3.2 0-1.8 1-3.2 2.2-3.2s2.2 1.3 2.2 3.2c0 1.9-1 3.2-2.2 3.2z" />
    </svg>
  ),
  Java: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#5382A1] drop-shadow-[0_0_8px_rgba(83,130,161,0.3)]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2.5 14c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5zm5 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z" />
    </svg>
  ),
  SpringBoot: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#6DB33F] drop-shadow-[0_0_8px_rgba(109,179,63,0.3)]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.6 14.5c-2.4 0-4.1-1.7-4.1-4.1s1.7-4.1 4.1-4.1c1.5 0 2.5.6 3 1.2l-1.2 1.2c-.4-.4-1-.6-1.8-.6-1.4 0-2.4 1-2.4 2.3s1 2.3 2.4 2.3c.8 0 1.4-.2 1.8-.6l1.2 1.2c-.5.6-1.5 1.2-3 1.2z" />
    </svg>
  ),
  AWS: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#FF9900] drop-shadow-[0_0_8px_rgba(255,153,0,0.3)]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11c-2.1 1.2-5 1.5-7.5.8-.8-.2-1.5-.6-2-1.1L8.8 14c.8.8 2 1.3 3.2 1.5 2.6.4 5.5.1 7.7-.9l-.7-1.6zm.5-3.8c-.8.8-2 1.3-3.2 1.5-2.6.4-5.5.1-7.7-.9l.7-1.6c2.1 1.2 5 1.5 7.5.8 .8-.2 1.5-.6 2-1.1l1.7 1.3z" />
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#2496ED] drop-shadow-[0_0_8px_rgba(36,150,237,0.3)]" fill="currentColor">
      <path d="M13.9 11h2.2v2.2h-2.2V11zm-2.8 0h2.2v2.2h-2.2V11zm-2.8 0h2.2v2.2H8.3V11zm-2.8 0h2.2v2.2H5.5V11zM13.9 8.2h2.2v2.2h-2.2V8.2zm-2.8 0h2.2v2.2h-2.2V8.2zm-2.8 0h2.2v2.2H8.3V8.2zm11.1 2.8c-.2-1.8-1.5-3.3-3.2-3.3v2.2c.8 0 1.5.5 1.7 1.1h1.5zM1.5 12h21c0 2.5-2 4.5-4.5 4.5h-12c-2.5 0-4.5-2-4.5-4.5z" />
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#8B5CF6] drop-shadow-[0_0_8px_rgba(139,92,246,0.3)]" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  ),
  MySQL: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#00758F] drop-shadow-[0_0_8px_rgba(0,117,143,0.3)]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.7 15.6c-.7 0-1.2-.5-1.2-1.2 0-.8.5-1.2 1.2-1.2s1.2.5 1.2 1.2c0 .7-.5 1.2-1.2 1.2zm2.1-5.1c-.7.5-1.5.8-2.3.9-.8.1-1.6-.1-2.2-.5-.6-.4-1-1-1.2-1.7-.2-.7-.1-1.5.3-2.1.4-.6 1-1 1.7-1.2.7-.2 1.5-.1 2.1.3.6.4 1 1 1.2 1.7.2.7.1 1.5-.3 2.1-.3.5-1 1-1.3.5z" />
    </svg>
  ),
  PostgreSQL: () => (
    <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#4F46E5] drop-shadow-[0_0_8px_rgba(79,70,229,0.3)]" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.1 14.5c-2.4 0-4.1-1.7-4.1-4.1s1.7-4.1 4.1-4.1 4.1 1.7 4.1 4.1-1.7 4.1-4.1 4.1zm.4-6.1c-.5-.4-1.2-.6-1.8-.6-.6 0-1.3.2-1.8.6l1.8 1.8 1.8-1.8z" />
    </svg>
  )
};

// Canvas network backdrop particles
const StackBackgroundParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const count = 25;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        radius: Math.random() * 2 + 0.5
      });
    }

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
    }, { threshold: 0 });
    if (canvas) observer.observe(canvas);

    let lastFrameTime = 0;
    const draw = (timestamp) => {
      if (!isIntersecting || document.hidden) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      if (timestamp - lastFrameTime < 33) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastFrameTime = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(37, 99, 235, 0.1)';
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
      if (observer) observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0 translate-z-0" />;
};

const techData = [
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    logoKey: 'React',
    color: '#61DAFB',
    glowClass: 'shadow-[0_0_20px_rgba(97,218,251,0.25)]',
    desc: 'Declarative component-driven user interface library.',
    usedFor: 'Dynamic Web Views, Dashboards, and SPA Portals',
    left: 10, top: 50 // Middle vertical
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    logoKey: 'Nodejs',
    color: '#339933',
    glowClass: 'shadow-[0_0_20px_rgba(51,153,51,0.25)]',
    desc: 'Performant asynchronous event-driven server runtime.',
    usedFor: 'Restful API Endpoints & Gateway Aggregators',
    left: 30, top: 23
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Backend',
    logoKey: 'Expressjs',
    color: '#64748B',
    glowClass: 'shadow-[0_0_20px_rgba(100,116,139,0.2)]',
    desc: 'Fast, minimalist Node.js routing and middleware framework.',
    usedFor: 'Authentication Tokens, CORS, and Data Mappings',
    left: 30, top: 41
  },
  {
    id: 'java',
    name: 'Java',
    category: 'Backend',
    logoKey: 'Java',
    color: '#5382A1',
    glowClass: 'shadow-[0_0_20px_rgba(83,130,161,0.25)]',
    desc: 'Secure object-oriented application coding framework.',
    usedFor: 'Robust Threading & Multi-Tenant Databases',
    left: 30, top: 59
  },
  {
    id: 'springboot',
    name: 'Spring Boot',
    category: 'Backend',
    logoKey: 'SpringBoot',
    color: '#6DB33F',
    glowClass: 'shadow-[0_0_20px_rgba(109,179,63,0.25)]',
    desc: 'Enterprise dependency injection microservice framework.',
    usedFor: 'Secure Database Mappings & Microservice Gateways',
    left: 30, top: 77
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Database',
    logoKey: 'MongoDB',
    color: '#47A248',
    glowClass: 'shadow-[0_0_20px_rgba(71,162,72,0.25)]',
    desc: 'Scalable JSON NoSQL schema aggregation database.',
    usedFor: 'Session Caching, Document Pipelines, and Analytics Logs',
    left: 50, top: 29
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Database',
    logoKey: 'PostgreSQL',
    color: '#4F46E5',
    glowClass: 'shadow-[0_0_20px_rgba(79,70,229,0.25)]',
    desc: 'Advanced relational SQL normalization system.',
    usedFor: 'Enterprise Accounts and Clustered Replica Databases',
    left: 50, top: 52
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Database',
    logoKey: 'MySQL',
    color: '#00758F',
    glowClass: 'shadow-[0_0_20px_rgba(0,117,143,0.25)]',
    desc: 'Stable, optimized relational schema connector.',
    usedFor: 'Data indexing, relational models, and transactional logs',
    left: 50, top: 75
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    logoKey: 'Docker',
    color: '#2496ED',
    glowClass: 'shadow-[0_0_20px_rgba(36,150,237,0.25)]',
    desc: 'Modular lightweight image container packaging toolkit.',
    usedFor: 'Consistent Dev-Prod Environments & Container Deployments',
    left: 70, top: 37
  },
  {
    id: 'github',
    name: 'GitHub Actions',
    category: 'DevOps',
    logoKey: 'GitHub',
    color: '#8B5CF6',
    glowClass: 'shadow-[0_0_20px_rgba(139,92,246,0.25)]',
    desc: 'Automated software workflow CI/CD pipelines.',
    usedFor: 'Continuous Integration & Release Workflows',
    left: 70, top: 62
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'Cloud',
    logoKey: 'AWS',
    color: '#FF9900',
    glowClass: 'shadow-[0_0_20px_rgba(255,153,0,0.25)]',
    desc: 'Highly redundant cloud infrastructure computing ecosystem.',
    usedFor: 'Lambda Servlets, S3 Assets, and Load Balancers',
    left: 90, top: 50
  }
];

// Linear Non-Crossing Connections Mapping
const connections = [
  { from: 'react', to: 'nodejs', color: 'rgba(97, 218, 251, 0.15)' },
  { from: 'react', to: 'express', color: 'rgba(97, 218, 251, 0.15)' },
  { from: 'react', to: 'java', color: 'rgba(97, 218, 251, 0.15)' },
  { from: 'react', to: 'springboot', color: 'rgba(97, 218, 251, 0.15)' },
  
  { from: 'nodejs', to: 'mongodb', color: 'rgba(51, 153, 51, 0.15)' },
  { from: 'express', to: 'mongodb', color: 'rgba(100, 116, 139, 0.15)' },
  { from: 'java', to: 'postgresql', color: 'rgba(83, 130, 161, 0.15)' },
  { from: 'springboot', to: 'postgresql', color: 'rgba(109, 179, 63, 0.15)' },
  
  { from: 'mongodb', to: 'docker', color: 'rgba(71, 162, 72, 0.15)' },
  { from: 'postgresql', to: 'docker', color: 'rgba(79, 70, 229, 0.15)' },
  { from: 'mysql', to: 'github', color: 'rgba(0, 117, 143, 0.15)' },
  
  { from: 'docker', to: 'aws', color: 'rgba(36, 150, 237, 0.15)' },
  { from: 'github', to: 'aws', color: 'rgba(139, 92, 246, 0.15)' }
];

// Bidirectional lookup map for highlighting connected items
const connectionsMap = {
  react: ['nodejs', 'express', 'java', 'springboot'],
  nodejs: ['react', 'mongodb'],
  express: ['react', 'mongodb'],
  java: ['react', 'postgresql'],
  springboot: ['react', 'postgresql'],
  mongodb: ['nodejs', 'express', 'docker'],
  postgresql: ['java', 'springboot', 'docker'],
  mysql: ['github'],
  docker: ['mongodb', 'postgresql', 'aws'],
  github: ['mysql', 'aws'],
  aws: ['docker', 'github']
};

const categoryGroups = {
  'Frontend': [techData[0]],
  'Backend': [techData[1], techData[2], techData[3], techData[4]],
  'Database': [techData[5], techData[6], techData[7]],
  'DevOps': [techData[8], techData[9]],
  'Cloud': [techData[10]]
};

// Animated scroll-triggered stats counters
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

// Technology Card component
const TechCard = ({ tech, isHovered, isHighlighted, onHover, onLeave }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Logo = BrandLogos[tech.logoKey];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = -(e.clientY - rect.top - rect.height / 2) / 10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    onLeave();
  };

  const isActive = isHovered || isHighlighted;

  return (
    <div 
      className="absolute z-25"
      style={{ left: `${tech.left}%`, top: `${tech.top}%`, transform: 'translate(-50%, -50%)' }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={onHover}
        style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: 'preserve-3d' }}
        whileHover={{ scale: 1.12 }}
        className={`w-18 h-18 rounded-[20px] bg-white/70 backdrop-blur-xl border border-gray-200/50 flex flex-col items-center justify-center p-2 relative shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ${isActive ? `${tech.glowClass} border-transparent` : ''}`}
      >
        {/* Top brand coloring line */}
        <div className="absolute top-0 left-0 w-full h-[2.5px] rounded-t-[20px]" style={{ backgroundColor: tech.color }} />
        
        <div className="flex-grow flex items-center justify-center">
          <Logo />
        </div>

        <span className="text-[8px] font-extrabold text-[#475569] tracking-tight leading-none mt-1 select-none">
          {tech.name}
        </span>
      </motion.div>

      {/* Floating 3D Metadata Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.94 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[86px] left-1/2 -translate-x-1/2 w-60 bg-white/95 border border-[#2563EB]/15 rounded-2xl p-4 text-left shadow-2xl backdrop-blur-xl z-50 pointer-events-none"
          >
            <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-100">
              <span className="text-[9px] font-extrabold uppercase text-[#2563EB] tracking-widest">{tech.category}</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: tech.color }} />
            </div>

            <h4 className="text-xs font-extrabold text-[#0F172A] mb-1">{tech.name}</h4>
            <p className="text-[#475569] text-[10px] font-semibold leading-relaxed mb-2">{tech.desc}</p>
            
            <div className="text-gray-500 text-[9px] font-semibold leading-tight">
              <span className="text-[#0F172A] font-bold block mb-0.5">Use Case:</span> {tech.usedFor}
            </div>

            <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white border-b border-r border-[#2563EB]/15 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const TechStack = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const isNodeHighlighted = (techId) => {
    if (hoveredId === null) return false;
    if (hoveredId === techId) return true;
    return connectionsMap[hoveredId]?.includes(techId);
  };

  const getTechCoords = (techId) => {
    const t = techData.find(tech => tech.id === techId);
    // Width: 1000px, Height: 480px
    return t ? { x: t.left * 10, y: t.top * 4.8 } : { x: 0, y: 0 };
  };

  return (
    <section id="tech-stack" className="w-full bg-transparent py-20 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/20">
      
      {/* Background gradients and blobs */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="mesh-blob mesh-blob-1 -right-[15%] -top-[10%] opacity-20" />
        <div className="mesh-blob mesh-blob-2 -left-[10%] bottom-[10%] opacity-20" />
      </div>

      <div className="absolute inset-0 bg-grid-pattern bg-noise opacity-20 pointer-events-none z-[1]" />
      
      {/* Particle overlay behind networks */}
      <div className="absolute inset-0 z-[1]">
        <StackBackgroundParticles />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#2563EB] mb-4"
          >
            Our Ecosystem
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4"
          >
            Technology Stack We Build With
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[#475569] text-sm md:text-base font-semibold"
          >
            We leverage modern, production-hardened technologies to build secure, robust applications.
          </motion.p>
        </div>

        {/* ==================================================
            DESKTOP ECOSYSTEM NETWORK MAP (480px height container)
            ================================================== */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="hidden md:block bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[28px] shadow-xl relative w-full max-w-5xl h-[480px] mx-auto overflow-hidden z-10"
        >
          {/* Animated SVG connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 480" preserveAspectRatio="none">
            {connections.map((conn, idx) => {
              const fromCoords = getTechCoords(conn.from);
              const toCoords = getTechCoords(conn.to);
              
              // Hover active highlights
              const isPathActive = hoveredId === conn.from || hoveredId === conn.to;
              const strokeColor = isPathActive ? conn.color.replace('0.15', '0.6') : conn.color;
              const strokeWidth = isPathActive ? 2.5 : 1.5;
              const dashDuration = isPathActive ? '2.5s' : '5.5s';

              return (
                <g key={idx}>
                  <line 
                    x1={fromCoords.x} 
                    y1={fromCoords.y} 
                    x2={toCoords.x} 
                    y2={toCoords.y} 
                    stroke={strokeColor} 
                    strokeWidth={strokeWidth} 
                    className="transition-all duration-300"
                  />
                  {/* Flow dot animation */}
                  <circle r={isPathActive ? 3.5 : 2} fill={isPathActive ? '#2563EB' : 'rgba(37,99,235,0.4)'}>
                    <animateMotion 
                      dur={dashDuration} 
                      repeatCount="indefinite" 
                      path={`M ${fromCoords.x} ${fromCoords.y} L ${toCoords.x} ${toCoords.y}`} 
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Group Category Glass Pills */}
          <div className="absolute left-[10%] top-[6%] -translate-x-1/2 text-[9px] font-extrabold uppercase text-[#2563EB] tracking-widest bg-[#2563EB]/5 border border-[#2563EB]/15 px-3 py-1 rounded-full select-none pointer-events-none backdrop-blur-md">Frontend</div>
          <div className="absolute left-[30%] top-[6%] -translate-x-1/2 text-[9px] font-extrabold uppercase text-[#2563EB] tracking-widest bg-[#2563EB]/5 border border-[#2563EB]/15 px-3 py-1 rounded-full select-none pointer-events-none backdrop-blur-md">Backend</div>
          <div className="absolute left-[50%] top-[6%] -translate-x-1/2 text-[9px] font-extrabold uppercase text-[#2563EB] tracking-widest bg-[#2563EB]/5 border border-[#2563EB]/15 px-3 py-1 rounded-full select-none pointer-events-none backdrop-blur-md">Database</div>
          <div className="absolute left-[70%] top-[6%] -translate-x-1/2 text-[9px] font-extrabold uppercase text-[#2563EB] tracking-widest bg-[#2563EB]/5 border border-[#2563EB]/15 px-3 py-1 rounded-full select-none pointer-events-none backdrop-blur-md">DevOps</div>
          <div className="absolute left-[90%] top-[6%] -translate-x-1/2 text-[9px] font-extrabold uppercase text-[#2563EB] tracking-widest bg-[#2563EB]/5 border border-[#2563EB]/15 px-3 py-1 rounded-full select-none pointer-events-none backdrop-blur-md">Cloud</div>

          {/* Render Tech Node Cards */}
          {techData.map((tech) => (
            <TechCard 
              key={tech.id} 
              tech={tech}
              isHovered={hoveredId === tech.id}
              isHighlighted={isNodeHighlighted(tech.id)}
              onHover={() => setHoveredId(tech.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </motion.div>

        {/* ==================================================
            MOBILE COMPACT GROUP ACCORDION (hidden on desktop)
            ================================================== */}
        <div className="block md:hidden flex flex-col gap-5">
          {Object.entries(categoryGroups).map(([category, items]) => (
            <div key={category} className="bg-white/80 border border-gray-200/50 rounded-2xl p-5 text-left shadow-sm">
              <span className="text-[10px] font-extrabold uppercase text-[#2563EB] tracking-widest block mb-4 border-b border-gray-100 pb-2">{category}</span>
              
              <div className="flex flex-col gap-3">
                {items.map(item => {
                  const LogoComp = BrandLogos[item.logoKey];
                  return (
                    <div key={item.id} className="flex items-center gap-4 bg-[#F8FAFC]/50 p-3 rounded-xl border border-gray-200/30">
                      <div className="w-10 h-10 rounded-lg bg-white border border-gray-200/40 flex items-center justify-center">
                        <LogoComp />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xs font-extrabold text-[#0F172A]">{item.name}</h4>
                        <p className="text-[#64748B] text-[10px] leading-relaxed mt-0.5">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* ==================================================
            STATISTICS COUNTER PANELS
            ================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 max-w-5xl mx-auto">
          {[
            { label: "Technologies", count: "30", suffix: "+" },
            { label: "Projects Delivered", count: "100", suffix: "+" },
            { label: "Enterprise Ready", icon: FaShieldAlt, static: true },
            { label: "Years Experience", count: "5", suffix: "+" }
          ].map((stat, idx) => (
            <div 
              key={idx}
              className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm"
            >
              {stat.static ? (
                <div className="flex items-center gap-2 mb-1.5">
                  <FaShieldAlt className="text-2xl text-[#2563EB] animate-pulse" />
                  <span className="text-xl md:text-2xl font-extrabold text-[#0F172A]">Yes</span>
                </div>
              ) : (
                <span className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-1.5">
                  <StatsCounter to={stat.count} suffix={stat.suffix} />
                </span>
              )}
              <span className="text-[10px] font-extrabold uppercase text-[#64748B] tracking-widest">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ==================================================
            CENTRALIZED SECTION CTA BLOCK
            ================================================== */}
        <div className="mt-14 bg-gradient-to-r from-[#2563EB]/10 via-[#F97316]/5 to-[#F3F8FF] border border-gray-200/50 p-8 rounded-3xl max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-left relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-[#F97316]/3 rounded-full blur-[60px]" />
          <div className="absolute bottom-0 left-0 w-[150px] h-[150px] bg-[#2563EB]/3 rounded-full blur-[60px]" />
          
          <div className="relative z-10">
            <h3 className="text-lg md:text-xl font-extrabold text-[#0F172A] mb-1">Ready to Build with Modern Technologies?</h3>
            <p className="text-[#475569] text-xs font-semibold font-sans">Coordinate with our solutions engineers to build customized scalable services.</p>
          </div>

          <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-full text-white font-extrabold text-xs tracking-wider uppercase btn-glow-primary transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              <span>Book Consultation</span>
              <FaArrowRight className="text-[9px]" />
            </Link>
            <Link 
              to="/services" 
              className="px-6 py-3 rounded-full font-extrabold text-xs tracking-wider uppercase btn-glow-secondary transition-all duration-300 w-full sm:w-auto text-center flex items-center justify-center"
            >
              Explore Services
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TechStack;
