import React from 'react';
import { ShieldCheck, FileCheck2, Video, Code2, Server, HelpCircle, ArrowRight } from 'lucide-react';

export default function TrustBadges({ onOpenForm }) {
  const steps = [
    {
      num: "01",
      title: "Requirement Intake",
      desc: "Submit your university domain, deadline, and target budget. Our lead architect reviews feasibility in 2 hours."
    },
    {
      num: "02",
      title: "Architecture Blueprint",
      desc: "Receive complete system architecture diagrams, database ERD schemas, and module breakdowns before payment."
    },
    {
      num: "03",
      title: "Sprint Demos & Code",
      desc: "Get weekly live video demos and git access to inspect progress, test endpoints, and review unit tests."
    },
    {
      num: "04",
      title: "Viva & Cloud Handover",
      desc: "Complete IEEE format report, PPT deck, video walkthrough, and 1-on-1 Viva question prep session."
    }
  ];

  return (
    <div className="bg-white text-slate-900">
      
      {/* Guarantees Section */}
      <section id="guarantee" className="py-20 border-t border-slate-200 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight">
              Why Top Engineering Colleges <span className="gradient-text">Trust Our Portal</span>
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Built by senior software engineers to ensure your final year capstone project stands out in college evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Original Work Review</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Each scoped build is reviewed for originality, clean modular architecture, and documentation quality.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-600 flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">IEEE Compliant Reports</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete 60+ page project reports including Synopsis, ERD diagrams, DFD charts, and test suite results.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">1-on-1 Viva Coaching</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated video session explaining code execution, API endpoints, algorithms, and answering external examiner questions.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border-slate-200 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <Server className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-950">Live Cloud Deployment</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deployed on live AWS/GCP/Vercel URLs so external examiners can evaluate the live project instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="py-20 border-t border-slate-200 bg-white/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-950 tracking-tight">
              4-Step <span className="gradient-text">Seamless Workflow</span>
            </h2>
            <p className="text-slate-400 mt-3 text-sm sm:text-base">
              Transparent, milestone-driven execution pipeline from submission to final viva presentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="glass-card p-6 rounded-2xl border-slate-200/80 relative">
                <span className="text-3xl font-extrabold font-mono text-indigo-500/30 block mb-2">
                  {step.num}
                </span>
                <h3 className="text-lg font-bold text-slate-950 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Banner CTA */}
          <div className="mt-16 p-8 rounded-3xl gradient-bg-accent border border-blue-500/30 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-950 mb-2">Have a Deadline Approaching Fast?</h3>
            <p className="text-slate-600 text-sm mb-6 max-w-xl mx-auto">
              Selected project templates may qualify for rapid delivery after scope and feasibility review.
            </p>
            <button
              onClick={onOpenForm}
              className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-semibold text-sm shadow-lg shadow-blue-600/30 inline-flex items-center gap-2 transition-all"
            >
              <span>Submit Expedited Requirement</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
