import { motion } from 'framer-motion';

const Internships = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center px-4 bg-transparent text-white"
    >
      <div className="max-w-2xl text-center bg-[#111827]/80 backdrop-blur-md p-8 md:p-12 rounded-[16px] border border-white/10 shadow-lg shadow-[#0F6FFF]/5">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#0F6FFF] to-[#FF8A00] bg-clip-text text-transparent">
          Internship Programs
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Accelerate your growth with our structured internship program. Learn the MERN stack, software engineering best practices, and work on real-world projects.
        </p>
      </div>
    </motion.div>
  );
};

export default Internships;
