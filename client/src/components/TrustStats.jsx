import { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';

const StatCounter = ({ value, suffix = "" }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue}{suffix}</span>;
};

const stats = [
  { value: 250, suffix: '+', label: 'Projects Delivered', color: 'text-[#0F6FFF]' },
  { value: 100, suffix: '+', label: 'Happy Clients', color: 'text-[#FF8A00]' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', color: 'text-[#0F6FFF]' },
  { value: 5, suffix: '+', label: 'Years Experience', color: 'text-[#FF8A00]' }
];

const TrustStats = () => {
  return (
    <section id="trust-statistics" className="w-full bg-transparent py-24 px-6 md:px-8 relative z-10 overflow-hidden border-t border-white/[0.03]">
      <div className="max-w-[1200px] mx-auto text-center">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#FF8A00] mb-4 select-none">
            Our Performance
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Sofzenix In Numbers
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-semibold leading-relaxed">
            Our track record of digital product engineering excellence speaks for itself.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-[#111827]/40 backdrop-blur-md border border-white/[0.06] rounded-[24px] p-8 md:p-10 flex flex-col items-center justify-center hover:border-white/15 transition-all shadow-xl shadow-black/20"
            >
              <span className={`text-4xl md:text-5xl lg:text-6xl font-black ${stat.color} tracking-tight mb-3`}>
                <StatCounter value={stat.value} suffix={stat.suffix} />
              </span>
              
              <span className="text-xs md:text-sm font-bold text-gray-300 uppercase tracking-widest text-center mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustStats;
