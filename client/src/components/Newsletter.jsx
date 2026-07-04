import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubscribing(false);
    setSuccess(true);
    setEmail('');
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <section id="newsletter" className="w-full bg-transparent py-16 px-6 md:px-8 relative z-10 overflow-hidden border-t border-white/[0.03]">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-[#0F6FFF]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1000px] mx-auto bg-[#111827]/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-[28px] shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Header text */}
        <div className="text-left max-w-md">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 leading-tight">
            Stay Updated
          </h3>
          <p className="text-gray-400 text-sm font-semibold leading-relaxed">
            Subscribe to our newsletter for insights on engineering architecture, AI integration, and cloud scaling.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-auto flex-grow max-w-md">
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 focus:border-[#0F6FFF] text-white text-sm focus:outline-none transition-all placeholder-gray-500"
            />
            <button 
              type="submit" 
              disabled={isSubscribing}
              className="px-6 py-3.5 rounded-xl text-white font-bold bg-gradient-to-r from-[#0F6FFF] to-[#FF8A00] hover:from-[#FF8A00] hover:to-[#0F6FFF] transition-all duration-300 shadow-[0_0_15px_rgba(15,111,255,0.2)] flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              {isSubscribing ? (
                <>
                  <span className="w-4 h-4 rounded-full border-[2px] border-white/20 border-t-white animate-spin" />
                  <span>Subscribing...</span>
                </>
              ) : (
                <span>Subscribe</span>
              )}
            </button>
          </form>

          {/* Success banner */}
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3 text-green-400 text-xs font-bold text-left pl-1"
              >
                🎉 Successfully subscribed! Check your inbox soon.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;
