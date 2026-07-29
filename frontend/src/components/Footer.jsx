import React from 'react';
import { Terminal, Github, Mail, ShieldCheck } from 'lucide-react';

export default function Footer({ onOpenForm }) {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white">
              <Terminal className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-950 text-base">NexGen Architects</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">Student Capstone & Engineering Labs</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#catalog" className="hover:text-slate-700 transition-colors">Catalog</a>
            <a href="#guarantee" className="hover:text-slate-700 transition-colors">Guarantee</a>
            <button onClick={onOpenForm} className="hover:text-blue-600 transition-colors">Submit Form</button>
          </div>

        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} NexGen Architects. All rights reserved. Production Ready B.Tech / Master's Engineering Solutions.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              SSL Encrypted Data Pipeline
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
