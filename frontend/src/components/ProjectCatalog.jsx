import React, { useState, useMemo } from 'react';
import { PROJECTS_DATA, DOMAINS } from '../data/projects';
import { Search, ExternalLink, Sparkles, Check, Filter, Tag, Layers, ArrowUpRight } from 'lucide-react';

export default function ProjectCatalog({ onSelectProject }) {
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceFilter, setPriceFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      const matchesDomain =
        selectedDomain === "All Domains" || proj.domain === selectedDomain;
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPrice =
        priceFilter === "All" || proj.priceRange === priceFilter;

      return matchesDomain && matchesSearch && matchesPrice;
    });
  }, [selectedDomain, searchQuery, priceFilter]);

  return (
    <section id="catalog" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-blue-600 text-xs font-mono font-semibold tracking-wider uppercase mb-2">
              <Layers className="w-4 h-4" />
              Interactive Catalog
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-950 tracking-tight">
              Ready-to-Deploy <span className="gradient-text">Capstone Projects</span>
            </h2>
            <p className="text-slate-400 mt-2 max-w-xl text-sm sm:text-base">
              Select a project template or customize one with our engineering architects. Includes source code, documentation, and live demo.
            </p>
          </div>

          {/* Search Bar & Price Filter */}
          <div className="mt-6 md:mt-0 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by title or stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-sm text-slate-700 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-white/90 border border-slate-200 text-sm text-slate-600 focus:outline-none focus:border-blue-500 transition-all"
            >
              <option value="All">All Budget Ranges</option>
              <option value="₹5k-₹10k">₹5k - ₹10k</option>
              <option value="₹10k-₹20k">₹10k - ₹20k</option>
              <option value="₹20k+">₹20k+</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {DOMAINS.map((domain) => (
            <button
              key={domain}
              onClick={() => setSelectedDomain(domain)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedDomain === domain
                  ? 'bg-blue-700 text-white shadow-lg shadow-blue-600/30'
                  : 'glass-card text-slate-400 hover:text-slate-700 hover:bg-blue-50 border-slate-200'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="glass-card rounded-2xl p-12 text-center max-w-md mx-auto my-8 border-slate-200">
            <Filter className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-slate-950">No projects found</h3>
            <p className="text-sm text-slate-400 mt-1 mb-6">
              No pre-built project matches your active filter. Have a custom project idea?
            </p>
            <button
              onClick={() => onSelectProject({ title: "Custom Architecture Requirement", domain: selectedDomain !== "All Domains" ? selectedDomain : "Web Dev" })}
              className="px-5 py-2.5 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-600 transition-colors"
            >
              Submit Custom Idea
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between border-slate-200/90 relative group"
              >
                <div>
                  {/* Header: Domain Badge & Price */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-blue-600/10 border border-blue-500/20 text-blue-700">
                      {project.domain}
                    </span>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 font-mono block">Estimated Budget</span>
                      <span className="text-sm font-bold text-emerald-400">{project.priceRange}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-950 group-hover:text-blue-700 transition-colors leading-snug mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Stack Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[11px] font-mono text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-slate-200/80">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                      Included Deliverables:
                    </span>
                    {project.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-slate-200/80 flex items-center gap-3">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-600/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Select & Customize
                  </button>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl glass-card border-slate-300 text-slate-600 hover:text-blue-700 hover:border-slate-500 transition-colors"
                      title="View Architecture Demo"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
