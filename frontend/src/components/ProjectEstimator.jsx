import React, { useState, useMemo } from 'react';
import { Calculator, Sparkles, Check, ArrowRight, ShieldCheck, Clock, Layers, Zap } from 'lucide-react';

export default function ProjectEstimator({ onApplyEstimate }) {
  const [domain, setDomain] = useState("AI-ML");
  const [complexity, setComplexity] = useState("standard");
  const [selectedAddons, setSelectedAddons] = useState({
    ieeeReport: true,
    vivaCoaching: true,
    cloudDeployment: true,
    expressDelivery: false
  });

  const domainsList = [
    { id: "AI-ML", label: "AI & Machine Learning", basePrice: 12000, days: 7 },
    { id: "DevOps & Cloud", label: "DevOps & Cloud GitOps", basePrice: 15000, days: 8 },
    { id: "Web Dev", label: "Full-Stack Web (MERN / Next)", basePrice: 9000, days: 5 },
    { id: "Mobile", label: "Mobile App (Flutter / React Native)", basePrice: 13000, days: 7 },
    { id: "IoT", label: "IoT & Edge AI System", basePrice: 11000, days: 6 }
  ];

  const complexityLevels = [
    { id: "basic", label: "Basic Prototype", multiplier: 0.8, extraDays: -2, desc: "Core feature set & standard documentation." },
    { id: "standard", label: "Standard Capstone", multiplier: 1.0, extraDays: 0, desc: "Complete modular architecture & IEEE paper." },
    { id: "enterprise", label: "Enterprise Multi-Service", multiplier: 1.4, extraDays: 3, desc: "Microservices, CI/CD, live deployment & full suite." }
  ];

  const addonsList = [
    { id: "ieeeReport", label: "IEEE Format 60+ Page Report & PPT", price: 1500, desc: "Includes Synopsis, DFD, ERD & plagiarism check." },
    { id: "vivaCoaching", label: "1-on-1 Viva Preparation Session", price: 1000, desc: "Live code walkthrough & examiner QA drill." },
    { id: "cloudDeployment", label: "Live AWS/GCP Cloud Host Setup", price: 1500, desc: "Public live demo URL for faculty evaluation." },
    { id: "expressDelivery", label: "Express 48-Hour Priority Delivery", price: 2500, desc: "Accelerated development sprint." }
  ];

  const toggleAddon = (id) => {
    setSelectedAddons(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const estimate = useMemo(() => {
    const selectedDomainObj = domainsList.find(d => d.id === domain) || domainsList[0];
    const selectedCompObj = complexityLevels.find(c => c.id === complexity) || complexityLevels[1];

    let base = selectedDomainObj.basePrice * selectedCompObj.multiplier;
    let days = Math.max(2, selectedDomainObj.days + selectedCompObj.extraDays);

    let addonCost = 0;
    addonsList.forEach(addon => {
      if (selectedAddons[addon.id]) {
        addonCost += addon.price;
        if (addon.id === "expressDelivery") {
          days = Math.max(2, Math.floor(days / 2));
        }
      }
    });

    const totalEstimate = Math.round(base + addonCost);
    return {
      price: totalEstimate,
      days: days,
      domainLabel: selectedDomainObj.label
    };
  }, [domain, complexity, selectedAddons]);

  const handleApply = () => {
    onApplyEstimate({
      domain: domain,
      title: `Custom ${estimate.domainLabel} (${complexityLevels.find(c => c.id === complexity)?.label})`,
      budgetRange: estimate.price >= 20000 ? "₹20k+" : estimate.price >= 10000 ? "₹10k-₹20k" : "₹5k-₹10k"
    });
  };

  return (
    <section id="estimator" className="py-24 bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-700 text-xs font-mono mb-4">
            <Calculator className="w-4 h-4 text-blue-600" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 tracking-tight">
            Calculate Your Project <span className="gradient-text">Budget & Delivery</span>
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Select your technology domain, architecture complexity, and required deliverables to get an instant cost and timeline estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Selector */}
          <div className="lg:col-span-8 space-y-8 glass-card p-6 sm:p-8 rounded-3xl border-slate-200">
            
            {/* Step 1: Select Domain */}
            <div>
              <label className="block text-sm font-semibold text-slate-950 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center font-mono">1</span>
                Select Technology Domain
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {domainsList.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDomain(d.id)}
                    className={`p-3.5 rounded-xl text-xs sm:text-sm font-medium text-left transition-all flex flex-col justify-between ${
                      domain === d.id
                        ? 'bg-blue-700 text-white shadow-lg shadow-blue-600/30 border-transparent'
                        : 'bg-white text-slate-700 hover:bg-blue-50 border border-slate-200'
                    }`}
                  >
                    <span>{d.label}</span>
                    <span className="text-[11px] opacity-75 font-mono mt-2">Starts ₹{d.basePrice.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Complexity */}
            <div>
              <label className="block text-sm font-semibold text-slate-950 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center font-mono">2</span>
                Architecture Complexity
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {complexityLevels.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setComplexity(c.id)}
                    className={`p-4 rounded-xl text-left transition-all ${
                      complexity === c.id
                        ? 'bg-blue-50 border-2 border-blue-500 text-slate-950 shadow-lg shadow-blue-600/10'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                    }`}
                  >
                    <p className="font-semibold text-sm">{c.label}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{c.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Add-ons */}
            <div>
              <label className="block text-sm font-semibold text-slate-950 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-700 text-white text-xs flex items-center justify-center font-mono">3</span>
                Select Included Add-ons & Support
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons[addon.id];
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        isChecked
                          ? 'bg-blue-50 border-blue-500 text-slate-950 shadow-lg shadow-blue-600/10'
                          : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isChecked ? 'bg-blue-600 text-white' : 'border border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-slate-700">{addon.label}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{addon.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Price Output & CTA Card */}
          <div className="lg:col-span-4 sticky top-28">
            <div className="p-6 sm:p-8 rounded-3xl border border-blue-200 bg-gradient-to-b from-white via-blue-50 to-emerald-50 shadow-2xl shadow-blue-900/10 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-blue-600">Estimated Quote</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">₹{estimate.price.toLocaleString()}</span>
                  <span className="text-xs text-slate-400">All-Inclusive</span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200 text-xs text-slate-600 font-mono">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-emerald-400" /> Estimated Timeline:
                  </span>
                  <span className="text-emerald-400 font-bold">{estimate.days} Days</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-blue-600" /> Originality Review:
                  </span>
                  <span className="text-slate-700">100% Unique</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-purple-400" /> Support Model:
                  </span>
                  <span className="text-slate-700">1-on-1 Viva Prep</span>
                </div>
              </div>

              <button
                onClick={handleApply}
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 hover:from-blue-600 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-blue-600/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
              >
                <span>Apply Estimate to Intake Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-slate-400 text-center">
                * No upfront payment required to submit requirement blueprint.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
