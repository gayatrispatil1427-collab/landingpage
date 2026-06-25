import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ArrowLeft, TrendingUp, Gauge, FileText, Users, Coins, Home, Activity, Award, GraduationCap, Building2, Monitor } from 'lucide-react';
import Counter from '../components/Counter';
import portraitImg from '../assets/rahul-portrait.jpeg';
import rkVideo from '../assets/RK.mp4';
import logoImg from '../assets/logo4.png';

export default function About() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-transparent text-slate-800"
    >
      {/* Decorative background shapes */}
      <div className="absolute top-20 left-10 -z-10 h-72 w-72 rounded-full bg-gold-500/5 blur-3xl" />
      <div className="absolute bottom-40 right-10 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Back Button — Mobile Only */}
        <div className="md:hidden mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Profile / Intro Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
          {/* Portrait Image */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-lg">
              <img
                src={portraitImg}
                alt="Rahul Kulkarni Portrait"
                className="w-full h-[560px] object-cover object-top rounded-xl"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Intro Text */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 space-y-6"
          >
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Who I Am</span>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-slate-800 md:text-5xl leading-tight">
              Crafting Personalized Roadmaps to <span className="text-primary">Financial Freedom</span>
            </h1>
            <p className="text-base text-slate-600 leading-relaxed">
              I started my career as a media  personal  with Satyavedh Magazine and Akashwani. My mentor, Mr. Arun Kumbhar (LIC Dev. Officer), introduced me to the world of Financial Welfare Planning, commonly referred to as Insurance. Later, my natural interest in meeting people and proper training gave me deep insight into this sector. Insurance and pension planning is the most appropriate and legal instrument to secure family lifestyles and personal dignity at an advanced age. Later, I added health insurance, banking, and the housing finance sector. It gives me immense pleasure to serve my clients and help them live a better, more satisfying financial life.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              I have 18 years of involvement with the Satyavedh Group as owner, Akashwani Sangli as anchor, daily Punyanagari as reporter, and Satyavedh Foundation (NGO) as founder.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              We are ready to serve you with professional and industrial risk management, family income, and retirement cashflow.
            </p>
          </motion.div>
        </div>

        {/* Financial Parameters Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Portfolio Metrics</span>
            <h2 className="font-serif text-3xl font-bold text-slate-800 mt-2 md:text-4xl">
              Key Financial Parameters
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
            <p className="mt-4 text-sm text-slate-500 max-w-2xl mx-auto">
              A comprehensive view of managed capital, underwritten risks, and client success milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Investment Under Mgmt. */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/5 flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-500 mb-4 shadow-sm">
                <TrendingUp className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Investment Under Mgmt.
              </span>
              <span className="block font-serif text-2xl font-bold text-slate-800">
                <Counter value="10.78" suffix=" Cr" />
              </span>
            </motion.div>

            {/* 2. Risk Under Mgmt. */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/5 flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-500 mb-4 shadow-sm">
                <Gauge className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Risk Under Mgmt.
              </span>
              <span className="block font-serif text-2xl font-bold text-slate-800">
                <Counter value="52.08" suffix=" Cr" />
              </span>
            </motion.div>

            {/* 3. Claims Settled */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-500 mb-4 shadow-sm">
                <FileText className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Claims Settled
              </span>
              <span className="block font-serif text-2xl font-bold text-slate-800">
                <Counter value="4" suffix=" Cr+" />
              </span>
            </motion.div>

            {/* 4. Clientele Base */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/5 flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-500 mb-4 shadow-sm">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Clientele Base
              </span>
              <span className="block font-serif text-2xl font-bold text-slate-800">
                <Counter value="1000" suffix="+" />
              </span>
            </motion.div>

            {/* 5. Highest Annual Premium */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/5 flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-yellow-600 mb-4 shadow-sm">
                <Coins className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Highest Annual Premium
              </span>
              <span className="block font-serif text-2xl font-bold text-slate-800">
                <Counter value="17" suffix=" Lakh" />
              </span>
            </motion.div>

            {/* 6. Highest Life Cover */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5 flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500 mb-4 shadow-sm">
                <Heart className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Highest Life Cover
              </span>
              <span className="block font-serif text-2xl font-bold text-slate-800">
                <Counter value="3.5" suffix=" Cr" />
              </span>
              <span className="text-[9px] text-slate-500 mt-1 font-medium">(Single Life)</span>
            </motion.div>

            {/* 7. Home Loan Corpus */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-teal-500/30 hover:shadow-lg hover:shadow-teal-500/5 flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-500 mb-4 shadow-sm">
                <Home className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Home Loan Corpus
              </span>
              <span className="block font-serif text-2xl font-bold text-slate-800">
                <Counter value="5" suffix=" Cr+" />
              </span>
            </motion.div>

            {/* 8. Health Cover Corpus */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card p-6 rounded-2xl border border-slate-100 shadow-sm transition-all duration-300 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/5 flex flex-col items-center text-center"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500 mb-4 shadow-sm">
                <Activity className="h-6 w-6" />
              </div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-2">
                Health Cover Corpus
              </span>
              <span className="block font-serif text-2xl font-bold text-slate-800">
                <Counter value="4" suffix=" Cr+" />
              </span>
            </motion.div>
          </div>
        </div>

      </div>

      {/* Showcase Video Section - Fully horizontal, full-bleed screen width (out of container frame) */}
      <motion.div
        variants={itemVariants}
        className="mt-20 w-full overflow-hidden border-y border-slate-200/50 bg-[#f9fbfd] dark:bg-slate-900/50 relative z-10"
      >
        <div className="w-full h-[80vh]">
          <video
            src={rkVideo}
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            data-visualsearch="false"
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
      </motion.div>

      {/* Content Below Video Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-20 pb-16">

        {/* Accomplishments & Training Grid - Unified Box */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-md mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:divide-x lg:divide-slate-100 dark:lg:divide-slate-700">

            {/* Professional Accomplishments */}
            <div className="lg:pr-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-md shadow-blue-500/20">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-blue-905 dark:text-blue-400">Professional Accomplishments</h3>
                  <div className="mt-1 h-0.5 w-16 bg-blue-600 rounded-full" />
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "MDRT (USA) Six Times in Row",
                  "SAFAL (Singapore) Insurance ICON",
                  "Youngest LIC Galaxy Club Member",
                  "Star Health BM Club Member",
                  "Best Performer DNS Bank Loans",
                  "Insurance Centurion 3 Years",
                  "Bima Bhushan, Bima Sanman & Bima Gaurav",
                  "Division Rank 1 for Term Cover Sales"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-650 dark:text-slate-350 font-semibold">
                    <span className="text-blue-600 mt-1 font-extrabold text-xs">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education & Training Associates */}
            <div className="lg:pl-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-600 text-white shadow-md shadow-red-500/20">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-red-700 dark:text-red-400">Education & Training Associates</h3>
                  <div className="mt-1 h-0.5 w-16 bg-red-600 rounded-full" />
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "IIOE (Indian Institute of Excellence, Mumbai)",
                  "IMFT (Institute of Marketing & Financial Training)",
                  "SAFAL Singapore (South Asian Financial Advises League)",
                  "Financial Planning & NRI Certification",
                  "LIC STC Satara (Sales Training Centre)",
                  "Member of Team Celebrate Life (Mr. Arun Kumbhar)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-650 dark:text-slate-350 font-semibold">
                    <span className="text-red-600 mt-1 font-extrabold text-xs">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Logo Strip inside Education column */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700/50 flex justify-center">
                <img
                  src={logoImg}
                  alt="Association & Accreditation Logos"
                  className="w-[280px] sm:w-[350px] max-w-full h-auto object-contain pointer-events-none select-none"
                  data-visualsearch="false"
                  draggable="false"
                />
              </div>
            </div>

          </div>
        </motion.div>

        {/* Our Infrastructure & Office Setup */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-md"
        >
          <div className="text-center mb-6">
            <h3 className="font-serif text-xl font-bold text-blue-905 dark:text-blue-400">Our Infrastructure & Office Setup</h3>
            <div className="mx-auto mt-2 h-0.5 w-12 bg-red-500 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-slate-100 dark:md:divide-slate-700">

            {/* Column 1 */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:px-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 shadow-sm animate-pulse-slow">
                <Building2 className="h-6 w-6" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">1000 Sq Ft Own Office</h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Spacious & Fully Equipped</p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:px-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 shadow-sm animate-pulse-slow">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Trained Servicing Staff</h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Experienced & Dedicated Team</p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:px-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shadow-sm animate-pulse-slow">
                <Monitor className="h-6 w-6" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-sm font-extrabold text-slate-800 dark:text-white">Advanced IT Cell</h4>
                <p className="text-xs text-slate-400 font-semibold mt-0.5">Technology-Driven Operations</p>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
    </motion.div>
  );
}
