import { useState } from 'react';
import { motion } from 'framer-motion';

const ReCaptchaCheckbox = ({ onVerify }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = () => {
    if (isChecked || isLoading) return;
    setIsLoading(true);
    // Simulate reCAPTCHA verification calculation
    setTimeout(() => {
      setIsLoading(false);
      setIsChecked(true);
      if (onVerify) onVerify(true);
    }, 1200);
  };

  return (
    <div className="w-[302px] h-[78px] bg-[#f9f9f9] border border-[#d3d3d3] rounded-[3px] flex items-center justify-between px-3.5 select-none text-gray-700 shadow-sm relative overflow-hidden font-sans">
      <div className="flex items-center gap-3">
        {/* Checkbox Trigger Container */}
        <div 
          onClick={handleCheck}
          className={`w-6 h-6 border-[2px] rounded-[2px] flex items-center justify-center cursor-pointer transition-all duration-200 ${
            isChecked 
              ? 'border-transparent bg-transparent' 
              : 'border-[#c1c1c1] bg-white hover:border-[#b2b2b2]'
          }`}
        >
          {isLoading && (
            <div className="w-5 h-5 rounded-full border-[2.5px] border-[#4a90e2]/20 border-t-[#4a90e2] animate-spin" />
          )}

          {isChecked && (
            <motion.svg 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="w-5 h-5 text-[#009a29]" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </motion.svg>
          )}
        </div>

        {/* Text */}
        <span className="text-xs font-semibold text-[#2b2b2b]">
          I'm not a robot
        </span>
      </div>

      {/* Brand logo & links */}
      <div className="flex flex-col items-center justify-center gap-0.5">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4a90e2"/>
        </svg>
        <span className="text-[8px] text-[#555] font-semibold tracking-wider uppercase">reCAPTCHA</span>
        <div className="flex gap-1.5 text-[7px] text-[#555] font-bold">
          <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:underline">Privacy</a>
          <span>•</span>
          <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:underline">Terms</a>
        </div>
      </div>
    </div>
  );
};

export default ReCaptchaCheckbox;
