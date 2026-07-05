import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowDown } from 'react-icons/fa';
import { FaCircleCheck, FaShieldHalved } from 'react-icons/fa6';
import WireframeLandscape from './WireframeLandscape';

/* ─── Typewriter ─────────────────────────────────────────── */
const Typewriter = ({ words }) => {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[idx];
    let t;
    if (!del && text.length < w.length)       t = setTimeout(() => setText(w.slice(0, text.length + 1)), 75);
    else if (!del && text.length === w.length) t = setTimeout(() => setDel(true), 2000);
    else if (del && text.length > 0)           t = setTimeout(() => setText(text.slice(0, -1)), 40);
    else { setDel(false); setIdx((idx + 1) % words.length); }
    return () => clearTimeout(t);
  }, [text, del, idx, words]);
  return (
    <span className="text-gradient-flow">
      {text}<motion.span animate={{ opacity: [1,0,1] }} transition={{ duration: 0.8, repeat: Infinity }} className="inline-block w-[3px] h-[0.85em] bg-[#2563EB] ml-0.5 align-middle rounded-sm" />
    </span>
  );
};

/* ─── Connected Particle Canvas ──────────────────────────── */
const Particles = ({ isMobile }) => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const resize = () => { c.width = c.parentElement.offsetWidth; c.height = c.parentElement.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const pts = Array.from({ length: isMobile ? 20 : 55 }, () => ({
      x: Math.random() * c.width, y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.8 + 0.6,
    }));
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
          if (d < 120) { ctx.strokeStyle = `rgba(37,99,235,${0.07*(1-d/120)})`; ctx.lineWidth = 0.5; ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
        }
        pts[i].x += pts[i].vx; pts[i].y += pts[i].vy;
        if (pts[i].x < 0 || pts[i].x > c.width)  pts[i].vx *= -1;
        if (pts[i].y < 0 || pts[i].y > c.height) pts[i].vy *= -1;
        ctx.fillStyle = 'rgba(37,99,235,0.18)'; ctx.beginPath(); ctx.arc(pts[i].x, pts[i].y, pts[i].r, 0, Math.PI*2); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf); };
  }, [isMobile]);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ─── Live Activity Feed ─────────────────────────────────── */
const activitySeed = [
  { icon: '✅', title: 'Hotel Desk App deployed',      time: '2 min ago',  tag: 'Deploy',   tagColor: 'bg-green-50 text-green-600 border-green-100'  },
  { icon: '🔄', title: 'Analytics Dashboard updated',  time: '8 min ago',  tag: 'Update',   tagColor: 'bg-blue-50 text-[#2563EB] border-blue-100'    },
  { icon: '🔐', title: 'SSL certificate renewed',      time: '15 min ago', tag: 'Security', tagColor: 'bg-purple-50 text-purple-600 border-purple-100'},
  { icon: '📦', title: 'Swaldo v3.1 build complete',   time: '22 min ago', tag: 'Build',    tagColor: 'bg-orange-50 text-orange-600 border-orange-100'},
];

