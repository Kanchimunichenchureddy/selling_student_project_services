import React from 'react';
import { Award, Users, CheckCircle2, Star, ShieldCheck, Code, Cpu, Server } from 'lucide-react';

export default function LeadershipTeam() {
  const stats = [
    { value: "450+", label: "Capstone Projects Delivered", sub: "B.Tech / M.Tech / MCA" },
    { value: "99.8%", label: "First-Attempt Viva Pass Rate", sub: "Top Engineering Colleges" },
    { value: "100%", label: "Plagiarism-Free Code", sub: "Turnitin Verified Reports" },
    { value: "< 2 Hrs", label: "Architecture Consultation", sub: "Fast Response SLA" }
  ];

  const mentors = [
    {
      name: "Siddharth Verma",
      role: "Lead AI & Distributed Systems Architect",
      exp: "8+ Yrs Exp • Ex-Tier 1 Tech Lead",
      skills: ["PyTorch", "LangChain", "FastAPI", "Kubernetes"],
      avatarBg: "from-blue-700 to-emerald-500"
    },
    {
      name: "Ananya Rao",
      role: "Senior Cloud & DevOps Engineer",
      exp: "6+ Yrs Exp • AWS Certified Solutions Architect",
      skills: ["Terraform", "ArgoCD", "Docker", "GCP"],
      avatarBg: "from-sky-600 to-indigo-600"
    },
    {
      name: "Karan Patel",
      role: "Full-Stack Web & Mobile Lead",
      exp: "7+ Yrs Exp • React & Flutter Specialist",
      skills: ["Next.js", "TypeScript", "Flutter", "PostgreSQL"],
      avatarBg: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Stats Counter Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border-slate-200 text-center space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight gradient-text">{stat.value}</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">{stat.label}</p>
              <p className="text-[11px] text-slate-400 font-mono">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Mentors Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-600 text-xs font-mono mb-3">
            <Award className="w-4 h-4" />
            <span>Senior Technical Architects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Guided by <span className="gradient-text">Industry Veterans</span>
          </h2>
          <p className="text-slate-400 mt-2 text-sm sm:text-base">
            Your project is assigned directly to a senior software architect with real-world production experience.
          </p>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {mentors.map((m, idx) => (
            <div key={idx} className="glass-card glass-card-hover p-6 rounded-2xl border-slate-200 space-y-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${m.avatarBg} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-950">{m.name}</h3>
                  <p className="text-xs text-blue-600 font-medium">{m.role}</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 font-mono">{m.exp}</p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {m.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-600">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
