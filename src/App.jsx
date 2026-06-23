import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import FinancialCheckup from './pages/FinancialCheckup';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import ConsultationModal from './components/ConsultationModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';

function AnimatedRoutes({ onOpenModal }) {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home onOpenModal={onOpenModal} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/checkup" element={<FinancialCheckup />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('rahul_kulkarni_darkmode') === 'true';
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('rahul_kulkarni_darkmode', String(next));
      return next;
    });
  };

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-theme-override');
      document.body.classList.add('dark-theme-override');
    } else {
      root.classList.remove('dark-theme-override');
      document.body.classList.remove('dark-theme-override');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <ScrollToTop />
      
      {/* Premium Loader Screen */}
      <LoadingScreen />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Main Layout Container */}
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark-theme-override' : ''}`}>
        <Navbar onOpenModal={openModal} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
        
        {/* Page Content */}
        <main className="flex-grow">
          <AnimatedRoutes onOpenModal={openModal} />
        </main>
        
        <Footer />
      </div>

      {/* Floating features */}
      <FloatingWhatsApp />
      <BackToTop />

      {/* Booking Dialog overlay */}
      <ConsultationModal isOpen={isModalOpen} onClose={closeModal} />
    </Router>
  );
}

export default App;
