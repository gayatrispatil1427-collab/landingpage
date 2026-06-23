import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 600); // delay fade out slightly
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5; // incremental loading
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-navy-900 text-white"
        >
          <div className="relative flex flex-col items-center">
            {/* Elegant RK Monogram Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full border border-gold-500/30 bg-navy-800/80 shadow-[0_0_30px_rgba(212,175,55,0.2)]"
            >
              <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-gold-500 animate-spin" style={{ animationDuration: '3s' }}></div>
              <span className="font-serif text-3xl font-extrabold tracking-wider text-gold-500">RK</span>
            </motion.div>

            {/* Title / Name */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-serif text-2xl font-bold tracking-widest text-gold-500 uppercase md:text-3xl"
            >
              Rahul Kulkarni
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 0.7 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="mt-2 text-sm tracking-widest uppercase text-slate-300"
            >
              Insurance & Financial Planning Consultant
            </motion.p>

            {/* Progress Bar Container */}
            <div className="mt-12 h-[2px] w-64 overflow-hidden rounded-full bg-navy-700">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
                style={{ width: `${Math.min(progress, 100)}%` }}
                layout
              />
            </div>

            {/* Progress Percentage */}
            <motion.span
              className="mt-4 font-mono text-sm tracking-wider text-gold-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              {Math.min(progress, 100)}% SECURING YOUR FUTURE
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
