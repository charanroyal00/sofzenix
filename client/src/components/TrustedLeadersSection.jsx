import React from 'react';
import { motion } from 'framer-motion';
import PartnerLogoMarquee from './PartnerLogoMarquee';

const TrustedLeadersSection = () => {
  return (
    <section className="relative w-full bg-[#FAFBFF] py-10 md:py-12 px-6 md:px-8 overflow-hidden border-t border-b border-gray-100 z-10">
      {/* Background glow layers */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#2563EB]/4 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-[#F97316]/3 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1400px] mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-[10px] font-bold uppercase tracking-widest text-[#2563EB] mb-1.5"
        >
          Trusted by Clients & Partners
        </motion.div>

        {/* Headings */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-2 tracking-tight"
        >
          Trusted by Leading Businesses
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[#475569] text-sm md:text-base font-semibold max-w-2xl leading-relaxed mb-6"
        >
          Organizations across industries trust Sofzenix to build secure, scalable, and innovative digital products.
        </motion.p>

        {/* Scrolling Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="w-full"
        >
          <PartnerLogoMarquee isFullColor={true} />
        </motion.div>

      </div>
    </section>
  );
};

export default TrustedLeadersSection;
