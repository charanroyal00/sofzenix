import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaLaptop, FaMobileAlt, FaChartLine, FaRobot,
  FaPalette, FaCloud, FaArrowRight
} from 'react-icons/fa';

const services = [
  {
    title: 'Web Platforms',
    category: 'Software Engineering',
    description: 'High-performance web apps with modern stacks, accessibility, security & analytics instrumentation from sprint zero.',
    icon: FaLaptop,
    tags: ['SSR / SPA', 'API Layer', 'Performance'],
    accent: '#2563EB',
  },
  {
    title: 'Mobile Products',
    category: 'App Development',
    description: 'Native & cross-platform experiences focused on fluid interaction, offline resilience and release velocity.',
    icon: FaMobileAlt,
    tags: ['iOS / Android', 'Flutter / RN', 'CI Automation'],
    accent: '#F97316',
  },
  {
    title: 'Digital Marketing',
    category: 'Growth Marketing',
    description: 'Full-funnel acquisition & retention engines blending organic foundation with paid channel acceleration.',
    icon: FaChartLine,
    tags: ['SEO & SEM', 'Paid Media', 'CRO'],
    accent: '#8B5CF6',
  },
  {
    title: 'AI & Automation',
    category: 'Cognitive Systems',
    description: 'Applied ML pipelines, intelligent agents & workflow automation delivering measurable operational leverage.',
    icon: FaRobot,
    tags: ['MLOps', 'LLM Integration', 'Data Eng.'],
    accent: '#2563EB',
  },
  {
    title: 'UI / UX Design',
    category: 'Product Design',
    description: 'Identity systems & multi-channel design ops for consistent, conversion-driven product & marketing surfaces.',
    icon: FaPalette,
    tags: ['Design Systems', 'UX Audits', 'Prototyping'],
    accent: '#F97316',
  },
  {
    title: 'Salesforce Cloud',
    category: 'CRM Solutions',
    description: 'End-to-end Salesforce CRM: implementation, customization, automation, and 3rd-party integrations.',
    icon: FaCloud,
    tags: ['Sales Cloud', 'Custom Flows', 'Integrations'],
    accent: '#0EA5E9',
  },
];

const ServiceCard = ({ service, idx }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: idx * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white border border-gray-200/70 rounded-2xl p-7 flex flex-col gap-5 text-left hover:border-[#2563EB]/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(37,99,235,0.08)] transition-all duration-300 cursor-default overflow-hidden"
    >
      {/* Subtle number watermark */}
      <span className="absolute top-4 right-5 text-[48px] font-extrabold leading-none pointer-events-none select-none" style={{ color: 'rgba(0,0,0,0.04)' }}>
        {String(idx + 1).padStart(2, '0')}
      </span>

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${service.accent}12`, border: `1px solid ${service.accent}22` }}
        >
          <Icon className="text-lg" style={{ color: service.accent }} />
        </div>
        <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-400 mt-1 text-right">
          {service.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-extrabold text-[#0F172A] leading-tight group-hover:text-[#2563EB] transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-[#64748B] text-[13px] font-medium leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map(t => (
          <span key={t} className="text-[10px] font-semibold text-[#475569] bg-gray-50 border border-gray-200/80 rounded-full px-2.5 py-0.5">
            {t}
          </span>
        ))}
      </div>

      {/* Footer CTA */}
      <Link
        to="/services"
        className="flex items-center gap-1.5 text-[11px] font-bold text-[#2563EB] mt-auto pt-4 border-t border-gray-100 group-hover:gap-2.5 transition-all duration-300"
      >
        Learn More
        <FaArrowRight className="text-[9px]" />
      </Link>
    </motion.div>
  );
};

const ServicesSection = () => (
  <section id="services" className="w-full bg-white py-24 px-6 md:px-8 relative z-10 border-t border-gray-100">
    <div className="max-w-[1280px] mx-auto flex flex-col items-center gap-14">

      {/* Header */}
      <div className="text-center max-w-2xl flex flex-col gap-4">
        <motion.span
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 self-center px-4 py-1.5 rounded-full bg-[#EEF4FF] border border-[#2563EB]/20 text-[10px] font-extrabold uppercase tracking-widest text-[#2563EB]"
        >
          What We Do
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight"
        >
          Our Core Services
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
          className="text-[#475569] text-sm md:text-base font-medium leading-relaxed"
        >
          Six practice areas engineered to design, build, and scale digital products — with unified lifecycle ownership.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {services.map((s, i) => <ServiceCard key={s.title} service={s} idx={i} />)}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.3 }}
      >
        <Link
          to="/services"
          className="premium-primary-btn inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold group"
        >
          View All Services
          <FaArrowRight className="text-xs" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default ServicesSection;
