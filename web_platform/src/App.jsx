import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/LandingPage/Hero';
import StatsBanner from './components/LandingPage/StatsBanner';
import ProblemSolution from './components/LandingPage/ProblemSolution';
import RoiCalculator from './components/LandingPage/RoiCalculator';
import FeaturesShowcase from './components/LandingPage/FeaturesShowcase';
import MobileAppShowcase from './components/LandingPage/MobileAppShowcase';
import AboutCompany from './components/LandingPage/AboutCompany';
import RoadmapSection from './components/LandingPage/RoadmapSection';
import LgpdComplianceSection from './components/LandingPage/LgpdComplianceSection';
import Footer from './components/LandingPage/Footer';

// RH Portal Components (Área Operacional de Recrutamento)
import Sidebar from './components/Dashboard/Sidebar';
import RHLogin from './components/Dashboard/RHLogin';
import DashboardOverview from './components/Dashboard/DashboardOverview';
import JobsManagement from './components/Dashboard/JobsManagement';
import MatchingCandidates from './components/Dashboard/MatchingCandidates';
import WhatsAppTriagem from './components/Dashboard/WhatsAppTriagem';
import RetentionMonitor from './components/Dashboard/RetentionMonitor';
import LgpdGovernance from './components/Dashboard/LgpdGovernance';
import CompaniesRecruiters from './components/Dashboard/CompaniesRecruiters';
import UserGuideView from './components/Dashboard/UserGuideView';

// Console Master Admin (Controle de Usuários e Níveis de Acesso RBAC)
import AdminLogin from './components/Dashboard/AdminLogin';
import UserManagement from './components/Admin/UserManagement';

import CandidateDetailModal from './components/Modals/CandidateDetailModal';
import NewJobModal from './components/Modals/NewJobModal';
import { apiClient } from './services/apiClient';

import { jobsData as initialJobs, candidatesData as initialCandidates } from './data/mockData';

