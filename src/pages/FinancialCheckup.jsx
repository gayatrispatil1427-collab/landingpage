import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, ChevronRight, ChevronLeft, ShieldCheck, Heart, Award, Trophy } from 'lucide-react';

export default function FinancialCheckup() {
  const [step, setStep] = useState(1);
  const [scoreData, setScoreData] = useState(null);
  const { register, handleSubmit, formState: { errors }, trigger, getValues } = useForm({
    defaultValues: {
      name: '', age: '', email: '', phone: '', city: '',
      monthlyIncome: '', monthlyExpenses: '', incomeSource: 'salaried',
      investmentMutualFunds: false, investmentFD: false, investmentGold: false, investmentRealEstate: false,
      hasLifeInsurance: 'no', lifeCoverAmount: '0',
      hasHealthInsurance: 'no', healthCoverAmount: '0',
      goalRetirement: false, goalEducation: false, goalHome: false, goalWealth: false
    }
  });

  const stepsTitle = [
    "Personal Profile",
    "Income & Expense Profile",
    "Asset Allocation",
    "Insurance Cover",
    "Future Aspirations"
  ];

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) fieldsToValidate = ['name', 'age', 'email', 'phone', 'city'];
    if (step === 2) fieldsToValidate = ['monthlyIncome', 'monthlyExpenses', 'incomeSource'];
    if (step === 3) fieldsToValidate = [];
    if (step === 4) fieldsToValidate = ['hasLifeInsurance', 'hasHealthInsurance'];
    if (step === 5) fieldsToValidate = [];

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const calculateFinancialScore = (data) => {
    let score = 30; // base score
    let recommendations = [];

    const income = parseFloat(data.monthlyIncome) || 0;
    const expenses = parseFloat(data.monthlyExpenses) || 0;
    const savings = income - expenses;
    const savingsRate = income > 0 ? (savings / income) * 100 : 0;

    if (savingsRate >= 40) {
      score += 20;
    } else if (savingsRate >= 20) {
      score += 10;
    } else {
      recommendations.push("Your savings rate is below 20%. Try auditing monthly expenses to free up surplus investment capital.");
    }

    let assetCount = 0;
    if (data.investmentMutualFunds) assetCount++;
    if (data.investmentFD) assetCount++;
    if (data.investmentGold) assetCount++;
    if (data.investmentRealEstate) assetCount++;

    if (assetCount >= 3) {
      score += 15;
    } else if (assetCount >= 1) {
      score += 8;
    } else {
      recommendations.push("No active investments detected. Start a systematic SIP in diversified mutual funds for inflation-beating growth.");
    }

    if (data.hasLifeInsurance === 'yes') {
      score += 15;
      const cover = parseFloat(data.lifeCoverAmount) || 0;
      const annualIncome = income * 12;
      if (cover < (annualIncome * 10)) {
        recommendations.push(`Your life insurance cover (${cover.toLocaleString('en-IN')} L) is below the recommended 10x of annual income (${(annualIncome * 10).toLocaleString('en-IN')} L). Consider upgrading.`);
      }
    } else {
      recommendations.push("Term Life Insurance is highly recommended to protect your dependents from outstanding liabilities.");
    }

    if (data.hasHealthInsurance === 'yes') {
      score += 15;
    } else {
      recommendations.push("Health insurance cover is missing. A family medical emergency can exhaust active retirement corpuses. Take active health covers.");
    }

    let goalCount = 0;
    if (data.goalRetirement) goalCount++;
    if (data.goalEducation) goalCount++;
    if (data.goalHome) goalCount++;
    if (data.goalWealth) goalCount++;

    if (goalCount >= 2) {
      score += 5;
    }

    score = Math.min(score, 100);

    let status = "Needs Immediate Attention";
    let statusColor = "text-red-600";
    if (score >= 80) {
      status = "Excellent Financial Health";
      statusColor = "text-emerald-600";
    } else if (score >= 55) {
      status = "Moderate Financial Health";
      statusColor = "text-amber-600";
    }

    return { score, status, statusColor, recommendations };
  };

  const onSubmit = (data) => {
    const results = calculateFinancialScore(data);
    setScoreData(results);
    
    const submissions = JSON.parse(localStorage.getItem('rahul_kulkarni_checkups') || '[]');
    submissions.push({ ...data, id: Date.now(), timestamp: new Date().toISOString(), score: results.score });
    localStorage.setItem('rahul_kulkarni_checkups', JSON.stringify(submissions));

    setStep(6);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-transparent text-slate-800">
      {/* Background blobs */}
      <div className="absolute top-20 left-10 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 -z-10 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        
        {/* Title Block */}
        <div className="text-center mb-10">
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">Diagnostic Tool</span>
          <h1 className="font-serif text-3xl font-bold text-slate-800 mt-1 md:text-4xl">
            Financial Health Checkup
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            Identify gaps in your savings, cover, and investment portfolio in less than 5 minutes.
          </p>
        </div>

        {/* Step Indicator Progress Bar */}
        {step <= 5 && (
          <div className="mb-8">
            <div className="flex justify-between items-center text-xs font-mono text-slate-500 mb-2">
              <span className="text-primary uppercase font-semibold">Step {step} of 5: {stepsTitle[step-1]}</span>
              <span>{Math.round(((step - 1) / 4) * 100)}% Complete</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden border border-slate-200/50">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: '0%' }}
                animate={{ width: `${((step - 1) / 4) * 100}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        )}

        {/* Form Container */}
        <div className="glass-card rounded-2xl p-6 md:p-10 border border-slate-100 shadow-xl">
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              
              {/* Step 1: Personal Info */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Your Full Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        {...register('name', { required: 'Name is required' })}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                      {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Your Age</label>
                      <input
                        type="number"
                        placeholder="35"
                        {...register('age', {
                          required: 'Age is required',
                          min: { value: 18, message: 'Must be at least 18' },
                          max: { value: 100, message: 'Must be below 100' }
                        })}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                      {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Email Address</label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: 'Invalid email address' }
                        })}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Mobile Number</label>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        {...register('phone', {
                          required: 'Mobile is required',
                          pattern: { value: /^[0-9]{10}$/, message: 'Must be 10-digit number' }
                        })}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">City</label>
                      <input
                        type="text"
                        placeholder="Pune"
                        {...register('city', { required: 'City is required' })}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                      {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Income Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Income & Expenses</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Monthly Net Income (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g. 100000"
                        {...register('monthlyIncome', { required: 'Income is required' })}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                      {errors.monthlyIncome && <p className="mt-1 text-xs text-red-500">{errors.monthlyIncome.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Approx. Monthly Expenses (₹)</label>
                      <input
                        type="number"
                        placeholder="e.g. 60000"
                        {...register('monthlyExpenses', { required: 'Expenses are required' })}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                      {errors.monthlyExpenses && <p className="mt-1 text-xs text-red-500">{errors.monthlyExpenses.message}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Primary Source of Income</label>
                      <select
                        {...register('incomeSource')}
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      >
                        <option value="salaried">Salaried Professional</option>
                        <option value="business">Business Owner / Self-employed</option>
                        <option value="freelancer">Freelancer / Consultant</option>
                        <option value="other">Other / Retired</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Existing Investments */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Active Investments</h3>
                  <p className="text-xs text-slate-500">Select all avenues where you currently invest or hold assets:</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" {...register('investmentMutualFunds')} className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-0 focus:ring-offset-0" />
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">Mutual Funds & SIPs</span>
                        <span className="block text-[10px] text-slate-500">Systematic wealth growth</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" {...register('investmentFD')} className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-0 focus:ring-offset-0" />
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">Fixed Deposits & PPF</span>
                        <span className="block text-[10px] text-slate-500">Safe, guaranteed instruments</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" {...register('investmentGold')} className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-0 focus:ring-offset-0" />
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">Physical / Digital Gold</span>
                        <span className="block text-[10px] text-slate-500">Hedging and jewelry reserves</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" {...register('investmentRealEstate')} className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-0 focus:ring-offset-0" />
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">Real Estate & Land</span>
                        <span className="block text-[10px] text-slate-500">Physical property assets</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Insurance Details */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Insurance Protection</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Do you have active Life Insurance / Term Plans?</label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                          <input type="radio" value="yes" {...register('hasLifeInsurance')} className="h-4 w-4 text-primary border-slate-300 focus:ring-0" />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                          <input type="radio" value="no" {...register('hasLifeInsurance')} className="h-4 w-4 text-primary border-slate-300 focus:ring-0" />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-l-2 border-primary/20 pl-4 py-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Total Term Cover Amount (₹ Lakhs)</label>
                      <input
                        type="number"
                        placeholder="e.g. 50 (for 50 Lakhs)"
                        {...register('lifeCoverAmount')}
                        className="mt-1 w-full max-w-xs rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Do you have active Health Insurance cover?</label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                          <input type="radio" value="yes" {...register('hasHealthInsurance')} className="h-4 w-4 text-primary border-slate-300 focus:ring-0" />
                          <span>Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700">
                          <input type="radio" value="no" {...register('hasHealthInsurance')} className="h-4 w-4 text-primary border-slate-300 focus:ring-0" />
                          <span>No</span>
                        </label>
                      </div>
                    </div>

                    <div className="border-l-2 border-primary/20 pl-4 py-1">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Total Health Cover (₹ Lakhs)</label>
                      <input
                        type="number"
                        placeholder="e.g. 5 (for 5 Lakhs)"
                        {...register('healthCoverAmount')}
                        className="mt-1 w-full max-w-xs rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 5: Financial Goals */}
              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="font-serif text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Target Objectives</h3>
                  <p className="text-xs text-slate-500">Select the milestones you want to plan or fund actively:</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" {...register('goalRetirement')} className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-0" />
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">Retirement Security</span>
                        <span className="block text-[10px] text-slate-500">Living independently post-retirement</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" {...register('goalEducation')} className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-0" />
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">Child Education / Marriage</span>
                        <span className="block text-[10px] text-slate-500">Funding higher studies stress-free</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" {...register('goalHome')} className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-0" />
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">Home / Asset Acquisition</span>
                        <span className="block text-[10px] text-slate-500">Planning downpayments systematically</span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/50 p-4 cursor-pointer hover:border-primary/50 transition-colors">
                      <input type="checkbox" {...register('goalWealth')} className="h-4 w-4 text-primary border-slate-300 rounded focus:ring-0" />
                      <div>
                        <span className="block text-sm font-semibold text-slate-800">Generational Wealth Creation</span>
                        <span className="block text-[10px] text-slate-500">Compounding capital reserves</span>
                      </div>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step 6: Diagnostic Report */}
              {step === 6 && scoreData && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Trophy className="h-10 w-10 animate-bounce text-gold-500" />
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl font-bold text-slate-800">Your Financial Diagnostic Report</h3>
                    <p className="mt-1 text-xs text-slate-500">Calculated based on your active liabilities, protective covers, and saving patterns.</p>
                  </div>

                  {/* Score circle */}
                  <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border-4 border-slate-100 bg-[#F8FAFC] shadow-inner">
                    <svg className="absolute inset-0 h-full w-full -rotate-90">
                      <circle cx="72" cy="72" r="66" stroke="rgba(11, 94, 215, 0.05)" strokeWidth="8" fill="transparent" />
                      <motion.circle
                        cx="72"
                        cy="72"
                        r="66"
                        stroke="#0B5ED7"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={2 * Math.PI * 66}
                        initial={{ strokeDashoffset: 2 * Math.PI * 66 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 66 * (1 - scoreData.score / 100) }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="z-10 flex flex-col items-center">
                      <span className="font-mono text-4xl font-extrabold text-slate-800">{scoreData.score}</span>
                      <span className="text-[10px] font-bold text-primary tracking-widest uppercase">Score</span>
                    </div>
                  </div>

                  <div className="py-2.5">
                    <span className={`text-base font-bold ${scoreData.statusColor} uppercase tracking-wider`}>
                      {scoreData.status}
                    </span>
                  </div>

                  {/* Recommendations */}
                  <div className="text-left bg-[#F8FAFC] rounded-xl p-5 border border-slate-100 space-y-3.5 shadow-sm">
                    <h4 className="font-serif text-sm font-bold text-primary flex items-center gap-2">
                      <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                      Advisor's Custom Observations:
                    </h4>
                    {scoreData.recommendations.length > 0 ? (
                      <ul className="space-y-2 text-xs text-slate-600 font-medium">
                        {scoreData.recommendations.map((rec, i) => (
                          <li key={i} className="flex gap-2 items-start leading-relaxed">
                            <span className="h-1.5 w-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-emerald-600 font-semibold leading-relaxed">
                        Fantastic job! Your asset allocations, term covers, and emergency safety nets are well-designed. Let's optimize tax elements further.
                      </p>
                    )}
                  </div>

                  {/* Call to Action */}
                  <div className="pt-4 border-t border-slate-100 space-y-4">
                    <p className="text-xs text-slate-500">
                      Rahul Kulkarni can help you execute these recommendations with tax-free instruments and corporate benefit planning.
                    </p>
                    <a
                      href={`https://wa.me/919876543210?text=Hello%20Rahul%2C%20I%20completed%20the%20financial%20health%20checkup%20and%20got%20a%20score%20of%20${scoreData.score}%2F100.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold tracking-wider text-white uppercase transition-all hover:brightness-110 shadow-md"
                    >
                      Discuss Report on WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => { setStep(1); setScoreData(null); }}
                      className="text-xs text-slate-500 hover:text-slate-900 transition-colors underline"
                    >
                      Re-take Assessment
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            {step <= 5 && (
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors text-xs font-semibold cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>

                {step < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-primary text-white font-semibold hover:brightness-110 transition-colors text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:brightness-110 transition-all text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Submit & Diagnostic Report
                  </button>
                )}
              </div>
            )}
          </form>

        </div>

      </div>
    </div>
  );
}
