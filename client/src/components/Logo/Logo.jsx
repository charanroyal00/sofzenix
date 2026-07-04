import { motion } from 'framer-motion';

// Use public URL to bypass Vite asset processing issues
const logoImg = '/logo.png';
const logoFallback = 'https://sofzenix.in/logo.png';

const Logo = ({ variant = 'navbar', className = '' }) => {
  // Sizing configurations for balanced enterprise navigation (after margins cropped):
  // - Navbar desktop: Visible logo height 54px, Container height 72px, width 170px, left padding 24px
  // - Responsive visible heights for Navbar:
  //   - Desktop (lg): 54px
  //   - Laptop (md): 50px
  //   - Tablet (sm): 46px
  //   - Mobile (default): 40px
  // - Footer: Visible logo height 82px (reduced from 90px by ~9%)
  // - Verify Section / default fallback: Visible logo height 54px
  // w-auto object-contain, no shadows, glows, borders, or custom filters.

  if (variant === 'navbar' || variant === 'navbar-mobile') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`flex items-center justify-start h-[72px] w-[130px] sm:w-[145px] md:w-[155px] lg:w-[170px] pl-4 md:pl-[24px] select-none ${className}`}
      >
        <img
          src={logoImg}
          onError={e => { e.target.onerror = null; e.target.src = logoFallback; }}
          alt="Sofzenix IT Solutions LLP"
          className="h-[40px] sm:h-[46px] md:h-[50px] lg:h-[54px] w-auto object-contain pointer-events-none"
          style={{ display: 'block', maxWidth: '100%', background: 'transparent' }}
        />
      </motion.div>
    );
  }
  
  if (variant === 'footer') {
    return (
      <div className={`flex items-center justify-start select-none mb-[20px] ${className}`}>
        <img
          src={logoImg}
          onError={e => { e.target.onerror = null; e.target.src = logoFallback; }}
          alt="Sofzenix IT Solutions LLP"
          className="h-[82px] w-auto object-contain pointer-events-none"
          style={{ display: 'block', maxWidth: '100%', background: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`flex items-center justify-start h-[72px] w-[170px] pl-[24px] select-none ${className}`}
    >
      <img
        src={logoImg}
        onError={e => { e.target.onerror = null; e.target.src = logoFallback; }}
        alt="Sofzenix IT Solutions LLP"
        className="h-[40px] sm:h-[46px] md:h-[50px] lg:h-[54px] w-auto object-contain pointer-events-none"
        style={{ display: 'block', maxWidth: '100%', background: 'transparent' }}
      />
    </motion.div>
  );
};

export default Logo;
