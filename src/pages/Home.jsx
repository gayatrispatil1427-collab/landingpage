import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, GraduationCap, Heart, Star, ChevronDown, CheckCircle,
  Quote, Maximize2, X, Send, Award, Calendar, Landmark, Coins,
  TrendingUp, Sparkles, AlertCircle, Play, ChevronRight, Users,
  Percent, FileText, Check, Shield, Zap, Target, BookOpen, MapPin, Phone, Mail,
  Clock, Share2
} from 'lucide-react';
import Counter from '../components/Counter';
import CardSlider from '../components/CardSlider';
import portraitImg from '../assets/rahul-portrait.jpeg';
import awardImg from '../assets/rahul-award.jpeg';
import awardWideImg from '../assets/rahul-award-wide.jpg';
import eventImg from '../assets/rahul-event.jpeg';

export default function Home({ onOpenModal }) {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeBtn, setActiveBtn] = useState(1);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  // Multi-step Checkup Form State
  const [checkupStep, setCheckupStep] = useState(1);
  const [checkupSubmitted, setCheckupSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();

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

  // SIP Calculator State
  const [sipAmount, setSipAmount] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [sipYears, setSipYears] = useState(15);
  const [calcResults, setCalcResults] = useState({ invested: 0, returns: 0, total: 0 });

  // Recalculate SIP
  useEffect(() => {
    const P = sipAmount;
    const i = (expectedReturn / 12) / 100;
    const n = sipYears * 12;

    const total = P * (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
    const invested = P * n;
    const returns = total - invested;

    setCalcResults({
      invested: Math.round(invested),
      returns: Math.round(returns),
      total: Math.round(total)
    });
  }, [sipAmount, expectedReturn, sipYears]);

  // Auto slide testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const onCheckupSubmit = async (data) => {
    // Mock score generation
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const submissions = JSON.parse(localStorage.getItem('rahul_kulkarni_checkups') || '[]');
    const calculatedScore = Math.floor(Math.random() * 30) + 60; // Mock score 60-90
    submissions.push({ ...data, id: Date.now(), timestamp: new Date().toISOString(), score: calculatedScore });
    localStorage.setItem('rahul_kulkarni_checkups', JSON.stringify(submissions));

    setCheckupSubmitted(true);
  };

  const resetFormWizard = () => {
    reset();
    setCheckupStep(1);
    setCheckupSubmitted(false);
  };

  const testimonials = [
    {
      name: "Mr. Satish Ranade",
      role: "VP, Tech Mahindra",
      text: "Rahul has been managing our family portfolio for 10+ years. His responsiveness during a medical claim last year was outstanding. He coordinated everything directly with the hospital.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120",
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      name: "Dr. Ananya Joshi",
      role: "Pediatrician",
      text: "Highly professional advice. Rahul helped us set up our daughter's educational fund when she was born. We now have complete clarity and a secure path for her foreign studies.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    },
    {
      name: "Mr. Rajesh Khanna",
      role: "Owner, Khanna Logistics",
      text: "Separating insurance from investments was a game-changer. Rahul guided me out of expensive endowment plans into clean term cover and diversified SIPs. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120&h=120",
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  ];

  const faqs = [
    {
      q: "What is your consultation fee for financial planning?",
      a: "Our initial evaluation and financial health diagnostic report are completely free of charge. Should you choose to execute plans (insurance, mutual funds) through us, we receive standard advisory commissions directly from the institutional providers. There are no hidden fees."
    },
    {
      q: "Can you help transfer or review my existing insurance policies?",
      a: "Yes, absolutely. We provide a complimentary policy audit. We analyze your existing term plans, health limits, and tax exemptions to see if they match current inflation standards, recommending updates only when necessary."
    },
    {
      q: "What is the claim settlement support process?",
      a: "Claim support is our primary priority. We provide a dedicated support hotline. In case of hospitalization or emergency, our team directly coordinates document collection and settlement with LIC and health providers, leaving the family stress-free."
    },
    {
      q: "Are mutual fund investments safe?",
      a: "All investments carry market risks. However, we minimize volatility by mapping assets according to time horizons. Short-term goals are mapped to stable debt funds, while long-term retirement planning utilizes diversified equity funds."
    }
  ];

  const journeySteps = [
    {
      step: "01",
      title: "Understand Goals",
      desc: "An in-depth consultation aligning on educational aspirations, retirement target dates, and debt protections.",
      detail: "We focus on real numbers, understanding what age you seek retirement, and what liabilities require immediate shields."
    },
    {
      step: "02",
      title: "Financial Analysis",
      desc: "Audit of current term limits, tax brackets, and active high-cost policies to detect coverage gaps.",
      detail: "Many clients discover they are underinsured. We model your inflation adjustments to build a realistic timeline."
    },
    {
      step: "03",
      title: "Strategy Planning",
      desc: "Design of a customized asset allocation timeline utilizing term protection, SIPs, and annuities.",
      detail: "No product pitch. We design a clean ratio model outlining precisely how much capital maps to safety, growth, and cashflow."
    },
    {
      step: "04",
      title: "Implementation",
      desc: "Seamless setup of coverage policies, tax-saving schemes, and automated direct fund SIPs.",
      detail: "We handle 100% of the paperwork, coordination with institutional providers, and active KYC declarations."
    },
    {
      step: "05",
      title: "Ongoing Support",
      desc: "Dedicated support hotline for claims settlement assistance and annual target re-balancing reviews.",
      detail: "You get a dedicated point of contact. If claims occur, our team takes charge of hospital desk submissions directly."
    }
  ];

  const galleryImages = [
    { src: portraitImg, caption: "Rahul Kulkarni - Thumbs Up Portrait", type: "Featured Portrait", pos: "object-top" },
    { src: awardImg, caption: "National Award Recognition Plaque", type: "Awards", pos: "object-top" },
    { src: eventImg, caption: "LIC Chairman's Club Ceremony On-stage Showcase", type: "Success Wall", pos: "object-center" }
  ];

  const services = [
    {
      icon: Target,
      title: "Customised Planning",
      desc: "Tailored wealth strategies and asset allocations aligned with your unique family milestones and risk profiles."
    },
    {
      icon: Heart,
      title: "Health Insurance Planning",
      desc: "High-limit medical floaters, critical illness buffers, and cash-free claim settlement coordinate."
    },
    {
      icon: Landmark,
      title: "Retirement Planning",
      desc: "Lock guaranteed annuity payouts for life using tax-saving options to maintain full independence."
    },
    {
      icon: TrendingUp,
      title: "Investment Planning",
      desc: "Systematic Investment Plans (SIP) mapping capital to long-term index targets."
    },
    {
      icon: Coins,
      title: "Tax Planning",
      desc: "Optimize capital declarations under Sec 80C, 80D, and 10(10D) to legally retain high yields."
    },
    {
      icon: GraduationCap,
      title: "Child Education Planning",
      desc: "Establish educational trusts matching inflation milestones, securing tuition reserves.",
      isPremium: true
    },
    {
      icon: "WC",
      title: "Wealth Creation",
      desc: "High-net-worth preservation models, re-balancing strategies, and sovereign debt assets allocation mapping.",
      isGold: true
    },
    {
      icon: Target,
      title: "Financial Goal Planning",
      desc: "Comprehensive safety-to-growth ratio design matching custom family timeline targets."
    }
  ];

  const renderServiceCard = (service, idx) => {
    const IconComponent = service.icon;
    const isCustomIcon = typeof service.icon === 'string';

    return (
      <div className={`w-80 md:w-96 h-[260px] bg-white p-8 rounded-3xl border flex flex-col justify-between group hover:border-primary/30 transition-all shadow-sm ${service.isGold ? 'border-gold-500/25' : 'border-slate-100'
        } ${service.isPremium ? 'bg-primary/5' : ''}`}>
        <div>
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform mb-6 font-bold text-xs ${service.isGold
            ? 'bg-gold-500/10 text-gold-500'
            : 'bg-primary/10 text-primary'
            }`}>
            {isCustomIcon ? service.icon : <IconComponent className="h-5 w-5" />}
          </div>
          <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">{service.title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
            {service.desc}
          </p>
        </div>
        <div className="flex items-center justify-between w-full mt-6">
          <button 
            type="button"
            onClick={(e) => handleShare(e, service, 'services')}
            className="text-xs font-bold text-slate-550 hover:text-primary inline-flex items-center gap-1.5 uppercase cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
            Share
          </button>
          <Link to="/services" className="text-xs font-bold text-primary group-hover:translate-x-1.5 transition-transform inline-flex items-center gap-1 uppercase">
            Explore <ChevronRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    );
  };


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 90, damping: 14 } }
  };

  const pillarsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const pillarsCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const mvvContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const missionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const visionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const valuesVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const statsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const statsCardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen pt-20"
    >

      {/* 1. HERO SECTION */}
      <section className="relative w-full flex flex-col lg:flex-row lg:h-[calc(100vh-5rem)] lg:min-h-[650px] lg:items-center overflow-hidden bg-[#FAF8F5]">
        {/* Full-bleed Widescreen Banner Image */}
        <div className="relative w-full lg:absolute lg:inset-0 lg:z-0 lg:h-full lg:w-full order-2 lg:order-none px-6 sm:px-12 lg:px-0 pb-12 lg:pb-0">
          <div className="w-full aspect-[2/3] max-w-sm mx-auto lg:max-w-none lg:aspect-auto lg:h-full rounded-3xl lg:rounded-none overflow-hidden shadow-lg lg:shadow-none border border-slate-200 bg-white dark:bg-slate-800 p-3 lg:p-0 lg:border-none lg:bg-transparent">
            <picture className="w-full h-full">
              <source media="(min-width: 1024px)" srcSet={awardWideImg} />
              <img
                src={awardImg}
                alt="Rahul Kulkarni Award Recognition Banner"
                className="w-full h-full object-cover object-top lg:object-[85%_0%] lg:scale-[1.04] lg:origin-center rounded-2xl lg:rounded-none"
                loading="lazy"
              />
            </picture>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 sm:px-12 lg:px-16 xl:px-24 w-full relative z-10 py-12 sm:py-16 lg:py-0 order-1 lg:order-none">
          {/* Content container — hero-light-section pins text to dark regardless of dark mode */}
          <div className="hero-light-section force-light-section w-full lg:w-[55%]">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6 lg:space-y-8"
            >
              {/* Premium pill badge — matches screenshot 1 design */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-slate-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm">
                <Sparkles className="h-3 sm:h-3.5 w-3 sm:w-3.5 text-yellow-500 shrink-0" />
                <span className="text-[9px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
                  Premium Financial Brand
                </span>
              </div>
              <h1 className="font-sans text-4xl sm:text-5xl lg:text-[54px] font-bold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
                <span className="text-primary">Secure</span> Your Family's Future <br className="hidden sm:inline" />
                With <span className="text-primary">Smart</span> Financial Planning
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Helping families protect wealth, build assets and achieve long-term financial security through expert financial planning.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setActiveBtn(1); onOpenModal(); }}
                  className={`rounded-lg px-8 py-4 text-xs font-bold tracking-wider uppercase shadow-lg transition-all duration-300 cursor-pointer ${activeBtn === 1
                    ? 'bg-primary text-white shadow-primary/20 border border-primary'
                    : 'bg-white/80 text-primary border border-slate-200 shadow-sm hover:bg-primary hover:text-white hover:border-primary hover:shadow-primary/20'
                    }`}
                >
                  Book Free Consultation
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#checkup-section"
                  onClick={() => setActiveBtn(2)}
                  className={`rounded-lg px-8 py-4 text-xs font-bold tracking-wider uppercase flex items-center justify-center shadow-sm cursor-pointer transition-all duration-300 ${activeBtn === 2
                    ? 'bg-primary text-white border border-primary shadow-lg shadow-primary/20'
                    : 'bg-white/80 text-primary border border-slate-200 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20'
                    }`}
                >
                  Financial Health Checkup
                </motion.a>
              </div>

              {/* Badges with individual icons and stacked text */}
              <div className="grid grid-cols-3 gap-2 sm:gap-x-8 sm:gap-y-4 pt-6 border-t border-slate-300/40 max-w-xl">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-slate-900 dark:text-white shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-none">15+ Years</span>
                    <span className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Experience</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-slate-900 dark:text-white shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-none">1,000+ Families</span>
                    <span className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Protected</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-slate-900 dark:text-white shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-none">MDRT</span>
                    <span className="text-[8px] sm:text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold mt-1">Qualified</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. TRUST SECTION (Animated Counter Cards) */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={statsContainerVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >

            {/* Card 1 — 1,000+ Families Protected */}
            <motion.div
              variants={statsCardVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 20px 40px -12px rgba(37, 99, 235, 0.18), 0 0 0 1.5px rgba(37, 99, 235, 0.4)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6 rounded-2xl glass-card border border-slate-100 text-center shadow-sm cursor-pointer group"
            >
              <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-primary mb-2">
                <Counter value="1000" suffix="+" />
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold group-hover:text-primary transition-colors duration-300">Families Protected</span>
            </motion.div>

            {/* Card 2 — 500Cr+ Coverage Managed */}
            <motion.div
              variants={statsCardVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 20px 40px -12px rgba(37, 99, 235, 0.18), 0 0 0 1.5px rgba(37, 99, 235, 0.4)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6 rounded-2xl glass-card border border-slate-100 text-center shadow-sm cursor-pointer group"
            >
              <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-primary mb-2">
                <Counter value="500" suffix="Cr+" />
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold group-hover:text-primary transition-colors duration-300">Coverage Managed</span>
            </motion.div>

            {/* Card 3 — 15+ Years Experience */}
            <motion.div
              variants={statsCardVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 20px 40px -12px rgba(37, 99, 235, 0.18), 0 0 0 1.5px rgba(37, 99, 235, 0.4)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6 rounded-2xl glass-card border border-slate-100 text-center shadow-sm cursor-pointer group"
            >
              <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-primary mb-2">
                <Counter value="15" suffix="+" />
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold group-hover:text-primary transition-colors duration-300">Years Experience</span>
            </motion.div>

            {/* Card 4 — 98% Client Satisfaction */}
            <motion.div
              variants={statsCardVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                boxShadow: "0 20px 40px -12px rgba(37, 99, 235, 0.18), 0 0 0 1.5px rgba(37, 99, 235, 0.4)"
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6 rounded-2xl glass-card border border-slate-100 text-center shadow-sm cursor-pointer group"
            >
              <span className="block font-serif text-3xl sm:text-4xl font-extrabold text-primary mb-2">
                <Counter value="98" suffix="%" />
              </span>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold group-hover:text-primary transition-colors duration-300">Client Satisfaction</span>
            </motion.div>

          </motion.div>
        </div>
      </section>


      {/* 3. ABOUT RAHUL KULKARNI (Storytelling layout & timeline) */}
      <section className="py-24 bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left Column Story */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">Who I Am</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                Crafting roadmaps to <span className="text-primary">Financial Freedom</span>
              </h2>
              <p className="text-xs text-slate-550 text-slate-500 leading-relaxed">
                Rahul Kulkarni has spent the last 15+ years restructuring policy portfolios to remove high-cost products and replace them with clear safety-first solutions. Our advisory works to protect family livelihoods above index speculation.
              </p>

              {/* Mission, Vision, Values Bento grid */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={mvvContainerVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4"
              >
                {/* Mission Card */}
                <motion.div
                  variants={missionVariants}
                  whileHover={{ y: -6, scale: 1.03, boxShadow: "0 15px 30px -10px rgba(37, 99, 235, 0.15), 0 0 0 1px rgba(37, 99, 235, 0.45)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer transition-colors duration-300 hover:border-primary/50"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0 }}
                    className="h-8 w-8 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-3 shadow-inner"
                  >
                    <Target className="h-4.5 w-4.5" />
                  </motion.div>
                  <h4 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-1">Mission</h4>
                  <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-relaxed">To replace financial anxiety with security.</p>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                  variants={visionVariants}
                  whileHover={{ y: -6, scale: 1.03, boxShadow: "0 15px 30px -10px rgba(37, 99, 235, 0.15), 0 0 0 1px rgba(37, 99, 235, 0.45)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer transition-colors duration-300 hover:border-primary/50"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                    className="h-8 w-8 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-3 shadow-inner"
                  >
                    <Sparkles className="h-4.5 w-4.5" />
                  </motion.div>
                  <h4 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-1">Vision</h4>
                  <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-relaxed">Secure 5,000 families with stable lifetime income.</p>
                </motion.div>

                {/* Values Card */}
                <motion.div
                  variants={valuesVariants}
                  whileHover={{ y: -6, scale: 1.03, boxShadow: "0 15px 30px -10px rgba(37, 99, 235, 0.15), 0 0 0 1px rgba(37, 99, 235, 0.45)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer transition-colors duration-300 hover:border-primary/50"
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.0 }}
                    className="h-8 w-8 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-3 shadow-inner"
                  >
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </motion.div>
                  <h4 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-1">Values</h4>
                  <p className="text-[10px] text-slate-550 dark:text-slate-400 leading-relaxed">Absolute transparency in client advisory.</p>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column Career Timeline */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
              <h3 className="font-serif text-xl font-bold text-slate-800 mb-6">Professional Journey</h3>

              <div className="space-y-6 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-200">
                {/* 2022 */}
                <div className="flex gap-6 relative items-start">
                  <div className="h-7 w-12 rounded-full bg-primary text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 shadow-md">
                    2022
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-800">Financial Journey Starts</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Began LIC advisory in Pune with a focus on term protection and claim processing.</p>
                  </div>
                </div>

                {/* 2019 */}
                <div className="flex gap-6 relative items-start">
                  <div className="h-7 w-12 rounded-full bg-primary text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 shadow-md">
                    2019
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-800">MDRT USA Recognition</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Inducted into the Million Dollar Round Table (USA) for peak compliance standards.</p>
                  </div>
                </div>

                {/* 2015 */}
                <div className="flex gap-6 relative items-start">
                  <div className="h-7 w-12 rounded-full bg-gold-500 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 shadow-md">
                    2015
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-800">Youngest LIC Galaxy Club Member</h4>
                    <p className="text-[11px] text-slate-500 mt-1">Achieved elite status as the youngest member in the region, managing complex wealth portfolios.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FAMILY FIRST PHILOSOPHY (Interactive Flip Cards) */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Core Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
              Every Financial Decision Begins With Family
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front p-6 flex flex-col justify-between items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mt-6">
                    <Shield className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-800">Family Protection</h3>
                    <p className="mt-2 text-[11px] text-slate-500 leading-relaxed px-2">
                      Securing high-cover pure term structures to buffer children's lifestyle against loan burdens.
                    </p>
                  </div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-2">Hover for details</span>
                </div>
                <div className="flip-card-back p-6 flex flex-col justify-center items-center text-center">
                  <h4 className="font-serif text-base font-bold mb-2">Term Allocation</h4>
                  <p className="text-[11px] leading-relaxed mb-4">
                    10x-15x income replacement mapping, corporate health floaters, and MWP Act trusts.
                  </p>
                  <div className="bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-semibold">
                    100% Clean Protection Focus
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front p-6 flex flex-col justify-between items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mt-6">
                    <GraduationCap className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-800">Child Education Planning</h3>
                    <p className="mt-2 text-[11px] text-slate-500 leading-relaxed px-2">
                      Fulfillment funds mapped to expected tuition inflation ratios in India or abroad.
                    </p>
                  </div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-2">Hover for details</span>
                </div>
                <div className="flip-card-back p-6 flex flex-col justify-center items-center text-center">
                  <h4 className="font-serif text-base font-bold mb-2">Milestone Advisory</h4>
                  <p className="text-[11px] leading-relaxed mb-4">
                    Target-date index mapping, sovereign gold bonds setup, and tax-exempt tuition reserves.
                  </p>
                  <div className="bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-semibold">
                    Beat College Inflation
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front p-6 flex flex-col justify-between items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mt-6">
                    <Heart className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-800">Retirement Security</h3>
                    <p className="mt-2 text-[11px] text-slate-500 leading-relaxed px-2">
                      Regular tax-free annuity plans that maintain self-sufficiency post-employment.
                    </p>
                  </div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-2">Hover for details</span>
                </div>
                <div className="flip-card-back p-6 flex flex-col justify-center items-center text-center">
                  <h4 className="font-serif text-base font-bold mb-2">Guaranteed Annuity</h4>
                  <p className="text-[11px] leading-relaxed mb-4">
                    Systematic retirement withdrawals review, NPS allocation, and rate locking structures.
                  </p>
                  <div className="bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-semibold">
                    Secure Lifetime Cashflow
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front p-6 flex flex-col justify-between items-center text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary mt-6">
                    <Landmark className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-800">Legacy Planning</h3>
                    <p className="mt-2 text-[11px] text-slate-500 leading-relaxed px-2">
                      Structured estate allocation avoiding inheritance disputes and minimizing capital taxes.
                    </p>
                  </div>
                  <span className="text-[10px] text-primary font-bold uppercase tracking-wider mb-2">Hover for details</span>
                </div>
                <div className="flip-card-back p-6 flex flex-col justify-center items-center text-center">
                  <h4 className="font-serif text-base font-bold mb-2">Estate Handover</h4>
                  <p className="text-[11px] leading-relaxed mb-4">
                    Nomination reviews, legal Will assistance, and high-net-worth estate preservation tactics.
                  </p>
                  <div className="bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-semibold">
                    Zero Probate Delays
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. SERVICES (Premium Bento Grid Layout) */}
      <section className="py-24 bg-[#FAF8F5] border-y border-slate-200/40 services-light-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Advisory Avenues</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
              Our Bento Portfolio Solutions
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
          </div>
        </div>

        <div className="w-full overflow-hidden">
          <CardSlider
            items={services}
            renderItem={renderServiceCard}
            duration={25}
          />
        </div>
      </section>

      {/* 6. WALL OF ACHIEVEMENTS (Featuring IMAGE 2 as Parallax Banner) */}
      <section className="relative overflow-hidden py-28 bg-[#0F172A]">
        {/* Parallax Image Backdrop */}
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src={eventImg}
            alt="Rahul Kulkarni Award stage event"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-transparent" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-xl space-y-6">
            <span className="text-xs font-semibold tracking-widest text-secondary uppercase">Success Wall</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
              LIC Chairman's Club National Stage Honors
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rahul Kulkarni onstage receiving corporate excellence awards. Delivering peak performance compliance and transparent trust.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="block font-serif text-xl font-bold text-gold-500">MDRT USA</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mt-1 block">Lifetime Member</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <span className="block font-serif text-xl font-bold text-gold-500">500Cr+</span>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 font-semibold mt-1 block">Coverage Secured</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AWARDS & RECOGNITION (Featuring IMAGE 3 as centerpiece with spotlight) */}
      <section className="py-24 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Centerpiece Spotlight Image */}
            <div className="lg:col-span-6 flex justify-center relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl -z-10" />

              <div className="relative group w-full max-w-md rounded-2xl border-2 border-gold-500 bg-white p-3 shadow-2xl">
                <motion.img
                  src={awardImg}
                  alt="Rahul Kulkarni Award holding plaque"
                  className="w-full max-h-[560px] object-cover object-top rounded-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  loading="lazy"
                />
              </div>
            </div>

            {/* Accreditation details */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-sm font-semibold tracking-widest text-primary uppercase">Accreditation Spotlight</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                Global MDRT Ethics Compliance
              </h2>
              <p className="text-xs text-slate-655 text-slate-500 leading-relaxed">
                As a standard qualifier for the global Million Dollar Round Table, Rahul Kulkarni executes portfolio audits using standard compliance rules, rejecting toxic products and building sustainable generational wealth.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="flex gap-3 items-start">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-800">Global MDRT Standard</h4>
                    <p className="text-[10px] text-slate-500 mt-1">Conferred for strict adherence to client fiduciary duties and risk safety.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Award className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-slate-800">Elite Stewardship Medal</h4>
                    <p className="text-[10px] text-slate-500 mt-1">Achieved peak LIC Chairman's Club parameters consecutive terms.</p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-[#6D28D9] px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Explore Qualifications
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. FINANCIAL JOURNEY ROADMAP (Interactive timeline) */}
      <section className="py-24 bg-[#FAF8F5] border-b border-slate-200/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Methodology</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 mt-2">
              Financial Journey Roadmap
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
          </div>

          {/* Timeline Step Cards — each with a unique viewport entry animation */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10 max-w-4xl mx-auto">

            {/* Step 01 — Slide from left + soft glow */}
            <motion.button
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              onClick={() => setActiveJourneyStep(0)}
              className={`relative p-4 rounded-xl border text-center cursor-pointer overflow-hidden transition-all duration-500 focus:outline-none ${activeJourneyStep === 0
                ? 'bg-primary border-primary shadow-[0_0_20px_4px_rgba(37,99,235,0.35)] -translate-y-1.5 scale-[1.03]'
                : 'bg-white border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
            >
              <motion.span
                animate={activeJourneyStep === 0 ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`block text-[10px] font-bold font-mono mb-1 ${activeJourneyStep === 0 ? 'text-white/80' : 'text-slate-400'}`}
              >{journeySteps[0].step}</motion.span>
              <span className={`block font-serif text-xs font-bold ${activeJourneyStep === 0 ? 'text-white' : 'text-slate-700'}`}>{journeySteps[0].title}</span>
            </motion.button>

            {/* Step 02 — Fade in + zoom */}
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
              onClick={() => setActiveJourneyStep(1)}
              className={`relative p-4 rounded-xl border text-center cursor-pointer overflow-hidden transition-all duration-500 focus:outline-none ${activeJourneyStep === 1
                ? 'bg-primary border-primary shadow-[0_0_20px_4px_rgba(37,99,235,0.35)] -translate-y-1.5 scale-[1.03]'
                : 'bg-white border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
            >
              <motion.span
                animate={activeJourneyStep === 1 ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`block text-[10px] font-bold font-mono mb-1 ${activeJourneyStep === 1 ? 'text-white/80' : 'text-slate-400'}`}
              >{journeySteps[1].step}</motion.span>
              <span className={`block font-serif text-xs font-bold ${activeJourneyStep === 1 ? 'text-white' : 'text-slate-700'}`}>{journeySteps[1].title}</span>
            </motion.button>

            {/* Step 03 — Flip up from bottom (3D rotateX) */}
            <motion.button
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.2 }}
              style={{ transformPerspective: 800 }}
              onClick={() => setActiveJourneyStep(2)}
              className={`relative p-4 rounded-xl border text-center cursor-pointer overflow-hidden transition-all duration-500 focus:outline-none ${activeJourneyStep === 2
                ? 'bg-primary border-primary shadow-[0_0_20px_4px_rgba(37,99,235,0.35)] -translate-y-1.5 scale-[1.03]'
                : 'bg-white border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
            >
              <motion.span
                animate={activeJourneyStep === 2 ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`block text-[10px] font-bold font-mono mb-1 ${activeJourneyStep === 2 ? 'text-white/80' : 'text-slate-400'}`}
              >{journeySteps[2].step}</motion.span>
              <span className={`block font-serif text-xs font-bold ${activeJourneyStep === 2 ? 'text-white' : 'text-slate-700'}`}>{journeySteps[2].title}</span>
            </motion.button>

            {/* Step 04 — Slide from right + bounce */}
            <motion.button
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.25 }}
              onClick={() => setActiveJourneyStep(3)}
              className={`relative p-4 rounded-xl border text-center cursor-pointer overflow-hidden transition-all duration-500 focus:outline-none ${activeJourneyStep === 3
                ? 'bg-primary border-primary shadow-[0_0_20px_4px_rgba(37,99,235,0.35)] -translate-y-1.5 scale-[1.03]'
                : 'bg-white border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
            >
              <motion.span
                animate={activeJourneyStep === 3 ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`block text-[10px] font-bold font-mono mb-1 ${activeJourneyStep === 3 ? 'text-white/80' : 'text-slate-400'}`}
              >{journeySteps[3].step}</motion.span>
              <span className={`block font-serif text-xs font-bold ${activeJourneyStep === 3 ? 'text-white' : 'text-slate-700'}`}>{journeySteps[3].title}</span>
            </motion.button>

            {/* Step 05 — Scale up from 0.8 + pulse */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: 'easeOut', delay: 0.35 }}
              onClick={() => setActiveJourneyStep(4)}
              className={`relative p-4 rounded-xl border text-center cursor-pointer overflow-hidden transition-all duration-500 focus:outline-none ${activeJourneyStep === 4
                ? 'bg-primary border-primary shadow-[0_0_20px_4px_rgba(37,99,235,0.35)] -translate-y-1.5 scale-[1.03]'
                : 'bg-white border-slate-200/60 shadow-sm hover:shadow-md hover:-translate-y-1'
                }`}
            >
              <motion.span
                animate={activeJourneyStep === 4
                  ? { scale: [1, 1.18, 1] }
                  : { scale: [1, 1.06, 1, 1.06, 1] }
                }
                transition={activeJourneyStep === 4
                  ? { duration: 0.4, ease: 'easeInOut' }
                  : { repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1.5 }
                }
                className={`block text-[10px] font-bold font-mono mb-1 ${activeJourneyStep === 4 ? 'text-white/80' : 'text-slate-400'}`}
              >{journeySteps[4].step}</motion.span>
              <span className={`block font-serif text-xs font-bold ${activeJourneyStep === 4 ? 'text-white' : 'text-slate-700'}`}>{journeySteps[4].title}</span>
            </motion.button>

          </div>


          {/* Active step details panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeJourneyStep}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-100 dark:border-slate-700/50 shadow-sm flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
            >
              {/* Background accent highlight element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

              <motion.div
                initial={{ scale: 0.7, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.05 }}
                className="h-16 w-16 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center font-serif text-2xl font-bold shrink-0 shadow-inner"
              >
                {journeySteps[activeJourneyStep].step}
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
                  }
                }}
                className="space-y-3 relative z-10"
              >
                <motion.h4
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="font-serif text-lg font-bold text-slate-800 dark:text-white"
                >
                  {journeySteps[activeJourneyStep].title}
                </motion.h4>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                  className="text-xs text-primary font-semibold"
                >
                  {journeySteps[activeJourneyStep].desc}
                </motion.p>
                <motion.p
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed"
                >
                  {journeySteps[activeJourneyStep].detail}
                </motion.p>
              </motion.div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* 9. WHY CHOOSE RAHUL KULKARNI (Premium animated cards) */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Why Us</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 dark:text-white mt-2">
              The Five pillars of trust
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={pillarsContainerVariants}
            className="grid grid-cols-1 md:grid-cols-5 gap-6"
          >

            {/* Card 1: Customised Planning */}
            <motion.div
              variants={pillarsCardVariants}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0 }}
                className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4 shadow-inner"
              >
                <Target className="h-5 w-5" />
              </motion.div>
              <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-2">Customised Planning</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Tailored wealth strategies aligned with your unique family milestones and risk profiles.</p>
            </motion.div>

            {/* Card 2: Trusted Guidance */}
            <motion.div
              variants={pillarsCardVariants}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.45 }}
                className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4 shadow-inner"
              >
                <Users className="h-5 w-5" />
              </motion.div>
              <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-2">Trusted Guidance</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">15+ years navigating claims, tax transitions, and market cycles.</p>
            </motion.div>

            {/* Card 3: Transparent Advice */}
            <motion.div
              variants={pillarsCardVariants}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.9 }}
                className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4 shadow-inner"
              >
                <ShieldCheck className="h-5 w-5" />
              </motion.div>
              <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-2">Transparent Advice</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Clear commissions disclosure. We reject toxic endowment policies.</p>
            </motion.div>

            {/* Card 4: Long-Term Support */}
            <motion.div
              variants={pillarsCardVariants}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.35 }}
                className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4 shadow-inner"
              >
                <Zap className="h-5 w-5" />
              </motion.div>
              <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-2">Long-Term Support</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">Dedicated claims coordination hotline operating 24/7 during emergencies.</p>
            </motion.div>

            {/* Card 5: Family-Centric Approach */}
            <motion.div
              variants={pillarsCardVariants}
              whileHover={{ y: -10, scale: 1.03, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700/50 shadow-sm cursor-pointer"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.8 }}
                className="h-10 w-10 rounded-xl bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mb-4 shadow-inner"
              >
                <Heart className="h-5 w-5" />
              </motion.div>
              <h3 className="font-serif text-sm font-bold text-slate-800 dark:text-white mb-2">Family-Centric Approach</h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">We protect family livelihood first before index speculation structures.</p>
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* 10. INTERACTIVE SIP CALCULATOR */}
      <section className="py-24 bg-[#FAF8F5] border-y border-slate-200/40">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-semibold tracking-widest text-primary uppercase flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-gold-500" /> Compound Interest Planning
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  Interactive SIP Calculator
                </h3>
                <p className="text-xs text-slate-500">
                  Select parameters below to calculate estimated returns on mutual funds compounding.
                </p>

                <div className="space-y-4 pt-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                      <span>Monthly Installment (₹)</span>
                      <span className="text-primary font-bold">₹ {sipAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <input
                      type="range"
                      min="2000"
                      max="150000"
                      step="1000"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                      <span>Expected Return Rate (%)</span>
                      <span className="text-primary font-bold">{expectedReturn}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="24"
                      step="0.5"
                      value={expectedReturn}
                      onChange={(e) => setExpectedReturn(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2">
                      <span>Duration (Years)</span>
                      <span className="text-primary font-bold">{sipYears} Years</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="40"
                      step="1"
                      value={sipYears}
                      onChange={(e) => setSipYears(Number(e.target.value))}
                      className="w-full accent-primary cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#FAF8F5] border border-slate-100 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="font-serif text-sm font-bold text-slate-800 border-b border-slate-200/50 pb-2">Future Projection</h4>

                  <div className="mt-4 space-y-3.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Invested Principal:</span>
                      <span className="font-semibold text-slate-800">₹ {calcResults.invested.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500 font-medium">Interest Growth:</span>
                      <span className="font-semibold text-secondary">+ ₹ {calcResults.returns.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm border-t border-slate-200/50 pt-3">
                      <span className="text-slate-800 font-bold">Total Maturity Value:</span>
                      <span className="font-mono text-base font-extrabold text-primary">₹ {calcResults.total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] text-slate-400 leading-relaxed italic">
                    *Returns calculated at historical index benchmarks. Mutual fund investments are subject to market risks.
                  </p>
                  <button
                    onClick={onOpenModal}
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-xs font-bold tracking-wider text-white uppercase hover:bg-secondary cursor-pointer shadow-sm"
                  >
                    Allocate Systematic SIP
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 11. CLIENT SUCCESS STORIES */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Client Stories</span>
            <h2 className="font-serif text-3xl font-bold text-slate-800 mt-1">Client Success Stories</h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="relative bg-[#FAF8F5] rounded-3xl p-8 md:p-12 border border-slate-100 overflow-hidden shadow-xl">
            <Quote className="absolute right-8 top-8 h-24 w-24 text-primary/5 shrink-0" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex gap-1">
                    {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-4.5 w-4.5 fill-current text-gold-500" />
                    ))}
                  </div>

                  {testimonials[activeTestimonial].youtubeLink && (
                    <a
                      href={testimonials[activeTestimonial].youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 dark:bg-red-950/20 dark:hover:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold transition-all shadow-sm border border-red-200/20 dark:border-red-900/30 cursor-pointer self-start sm:self-auto"
                    >
                      <svg className="h-4.5 w-4.5 fill-current text-red-600 dark:text-red-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      <span>Watch Success Story</span>
                    </a>
                  )}
                </div>

                <p className="font-serif text-base md:text-lg italic text-slate-700 dark:text-slate-200 leading-relaxed">
                  "{testimonials[activeTestimonial].text}"
                </p>

                <div className="pt-6 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center gap-4">
                  <img
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-md shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <span className="block font-serif text-base font-bold text-primary dark:text-blue-400">
                      {testimonials[activeTestimonial].name}
                    </span>
                    <span className="block text-xs text-slate-400 font-semibold mt-0.5">
                      {testimonials[activeTestimonial].role}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2 w-2 rounded-full transition-all cursor-pointer ${activeTestimonial === idx ? 'w-6 bg-primary' : 'bg-slate-300'
                    }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. PHOTO EXPERIENCE (Pinterest style masonry layout) */}
      <section className="py-24 bg-[#FAF8F5] border-t border-slate-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Gallery</span>
            <h2 className="font-serif text-3xl font-bold text-slate-800 mt-1">Stewardship Gallery</h2>
            <p className="mt-2 text-xs text-slate-500">Click any image to view details and zoom.</p>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                onClick={() => setLightboxImg(img)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white p-2.5 shadow-sm hover:border-primary/40 transition-all duration-300 animate-image-reveal"
              >
                <div className="relative overflow-hidden rounded-xl aspect-[3/4]">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className={`w-full h-full object-cover ${img.pos || 'object-center'} transition-transform duration-500 group-hover:scale-105`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <Maximize2 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-3 text-center">
                  <span className="text-[10px] text-primary uppercase tracking-widest font-bold block mb-1">{img.type}</span>
                  <span className="text-xs font-semibold text-slate-600">{img.caption}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxImg && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxImg(null)}
              className="absolute inset-0 bg-[#0F172A]/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 max-w-4xl w-full flex flex-col items-center"
            >
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute -top-12 right-0 text-white hover:text-primary p-2 cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="h-8 w-8" />
              </button>
              <img
                src={lightboxImg.src}
                alt={lightboxImg.caption}
                className="max-h-[75vh] object-contain rounded-lg border border-slate-200/20"
              />
              <p className="mt-4 font-serif text-lg font-semibold text-white">{lightboxImg.caption}</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 13. FINANCIAL HEALTH CHECKUP FORM */}
      <section id="checkup-section" className="py-24 bg-white border-t border-slate-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="bg-[#FAF8F5] rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl relative overflow-hidden">

            <div className="text-center mb-10">
              <span className="text-xs font-semibold tracking-widest text-primary uppercase">Diagnostic Tool</span>
              <h2 className="font-serif text-3xl font-bold text-slate-800 mt-2">
                Financial Health Checkup
              </h2>
              <p className="mt-3 text-xs text-slate-500">
                Identify portfolio gaps, calculate insurance goals, and map retirement parameters.
              </p>
              <div className="mx-auto mt-4 h-1 w-16 bg-primary rounded-full" />
            </div>

            {/* Step indicators */}
            {!checkupSubmitted && (
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-2">
                  <span className="text-primary font-bold">Step {checkupStep} of 3</span>
                  <span>{Math.round(((checkupStep - 1) / 2) * 100)}% Complete</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((checkupStep - 1) / 2) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {checkupSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-6 text-center text-primary bg-primary/5 border border-primary/20 rounded-2xl"
              >
                <CheckCircle className="h-12 w-12 mb-3 text-primary" />
                <h4 className="font-serif text-lg font-bold">Checkup Requested!</h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed max-w-md">
                  Thank you. Your diagnostic answers have been saved in our CRM system. Rahul Kulkarni's desk will send your score card and asset recommendations via email.
                </p>
                <button
                  onClick={resetFormWizard}
                  className="mt-6 rounded-lg bg-primary hover:bg-secondary px-6 py-2.5 text-xs font-bold text-white uppercase transition-all"
                >
                  Start New Audit
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onCheckupSubmit)} className="space-y-6">

                {/* Step 1: Personal details */}
                {checkupStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <h3 className="font-serif text-base font-bold text-slate-800">Step 1: Contact Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Full Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-850 focus:border-primary focus:outline-none"
                        />
                        {errors.name && <p className="mt-1 text-[10px] text-red-500">{errors.name.message}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Mobile Number</label>
                        <input
                          type="tel"
                          placeholder="10-digit Mobile No"
                          {...register('phone', {
                            required: 'Mobile required',
                            pattern: { value: /^[0-9]{10}$/, message: 'Valid 10-digit required' }
                          })}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-850 focus:border-primary focus:outline-none"
                        />
                        {errors.phone && <p className="mt-1 text-[10px] text-red-500">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Email Address</label>
                        <input
                          type="email"
                          placeholder="name@email.com"
                          {...register('email', {
                            required: 'Email required',
                            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: 'Valid email required' }
                          })}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-850 focus:border-primary focus:outline-none"
                        />
                        {errors.email && <p className="mt-1 text-[10px] text-red-500">{errors.email.message}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Your Age</label>
                        <input
                          type="number"
                          placeholder="e.g. 35"
                          {...register('age', { required: 'Age required', min: { value: 18, message: 'Must be 18+' } })}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-850 focus:border-primary focus:outline-none"
                        />
                        {errors.age && <p className="mt-1 text-[10px] text-red-500">{errors.age.message}</p>}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={() => setCheckupStep(2)}
                        className="rounded-lg bg-primary hover:bg-[#6D28D9] px-6 py-2.5 text-xs font-bold text-white uppercase transition-all cursor-pointer"
                      >
                        Next Step
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Financial Background */}
                {checkupStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <h3 className="font-serif text-base font-bold text-slate-800">Step 2: Financial Assets</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Annual Income Bracket</label>
                        <select
                          {...register('income', { required: 'Income required' })}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-850 focus:border-primary focus:outline-none"
                        >
                          <option value="">Select Income Bracket</option>
                          <option value="Under 5L">Under ₹5 Lakhs</option>
                          <option value="5L - 10L">₹5 Lakhs - ₹10 Lakhs</option>
                          <option value="10L - 25L">₹10 Lakhs - ₹25 Lakhs</option>
                          <option value="Above 25L">Above ₹25 Lakhs</option>
                        </select>
                        {errors.income && <p className="mt-1 text-[10px] text-red-500">{errors.income.message}</p>}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Existing Investment Types</label>
                        <select
                          {...register('investments', { required: 'Investments required' })}
                          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-850 focus:border-primary focus:outline-none"
                        >
                          <option value="">Select Primary Assets</option>
                          <option value="Only FD/Savings">Fixed Deposits & Savings accounts</option>
                          <option value="Mutual Funds & SIPs">Mutual Funds & SIPs</option>
                          <option value="Direct Stocks">Direct Stocks & Equity trading</option>
                          <option value="No active investments">No active investments</option>
                        </select>
                        {errors.investments && <p className="mt-1 text-[10px] text-red-500">{errors.investments.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Current Insurance Details</label>
                      <select
                        {...register('insurance', { required: 'Insurance info required' })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-850 focus:border-primary focus:outline-none"
                      >
                        <option value="">Select Insurance Status</option>
                        <option value="Term & Health cover both">I have both Term & Health covers</option>
                        <option value="Only Health floater">I have health cover but no Term policy</option>
                        <option value="Only Endowment LIC plans">I have LIC savings/endowment plans only</option>
                        <option value="No active insurance">No active insurance coverage</option>
                      </select>
                      {errors.insurance && <p className="mt-1 text-[10px] text-red-500">{errors.insurance.message}</p>}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setCheckupStep(1)}
                        className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold text-slate-600 uppercase transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setCheckupStep(3)}
                        className="rounded-lg bg-primary hover:bg-[#6D28D9] px-6 py-2.5 text-xs font-bold text-white uppercase transition-all cursor-pointer"
                      >
                        Next Step
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Goals */}
                {checkupStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    className="space-y-4"
                  >
                    <h3 className="font-serif text-base font-bold text-slate-800">Step 3: Financial Targets</h3>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">Primary Financial Goals</label>
                      <select
                        {...register('goals', { required: 'Goals required' })}
                        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs text-slate-855 focus:border-primary focus:outline-none"
                      >
                        <option value="">Select Main Priority</option>
                        <option value="Family safety floater">Securing Term coverage for family protection</option>
                        <option value="Child higher tuition">Funding Child higher college education milestones</option>
                        <option value="Retirement cash flow">Building tax-free cash flow retirement accounts</option>
                        <option value="Tax saving portfolio">Optimizing income tax payments</option>
                      </select>
                      {errors.goals && <p className="mt-1 text-[10px] text-red-500">{errors.goals.message}</p>}
                    </div>

                    <div className="flex justify-between pt-4">
                      <button
                        type="button"
                        onClick={() => setCheckupStep(2)}
                        className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold text-slate-600 uppercase transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="rounded-lg bg-primary hover:bg-[#6D28D9] px-8 py-2.5 text-xs font-bold text-white uppercase transition-all cursor-pointer"
                      >
                        Submit Audit Request
                      </button>
                    </div>
                  </motion.div>
                )}

              </form>
            )}

          </div>
        </div>
      </section>

      {/* 14. FAQ ACCORDION */}
      <section className="py-24 bg-[#FAF8F5] border-t border-slate-200/40">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Support Desk</span>
            <h2 className="font-serif text-3xl font-bold text-slate-800 mt-1">Frequently Asked Questions</h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-slate-200/40 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-serif text-base font-bold text-slate-800 hover:text-primary transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-primary shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-slate-100 bg-[#FAF8F5]"
                    >
                      <p className="p-5 text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

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
