import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calendar, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenModal, isDarkMode, onToggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Health Checkup', path: '/checkup' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen
        ? 'glass-nav py-3 shadow-md shadow-primary/5'
        : 'glass-nav py-3 shadow-md shadow-primary/5 lg:bg-transparent lg:py-5 lg:shadow-none lg:border-b-0'
        }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500 bg-primary text-white font-serif text-lg font-bold shadow-[0_4px_15px_rgba(124,58,237,0.15)] group-hover:scale-105 transition-transform">
              RK
            </div>
            <div>
              <span className="block font-serif text-lg font-bold tracking-wider text-primary">
                RAHUL KULKARNI
              </span>
              <span className="block text-[9px] tracking-widest text-slate-500 uppercase font-semibold">
                Financial Advisor
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-6 md:flex">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative text-xs font-semibold tracking-wider uppercase transition-colors hover:text-primary ${location.pathname === link.path
                    ? 'text-primary font-bold'
                    : 'text-slate-600'
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full border border-slate-200 text-slate-600 hover:text-primary hover:bg-slate-100/50 transition-all cursor-pointer"
              aria-label="Toggle Theme Mode"
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5 text-gold-500" /> : <Moon className="h-4.5 w-4.5 text-primary" />}
            </button>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenModal}
              className="flex items-center gap-2 rounded-full bg-primary hover:bg-[#D97706] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-primary/10 transition-all cursor-pointer"
            >
              <Calendar className="h-4 w-4" />
              Book Consult
            </motion.button>
          </div>

          {/* Mobile hamburger and toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-full border border-slate-200 text-slate-600 hover:text-primary transition-all cursor-pointer"
              aria-label="Toggle Theme Mode Mobile"
            >
              {isDarkMode ? <Sun className="h-4.5 w-4.5 text-gold-500" /> : <Moon className="h-4.5 w-4.5 text-primary" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 text-slate-600 hover:text-primary focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-slate-100 px-4 pt-2 pb-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block text-xs font-semibold tracking-wider uppercase py-2 transition-colors hover:text-primary ${location.pathname === link.path
                    ? 'text-primary font-bold'
                    : 'text-slate-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsOpen(false);
                  onOpenModal();
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-semibold uppercase tracking-wider text-white shadow-md shadow-primary/15"
              >
                <Calendar className="h-4.5 w-4.5" />
                Book Consultation
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
