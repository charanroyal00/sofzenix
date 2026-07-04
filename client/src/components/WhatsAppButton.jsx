import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/916305818324"
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center text-3xl shadow-[0_4px_20px_rgba(37,211,102,0.4)] cursor-pointer select-none"
      title="Chat on WhatsApp"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full border-4 border-[#25D366] animate-ping opacity-45 pointer-events-none" />
      <FaWhatsapp className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" />
    </motion.a>
  );
};

export default WhatsAppButton;
