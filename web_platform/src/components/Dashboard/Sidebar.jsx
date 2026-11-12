import React from 'react';
import { LayoutDashboard, Briefcase, Users, MessageSquare, Clock, FileText, Plus, Sparkles, LogOut, Shield, Building2, BookOpen } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenNewJob, onLogout, onGoToAdmin }) {
  const menuItems = [
    { id: 'overview', label: 'Visão Geral & ROI', icon: LayoutDashboard },
    { id: 'jobs', label: 'Vagas & Programas', icon: Briefcase },
    { id: 'matching', label: 'Matching & Candidatos', icon: Users, badge: 'IA Ativa' },
    { id: 'whatsapp', label: 'Triagem WhatsApp', icon: MessageSquare, badge: 'Live' },
    { id: 'retention', label: 'Guardião dos 90 Dias', icon: Clock },
    { id: 'lgpd', label: 'Documentos & Termos (GED)', icon: FileText, badge: 'GED' },
    { id: 'companies', label: 'Empresas & Recrutadores', icon: Building2, badge: 'Cadastro' }
  ];

  return (
    <aside className="w-full lg:w-64 bg-slate-900/80 border-r border-slate-800 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        
        {/* Quick action: Nova Vaga */}
        <button
          onClick={onOpenNewJob}
          className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs rounded-2xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Criar Nova Vaga</span>
        </button>

        {/* Menu Navigation */}
        <nav className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Módulos Operacionais do RH
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                    isActive ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Info Card no rodapé do Sidebar */}
      <div className="mt-8 space-y-2">
        <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-[11px] space-y-1.5">
          <div className="flex items-center space-x-1.5 text-emerald-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TalentFlow Core v1.4</span>
          </div>
          <p className="text-slate-400">
            Polo Regional: Jaú, Barra Bonita & Bariri.
          </p>

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full mt-3 py-2 px-3 text-[11px] font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all flex items-center justify-center space-x-1.5 border border-red-500/20"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair do Portal RH</span>
            </button>
          )}
        </div>
      </div>

    </aside>
  );
}
