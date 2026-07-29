import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectCatalog from './components/ProjectCatalog';
import ProjectEstimator from './components/ProjectEstimator';
import TrustBadges from './components/TrustBadges';
import LeadershipTeam from './components/LeadershipTeam';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import IntakeForm from './components/IntakeForm';
import FloatingContact from './components/FloatingContact';

export default function App() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleOpenForm = () => {
    setSelectedProject(null);
    setIsFormOpen(true);
  };

  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setIsFormOpen(true);
  };

  const handleApplyEstimate = (estimatedData) => {
    setSelectedProject({
      title: estimatedData.title,
      domain: estimatedData.domain,
      priceRange: estimatedData.budgetRange
    });
    setIsFormOpen(true);
  };

  const handleExploreCatalog = () => {
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fbff] text-slate-900 flex flex-col font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
      <Navbar onOpenForm={handleOpenForm} />
      
      <main className="flex-grow">
        <Hero
          onOpenForm={handleOpenForm}
          onExploreCatalog={handleExploreCatalog}
        />

        <ProjectCatalog
          onSelectProject={handleSelectProject}
        />

        <ProjectEstimator
          onApplyEstimate={handleApplyEstimate}
        />

        <TrustBadges
          onOpenForm={handleOpenForm}
        />

        <LeadershipTeam />

        <FAQSection
          onOpenForm={handleOpenForm}
        />
      </main>

      <Footer onOpenForm={handleOpenForm} />

      <IntakeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        selectedProject={selectedProject}
      />

      <FloatingContact
        onOpenForm={handleOpenForm}
      />
    </div>
  );
}
