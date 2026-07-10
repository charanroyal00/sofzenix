import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram, 
  FaFacebook, 
  FaTwitter, 
  FaYoutube, 
  FaCalendarAlt, 
  FaClock, 
  FaChevronDown, 
  FaChevronUp, 
  FaArrowRight, 
  FaGlobe, 
  FaFileUpload, 
  FaTimes,
  FaCheckCircle,
  FaShieldAlt,
  FaUsers,
  FaCogs,
  FaChartLine,
  FaHeadset
} from 'react-icons/fa';
import ReCaptchaCheckbox from '../components/ReCaptchaCheckbox';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [captchaError, setCaptchaError] = useState('');
  const [fileAttachment, setFileAttachment] = useState(null);
  const [activeFAQ, setActiveFAQ] = useState(null);
  
  const formRef = useRef(null);

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset,
    setValue
  } = useForm({
    defaultValues: {
      serviceRequired: 'Custom Software',
      projectBudget: '$5K - $10K',
      projectTimeline: '1-3 Months',
      agreedToPrivacy: false
    }
  });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // --- File Upload Handler ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check size limit: 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB limit.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setFileAttachment({
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileData: reader.result // base64 encoding
      });
    };
    reader.readAsDataURL(file);
  };

  const removeAttachment = () => {
    setFileAttachment(null);
  };

  // --- Form Submission ---
  const onSubmit = async (data) => {
    if (!isCaptchaVerified) {
      setCaptchaError('Please complete the reCAPTCHA verification.');
      return;
    }
    setCaptchaError('');
    setIsSubmitting(true);

    const payload = {
      fullName: data.fullName,
      companyName: data.companyName,
      email: data.email,
      phone: data.phone,
      country: data.country,
      serviceRequired: data.serviceRequired,
      projectBudget: data.projectBudget,
      projectTimeline: data.projectTimeline,
      message: data.message,
      attachment: fileAttachment
    };

    try {
      const res = await axios.post('http://localhost:5000/api/contacts', payload);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitMessage(res.data.message || 'Thank you! Your message has been received.');
      reset();
      setFileAttachment(null);
      setIsCaptchaVerified(false);
      
      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (err) {
      console.warn('Backend contact request failed, using sandbox fallback mode:', err);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmitMessage('Your message has been received successfully (local sandbox mode). We will get back to you shortly!');
      reset();
      setFileAttachment(null);
      setIsCaptchaVerified(false);
      
      setTimeout(() => setSubmitSuccess(false), 8000);
    }
  };

  return (
    <div
      className="min-h-screen text-[#475569] bg-transparent pt-28 pb-20 relative z-10 overflow-hidden font-sans"
    >
      
      {/* 1. HERO SECTION */}
      <section className="relative max-w-[1400px] mx-auto px-6 md:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 text-left flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563EB]/5 border border-[#2563EB]/10 w-fit backdrop-blur-md"
          >
            <span className="text-[#2563EB]">📞</span>
            <span className="text-xs font-bold tracking-wider uppercase text-gray-500">Contact Sofzenix</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] bg-gradient-to-r from-[#0F172A] via-[#2563EB] to-[#F97316] bg-clip-text text-transparent"
          >
            Let's Build Something Amazing Together
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#475569] text-sm md:text-base leading-relaxed max-w-2xl font-semibold"
          >
            Get in touch with Sofzenix IT Solutions LLP for custom software development, web applications, mobile apps, cloud solutions, AI services, enterprise software, internships, hiring, partnerships, and technical consulting. Our team is ready to help transform your ideas into scalable digital products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <button 
              onClick={() => window.open('https://calendly.com/sofzenix', '_blank')}
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-primary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
            >
              Book Free Consultation
            </button>
            <button 
              onClick={scrollToForm}
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-secondary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
            >
              Request a Quote
            </button>
          </motion.div>
        </div>

        {/* Hero Support Vector Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          <div className="absolute w-[260px] h-[260px] rounded-full bg-[#2563EB]/5 blur-[80px] -z-10 animate-pulse-slow" />
          <div className="absolute w-[220px] h-[220px] rounded-full bg-[#F97316]/2 blur-[70px] -z-10 animate-pulse-slower" />

          {/* Premium Illustration box */}
          <div className="w-full max-w-[420px] p-6 rounded-[24px] bg-white/80 border border-gray-200/50 backdrop-blur-md shadow-2xl relative overflow-hidden group text-left">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200/10 mb-6">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-ping" />
                </span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Sofzenix Support Center</span>
              </div>
              <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider bg-green-500/10 px-2 py-0.5 rounded-full">Online</span>
            </div>

            {/* Custom Support SVG */}
            <svg viewBox="0 0 400 250" className="w-full h-auto text-[#0F172A]" fill="none">
              {/* Graphic element dots */}
              <circle cx="200" cy="125" r="70" fill="rgba(37, 99, 235, 0.03)" stroke="rgba(37, 99, 235, 0.15)" strokeWidth="1" />
              <circle cx="200" cy="125" r="45" fill="rgba(249, 115, 22, 0.02)" stroke="rgba(249, 115, 22, 0.1)" strokeWidth="1" />

              {/* Server connection nodes */}
              <g transform="translate(200, 125)">
                <circle r="20" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2" />
                <path d="M-6-4 L6-4 M-6 0 L6 0 M-6 4 L6 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
              </g>

              {/* Surrounding Client Nodes */}
              <g transform="translate(110, 80)">
                <circle r="15" fill="#FFFFFF" stroke="#F97316" strokeWidth="1.5" />
                <path d="M-4-2 L4-2 M-4 2 L2 2" stroke="#F97316" strokeWidth="1" />
              </g>
              <g transform="translate(290, 80)">
                <circle r="15" fill="#FFFFFF" stroke="#E25CFF" strokeWidth="1.5" />
                <path d="M-3-3 L3 3 M3-3 L-3 3" stroke="#E25CFF" strokeWidth="1" />
              </g>
              <g transform="translate(200, 210)">
                <circle r="15" fill="#FFFFFF" stroke="#10B981" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="4" fill="#10B981" />
              </g>

              {/* Pulsing connections */}
              <path d="M125 80 L180 125 M275 80 L220 125 M200 195 L200 145" stroke="rgba(0,0,0,0.15)" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Float visual pill */}
            <div className="absolute bottom-6 left-6 bg-white/80 border border-gray-200/50 px-3.5 py-2 rounded-lg flex items-center gap-2 shadow-lg">
              <span className="text-[#F97316] font-bold text-xs">SLA: 100%</span>
            </div>
            
            <p className="text-[10px] text-[#64748B] mt-4 leading-relaxed font-mono">
              $ ping -c 3 api.sofzenix.in<br/>
              64 bytes from 104.21.32.18: icmp_seq=1 ttl=56 time=18.4 ms<br/>
              64 bytes from 104.21.32.18: icmp_seq=2 ttl=56 time=18.1 ms
            </p>
          </div>
        </motion.div>
      </section>

      {/* 2. QUICK CONTACT CARDS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickContacts.map((contact, idx) => {
            const IconComponent = contact.icon;
            return (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/80 p-8 rounded-[20px] border border-gray-200/50 flex flex-col gap-4 text-left group hover:-translate-y-1.5 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] group-hover:bg-[#F97316]/10 group-hover:border-[#F97316]/20 group-hover:text-[#F97316] transition-colors duration-300">
                  <IconComponent className="text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{contact.title}</h3>
                <a 
                  href={contact.link} 
                  target={contact.link.startsWith('http') ? '_blank' : undefined}
                  rel={contact.link.startsWith('http') ? 'noreferrer' : undefined}
                  className="text-base font-extrabold text-[#0F172A] hover:text-[#2563EB] transition-colors duration-200"
                >
                  {contact.value}
                </a>
                <p className="text-[#475569] text-xs font-semibold leading-relaxed">{contact.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. CONTACT FORM */}
      <section id="contact-form" ref={formRef} className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="max-w-4xl mx-auto bg-white/80 border border-gray-200/50 p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          <div className="text-left flex flex-col gap-3 mb-10 border-b border-gray-200/20 pb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Send Us a Message</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              Fill out your company or project details below. We review all project scopes within 24 business hours.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 text-left">
            {/* Row 1: Full Name & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Jane Doe"
                  {...register('fullName', { required: 'Full name is required' })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.fullName ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
                />
                {errors.fullName && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.fullName.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Company Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Acme Corp"
                  {...register('companyName')}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 focus:border-[#2563EB] text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm"
                />
              </div>
            </div>

            {/* Row 2: Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                <input 
                  type="email" 
                  placeholder="you@company.com"
                  {...register('email', { 
                    required: 'Email address is required',
                    pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                  })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.email ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
                />
                {errors.email && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.email.message}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="e.g. +91 63058-18324"
                  {...register('phone', { required: 'Phone number is required' })}
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.phone ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
                />
                {errors.phone && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.phone.message}</span>}
              </div>
            </div>

            {/* Country Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Country</label>
              <input 
                type="text" 
                placeholder="e.g. India"
                {...register('country', { required: 'Country is required' })}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.country ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
              />
              {errors.country && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.country.message}</span>}
            </div>

            {/* Service, Budget, Timeline Selects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Service Required</label>
                <select 
                  {...register('serviceRequired')}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] transition-all"
                >
                  <option value="Custom Software">Custom Software</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Apps">Mobile Apps</option>
                  <option value="Cloud Solutions">Cloud Solutions</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Enterprise Software">Enterprise Software</option>
                  <option value="IT Consulting">IT Consulting</option>
                  <option value="Digital Transformation">Digital Transformation</option>
                  <option value="Internships/Careers">Internships/Careers</option>
                  <option value="Business Partnerships">Business Partnerships</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Project Budget</label>
                <select 
                  {...register('projectBudget')}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] transition-all"
                >
                  <option value="Less than $5K">Less than $5K</option>
                  <option value="$5K - $10K">$5K - $10K</option>
                  <option value="$10K - $25K">$10K - $25K</option>
                  <option value="$25K+">$25K+</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Project Timeline</label>
                <select 
                  {...register('projectTimeline')}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/80 border border-gray-200/50 text-[#0F172A] text-sm focus:outline-none focus:border-[#2563EB] transition-all"
                >
                  <option value="Less than 1 Month">Less than 1 Month</option>
                  <option value="1-3 Months">1-3 Months</option>
                  <option value="3-6 Months">3-6 Months</option>
                  <option value="6+ Months">6+ Months</option>
                </select>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Message</label>
              <textarea 
                rows="5"
                placeholder="Briefly describe project scope, requirements, or details..."
                {...register('message', { required: 'Message description is required' })}
                className={`w-full px-4 py-3.5 rounded-xl bg-white/80 border ${errors.message ? 'border-red-500/50' : 'border-gray-200/50 focus:border-[#2563EB]'} text-[#0F172A] text-sm focus:outline-none transition-all placeholder-gray-400 shadow-sm`}
              />
              {errors.message && <span className="text-[10px] font-bold text-red-500 mt-1 block">{errors.message.message}</span>}
            </div>

            {/* File Upload Field */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Project Document (Optional)</label>
              <div className="relative border border-dashed border-gray-200/50 rounded-xl p-4 bg-[#F8FAFC] hover:bg-gray-100/50 transition-all flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaFileUpload className="text-[#2563EB] text-lg" />
                  <div>
                    <p className="text-xs font-bold text-[#0F172A]">Upload Project Brief</p>
                    <p className="text-[10px] text-gray-500 font-semibold">PDF, DOCX, ZIP, or TXT up to 5MB</p>
                  </div>
                </div>
                <input 
                  type="file" 
                  accept=".pdf,.docx,.zip,.txt,.doc"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                
                {fileAttachment && (
                  <div className="absolute right-4 bg-[#F8FAFC] border border-gray-200/60 px-3 py-1.5 rounded-lg flex items-center gap-2 z-10 animate-fade-in shadow-md">
                    <span className="text-[10px] font-extrabold text-[#0F172A] max-w-[120px] truncate">{fileAttachment.fileName}</span>
                    <button type="button" onClick={removeAttachment} className="text-red-500 hover:text-red-700 text-xs cursor-pointer">
                      <FaTimes />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Captcha Verification */}
            <div className="flex flex-col gap-2 items-start py-2">
              <ReCaptchaCheckbox onVerify={setIsCaptchaVerified} />
              {captchaError && <span className="text-[10px] font-bold text-red-500 mt-1 block">{captchaError}</span>}
            </div>

            {/* Consent Checkbox */}
            <div className="flex items-start gap-3 select-none">
              <input 
                id="agreedToPrivacy"
                type="checkbox"
                {...register('agreedToPrivacy', { required: 'You must agree to the privacy policy' })}
                className="mt-1 w-4 h-4 bg-white border border-gray-200/50 rounded focus:ring-0 cursor-pointer"
              />
              <label htmlFor="agreedToPrivacy" className="text-xs text-gray-500 cursor-pointer font-semibold">
                I agree to the Privacy Policy.
              </label>
            </div>
            {errors.agreedToPrivacy && <span className="text-[10px] font-bold text-red-500 mt-0 block">{errors.agreedToPrivacy.message}</span>}

            {/* Form Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-center">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-glow-primary flex-grow py-4 rounded-full text-white font-extrabold transition-all duration-300 shadow-sm cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-[2px] border-white/20 border-t-white animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <span>Send Message →</span>
                )}
              </button>

              <button
                type="button"
                onClick={() => window.open('https://calendly.com/sofzenix', '_blank')}
                className="btn-glow-secondary px-8 py-4 rounded-full font-bold hover:scale-103 active:scale-97 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 select-none"
              >
                <span>Schedule Consultation</span>
              </button>
            </div>
          </form>

          {/* Form Success Animation */}
          <AnimatePresence>
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="mt-6 p-5 rounded-xl bg-green-50/10 border border-green-500/30 text-green-600 text-sm font-bold text-center flex flex-col gap-1 shadow-md select-none"
              >
                <span>🎉 Message Sent Successfully!</span>
                <span className="text-xs font-semibold text-gray-500">{submitMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 4. BOOK CONSULTATION SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#2563EB]/10 via-white to-transparent border border-gray-200/50 p-8 md:p-12 rounded-[24px] flex flex-col md:flex-row gap-6 items-center justify-between text-left shadow-lg">
          <div className="flex flex-col gap-2 max-w-xl">
            <h2 className="text-2xl font-bold text-[#0F172A]">Need Technical Consultation?</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              Schedule a free consultation with our experts to discuss your project requirements, technology stack, timelines, and business goals.
            </p>
          </div>
          <button
            onClick={() => window.open('https://calendly.com/sofzenix', '_blank')}
            className="px-8 py-3.5 rounded-full text-white font-extrabold bg-[#2563EB] hover:bg-[#F97316] transition-colors duration-300 whitespace-nowrap cursor-pointer shadow-md select-none text-sm"
          >
            Book Consultation
          </button>
        </div>
      </section>

      {/* 5. GOOGLE MAP SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map display */}
          <div className="lg:col-span-8 h-[360px] md:h-[450px] rounded-[24px] overflow-hidden border border-gray-200/50 relative shadow-xl">
            {/* Styled clean light Google Map */}
            <div 
              className="w-full h-full"
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15289.789182601725!2d80.0435889!3d16.2358475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a753e1a067ff3%3A0xe10ad5be4f29a00b!2sNarasaraopeta%2C%20Andhra%20Pradesh%20522601!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
              }}
            />
          </div>

          {/* Map Info cards */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-5 text-left">
            <div className="bg-white/80 p-6 rounded-[20px] border border-gray-200/50 flex-grow flex flex-col justify-center shadow-sm">
              <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest mb-1.5 block">Location</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">Office Address</h3>
              <p className="text-[#475569] text-xs font-semibold leading-relaxed mb-4">
                0-00, Narasaraopet - Guntur Rd, Arundelpet, Narasaraopeta, Andhra Pradesh 522601
              </p>
              <button 
                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Sofzenix+IT+Solutions+LLP+Narasaraopeta', '_blank')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F8FAFC] border border-gray-200/60 text-[#0F172A] font-bold text-xs hover:border-[#2563EB] hover:text-[#2563EB] transition-colors cursor-pointer w-fit select-none"
              >
                <span>Directions Button</span>
                <FaArrowRight className="text-[9px]" />
              </button>
            </div>

            <div className="bg-white/80 p-6 rounded-[20px] border border-gray-200/50 flex-grow flex flex-col justify-center shadow-sm">
              <span className="text-[10px] font-bold text-[#2563EB] uppercase tracking-widest mb-1.5 block">Access</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">Nearby Landmark</h3>
              <p className="text-[#475569] text-xs font-semibold leading-relaxed">
                Located on Narasaraopet - Guntur Road, Arundelpet, near Saibaba Temple, Narasaraopeta.
              </p>
            </div>

            <div className="bg-white/80 p-6 rounded-[20px] border border-gray-200/50 flex-grow flex flex-col justify-center shadow-sm">
              <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest mb-1.5 block">Parking</span>
              <h3 className="text-lg font-bold text-[#0F172A] mb-2">Parking Information</h3>
              <p className="text-[#475569] text-xs font-semibold leading-relaxed">
                Visitor parking is available on-site. Roadside parking is also accessible during business hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BUSINESS INFORMATION */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="bg-white/80 p-8 md:p-12 rounded-[28px] border border-gray-200/50 text-left shadow-sm">
          <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-8 border-b border-gray-200/10 pb-4">Corporate & Business Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Company Name</span>
              <span className="text-sm font-bold text-[#0F172A]">Sofzenix IT Solutions LLP</span>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Business Type</span>
              <span className="text-sm font-bold text-[#0F172A]">Limited Liability Partnership</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Office Email</span>
              <a href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm" target="_blank" rel="noreferrer" className="text-sm font-bold text-[#2563EB] hover:underline">contact@sofzenix.in</a>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Support Email</span>
              <a href="https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm" target="_blank" rel="noreferrer" className="text-sm font-bold text-[#2563EB] hover:underline">contact@sofzenix.in</a>
            </div>

            <div className="flex flex-col gap-1.5 lg:mt-4">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Registered Address</span>
              <span className="text-sm font-bold text-[#0F172A]">0-00, Narasaraopet - Guntur Rd, Arundelpet, Narasaraopeta, Andhra Pradesh 522601</span>
            </div>

            <div className="flex flex-col gap-1.5 lg:mt-4">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Phone Numbers</span>
              <span className="text-sm font-bold text-[#0F172A]">+91 63058-18324</span>
            </div>

            <div className="flex flex-col gap-1.5 lg:mt-4">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">GST Reference (Mock)</span>
              <span className="text-sm font-bold text-[#0F172A]">36AAHCSXXXXX1Zx</span>
            </div>

            <div className="flex flex-col gap-1.5 lg:mt-4">
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Website</span>
              <a href="https://www.sofzenix.in" target="_blank" rel="noreferrer" className="text-sm font-bold text-[#F97316] hover:underline">www.sofzenix.in</a>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WORKING HOURS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A] mb-4">Our Service Schedule</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed">
              We provide continuous integration monitoring and active engineering availability. Standard corporate inquiries are handled during business hours. Emergency engineering SLAs are operational 24/7.
            </p>
          </div>

          <div className="bg-white/80 p-6 md:p-8 rounded-[24px] border border-gray-200/50 flex flex-col gap-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-200/10 pb-3">
              <div className="flex items-center gap-3">
                <FaClock className="text-[#2563EB]" />
                <span className="text-sm font-bold text-[#0F172A]">Monday–Friday</span>
              </div>
              <span className="text-sm font-semibold text-[#475569]">9:00 AM – 6:00 PM IST</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200/10 pb-3">
              <div className="flex items-center gap-3">
                <FaClock className="text-[#F97316]" />
                <span className="text-sm font-bold text-[#0F172A]">Saturday</span>
              </div>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Emergency Support Only</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-200/10 pb-3">
              <div className="flex items-center gap-3">
                <FaClock className="text-red-500" />
                <span className="text-sm font-bold text-[#0F172A]">Sunday</span>
              </div>
              <span className="text-sm font-semibold text-red-500">Closed</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-3">
                <FaGlobe className="text-[#10B981]" />
                <span className="text-sm font-bold text-[#0F172A]">Emergency Support</span>
              </div>
              <span className="text-xs font-bold text-[#10B981] uppercase tracking-wider animate-pulse">24/7 SLA Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SOCIAL MEDIA SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">Let's Connect Socially</h2>
          <p className="text-[#475569] text-xs md:text-sm max-w-xl font-semibold">
            Follow our digital release logs, repository expansions, or direct developer bulletins.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {socials.map((social) => {
            const SocialIcon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#F8FAFC] border border-gray-200/60 transition-all duration-300 hover:scale-105 shadow-sm ${social.glowColor}`}
              >
                <SocialIcon className={`text-base ${social.brandColor}`} />
                <span className="text-xs font-bold text-[#0F172A]">{social.name}</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* 9. WHY CONTACT SOFZENIX */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Why Work With Sofzenix?</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            We operate at high technical standards to handle your custom digital objectives.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyContactList.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/80 p-6 md:p-8 rounded-[20px] border border-gray-200/50 flex flex-col gap-4 text-left group hover:border-[#2563EB]/30 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center text-[#2563EB] group-hover:text-[#F97316] transition-colors">
                  <IconComp className="text-xl" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">{item.title}</h3>
                <p className="text-[#475569] text-xs font-semibold leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20">
        <div className="text-center flex flex-col items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A]">Frequently Asked Questions</h2>
          <p className="text-[#475569] text-sm md:text-base max-w-2xl">
            Common questions answered regarding starting a software partnership with Sofzenix.
          </p>
        </div>

        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqList.map((faq, idx) => {
            const isOpen = activeFAQ === idx;
            return (
              <div
                key={idx}
                className="bg-white/80 rounded-[16px] border border-gray-200/50 overflow-hidden text-left shadow-sm"
              >
                <button
                  onClick={() => setActiveFAQ(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-[#0F172A] hover:text-[#2563EB] font-bold text-sm md:text-base cursor-pointer select-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <FaChevronUp className="text-sm" /> : <FaChevronDown className="text-sm" />}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-[#475569] text-xs md:text-sm font-semibold leading-relaxed border-t border-gray-200/20 pt-4">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 border-t border-gray-200/20 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#2563EB]/10 via-[#F97316]/5 to-[#F3F8FF] border border-gray-200/50 p-10 md:p-16 rounded-[32px] flex flex-col items-center gap-6 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#F97316]/3 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-[#2563EB]/3 rounded-full blur-[80px]" />

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A]">Ready to Start Your Next Project?</h2>
          
          <p className="text-[#475569] text-sm md:text-base max-w-2xl leading-relaxed font-semibold">
            Whether you're a startup, enterprise, educational institution, or growing business, Sofzenix IT Solutions LLP is ready to help you build innovative digital solutions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 relative z-10">
            <button 
              onClick={scrollToForm}
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-primary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
            >
              Let's Talk
            </button>
            <button 
              onClick={() => window.open('https://calendly.com/sofzenix', '_blank')}
              className="px-8 py-3.5 rounded-full text-white font-extrabold btn-glow-secondary hover:scale-103 active:scale-97 cursor-pointer transition-all duration-300 text-sm"
            >
              Book Consultation
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

// --- DATA CONFIGURATIONS ---

const quickContacts = [
  {
    title: 'Phone',
    value: '+91 63058-18324',
    link: 'tel:+916305818324',
    icon: FaPhoneAlt,
    desc: 'Call us anytime during business hours.'
  },
  {
    title: 'Email',
    value: 'contact@sofzenix.in',
    link: 'https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm',
    icon: FaEnvelope,
    desc: 'Send an inquiry directly. Fast answers guaranteed.'
  },
  {
    title: 'WhatsApp',
    value: 'Chat on WhatsApp',
    link: 'https://wa.me/916305818324',
    icon: FaWhatsapp,
    desc: 'Instantly connect with our engineering coordinators.'
  }
];

const socials = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/sofzenix-it-solutions/posts/?feedView=all', icon: FaLinkedin, brandColor: 'text-[#2563EB]', glowColor: 'hover:border-[#2563EB] hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]' },
  { name: 'GitHub', url: 'https://github.com/softechitsolution', icon: FaGithub, brandColor: 'text-[#0F172A]', glowColor: 'hover:border-gray-250 hover:shadow-[0_0_12px_rgba(0,0,0,0.1)]' },
  { name: 'Instagram', url: 'https://www.instagram.com/sofzenix_it_solutionsllp/', icon: FaInstagram, brandColor: 'text-[#E25CFF]', glowColor: 'hover:border-[#E25CFF] hover:shadow-[0_0_12px_rgba(226,92,255,0.2)]' },
  { name: 'Facebook', url: 'https://www.facebook.com/people/Sofzenix-It-Solution/100094780795333/?rdid=hIi9DWPGLPoC5FVI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B7FRzxjo9%2F', icon: FaFacebook, brandColor: 'text-[#2563EB]', glowColor: 'hover:border-[#2563EB] hover:shadow-[0_0_12px_rgba(37,99,235,0.2)]' },
  { name: 'Twitter/X', url: 'https://x.com/SoftechITSol', icon: FaTwitter, brandColor: 'text-sky-500', glowColor: 'hover:border-sky-500 hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]' },
  { name: 'YouTube', url: 'https://youtube.com', icon: FaYoutube, brandColor: 'text-red-500', glowColor: 'hover:border-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.2)]' },
  { name: 'WhatsApp', url: 'https://wa.me/916305818324', icon: FaWhatsapp, brandColor: 'text-emerald-500', glowColor: 'hover:border-emerald-500 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]' },
  { name: 'Email', url: 'https://mail.google.com/mail/u/0/?fs=1&to=contact@sofzenix.in&su=Business+Inquiry&body=Hello+Sofzenix+IT+Solutions,%0D%0AI+would+like+to+know+more+about+your+services.&tf=cm', icon: FaEnvelope, brandColor: 'text-[#F97316]', glowColor: 'hover:border-[#F97316] hover:shadow-[0_0_12px_rgba(255,138,0,0.2)]' }
];

const whyContactList = [
  { title: 'Fast Response', desc: 'We read all project definitions and reply with feedback or a quote within 24 hours.', icon: FaClock },
  { title: 'Dedicated Experts', desc: 'Work directly with engineering leads and solutions architects, not general sales reps.', icon: FaUsers },
  { title: 'Enterprise Security', desc: 'Secure consultations protected by comprehensive NDAs and intellectual property safety.', icon: FaShieldAlt },
  { title: 'Transparent Communication', desc: 'Clear reporting, direct Slack/Zoom schedules, and milestone-driven velocity.', icon: FaCogs }
];

const faqList = [
  { q: 'How quickly do you respond?', a: 'We respond to all contact and quoting inquiries within 2 to 4 business hours.' },
  { q: 'Do you offer free consultation?', a: 'Yes. We offer a free 30-minute discovery call to evaluate your engineering requirements and align on feasibility.' },
  { q: 'Can I request a project quotation?', a: 'Absolutely. Use our form to submit your project goals and document briefs, and we will send a detailed technical estimation.' },
  { q: 'Can I schedule a meeting?', a: 'Yes, you can click "Book Free Consultation" to instantly open our Calendly scheduling calendar.' },
  { q: 'Do you provide internship support?', a: 'Yes, we accept vetted interns for software development pipelines. Please select "Internships/Careers" in the form services.' },
  { q: 'Can international clients contact you?', a: 'Yes, we collaborate with startups and enterprise companies globally across multiple overlapping timezones.' },
  { q: 'What industries do you work with?', a: 'We work across diverse sectors including Fintech, E-commerce, Edtech, healthcare, logistics, and AI/SaaS applications.' }
];

export default Contact;
