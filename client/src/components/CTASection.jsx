import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaArrowRight, 
  FaCalendarCheck, 
  FaClock, 
  FaSync, 
  FaShieldAlt, 
  FaAward 
} from 'react-icons/fa';

// Performant Canvas-based particle background inside the CTA block
const CTAParticles = () => {
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
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.4 + 0.1
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
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 99, 235, ${p.alpha})`;
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

const CTASection = () => {
  const containerRef = useRef(null);

  // Mouse spotlight coordinates using motion values and springs for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  const background = useMotionTemplate`radial-gradient(500px circle at ${springX}px ${springY}px, rgba(37, 99, 235, 0.08) 0%, rgba(249, 115, 22, 0.03) 40%, transparent 80%)`;

  let lastMoveTime = 0;
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const now = Date.now();
    if (now - lastMoveTime < 30) return;
    lastMoveTime = now;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const trustBadges = [
    { label: 'Free Consultation', icon: FaCalendarCheck, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Fast Response', icon: FaClock, color: 'text-orange-600 bg-orange-50 border-orange-100' },
    { label: 'Agile Development', icon: FaSync, color: 'text-[#10B981] bg-[#10B981]/5 border-[#10B981]/15' },
    { label: 'Enterprise Security', icon: FaShieldAlt, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { label: 'ISO Certified', icon: FaAward, color: 'text-purple-600 bg-purple-50 border-purple-100' }
  ];

  return (
    <section 
      id="cta"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="w-full bg-[#F8FAFC] py-20 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/50"
    >
      
      {/* Background Animated Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        
        {/* Subtle grid with slow scroll animation */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] animate-pulse-slow" />
        
        {/* Spotlight overlay mapped to mouse using compositor-friendly motion template */}
        <motion.div 
          className="absolute inset-0 transition-opacity duration-300 pointer-events-none" 
          style={{ background }}
        />

        {/* Floating blurred glowing background auroras */}
        <div className="absolute top-[-20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-blue-500/5 to-transparent blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-20%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-orange-500/5 to-transparent blur-[120px] animate-pulse-slower" />
      </div>

      {/* Floating performant particles canvas */}
      <CTAParticles />

      <div className="max-w-[900px] mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Conversion Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-xs font-bold uppercase tracking-widest text-[#F97316]">
            🚀 Build With Sofzenix
          </span>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] leading-tight max-w-3xl">
            Ready to Build Your Next <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#F97316] drop-shadow-sm">
              Digital Product?
            </span>
          </h2>

          <p className="text-[#475569] text-sm sm:text-base leading-relaxed max-w-2xl font-semibold">
            Sofzenix engineers custom software, scalable enterprise platforms, cloud integrations, and robust AI engines that streamline business operations, secure databases, and drive scalable digital growth.
          </p>
        </motion.div>

        {/* Factually Accurate Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mt-8 mb-10 max-w-3xl select-none"
        >
          {trustBadges.map((badge, idx) => {
            const BadgeIcon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] sm:text-xs font-bold shadow-sm transition-all duration-300 ${badge.color}`}
              >
                <BadgeIcon className="text-sm" />
                <span>{badge.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Interactive Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          
          {/* Primary CTA */}
          <Link
            to="/contact"
            className="group relative px-8 py-4 rounded-full text-sm sm:text-base font-extrabold text-white bg-gradient-to-r from-[#2563EB] to-[#3B82F6] overflow-hidden flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_4px_25px_rgba(249,115,22,0.35)] transition-all duration-500 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            {/* Sliding color background layer for blue-to-orange hover gradient */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#F97316] to-[#FF8A00] opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out z-0" />
            
            {/* Subtle light ripple ring element */}
            <span className="absolute -inset-2 rounded-full border border-white/20 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700 ease-out z-0" />

            <span className="relative z-10">Book Free Consultation</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform duration-300 relative z-10" />
          </Link>
          
          {/* Secondary CTA */}
          <Link
            to="/portfolio"
            className="group relative px-8 py-4 rounded-full text-sm sm:text-base font-extrabold text-[#2563EB] bg-white border border-[#2563EB]/15 overflow-hidden flex items-center justify-center gap-2 shadow-sm hover:border-[#2563EB]/35 transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            {/* Slide-in color gradient on hover */}
            <span className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
            
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Explore Portfolio</span>
            <FaArrowRight className="text-xs text-[#2563EB]/60 group-hover:text-white group-hover:translate-x-1.5 transition-all duration-300 relative z-10" />
          </Link>

        </motion.div>

      </div>
    </section>
  );
};

export default CTASection;
