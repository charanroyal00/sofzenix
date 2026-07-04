import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaLinkedin, FaEnvelope, FaArrowRight, FaQuoteLeft, FaTwitter, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import founderImg from '../assets/founder.png';
const founderPublicImg = '/founder.png';

const LINKEDIN_URL = 'https://www.linkedin.com/in/upputuri-sathish-9a37a7354/';

const MeetFounder = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 18;
    const y = -(e.clientY - rect.top - rect.height / 2) / 18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="founder" className="w-full bg-transparent py-24 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/10">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[400px] bg-[#0F6FFF]/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto relative z-10">

        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/15 text-xs font-bold uppercase tracking-widest text-[#F97316] mb-4">
            Leadership
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Meet Our Founder</h2>
        </div>

        {/* Founder Card */}
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: tilt.y, rotateY: tilt.x, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          whileHover={{ scale: 1.01 }}
          className="relative bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-[28px] p-6 md:p-8 flex flex-col lg:flex-row gap-8 items-center text-left shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
        >
          {/* Orange accent top bar */}
          <div className="absolute top-0 left-0 w-full h-[3.5px] bg-[#F97316]" />

          {/* Left — Founder photo */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Founder LinkedIn Profile"
            className="w-full lg:w-[35%] flex-shrink-0 relative overflow-hidden rounded-[20px] border border-gray-200/40 p-2.5 bg-white/80 block hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(10,102,194,0.12)] transition-all duration-300 cursor-pointer group/img"
          >
            <img
              src={founderPublicImg}
              alt="Upputuri Sathish — Founder & CEO"
              className="w-full aspect-[4/3] lg:aspect-square object-cover rounded-xl brightness-[1.02] group-hover/img:scale-[1.03] transition-transform duration-300"
              style={{ display: 'block', width: '100%' }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/10 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </a>

          {/* Right — Details */}
          <div className="flex-grow flex flex-col items-start gap-4">

            <div>
              <span className="text-[10px] font-extrabold uppercase text-[#2563EB] tracking-widest bg-[#2563EB]/5 border border-[#2563EB]/15 px-3 py-1 rounded-full">
                Founder & CEO
              </span>

              {/* Name + LinkedIn badge row */}
              <div className="flex items-center gap-3.5 mt-3 flex-wrap">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Founder LinkedIn Profile"
                >
                  <h3 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] hover:text-[#0A66C2] hover:drop-shadow-[0_0_8px_rgba(10,102,194,0.15)] transition-all duration-300 hover:-translate-y-[2px] cursor-pointer">
                    Upputuri Sathish
                  </h3>
                </a>

                <div className="flex items-center gap-2 relative">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect on LinkedIn"
                    className="relative group/ln flex items-center justify-center p-1 focus:outline-none focus:ring-2 focus:ring-[#0A66C2] rounded-full"
                  >
                    <span className="absolute inset-0 rounded-full bg-[#0A66C2]/15 animate-ping scale-110 pointer-events-none" />
                    <FaLinkedin className="text-[#0F6FFF] hover:text-[#0A66C2] transition-colors duration-300 text-2xl hover:scale-110 hover:-translate-y-[1px] cursor-pointer" />
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

            {/* Quote */}
            <div className="bg-white/80 border border-gray-200/40 rounded-2xl p-5 relative shadow-inner w-full">
              <FaQuoteLeft className="text-[#F97316]/20 text-3xl absolute top-3 left-3 pointer-events-none" />
              <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed italic relative z-10 pl-6">
                "Upputuri Sathish is a visionary tech leader committed to building business innovation through state-of-the-art software solutions. Under his guidance, Sofzenix has grown into a premium digital partner dedicated to delivering enterprise-grade apps with a customer-first mindset."
              </p>
              <span className="block text-[9px] font-extrabold text-gray-400 uppercase tracking-widest text-right mt-3">— Upputuri Sathish, Founder & CEO</span>
            </div>

            {/* Actions row */}
            <div className="flex flex-wrap items-center justify-between gap-4 w-full border-t border-gray-100 pt-4 mt-1">
              <div className="flex flex-wrap gap-3">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F3F8FF] border border-[#2563EB]/15 text-[#2563EB] text-xs font-bold hover:bg-[#2563EB] hover:text-white hover:border-transparent transition-all shadow-sm"
                >
                  <FaLinkedin className="text-sm" />
                  Connect on LinkedIn
                </a>
                <a
                  href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200/60 text-gray-500 text-xs font-bold hover:bg-gray-50 hover:text-[#F97316] transition-all shadow-sm"
                >
                  <FaEnvelope className="text-[#F97316] text-sm" />
                  contact@sofzenix.in
                </a>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-gray-200/60 text-gray-500 text-xs font-bold hover:bg-gray-50 hover:text-[#2563EB] transition-all shadow-sm"
                >
                  More About Us
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>

              {/* Social icons */}
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
                <a href="https://www.facebook.com/people/Sofzenix-It-Solution/100094780795333/" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2563EB] hover:border-[#2563EB] hover:bg-[#2563EB]/5 hover:scale-110 transition-all">
                  <FaFacebook className="text-xs" />
                </a>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MeetFounder;
