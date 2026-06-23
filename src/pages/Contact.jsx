import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Saving contact inquiry to CRM:", data);
    
    const leads = JSON.parse(localStorage.getItem('rahul_kulkarni_leads') || '[]');
    leads.push({ ...data, id: Date.now(), date: new Date().toISOString(), type: 'Inquiry' });
    localStorage.setItem('rahul_kulkarni_leads', JSON.stringify(leads));

    setIsSubmitting(false);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 5000);
  };

  const mapIframe = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.0768994784913!2d73.84712431489283!3d18.526569987405295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07df74b830d%3A0xa19f07d2f9e4fd9a!2sShivajinagar%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1655000000000!5m2!1sen!2sin";

  return (
    <div className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-transparent text-slate-800">
      {/* Background Shapes */}
      <div className="absolute top-20 left-10 -z-10 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 -z-10 h-96 w-96 rounded-full bg-gold-500/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">Get In Touch</span>
          <h1 className="font-serif text-4xl font-bold text-slate-800 mt-2 md:text-5xl">
            Let's Secure Your <span className="text-primary">Future Together</span>
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            Have questions about health, life insurance, retirement, or tax-saving? Get in touch for an obligation-free consultation.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-primary rounded-full" />
        </div>

        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-serif text-2xl font-bold text-slate-800">Office Information</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              We look forward to meeting you at our Corporate Office in Shivajinagar, Pune. Call or email to schedule an in-person meeting.
            </p>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex gap-5 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Corporate Address</h4>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    402, Signature Corporate Towers, Opp. Central Park, Shivajinagar, Pune - 411005
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-5 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Call Office</h4>
                  <p className="mt-2 text-xs text-slate-600">
                    <a href="tel:+919876543210" className="hover:text-primary transition-colors font-semibold">+91 98765 43210</a> (Mon-Sat, 9AM to 7PM)
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5 items-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Write To Us</h4>
                  <p className="mt-2 text-xs text-slate-600">
                    <a href="mailto:info@rahulkulkarni.com" className="hover:text-primary transition-colors font-semibold">info@rahulkulkarni.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Integration Block */}
            <div className="glass-card rounded-2xl p-6 border border-slate-100 shadow-sm bg-[#F8FAFC]/50">
              <h3 className="font-serif text-lg font-bold text-primary mb-2">Need Immediate Answers?</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Chat directly with Rahul Kulkarni on WhatsApp for instant replies to policies and claims query.
              </p>
              <a
                href="https://wa.me/919876543210?text=Hello%20Rahul%2C%20I%20have%20a%20question%20regarding%20financial%20planning."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold tracking-wider text-white uppercase hover:bg-[#20ba5a] transition-colors shadow-sm cursor-pointer"
              >
                <MessageSquare className="h-4.5 w-4.5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 glass-card rounded-2xl p-8 border border-slate-100 shadow-xl bg-white">
            <h2 className="font-serif text-2xl font-bold text-slate-800 mb-6">Send A Message</h2>
            
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex items-center gap-3 rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-emerald-700"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="text-sm font-semibold">Your inquiry has been received. We will contact you shortly!</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Your Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register('name', { required: 'Name is required' })}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="Enter mobile"
                    {...register('phone', {
                      required: 'Mobile is required',
                      pattern: { value: /^[0-9]{10}$/, message: 'Must be a 10-digit number' }
                    })}
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, message: 'Invalid email address' }
                  })}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600">Message / Inquiry Details</label>
                <textarea
                  rows={4}
                  placeholder="How can we help you secure your retirement, insurance, or taxes?"
                  {...register('message', { required: 'Please specify details' })}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 transition-colors focus:border-primary focus:outline-none text-sm"
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileTap={{ scale: 0.98 }}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-semibold tracking-wider text-white uppercase transition-all hover:brightness-110 disabled:opacity-50 shadow-md shadow-primary/10"
              >
                {isSubmitting ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Secure Inquiry
                  </>
                )}
              </motion.button>
            </form>
          </div>

        </div>

        {/* Embedded Map section */}
        <div className="mt-20 glass-card rounded-2xl overflow-hidden border border-slate-100 h-96 shadow-xl">
          <iframe
            src={mapIframe}
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'none' }}
            allowFullScreen=""
            loading="lazy"
            title="Rahul Kulkarni Office Location Shivajinagar Pune"
          />
        </div>

      </div>
    </div>
  );
}