export default function App() {
  // Helper para parsing da rota atual ('public' | 'rh' | 'admin')
  const parseRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (path === '/admin' || path.startsWith('/admin/') || hash === '#/admin' || hash === '#admin') {
      return 'admin';
    }
    if (path === '/rh' || path.startsWith('/rh/') || hash === '#/rh' || hash === '#rh') {
      return 'rh';
    }
    if (path === '/guia' || path.startsWith('/guia/') || hash === '#/guia' || hash === '#guia') {
      return 'guia';
    }
    return 'public';
  };

  const [currentRoute, setCurrentRoute] = useState(parseRoute);
  
  // Estados de autenticação separados para RH e Admin
  const [isRhAuthenticated, setIsRhAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // Aba ativa no Portal do RH
  const [dashboardTab, setDashboardTab] = useState('overview'); // 'overview' | 'jobs' | 'matching' | 'whatsapp' | 'retention' | 'lgpd'
  
  // Escuta alterações de URL / Histórico
  useEffect(() => {
    const handleUrlChange = () => {
      setCurrentRoute(parseRoute());
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (path) => {
    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      window.location.hash = path === '/' ? '' : '#' + path;
    }
    setCurrentRoute(parseRoute());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Theme state: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tf_theme') || 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('tf_theme', nextTheme);
  };

  // Modals state
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isNewJobOpen, setIsNewJobOpen] = useState(false);

  // Dynamic jobs and candidates state
  const [jobs, setJobs] = useState(initialJobs);
  const [candidates, setCandidates] = useState(initialCandidates);

  useEffect(() => {
    async function loadJobsFromDatabase() {
      try {
        const liveJobs = await apiClient.getJobs();
        if (Array.isArray(liveJobs) && liveJobs.length > 0) {
          setJobs(liveJobs);
        }
      } catch (err) {
        console.warn('Erro ao sincronizar vagas do MariaDB:', err);
      }
    }
    loadJobsFromDatabase();
  }, []);

  const handleJobCreated = async (newJob) => {
    try {
      await apiClient.createJob(newJob);
      const liveJobs = await apiClient.getJobs();
      if (Array.isArray(liveJobs) && liveJobs.length > 0) {
        setJobs(liveJobs);
      } else {
        setJobs(prev => [newJob, ...prev]);
      }
    } catch (err) {
      console.error('Erro ao salvar vaga no MariaDB:', err);
      setJobs(prev => [newJob, ...prev]);
    }
    setDashboardTab('jobs');
  };

  const handleHumanReviewApproved = (candidateId, note) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return {
          ...c,
          humanReviewStatus: "Validado por Recrutador (LGPD Art. 20)",
          aiRationale: `${c.aiRationale} [Revisão Humana: ${note}]`
        };
      }
      return c;
    }));
  };

  const handleSelectJobForMatching = (job) => {
    setDashboardTab('matching');
  };

  const scrollToRoiCalculator = () => {
    const el = document.getElementById('roi-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${theme} ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} flex flex-col font-['Inter'] selection:bg-emerald-500 selection:text-slate-950 transition-colors duration-200`}>
      
      {/* Top Navbar */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        
        {/* ROTA 1: PORTAL DO RH (/rh) */}
        {currentRoute === 'rh' && (
          !isRhAuthenticated ? (
            <RHLogin
              onLogin={() => setIsRhAuthenticated(true)}
              onBackToSite={() => navigateTo('/')}
              onGoToAdmin={() => navigateTo('/admin')}
              theme={theme}
            />
          ) : (
            <div className="flex-1 flex flex-col lg:flex-row animate-in fade-in duration-200">
              {/* Sidebar */}
              <Sidebar
                activeTab={dashboardTab}
                setActiveTab={setDashboardTab}
                onOpenNewJob={() => setIsNewJobOpen(true)}
                onLogout={() => setIsRhAuthenticated(false)}
                onGoToAdmin={() => navigateTo('/admin')}
              />

              {/* Dashboard Content Container */}
              <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl">
                {dashboardTab === 'overview' && (
                  <DashboardOverview
                    setActiveTab={setDashboardTab}
                    onSelectCandidate={(cand) => setSelectedCandidate(cand)}
                  />
                )}

                {dashboardTab === 'jobs' && (
                  <JobsManagement
                    jobs={jobs}
                    onOpenNewJob={() => setIsNewJobOpen(true)}
                    onSelectJobForMatching={handleSelectJobForMatching}
                  />
                )}

                {dashboardTab === 'matching' && (
                  <MatchingCandidates
                    onSelectCandidate={(cand) => setSelectedCandidate(cand)}
                  />
                )}

                {dashboardTab === 'whatsapp' && (
                  <WhatsAppTriagem />
                )}

                {dashboardTab === 'retention' && (
                  <RetentionMonitor />
                )}

                {dashboardTab === 'lgpd' && (
                  <LgpdGovernance />
                )}

                {dashboardTab === 'companies' && (
                  <CompaniesRecruiters />
                )}

                {dashboardTab === 'guide' && (
                  <UserGuideView />
                )}
              </div>
            </div>
          )
        )}

        {/* ROTA GUIA DE USUÁRIO (/guia) */}
        {currentRoute === 'guia' && (
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full animate-in fade-in duration-200">
            <UserGuideView />
          </div>
        )}

        {/* ROTA 2: CONSOLE MASTER ADMIN - CONTROLE DE USUÁRIOS E NÍVEIS (/admin) */}
        {currentRoute === 'admin' && (
          !isAdminAuthenticated ? (
            <AdminLogin
              onLogin={() => setIsAdminAuthenticated(true)}
              onBackToSite={() => navigateTo('/')}
              onGoToRh={() => navigateTo('/rh')}
              theme={theme}
            />
          ) : (
            <div className="flex-1 flex flex-col animate-in fade-in duration-200">
              <UserManagement
                onLogout={() => setIsAdminAuthenticated(false)}
                onGoToRh={() => navigateTo('/rh')}
                onBackToSite={() => navigateTo('/')}
                theme={theme}
              />
            </div>
          )
        )}

        {/* ROTA 3: PÁGINA INSTITUCIONAL PÚBLICA (/) */}
        {currentRoute === 'public' && (
          <div className="animate-in fade-in duration-200">
            <Hero
              onOpenRoiCalculator={scrollToRoiCalculator}
              onGoToRh={() => navigateTo('/rh')}
              onGoToAdmin={() => navigateTo('/admin')}
            />
            <StatsBanner />
            <div id="solucao">
              <ProblemSolution />
            </div>
            <div id="roi-calculator">
              <RoiCalculator 
                onGoToRh={() => navigateTo('/rh')} 
                onGoToAdmin={() => navigateTo('/admin')} 
              />
            </div>
            <div id="pilares">
              <FeaturesShowcase />
            </div>
            <MobileAppShowcase />
            <div id="sobre-nos">
              <AboutCompany />
            </div>
            <RoadmapSection />
            <div id="lgpd">
              <LgpdComplianceSection />
            </div>
            <Footer 
              onGoToRh={() => navigateTo('/rh')} 
              onGoToAdmin={() => navigateTo('/admin')} 
            />
          </div>
        )}

      </main>

      {/* Modals */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onHumanReviewApproved={handleHumanReviewApproved}
      />

      <NewJobModal
        isOpen={isNewJobOpen}
        onClose={() => setIsNewJobOpen(false)}
        onJobCreated={handleJobCreated}
      />

    </div>
  );
}
