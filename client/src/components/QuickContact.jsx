import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaBolt } from 'react-icons/fa';
import ReCaptchaCheckbox from './ReCaptchaCheckbox';

const QuickContact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm();

  const onSubmit = async (data) => {
    if (!isCaptchaVerified) {
      setCaptchaError('Please complete the reCAPTCHA verification.');
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Quick contact form submitted:', data);
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
    setIsCaptchaVerified(false);
    setCaptchaError('');
    // Hide success alert after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <section id="quick-contact" className="w-full bg-transparent py-20 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/20">
      
      {/* Background glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-[#2563EB]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch relative z-10">
        
        {/* Left Side: Quick Company Details (5 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col justify-between text-left"
        >
          <div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 text-xs font-bold uppercase tracking-widest text-[#F97316] mb-4 select-none">
              Fast Track
            </div>

            <h3 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] leading-tight mb-4">
              Quick Contact
            </h3>

            <p className="text-[#475569] text-sm md:text-base leading-relaxed mb-8 font-semibold">
              In a hurry? Drop us a brief message below and our engineering team will get back to you shortly.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-[#2563EB] text-base" />
                <a href="tel:+916305818324" className="text-[#475569] text-sm font-semibold hover:text-[#2563EB] transition-colors">
                  +91 63058-18324
                </a>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#F97316] text-base" />
                <a href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm" target="_blank" rel="noreferrer" className="text-[#475569] text-sm font-semibold hover:text-[#2563EB] transition-colors">
                  contact@sofzenix.in
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-[#2563EB] text-base mt-1" />
                <span className="text-[#475569] text-sm font-semibold">
                  0-00, Narasaraopet - Guntur Rd, Arundelpet, Narasaraopeta, Andhra Pradesh 522601
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaClock className="text-[#F97316] text-base" />
                <span className="text-[#475569] text-sm font-semibold">
                  Mon - Fri: 9:00 AM - 6:00 PM IST
                </span>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-200/20 pt-4 mt-2">
                <div className="p-2 rounded-lg bg-[#F97316]/10 text-[#F97316]">
                  <FaBolt className="text-sm" />
                </div>
                <div>
                  <h4 className="text-[#0F172A] text-xs font-bold uppercase tracking-wider">Response Uptime</h4>
                  <p className="text-[#475569] text-xs font-semibold">Guaranteed feedback in under 24 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Compact Contact Form (7 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 p-6 md:p-8 rounded-[24px] shadow-lg">
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 text-left w-full">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <input 
                  type="text" 
                  placeholder="Full Name"
                  {...register('name', { required: 'Name is required' })}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50/50 border ${errors.name ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                />
                {errors.name && <span className="text-[10px] font-bold text-red-500 pl-1 block">{errors.name.message}</span>}
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <input 
                  type="email" 
                  placeholder="Email"
                  {...register('email', { 
                    required: 'Email is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
                  })}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50/50 border ${errors.email ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                />
                {errors.email && <span className="text-[10px] font-bold text-red-500 pl-1 block">{errors.email.message}</span>}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <input 
                  type="tel" 
                  placeholder="Phone"
                  {...register('phone', { required: 'Phone number is required' })}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50/50 border ${errors.phone ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                />
                {errors.phone && <span className="text-[10px] font-bold text-red-500 pl-1 block">{errors.phone.message}</span>}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <textarea 
                  rows="3"
                  placeholder="Message"
                  {...register('message', { required: 'Message content is required' })}
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50/50 border ${errors.message ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                />
                {errors.message && <span className="text-[10px] font-bold text-red-500 pl-1 block">{errors.message.message}</span>}
              </div>

              {/* CAPTCHA Placement */}
              <div className="flex flex-col gap-1 items-start py-1 select-none">
                <ReCaptchaCheckbox onVerify={setIsCaptchaVerified} />
                {captchaError && <span className="text-[10px] font-bold text-red-500 mt-1 block">{captchaError}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-full text-white font-extrabold bg-[#2563EB] hover:bg-[#F97316] hover:scale-103 active:scale-97 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 mt-1 select-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4.5 h-4.5 rounded-full border-[2px] border-white/20 border-t-white animate-spin" />
                    <span>Sending Proposal...</span>
                  </>
                ) : (
                  <span>Send Request</span>
                )}
              </button>
            </form>

            {/* Success Alert Banner */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-xs font-bold text-center flex flex-col gap-0.5 shadow-md select-none"
                >
                  <span>🎉 Quick Request Sent!</span>
                  <span className="text-gray-500 font-semibold">We will respond within 24 hours.</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default QuickContact;
