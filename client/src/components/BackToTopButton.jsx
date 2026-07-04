import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    // Initial check in case page starts scrolled
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r from-[#2563EB]/80 to-[#1D4ED8]/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(37,99,235,0.4)] cursor-pointer z-50 transition-all duration-300"
          whileHover={{ 
            scale: 1.1, 
            y: -4, 
            boxShadow: "0 0 25px rgba(37, 99, 235, 0.7), 0 0 10px rgba(255, 138, 0, 0.2)"
          }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <FaChevronUp className="text-base" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTopButton;
