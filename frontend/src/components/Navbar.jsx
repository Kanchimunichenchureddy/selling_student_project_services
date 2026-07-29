import React, { useState, useEffect } from 'react';
import { Terminal, Sparkles, Calculator, HelpCircle, Layers, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenForm }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/88 backdrop-blur-xl border-b border-slate-200/80 py-3 shadow-xl shadow-blue-900/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 via-sky-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
              <Terminal className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-950 flex items-center gap-1.5 font-sans">
                NexGen <span className="gradient-text">Architects</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono -mt-1 tracking-wider uppercase">
                Production-Ready Capstone Labs
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5 text-sm font-semibold text-slate-600">
            <button
              onClick={() => scrollToSection('catalog')}
              className="px-3 py-2 rounded-xl hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <Layers className="w-4 h-4 text-blue-600 flex-shrink-0" />
              Project Catalog
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="px-3 py-2 rounded-xl hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center gap-2 text-blue-700 whitespace-nowrap"
            >
              <Calculator className="w-4 h-4 text-blue-600 flex-shrink-0" />
              Cost Estimator
            </button>
            <button
              onClick={() => scrollToSection('guarantee')}
              className="px-3 py-2 rounded-xl hover:text-blue-700 hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Our Guarantee
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="px-3 py-2 rounded-xl hover:text-blue-700 hover:bg-blue-50 transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <HelpCircle className="w-4 h-4 text-slate-500 flex-shrink-0" />
              FAQ
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden xl:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono whitespace-nowrap">
              <ShieldCheck className="w-3.5 h-3.5" />
              2026 Batches Open
            </div>
            <button
              onClick={onOpenForm}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 hover:from-blue-600 hover:to-emerald-400 text-white font-semibold text-sm shadow-md shadow-blue-600/25 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-white" />
              Request Project Plan
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 pb-6 border-t border-slate-200/80 flex flex-col gap-4 animate-in slide-in-from-top duration-200 bg-white/95 rounded-2xl px-4 shadow-xl shadow-blue-900/10">
            <button
              onClick={() => scrollToSection('catalog')}
              className="text-left text-slate-700 font-medium py-2 hover:text-blue-700 flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-blue-600" />
              Project Catalog
            </button>
            <button
              onClick={() => scrollToSection('estimator')}
              className="text-left text-blue-700 font-semibold py-2 hover:text-blue-800 flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              Cost Estimator
            </button>
            <button
              onClick={() => scrollToSection('guarantee')}
              className="text-left text-slate-700 font-medium py-2 hover:text-blue-700"
            >
              Our Guarantee
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-left text-slate-700 font-medium py-2 hover:text-blue-700 flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              FAQ
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenForm();
              }}
              className="w-full py-3 rounded-xl bg-blue-700 text-white font-semibold text-center flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
            >
              <Sparkles className="w-4 h-4" />
              Request Project Plan
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
