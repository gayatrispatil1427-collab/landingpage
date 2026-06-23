import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Calendar, ShieldCheck } from 'lucide-react';

export default function ConsultationModal({ isOpen, onClose }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Saving lead to CRM Database:", data);
    const leads = JSON.parse(localStorage.getItem('rahul_kulkarni_leads') || '[]');
    leads.push({ ...data, id: Date.now(), date: new Date().toISOString(), type: 'Consultation' });
    localStorage.setItem('rahul_kulkarni_leads', JSON.stringify(leads));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  const handleModalClose = () => {
    setSubmitSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleModalClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container — solid white card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white p-6 shadow-2xl md:p-8"
          >
            {/* Close Button */}
            <button
              onClick={handleModalClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            {!submitSuccess ? (
              <>
                {/* Header */}
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#C5A880]/15 text-[#C5A880]">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#C5A880]">Book Free Consultation</h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Take the first step towards securing your family's future.
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      {...register('name', { required: 'Name is required' })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition-colors focus:border-[#C5A880] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/20"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile"
                      {...register('phone', {
                        required: 'Mobile is required',
                        pattern: { value: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit number' }
                      })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition-colors focus:border-[#C5A880] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/20"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                      })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 transition-colors focus:border-[#C5A880] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/20"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>

                  {/* Service Required */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                      Service Required
                    </label>
                    <select
                      {...register('service', { required: 'Please select a service' })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition-colors focus:border-[#C5A880] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]/20"
                    >
                      <option value="">Select a service...</option>
                      <option value="Life Insurance">Life Insurance Planning</option>
                      <option value="Health Insurance">Health Insurance Planning</option>
                      <option value="Retirement Security">Retirement Planning</option>
                      <option value="Child Education">Child Education Planning</option>
                      <option value="Wealth Creation">Wealth Creation</option>
                      <option value="Tax Saving">Tax Saving Solutions</option>
                      <option value="Goal Planning">Financial Goal Planning</option>
                      <option value="Investment Advisory">Investment Advisory</option>
                    </select>
                    {errors.service && <p className="mt-1 text-xs text-red-500">{errors.service.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-r from-[#B89047] to-[#C5A880] py-3.5 text-sm font-bold tracking-wider text-white uppercase transition-all hover:brightness-110 disabled:opacity-50 shadow-lg shadow-[#C5A880]/25"
                  >
                    {isSubmitting ? (
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      "Confirm Consultation Booking"
                    )}
                  </motion.button>
                </form>

                {/* Security Note */}
                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-wider text-slate-400 uppercase">
                  <ShieldCheck className="h-4 w-4 text-[#C5A880]" />
                  Your details are 100% secure. SSL Encrypted.
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                  className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"
                >
                  <CheckCircle className="h-10 w-10" />
                </motion.div>
                <h3 className="font-serif text-2xl font-bold text-[#065F46]">Booking Confirmed!</h3>
                <p className="mt-2 text-slate-500">
                  Thank you for taking a step towards financial freedom. Rahul Kulkarni or a team member will reach out to you within the next 2 hours.
                </p>
                <button
                  onClick={handleModalClose}
                  className="mt-8 rounded-lg border border-[#C5A880] px-6 py-2.5 text-sm font-semibold text-[#C5A880] transition-colors hover:bg-[#C5A880] hover:text-white"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
