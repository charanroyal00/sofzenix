import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import BackToTopButton from '../components/BackToTopButton';
import InteractiveBackground from '../components/InteractiveBackground';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-transparent text-white flex flex-col relative overflow-hidden">
      {/* Premium Interactive Background Mesh (Global Canvas) */}
      <InteractiveBackground />
      
      {/* Sticky Navigation */}
      <Header />

      {/* Main Content Area with Route Transitions */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Outlet />
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
