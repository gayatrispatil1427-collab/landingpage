import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ArrowRight, BookOpen, ArrowLeft } from 'lucide-react';

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Insurance', 'Investments', 'Retirement', 'Tax Planning', 'Family Finance'];

  const blogPosts = [
    {
      id: 1,
      title: "Why Traditional Term Insurance is Better Than Endowment Plans",
      category: "Insurance",
      date: "June 15, 2026",
      author: "Rahul Kulkarni",
      readTime: "5 min read",
      desc: "Endowment policies often bundle insurance and low-yield investment. Discover why separating term insurance and mutual funds maximizes your cover and maturity payouts.",
      img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
      featured: true
    },
    {
      id: 2,
      title: "How to Build a 10 Crore Retirement Fund in 20 Years",
      category: "Retirement",
      date: "June 10, 2026",
      author: "Rahul Kulkarni",
      readTime: "7 min read",
      desc: "Analyze systematic investment planning (SIP) allocations, stepping up investments annually, and managing asset allocations over the years to secure retirement.",
      img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=800",
      featured: false
    },
    {
      id: 3,
      title: "Maximizing Section 80C, 80D Exemption Strategies",
      category: "Tax Planning",
      date: "June 05, 2026",
      author: "Rahul Kulkarni",
      readTime: "4 min read",
      desc: "A detailed breakdown of tax-saving avenues in India, including ELSS, PPF, NPS, and health premium exemptions, to structure maximum legal tax-savings.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
      featured: false
    },
    {
      id: 4,
      title: "Secure Your Child's Higher Education Costs Against Inflation",
      category: "Family Finance",
      date: "May 28, 2026",
      author: "Rahul Kulkarni",
      readTime: "6 min read",
      desc: "Higher education inflation is rising at 10-12% yearly. Learn how to map out a dedicated equity mutual fund SIP portfolio to fund engineering, medical or overseas studies.",
      img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
      featured: false
    },
    {
      id: 5,
      title: "The Ultimate Guide to Health Cover & Critical Illness Riders",
      category: "Insurance",
      date: "May 15, 2026",
      author: "Rahul Kulkarni",
      readTime: "8 min read",
      desc: "Base health policies often exclude specialized cancer or cardiac treatments. Discover how to overlay critical illness riders for complete financial peace.",
      img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800",
      featured: false
    },
    {
      id: 6,
      title: "Why Asset Allocation Outperforms Individual Stock Selection",
      category: "Investments",
      date: "May 02, 2026",
      author: "Rahul Kulkarni",
      readTime: "5 min read",
      desc: "Studies reveal that 90% of portfolio performance variance is determined by asset allocation rather than individual stocks. Balance debt, gold, and equity strategically.",
      img: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800",
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(p => p.featured);
  const standardPosts = filteredPosts.filter(p => !p.featured || activeCategory !== 'All');

  return (
    <div className="relative min-h-screen pt-28 pb-16 overflow-hidden bg-transparent text-slate-800">
      {/* Background shapes */}
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
        
        {/* Header block */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-widest text-primary uppercase">Knowledge Base</span>
          <h1 className="font-serif text-4xl font-bold text-slate-800 mt-2 md:text-5xl">
            Financial Insights & <span className="text-primary">Planning Guides</span>
          </h1>
          <p className="mt-4 text-sm text-slate-600">
            Read professional analyses on tax laws, retirement compounding, health policies, and investment models curated by Rahul Kulkarni.
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-primary rounded-full" />
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12 pb-8 border-b border-slate-100">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-primary/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-300 bg-white px-5 py-2.5 pl-12 text-sm text-slate-800 focus:border-primary focus:outline-none"
            />
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
          </div>
        </div>

        {/* Featured Post */}
        {activeCategory === 'All' && searchQuery === '' && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 glass-card rounded-2xl overflow-hidden border border-slate-100 shadow-xl p-4 md:p-6"
          >
            {/* Image */}
            <div className="lg:col-span-7 overflow-hidden rounded-xl h-64 md:h-[400px]">
              <motion.img
                src={featuredPost.img}
                alt={featuredPost.title}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full object-cover animate-image-zoom"
              />
            </div>

            {/* Content */}
            <div className="lg:col-span-5 flex flex-col justify-between py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="bg-primary/10 px-2.5 py-1 rounded">{featuredPost.category}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                
                <h2 className="font-serif text-2xl font-bold text-slate-800 group-hover:text-primary transition-colors md:text-3xl">
                  {featuredPost.title}
                </h2>
                
                <p className="text-xs text-slate-600 leading-relaxed">
                  {featuredPost.desc}
                </p>
              </div>

              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-bold text-xs">
                    RK
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-800">{featuredPost.author}</span>
                    <span className="block text-[10px] text-slate-500">{featuredPost.date}</span>
                  </div>
                </div>

                <a href="#" className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline uppercase">
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Post Grid */}
        <AnimatePresence mode="wait">
          {standardPosts.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {standardPosts.map((post) => (
                <motion.article
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="group flex flex-col justify-between glass-card rounded-2xl border border-slate-100 p-5 hover:border-primary/30 hover:-translate-y-1.5 transition-all duration-300 shadow-sm"
                >
                  <div>
                    {/* Card Image */}
                    <div className="overflow-hidden rounded-xl h-48 mb-5">
                      <motion.img
                        src={post.img}
                        alt={post.title}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-3.5">
                      <span className="text-primary bg-primary/10 px-2 py-0.5 rounded">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-xs text-slate-500 leading-relaxed mb-6">
                      {post.desc}
                    </p>
                  </div>

                  {/* Card bottom details */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[10px] text-slate-600 font-semibold">{post.author}</span>
                    </div>
                    <a href="#" className="flex items-center gap-1 text-[10px] font-bold text-primary hover:underline uppercase">
                      Read Details
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <BookOpen className="mx-auto h-12 w-12 text-slate-400" />
              <h3 className="font-serif text-xl font-bold text-slate-800 mt-4">No Articles Found</h3>
              <p className="text-sm text-slate-500 mt-2">Try adjusting your filters or search keywords.</p>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
