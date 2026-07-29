import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles, MessageSquare } from 'lucide-react';

export default function FAQSection({ onOpenForm }) {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "Who owns the source code and IP rights of the project?",
      a: "For custom work, source code, database schemas, and documentation are handed over to you according to the agreed scope. Reusable internal tooling and third-party dependencies remain governed by their own licenses."
    },
    {
      q: "What format is the project documentation delivered in?",
      a: "We deliver full IEEE standard format documentation (60+ pages) in editable Microsoft Word (.docx) and PDF formats. Includes Synopsis, System Architecture diagrams, DFD (Level 0, 1, 2), ER Diagrams, Database Schema tables, Unit Test results, and Turnitin Plagiarism certificates."
    },
    {
      q: "Do you provide live demo deployment on Cloud platforms?",
      a: "Yes! Every project is dockerized and deployed on live AWS, GCP, or Vercel URLs. External examiners can open the live working URL on their laptops or mobile devices during your viva evaluation."
    },
    {
      q: "How does the 1-on-1 Viva preparation session work?",
      a: "Our lead software architect hosts a private video call with you. We walk through core logic, explain algorithm complexity, demonstrate API endpoints, and prepare you for likely examiner questions."
    },
    {
      q: "What if my college guide or guide professor requests code changes?",
      a: "We provide 30 days of free post-delivery revision support. If your guide professor suggests feature tweaks, module extensions, or formatting changes, our engineering team implements them promptly."
    },
    {
      q: "How do payment milestones work?",
      a: "We follow a milestone-based model: 1) Free architecture blueprint & scope breakdown, 2) Milestone 1: 50% upon live demo milestone video, 3) Milestone 2: Remaining 50% after complete code handover & viva prep."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-600 text-xs font-mono mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Everything you need to know about our capstone project delivery process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border-slate-200/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-950 hover:text-blue-700 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 p-6 rounded-2xl glass-card border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-bold text-slate-950">Still have a specific question?</h4>
            <p className="text-xs text-slate-400">Our engineering leads answer within 2 hours.</p>
          </div>
          <button
            onClick={onOpenForm}
            className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-600/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask an Architect</span>
          </button>
        </div>

      </div>
    </section>
  );
}
