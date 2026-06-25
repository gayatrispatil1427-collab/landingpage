import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Award, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log('Subscribed email:', email);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative border-t border-slate-200/50 bg-[#F5F7F4] pt-16 pb-8 text-slate-700">
      {/* Background shape */}
      <div className="absolute top-0 right-1/4 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Brand Info */}
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-500 bg-primary text-white font-serif text-lg font-bold">
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
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Empowering families and businesses to secure their financial future through trusted advisory in insurance, investments, and retirement planning.
            </p>
            <div className="mt-6 flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Award className="h-4.5 w-4.5 text-gold-500" />
                <span>MDRT & Chairman's Club Member</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <Shield className="h-4.5 w-4.5 text-gold-500" />
                <span>18+ Years of Dedicated Service</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">Quick Links</h3>
            <ul className="mt-6 space-y-3 text-xs">
              <li>
                <Link to="/" className="transition-colors hover:text-primary">Home Page</Link>
              </li>
              <li>
                <Link to="/about" className="transition-colors hover:text-primary">About Rahul Kulkarni</Link>
              </li>
              <li>
                <Link to="/services" className="transition-colors hover:text-primary">Wealth & Insurance Services</Link>
              </li>
              <li>
                <Link to="/checkup" className="transition-colors hover:text-primary">Financial Health Checkup</Link>
              </li>
              <li>
                <Link to="/blog" className="transition-colors hover:text-primary">Finance Blog & Insights</Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-primary">Contact Office</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider">Office Details</h3>
            <ul className="mt-6 space-y-3.5 text-xs text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold-500" />
                <span className="leading-relaxed">
                  402, Signature Corporate Towers, Opp. Central Park, Shivajinagar, Pune - 411005
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4.5 w-4.5 text-gold-500" />
                <a href="tel:+919876543210" className="transition-colors hover:text-primary">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4.5 w-4.5 text-gold-500" />
                <a href="mailto:info@rahulkulkarni.com" className="transition-colors hover:text-primary">info@rahulkulkarni.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-serif text-sm font-bold text-primary uppercase tracking-wider font-semibold">Weekly Insights</h3>
            <p className="mt-4 text-xs text-slate-500 leading-relaxed">
              Subscribe to get tax-saving strategies, wealth tips, and investment updates direct to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mt-6">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-12 text-xs text-slate-800 focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-md bg-primary p-2 text-white hover:bg-[#115e56] transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </form>
            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-xs text-emerald-600 font-semibold"
              >
                Thank you! You have successfully subscribed.
              </motion.p>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 border-t border-slate-200/50 pt-8 text-center text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Rahul Kulkarni - Insurance & Wealth Consultant. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="hover:text-primary">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-primary">Disclaimer</a>
          </div>
          <p className="mt-4 text-[9px] italic opacity-60 leading-relaxed">
            Disclaimer: Insurance is the subject matter of solicitation. Mutual funds and security investments are subject to market risks. Please read all scheme-related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}
