import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, HeartPulse, Sunset, GraduationCap, TrendingUp, PiggyBank, Target, Briefcase, ChevronRight, HelpCircle } from 'lucide-react';

export default function Services({ onOpenModal }) {
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
      title: "Life Insurance Planning",
      icon: ShieldCheck,
      tag: "Protection",
      desc: "Secure your family's future with customized term life insurance coverage matching your exact liability and earning profile.",
      benefits: ["High Cover Term Policies", "Whole Life Protection Plans", "Keyman Insurance for Businesses"]
    },
    {
      id: 2,
      title: "Health Insurance Planning",
      icon: HeartPulse,
      tag: "Security",
      desc: "Guard your hard-earned savings against medical inflation with extensive family floater health plans and critical illness covers.",
      benefits: ["Cashless Hospitalization", "Restoration Benefits", "Super Top-up Planning"]
    },
    {
      id: 3,
      title: "Retirement Planning",
      icon: Sunset,
      tag: "Independence",
      desc: "Design a tax-efficient retirement lifestyle that provides regular monthly annuity flows, keeping you financially independent forever.",
      benefits: ["Guaranteed Pension Plans", "Immediate & Deferred Annuity", "NPS & Custom Portfolios"]
    },
    {
      id: 4,
      title: "Child Education Planning",
      icon: GraduationCap,
      tag: "Future",
      desc: "Secure the rising costs of higher education. Build a dedicated inflation-adjusted fund for your child's dreams.",
      benefits: ["Guaranteed Maturity Benefits", "Educational Trust Setup", "Goal-linked Mutual Funds"]
    },
    {
      id: 5,
      title: "Wealth Creation",
      icon: TrendingUp,
      tag: "Growth",
      desc: "Capitalize on market opportunities using systematic risk-managed investments to compound wealth over the long term.",
      benefits: ["SIP & Lumpsum Advisory", "Custom Mutual Fund Portfolios", "Equities & Bonds Diversification"]
    },
    {
      id: 6,
      title: "Tax Saving Solutions",
      icon: PiggyBank,
      tag: "Optimization",
      desc: "Legally optimize your income tax liabilities using Section 80C, 80D, and other tax exemptions while growing your wealth.",
      benefits: ["ELSS Tax Saving Funds", "Tax-Free Maturity Schemes", "Corporate Tax Restructuring"]
    },
    {
      id: 7,
      title: "Financial Goal Planning",
      icon: Target,
      tag: "Strategy",
      desc: "Map your dreams—whether buying a home, planning a vacation, or starting a business—to real-time, actionable milestones.",
      benefits: ["Goal Gap Analysis", "Time-horizon Asset Mapping", "Periodic Portfolio Balancing"]
    },
    {
      id: 8,
      title: "Investment Advisory",
      icon: Briefcase,
      tag: "Expertise",
      desc: "Professional guidance to balance portfolio asset allocations based on your age, risk appetite, and liquidity needs.",
      benefits: ["Asset Allocation Strategy", "Quarterly Portfolio Review", "Risk Assessment Analysis"]
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
            return (
              <motion.div
                key={svc.id}
                variants={itemVariants}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 glass-card border border-slate-100 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_15px_35px_rgba(11,94,215,0.06)] hover:-translate-y-2"
              >
                {/* Background glow overlay */}
                <div className="absolute -inset-px bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div>
                  {/* Icon & Category Tag */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] tracking-widest text-primary font-bold uppercase bg-primary/10 px-2.5 py-1 rounded-md">
                      {svc.tag}
                    </span>
                    {/* Icon container with hover rotation */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:rotate-12">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-lg font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {svc.desc}
                  </p>

                  {/* Bullet Benefits */}
                  <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4">
                    {svc.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] text-slate-600 font-medium">
                        <ChevronRight className="h-3 w-3 text-primary shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action Link */}
                <button
                  onClick={onOpenModal}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center gap-1 rounded-lg border border-primary/25 bg-transparent py-2.5 text-xs font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  Schedule Advisory
                </button>
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
    </motion.div>
  );
}
