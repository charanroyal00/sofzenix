import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Careers from './pages/Careers';
import Internships from './pages/Internships';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Partners from './pages/Partners';
import Hire from './pages/Hire';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

import ScrollToTop from './components/ScrollToTop';
import WireframeLandscape from './components/WireframeLandscape';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Standalone 3D Wireframe Mesh Background View (No UI, No Text, No Logos) */}
        <Route path="/wireframe" element={<WireframeLandscape />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="partners" element={<Partners />} />
          <Route path="hire" element={<Hire />} />
          <Route path="careers" element={<Careers />} />
          <Route path="internships" element={<Internships />} />
          <Route path="blog" element={<Blog />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
