import React from 'react';
import { motion } from 'framer-motion';
import { Award, Briefcase, GraduationCap, Heart, Milestone, ShieldCheck, Target, Eye } from 'lucide-react';
import Counter from '../components/Counter';
import portraitImg from '../assets/rahul-portrait.jpeg';
import awardImg from '../assets/rahul-award.jpeg';

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

  const timelineEvents = [
    {
      year: '2011',
      title: 'The Inception',
      desc: 'Began journey as an insurance consultant with a vision to make financial literacy accessible to every household.',
      icon: Briefcase
    },
    {
      year: '2015',
      title: 'MDRT Qualification',
      desc: 'Qualified for the prestigious Million Dollar Round Table (MDRT, USA) for the first time, reflecting top-tier client dedication.',
      icon: Award
    },
    {
      year: '2018',
      title: 'CFP Certification & 100Cr Life Cover',
      desc: 'Completed Certified Financial Planner credentials and crossed the milestone of managing 100 Crores in active life cover.',
      icon: GraduationCap
    },
    {
      year: '2021',
      title: 'Court of the Table (COT)',
      desc: 'Achieved Court of the Table honors, expanding the advisory team to support comprehensive estate and retirement planning.',
      icon: Milestone
    },
    {
      year: '2025',
      title: 'Chairman\'s Club & 500Cr Cover',
      desc: 'Inducted into the premier Chairman\'s Club, securing over 1,000 families with a cumulative life cover exceeding 500 Crores.',
      icon: ShieldCheck
    }
  ];

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
              With over 15 years of hands-on experience in insurance, wealth creation, and retirement mapping, my philosophy revolves around putting <strong>Family First</strong>. I believe that financial advisory is not just about numbers; it is about building security nets for your loved ones.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              As a premier Life Insurance consultant and wealth planner, my goal is to guide you away from standard off-the-shelf financial products, offering instead bespoke planning strategies aligned specifically with your life milestones.
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-200">
              <div>
                <span className="block font-serif text-2xl font-bold text-primary">
                  <Counter value="15" suffix="+" />
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Years Exp</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-primary">
                  <Counter value="1000" suffix="+" />
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Families Secured</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-primary">
                  <Counter value="500" suffix="Cr+" />
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Cover Managed</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-primary">
                  <Counter value="98" suffix="%" />
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Retention</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
          {/* Mission Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl border border-slate-100 flex gap-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-800">Our Mission</h3>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                To replace financial anxiety with clarity. We strive to design protection-focused plans that ensure families can survive any storm and preserve their lifestyles across generations.
              </p>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="glass-card p-8 rounded-2xl border border-slate-100 flex gap-5"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-slate-800">Our Vision</h3>
              <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                To be the most trusted financial safety partner in India, known for unmatched claim support speed, transparent advice, and client-first wealth preservation.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Career Timeline */}
        <div className="mt-28">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">My Journey</span>
            <h2 className="font-serif text-3xl font-bold text-slate-800 mt-2 md:text-4xl">
              Professional Milestones & Evolution
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-primary rounded-full" />
          </div>

          <div className="relative border-l-2 border-primary/20 ml-4 md:ml-1/2 md:border-l-2">
            {timelineEvents.map((evt, idx) => {
              const Icon = evt.icon;
              return (
                <motion.div
                  key={evt.year}
                  variants={itemVariants}
                  className={`relative mb-12 md:w-1/2 pl-8 md:pl-0 ${
                    idx % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:mr-auto md:pr-12 md:text-right md:left-[-2px]'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className={`absolute top-1.5 h-6 w-6 rounded-full border-2 border-primary bg-white flex items-center justify-center text-primary shadow-md ${
                    idx % 2 === 0 ? 'left-[-13px] md:left-[-13px]' : 'left-[-13px] md:right-[-13px] md:left-auto'
                  }`}>
                    <Icon className="h-3 w-3" />
                  </div>

                  <div className="glass-card p-6 rounded-xl border border-slate-100">
                    <span className="inline-block font-mono text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md mb-2">
                      {evt.year}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-slate-800 mb-2">{evt.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{evt.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Awards Section */}
        <div className="mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text block */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 space-y-6 order-2 lg:order-1"
          >
            <span className="text-sm font-semibold tracking-widest text-primary uppercase">Recognized Excellence</span>
            <h2 className="font-serif text-3xl font-bold text-slate-800 md:text-4xl">
              Industry Credentials & National Awards
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dedication to professional growth and ethical advisory has earned Rahul Kulkarni multiple accolades at the national level. Recognized by life insurance councils and global planning boards, these awards stand as a testament to the trust placed by over a thousand families.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Million Dollar Round Table (MDRT) Qualifier</h4>
                  <p className="text-xs text-slate-500">Achieved MDRT status consecutively, recognizing elite client handling and ethics globally.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">LIC Chairman's Club Member</h4>
                  <p className="text-xs text-slate-500">Awarded the highest tier membership for outstanding sales and customer service records in India.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm">Certified Financial Planner (CFP) Honors</h4>
                  <p className="text-xs text-slate-500">Recognized for excellence in advanced retirement, tax planning, and portfolio advisory.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Award Image */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 flex justify-center order-1 lg:order-2"
          >
            <div className="relative group w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 p-2.5 shadow-xl">
              <motion.img
                src={awardImg}
                alt="Rahul Kulkarni receiving Award"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="w-full max-h-[520px] object-cover object-top rounded-xl"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-300" />
            </div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
