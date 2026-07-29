import React from 'react';
import { ShieldCheck, Cpu, GitBranch, Terminal, ArrowRight, Sparkles, Clock, Database, Code2 } from 'lucide-react';

export default function Hero({ onOpenForm, onExploreCatalog }) {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(239,246,255,0.92),rgba(255,255,255,0.88))] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_50%_0%,rgba(0,103,244,0.18),transparent_34rem)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="premium-shell rounded-[2rem] sm:rounded-[3rem] px-5 py-8 sm:px-10 sm:py-12 lg:p-14">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
            <div className="text-left">
          
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-semibold mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>Official intake portal for production-style capstone delivery</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-950 leading-[1.08] mb-6">
              Production-Grade <span className="gradient-text">B.Tech & Master's</span> Capstone Projects
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mb-9">
              Move beyond basic templates with cloud-native, AI-integrated, and DevOps-ready project builds, including 
              <span className="text-slate-950 font-semibold"> source code, IEEE-style documentation, PPTs,</span> and 
              <span className="text-slate-950 font-semibold"> guided deployment support</span>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOpenForm}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-sky-600 to-emerald-500 hover:from-blue-600 hover:to-emerald-400 text-white font-semibold text-base shadow-xl shadow-blue-600/25 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Submit Project Requirements</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={onExploreCatalog}
                className="px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold text-base flex items-center justify-center gap-2.5 transition-all hover:border-blue-300 hover:text-blue-700 shadow-lg shadow-slate-900/5"
              >
                <Terminal className="w-5 h-5 text-blue-600" />
                <span>Browse Catalog & Demos</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xl">
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                <p className="text-2xl font-extrabold text-slate-950">24h</p>
                <p className="text-xs text-slate-500">Scope review</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                <p className="text-2xl font-extrabold text-slate-950">6+</p>
                <p className="text-xs text-slate-500">Domains</p>
              </div>
              <div className="rounded-2xl bg-white/80 border border-slate-200 p-4">
                <p className="text-2xl font-extrabold text-slate-950">CI/CD</p>
                <p className="text-xs text-slate-500">Ready builds</p>
              </div>
            </div>
          </div>

            <div className="relative">
              <div className="rounded-[2rem] bg-[#09111f] text-white p-5 sm:p-6 shadow-2xl shadow-blue-950/25">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <p className="text-xs text-sky-300 font-mono uppercase">Live Project Command Center</p>
                    <h3 className="text-2xl font-bold text-white mt-1">AI Capstone Blueprint</h3>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-sky-300" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 py-5">
                  {[
                    { icon: Code2, label: "Source", value: "Modular Repo" },
                    { icon: Database, label: "Backend", value: "FastAPI + DB" },
                    { icon: GitBranch, label: "DevOps", value: "Docker CI/CD" },
                    { icon: Clock, label: "Timeline", value: "Milestones" }
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl bg-white/8 border border-white/10 p-4">
                      <item.icon className="w-5 h-5 text-emerald-300 mb-3" />
                      <p className="text-[11px] text-slate-300 font-mono">{item.label}</p>
                      <p className="text-sm font-semibold text-white mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-white text-slate-950 p-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <div>
                      <p className="text-sm font-bold">Architecture-first delivery</p>
                      <p className="text-xs text-slate-500">Scope, modules, timeline, and handover plan before build.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="trust-ticker mt-8 overflow-hidden rounded-2xl bg-white/80 border border-slate-200">
          <div className="ticker-track flex items-center gap-8 px-6 py-4 text-xs sm:text-sm font-semibold text-slate-600">
            {[...["AI/ML", "Cloud Deployment", "IEEE-Style Reports", "Viva Walkthrough", "MERN/Next.js", "Flutter Apps", "IoT Simulation", "DevOps Pipelines"], ...["AI/ML", "Cloud Deployment", "IEEE-Style Reports", "Viva Walkthrough", "MERN/Next.js", "Flutter Apps", "IoT Simulation", "DevOps Pipelines"]].map((item, idx) => (
              <span key={`${item}-${idx}`} className="flex shrink-0 items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
