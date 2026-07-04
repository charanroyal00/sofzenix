import { motion } from 'framer-motion';

const Login = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-28 pb-16 flex flex-col items-center justify-center px-4 bg-transparent text-[#475569]"
    >
      <div className="max-w-md w-full text-center bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-[16px] border border-gray-200/50 shadow-2xl flex flex-col gap-6">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#2563EB] to-[#F97316] bg-clip-text text-transparent">
          Portal Login
        </h1>
        <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Email Address</label>
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-gray-200/50 text-[#0F172A] placeholder-gray-400 focus:outline-none focus:border-[#2563EB] shadow-sm"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 block mb-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 rounded-lg bg-white/80 border border-gray-200/50 text-[#0F172A] placeholder-gray-400 focus:outline-none focus:border-[#2563EB] shadow-sm"
            />
          </div>
          <button className="w-full py-3 mt-2 rounded-full text-white btn-glow-primary hover:scale-105 active:scale-95 transition-all font-bold cursor-pointer">
            Sign In
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