const LiveActivity = () => {
  const [items, setItems] = useState(activitySeed);
  const newItems = [
    { icon: '🚀', title: 'Accounting Pro Suite released',   time: 'just now', tag: 'Release', tagColor: 'bg-green-50 text-green-600 border-green-100'   },
    { icon: '⚙️', title: 'API gateway auto-scaled',         time: 'just now', tag: 'Infra',   tagColor: 'bg-slate-50 text-slate-600 border-slate-200'   },
    { icon: '📊', title: 'Monthly report generated',        time: 'just now', tag: 'Report',  tagColor: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
    { icon: '🛡️', title: 'Security audit passed',           time: 'just now', tag: 'Security',tagColor: 'bg-purple-50 text-purple-600 border-purple-100' },
  ];
  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      const next = newItems[i % newItems.length];
      setItems(prev => [next, ...prev.slice(0, 3)]);
      i++;
    }, 4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {items.map((item, idx) => (
          <motion.div key={`${item.title}-${idx}`}
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0 group"
          >
            <span className="text-sm leading-none flex-shrink-0">{item.icon}</span>
            <span className="flex-1 text-[12px] font-medium text-[#334155] group-hover:text-[#0F172A] transition-colors truncate">{item.title}</span>
            <span className="text-[10px] font-medium text-[#94A3B8] bg-gray-50 border border-gray-100 px-2 py-0.5 rounded whitespace-nowrap">{item.tag}</span>
            <span className="text-[10px] text-[#CBD5E1] whitespace-nowrap hidden sm:block">{item.time}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

/* ─── Animated Counter ───────────────────────────────────── */
const Counter = ({ to, suffix = '' }) => {
  const [v, setV] = useState(0);
  const ref = useRef(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const n = parseInt(to), step = Math.ceil(1800 / n);
        let i = 0;
        const t = setInterval(() => { i++; setV(i); if (i >= n) clearInterval(t); }, step);
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{v}{suffix}</span>;
};

/* ════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
const Hero = () => {
  const [mobile, setMobile] = useState(false);
  const sectionRef = useRef(null);
  const mX = useMotionValue(0), mY = useMotionValue(0);
  const sX = useSpring(mX, { stiffness: 60, damping: 18 });
  const sY = useSpring(mY, { stiffness: 60, damping: 18 });
  const { scrollY } = useScroll();
  const fadeOut = useTransform(scrollY, [0, 500], [1, 0.8]);
  const slideUp  = useTransform(scrollY, [0, 500], [0, -40]);
  const cardX = useTransform(sX, [-700, 700], [-12, 12]);
  const cardY = useTransform(sY, [-700, 700], [-12, 12]);
  const blobX  = useTransform(sX, [-700, 700], [-30, 30]);
  const blobY  = useTransform(sY, [-700, 700], [-30, 30]);

  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    h(); window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  const onMove = (e) => {
    if (mobile || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mX.set(e.clientX - r.left - r.width / 2);
    mY.set(e.clientY - r.top - r.height / 2);
  };

  const stats = [
    { v: '150', s: '+', label: 'Projects', color: 'text-[#2563EB]' },
    { v: '80',  s: '+', label: 'Clients',  color: 'text-[#F97316]' },
    { v: '99',  s: '%', label: 'Uptime',   color: 'text-[#10B981]' },
    { v: '3',   s: 'x', label: 'ISO Certs',color: 'text-[#8B5CF6]' },
  ];

  const trust = ['Custom Software', 'AI & ML', 'Cloud DevOps', 'Mobile Apps', 'AICTE Approved'];

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      onMouseLeave={() => { mX.set(0); mY.set(0); }}
      className="relative w-full min-h-[100svh] flex flex-col items-center justify-center pt-24 pb-14 px-5 md:px-10 overflow-hidden bg-[#F8FAFC]"
    >
      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* blueprint grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.4]" />
        {/* radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(37,99,235,0.08),transparent)]" />
        {/* aurora blobs */}
        <motion.div style={{ x: blobX, y: blobY }} className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[130px]" />
        <motion.div style={{ x: blobX, y: blobY }} className="absolute top-[30%] -right-40 w-[500px] h-[500px] bg-[#F97316]/8 rounded-full blur-[140px]" />
        <motion.div className="absolute -bottom-40 left-[20%] w-[480px] h-[480px] bg-[#8B5CF6]/7 rounded-full blur-[120px] animate-pulse-slower" />
        {/* light beam sweep */}
        <motion.div
          animate={{ x: ['-120%', '220%'] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'linear', repeatDelay: 5 }}
          className="absolute top-0 w-[180px] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-6"
        />
        <WireframeLandscape />
        <Particles isMobile={mobile} />
      </div>

      {/* ── CENTRE CONTENT ── */}
      <motion.div style={{ opacity: fadeOut, y: slideUp }} className="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto gap-5">

        {/* pill badge */}
        <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#2563EB]/20 shadow-md text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2563EB]" />
          </span>
          AICTE Approved · ISO 9001 · ISO 27001 · ISO 27701
        </motion.div>

        {/* ── HEADLINE ── */}
        <div className="flex flex-col gap-2">
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.1 }}
            className="text-[11px] font-extrabold uppercase tracking-[0.35em] text-[#F97316]">
            Sofzenix IT Solutions LLP
          </motion.p>

          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7, delay:0.15, ease:'easeOut' }}
            className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-[1.12] text-[#0F172A]">
            We Build&nbsp;
            <span className="relative inline-block">
              <Typewriter words={['Cloud‑Native', 'Scalable', 'AI‑Powered', 'Intelligent', 'Enterprise']} />
            </span>
            <br />
            <span className="relative">
              Software Solutions
              {/* gradient underline */}
              <motion.span
                initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:0.9, delay:0.9, ease:'easeOut' }}
                className="absolute -bottom-1.5 left-0 w-full h-[3.5px] rounded-full bg-gradient-to-r from-[#2563EB] via-[#8B5CF6] to-[#F97316] origin-left"
              />
            </span>
          </motion.h1>

          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.35 }}
            className="text-[#475569] text-sm md:text-base font-semibold max-w-xl mx-auto leading-relaxed mt-1">
            From custom web apps and mobile platforms to AI integrations and cloud infrastructure — Sofzenix powers enterprises with precision-engineered, secure, and scalable digital products.
          </motion.p>
        </div>

        {/* ── CTA BUTTONS ── */}
        <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.5 }}
          className="flex flex-wrap justify-center gap-4">
          <Link to="/services" className="premium-primary-btn px-9 py-4 text-sm font-black uppercase tracking-widest group">
            <span>Explore Services</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/contact" className="premium-secondary-btn px-9 py-4 text-sm font-black uppercase tracking-widest">
            Book Free Consultation
          </Link>
        </motion.div>

        {/* ── TRUST PILLS ── */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7, duration:0.5 }}
          className="flex flex-wrap justify-center gap-2.5 mt-1">
          {trust.map((t,i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#475569] bg-white/80 border border-gray-200/70 rounded-full px-3.5 py-1.5 shadow-sm backdrop-blur-sm">
              <FaCircleCheck className="text-[#2563EB] text-[10px]" />{t}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── DASHBOARD VISUAL, STATS BAR & SCROLL INDICATOR (Commented out to match clean reference wireframe layout) ──
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-12 px-2">
        <motion.div style={{ x: cardX, y: cardY }}
          initial={{ opacity:0, y:50, scale:0.95 }} animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:1, delay:0.6, ease:'easeOut' }}
          className="relative w-full rounded-2xl border border-gray-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.08)] overflow-hidden"
        >
          <div className="h-[2px] w-full bg-[#2563EB]" />
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-[#FAFAFA]">
            <div className="flex gap-1.5">
              {['bg-[#FF5F57]','bg-[#FFBD2E]','bg-[#28CA41]'].map(c=><span key={c} className={`w-2.5 h-2.5 rounded-full ${c}`}/>)}
            </div>
            <span className="text-[10px] font-medium text-gray-400 tracking-wide">
              Sofzenix — Operations Dashboard
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#16A34A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" /> Live
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="md:col-span-4 p-5 flex flex-col gap-0">
              <div className="flex items-center justify-between pb-3 mb-1 border-b border-gray-100">
                <span className="text-[11px] font-semibold text-[#0F172A] uppercase tracking-widest">Services</span>
                <span className="text-[10px] font-medium text-[#16A34A]">● All Operational</span>
              </div>
              {[
                { name: 'Web Platform',     uptime: '99.9%' },
                { name: 'API Gateway',      uptime: '99.8%' },
                { name: 'Cloud Storage',    uptime: '100%'  },
                { name: 'AI Inference',     uptime: '99.7%' },
                { name: 'Mobile Backend',   uptime: '99.9%' },
                { name: 'Database Cluster', uptime: '100%'  },
              ].map((s, i) => (
                <motion.div key={s.name}
                  initial={{ opacity:0, x:-6 }} animate={{ opacity:1, x:0 }}
                  transition={{ delay: 0.8 + i*0.06 }}
                  className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0 group"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] flex-shrink-0" />
                    <span className="text-[12px] font-medium text-[#334155] group-hover:text-[#0F172A] transition-colors">{s.name}</span>
                  </div>
                  <span className="text-[11px] font-medium text-[#94A3B8]">{s.uptime}</span>
                </motion.div>
              ))}
            </div>
            <div className="md:col-span-8 flex flex-col divide-y divide-gray-100">
              <div className="grid grid-cols-3 divide-x divide-gray-100">
                {[
                  { label: 'System Uptime',     value: '99.9%', sub: '30-day avg' },
                  { label: 'Projects Delivered', value: '150+',  sub: 'Since 2020' },
                  { label: 'Avg Response',       value: '18ms',  sub: 'API latency' },
                ].map((m,i) => (
                  <motion.div key={m.label}
                    initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}
                    transition={{ delay: 0.9 + i*0.08 }}
                    className="px-5 py-4 flex flex-col gap-1"
                  >
                    <span className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wider">{m.label}</span>
                    <span className="text-2xl font-bold text-[#0F172A] tracking-tight">{m.value}</span>
                    <span className="text-[10px] font-medium text-[#CBD5E1]">{m.sub}</span>
                  </motion.div>
                ))}
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold text-[#0F172A] uppercase tracking-widest">Traffic · 30 days</span>
                  <span className="text-[10px] font-medium text-[#16A34A]">↑ 24% this month</span>
                </div>
                <svg className="w-full" height="56" viewBox="0 0 460 56" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2563EB" stopOpacity="0.12"/>
                      <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <motion.path initial={{ pathLength:0 }} animate={{ pathLength:1 }}
                    transition={{ duration:2.2, ease:'easeInOut', delay:1 }}
                    d="M0 50 C40 42 70 28 110 34 S170 12 210 20 S270 38 310 18 S380 28 420 12 L460 8 L460 56 L0 56Z"
                    fill="url(#dashGrad)" />
                  <motion.path initial={{ pathLength:0 }} animate={{ pathLength:1 }}
                    transition={{ duration:2.4, ease:'easeInOut', delay:1 }}
                    d="M0 50 C40 42 70 28 110 34 S170 12 210 20 S270 38 310 18 S380 28 420 12 L460 8"
                    fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
                  {[[110,34],[210,20],[310,18],[420,12],[460,8]].map(([x,y],i)=>(
                    <motion.circle key={i} cx={x} cy={y} r="3" fill="white" stroke="#2563EB" strokeWidth="1.5"
                      initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8+i*0.1 }}/>
                  ))}
                </svg>
              </div>
              <div className="px-5 py-4 flex flex-col gap-0">
                <div className="flex items-center justify-between pb-2.5 mb-1 border-b border-gray-100">
                  <span className="text-[11px] font-semibold text-[#0F172A] uppercase tracking-widest">Recent Activity</span>
                  <span className="text-[10px] font-medium text-[#2563EB] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#2563EB] animate-pulse" />real-time
                  </span>
                </div>
                <LiveActivity />
              </div>
            </div>
          </div>
        </motion.div>
        <div className="w-3/4 h-6 mx-auto bg-[#2563EB]/5 blur-2xl rounded-full mt-1" />
      </div>
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.1, duration:0.6 }}
        className="relative z-10 w-full max-w-5xl mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s,i) => (
          <motion.div key={i} initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2+i*0.08 }}
            className="bg-white/80 border border-gray-200/50 rounded-2xl p-5 text-center shadow-sm backdrop-blur-sm hover:-translate-y-1 hover:border-[#2563EB]/20 hover:shadow-md transition-all duration-300">
            <div className={`text-3xl font-extrabold ${s.color}`}><Counter to={s.v} suffix={s.s}/></div>
            <div className="text-[10px] font-bold text-[#64748B] mt-1">{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.8 }}
        className="relative z-10 flex flex-col items-center gap-1.5 mt-10 select-none">
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400">Discover More</span>
        <motion.div animate={{ y:[0,6,0] }} transition={{ duration:1.4, repeat:Infinity }}>
          <FaArrowDown className="text-gray-400 text-xs" />
        </motion.div>
      </motion.div>
      ── */}
    </section>
  );
};

export default Hero;
