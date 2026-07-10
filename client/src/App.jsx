import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import ScrollToTop from './components/ScrollToTop';

// Route-based lazy loading for code splitting
const About        = lazy(() => import('./pages/About'));
const Services     = lazy(() => import('./pages/Services'));
const Portfolio    = lazy(() => import('./pages/Portfolio'));
const Careers      = lazy(() => import('./pages/Careers'));
const Internships  = lazy(() => import('./pages/Internships'));
const Blog         = lazy(() => import('./pages/Blog'));
const Contact      = lazy(() => import('./pages/Contact'));
const Partners     = lazy(() => import('./pages/Partners'));
const Hire         = lazy(() => import('./pages/Hire'));
const NotFound     = lazy(() => import('./pages/NotFound'));
const WireframeLandscape = lazy(() => import('./components/WireframeLandscape'));

// Admin pages — lazy loaded, completely separate from public layout
const AdminLogin     = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Protected route wrapper — redirects to admin login if no token
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" replace />;
};

// Instant zero-CLS fallback loader
const PageLoader = () => (
  <div className="min-h-[70vh] w-full flex items-center justify-center p-8">
    <div className="w-10 h-10 rounded-full border-3 border-[#2563EB]/20 border-t-[#2563EB] animate-spin" />
  </div>
);

function App() {
  // Idle preloading of key pages for instant navigation without blocking initial load
  useEffect(() => {
    const preloadRoutes = () => {
      import('./pages/About');
      import('./pages/Services');
      import('./pages/Portfolio');
      import('./pages/Contact');
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(preloadRoutes, { timeout: 3000 });
    } else {
      setTimeout(preloadRoutes, 1500);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Standalone 3D Wireframe Mesh Background View */}
          <Route path="/wireframe" element={<WireframeLandscape />} />

          {/* ── Admin routes — no public layout, no navbar ── */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <AdminRoute><AdminDashboard /></AdminRoute>
          } />
          {/* Redirect bare /admin to login */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />

          {/* ── Public routes inside Layout ── */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about"       element={<About />} />
            <Route path="services"    element={<Services />} />
            <Route path="portfolio"   element={<Portfolio />} />
            <Route path="partners"    element={<Partners />} />
            <Route path="hire"        element={<Hire />} />
            <Route path="careers"     element={<Careers />} />
            <Route path="internships" element={<Internships />} />
            <Route path="blog"        element={<Blog />} />
            <Route path="contact"     element={<Contact />} />
            <Route path="*"           element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
