import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook, FaTwitter, FaEnvelope, FaArrowRight, FaCodeBranch } from 'react-icons/fa';

const linkedinPosts = [
  {
    id: 1,
    date: 'June 28, 2026',
    title: 'Pioneering Cognitive Workflows in 2026',
    excerpt: 'We are thrilled to launch our new automated agent integration suite, enabling businesses to scale operations seamlessly with advanced local models.',
    likes: 124,
    comments: 18,
    url: 'https://www.linkedin.com/company/sofzenix-it-solutions/posts/?feedView=all'
  },
  {
    id: 2,
    date: 'June 15, 2026',
    title: 'ISO Security Accreditations Secured',
    excerpt: 'Official announcement: Sofzenix is now ISO 9001:2015, ISO 27001:2022, and ISO 27701:2019 certified. Ensuring premier data safety and quality standards.',
    likes: 342,
    comments: 47,
    url: 'https://www.linkedin.com/company/sofzenix-it-solutions/posts/?feedView=all'
  },
  {
    id: 3,
    date: 'June 01, 2026',
    title: 'Expanding Spring Boot Microservices architectures',
    excerpt: 'Our architectural team shared insights on deploying highly concurrent Java microservices across AWS clusters. Read the case study.',
    likes: 198,
    comments: 29,
    url: 'https://www.linkedin.com/company/sofzenix-it-solutions/posts/?feedView=all'
  }
];

const githubRepos = [
  { name: 'mern-boilerplate-v4', stars: 45, forks: 12, lang: 'JavaScript', desc: 'Secure MERN stack architecture with JWT auth and dashboard layouts.' },
  { name: 'spring-cloud-gateway-security', stars: 89, forks: 24, lang: 'Java', desc: 'Enterprise microservices gateway utilizing OAuth2 and rate limiters.' },
  { name: 'predictive-analytics-agent', stars: 156, forks: 38, lang: 'Python', desc: 'Retrieval-Augmented Generation agent pipelines running on local models.' }
];

