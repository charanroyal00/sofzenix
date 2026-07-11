import { useState, useEffect } from 'react';

const generateCaptchaCode = () => {
  // Mixed case: lowercase, uppercase, and numbers (avoiding confusing characters like o, O, 0, i, I, 1, l)
  const chars = 'abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

const ReCaptchaCheckbox = ({ onVerify }) => {
  const [captchaCode, setCaptchaCode] = useState('');
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    setCaptchaCode(generateCaptchaCode());
  }, []);

  const handleRefresh = () => {
    const newCode = generateCaptchaCode();
    setCaptchaCode(newCode);
    setUserInput('');
    if (onVerify) onVerify(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setUserInput(val);
    // Case-sensitive validation
    if (val === captchaCode) {
      if (onVerify) onVerify(true);
    } else {
      if (onVerify) onVerify(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 w-full max-w-[340px] text-left font-sans select-none my-4">
      {/* Label */}
      <span className="text-[10px] font-extrabold text-[#475569] uppercase tracking-widest flex items-center gap-1">
        Security Verification <span className="text-[#F97316]">*</span>
      </span>

      {/* Captcha Row */}
      <div className="flex items-center gap-2.5">
        {/* Visual Captcha Box */}
        <div className="h-10 px-5 rounded-[4px] border border-[#D4C3A3] bg-[#F7F2E8] flex items-center justify-center relative overflow-hidden select-none w-36 shadow-xs">
          {/* Distorted letters inside */}
          <span className="font-mono text-lg font-black tracking-[0.25em] text-[#5D4D37] italic select-none skew-x-3">
            {captchaCode}
          </span>
          {/* Linear noise lines */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <div className="absolute top-1/2 left-0 right-0 h-[1.2px] bg-[#5D4D37]/75 rotate-[-5deg]" />
            <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-[#5D4D37]/70 rotate-[7deg]" />
            <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-[#5D4D37]/70 rotate-[-2deg]" />
          </div>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={handleRefresh}
          className="w-10 h-10 border border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 flex items-center justify-center rounded-[4px] cursor-pointer transition-colors shadow-xs"
          title="Click to get a new code"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
          </svg>
        </button>

        {/* Caption Text */}
        <span className="text-[10px] text-gray-400 font-bold select-none leading-normal max-w-[120px]">
          Click refresh icon to get a new code
        </span>
      </div>

      {/* Input Box */}
      <input
        type="text"
        placeholder="Type the code above"
        value={userInput}
        onChange={handleInputChange}
        className="w-full h-11 px-3 border border-gray-300 rounded-[4px] text-sm font-semibold tracking-wider placeholder:tracking-[0.1em] placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors bg-white text-[#0F172A]"
        required
      />
    </div>
  );
};

export default ReCaptchaCheckbox;
