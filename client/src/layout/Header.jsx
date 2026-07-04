import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaArrowRight, FaLinkedin, FaTwitter, FaGithub, FaInstagram, FaFacebook } from 'react-icons/fa';
import Logo from '../components/Logo';

const MotionLink = motion(Link);

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    }
  }
};

const navItemVariants = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } }
};

const loginBtnVariants = {
  hidden: { x: 30, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.15 } }
};

const consultationBtnVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 } }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Listen to scroll to update navbar background opacity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleVerifyClick = (e) => {
    setIsMobileMenuOpen(false);

    if (location.pathname === '/about') {
      e.preventDefault();
      const element = document.getElementById('verify-credentials');
      if (element) {
        const offset = 90;
        const duration = 800;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const easeInOutCubic = (t) => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = easeInOutCubic(Math.min(timeElapsed / duration, 1));
          window.scrollTo(0, startPosition + distance * run);
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
      window.history.pushState(null, null, '#verify-credentials');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Partners', path: '/partners' },
    { name: 'Hire', path: '/hire' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav-scrolled h-[64px] shadow-xl shadow-black/25'
            : 'glass-nav-initial h-[72px]'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 flex items-center justify-between h-full">
          {/* Left group: Logo + Navigation Links */}
          <div className="flex items-center gap-8 h-full">
            {/* Logo and Brand with extra breathing room */}
            <Link to="/" className="flex items-center select-none h-full pl-1 md:pl-3">
              <Logo variant="navbar" className="py-1 px-2" />
            </Link>

            {/* Desktop Navigation Links */}
            <motion.nav 
              variants={navContainerVariants}
              initial="hidden"
              animate="visible"
              className="hidden lg:flex items-center gap-10 h-full"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={navItemVariants} className="flex items-center h-full">
                  <NavLink
                    to={link.path}
                    style={{ letterSpacing: '0.3px' }}
                    className={({ isActive }) =>
                      `group relative text-[18px] font-semibold transition-all duration-[250ms] select-none flex items-center h-full hover:-translate-y-[0.5px] ${
                        isActive ? 'text-[#2563EB]' : 'text-[#475569] hover:text-[#2563EB]'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <div className="relative py-1.5 flex flex-col items-center">
                        <span className="relative transition-all duration-[250ms] group-hover:[text-shadow:0_0_8px_rgba(37,99,235,0.25)]">
                          {link.name}
                        </span>
                        {/* Hover Underline from Center Outward */}
                        {!isActive && (
                          <span className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 w-0 h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-[#F97316] transition-all duration-[250ms] group-hover:w-full" />
                        )}
                        {/* Active Underline (No Glow Dot) */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavUnderline"
                            className="absolute bottom-[-1px] left-0 w-full h-[2px] rounded-full bg-gradient-to-r from-[#2563EB] to-[#F97316]"
                            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                          />
                        )}
                      </div>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <MotionLink
              to="/about#verify-credentials"
              onClick={handleVerifyClick}
              variants={loginBtnVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, boxShadow: "0 0 18px rgba(37, 99, 235, 0.2)" }}
              whileTap={{ scale: 0.97 }}
              className="relative p-[1.5px] rounded-full bg-gradient-to-r from-[#2563EB]/25 to-[#F97316]/25 hover:from-[#2563EB] hover:to-[#F97316] transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center select-none group"
            >
              <span className="px-6 py-2 rounded-full bg-white/90 backdrop-blur-md text-sm font-semibold text-[#0F172A] group-hover:bg-transparent group-hover:text-white transition-all duration-300">
                Verify
              </span>
            </MotionLink>
            
            <MotionLink
              to="/login"
              variants={consultationBtnVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(37, 99, 235, 0.35)" }}
              whileTap={{ scale: 0.97 }}
              className="group px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#2563EB] to-[#F97316] hover:from-[#F97316] hover:to-[#2563EB] flex items-center justify-center gap-1.5 select-none transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>Login</span>
            </MotionLink>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-[#0F172A] hover:text-[#F97316] transition-colors p-2"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <HiX className="text-2xl" /> : <HiMenu className="text-2xl" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Slide-out Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-white/95 border-l border-gray-200/50 z-40 p-6 shadow-2xl flex flex-col justify-between lg:hidden"
            >
              <div className="mt-6">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200/20">
                  <Logo variant="navbar-mobile" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[#0F172A] hover:text-[#2563EB] p-1"
                    aria-label="Close menu"
                  >
                    <HiX className="text-2xl" />
                  </button>
                </div>
                <div className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.name}
                      to={link.path}
                      className={({ isActive }) =>
                        `text-lg font-medium py-2 border-b border-gray-200/10 transition-all duration-300 ${
                          isActive ? 'text-[#2563EB] pl-2 border-[#2563EB]/30' : 'text-[#475569] hover:text-[#0F172A]'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex flex-col gap-4 mb-8">
                <Link
                  to="/about#verify-credentials"
                  onClick={handleVerifyClick}
                  className="w-full text-center py-2.5 rounded-full bg-[#F3F8FF] border border-[#2563EB]/15 text-[#0F172A] font-semibold hover:bg-[#2563EB]/5 transition-all duration-300"
                >
                  Verify
                </Link>
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 rounded-full text-white font-semibold bg-gradient-to-r from-[#2563EB] to-[#F97316]"
                >
                  Login
                </Link>

                {/* Mobile Social Menu */}
                <div className="flex items-center justify-center gap-4 mt-6 border-t border-gray-200/20 pt-4">
                  <a href="https://www.linkedin.com/company/sofzenix-it-solutions/posts/?feedView=all" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#2563EB] transition-colors"><FaLinkedin className="text-lg" /></a>
                  <a href="https://x.com/SoftechITSol" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#2563EB] transition-colors"><FaTwitter className="text-lg" /></a>
                  <a href="https://github.com/softechitsolution" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#2563EB] transition-colors"><FaGithub className="text-lg" /></a>
                  <a href="https://www.instagram.com/sofzenix_it_solutionsllp/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#2563EB] transition-colors"><FaInstagram className="text-lg" /></a>
                  <a href="https://www.facebook.com/people/Sofzenix-It-Solution/100094780795333/?rdid=hIi9DWPGLPoC5FVI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B7FRzxjo9%2F" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#2563EB] transition-colors"><FaFacebook className="text-lg" /></a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
