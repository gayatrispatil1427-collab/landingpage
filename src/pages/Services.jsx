import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, HeartPulse, Sunset, GraduationCap, TrendingUp, PiggyBank, Target, Briefcase, ChevronRight, HelpCircle, ArrowLeft, Share2, CheckCircle } from 'lucide-react';

export default function Services({ onOpenModal }) {
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  const handleShare = async (e, item, type = 'service') => {
    e.preventDefault();
    e.stopPropagation();
    
    const hash = encodeURIComponent(item.title.replace(/\s+/g, '-').toLowerCase());
    const shareUrl = `${window.location.origin}/${type === 'blog' ? 'blog' : 'services'}#${hash}`;
    const shareText = `Check out ${item.title}: ${item.desc || ''}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: shareText,
          url: shareUrl
        });
        showToast('Shared successfully!');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        } else {
          return;
        }
      }
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Link copied to clipboard!');
      } else {
        throw new Error('Clipboard API not available');
      }
    } catch (err) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          showToast('Link copied to clipboard!');
        } else {
          throw new Error('execCommand copy failed');
        }
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr);
        window.prompt('Copy link to share:', shareUrl);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  const servicesData = [
    {
      id: 1,
      title: "Customised Planning",
      icon: Target,
      tag: "Strategy",
      desc: "Develop tailored wealth strategies and asset allocations aligned with your unique family milestones and risk profiles.",
      benefits: ["Goal-based Asset Mapping", "Personalized Risk Assessments", "Milestone-linked Portfolio Design"],
      colorTheme: {
        tagBg: "bg-indigo-50 text-indigo-650 border border-indigo-100/50",
        iconBg: "bg-indigo-50 text-indigo-500",
        headingHover: "group-hover:text-indigo-650",
        borderHover: "hover:border-indigo-500/30 hover:shadow-[0_15px_35px_rgba(99,102,241,0.06)]"
      }
    },
    {
      id: 2,
      title: "Health Insurance Planning",
      icon: HeartPulse,
      tag: "Security",
      desc: "Guard your hard-earned savings against medical inflation with extensive family floater health plans and critical illness covers.",
      benefits: ["Cashless Hospitalization", "Restoration Benefits", "Super Top-up Planning"],
      colorTheme: {
        tagBg: "bg-red-50 text-red-655 border border-red-100/50",
        iconBg: "bg-red-50 text-red-500",
        headingHover: "group-hover:text-red-650",
        borderHover: "hover:border-red-500/30 hover:shadow-[0_15px_35px_rgba(239,68,68,0.06)]"
      }
    },
    {
      id: 3,
      title: "Retirement Planning",
      icon: Sunset,
      tag: "Independence",
      desc: "Design a tax-efficient retirement lifestyle that provides regular monthly annuity flows, keeping you financially independent forever.",
      benefits: ["Guaranteed Pension Plans", "Immediate & Deferred Annuity", "NPS & Custom Portfolios"],
      colorTheme: {
        tagBg: "bg-amber-50 text-amber-655 border border-amber-100/50",
        iconBg: "bg-amber-50 text-amber-500",
        headingHover: "group-hover:text-amber-650",
        borderHover: "hover:border-amber-500/30 hover:shadow-[0_15px_35px_rgba(245,158,11,0.06)]"
      }
    },
    {
      id: 4,
      title: "Child Education Planning",
      icon: GraduationCap,
      tag: "Future",
      desc: "Secure the rising costs of higher education. Build a dedicated inflation-adjusted fund for your child's dreams.",
      benefits: ["Guaranteed Maturity Benefits", "Educational Trust Setup", "Goal-linked Mutual Funds"],
      colorTheme: {
        tagBg: "bg-sky-50 text-sky-655 border border-sky-100/50",
        iconBg: "bg-sky-50 text-sky-500",
        headingHover: "group-hover:text-sky-650",
        borderHover: "hover:border-sky-500/30 hover:shadow-[0_15px_35px_rgba(14,165,233,0.06)]"
      }
    },
    {
      id: 5,
      title: "Wealth Creation",
      icon: TrendingUp,
      tag: "Growth",
      desc: "Capitalize on market opportunities using systematic risk-managed investments to compound wealth over the long term.",
      benefits: ["SIP & Lumpsum Advisory", "Custom Mutual Fund Portfolios", "Equities & Bonds Diversification"],
      colorTheme: {
        tagBg: "bg-yellow-50 text-yellow-655 border border-yellow-100/50",
        iconBg: "bg-yellow-50 text-yellow-600",
        headingHover: "group-hover:text-yellow-650",
        borderHover: "hover:border-yellow-500/30 hover:shadow-[0_15px_35px_rgba(234,179,8,0.06)]"
      }
    },
    {
      id: 6,
      title: "Tax Saving Solutions",
      icon: PiggyBank,
      tag: "Optimization",
      desc: "Legally optimize your income tax liabilities using Section 80C, 80D, and other tax exemptions while growing your wealth.",
      benefits: ["ELSS Tax Saving Funds", "Tax-Free Maturity Schemes", "Corporate Tax Restructuring"],
      colorTheme: {
        tagBg: "bg-emerald-50 text-emerald-655 border border-emerald-100/50",
        iconBg: "bg-emerald-50 text-emerald-500",
        headingHover: "group-hover:text-emerald-650",
        borderHover: "hover:border-emerald-500/30 hover:shadow-[0_15px_35px_rgba(16,185,129,0.06)]"
      }
    },
    {
      id: 7,
      title: "Financial Goal Planning",
      icon: Target,
      tag: "Strategy",
      desc: "Map your dreams—whether buying a home, planning a vacation, or starting a business—to real-time, actionable milestones.",
      benefits: ["Goal Gap Analysis", "Time-horizon Asset Mapping", "Periodic Portfolio Balancing"],
      colorTheme: {
        tagBg: "bg-violet-50 text-violet-655 border border-violet-100/50",
        iconBg: "bg-violet-50 text-violet-500",
        headingHover: "group-hover:text-violet-650",
        borderHover: "hover:border-violet-500/30 hover:shadow-[0_15px_35px_rgba(139,92,246,0.06)]"
      }
    },
    {
      id: 8,
      title: "Investment Advisory",
      icon: Briefcase,
      tag: "Expertise",
      desc: "Professional guidance to balance portfolio asset allocations based on your age, risk appetite, and liquidity needs.",
      benefits: ["Asset Allocation Strategy", "Quarterly Portfolio Review", "Risk Assessment Analysis"],
      colorTheme: {
        tagBg: "bg-teal-50 text-teal-655 border border-teal-100/50",
        iconBg: "bg-teal-50 text-teal-500",
        headingHover: "group-hover:text-teal-650",
        borderHover: "hover:border-teal-500/30 hover:shadow-[0_15px_35px_rgba(20,184,166,0.06)]"
      }
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-transparent text-slate-800"
    >
      {/* Background decor */}
      <div className="absolute top-20 right-10 -z-10 h-72 w-72 rounded-full bg-gold-500/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 -z-10 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

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
        
        {/* Header Block */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">Expert Solutions</span>
          <h1 className="font-serif text-4xl font-bold text-slate-800 mt-2 md:text-5xl">
            Tailored Services For <span className="text-primary">Every Stage</span> of Life
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            Professional consultation designed to safeguard your family's future, optimize your tax payments, and compound your wealth securely.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-primary rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((svc) => {
            const Icon = svc.icon;
            const theme = svc.colorTheme;
            return (
              <motion.div
                key={svc.id}
                variants={itemVariants}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 glass-card border border-slate-100 transition-all duration-300 hover:-translate-y-2 ${theme.borderHover}`}
              >
                {/* Background glow overlay */}
                <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className={`font-mono text-[10px] tracking-widest font-bold uppercase px-2.5 py-1 rounded-md ${theme.tagBg}`}>
                      {svc.tag}
                    </span>
                    {/* Icon container with hover rotation */}
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-500 group-hover:rotate-12 shadow-inner ${theme.iconBg}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className={`font-serif text-lg font-bold text-slate-800 mb-3 transition-colors ${theme.headingHover}`}>
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {svc.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                        <ChevronRight className={`h-3 w-3 shrink-0 text-slate-450`} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <div className="mt-4 flex gap-2 w-full">
                  <button
                    type="button"
                    onClick={(e) => handleShare(e, svc, 'services')}
                    className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:border-primary/30 bg-transparent px-3 py-2.5 text-xs font-semibold text-slate-500 hover:text-primary transition-all cursor-pointer"
                    title="Share Service"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={onOpenModal}
                    className="flex-1 flex cursor-pointer items-center justify-center gap-1 rounded-lg border border-primary/25 bg-transparent py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                  >
                    Schedule Advisory
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Advisory FAQ / Note section */}
        <div className="mt-24 glass-card rounded-3xl p-8 border border-slate-100 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <HelpCircle className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-800">Not sure which planning fits your profile?</h3>
              <p className="mt-2 text-sm text-slate-600">
                Every individual has a unique risk tolerance and financial capacity. We recommend taking our <strong>5-minute Financial Health Checkup</strong>. It analyzes your assets, liabilities, and objectives, giving you a custom report.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <button
                  onClick={onOpenModal}
                  className="rounded-lg bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:brightness-110 transition-all cursor-pointer"
                >
                  Consult An Advisor
                </button>
                <Link
                  to="/checkup"
                  className="rounded-lg border border-primary/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-primary hover:bg-primary/5 transition-all"
                >
                  Take Free Checkup
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-lg border border-slate-800 text-xs font-semibold flex items-center gap-2"
          >
            <CheckCircle className="h-4 w-4 text-emerald-500" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
