import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import BackToTopButton from '../components/BackToTopButton';
import InteractiveBackground from '../components/InteractiveBackground';

const PageFallback = () => (
  <div className="min-h-[65vh] w-full flex items-center justify-center p-8">
    <div className="w-10 h-10 rounded-full border-3 border-[#2563EB]/20 border-t-[#2563EB] animate-spin" />
  </div>
);

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col relative overflow-hidden">
      {/* Premium Interactive Background Mesh (Global Canvas) */}
      <InteractiveBackground />
      
      {/* Sticky Navigation */}
      <Header />

      {/* Main Content Area with Instant Route Transitions */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<PageFallback />}>
              <Outlet />
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Placeholder */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};

export default Layout;