const socialHub = [
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://www.linkedin.com/company/sofzenix-it-solutions/posts/?feedView=all', color: 'hover:bg-[#0A66C2] hover:text-white text-[#0A66C2] bg-[#0A66C2]/10' },
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/softechitsolution', color: 'hover:bg-[#181717] hover:text-white text-[#181717] bg-[#181717]/10' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://www.instagram.com/sofzenix_it_solutionsllp/', color: 'hover:bg-[#E1306C] hover:text-white text-[#E1306C] bg-[#E1306C]/10' },
  { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/people/Sofzenix-It-Solution/100094780795333/?rdid=hIi9DWPGLPoC5FVI&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1B7FRzxjo9%2F', color: 'hover:bg-[#1877F2] hover:text-white text-[#1877F2] bg-[#1877F2]/10' },
  { name: 'Twitter (X)', icon: FaTwitter, url: 'https://x.com/SoftechITSol', color: 'hover:bg-[#1DA1F2] hover:text-white text-[#1DA1F2] bg-[#1DA1F2]/10' },
  { name: 'Email', icon: FaEnvelope, url: 'mailto:contact@sofzenix.in', color: 'hover:bg-[#D44638] hover:text-white text-[#D44638] bg-[#D44638]/10' }
];

const SocialFeedsSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % linkedinPosts.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + linkedinPosts.length) % linkedinPosts.length);
  };

  return (
    <section className="py-24 px-6 md:px-8 bg-white/40 relative border-b border-gray-200/20 overflow-hidden z-10">
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] bg-[#2563EB]/3 rounded-full blur-[90px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-[#F97316]/3 rounded-full blur-[100px] animate-pulse-slower" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col gap-20">
        
        {/* ==================================================
            1. LINKEDIN LATEST UPDATES CAROUSEL
            ================================================== */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto mb-12">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-widest block mb-3">LinkedIn Feed</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] mb-4">Latest Corporate Updates</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              Stay updated with our engineering achievements, industry insights, and corporate news.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto flex items-center justify-between gap-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-[#2563EB] hover:border-[#2563EB] hover:scale-105 transition-all shadow-sm cursor-pointer"
            >
              &larr;
            </button>

            <div className="w-full overflow-hidden min-h-[220px] flex items-center justify-center px-4">
              <AnimatePresence mode="wait">
                <motion.a
                  key={activeSlide}
                  href={linkedinPosts[activeSlide].url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full bg-white/70 backdrop-blur-xl border border-gray-200/50 p-8 rounded-[24px] text-left hover:border-[#2563EB]/30 hover:shadow-xl transition-all duration-300 flex flex-col gap-4 cursor-pointer relative group premium-card"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-[#2563EB] to-[#38BDF8]" />
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold text-[#2563EB] uppercase tracking-wider">{linkedinPosts[activeSlide].date}</span>
                    <FaLinkedin className="text-[#2563EB] text-xl group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-[#0F172A] group-hover:text-[#2563EB] transition-colors">{linkedinPosts[activeSlide].title}</h3>
                  <p className="text-[#475569] text-xs font-semibold leading-relaxed">{linkedinPosts[activeSlide].excerpt}</p>
                  
                  <div className="flex items-center gap-6 text-[10px] font-bold text-gray-500 border-t border-gray-100 pt-4">
                    <span>👍 {linkedinPosts[activeSlide].likes} Likes</span>
                    <span>💬 {linkedinPosts[activeSlide].comments} Comments</span>
                    <span className="text-[#2563EB] hover:underline flex items-center gap-1 ml-auto">
                      View post on LinkedIn <FaArrowRight className="text-[8px]" />
                    </span>
                  </div>
                </motion.a>
              </AnimatePresence>
            </div>

            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-[#2563EB] hover:border-[#2563EB] hover:scale-105 transition-all shadow-sm cursor-pointer"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* ==================================================
            2. GITHUB REPOSITORIES / TECH STRIP
            ================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 text-left flex flex-col gap-5">
            <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block">Open Source Alignment</span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] leading-tight">Contributing to the Developer Community</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold leading-relaxed">
              We actively maintain open-source templates, scaffolding structures, and utility helpers to assist developers in deploying secure frameworks.
            </p>
            <a 
              href="https://github.com/softechitsolution"
              target="_blank"
              rel="noreferrer"
              className="premium-primary-btn w-fit"
            >
              <FaGithub className="text-sm" />
              <span>Contribute on GitHub</span>
            </a>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {githubRepos.map((repo) => (
              <motion.a
                key={repo.name}
                href="https://github.com/softechitsolution"
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -6, border: '1px solid rgba(37,99,235,0.25)' }}
                className="bg-white/70 backdrop-blur-md border border-gray-200/50 p-6 rounded-[20px] flex flex-col justify-between shadow-sm cursor-pointer group premium-card"
              >
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <FaGithub className="text-gray-700 text-lg" />
                    <span className="text-[11px] font-mono font-bold text-[#0F172A] truncate group-hover:text-[#2563EB] transition-colors">{repo.name}</span>
                  </div>
                  <p className="text-[#64748B] text-[10px] font-semibold leading-relaxed mb-6">{repo.desc}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] font-extrabold text-gray-500 border-t border-gray-100 pt-3">
                  <span className="flex items-center gap-1">🌟 {repo.stars}</span>
                  <span className="flex items-center gap-1"><FaCodeBranch className="text-[8px]" /> {repo.forks}</span>
                  <span className="px-2 py-0.5 rounded bg-gray-100 text-[8px] uppercase tracking-wider">{repo.lang}</span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ==================================================
            3. UNIFIED STAY CONNECTED SECTION
            ================================================== */}
        <div className="text-center bg-[#F8FAFC] border border-gray-200/50 p-12 rounded-[28px] shadow-sm">
          <div className="max-w-2xl mx-auto mb-10">
            <span className="text-[#F97316] text-xs font-bold uppercase tracking-widest block mb-3">Connect Hub</span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] mb-4">Stay Connected With Us</h2>
            <p className="text-[#475569] text-xs md:text-sm font-semibold">
              Join our communities on social platforms or send us an inquiry directly.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 max-w-4xl mx-auto">
            {socialHub.map((platform) => {
              const Icon = platform.icon;
              return (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.15, boxShadow: "0 0 15px currentColor" }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center text-xl transition-all duration-300 shadow-sm ${platform.color}`}
                  title={platform.name}
                >
                  <Icon />
                </motion.a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialFeedsSection;
