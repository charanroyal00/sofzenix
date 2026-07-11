import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    name: 'Jashwanth reddy Nagireddy',
    designation: 'Verified Client',
    company: 'Google Reviews',
    rating: 5,
    text: 'As a client of SOFT-TECH Solution, I am truly impressed with the level of professionalism, technical expertise, and customer support they offer. Their team has a deep understanding of IT services, and they were able to provide us with customized, cost-effective solutions that perfectly matched our business needs. What stands out is their ability to deliver fast and reliable IT services — from bulk SMS and email solutions to domain services, cloud communication, IVR systems, and WhatsApp messaging. They offer a wide range of services under one roof, which makes managing our IT operations much easier.',
    avatarColor: 'from-[#F97316] to-[#EA580C]'
  },
  {
    name: 'Shaik Dastagiri basha',
    designation: 'Verified Client',
    company: 'Google Reviews',
    rating: 5,
    text: 'Sofzenix IT Solutions provided great service and support. The staff were friendly and helpful throughout. Thank you for the excellent guidance!',
    avatarColor: 'from-[#2563EB] to-[#1D4ED8]'
  },
  {
    name: 'Sarah Jenkins',
    designation: 'Chief Technology Officer',
    company: 'Fintech Solutions Corp',
    rating: 5,
    text: 'Sofzenix engineering team transformed our legacy database infrastructure into a high-concurrency cloud platform. Their technical depth, transparent communication, and customer-first mindset were exemplary throughout the engagement.',
    avatarColor: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Marcus Sterling',
    designation: 'VP of Product',
    company: 'Nexus Retail Group',
    rating: 5,
    text: 'We hired Sofzenix to engineer our new multi-channel mobile applications. The fluid performance of the iOS and Android apps, combined with their custom Stripe integrations, helped us increase conversion rates by 28% in under two months.',
    avatarColor: 'from-orange-500 to-amber-600'
  },
  {
    name: 'Dr. Evelyn Carter',
    designation: 'Director of Healthcare Systems',
    company: 'Helix Health System',
    rating: 5,
    text: 'The healthcare portal designed by Sofzenix has streamlined our practitioner-patient communication channels. Their adherence to strict encryption protocols and HIPAA standard security controls exceeded our expectations.',
    avatarColor: 'from-teal-500 to-cyan-600'
  }
];

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const timeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (!isPaused) {
      resetTimeout();
      timeoutRef.current = setTimeout(
        () => setActiveIdx((prevIdx) => (prevIdx === testimonials.length - 1 ? 0 : prevIdx + 1)),
        5000
      );
    }
    return () => {
      resetTimeout();
    };
  }, [activeIdx, isPaused]);

  return (
    <section id="testimonials" className="w-full bg-[#FFFFFF] py-24 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/10">
      
      {/* Background glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#2563EB]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#F97316] mb-4" >
            Client Reviews
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] leading-tight mb-4">
            Why Clients Choose Sofzenix
          </h2>
          
          <p className="text-[#475569] text-sm md:text-base font-semibold leading-relaxed">
            See how we help organizations scale and launch critical software systems.
          </p>
        </div>

        {/* Testimonial Card Carousel Area */}
        <div 
          className="relative w-full min-h-[340px] md:min-h-[280px] flex items-center justify-center cursor-pointer"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="w-full bg-white/85 backdrop-blur-md border border-gray-200/50 p-8 md:p-12 rounded-[24px] shadow-lg flex flex-col justify-between items-center text-center relative premium-card"
            >
              {/* Inner glowing elements */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-[#2563EB]/2 to-[#F97316]/2 rounded-[24px] pointer-events-none" />

              {/* Star Rating Row */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonials[activeIdx].rating)].map((_, i) => (
                  <span key={i} className="text-[#F97316] text-xl select-none">★</span>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-[#0F172A] text-base md:text-xl italic leading-relaxed mb-8 max-w-3xl font-semibold">
                "{testimonials[activeIdx].text}"
              </p>

              {/* Client Info Block */}
              <div className="flex flex-col items-center">
                {/* Client Avatar with dynamic initials */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-tr ${testimonials[activeIdx].avatarColor} flex items-center justify-center text-white font-extrabold text-lg shadow-md mb-3 select-none`}>
                  {testimonials[activeIdx].name[0]}
                </div>
                
                <h4 className="text-[#0F172A] text-base font-bold mb-0.5">
                  {testimonials[activeIdx].name}
                </h4>
                
                <p className="text-[#475569] text-xs font-bold uppercase tracking-wider mb-2">
                  {testimonials[activeIdx].designation} &bull; {testimonials[activeIdx].company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex items-center gap-2.5 mt-8 select-none">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                activeIdx === idx ? 'w-8 bg-[#2563EB]' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
