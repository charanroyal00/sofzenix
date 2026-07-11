import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaTwitter, 
  FaGithub, 
  FaInstagram, 
  FaFacebook 
} from 'react-icons/fa';
import ReCaptchaCheckbox from './ReCaptchaCheckbox';

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError]   = useState('');
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
    setCaptchaError('');
    setSubmitError('');
    setIsSubmitting(true);

    // Map ContactSection fields to the FormSubmit payload
    const payload = {
      fullName:        data.name,
      companyName:     data.company,
      email:           data.email,
      phone:           data.phone,
      country:         data.city,          // city maps to country field
      serviceRequired: 'Custom Software',  // default for home page quick form
      projectBudget:   'To be discussed',
      projectTimeline: 'To be discussed',
      message:         `Project Title: ${data.projectTitle || 'N/A'}\n\n${data.goals}`,
      _subject:        'New Quick Contact Inquiry from Home Page',
      _captcha:        'false',
      _template:       'box'
    };

    try {
      await axios.post('https://formsubmit.co/ajax/contact@sofzenix.in', payload);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitError('');
      reset();
      setIsCaptchaVerified(false);
      setCaptchaError('');
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Contact form submission failed:', err);
      setIsSubmitting(false);
      setSubmitError('Unable to submit form. Please check your internet connection and try again.');
      setTimeout(() => setSubmitError(''), 6000);
    }
  };

  return (
    <section id="contact" className="w-full bg-transparent py-24 px-6 md:px-8 relative z-10 overflow-hidden border-t border-gray-200/20">
      
      {/* Dynamic Background Animations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -30, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-10 w-[300px] h-[300px] bg-[#2563EB]/3 rounded-full blur-[90px]"
        />
        <motion.div 
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-[#F97316]/3 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch relative z-10">
        
        {/* Left Side: Contact Form (7 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-7"
        >
          <div className="bg-white/80 backdrop-blur-md border border-gray-200/50 p-8 md:p-12 rounded-[24px] shadow-xl h-full flex flex-col justify-between">
            
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-left w-full">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe"
                    {...register('name', { required: 'Name is required' })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-gray-50/50 border ${errors.name ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                  />
                  {errors.name && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.name.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="you@company.com"
                    {...register('email', { 
                      required: 'Email address is required',
                      pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                    })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-gray-50/50 border ${errors.email ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                  />
                  {errors.email && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.email.message}</span>}
                </div>
              </div>

              {/* Row 2: Company and City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Company</label>
                  <input 
                    type="text" 
                    placeholder="Acme Inc"
                    {...register('company', { required: 'Company name is required' })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-gray-50/50 border ${errors.company ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                  />
                  {errors.company && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.company.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">City</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Hyderabad"
                    {...register('city', { required: 'City is required' })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-gray-50/50 border ${errors.city ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                  />
                  {errors.city && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.city.message}</span>}
                </div>
              </div>

              {/* Project Goals */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Project Goals</label>
                <textarea 
                  rows="4"
                  placeholder="Briefly describe objectives, timeline & success metrics"
                  {...register('goals', { required: 'Project goals description is required' })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-gray-50/50 border ${errors.goals ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                />
                {errors.goals && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.goals.message}</span>}
              </div>

              {/* Row 3: Project Title and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Project Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Enterprise Portal"
                    {...register('projectTitle', { required: 'Project Title is required' })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-gray-50/50 border ${errors.projectTitle ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                  />
                  {errors.projectTitle && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.projectTitle.message}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+91 63058-18324"
                    {...register('phone', { required: 'Phone number is required' })}
                    className={`w-full px-4 py-3.5 rounded-xl bg-gray-50/50 border ${errors.phone ? 'border-red-500/50' : 'border-gray-200/60 focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/10'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400`}
                  />
                  {errors.phone && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.phone.message}</span>}
                </div>
              </div>

              {/* Modern ReCaptcha Section */}
              <div className="flex flex-col gap-2 items-start py-2 select-none">
                <ReCaptchaCheckbox onVerify={setIsCaptchaVerified} />
                {captchaError && <span className="text-[10px] font-bold text-red-500 mt-1 block">{captchaError}</span>}
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-full text-white font-extrabold bg-[#2563EB] hover:bg-[#F97316] hover:scale-103 active:scale-97 transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2 select-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-[2px] border-white/20 border-t-white animate-spin" />
                    <span>Sending Request...</span>
                  </>
                ) : (
                  <span>Send Request →</span>
                )}
              </button>
            </form>

            {/* Note below form */}
            <p className="text-gray-500 text-[10px] font-semibold mt-4 text-center">
              Any issue? Contact us at <a href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm" target="_blank" rel="noreferrer" className="text-[#2563EB] hover:underline transition-all">contact@sofzenix.in</a> or <a href="tel:+916305818324" className="text-[#2563EB] hover:underline transition-all">+91 63058-18324</a>.
            </p>

            {/* Success Alert Banner */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-600 text-sm font-bold text-center flex flex-col gap-1 shadow-md select-none"
                >
                  <span>🎉 Proposal Sent Successfully!</span>
                  <span className="text-xs font-semibold text-gray-500">We will review your requirements and respond within 24 hours.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Alert Banner */}
            <AnimatePresence>
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 text-sm font-bold text-center flex flex-col gap-1 shadow-md select-none"
                >
                  <span>⚠️ Submission Failed</span>
                  <span className="text-xs font-semibold text-gray-500">{submitError}</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

        {/* Right Side: Why Partner & Details (5 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col justify-between gap-8 h-full text-left"
        >
          {/* Why Partner List */}
          <div className="bg-white/80 border border-gray-200/50 p-8 rounded-[24px] shadow-sm">
            <h3 className="text-xl font-bold text-[#0F172A] mb-6">
              Why Partner With Us?
            </h3>
            <ul className="flex flex-col gap-4">
              {[
                'Full lifecycle ownership from strategy to 24/7 ops',
                'Design systems & growth experimentation baked in',
                'Transparent velocity metrics & release cadence',
                'Security, performance & accessibility by default',
                'Agile delivery with rapid iteration cycles',
                'Dedicated project manager for every client',
                'Proven track record across diverse industries',
                'Seamless collaboration with your in-house teams'
              ].map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#2563EB] mt-2 flex-shrink-0" />
                  <span className="text-[#475569] text-xs font-bold leading-normal">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details card */}
          <div className="bg-white/80 border border-gray-200/50 p-8 rounded-[24px] shadow-sm">
            <h3 className="text-lg font-bold text-[#0F172A] mb-4 uppercase tracking-widest text-[#F97316]">
              Contact
            </h3>
            <div className="flex flex-col gap-3 font-semibold text-[#475569] text-sm">
              <a href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm" target="_blank" rel="noreferrer" className="text-[#2563EB] hover:underline transition-all">
                contact@sofzenix.in
              </a>
              <a href="tel:+916305818324" className="hover:text-[#2563EB] hover:underline transition-all">
                +91 63058-18324
              </a>
              <p className="text-gray-500">
                0-00, Narasaraopet - Guntur Rd, Arundelpet, Narasaraopeta, Andhra Pradesh 522601
              </p>
            </div>
          </div>

          {/* Let's Connect Social Link card */}
          <div className="bg-white/80 border border-gray-200/50 p-8 rounded-[24px] flex flex-col items-start gap-4 shadow-sm">
            <h3 className="text-base font-bold text-[#0F172A] tracking-widest uppercase text-[#2563EB]">
              Let's Connect
            </h3>
            
            {/* Social icons row */}
            <div className="flex items-center gap-3 w-full">
              <a 
                href="https://www.linkedin.com/company/sofzenix-it-solutions/posts/?feedView=all" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#2563EB] hover:bg-[#2563EB]/10 hover:text-[#2563EB] flex items-center justify-center text-gray-500 text-lg transition-all"
              >
                <FaLinkedin />
              </a>
              
              <a 
                href="https://x.com/SoftechITSol" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#2563EB] hover:bg-[#2563EB]/10 hover:text-[#2563EB] flex items-center justify-center text-gray-500 text-lg transition-all"
              >
                <FaTwitter />
              </a>
              
              <a 
                href="https://github.com/softechitsolution" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#2563EB] hover:bg-[#2563EB]/10 hover:text-[#2563EB] flex items-center justify-center text-gray-500 text-lg transition-all"
              >
                <FaGithub />
              </a>

              <a 
                href="https://www.instagram.com/sofzenix_it_solutionsllp/" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#2563EB] hover:bg-[#2563EB]/10 hover:text-[#2563EB] flex items-center justify-center text-gray-500 text-lg transition-all"
              >
                <FaInstagram />
              </a>

              <a 
                href="https://www.facebook.com/people/Sofzenix-It-Solution/100094780795333/?rdid=hIi9DWPGLPoC5FVI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B7FRzxjo9%2F" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#2563EB] hover:bg-[#2563EB]/10 hover:text-[#2563EB] flex items-center justify-center text-gray-500 text-lg transition-all"
              >
                <FaFacebook />
              </a>

              <a 
                href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm" 
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#2563EB] hover:bg-[#2563EB]/10 hover:text-[#2563EB] flex items-center justify-center text-gray-500 text-lg transition-all"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default ContactSection;
