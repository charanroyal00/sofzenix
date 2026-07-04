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
    color: 'hover:text-[#2563EB] hover:border-[#2563EB]/35 hover:shadow-[0_0_15px_rgba(37,99,235,0.15)]' 
  },
  { 
    name: 'GitHub', 
    icon: FaGithub, 
    href: 'https://github.com/softechitsolution', 
    color: 'hover:text-[#0F172A] hover:border-[#0F172A]/35 hover:shadow-[0_0_15px_rgba(15,23,42,0.15)]' 
  },
  { 
    name: 'Instagram', 
    icon: FaInstagram, 
    href: 'https://www.instagram.com/sofzenix_it_solutionsllp/', 
    color: 'hover:text-[#F97316] hover:border-[#F97316]/35 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]' 
  },
  { 
    name: 'Twitter/X', 
    icon: FaTwitter, 
    href: 'https://x.com/SoftechITSol', 
    color: 'hover:text-[#3B82F6] hover:border-[#3B82F6]/35 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
  },
  { 
    name: 'Facebook', 
    icon: FaFacebook, 
    href: 'https://www.facebook.com/people/Sofzenix-It-Solution/100094780795333/?rdid=hIi9DWPGLPoC5FVI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B7FRzxjo9%2F', 
    color: 'hover:text-[#2563EB] hover:border-[#2563EB]/35 hover:shadow-[0_0_15px_rgba(37,99,235,0.15)]' 
  },
  { 
    name: 'WhatsApp', 
    icon: FaWhatsapp, 
    href: 'https://wa.me/916305818324', 
    color: 'hover:text-green-500 hover:border-green-500/35 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]' 
  },
  { 
    name: 'Email', 
    icon: FaEnvelope, 
    href: 'https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm', 
    color: 'hover:text-[#F97316] hover:border-[#F97316]/35 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]' 
  }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <footer className="w-full bg-transparent border-t border-gray-200/40 pt-20 pb-8 relative z-10 overflow-hidden text-left">
      
      {/* Background ambient light */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#2563EB]/2 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-10 mb-16">
        
        {/* Brand Block (4 Columns) */}
        <div className="lg:col-span-4 flex flex-col items-start gap-4">
          <Logo variant="footer" className="p-0" />
          <p className="text-[#475569] text-sm leading-relaxed max-w-sm font-semibold">
            Sofzenix IT Solutions LLP engineers scalable web applications, custom enterprise systems, and AI cloud products that drive startup and corporate digital growth.
          </p>
          
          {/* Follow Us Section */}
          <div className="flex flex-col gap-2.5 mt-4 w-full select-none">
            <h4 className="text-[#0F172A] text-xs font-bold uppercase tracking-wider">Follow Us</h4>
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
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 rounded-full bg-[#F8FAFC] border border-gray-200/85 flex items-center justify-center text-[#475569] text-base transition-all duration-300 shadow-sm ${social.color}`}
                    >
                      <Icon />
                    </motion.a>
 
                    {/* Animated Tooltip above icon */}
                    <AnimatePresence>
                      {hoveredIdx === idx && (
                        <motion.div
                          initial={{ opacity: 0, y: -5, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-[#0F172A]/95 border border-gray-200/10 px-2.5 py-1 rounded-md shadow-xl pointer-events-none z-50 whitespace-nowrap"
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
          <h4 className="text-[#0F172A] text-xs font-bold uppercase tracking-wider">Services</h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold text-[#475569]">
            <li><Link to="/services" className="hover:text-[#2563EB] transition-colors">Web Development</Link></li>
            <li><Link to="/services" className="hover:text-[#2563EB] transition-colors">Custom Software</Link></li>
            <li><Link to="/services" className="hover:text-[#2563EB] transition-colors">Mobile App Dev</Link></li>
            <li><Link to="/services" className="hover:text-[#2563EB] transition-colors">Enterprise Systems</Link></li>
            <li><Link to="/services" className="hover:text-[#2563EB] transition-colors">UI/UX Design</Link></li>
          </ul>
        </div>

        {/* Column 3: Technologies (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-[#0F172A] text-xs font-bold uppercase tracking-wider">Technologies</h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold text-[#475569]">
            <li><span className="hover:text-[#F97316] cursor-pointer">React & Redux</span></li>
            <li><span className="hover:text-[#F97316] cursor-pointer">Node & Express</span></li>
            <li><span className="hover:text-[#F97316] cursor-pointer">MongoDB & SQL</span></li>
            <li><span className="hover:text-[#F97316] cursor-pointer">Java & Spring Boot</span></li>
            <li><span className="hover:text-[#F97316] cursor-pointer">AWS & Docker</span></li>
          </ul>
        </div>

        {/* Column 4: Quick Links (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-[#0F172A] text-xs font-bold uppercase tracking-wider">Company</h4>
          <ul className="flex flex-col gap-2.5 text-xs font-semibold text-[#475569]">
            <li><Link to="/about" className="hover:text-[#2563EB] transition-colors">About Us</Link></li>
            <li><Link to="/partners" className="hover:text-[#2563EB] transition-colors">Partners</Link></li>
            <li><Link to="/hire" className="hover:text-[#2563EB] transition-colors">Hire Developer</Link></li>
            <li><Link to="/verify" className="hover:text-[#2563EB] transition-colors">Verify Credentials</Link></li>
            <li><Link to="/contact" className="hover:text-[#2563EB] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 5: Contact Info (2 Columns) */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-[#0F172A] text-xs font-bold uppercase tracking-wider">Contact</h4>
          <ul className="flex flex-col gap-3 text-xs font-semibold text-[#475569]">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-[#F97316] mt-0.5" />
              <span>Telangana,Hyderabad-500032</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-[#2563EB]" />
              <a href="tel:+916305818324" className="hover:text-[#2563EB] transition-colors">+91 63058-18324</a>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#F97316]" />
              <a href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm" target="_blank" rel="noreferrer" className="hover:text-[#2563EB] transition-colors">contact@sofzenix.in</a>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer Bottom Block */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pt-8 border-t border-gray-200/40 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10 select-none">
        
        {/* Copyright */}
        <p className="text-[#64748B] text-xs font-semibold">
          © 2023 Sofzenix IT Solutions LLP. All Rights Reserved.
        </p>

        {/* Legal links */}
        <div className="flex items-center gap-5 text-xs font-bold text-[#475569]">
          <Link to="/contact" className="hover:text-[#2563EB] transition-colors">Privacy Policy</Link>
          <span className="text-gray-300">|</span>
          <Link to="/contact" className="hover:text-[#2563EB] transition-colors">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};;

export default Footer;
