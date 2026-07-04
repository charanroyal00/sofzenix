import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-transparent text-[#475569] flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F97316]/3 rounded-full blur-[120px]" />
      
      <div className="relative z-10 text-center max-w-lg">
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-9xl font-extrabold tracking-widest bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-transparent"
        >
          404
        </motion.h1>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mt-4 mb-2">
            Lost in Cyberspace?
          </h2>
          <p className="text-[#475569] mb-8 font-semibold">
            The page you are looking for does not exist or has been moved. Let's get you back to engineering growth.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 btn-glow-primary text-white hover:scale-105 active:scale-95 cursor-pointer"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
