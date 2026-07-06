import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../components/Logo';
import { 
  FaWhatsapp, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaInstagram, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt,
  FaFacebook
} from 'react-icons/fa';

const socials = [
  { 
    name: 'LinkedIn', 
    icon: FaLinkedin, 
    href: 'https://www.linkedin.com/company/sofzenix-it-solutions/posts/?feedView=all', 
    color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:shadow-[0_8px_20px_rgba(10,102,194,0.12)]' 
  },
  { 
    name: 'GitHub', 
    icon: FaGithub, 
    href: 'https://github.com/softechitsolution', 
    color: 'hover:text-[#181717] hover:border-[#181717]/40 hover:shadow-[0_8px_20px_rgba(24,23,23,0.12)]' 
  },
  { 
    name: 'Instagram', 
    icon: FaInstagram, 
    href: 'https://www.instagram.com/sofzenix_it_solutionsllp/', 
    color: 'hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:shadow-[0_8px_20px_rgba(225,48,108,0.12)]' 
  },
  { 
    name: 'Twitter/X', 
    icon: FaTwitter, 
    href: 'https://x.com/SoftechITSol', 
    color: 'hover:text-[#000000] hover:border-[#000000]/40 hover:shadow-[0_8px_20px_rgba(0,0,0,0.12)]' 
  },
  { 
    name: 'Facebook', 
    icon: FaFacebook, 
    href: 'https://www.facebook.com/people/Sofzenix-It-Solution/100094780795333/?rdid=hIi9DWPGLPoC5FVI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B7FRzxjo9%2F', 
    color: 'hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:shadow-[0_8px_20px_rgba(24,119,242,0.12)]' 
  },
  { 
    name: 'WhatsApp', 
    icon: FaWhatsapp, 
    href: 'https://wa.me/916305818324', 
    color: 'hover:text-[#25D366] hover:border-[#25D366]/40 hover:shadow-[0_8px_20px_rgba(37,211,102,0.12)]' 
  },
  { 
    name: 'Email', 
    icon: FaEnvelope, 
    href: 'https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm', 
    color: 'hover:text-[#F97316] hover:border-[#F97316]/40 hover:shadow-[0_8px_20px_rgba(249,115,22,0.12)]' 
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <footer 
      className="w-full pt-12 pb-6 relative z-10 overflow-hidden text-left"
      style={{
        background: 'linear-gradient(180deg, #F8FBFF 0%, #EEF5FF 100%)',
        boxShadow: '0 -10px 30px rgba(37,99,235,0.05)'
      }}
    >
      {/* Subtle blue and orange radial glows in opposite corners with extremely low opacity */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#2563EB]/[0.05] rounded-full blur-[80px] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#F97316]/[0.04] rounded-full blur-[80px] pointer-events-none z-0" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 mb-10">
        
        {/* Brand Block (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col items-start gap-4">
          <div className="scale-115 origin-left mb-1.5">
            <Logo variant="footer" className="p-0" />
          </div>
          <p className="text-[#475569] text-sm leading-relaxed max-w-sm font-semibold">
            Sofzenix IT Solutions LLP engineers scalable web applications, custom enterprise systems, and AI cloud products that drive startup and corporate digital growth.
          </p>
          
          {/* Follow Us Section */}
          <div className="flex flex-col gap-2.5 mt-3 w-full select-none">
            <h4 className="text-[#2563EB] text-base font-bold uppercase tracking-[0.5px] relative w-fit group cursor-default">
              Follow Us
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F97316] transition-all duration-300 group-hover:w-full" />
            </h4>
            <div className="flex items-center gap-3">
              {socials.map((social, idx) => {
                const Icon = social.icon;
                return (
                  <div 
                    key={social.name} 
                    className="relative"
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    <motion.a 
                      href={social.href} 
                      target="_blank" 
                      rel="noreferrer"
                      whileHover={{ scale: 1.08, y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className={`w-11 h-11 rounded-full bg-white border border-[#E2E8F0] flex items-center justify-center text-[#475569] text-base transition-all duration-300 shadow-sm ${social.color}`}
                    >
                      <Icon />
                    </motion.a>
 
                    {/* Animated Tooltip */}
                    <AnimatePresence>
                      {hoveredIdx === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: -5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-13 left-1/2 -translate-x-1/2 bg-[#0F172A]/95 border border-gray-200/10 px-2.5 py-1 rounded-md shadow-xl pointer-events-none z-50 whitespace-nowrap"
                        >
                          <span className="text-white text-[10px] font-bold">{social.name}</span>
                          {/* Tooltip triangle */}
                          <div className="absolute bottom-[-4.5px] left-1/2 -translate-x-1/2 w-2 h-2 bg-[#0F172A] border-r border-b border-gray-200/10 rotate-45" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Column 2: Services (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-[#2563EB] text-base font-bold uppercase tracking-[0.5px] relative w-fit group cursor-default">
            Services
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F97316] transition-all duration-300 group-hover:w-full" />
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold text-[#475569]">
            <li><Link to="/services" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">Web Development</Link></li>
            <li><Link to="/services" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">Custom Software</Link></li>
            <li><Link to="/services" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">Mobile App Dev</Link></li>
            <li><Link to="/services" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">Enterprise Systems</Link></li>
            <li><Link to="/services" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">UI/UX Design</Link></li>
          </ul>
        </div>

        {/* Column 3: Technologies (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-[#2563EB] text-base font-bold uppercase tracking-[0.5px] relative w-fit group cursor-default">
            Technologies
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F97316] transition-all duration-300 group-hover:w-full" />
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold text-[#475569]">
            <li><span className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569] cursor-pointer">React & Redux</span></li>
            <li><span className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569] cursor-pointer">Node & Express</span></li>
            <li><span className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569] cursor-pointer">MongoDB & SQL</span></li>
            <li><span className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569] cursor-pointer">Java & Spring Boot</span></li>
            <li><span className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569] cursor-pointer">AWS & Docker</span></li>
          </ul>
        </div>

        {/* Column 4: Quick Links (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-[#2563EB] text-base font-bold uppercase tracking-[0.5px] relative w-fit group cursor-default">
            Company
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F97316] transition-all duration-300 group-hover:w-full" />
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold text-[#475569]">
            <li><Link to="/about" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">About Us</Link></li>
            <li><Link to="/partners" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">Partners</Link></li>
            <li><Link to="/hire" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">Hire Developer</Link></li>
            <li><Link to="/verify" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">Verify Credentials</Link></li>
            <li><Link to="/contact" className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-[#2563EB] hover:font-bold text-[#475569]">Contact</Link></li>
          </ul>
        </div>

        {/* Column 5: Contact Info (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-[#2563EB] text-base font-bold uppercase tracking-[0.5px] relative w-fit group cursor-default">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#F97316] transition-all duration-300 group-hover:w-full" />
          </h4>
          <ul className="flex flex-col gap-3 text-xs font-semibold text-[#334155]">
            <li className="flex items-start gap-2 group transition-all duration-300 cursor-default">
              <FaMapMarkerAlt className="text-[#F97316] mt-0.5 transition-transform duration-300 group-hover:scale-110 shrink-0" />
              <span className="transition-colors duration-300 group-hover:text-[#2563EB]">Telangana,Hyderabad-500032</span>
            </li>
            <li className="flex items-center gap-2 group transition-all duration-300 cursor-default">
              <FaPhoneAlt className="text-[#2563EB] transition-transform duration-300 group-hover:scale-110 shrink-0" />
              <a href="tel:+916305818324" className="transition-colors duration-300 group-hover:text-[#2563EB] font-bold">+91 63058-18324</a>
            </li>
            <li className="flex items-center gap-2 group transition-all duration-300 cursor-default">
              <FaEnvelope className="text-[#F97316] transition-transform duration-300 group-hover:scale-110 shrink-0" />
              <a href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm" target="_blank" rel="noreferrer" className="transition-colors duration-300 group-hover:text-[#2563EB]">contact@sofzenix.in</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8">
        <div className="w-full border-t border-[#2563EB]/15" />
      </div>

      {/* Footer Bottom Block */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 select-none">
        
        {/* Copyright */}
        <p className="text-[#64748B] text-xs font-semibold">
          © {currentYear} Sofzenix IT Solutions LLP. All Rights Reserved.
        </p>

        {/* Legal links */}
        <div className="flex items-center gap-5 text-xs font-bold text-[#64748B]">
          <Link to="/contact" className="hover:text-[#2563EB] transition-colors relative group py-0.5">
            Privacy Policy
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/contact" className="hover:text-[#2563EB] transition-colors relative group py-0.5">
            Terms & Conditions
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2563EB] transition-all duration-300 group-hover:w-full" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
