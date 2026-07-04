import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What is your core development methodology?',
    answer: 'We follow an agile software development methodology. This includes weekly sprints, continuous builds, PM dashboard updates, and high client collaboration, allowing us to deliver software products incrementally and adapt rapidly to new requirements.'
  },
  {
    question: 'How do you ensure system scalability and security?',
    answer: 'From day one, our systems are architected with containerization (Docker), load-balanced server layers, and cloud infrastructure (AWS). We follow rigid security standards including SSL/TLS encryption, JWT authentication, secure environment configurations, and regular dependency vulnerability scanning.'
  },
  {
    question: 'Do you provide support and maintenance after deployment?',
    answer: 'Yes, we offer multiple post-launch SLA support plans that cover server uptime monitoring, database backups, security patch updates, operational maintenance, and continuous feature expansion based on your roadmap.'
  },
  {
    question: 'Can you work with our existing development team?',
    answer: 'Absolutely. We regularly operate in a team augmentation capacity, working directly within clients existing Git workflows, Slack communication channels, and sprint scoping plans alongside their internal engineers.'
  },
  {
    question: 'How do we get started with a new project?',
    answer: 'Getting started is simple. You can submit our Contact Form with your estimated budget, company name, and service requirements. We will schedule a 30-minute discovery call within 24 hours to align on scope and technical feasibility.'
  }
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFAQ = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full bg-transparent py-24 px-6 md:px-8 relative z-10 overflow-hidden border-t border-white/[0.03]">
      
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-[#0F6FFF]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[800px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-[#FF8A00] mb-4 select-none">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Got Questions?
          </h2>
          <p className="text-gray-400 text-sm md:text-base font-semibold leading-relaxed">
            Find quick answers to our software lifecycle, cloud security, and onboarding process.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4 w-full">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-[#111827]/30 backdrop-blur-sm border border-white/[0.05] hover:border-white/15 rounded-2xl overflow-hidden transition-all shadow-md"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none select-none"
                >
                  <span className="text-white text-base md:text-lg font-bold group-hover:text-[#0F6FFF] transition-colors pr-4">
                    {faq.question}
                  </span>
                  
                  {/* Rotating arrow indicator */}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 text-lg font-bold"
                  >
                    ↓
                  </motion.span>
                </button>

                {/* Collapsible Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 border-t border-white/[0.04] text-gray-400 text-sm leading-relaxed font-semibold">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
